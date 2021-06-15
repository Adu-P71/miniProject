const { Router } = require("express")
const router = Router()

const { getPage, addToCart } = require("../controller/oneProductController")

router.get("/:id", getPage)

router.post("/:id", addToCart)

module.exports = router
