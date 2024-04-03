const asyncHandler = require("express-async-handler");
const User = require("../../Model/UserModel");

const userUpdateController = asyncHandler(async (req, res) => {
  const userID = req.params.userId;
  const { name, email, role, photo } = req.body;

  if (!userID) {
    res.status(400).json({ message: "Invalid user ID" });
  }
  console.log(userID);

  const updateUser = await User.findByIdAndUpdate(
    userID,
    {
      name,
      email,
      role,
      photo,
    },
    { new: true }
  );

  res.status(200).json({ User: updateUser });
});

module.exports = userUpdateController;
