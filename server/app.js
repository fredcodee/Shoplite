require('dotenv').config();
const express = require('express')
const cors =  require('cors')
const appRoutes = require('./routes/appRoutes')
const authRoutes = require('./routes/auth')
const  userRoutes = require('./routes/userRoutes')
const connectToMongoDB = require('./configs/database')
const bodyParser = require('body-parser');

//connect to db
connectToMongoDB()

const app = express()
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json())

app.use(cors())
app.use('/api', appRoutes)
app.use('/auth', authRoutes)
app.use('/api/user', userRoutes)

app.listen(process.env.PORT,()=>{
    console.log("server is up on port: " + process.env.PORT)
})

module.exports = app;