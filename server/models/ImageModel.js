const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    name: {
        type: String
    },
    url: {
        type: String,
        default: null
    },
    store_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Store'
    }
})
    
module.exports = mongoose.model('Image', imageSchema);