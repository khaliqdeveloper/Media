const getNewsUrlAndHeadingController = require("../../Controllers/UserController/getNewsUrlAndHeadingController");
const { protectedRoute } = require("../../Middleware/authMiddleware");

const router = require("express").Router();

router.get(
  "/getNewsUrl&Heading",
  protectedRoute,
  getNewsUrlAndHeadingController
);

module.exports = router;
