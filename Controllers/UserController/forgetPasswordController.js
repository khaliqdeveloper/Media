const asyncHandler = require("express-async-handler");
const User = require("../../Model/UserModel");
const Token = require("../../Model/TokenModel");
const crypto = require("crypto");
const sendEmail = require("../../Utils/sendEmail");

const forgetPasswordController = asyncHandler(async (req, res) => {
  const { email } = req.body;
  // console.log(email);
  const user = await User.findOne({ email });
  // console.log(user);
  if (!user) {
    res.status(404).json({ message: "Invalid Email Address" });
    throw new Error(`User not found`);
  }
  let existedToken = await Token.findOne({ userId: user._id });
  // delete Previous token
  if (existedToken) {
    await Token.deleteOne();
  }
  //creating New Token
  let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
  //hash Token before saving to DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //saving to DB
  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 15 * (60 * 1000),
  }).save();

  const resetUrl = `${process.env.Front_End_URL}/resetPassword/${resetToken}`;
  const message = `
    <h2>Hello ${user.name}</h2>
    <p>Click on the URL to reset your account password</p>
    <p>the URL will only be valid for 15 minutes</p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    <p>Regards</p>
    <p>Technical Support Team</p>
  `;
  const subject = "Password reset request";
  const send_to = user.email;
  const sent_from = process.env.SENDER_EMAIL;

  try {
    await sendEmail(subject, message, send_to, sent_from);
    res.status(200).json({
      success: true,
      message: "Reset Email has Sent",
    });
  } catch (e) {
    res.status(500);
    throw new Error("Error while sending email please try again");
  }
});

module.exports = forgetPasswordController;
