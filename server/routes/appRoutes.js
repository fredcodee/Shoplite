const router = require('express').Router()
const appcontroller = require('../controllers/appController')
const {userAuth} =  require('../middlewares/auth')
const parser = require('../middlewares/multer')



router.get('/health', appcontroller.health)
router.post('/create-store',userAuth, appcontroller.createStore)
router.post('/add-product', userAuth, appcontroller.addProduct)
router.post('/remove-product', userAuth, appcontroller.removeProduct)
router.post('/store/all-products', appcontroller.viewStoreProducts)
//router.post('/store/products/image/upload',parser.single('image'), appcontroller.addStoreProfileImage)

module.exports= router