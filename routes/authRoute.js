const express = require('express')
const {
  signupPage,
  loginPage,
  loginController,
  signupController,
  dashboardPage,
} = require('../controllers/authContoller')
const { requireAuth } = require('../utils/auhtMiddleware')
const router = express.Router()

router.get('/signup', signupPage)
router.post('/signup', signupController)
router.get('/login', loginPage)
router.post('/login', loginController)
router.get('/dashboard', requireAuth, dashboardPage) //protected route

module.exports = router
