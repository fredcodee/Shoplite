
const errorHandler = require("../middlewares/errorHandler")
const appServices=  require("../services/appServices")
const userServices= require('../services/userServices')

const health = async (req, res) => {
    return res.json({ 'status': 'ok' })
}

const createStore = async(req, res) =>{
    try {
        const {name, bio} = req.body
        const checkIfUserHasStore = await  userServices.getUserStore(req.user._id)
        if(checkIfUserHasStore) return res.status(400).json({message: 'User already has a store'})
        const createNewStore = await appServices.createStore(name,bio,req.user._id )
        return res.json(createNewStore)
    } catch (error) {
        errorHandler.errorHandler(error, res)
    }
    
}

const addStoreProfileImage = async(req, res)=>{
    try {
        const file = req.file;
        const {storeId}= req.body;

        //error handling if file is not jpg or jpeg
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return res.status(400).send('Please upload a image file')
        }
        // save image
        const saveImage =  await appServices.saveImages(file.filename,  file.path)
        if(saveImage){
            await userServices.addUpdateStoreImage(storeId, saveImage._id)
            return res.json({massage:"store image updated"})
        }
        return res.json(file)
    } catch (error) {
        errorHandler.errorHandler(error, res)
    }
}

const addProduct = async(req, res)=>{
    try {
        const {name, description, stock, price, image, storeId} =  req.body
        //check if user has and own the store
        const storeCheck = await userServices.checkUserHasOwnStore(req.user._id, storeId)
        if(storeCheck){
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
        const storeCheck = await userServices.checkUserHasOwnStore(req.user._id, storeId)
        if(storeCheck){
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

const uploadProductImages = async(req,res)=>{
    try {
        const images  = req.files
        const {productId} = req.body

        //save image
        for(const image of images){
            const saveImage = await appServices.saveImages(image.filename, image.path)
            if(saveImage) await appServices.addImagesToProducts(productId, saveImage._id)   
        }
        //save imaages to product
        return res.json({massage:"images added to product"})
    } catch (error) {
        errorHandler.errorHandler(error, res)
    }
}
const getProduct = async(req, res)=>{
    try {
        const {productId} = req.body
        const response =  await appServices.getProductDetails(productId)
        return res.json(response)

    } catch (error) {
        errorHandler.errorHandler(error, res)
    }
}

const editProduct = async (req, res) => {
    try {
        const { storeId, productId, name, description, stock, price, images } = req.body
        const storeCheck = await userServices.checkUserHasOwnStore(req.user._id, storeId)
        if (storeCheck) {
            const response = await appServices.updateProductDetails(productId, name, description, stock, price, images)
            return res.json(response)
        }
        return res.status(401).json({massage:"unauthorized access"})
    } catch (error) {
        errorHandler.errorHandler(error, res)
    }
}

const storeOrders  = async(req, res)=>{
    try {
        const {storeId } =req.body
        const storeCheck = await userServices.checkUserHasOwnStore(req.user._id, storeId)
        if (storeCheck) {
            const orders =  await appServices.getStoreOrders(storeId)
            return res.json(orders)
        }
        return res.status(401).json({massage:"unauthorized access"})
    } catch (error) {
        errorHandler.errorHandler(error, res)
    }
}

const updateOrderStatus = async(req, res)=>{
    try {
        const {storeId, orderId, status} = req.body
        const storeCheck = await userServices.checkUserHasOwnStore(req.user._id, storeId)
        if (storeCheck) {
            await appServices.updateOrderStatus(orderId, status)
            return res.json("status updated")
        }
    } catch (error) {
        errorHandler.errorHandler(error, res)
    }
}

const getAllReviews = async(req, res)=>{
    try{
        const {storeId} = req.body
        const reviews = await appServices.getAllReviews(storeId);
        res.json(reviews);
    }catch(error){
        errorHandler.errorHandler(error, res)
    }
}



module.exports={health, createStore, addProduct, removeProduct, viewStoreProducts, addStoreProfileImage, uploadProductImages, getProduct,
    editProduct, storeOrders, updateOrderStatus, getAllReviews }