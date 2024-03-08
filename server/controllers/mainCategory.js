const Category = require("../models/Category")
const MainCategory = require("../models/MainCategory")
const SubCategory = require("../models/SubCategory")

exports.addMainCategory = async(req, res) => {
    try{
        // fetch data
        const{mainCategoryName} = req.body
        console.log("hello")
        // data validation
        if(!mainCategoryName){
            return res.status(400).json({
                success: false,
                message: "Missing properties"
            })
        }

        // create section
        const mainCategory = await MainCategory.create({name : mainCategoryName})
        
        // return response
        return res.status(200).json({
            success: true,
            message: "Main Category created",
            mainCategory
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Failed to create Main Category",
            error : error.message
        })
    }
}
exports.editMainCategory = async(req, res) => {
    try{
        // fetch data
        const{mainCategoryName, id} = req.body
        
        // data validation
        if(!mainCategoryName || !id){
            return res.status(400).json({
                success: true,
                message: "Missing properties"
            })
        }

        // find the mainCategory
        const mainCategory = await MainCategory.findById(id);
        if(!mainCategory){
            return res.status(404).json({
                success: true,
                message: "No such Category exist"
            })
        }
        // create section
       const updateMainCategory = await MainCategory.findByIdAndUpdate(id, 
        {name: mainCategoryName},
        {new: true});
        
        // return response
        return res.status(200).json({
            success: true,
            message: "Main Category updated",
            updateMainCategory
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Failed to update Main Category",
            error : error.message
        })
    }
}

exports.deleteMainCategory = async(req, res)=> {
    try{
        const {id} = req.body;

        if(!id){
            return req.status(403).json({
                success: false,
                message: "Fill details properly"
            })
        }

        // find the id if exist
        const mainCategory = await MainCategory.findById(id);
        if(!mainCategory){
            return req.status(404).json({
                success: false,
                message: "No such category exist"
            })
        } 

        // delete all the subCategory and category
        await Promise.all(mainCategory.subCategory.map(async (category) => {
            await SubCategory.deleteMany({ parentCategory: category });
        }));

        await Category.deleteMany({parentCategory: mainCategory._id})

        await MainCategory.deleteOne({_id: mainCategory._id})

        return res.status(200).json({
            success: true,
            message: "Main Category deleted",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Failed to delete Main Category",
            error : error.message
        })
    }
}