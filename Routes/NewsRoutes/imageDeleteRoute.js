const imageDeleteController = require("../../Controllers/NewsController/imageDeleteController");
const { protectedRoute } = require("../../Middleware/authMiddleware");

const router = require("express").Router();

router.patch("/imageDelete/:id", protectedRoute, imageDeleteController);

module.exports = router;
