const deleteNewsController = require("../../Controllers/NewsController/deleteNewsController");
const { protectedRoute } = require("../../Middleware/authMiddleware");

const router = require("express").Router();

router.delete("/deleteNews/:newsId", protectedRoute, deleteNewsController);

module.exports = router;
