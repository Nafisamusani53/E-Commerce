const bcrypt = require('bcrypt')
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.signup = async(req, res) => {
    try{
        const {
            firstName,
            lastName,
            email,
            password, 
            confirmPassword,
            address,
            city,
            country,
            postalCode,
            role,
            phoneNumber,
        } = req.body

        if(
            !firstName || 
            !lastName ||
            !email ||
            !password ||
            !confirmPassword||
            !address ||
            !city ||
            !country ||
            !postalCode ||
            !phoneNumber) {

            return res.status(404).json({
                success : false,
                message: "Fill the detail properly",
                data: { firstName,
                    lastName,
                    email,
                    password, 
                    confirmPassword,
                    address,
                    city,
                    country,
                    postalCode,
                    role,
                    phoneNumber,}
            })
        }

         //check if Password and confirm password matches or not?
        if(password !== confirmPassword){
            return res.status(401).json({
                success: false,
                message: "Password and ConfirmPassword dose not match"
            })
        }

        //check if user already exist or not 
        const existingUser = await User.findOne({email:  email});
        if(existingUser){
            return res.status(401).json({
                success: false,
                message: "User already exists,Please sign in to continue"
            })
        }


        //Hash Password
        const hashPassword = await bcrypt.hash(password ,10)



        let user = await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword, 
            address,
            city,
            country,
            postalCode,
            role,
            phoneNumber,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        user.password = undefined
        user.phoneNumber = undefined

        res.status(200).json({
            success: true,
            data : user,
            message : "Account created successfully"
        })
    }
    
    catch(err){
        res.status(500).json({
            success: false,
            message: "Failed to create Account",
            error: err.message
        })
    }
}

exports.login = async(req,res) => {
    try{
        const {email, password} = req.body;

        // email or password not entered
        if(!email || !password){
            //Return 400 Bad Request status code with error message
            return res.status(403).json({
                success : false,
                message: "Email or Password missing, fill the detail properly"
            })
        }


        // check if the email exist or not
        let user = await User.findOne({email});
        if(!user){
            //Return 401 unauthorized status code with error message
            return res.status(401).json({
                success: false,
                message: "User does not exist"
            })
        }

        // Now match the password
        if(await bcrypt.compare(password, user.password)){
            //Generate JWT
            const payload = {
                email: user.email,
                role: user.role,
                id : user._id
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '2h'
            })
            //save token to user document in database
            user = user.toObject()
            user.token = token
            user.password = undefined


            const options = {
                maxAge : 3*24*60*60*1000,
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "LoggedIn successfully,"
            })
        }
        else{
            return res.status(401).json({
                success: false,
                message: "Incorrect password or email"
            })
        }

    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}