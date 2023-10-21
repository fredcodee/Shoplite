const router = require('express').Router()
const userController = require('../controllers/userController')
const {userAuth} = require('../middlewares/auth');



router.get('/profile',userAuth, userController.getUserProfile)

module.exports= router