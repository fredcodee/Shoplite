const userServices =  require("../services/userServices")
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

module.exports={getUserProfile, getUserStoreProfile, storeDashBoard}