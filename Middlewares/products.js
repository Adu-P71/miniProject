const Product = require("../models/products.model")
const PRODUCTS = async (req, res, next) => {
  if (!req.session.done) {
    try {
      let products = await Product.find()
      req.session.products = products
      req.session.done = true
      console.log("the product middle ware has been run")
    } catch (error) {
      console.log("there was an error")
    }
  }
  next()
}

module.exports = {
  PRODUCTS,
}
