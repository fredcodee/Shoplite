const mongoose  = require("mongoose")

const storeSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    bio:{
        type:String
    },
    rating:{
        type: Number,
        default:0
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    date_created:{
        type:Date,
        default:Date.now
    },
    image: {
        type: String 
    }
})

module.exports = mongoose.model('Store', storeSchema)