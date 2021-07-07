const mongoose = require("mongoose")
const { isEmail } = require("validator")
const bycrypt = require("bcrypt")
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  telephone: {
    type: String,
    required: [true, "Please enter a telephone number"],
    validate: [
      (tel) => {
        return tel.match(
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        )
      },
      "Please enter a valid mobile phone",
    ],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "minimum password length is 6 characters"],
  },
})

//fire a function before doc is save to db
UserSchema.pre("save", async function (next) {
  const salt = await bycrypt.genSalt()
  this.password = await bycrypt.hash(this.password, salt)
  // console.log("this is ", this)
  next()
})

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email })
  if (user) {
    const auth = await bycrypt.compare(password, user.password)
    if (auth) {
      return user
    }
    throw Error("Incorrect password")
  }
  throw Error("Incorrect email")
}
module.exports = mongoose.model("user", UserSchema)
