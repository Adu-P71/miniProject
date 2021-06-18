const getPage = (req, res, next) => {
  const { products } = req.session
  res.render("index", {
    layout: "../views/layouts/home",
    products: products,
  })
}

module.exports = { getPage }
