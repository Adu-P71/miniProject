const { Router } = require("express")
const router = Router()

const { getPage } = require("../Controllers/allProductsController")

router.get("/", getPage)

module.exports = router
