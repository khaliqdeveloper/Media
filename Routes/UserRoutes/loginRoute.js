const loginController = require("../../Controllers/UserController/loginController");

const router = require("express").Router();

router.post("/login", loginController);

module.exports = router;
