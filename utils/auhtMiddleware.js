const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt //where jwt is the name of our cookie we called earlier on

  //check web token exists and is verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err)
        res.redirect('/auth/login')
      } else {
        console.log(decodedToken)
        next()
      }
    })
  } else {
    res.redirect('/auth/login')
  }
}

module.exports = { requireAuth }
