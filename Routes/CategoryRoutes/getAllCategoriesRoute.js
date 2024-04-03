const getAllCategoriesController = require("../../Controllers/CategoryController/getAllCategoriesController");

const router = require("express").Router();

router.get("/getAllCategories", getAllCategoriesController);

module.exports = router;
