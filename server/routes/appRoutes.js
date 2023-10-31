const router = require('express').Router()
const appcontroller = require('../controllers/appController')
const {userAuth} =  require('../middlewares/auth')
const parser = require('../middlewares/multer')



router.get('/health', appcontroller.health)
router.post('/create-store',userAuth, appcontroller.createStore)
router.post('/add-product', userAuth, appcontroller.addProduct)
router.post('/remove-product', userAuth, appcontroller.removeProduct)
router.post('/store/all-products', appcontroller.viewStoreProducts)
router.post('/store/products/images/upload',parser.array('images', 3), appcontroller.uploadProductImages)
router.post('/store/product', appcontroller.getProduct)
router.post('/store/product/edit', userAuth, appcontroller.editProduct)
router.post('/store/all/orders', userAuth, appcontroller.storeOrders)
router.post('/store/order/status',  userAuth, appcontroller.updateOrderStatus)
module.exports= router