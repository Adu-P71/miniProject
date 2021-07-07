const { Router } = require("express")
const router = Router()
// const authMiddleware = require("../middlewares/authMiddleware")

const signupController = require("../Controllers/signupController")

router.get("/", signupController.signupPage)

router.post("/", signupController.postHandler)

module.exports = router
