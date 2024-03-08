const mongoose = require("mongoose")
require("dotenv").config()
exports.dbConnect = async() => {
    await mongoose.connect(process.env.DATABASE_URL)
    .then( () => console.log("DB Connected"))
    .catch((error) => {
        console.log("Issue in DB connection")
        console.error(error)
        process.exit(1)
    })
}