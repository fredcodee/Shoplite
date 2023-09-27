const mongoose = require('mongoose')

const reviewSchema = new mongoose({
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
        required
    },
    date:{
        type:Date
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        default:null
    }
})

module.exports = mongoose.model('Review', reviewSchema)