const { Router } = require("express")
const router = Router()

const { getPage } = require("../Controllers/indexController")

router.get("/", getPage)

module.exports = router
