const express = require("express");
const { MongoClient } = require("mongodb");
const { config } = require("dotenv");
//const cors = require("cors");

const app = express();
//app.use(cors());

config({ path: "./config/config.env" });
require("./db/conn");

//use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// it is routes file to make for routes easy
app.use(require("./routes/auth"));

const PORT = process.env.PORT;

// use middleware
// const middleware = (req, res, next) => {
//   console.log(`hello my middleware`);
//   next();
// };

// connection from database and fetch all book data:-
async function FindData() {
  const uri = process.env.DATABASE;
  const client = new MongoClient(uri);
  await client.connect();
  var result = await client
    .db("BookAPI")
    .collection("bookdetails")
    .find({})
    .toArray();

  return result;
}
//  home route all books
app.get("/book",  async (req, res) => {
  let data = await FindData();
  let retdata = res.send(data);
  console.log(retdata);
});

// Server Started :-
app.listen(PORT, function () {
  console.log(`server is running on port ${PORT}`);
});
