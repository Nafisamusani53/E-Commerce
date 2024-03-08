const cloudinary = require('cloudinary').v2

function extractPublicId(cloudinaryUrl) {
    // Split the URL by "/"
    const parts = cloudinaryUrl.split("/");
    console.log(parts)
  
    // Find the index of "version"
    const uploadIndex = parts.indexOf("upload");
    console.log(uploadIndex)
  
    // The public ID is the next segment in the URL after "version"
    if (uploadIndex !== -1 && uploadIndex === parts.length - 3) {
      return parts[parts.length - 1].split(".")[0];
    }
    // If "version" is not found or there's no segment after "version", return null
    return null;
  }
exports.deleteFile = async(url) => {
    try{
       const publicId = extractPublicId(file)

       if(publicId){
            return await cloudinary.uploader.v2.destroy(publicId);  
       }
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Failed to delete media",
            error: err.message
        })
    }
}