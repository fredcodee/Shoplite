const userService =  require("../services/userServices")
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

module.exports={getUserProfile}