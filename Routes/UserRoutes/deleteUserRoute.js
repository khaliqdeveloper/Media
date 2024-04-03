const deleteUserController = require("../../Controllers/UserController/deleteUserController");
const { protectedRoute } = require("../../Middleware/authMiddleware");
const { adminRole, ROLES } = require("../../Middleware/roleAuth");

const router = require("express").Router();

router.delete(
  "/deleteUser/:userId",
  protectedRoute,
  adminRole(ROLES.ADMIN),
  deleteUserController
);

module.exports = router;
