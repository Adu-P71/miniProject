const express = require("express")
const app = express()
const path = require("path")
const dotenv = require("dotenv").config()
const expressLayouts = require("express-ejs-layouts")
const session = require("express-session")
const { PRODUCTS, sessionObject } = require("./middleware/products")
const { PORT } = process.env
require("./middleware/initDB")()
//session middleware
app.use(session(sessionObject))

// MIDDLEWARES
app.use(PRODUCTS)
app.use(expressLayouts)
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//ROUTES
app.use("/", require("./Routes/index"))
app.use("/bags", require("./Routes/oneProduct"))
app.use("/allProducts", require("./Routes/allProducts"))
app.use("/cart", require("./Routes/cart"))
app.use("/auth/signUp", require("./Routes/signup"))
app.use("/auth/login", require("./Routes/login"))

app.listen(PORT, console.log(`Server is running on port : ${PORT}`))
