const asyncHandler = require("express-async-handler");
const User = require("../../Model/UserModel");

const updateUserLayoutController = asyncHandler(async (req, res) => {
  const Layout = req.body.Layout;

  const { id } = req.user;
  //find user in the DB
  const user = await User.findById({ _id: id });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.layout = Layout;
  await user.save();
  const { layout } = user;
  res.status(201).json({ layout, id });
});

module.exports = updateUserLayoutController;
