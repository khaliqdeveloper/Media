const asyncHandler = require("express-async-handler");
const User = require("../../Model/UserModel");

const getSingleUserController = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);
  if (!user) {
    res.status(404).json({ message: "user not found" });
  }

  const { name, email, role, photo, layout, journalName, urlId } = user;
  res
    .status(200)
    .json({ name, email, role, photo, layout, journalName, urlId });
});

module.exports = getSingleUserController;
