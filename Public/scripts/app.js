const menuIcon = document.querySelector(".menu-icon")
const menuList = document.querySelector("nav ul")
const productImage = document.querySelector(".pro-img")
const productImages = document.querySelectorAll(".small-img-column img")
const cartButtons = document.querySelectorAll(".addBag")
const cartImage = document.querySelector(".cart-button")

function handleCartButton(button) {
  cartImage.classList.add("bounce")
  button.classList.add("added")
  button.disabled = true
  button.previousElementSibling.disabled = true
  button.id = 0
  button.textContent = "Added To Cart"
}
cartButtons.forEach((cartButton) => {
  cartButton.addEventListener("click", async () => {
    const data = { quantity: parseInt(cartButton.previousElementSibling.value) }
    const postMethod = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset = UTF-8",
      },
      body: JSON.stringify(data),
    }
    if (cartButton.id !== 0) {
      try {
        const response = await fetch(`/bags/${cartButton.id}`, postMethod)
        const msg = await response.json()
        handleCartButton(cartButton)
        console.log(msg.msg)
      } catch (error) {
        console.log("there was an error")
      }
    } else {
      alert("it has already been added to the cart")
    }
  })
})
menuIcon.addEventListener("click", () => {
  menuList.classList.toggle("add-height")
})
productImages.forEach((image) => {
  image.addEventListener("click", () => {
    const src = image.getAttribute("src")
    productImage.setAttribute("src", src)
  })
})
