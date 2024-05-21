const asyncHandler = require("express-async-handler");
const News = require("../../Model/NewsModel");

const videoDeleteController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingNews = await News.findById(id);
  if (!existingNews) {
    res.status(404).json({ message: "News Not Found" });
    throw new Error("News not found");
  }

  existingNews.video = "";
  await existingNews.save();

  res.status(200).json({ existingNews });
});

module.exports = videoDeleteController;
