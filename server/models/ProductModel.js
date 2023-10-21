const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    stock:{
        type:Number
    },
    price:{
        type:Number
    },
    rating:{
        type:Number,
        default:null
    },
    image:{
        type:String
    },
    store_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Store',
    }
})

module.exports= mongoose.model('Product',productSchema)