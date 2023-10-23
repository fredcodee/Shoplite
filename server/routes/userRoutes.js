const router = require('express').Router()
const userController = require('../controllers/userController')
const appController = require('../controllers/appController')

const {userAuth} = require('../middlewares/auth');
const parser = require('../middlewares/multer')



router.get('/profile',userAuth, userController.getUserProfile)
router.get('/my-store', userAuth, userController.getUserStoreProfile)
router.post('/store/profile/image/upload',parser.single('image'), appController.addStoreProfileImage)



module.exports= router