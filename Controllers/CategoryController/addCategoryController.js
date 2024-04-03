const asyncHandler = require("express-async-handler");
const Category = require("../../Model/CategoryModel");
const mongoose = require("mongoose");

const addCategoryController = asyncHandler(async (req, res) => {
  const { category } = req.body;
  if (!category)
    return res.status(400).json({ message: "category is required" });

  const Id = new mongoose.Types.ObjectId();

  const saveCategory = await Category.create({
    news: Id,
    category,
  });

  res.status(200).json(saveCategory);
});

module.exports = addCategoryController;
