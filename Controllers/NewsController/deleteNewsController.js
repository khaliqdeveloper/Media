const asyncHandler = require("express-async-handler");
const News = require("../../Model/NewsModel");

const deleteNewsController = asyncHandler(async (req, res) => {
  const newsID = req.params.newsId;
  const deleteNews = await News.findById(newsID);
  if (!deleteNews) {
    res.status(404);
    throw new Error("News not found");
  }
  // console.log(req.user);
  if (deleteNews.user.toString() !== req.user.id && req.user.role !== "admin") {
    res.status(404).json("Unauthorized");
    throw new Error("Unauthorized");
  }
  await deleteNews.deleteOne();
  res.status(204).json(deleteNews);
});

module.exports = deleteNewsController;
