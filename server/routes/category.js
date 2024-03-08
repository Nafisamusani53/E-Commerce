const express = require("express")
const router = express.Router()

const {addCategory,
       editCategory,
       deleteCateogry} = require("../controllers/category");

const {addMainCategory,
       editMainCategory,
       deleteMainCategory} = require("../controllers/mainCategory");

const {addSubCategory,
       editSubCategory,
       deleteSubCateogry} = require("../controllers/subCategory");

const { auth, isInstructor, isStudent, isAdmin } = require("../middleware/auth")

router.post("/addMainCategory", auth, isAdmin, addMainCategory)
router.post("/editMainCategory", auth, isAdmin, editMainCategory)
router.post("/deleteMainCategory", auth, isAdmin, deleteMainCategory)
router.post("/editCategory", auth, isAdmin, editCategory)
router.post("/addCategory", auth, isAdmin, addCategory)
router.post("/deleteCateogry", auth, isAdmin, deleteCateogry)
router.post("/addSubCategory", auth, isAdmin, addSubCategory)
router.post("/editSubCategory", auth, isAdmin, editSubCategory)
router.post("/deleteSubCateogry", auth, isAdmin, deleteSubCateogry)

module.exports = router;