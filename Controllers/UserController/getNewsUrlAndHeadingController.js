const asyncHandler = require("express-async-handler");
const User = require("../../Model/UserModel");

const getNewsUrlAndHeadingController = asyncHandler(async (req, res) => {
  const { journalName, urlId } = req.user;
  if (!journalName && !urlId) return res.status(404);

  res.status(200).json({ journalName, urlId });
});

module.exports = getNewsUrlAndHeadingController;
