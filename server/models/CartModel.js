const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
     quantity:{
        type:Number,
        required: true
     },
     amount:{
      type:Number,
      required: true
     },
     product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
     },
     store_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Store'
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        default:null
    }
})

module.exports = mongoose.model('Cart', cartSchema)