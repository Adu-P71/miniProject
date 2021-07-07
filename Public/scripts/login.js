const form = document.querySelector("form")
const passwordError = document.querySelector(".password.error")
const emailError = document.querySelector(".email.error")

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  //reset errors
  emailError.textContent = ""
  passwordError.textContent = ""

  //get the values
  const email = form.email.value
  const password = form.password.value
  try {
    const reqObject = {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    }

    const res = await fetch("/login", reqObject)
    const data = await res.json()

    if (data.errors) {
      emailError.textContent = data.errors.email
      passwordError.textContent = data.errors.password
      return
    }

    window.location = "/"
  } catch (err) {
    console.log(err)
  }
})
