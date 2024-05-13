const getSubscriptionDetailsController = require("../../Controllers/UseSubscriptionController/getAllSubscriptionDetailsController");
const { protectedRoute } = require("../../Middleware/authMiddleware");
const { ROLES, adminRole } = require("../../Middleware/roleAuth");

const router = require("express").Router();

router.get(
  "/getAllSubscriptionDetails",
  protectedRoute,
  adminRole(ROLES.ADMIN),
  getSubscriptionDetailsController
);

module.exports = router;
