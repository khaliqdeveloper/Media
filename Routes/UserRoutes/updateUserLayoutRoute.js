const updateUserLayoutController = require("../../Controllers/UserController/updateUserLayoutController");
const { protectedRoute } = require("../../Middleware/authMiddleware");

const router = require("express").Router();

router.patch("/updateUserLayout", protectedRoute, updateUserLayoutController);

module.exports = router;
