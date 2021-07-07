const User = require("../models/users.model")

//handle errors
const handleError = (err) => {
  // console.log(err.code)
  let errors = { email: "", password: "", telephone: "" }

  if (err.code === 11000) {
    errors.email = "that email is already registered"
  }
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    })
  }

  return errors
}

const signupPage = (req, res, next) => {
  res.render("signupPage", {
    layout: "../views/signupPage",
  })
}

const postHandler = async (req, res, next) => {
  const { email, password, telephone } = req.body

  try {
    const user = await User.create({
      email: email,
      telephone: telephone,
      password: password,
    })
    res.status(200).json({ user })
  } catch (err) {
    const errors = handleError(err)
    res.status(400).json({ errors })
  }
}

module.exports = {
  signupPage,
  postHandler,
}
