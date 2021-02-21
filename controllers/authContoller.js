const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { createToken, maxAge } = require('../utils/token')

//function to handle errors
const handleErrors = err => {
  // console.log(err.message, err.code)
  let errors = { email: '', password: '' }

  //duplicate error code to have unique user email
  if (err.code === 11000) {
    errors.email = 'That email is already registered'
    return errors
  }

  //validation errors
  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      //console.log(properties)
      errors[properties.path] = properties.message
    })
  }
  return errors
}

//show the sign up page
const signupPage = (req, res) => {
  res.json({ message: 'Welcome to the signup page' })
}

//show the login page
const loginPage = (req, res) => {
  res.json({ message: 'Welcome to the login page' })
}

//handle user signup
const signupController = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = new User({
      email: email,
      password: password,
    })
    let newUser = await user.save()
    const token = createToken(user._id) //generate the json web token
    //setting the cookie
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })

    res.status(201).json({ user: user._id })
  } catch (err) {
    const errors = handleErrors(err)

    res.status(400).json({ errors })
  }
}
//handle user login
const loginController = (req, res) => {
  res.json({ message: 'Login successful' })
}

module.exports = { signupPage, loginPage, signupController, loginController }
