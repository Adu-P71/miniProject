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
const { SESS_NAME, SESS_SECRET, SESS_LIFETIME, NODE_ENV } = process.env
const IN_PROD = NODE_ENV === "production"
const sessionObject = {
  name: SESS_NAME,
  resave: false,
  saveUninitialized: false,
  secret: SESS_SECRET,
  cookie: {
    maxAge: parseInt(SESS_LIFETIME),
    sameSite: true,
    secure: IN_PROD,
  },
}
module.exports = {
  PRODUCTS,
  sessionObject,
}
