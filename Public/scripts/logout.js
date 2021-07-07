const logout = document.querySelector(".logout")
console.log(logout)
if (logout) {
  logout.addEventListener("click", async () => {
    try {
      const response = await fetch("/logout", { method: "POST" })
      window.location = "/"
    } catch (error) {
      console.log(error)
    }
  })
}
