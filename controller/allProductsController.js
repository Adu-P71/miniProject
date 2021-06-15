const Product = require("../model/products.model")

const getPage = async (req, res, next) => {
  try {
    let products = await Product.find()
    res.render("allProducts", {
      layout: "../views/layouts/other",
      products: products,
    })
    // console.log(products)
  } catch (error) {
    console.log("there was an error")
  }
}

module.exports = {
  getPage,
}
