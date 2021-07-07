const form = document.querySelector("form")
const passwordError = document.querySelector(".password.error")
const emailError = document.querySelector(".email.error")
const telError = document.querySelector(".telephone.error")
const telephoneField = form.querySelector("#tel")
const telInput = window.intlTelInput(telephoneField, {
  initialCountry: "gh",
  preferredCountries: ["gh"],
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
})
form.addEventListener("submit", async (e) => {
  e.preventDefault()
  //reset errors
  console.log(telInput.getNumber())
  emailError.textContent = ""
  passwordError.textContent = ""
  telError.textContent = ""

  //get the values
  const email = form.email.value
  const password = form.password.value
  const telephone = telInput.getNumber()

  try {
    const reqObject = {
      method: "POST",
      body: JSON.stringify({ email, telephone, password }),
      headers: { "Content-Type": "application/json" },
    }

    const res = await fetch("/signUp", reqObject)
    const data = await res.json()
    if (data.user) {
      window.location = "/login"
    }
    if (data.errors) {
      emailError.textContent = data.errors.email
      passwordError.textContent = data.errors.password
      telError.textContent = data.errors.telephone
    }
  } catch (err) {
    console.log(err)
  }
})
