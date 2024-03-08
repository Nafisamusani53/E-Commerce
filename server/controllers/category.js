const Category = require("../models/Category");
const MainCategory = require("../models/MainCategory");
const SubCategory = require("../models/SubCategory");

exports.getAllCategory = async(req, res) => {
    try{
        const category = await Category.find({}).populate("parentCategory").exec();

        res.status(200).json({
            success: true,
            data: category,
            message: "category fetched successfully",
        })
    }
    catch(error){
        res.status(500).json({
            success:  false,
            error: error,
            message: "Unable to fetch the category",
        })
    }
}

exports.addCategory = async(req,res)=> {
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
        const category = await Category.findOne({name: name});
        if(category){
            return res.status(401).json({
                success: false,
                data: category._id,
                message: "Category already existed"
            })
        }

        // created new Category
        const newCategory = await Category.create({name: name, parentCategory: parentCategoryId})

        // update the mainCategory
        const updatedMainCategory = await MainCategory.findByIdAndUpdate(parentCategoryId, {
            $push: {
                subCategory: newCategory._id
            }
        }, {new:true});

        res.status(200).json({
            success: true,
            data: newCategory,
            message: "Category created successfully"
        })


    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to create Category",
            error: error.message
        })
    }
}

exports.editCategory = async(req, res)=>{
    
    try {
        const categoryId = req.params.id; // Assuming you're passing category ID in the URL params
        const { name } = req.body;
    
        // Find the category by ID
        const category = await Category.findById(categoryId);
    
        if (!category) {
            return res.status(404).json(
            { message: 'Category not found' }
            );
        }
    
        // Update the category name if provided
        if (name) {
            category.name = name;
        }
     
        // Save the updated category
        const updatedCategory = await category.save();
        req.status(200).json({
            success: true,
            data: category,
            message: "Edited successfully"
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to edited Category",
            error: error.message
        })
    }
}

exports.deleteCateogry = async(req, res)=> {
    try{
        const{id} = req.body;

        if(!id){
            res.status(400).json({
                success: false,
                message: "fille the details properly",
            })
        }

        // find the category
        const category = await Category.findById(id);
        if(!category){
            // category do not exist
            res.status(400).json({
                success: false,
                message: "Category do not exist"
            })
        }

        await SubCategory.deleteMany({parentCategory: category._id});
        await Category.findByIdAndDelete(id);

        const updatedMainCategory = await MainCategory.findByIdAndUpdate(parentCategoryId, {
            $pull: {
                subCategory: category._id
            }
        }, {new:true}).populate("subCategory").exec();

        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            updatedMainCategory,
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to delete the category",
        })
    }
}