const logoutController = require("../../Controllers/UserController/logoutController");
const { protectedRoute } = require("../../Middleware/authMiddleware");
const router = require("express").Router();

router.get("/logout", protectedRoute, logoutController);

module.exports = router;
