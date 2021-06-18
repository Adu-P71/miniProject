const User = require("../models/users.model")

const handleError = (err) => {
  console.log(err.message, err.code)
  let errors = { email: "", password: "" }

  //incorrect email
  if (err.message === "Incorrect email") {
    errors.email = "this email is not registered"
  }
  if (err.message === "Incorrect password") {
    errors.password = "password is incorrect"
  }

  return errors
}

const postHandler = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)
    res.status(200).json({ user })
  } catch (err) {
    const errors = handleError(err)
    res.status(400).json({ errors })
  }
}
module.exports = {
  postHandler,
}
