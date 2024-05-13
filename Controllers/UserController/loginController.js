const asyncHandler = require("express-async-handler");
const User = require("../../Model/UserModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("./registerController");

const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userExist = await User.findOne({ email });
  if (!userExist) {
    return res.status(404).json({ error: "User Not Found" });
  }

  const correctPassword = await bcrypt.compare(password, userExist.password);
  if (correctPassword) {
    const { _id, email, photo, role } = userExist;
    const token = generateToken(_id);
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expiresIn: new Date(Date.now() + 1000 * 86400),
      sameSite: "none",
      secure: true,
    });
    return res.status(200).json({ _id, email, photo, role, token });
  } else {
    return res.status(400).json({ error: "Invalid Email or Password" });
  }
});

module.exports = loginController;
