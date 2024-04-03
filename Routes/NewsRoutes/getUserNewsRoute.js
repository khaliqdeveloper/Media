const getAllNewsController = require("../../Controllers/NewsController/getUserNewsController");
const { protectedRoute } = require("../../Middleware/authMiddleware");

const router = require("express").Router();

router.get("/getAllUserNews", protectedRoute, getAllNewsController);

module.exports = router;
