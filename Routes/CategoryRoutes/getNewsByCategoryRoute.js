const getNewsByCategoryController = require("../../Controllers/CategoryController/getNewsByCategoryController");
const { protectedRoute } = require("../../Middleware/authMiddleware");
const { adminRole, ROLES } = require("../../Middleware/roleAuth");

const router = require("express").Router();

router.get(
  "/getNewsByCategory/:category",
  protectedRoute,
  adminRole(ROLES.ADMIN),
  getNewsByCategoryController
);

module.exports = router;
