const mongoose = require('mongoose')

const orderSchema = new mongoose({
    email:{
        type:String,
     },
     Address:{
        type:String,
        default:null
     },
     quantity:{
        type:Number,
        required
     },
     status:{
        type:String //processing, to ship, completed cancelled
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
        type:Date,
        default:Date.now
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        default:null
    }
})

module.exports = mongoose.model('Order', orderSchema)