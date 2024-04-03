const editNewsController = require("../../Controllers/NewsController/editNewsController");
const { protectedRoute } = require("../../Middleware/authMiddleware");
const { upload } = require("../../Utils/fileUpload");

const router = require("express").Router();

router.put(
  "/updateNews/:id",
  protectedRoute,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  editNewsController
);

module.exports = router;
