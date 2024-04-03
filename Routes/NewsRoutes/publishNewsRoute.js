const publishNewsController = require("../../Controllers/NewsController/publishNewsController");
const { protectedRoute } = require("../../Middleware/authMiddleware");
const { upload } = require("../../Utils/fileUpload");

const router = require("express").Router();

router.post(
  "/publishNews",
  protectedRoute,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  publishNewsController
);

module.exports = router;
