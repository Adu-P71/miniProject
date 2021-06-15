const { Router } = require("express")
const router = Router()

const { getPage } = require("../controller/allProductsController")

router.get("/", getPage)

module.exports = router
