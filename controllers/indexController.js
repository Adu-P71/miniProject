const getPage = (req, res, next) => {
  const { products } = req.session
  // console.log(req.session.done)
  res.render("index", {
    layout: "../views/layouts/home",
    products: products,
    user: req.session.user,
  })
}

const getCartNumber = (req, res) => {
  res.json({
    cartNumber: req.session.products
      .filter((product) => product.added === true)
      .reduce((acc, prod) => {
        return acc + prod.quantity
      }, 0),
  })
}
module.exports = { getPage, getCartNumber }
