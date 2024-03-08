const cloudinary = require('cloudinary').v2
require("dotenv").config();
exports.imageUploader = async(file, folder, hieght, quality) => {
    try{
        const options = {folder};
        if(hieght){
            options.height = hieght
        }
        if(quality){
            options.quality = quality
        }

        options.resourse_type = "auto"
        return await cloudinary.uploader.upload(file.tempFilePath, options)
    }
    catch(err){
        return {
            success: false,
            message: "Failed to upload media",
            error: err.message
        }
    }
}