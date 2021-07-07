const { Router } = require("express")
const router = Router()

const logout = require("../Controllers/logoutController")
router.post("/", logout)

module.exports = router
