const loggedInStatusController = require("../../Controllers/UserController/loggedInStatusController");

const router = require("express").Router();

router.get("/loggedInStatus", loggedInStatusController);

module.exports = router;
