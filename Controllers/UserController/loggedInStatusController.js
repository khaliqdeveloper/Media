const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const loggedInStatusController = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }

  try {
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (verifyToken) {
      return res.json(true);
    }
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
});

module.exports = loggedInStatusController;
