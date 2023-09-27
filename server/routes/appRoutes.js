const router = require('express').Router()
const controller = require('../controllers/appController')



router.get('/health', controller.health)


module.exports= router