const getUserDetailsController = require("../../Controllers/UserController/getUserDetailsController");
const { protectedRoute } = require("../../Middleware/authMiddleware");

const router = require("express").Router();

router.get("/getUserDetails", protectedRoute, getUserDetailsController);

module.exports = router;
