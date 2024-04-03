const resetPasswordController = require("../../Controllers/UserController/resetPasswordController");

const router = require("express").Router();

router.put("/resetPassword/:resetToken", resetPasswordController);

module.exports = router;
