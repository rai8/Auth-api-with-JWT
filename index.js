require('dotenv').config()
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 5500
const mongoose = require('mongoose')
const authRouter = require('./routes/authRoute')

//connecting to the mongoose databasa
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('-----Database is successfulyy connected--------'))
  .catch(err => {
    if (err) throw err
  })

//setting up middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/auth', authRouter)
//root route
app.get('/', (req, res) => {
  res.send('Welcome to Auth api')
})

//listening to the server
app.listen(PORT, () => console.log(`-------server is up and runnning-------`))
