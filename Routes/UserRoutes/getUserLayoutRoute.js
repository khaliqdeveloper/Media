const getUserLayoutController = require("../../Controllers/UserController/getUserLayoutController");
const { protectedRoute } = require("../../Middleware/authMiddleware");

const router = require("express").Router();

router.get("/getUserLayout", protectedRoute, getUserLayoutController);

module.exports = router;
