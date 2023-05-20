const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authenticate = require("../middleware/authenticate");
const Cart = require("../models/cartSchema");
const EmptyCart = require("../models/EmptyCartSchems");
const Razorpay = require("razorpay");
const shortid = require("shortid");

router.use(cookieParser());
router.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

require("../db/conn");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const User = require("../models/userSchema");

router.get("/", (req, res) => {
  res.send(`Hello world from the server router js`);
});

//about us ka page
router.get("/about", authenticate, (req, res) => {
  //console.log(`hello my about`);
  res.send(req.rootUser);
});

//get user data for contact us authenticate page
router.get("/getdata", authenticate, (req, res) => {
  //console.log(`hello my contact`);
  res.send(req.rootUser);
});

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Please fill the details" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already Exist" });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: "Password are not match" });
    } else {
      //  new user create
      const user = new User({ name, email, phone, work, password, cpassword });

      //  new userdata save database
      await user.save();

      // create new empty cart 
      const emptyCartCreate = new EmptyCart({ email: email });
      const cartResult = await emptyCartCreate.save();
      
      console.log(cartResult);
      res.status(201).json({ message: "user registered successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

// It's for login route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please Fill the detali" });
    }

    const userLogin = await User.findOne({ email: email });
    //console.log(userLogin);
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      const token = await userLogin.generateAuthToken();
      console.log(token);

      //  store in cookies
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credientials " });
      } else {
        res.json({ message: "User Login Successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credientials" });
    }
  } catch (err) {
    console.log(err);
  }
});

//logout ka page
router.get("/logout", (req, res) => {
  console.log(`hello my logout`);
  res.clearCookie("jwt", { path: "/" });
  res.status(200).send("User Logout");
});

//create route for user email
router.get("/useremail", authenticate, async(req, res) =>{
  res.status(200).json(req.rootUser);
})

// This route for checkout 
router.get("/placeorder", authenticate, (req, res) => {
  //  console.log(req.rootUser, "rootusr");
  res.send(req.rootUser);
});

// Razorpay post Request
let razorpay = new Razorpay({
  key_id: "rzp_test_jcgatEbWcdXvXo",
  key_secret: "KmS9rnRR3GIIjt2y1bCVlRWU",
});
router.post("/razorpay", async (req, res) => {
  const payment_capture = 1;
  const currency = "INR";

  let options = {
    amount: 500,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };
  try {
    const response = await razorpay.orders.create(options);
    console.log(response, "hello cart");
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
      receipt: response.receipt,
    });
  } catch (e) {
    console.log(e);
  }
});

router.post("/placeorder", async (req, res) => {
  let { userEmail, cart, response } = req.body;

  cart.forEach(async (cartItem) => {
    await Cart.updateOne(
      { email: userEmail },
      {
        $push: {
          items: cartItem,
        },
      }
    ).then(value => console.log(value)).catch(err => console.log(err));
  });
  res.json({ message: "success" });
  
});

// Route for order history page
router.get("/orderHistory", authenticate, async (req, res) => {
  let userEmail = req.rootUser.email;
  console.log(userEmail, "hello user email");
  const orderHistory = await Cart.findOne({ email: userEmail });
  //console.log(orderHistory);
  res.json({ orderHistory });
});

module.exports = router;
