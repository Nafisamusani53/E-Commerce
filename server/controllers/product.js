const Product = require("../models/Product")
const Category = require("../models/Category")
const MainCategory = require("../models/MainCategory")
const SubCategory = require("../models/SubCategory")
const User = require("../models/User")
const {imageUploader} = require("../utils/imageUploader")
const {deleteFile} = require("../utils/deleteFIle")
const { response } = require("express")
require("dotenv").config();

exports.getAllproduct = async(req, res)=>{
    try{
        const products = await Product.find({});

        res.status(200).json({
            success: true,
            products
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}
exports.addProduct = async(req,res) => {
    try{
        const {productName,
            productDescription,
            price,
            quantity,
            mainCategory,
            category,
            subCategory,
        } = req.body

        console.log("fetched data")

        const image = req.files.image

        console.log("read image")
        if(!productName ||
            !productDescription ||
            !price ||
            !quantity ||
            !(category || mainCategory || subCategory) ||
            !image
            ) {
                return res.status(404).json({
                    success : false,
                    message: "Fill the details properly",
                    productName,
            productDescription,
            price,
            quantity,
            mainCategory,
            category,
            subCategory,
                })
        }
        const price2 = parseInt(price)
        const quantity2 = parseInt(quantity)
        //check if the user is an admin
        const userId = req.user._id

        //check given Category is valid or not
        let categoryDetails;
        if(mainCategory !== undefined){
            categoryDetails = await MainCategory.findById(mainCategory)
            
        }
        else if(Category !== undefined){
            categoryDetails = await Category.findById(category)
        }
        else if(subCategory !== undefined){
            categoryDetails = await SubCategory.findById(subCategory)
        }
        if(!categoryDetails){
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }
        console.log("category checked")

        const imageResponse = await imageUploader(image, process.env.FOLDER_NAME, 50, 80)
        const product = new Product ({
            productName,
            productDescription,
            price : price2,
            quantity : quantity2,
            imageUrl: imageResponse.secure_url,
        })
        if(mainCategory){
            product.mainCategory = mainCategory
        }
        if(category){
            product.category = category
        }
        if(subCategory){
            product.subCategory = subCategory
        }
        
        console.log(imageResponse)
        const result = await product.save();

        console.log("product created")
        // update category
        if(mainCategory){
            await MainCategory.findByIdAndUpdate(mainCategory,
                {
                    $push : {
                        products : result._id,
                    }
                },{new : true}
            )
            
        }
        else if(Category){
            await Category.findByIdAndUpdate(category,
                {
                    $push : {
                        products : result._id,
                    }
                },{new : true}
            )
        }
        else if(subCategory){
            await SubCategory.findByIdAndUpdate(subCategory, 
                {
                    $push : {
                        products : result._id,
                    }
                },{new : true}
            )
        }

        console.log("category updated")
        // Update user
        await User.findByIdAndUpdate(userId, 
            {
                $push : {
                    products : result._id,
                }
            },{new : true}
        )

        console.log("success")
        
        return res.status(200).json({
            success: true,
            message: "Product created successfully",
            data: result
        })
    }
    catch(error){
        res.status(500).json({
            success :  false,
            message: "Failed to create product",
            error : error.message
        })
    }
}

exports.deleteProduct = async(req, res) => {
    try{
        const {id} = req.body;
        const userId = req.user._id;


        if(!id){
            return res.status(404).json({
                success : false,
                message: "Fill the details properly",
            }) 
        }

        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({
                success : false,
                message: "Product do not exist",
            }) 
        }

        // delete image of product from cloudinary
        const file = await deleteFile(product.imageUrl);

        // delete the product
        await Product.findByIdAndDelete(id);

        // remove product id from user
        const result = await User.findByIdAndUpdate(userId, 
            {
                $pull : {
                    products : id
                }
            },{new : true}
        )
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        })
        
    }
    catch(error){
        res.status(500).json({
            success :  false,
            message: "Failed to delete product",
            error : err.message
        })
    }
}

exports.editProduct = async(req, res)=> {
    try{

        console.log("controller started")
        const {id,productName,
            productDescription,
            price,
            quantity,
        } = req.body

        // const image = req.files.image;
    
            console.log("fetched data")
         // validate data
         if(!id){
             return res.status(400).json({
                 success: false,
                 message: "Value missing"
             })
         }
         let product = await Product.findById(id);
         
         console.log("FOund the product")
         if(productName !== undefined) {
             product.productName = productName;
         }
 
         if(productDescription !== undefined) {
            product.productDescription = productDescription;
         }

         if(price !== undefined) {
            product.price = price;
         }

         if(quantity !== undefined) {
            product.quantity = quantity;
         }
         
         console.log("did changes")
         if(req.files && req.files.image !== undefined) {
             // delete the prev video if there
             if(product.imageUrl){
                await deleteFile(product.imageUrl);
             }
             
             const image = req.files.image;
             const uploadDetails = await imageUploader(
                 image,
                 process.env.FOLDER_NAME,
             )
             product.imageUrl = uploadDetails.secure_url;
         }
         
         // update subSection
         const upadatedProduct = await product.save();
         
         console.log("edited the product")
         // return response
         return res.status(200).json({
             success: true,
             message: "Product updated successfully",
             upadatedProduct
         })
    }
    catch(error){
        res.status(500).json({
            success: true,
            message: "Failed to update a product",
            error: error.message
        })
    }
}

exports.deleteProduct = async(req, res) => {
    try{
        const {id} = req.body;
        const userId = req.user._id
         
        if(!id){
            return res.status(403).json({
                success: false,
                message: "Value missing"
            })
        }

        let product = await Product.findById(id);
        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product does not exist"
            })
        }

        if(product.mainCategory){
            await MainCategory.updateMany({ products : {
                $in : id
            }
            }, {
                $pull : {
                    products : id
            }},
            {new: true})
        }
        if(product.category){
            await Category.updateMany({ products : {
                $in : id
            }
            }, {
                $pull : {
                    products : id
            }},
            {new: true})
        }
        if(product.subCategory){
            await SubCategory.updateMany({ products : {
                $in : id
            }
            }, {
                $pull : {
                    products : id
            }},
            {new: true})
        }

        // update the user
        const user = await User.findByIdAndUpdate(userId, {
            $pull: {
                products : id
            }
        }, {new: true})

        // delete the product
        await Product.findByIdAndDelete(id)

         // return response
         return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        })
    }
    catch(error){
        res.status(500).json({
            success: true,
            message: "Failed to delete a product",
            error: error.message
        })
    }
}