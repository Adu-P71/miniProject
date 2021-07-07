const Product = require("../models/products.model")

const getPage = async (req, res, next) => {
  try {
    let products = await Product.find()
    res.render("allProducts", {
      layout: "../views/layouts/other",
      products: products,
      user: req.session.user,
    })
    // console.log(products)
  } catch (error) {
    console.log("there was an error")
  }
}

module.exports = {
  getPage,
}
