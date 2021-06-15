const addOneProduct = (req) => {
  const { products } = req.session
  const { quantity } = req.body
  const productIndex = products.findIndex(
    (product) => product._id === req.params.id
  )
  const product = products[productIndex]
  products[productIndex].added = true
  products[productIndex].quantity = quantity
  products[productIndex].subTotal = product.price * quantity
  return product
}

const getPage = (req, res, next) => {
  const { products } = req.session
  let product = products.find((product) => product._id === req.params.id)
  const reqUrl = "/bags/" + req.params.id
  if (product) {
    res.render("single", {
      layout: "../views/layouts/other",
      product: product,
    })
  } else res.redirect(reqUrl)
}

const addToCart = (req, res, next) => {
  const product = addOneProduct(req)
  res.json({
    msg: `${product.name} has been submitted to the server`,
  })
}
module.exports = {
  getPage,
  addToCart,
}