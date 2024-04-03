const asyncHandler = require("express-async-handler");
const News = require("../../Model/NewsModel");
const Category = require("../../Model/CategoryModel");

const getAllNewsController = asyncHandler(async (req, res) => {
  const news = await News.find({ user: req.user._id }).sort("-createdAt");
  const categories = await Category.find();
  // console.log(newsCategories);
  if (news && news.length > 0) {
    const newsWithCategories = news.map((newsItem) => {
      // Find the corresponding category for the news item
      const categoryForNews = categories.find(
        (category) => category.news.toString() === newsItem._id.toString()
      );

      return {
        _id: newsItem._id,
        headline: newsItem.headline,
        datelineCity: newsItem.datelineCity,
        datelineState: newsItem.datelineState,
        datelineCountry: newsItem.datelineCountry,
        companyName: newsItem.companyName,
        companyUrl: newsItem.companyUrl,
        image: newsItem.image,
        video: newsItem.video,
        category: categoryForNews,
        mediaContactUrl: newsItem.mediaContactUrl,
        publishStatus: newsItem.publishStatus,
        contact: newsItem.contact,
        email: newsItem.email,
        details: newsItem.details,
        postedOn: newsItem.createdAt,
        updatedOn: newsItem.updatedAt,
      };
    });

    res.status(200).json(newsWithCategories);
  } else {
    res.status(200).json({ message: "add your news" });
  }
});

module.exports = getAllNewsController;
