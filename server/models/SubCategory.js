const mongoose = require("mongoose")

const subCateogrySchema = new mongoose.Schema({
    name:{
        type: String,
        required : true,
    },
    parentCategory: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: true,
    },
    products : [{
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
    }]
})

module.exports = mongoose.model("SubCategory", subCateogrySchema)