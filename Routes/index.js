const { Router } = require("express")
const router = Router()
<<<<<<< Updated upstream
const path = require("path")
const indexPath = path.normalize("../controllers/indexController.js")
console.log(indexPath)
const { getPage } = require(indexPath)
=======

const { getPage, getCartNumber } = require("../controllers/indexController")
>>>>>>> Stashed changes

router.get("/", getPage)

module.exports = router
