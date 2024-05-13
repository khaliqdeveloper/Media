const asyncHandler = require("express-async-handler");
const Subscription = require("../../Model/UserSubscriptionModel");
const User = require("../../Model/UserModel");

const getUserSubscriptionController = asyncHandler(async (req, res) => {
  const userSubscription = await Subscription.find({ user: req.user._id });
  if (!userSubscription) {
    res.status(404).json("No subscription found");
  }
  res.json(userSubscription);
});

module.exports = getUserSubscriptionController;
