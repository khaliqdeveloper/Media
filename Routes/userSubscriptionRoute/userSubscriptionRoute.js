const {
  userSubscriptionTokenController,
  userSubscriptionPaymentController,
  getPaymentPlan,
} = require("../../Controllers/UseSubscriptionController/UserSubscriptionController");
const { protectedRoute } = require("../../Middleware/authMiddleware");

const router = require("express").Router();

router.get("/braintree/clientToken", userSubscriptionTokenController);
router.get("/braintree/getPlan", getPaymentPlan);

router.post(
  "/braintree/userSubscriptionPayment",
  protectedRoute,
  userSubscriptionPaymentController
);

module.exports = router;
