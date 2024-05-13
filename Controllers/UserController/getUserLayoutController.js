const asyncHandler = require("express-async-handler");

const getUserLayoutController = asyncHandler(async (req, res) => {
  const { layout } = req.user;

  if (!layout)
    return res
      .status(400)
      .json({ message: "Unable to fetch User layout preference" });

  res.status(200).json({
    layout,
  });
});

module.exports = getUserLayoutController;
