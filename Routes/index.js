const { Router } = require("express")
const router = Router()

const { getPage, getCartNumber } = require("../Controllers/indexController")

router.get("/", getPage)

router.get("/getCartNumber", getCartNumber)

module.exports = router
