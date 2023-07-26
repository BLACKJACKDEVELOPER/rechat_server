const express = require('express')
const app = express()
const path = require('path')

const session = require('express-session')
const CORS = require('cors')

const JWT = require('jsonwebtoken')
require('dotenv').config()

// config Server
//public folder
app.use(express.static(path.join(__dirname, 'public')))
// enable json request
app.use(express.json({ limit: '200mb' })) // limit data per request cant more than 50mb
app.use(express.urlencoded({ limit: '200mb', extended: true }))
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'supersecret',
  cookie: {
    httpOnly: false,
    secure: false,
  },
}))
app.use(CORS())
app.use(async (req, res, next) => {
  try {
    const token = req.body.token || req.query.token
    if (req.path == '/login' || req.path == '/register') {return next()}
    const auth = await JWT.verify(token, process.env.JWT)
    if (auth || req.path == '/login' || req.path == '/register') {return (req.user = auth,next())}else{throw new Error('')}
  } catch (e) {
    res.status(200).json({
      pass: false,
      logout: true,
      msg: 'เซสชั่นหมดอายุ 👓 '
    })
  }
})

module.exports = app