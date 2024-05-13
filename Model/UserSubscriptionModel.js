const mongoose = require("mongoose");

const userSubscriptionModel = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    subscriptionType: {
      type: "string",
      require: true,
    },
    subscriptionDetails: {},
  },
  { timestamps: true }
);
const Subscription = mongoose.model("Subscription", userSubscriptionModel);
module.exports = Subscription;
