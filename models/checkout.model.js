const mongoose = require("mongoose")

const CheckoutSchema = new mongoose.Schema({
  userId: String,
  order: Array,
  totalPrice: Number,
})

module.exports = mongoose.model("Checkouts", CheckoutSchema)
