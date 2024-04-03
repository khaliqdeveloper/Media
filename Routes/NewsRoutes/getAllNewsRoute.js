const getAllNewsController = require("../../Controllers/NewsController/getAllNewsController");

const router = require("express").Router();

router.get("/getAllNews", getAllNewsController);

module.exports = router;
