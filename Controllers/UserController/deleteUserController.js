const asyncHandler = require("express-async-handler");
const User = require("../../Model/UserModel");

const deleteUserController = asyncHandler(async (req, res) => {
  const userID = req.params.userId;

  try {
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    await user.deleteOne();

    res.status(204).json({ message: "User Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = deleteUserController;
