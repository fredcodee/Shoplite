
const errorHandler = require("../middlewares/errorHandler")
const appController =  require("../services/appServices")
const userController = require('../services/userServices')

const health = async (req, res) => {
    return res.json({ 'status': 'ok' })
}

const createStore = async(req, res) =>{
    try {
        const {name, bio, image} = req.body
        const checkIfUserHasStore = await  userController.getUserStore(req.user._id)
        if(checkIfUserHasStore) return res.status(400).json({message: 'User already has a store'})
        const createNewStore = await appController.createStore(name,bio,image,req.user._id )
        return res.json(createNewStore)
    } catch (error) {
        errorHandler.errorHandler(error, res)
    }
    
}


module.exports={health, createStore}