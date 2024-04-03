const asyncHandler = require("express-async-handler");
const Category = require("../../Model/CategoryModel");

const getAllCategoriesController = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  if (!categories) {
    res.status(404).json("no category found");
  }
  res.status(200).json(categories);
});

module.exports = getAllCategoriesController;
