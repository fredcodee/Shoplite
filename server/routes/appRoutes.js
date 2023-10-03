const router = require('express').Router()
const controller = require('../controllers/appController')



router.get('/health', controller.health)
router.post('/login', controller.login)

module.exports= router