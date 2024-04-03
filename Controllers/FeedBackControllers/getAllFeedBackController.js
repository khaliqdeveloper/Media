const asyncHandler = require("express-async-handler");
const FeedBack = require("../../Model/FeedBack");

const getAllFeedBackController = asyncHandler(async (req, res) => {
  const feedbacks = await FeedBack.find();
  if (!feedbacks) {
    res.status(404).json({ message: "server Error" });
  }
  res.status(200).json(feedbacks);
});

module.exports = getAllFeedBackController;
