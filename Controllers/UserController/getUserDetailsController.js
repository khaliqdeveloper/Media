const asyncHandler = require("express-async-handler");
const User = require("../../Model/UserModel");

const getUserDetailsController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const {
      _id,
      name,
      email,
      photo,
      role,
      userAccess,
      layout,
      urlId,
      journalName,
    } = user;

    res.status(201).json({
      _id,
      name,
      email,
      photo,
      role,
      userAccess,
      layout,
      urlId,
      journalName,
    });
  } else {
    res.status(400);
    throw new Error("User not Found");
  }
});

module.exports = getUserDetailsController;
