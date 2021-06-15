const { Router } = require("express")
const router = Router()

const { getPage } = require("../controller/indexController")

router.get("/", getPage)

module.exports = router
