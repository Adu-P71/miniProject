const { Router } = require("express")
const router = Router()
const path = require("path")
const indexPath = "./Controllers/indexController.js"
const { getPage } = require(indexPath)

router.get("/", getPage)

module.exports = router
