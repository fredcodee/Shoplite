const router = require('express').Router()
const controller = require('../controllers/userController')
const {userAuth} = require('../middlewares/auth');



router.get('/profile',userAuth, controller.getUserProfile)

module.exports= router