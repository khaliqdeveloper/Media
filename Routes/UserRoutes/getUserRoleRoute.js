const getUserRoleController = require("../../Controllers/UserController/getUserRoleComtroller");
const { protectedRoute } = require("../../Middleware/authMiddleware");

const router = require("express").Router();

router.get("/getUserRole", protectedRoute, getUserRoleController);

module.exports = router;
