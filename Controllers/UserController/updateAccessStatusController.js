const asyncHandler = require("express-async-handler");
const User = require("../../Model/UserModel");

const updateAccessStatusController = asyncHandler(async (req, res) => {
  const id = req.params.id; // Extracting id from req.params
  const accessStatus = req.body.accessStatus;
  let userAccess = true;
  console.log(id, accessStatus);

  if (accessStatus.toString() === "true") {
    userAccess = true;
  } else if (accessStatus.toString() === "false") {
    userAccess = false;
  } else {
    return res.status(400).json("Invalid accessStatus"); // Handle invalid accessStatus
  }
  if (!id || accessStatus === null || accessStatus === undefined) {
    return res.status(400).json("Bad request");
  }

  try {
    const getUser = await User.findByIdAndUpdate(
      id,
      {
        userAccess,
      },
      { new: true }
    );
    if (!getUser) {
      return res.status(404).json("User not found");
    }
    res.status(200).json(getUser);
  } catch (error) {
    console.log(error);
  }
});

module.exports = updateAccessStatusController;
