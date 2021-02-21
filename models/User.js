const mongoose = require('mongoose')
const { Schema } = mongoose
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')
//define the schema
const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
})

//encrypt password before being saved to the database
userSchema.pre('save', async function (next) {
  //generate salt
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

//define model from the schema
const User = mongoose.model('User', userSchema)

module.exports = User
