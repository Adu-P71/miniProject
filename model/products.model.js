const mongoose = require("mongoose")
//or const {Schema} = require('mongoose')

const ProductSchema = new mongoose.Schema({
  my_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },

  brand: {
    type: String,
    required: false,
  },
  imgSrc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model("Products", ProductSchema)
