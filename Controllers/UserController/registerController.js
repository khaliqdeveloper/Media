const asyncHandler = require("express-async-handler");
const User = require("../../Model/UserModel");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  // console.log(id);
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const registerController = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!email || !password || !name) {
    res.status(400).json({ message: "All fields must be provided" });
    throw new Error("All field are required");
  }
  if (password.length < 8 || password.length > 23) {
    res
      .status(400)
      .json({ message: "password must be at least 8 characters long" });
    throw new Error("password must be at least 8 characters long");
  }
  //check if user exists already
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: "User already exists" });
    throw new Error("User already exists");
  }

  //create user
  const newUser = await User.create({
    name,
    email,
    password,
    role,
  });

  //   creating jwt token
  const token = generateToken(newUser._id);

  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expiresIn: new Date(Date.now() + 1000 * 86400),
    sameSite: "none",
    secure: true,
  });

  if (newUser) {
    const { _id, email, photo, role, name } = newUser;
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      role,
      token,
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

module.exports = { registerController, generateToken };
