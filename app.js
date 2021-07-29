const express = require("express")
const app = express()
const path = require("path")
const dotenv = require("dotenv").config()
const expressLayouts = require("express-ejs-layouts")
const session = require("express-session")
require("./middlewares/initDB")()
const MongoStore = require("connect-mongo")
const { PRODUCTS } = require("./middlewares/products")

//environment variables
const {
  SESS_NAME,
  SESS_SECRET,
  SESS_LIFETIME,
  NODE_ENV,
  PORT,
  MONGODB_URI,
  DB_NAME,
} = process.env

//session middleware
app.use(
  session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: true,
    secret: SESS_SECRET,
    store: MongoStore.create({
      dbName: DB_NAME,
      mongoUrl: MONGODB_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: parseInt(SESS_LIFETIME),
      secure: NODE_ENV == "production",
    },
  })
)

// MIDDLEWARES

app.use(PRODUCTS)
app.use(expressLayouts)
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//ROUTES
app.use("/", require("./routes/index"))
app.use("/bags", require("./routes/oneProduct"))
app.use("/allProducts", require("./routes/allProducts"))
app.use("/cart", require("./routes/cart"))
app.use("/signUp", require("./routes/signup"))
app.use("/login", require("./routes/login"))
app.use("/logout", require("./routes/logout"))

app.listen(PORT, console.log(`Server is running on port : ${PORT}`))
