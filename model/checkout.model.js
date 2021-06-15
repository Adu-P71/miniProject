const { ObjectId } = require("bson")
const mongoose = require("mongoose")

const CheckoutSchema = new mongoose.Schema({
  username: String,
  userId: String,
  order: Array,
  totalPrice: Number,
})

module.exports = mongoose.model("Checkouts", CheckoutSchema)
