const ROLES = {
  ADMIN: "admin",
  USER: "user",
};

const adminRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };
};

module.exports = {
  adminRole,
  ROLES,
};
