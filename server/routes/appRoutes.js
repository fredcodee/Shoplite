const router = require('express').Router()
const appcontroller = require('../controllers/appController')
const {userAuth} =  require('../middlewares/auth')



router.get('/health', appcontroller.health)
router.post('/create-store',userAuth, appcontroller.createStore)
router.post('/add-product', userAuth, appcontroller.addProduct)
router.post('/remove-product', userAuth, appcontroller.removeProduct)
router.post('/store/all-products', appcontroller.viewStoreProducts)


module.exports= router