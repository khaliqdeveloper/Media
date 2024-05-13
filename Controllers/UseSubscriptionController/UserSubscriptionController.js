const asyncHandler = require("express-async-handler");
const braintree = require("braintree");
const Subscription = require("../../Model/UserSubscriptionModel");

let gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANY_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

const userSubscriptionTokenController = asyncHandler(async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

const userSubscriptionPaymentController = asyncHandler(async (req, res) => {
  try {
    const { planID, plan, paymentMethodNonce } = req.body;
    const customerResult = await gateway.customer.create({
      firstName: req.user?.name,

      email: req.user?.email,
    });

    const customerId = customerResult.customer.id;

    // Vault the payment method nonce
    gateway.paymentMethod.create(
      {
        paymentMethodNonce: paymentMethodNonce,
        customerId: customerId, // Assuming you have a customerId associated with the user
        options: {
          verifyCard: true, // Optionally verify the card before vaulting
        },
      },
      (err, result) => {
        if (err) {
          console.error("Error vaulting payment method:", err);
          res.status(500).json(err);
          return;
        }

        // Once the payment method is vaulted, create the subscription
        gateway.subscription.create(
          {
            paymentMethodToken: result.paymentMethod.token,
            planId: planID,
          },
          async (err, result) => {
            if (err) {
              console.error("Error creating subscription:", err);
              res.status(500).json(err);
            } else {
              if (result.success) {
                const subscription = await new Subscription({
                  user: req.user._id,
                  subscriptionType: plan,
                  subscriptionDetails: result,
                }).save();
                res.json(subscription);
              } else {
                console.error("Subscription failed:", result);
                res.status(500);
              }
            }
          }
        );
      }
    );
  } catch (error) {
    console.error("Error handling subscription payment:", error);
    res.status(500).json(error); // Send error response if an exception occurs
  }
});

const getPaymentPlan = asyncHandler(async (req, res) => {
  const paymentPlan = await gateway.plan.find("8363758");
  const paymentPlan2 = await gateway.plan.find("5349856");
  if (!paymentPlan || !paymentPlan2) {
    res.status(500).json("Subscription plan not found");
  }
  res.status(200).json({ basicPlan: paymentPlan, premiumPlan: paymentPlan2 });
});

module.exports = {
  userSubscriptionTokenController,
  userSubscriptionPaymentController,
  getPaymentPlan,
};
