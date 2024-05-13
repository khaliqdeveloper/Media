const asyncHandler = require("express-async-handler");
const User = require("../Model/UserModel");
const jwt = require("jsonwebtoken");

const protectedRoute = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not Authorized, please Login" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User Not Found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authorization Error:", error);
    return res.status(401).json({ message: "Not Authorized, please Login" });
  }
});

module.exports = { protectedRoute };
