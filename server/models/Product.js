const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productName:{
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    mainCategory: {
        type: mongoose.Schema.ObjectId,
        ref : "MainCategory",
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref : "Category",
    },
    subCategory: {
        type: mongoose.Schema.ObjectId,
        ref : "SubCategory",

    },
    imageUrl : {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        Date: Date.now,
    }
})

module.exports = mongoose.model("Product", productSchema)