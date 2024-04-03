const getSingleUserController = require("../../Controllers/UserController/getSingleUserController");
const { protectedRoute } = require("../../Middleware/authMiddleware");
const { adminRole, ROLES } = require("../../Middleware/roleAuth");

const router = require("express").Router();

router.get(
  "/getSingleUser/:id",
  protectedRoute,
  adminRole(ROLES.ADMIN),
  getSingleUserController
);

module.exports = router;
