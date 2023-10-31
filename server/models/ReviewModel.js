const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    email:{
        type:String,
     },
     comment:{
        type:String,
     },
     product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
     },
     store_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Store',
        required:true
    },
    date:{
        type:Date
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        default:null
    },
    rating:{
        type:Number,
        default: 5
    }
})

module.exports = mongoose.model('Review', reviewSchema)