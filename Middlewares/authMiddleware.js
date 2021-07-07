const notLoggedIn = (req, res, next) => {
  const { user } = req.session
  if (user) {
    next()
    return
  }
  res.redirect("/login")
}

const loggedIn = (req, res, next) => {
  const { user } = req.session
  if (user) {
    res.redirect("/")
    return
  }
  next()
}

module.exports = { notLoggedIn, loggedIn }
