const Checkout = require("../models/checkout.model")
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require("twilio")(accountSid, authToken)
const sendMessage = (req) => {
  const telephone = req.session.user.telephone
  client.messages
    .create({
      to: telephone,
      from: "+16572557357",
      body: "order confirmed, thanks for buying from us!!!",
    })
    .then((message) => console.log(message.body, telephone))
}
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
    user: req.session.user,
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
const checkOutProducts = (req) => {
  let userId = req.session.user._id

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
  const orderDetails = {
    userId: userId,
    order: products,
    totalPrice: products.reduce((acc, prod) => {
      return acc + prod.subTotal
    }, 0),
  }

  return orderDetails
}
const checkOut = async (req, res, next) => {
  try {
    const orderDetails = checkOutProducts(req)
    const checkout = new Checkout(orderDetails)
    await checkout.save()
    console.log(req.session.user.telephone)
    sendMessage(req)
    res.json({ success: "checkout was successful" })
    console.log(checkout)
  } catch (error) {
    res.json({ failure: "checkout was unsuccessful" })
  }
}
module.exports = {
  getPage,
  updateCart,
  deleteFromCart,
  checkOut,
}
