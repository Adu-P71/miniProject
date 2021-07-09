const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ err })
    }
    res.clearCookie(process.env.SESS_NAME)
    res.json({ sucess: "success" })
  })
}

module.exports = logout
