const router = require('express').Router()
const userController = require('../controllers/userController')
const appController = require('../controllers/appController')

const {userAuth} = require('../middlewares/auth');
const parser = require('../middlewares/multer')



router.get('/profile',userAuth, userController.getUserProfile)
router.get('/my-store', userAuth, userController.getUserStoreProfile)
router.post('/store/profile/image/upload',parser.single('image'), appController.addStoreProfileImage)
router.post('/store/dashboard', userAuth, userController.storeDashBoard)
router.post('/add/cart', userAuth, userController.addToCart)
router.post('/order', userAuth, userController.order)
router.post('/store/profile/edit', userAuth, userController.editStoreProfile)


module.exports= router