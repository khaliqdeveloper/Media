const getAllUserController = require("../../Controllers/UserController/getAllUsersController");
const { protectedRoute } = require("../../Middleware/authMiddleware");
const { adminRole, ROLES } = require("../../Middleware/roleAuth");
const router = require("express").Router();

router.get(
  "/getAllUsers",
  protectedRoute,
  adminRole(ROLES.ADMIN),
  getAllUserController
);

module.exports = router;
