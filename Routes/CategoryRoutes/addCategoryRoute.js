const addCategoryController = require("../../Controllers/CategoryController/addCategoryController");
const { protectedRoute } = require("../../Middleware/authMiddleware");

const router = require("express").Router();

router.post("/addCategory", protectedRoute, addCategoryController);

module.exports = router;
