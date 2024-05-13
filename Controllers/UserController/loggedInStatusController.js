const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const loggedInStatusController = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json(false);
  }

  const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
  if (verifyToken) {
    return res.json({ status: true });
  }
});

module.exports = loggedInStatusController;
