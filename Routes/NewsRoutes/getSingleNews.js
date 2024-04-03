const getSingleNewsController = require("../../Controllers/NewsController/getSingleNewsController");
const { protectedRoute } = require("../../Middleware/authMiddleware");

const router = require("express").Router();

router.get("/getSingleNews/:id", protectedRoute, getSingleNewsController);

module.exports = router;
