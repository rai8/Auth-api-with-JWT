const express = require('express')
const { signupPage, loginPage, loginController, signupController } = require('../controllers/authContoller')
const router = express.Router()

router.get('/signup', signupPage)
router.post('/signup', signupController)
router.get('/login', loginPage)
router.post('/login', loginController)

module.exports = router
