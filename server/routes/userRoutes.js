const router = require('express').Router()
const userController = require('../controllers/userController')
const {userAuth} = require('../middlewares/auth');



router.get('/profile',userAuth, userController.getUserProfile)
router.get('/my-store', userAuth, userController.getUserStoreProfile)

module.exports= router