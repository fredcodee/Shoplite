const router = require('express').Router()
const appcontroller = require('../controllers/appController')
const {userAuth} =  require('../middlewares/auth')



router.get('/health', appcontroller.health)
router.post('/create-store',userAuth, appcontroller.createStore)
router.post('/add-product', userAuth, appcontroller.addProduct)


module.exports= router