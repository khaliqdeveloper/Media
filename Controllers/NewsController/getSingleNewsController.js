const asyncHandler = require("express-async-handler");
const News = require("../../Model/NewsModel");
const Category = require("../../Model/CategoryModel");

const getSingleNewsController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const news = await News.findById({ _id: id });
  if (news) {
    const {
      _id,
      headline,
      datelineCity,
      datelineState,
      datelineCountry,
      companyName,
      companyUrl,
      mediaContactUrl,
      image,
      video,
      publishStatus,
      contact,
      email,
      details,
    } = news;
    const category = await Category.find({ news: _id });
    res.status(200).json({
      _id,
      headline,
      datelineCity,
      datelineState,
      datelineCountry,
      companyName,
      companyUrl,
      category,
      image,
      video,
      publishStatus,
      mediaContactUrl,
      contact,
      email,
      details,
    });
  } else {
    res.status(404).json({ message: "News not Found" });
  }
});

module.exports = getSingleNewsController;
