const mongoose = require("mongoose")

const mainCateogrySchema = new mongoose.Schema({
    name:{
        type: String,
        required : true,
    },
    subCategory: [{
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: true,
    }],
    products : [{
            type: mongoose.Schema.ObjectId,
            ref: "Product",
            required: true,
    }]
    
})

module.exports = mongoose.model("MainCategory", mainCateogrySchema)