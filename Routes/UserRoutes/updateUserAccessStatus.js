const updateAccessStatusController = require("../../Controllers/UserController/updateAccessStatusController");
const { protectedRoute } = require("../../Middleware/authMiddleware");

const router = require("express").Router();

router.put(
  "/updateAccessStatus/:id",
  protectedRoute,
  updateAccessStatusController
);

module.exports = router;
