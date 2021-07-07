const logout = (req, res) => {
  req.session.user = null
  res.send("logged out")
}

module.exports = logout
