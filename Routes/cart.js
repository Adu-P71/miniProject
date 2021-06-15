const { Router } = require("express")
const router = Router()

const {
  getPage,
  updateCart,
  deleteFromCart,
  checkOut,
} = require("../controller/cartController")

router.get("/", getPage)

router.put("/:id", updateCart)

router.delete("/:id", deleteFromCart)

router.post("/checkout", checkOut)

module.exports = router
