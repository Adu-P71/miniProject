const { Router } = require("express")
const router = Router()

const { getPage } = require("../controllers/indexController")

router.get("/", getPage)

module.exports = router
