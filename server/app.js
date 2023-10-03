require('dotenv').config();
const express = require('express')
const cors =  require('cors')
const appRoutes = require('./routes/appRoutes')
const authRoutes = require('./routes/auth')
const connectToMongoDB = require('./configs/database')
const bodyParser = require('body-parser');
const passport = require('passport')
require('./passport.js')
const cookieSession = require('cookie-session')

//connect to db
connectToMongoDB()

const app = express()

app.use(
  cookieSession({
    name:"session",
    keys: [process.env.COOKIE_SECRET],
    maxAge: process.env.SESSION_EXPIRY
  })
);
app.use(function(request, response, next) {
  if (request.session && !request.session.regenerate) {
      request.session.regenerate = (cb) => {
          cb()
      }
  }
  if (request.session && !request.session.save) {
      request.session.save = (cb) => {
          cb()
      }
  }
  next()
})

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json())

app.use(cors())
app.use('/api', appRoutes)
app.use('/auth', authRoutes)

app.listen(process.env.PORT,()=>{
    console.log("server is up on port: " + process.env.PORT)
})

module.exports = app;