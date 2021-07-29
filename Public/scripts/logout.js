const logout = document.querySelector(".logout")
const cartNumber = document.querySelector(".cart-number")
if (logout) {
  logout.addEventListener("click", async () => {
    try {
      const response = await fetch("/logout", { method: "POST" })
      window.location = "/"
    } catch (error) {
      console.log(error)
    }
  })
}

window.addEventListener("DOMContentLoaded", async (e) => {
  const response = await fetch("/getCartNumber")
  const data = await response.json()
  cartNumber.innerHTML = data.cartNumber
})
