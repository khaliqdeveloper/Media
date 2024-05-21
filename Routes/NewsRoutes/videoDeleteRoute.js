const videoDeleteController = require("../../Controllers/NewsController/VideoDeleteController");

const { protectedRoute } = require("../../Middleware/authMiddleware");

const router = require("express").Router();

router.patch("/videoDelete/:id", protectedRoute, videoDeleteController);

module.exports = router;
