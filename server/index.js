const express = require("express")
require("dotenv").config()
const {dbConnect} = require("./config/database")
const {cloudinaryConnect} = require("./config/cloudinay")
const cookieparser = require("cookie-parser")
const cors = require("cors")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")
const fileUpload = require("express-fileupload")



const app = express()
const port = process.env.PORT || 4000

dbConnect();

// middlewares
app.use(express.json())
app.use(cookieparser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp'
}))

// connection with cloudinary
cloudinaryConnect();

app.use("/api/v1/auth", userRoutes)
app.use("/api/v1/category", categoryRoutes)
app.use("/api/v1/product", productRoutes)


app.get("/",(req,res)=>{
    res.json({
        success: true,
        message: "Your server is running...."
    })
})
app.listen(port, ()=> {
    console.log("App Started")
})