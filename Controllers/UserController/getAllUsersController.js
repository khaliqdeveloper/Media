const User = require("../../Model/UserModel");
const asyncHandler = require("express-async-handler");

const getAllUserController = asyncHandler(async (req, res) => {
  const users = await User.find();

  // console.log(users);
  if (users && users.length > 0) {
    const userData = users.map((user) => {
      const { _id, name, email, role, photo, userAccess } = user;
      return { _id, name, email, role, photo, userAccess };
    });

    res.status(201).json(userData);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

module.exports = getAllUserController;
