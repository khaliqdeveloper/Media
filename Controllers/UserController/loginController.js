const asyncHandler = require("express-async-handler");
const User = require("../../Model/UserModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("./registerController");

const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "All fields are required" });
    throw new Error("All fields are required");
  }

  const userExist = await User.findOne({ email });
  if (!userExist) {
    res.status(404);
    throw new Error("User Not Found");
  }

  const correctPassword = await bcrypt.compare(password, userExist.password);
  // let correctRole = false;

  // if (role === userExist.role) {
  //   correctRole = true;
  // }
  // console.log(userExist._id);
  const token = generateToken(userExist._id);

  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expiresIn: new Date(Date.now() + 1000 * 86400),
    sameSite: "none",
    secure: true,
  });

  if (userExist && correctPassword) {
    const { _id, email, photo, role } = userExist;
    res.status(200).json({
      _id,
      email,
      photo,
      role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = loginController;
