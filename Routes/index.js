const { Router } = require("express")
const router = Router()
const path = require("path")
const indexPath = path.normalize("indexController.js")
console.log(indexPath)
const { getPage } = require(indexPath)

router.get("/", getPage)

module.exports = router
