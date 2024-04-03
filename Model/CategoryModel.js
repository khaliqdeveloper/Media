const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  news: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "News",
  },
  category: {
    type: String,
    required: true,
    lowercase: true,
  },
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
