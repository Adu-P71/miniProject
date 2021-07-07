const { Router } = require("express")
const router = Router()

const {
  getPage,
  updateCart,
  deleteFromCart,
  checkOut,
} = require("../controllers/cartController")
const protectCart = (req, res, next) => {
  const { user } = req.session
  if (user) {
    next
  } else {
    res.json({ msg: "there was no user" })
  }
}
router.get("/", getPage)

router.put("/:id", updateCart)

router.delete("/:id", deleteFromCart)

router.post("/checkout", checkOut)

module.exports = router
