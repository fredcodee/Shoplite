
const errorHandler = require("../middlewares/errorHandler")
const appServices=  require("../services/appServices")
const userServices= require('../services/userServices')

const health = async (req, res) => {
    return res.json({ 'status': 'ok' })
}

const createStore = async(req, res) =>{
    try {
        const {name, bio, image} = req.body
        const checkIfUserHasStore = await  userServices.getUserStore(req.user._id)
        if(checkIfUserHasStore) return res.status(400).json({message: 'User already has a store'})
        const createNewStore = await appServices.createStore(name,bio,image,req.user._id )
        return res.json(createNewStore)
    } catch (error) {
        errorHandler.errorHandler(error, res)
    }
    
}

const addProduct = async(req, res)=>{
    try {
        const {name, description, stock, price, image, storeId} =  req.body
        //check if user has and own the store
        const storeCheck = await userServices.getUserStore(req.user._id)
        if(storeCheck && storeCheck._id == storeId){
            const product =  await appServices.addProduct(name, description, stock,price,image,storeId)
            return res.json(product)
        }
        return res.status(401).json({massage:"unauthorized access"})

    } catch (error) {
        errorHandler.errorHandler(error, res)
    }
}


const removeProduct = async(req, res)=>{
    try {
        const {productId, storeId} = req.body
        const storeCheck = await userServices.getUserStore(req.user._id)
        if(storeCheck && storeCheck._id == storeId){
            await appServices.removeProduct(productId)
            return res.json({message: "Product removed successfully"})
        }
        return res.status(401).json({massage:"unauthorized access"})
    } catch (error) {
        errorHandler.errorHandler(error, res)
    }
}

const viewStoreProducts = async(req,res)=>{
    try {
        const {storeId} = req.body
        const products = await appServices.getAllStoreProducts(storeId)
        return res.json(products)
    } catch (error) {
        errorHandler.errorHandler(error, res) 
    }
}


module.exports={health, createStore, addProduct, removeProduct, viewStoreProducts}