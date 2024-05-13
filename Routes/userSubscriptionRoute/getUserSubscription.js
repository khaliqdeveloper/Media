const getUserSubscriptionController = require("../../Controllers/UseSubscriptionController/getUserSubscriptionController");
const { protectedRoute } = require("../../Middleware/authMiddleware");

const router = require("express").Router();

router.get(
  "/getUserSubscription",
  protectedRoute,
  getUserSubscriptionController
);

module.exports = router;
