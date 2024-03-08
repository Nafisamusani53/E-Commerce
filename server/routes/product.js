const express = require("express")
const router = express.Router()

const {addProduct,
    deleteProduct,
    editProduct,
    getAllproduct
} = require("../controllers/product")

const { auth, isInstructor, isStudent, isAdmin } = require("../middleware/auth")

router.get("/getAllProduct",getAllproduct)
router.post("/addProduct", auth, isAdmin, addProduct)
router.post("/deleteProduct", auth, isAdmin, deleteProduct)
router.post("/editProduct", auth, isAdmin, editProduct)

module.exports = router;