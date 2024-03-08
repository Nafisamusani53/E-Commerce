const mongoose = require("mongoose")

const cateogrySchema = new mongoose.Schema({
    name:{
        type: String,
        required : true,
    },
    parentCategory: {
        type: mongoose.Schema.ObjectId,
        ref: "MainCategory",
        required: true,
    },
    subCategory: [{
        type: mongoose.Schema.ObjectId,
        ref: "SubCategory",
        required: true,
    }],
    products : [{
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
    }]
})

module.exports = mongoose.model("Category", cateogrySchema)