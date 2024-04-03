const getAllFeedBackController = require("../../Controllers/FeedBackControllers/getAllFeedBackController");
const { protectedRoute } = require("../../Middleware/authMiddleware");
const { adminRole, ROLES } = require("../../Middleware/roleAuth");

const router = require("express").Router();

router.get(
  "/getAllFeedback",
  protectedRoute,
  adminRole(ROLES.ADMIN),
  getAllFeedBackController
);

module.exports = router;
