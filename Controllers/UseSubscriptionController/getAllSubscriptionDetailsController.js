const asyncHandler = require("express-async-handler");
const Subscription = require("../../Model/UserSubscriptionModel");
const User = require("../../Model/UserModel");

const getSubscriptionDetailsController = asyncHandler(async (req, res) => {
  try {
    // Find all subscriptions and populate user details with email
    const subscriptions = await Subscription.find().populate("user", "email");

    if (!subscriptions) {
      return res.status(404).json({ message: "Subscriptions not found" });
    }

    // Construct response data with user email for each subscription
    const subscriptionData = subscriptions.map((subscription) => ({
      _id: subscription._id,
      subscriptionType: subscription.subscriptionType,
      subscriptionDetails: subscription.subscriptionDetails,
      userEmail: subscription.user.email,
    }));

    res.status(200).json(subscriptionData);
  } catch (error) {
    console.error("Error fetching subscription details:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = getSubscriptionDetailsController;
