const router = require("express").Router();
const sendFeedBackController = require("../../Controllers/FeedBackControllers/sendFeedBackController");

router.post("/sendFeedBack", sendFeedBackController);

module.exports = router;
