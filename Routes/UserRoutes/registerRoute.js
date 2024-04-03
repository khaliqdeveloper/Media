const {
  registerController,
} = require("../../Controllers/UserController/registerController");

const router = require("express").Router();

router.post("/register", registerController);

module.exports = router;
