const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        trim: true,
        required: true
    },
    productPrice:{
        type: Number,
        required: true
    },
    quantity :{
        type: Number,
        required: true
    },
    decription:{
        type: String,
        trim: true,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    subCategory : {
        type: String,
        required: true
    },
    images:[
        {
            type: String,
            required: true
        }
    ],
    popular :{
        type: Boolean,
        default: false
    },

    recommend : {
        type: Boolean,
        default: false
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
