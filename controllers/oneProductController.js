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
  req.session.cartNumber += quantity
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
      user: req.session.user,
    })
  } else res.redirect(reqUrl)
}

const addToCart = (req, res, next) => {
  const product = addOneProduct(req)
  // console.log(req.session.cartNumber)

  res.json({
    msg: `${product.name} has been submitted to the server`,
    cartNumber: req.session.products
      .filter((product) => product.added === true)
      .reduce((acc, prod) => {
        return acc + prod.quantity
      }, 0),
  })
}
module.exports = {
  getPage,
  addToCart,
}
