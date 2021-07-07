const { Router } = require("express")
const router = Router()

const { getPage } = require("../controllers/allProductsController")

router.get("/", getPage)

module.exports = router
