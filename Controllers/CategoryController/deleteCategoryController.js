const asyncHandler = require("express-async-handler");
const Category = require("../../Model/CategoryModel");

const deleteCategoryController = asyncHandler(async (req, res) => {
  const { category } = req.body;
  console.log(req.body);
  try {
    const getCategory = await Category.find({ category: category });
    console.log(getCategory);

    if (!getCategory || getCategory.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Perform deletion logic here if needed
    const result = await Category.deleteMany({ category: category });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = deleteCategoryController;
