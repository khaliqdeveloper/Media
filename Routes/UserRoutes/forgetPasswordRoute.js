const forgetPasswordController = require("../../Controllers/UserController/forgetPasswordController");

const router = require("express").Router();

router.post("/forgetPassword", forgetPasswordController);

module.exports = router;
