const asyncHandler = require("express-async-handler");
const News = require("../../Model/NewsModel");
const Category = require("../../Model/CategoryModel");

const getNewsByCategoryController = asyncHandler(async (req, res) => {
  const { category } = req.params;
  try {
    let allNews;

    if (category !== "all") {
      // If category is provided, find the category documents
      const categoryDocs = await Category.find({
        category: category.toLowerCase(),
      });

      if (!categoryDocs || categoryDocs.length === 0) {
        return res.status(404).json({ message: "Category not found" });
      }

      // Initialize an array to store news items
      const newsIds = categoryDocs.map((data) => data.news);

      allNews = await News.find({
        _id: { $in: newsIds }, // Find news where the _id is in the array of newsIds
      }).sort("-createdAt");
    } else {
      allNews = await News.find().sort("-createdAt");
    }

    if (allNews && allNews.length > 0) {
      const categories = await Category.find();
      const newsWithCategories = allNews.map((newsItem) => {
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
      res.status(200).json({ message: "No news found" });
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = getNewsByCategoryController;
