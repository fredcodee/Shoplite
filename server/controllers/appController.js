
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

const addProduct = async(req, res)=>{
    try {
        const {name, description, stock, price, image, storeId} =  req.body
        //check if user has and own the store
        const storeCheck = await userController.getUserStore(req.user._id)
        if(storeCheck && storeCheck._id == storeId){
            const product =  await appController.addProduct(name, description, stock,price,image,storeId)
            return res.json(product)
        }
        return res.status(401).json({massage:"unauthorized access"})

    } catch (error) {
        errorHandler.errorHandler(error, res)
    }
}


module.exports={health, createStore, addProduct}