const mongoose = require('mongoose')
const { Schema } = mongoose
const { isEmail } = require('validator')

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

//define model from the schema
const User = mongoose.model('User', userSchema)

module.exports = User
