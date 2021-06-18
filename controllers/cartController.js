const Checkout = require("../models/checkout.model")
function updateValues(req) {
  const { products } = req.session
  const { quantity } = req.body
  const productIndex = products.findIndex(
    (product) => product._id === req.params.id
  )
  const product = products[productIndex]
  products[productIndex].quantity = quantity
  products[productIndex].subTotal = product.price * quantity

  return product
}
function deleteBag(req) {
  const { products } = req.session
  const productIndex = products.findIndex(
    (product) => product._id === req.params.id
  )
  products[productIndex].added = false
  products[productIndex].quantity = 1
  products[productIndex].subTotal = 0
}

const getPage = (req, res, next) => {
  let products = req.session.products.filter(
    (product) => product.added === true
  )
  res.render("cart", {
    layout: "../views/layouts/other",
    products: products,
    Total: products.reduce((acc, prod) => {
      return acc + prod.subTotal
    }, 0),
  })
}

const updateCart = (req, res, next) => {
  const product = updateValues(req)
  let products = req.session.products.filter(
    (product) => product.added === true
  )

  res.json({
    subTotal: product.subTotal,
    Total: products.reduce((acc, prod) => {
      return acc + prod.subTotal
    }, 0),
  })
}

const deleteFromCart = (req, res, next) => {
  let products = req.session.products.filter(
    (product) => product.added === true
  )
  deleteBag(req)
  res.json({
    Total: products.reduce((acc, prod) => {
      return acc + prod.subTotal
    }, 0),
  })
}

const checkOut = async (req, res, next) => {
  let products = req.session.products
    .filter((product) => product.added === true)
    .map((product) => {
      return {
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        subTotal: product.subTotal,
      }
    })
  try {
    const checkout = new Checkout({
      username: "username",
      userId: "userId",
      order: products,
      totalPrice: products.reduce((acc, prod) => {
        return acc + prod.subTotal
      }, 0),
    })
    await checkout.save()
    res.json({ msg: "checkout was successful" })
    console.log(checkout)
  } catch (error) {
    res.json({ msg: "checkout was unsuccessful" })
  }
}
module.exports = {
  getPage,
  updateCart,
  deleteFromCart,
  checkOut,
}
