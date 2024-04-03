const asyncHandler = require("express-async-handler");
const User = require("../../Model/UserModel");

const logoutController = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expiresIn: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "Successfully logged out" });
});

module.exports = logoutController;
