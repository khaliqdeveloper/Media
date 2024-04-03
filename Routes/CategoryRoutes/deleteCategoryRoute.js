const deleteCategoryController = require("../../Controllers/CategoryController/deleteCategoryController");
const { protectedRoute } = require("../../Middleware/authMiddleware");

const router = require("express").Router();

router.delete("/deleteCategory", protectedRoute, deleteCategoryController);

module.exports = router;
