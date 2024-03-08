// Authentication
const jwt = require("jsonwebtoken")
exports.auth = async(req,res, next) => {
    try{
        const token = req.header("Authorization").replace("Bearer ", "") || req.cookies.token || req.body.token;
        if(!token){
            return res.status(401).json({
                success: false,
                message : "Invalid user or token Missing"
            })
        }

        try{
        const decode = await jwt.verify(token, process.env.JWT_SECRET) 
        req.user = decode
        next();
        }
        catch(error){
            return res.status(403).json({
                success: true,
                message: error.message
            })
        }
        
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// isStudent
exports.isBuyer = async(req,res, next)=>{
    try{
        if(req.user.role != "Buyer"){
            return res.status(401).json({
                success: false,
                message: "This is protected route for Buyer only"
            })
        }
        next()
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// isInstructor
exports.isVendor = async(req,res, next)=>{
    try{
        if(req.user.role != "Vendor"){
            return res.status(401).json({
                success: false,
                message: "This is protected route for Vendor only"
            })
        }
        next()
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// isAdmin
exports.isAdmin = async(req,res, next)=>{
    try{
        if(req.user.role != "Admin"){
            return res.status(401).json({
                success: false,
                message: "This is protected route for Admin only"
            })
        }
        next()
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}