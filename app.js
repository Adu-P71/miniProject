const express = require("express")
const app = express()
const path = require("path")
const dotenv = require("dotenv").config()
const expressLayouts = require("express-ejs-layouts")
const session = require("express-session")
const connection = require("./middlewares/initDB")
connection()
const MongoStore = require("connect-mongo")
const { PRODUCTS } = require("./middlewares/products")
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
    },
  })
)

// MIDDLEWARES

app.use(PRODUCTS)
app.use(expressLayouts)
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/Public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//ROUTES
app.use("/", require("./Routes/index"))
app.use("/bags", require("./Routes/oneProduct"))
app.use("/allProducts", require("./Routes/allProducts"))
app.use("/cart", require("./Routes/cart"))
app.use("/signUp", require("./Routes/signup"))
app.use("/login", require("./Routes/login"))
app.use("/logout", require("./Routes/logout"))

app.listen(PORT, console.log(`Server is running on port : ${PORT}`))
