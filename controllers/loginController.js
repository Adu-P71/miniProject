const User = require("../models/users.model")

const handleError = (err) => {
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

const makeUser = (user) => {
  const User = {
    _id: user._id,
    email: user.email,
    telephone: user.telephone,
  }
  return User
}
const getLogin = (req, res, next) => {
  res.render("loginPage", {
    layout: "../views/loginPage",
  })
}
const postHandler = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)
    const USER = makeUser(user)
    req.session.user = USER

    res.status(200).json({ user })
  } catch (err) {
    const errors = handleError(err)
    res.status(400).json({ errors })
  }
}
module.exports = {
  postHandler,
  getLogin,
}
