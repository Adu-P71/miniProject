const { Router } = require("express")
const router = Router()

const { postHandler, getLogin } = require("../controllers/loginController")

const { loggedIn } = require("../Middlewares/authMiddleware")

router.get("/", loggedIn, getLogin)

router.post("/", postHandler)

module.exports = router
