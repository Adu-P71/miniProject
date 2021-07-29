const { Router } = require("express")
const router = Router()

const { getPage, getCartNumber } = require("../controllers/indexController")
const path = require("path")
const indexPath = path.normalize("../controllers/indexController.js")

router.get("/", getPage)

router.get("/getCartNumber", getCartNumber)

module.exports = router
