const userServices =  require("../services/userServices")
const appServices = require('../services/appServices')
const errorHandler = require("../middlewares/errorHandler")


const getUserProfile = async (req, res) =>{
    try{
        const user = req.user;
        res.json(user)
    }
    catch(error){
        errorHandler.errorHandler(error, res)
    }
}
const getUserStoreProfile = async(req,res) =>{
 try {
    const store = await userServices.getUserStore(req.user._id)
    if (store) return res.json(store)
    return res.status(401).json({message: "user has no store"})
 } catch (error) {
    errorHandler.errorHandler(error, res)
 }
}

const storeDashBoard =async(req, res) =>{
    try {
        const {storeId} = req.body
        const storeCheck = await userServices.checkUserHasOwnStore(req.user._id, storeId)
        if(storeCheck){
            const props = await userServices.dashboardProps(storeId)
            return res.json(props)
        }
        return res.status(401).json({massage:"unauthorized access"})
    } catch (error) {
        errorHandler.errorHandler(error, res) 
    }
}

const addToCart = async(req, res)=>{
    try{
        const{ storeId, amount, productId, quantity} = req.body
        const addToCart = await appServices.cart(storeId, amount, productId, quantity,  req.user)
        return res.json(addToCart)
    } catch(error){
        errorHandler.errorHandler(error, res)
    }
}

const getCart = async(req, res) =>{
    try {
        const cart  =  await appServices.getCart(req.user)
        res.json(cart)
    } catch (error) {
        errorHandler.errorHandler(error, res)
    }
}

const deleteCart  = async(req, res)=>{
    try{
        const {cartIds} = req.body
        for (const cartId of cartIds){
            await appServices.deleteCart(cartId, req.user)
        }
        res.json({ message: "Cart(s) removed" });

    }
    catch(error){
        errorHandler.errorHandler(error, res)
    }
}

const order = async (req, res) => {
    try {
        const { email, address, cartIds} = req.body; //cartIds is an array
        await appServices.order(email, address, "processing", req.user._id, cartIds);
        return res.json({ message: 'Orders placed successfully' });
    } catch (error) {
        errorHandler.errorHandler(error, res);
    }
}



const editStoreProfile = async(req,res)=>{
    try {
        const {name, bio, storeId} = req.body
        const storeCheck = await userServices.checkUserHasOwnStore(req.user._id, storeId)
        if(storeCheck){
            const store = await userServices.updateStoreProfile(storeId,name, bio)
            return res.json(store)
        }
    } catch (error) {
        errorHandler.errorHandler(error, res) 
    }
}

const myOrders = async(req, res)=>{
    try{
        const orders = await userServices.getUserAllOrders(req.user._id)
        return res.json(orders)
    }catch (error) {
        errorHandler.errorHandler(error, res) 
    }
}

const reviewAndRateProducts = async(req, res)=>{
    try{
        const {review, rating, productId, storeId} = req.body
        await userServices.reviewAndRateProduct(review, rating, req.user, productId, storeId)
        return  res.json({message: "review submitted"})
    }catch(error){
        errorHandler.errorHandler(error, res)
    }
}



module.exports={getUserProfile, getUserStoreProfile, storeDashBoard, addToCart, order, editStoreProfile, getCart, deleteCart, myOrders, reviewAndRateProducts}