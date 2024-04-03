const userUpdateController = require("../../Controllers/UserController/userUpdateController");
const { protectedRoute } = require("../../Middleware/authMiddleware");
const { adminRole, ROLES } = require("../../Middleware/roleAuth");

const router = require("express").Router();

router.put(
  "/userUpdate/:userId",
  protectedRoute,
  adminRole(ROLES.ADMIN),
  userUpdateController
);

module.exports = router;
