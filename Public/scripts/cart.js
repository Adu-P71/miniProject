const removeButtons = document.querySelectorAll("table a")
const updateQuantity = document.querySelectorAll("table input")
const Total = document.querySelector("#total")
const checkout = document.querySelector("#checkout")

removeButtons.forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    e.preventDefault()
    const tr = btn.parentElement.parentElement.parentElement.parentElement
    const parentElement = tr.parentElement
    parentElement.removeChild(tr)

    // table.removeChild(parentElement)
    const deleteMethod = {
      method: "DELETE",
    }
    try {
      const response = await fetch(`/cart/${btn.id}`, deleteMethod)
      const data = await response.json()
      Total.innerHTML = `Ghc ${data.Total}.00`
    } catch (error) {
      console.log("there was an error")
    }
  })
})

updateQuantity.forEach((input) => {
  input.addEventListener("input", async () => {
    if (input.value < 1) {
      input.value = 1
    }
    const parentElement = input.parentElement.parentElement
    const id = parentElement.querySelector("a").id
    const subTotal = parentElement.querySelector(".subtotal")
    const data = {
      quantity: parseInt(input.value),
      id: id,
    }
    const putMethod = {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset = UTF-8",
      },
      body: JSON.stringify(data),
    }
    try {
      const response = await fetch(`/cart/${id}`, putMethod)
      const data = await response.json()
      Total.innerHTML = `Ghc ${data.Total}.00`
      subTotal.innerHTML = `Ghc ${data.subTotal}.00`
    } catch (error) {
      console.log("there was an error", error)
    }
  })
})

checkout.addEventListener("click", async () => {
  if (document.querySelectorAll("table a").length === 0) {
    console.log("no items in the cart")
    return
  }

  try {
    const response = await fetch("/cart/checkout", { method: "POST" })
    const data = await response.json()
    if (data.failure) {
      window.location = "/login"
      return
    }
    window.location = "/"
  } catch (error) {
    console.log("there was an error")
  }
})
