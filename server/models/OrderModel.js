const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    email:{
        type:String,
     },
     address:{
        type:String,
        default:null
     },
     status:{
        type:String, //processing, shipped, completed, cancelled
        required: true
     },
     store_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Store',
        required: true
    },
    date:{
        type:Date,
        default:Date.now
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        default:null
    },
    cart_id:[{type: mongoose.Schema.Types.ObjectId,
      ref:'Cart'
    }],
    total_amount:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('Order', orderSchema)