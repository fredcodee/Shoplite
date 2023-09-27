const mongoose = require('mongoose')

const cartSchema = new mongoose({
     quantity:{
        type:Number,
        required
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
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        default:null
    }
})

module.exports = mongoose.model('Cart', cartSchema)