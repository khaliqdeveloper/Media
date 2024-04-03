const updateUserController = require("../../Controllers/UserController/updateUserController");
const { protectedRoute } = require("../../Middleware/authMiddleware");
const { upload } = require("../../Utils/fileUpload");

const router = require("express").Router();

router.patch(
  "/updateUser",
  protectedRoute,
  upload.fields([{ name: "image", maxCount: 1 }]),
  updateUserController
);

module.exports = router;
