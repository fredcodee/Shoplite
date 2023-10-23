const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    name: {
        type: String
    },
    url: {
        type: String,
        default: null
    }
})
    
module.exports = mongoose.model('Image', imageSchema);