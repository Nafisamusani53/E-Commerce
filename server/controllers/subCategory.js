const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");

exports.addSubCategory = async(req, res)=>{
    try{
        // Extract data from request body
        const {name, parentCategoryId} = req.body;
        // if parentCategory is null then it is the main category
        
        if(!name || !parentCategoryId){
            return res.status(400).json({
                success: false,
                message: "Fill the details properly",
            })
        }

        // if that category already existed
        const subCategory = await SubCategory.findOne({name: name});
        if(subCategory){
            return res.status(401).json({
                success: false,
                data: subCategory._id,
                message: "SubCategory already existed"
            })
        }

        // created new Sub Category
        const newSubCategory = await SubCategory.create({name: name, parentCategory: parentCategoryId})

        // update the Category
        const updatedCategory = await Category.findByIdAndUpdate(parentCategoryId, {
            $push: {
                subCategory: newSubCategory._id
            }
        }, {new:true});

        res.status(200).json({
            success: true,
            data: newSubCategory,
            message: "Sub Category created successfully"
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to create Sub Category",
            error: error.message
        })
    }
}

exports.editSubCategory = async(req, res)=>{
    
    try {
        const categoryId = req.params.id; // Assuming you're passing category ID in the URL params
        const { name } = req.body;
    
        // Find the category by ID
        const subCategory = await SubCategory.findById(categoryId);
    
        if (!subCategory) {
            return res.status(404).json(
            { message: 'Category not found' }
            );
        }
    
        // Update the category name if provided
        if (name) {
            subCategory.name = name;
        }
     
        // Save the updated category
        const updatedSubCategory = await subCategory.save();
        req.status(200).json({
            success: true,
            data: updatedSubCategory,
            message: "Edited successfully"
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to edited Sub Category",
            error: error.message
        })
    }
}
exports.deleteSubCateogry = async(req, res)=> {
    try{
        const{id} = req.body;

        if(!id){
            res.status(400).json({
                success: false,
                message: "fille the details properly",
            })
        }

        // find the category
        const subCategory = await SubCategory.findById(id);
        if(!subCategory){
            // category do not exist
            res.status(400).json({
                success: false,
                message: "Sub Category do not exist"
            })
        }

        await SubCategory.findByIdAndDelete(id);

        const updatedCategory = await Category.findByIdAndUpdate(parentCategoryId, {
            $pull: {
                subCategory: subCategory._id
            }
        }, {new:true}).populate("subCategory").exec();

        res.status(200).json({
            success: true,
            message: "Sub Category deleted successfully",
            updatedCategory,
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to delete the Sub Category",
        })
    }
}