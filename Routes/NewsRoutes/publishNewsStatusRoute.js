const publishNewsStatusController = require("../../Controllers/NewsController/publishNewsStatusController");
const { protectedRoute } = require("../../Middleware/authMiddleware");

const router = require("express").Router();

router.put(
  "/updatePublishStatus/:id",
  protectedRoute,
  publishNewsStatusController
);

module.exports = router;
