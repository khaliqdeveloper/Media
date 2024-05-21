const User = require("../../Model/UserModel");
const asyncHandler = require("express-async-handler");
const { generateUrlId } = require("./registerController");

const getAllUserController = asyncHandler(async (req, res) => {
  const users = await User.find();

  if (users && users.length > 0) {
    const updatedUsers = await Promise.all(
      users.map(async (user) => {
        if (!user.urlId) {
          user.urlId = generateUrlId(user.email);
          await user.save();
        }

        const { _id, name, email, role, photo, userAccess, layout, urlId } =
          user;
        return { _id, name, email, role, photo, userAccess, layout, urlId };
      })
    );

    res.status(200).json(updatedUsers);
  } else {
    res.status(404);
    throw new Error("Users Not Found");
  }
});

module.exports = getAllUserController;
