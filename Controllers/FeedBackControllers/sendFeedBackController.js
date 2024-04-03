const asyncHandler = require("express-async-handler");
const FeedBack = require("../../Model/FeedBack");

const sendFeedBackController = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;
  if ((!name, !email, !message)) {
    res.status(400).json("all fields required");
  }

  const feedBack = await FeedBack.create({
    name,
    email,
    message,
  });

  res.status(200).json({ feedBack });
});

module.exports = sendFeedBackController;
