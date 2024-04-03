const asyncHandler = require("express-async-handler");

const getUserRoleController = asyncHandler(async (req, res) => {
  const { role } = req.user;
  if (!role) {
    return res.status(400).json({ error: "Failed to get user role" });
  }
  res.status(200).json({ role });
});

module.exports = getUserRoleController;
