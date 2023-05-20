const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  _id: {
    type: String,
    // required: true
},
name: {
    type: String,
    // required: true
},
price: {
    type: String,
    // required: true
},
cover: {
    type: String,
    // required: true
},
createdAt: {
    type: String,
    // required: true
},
__v: {
    type: Number
}
});

const cartSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  items: [cartItemSchema],
  date: {
    type: Date,

    default: Date.now,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
