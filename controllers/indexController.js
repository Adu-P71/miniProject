const getPage = (req, res, next) => {
  const { products } = req.session
  // console.log(req.session.done)
  res.render("index", {
    layout: "../views/layouts/home",
    products: products,
    user: req.session.user,
  })
}

module.exports = { getPage }
