const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const Token = require("../../Model/TokenModel");
const User = require("../../Model/UserModel");

const resetPasswordController = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;
  //hash token to compare the one stored in DB
  const hashResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const userToken = await Token.findOne({
    token: hashResetToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404).json({ message: "Invalid or expired token" });
    throw new Error("Invalid or Expired Token");
  }

  // find User
  const user = await User.findOne({ _id: userToken.userId });
  user.password = password;

  await user.save();
  res.status(200).json({ message: "Password reset Successfully" });
});

module.exports = resetPasswordController;
