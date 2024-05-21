const asyncHandler = require("express-async-handler");
const News = require("../../Model/NewsModel");
const Category = require("../../Model/CategoryModel");
const cloudinary = require("cloudinary").v2;

const editNewsController = asyncHandler(async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  const { id } = req.params;

  const {
    headline,
    datelineCity,
    datelineState,
    datelineCountry,
    companyName,
    companyUrl,
    category,
    mediaContactUrl,
    contact,
    email,
    details,
  } = req.body;
  

  const existingNews = await News.findById(id);

  const updatedFiles = [];

  // Handle image update
  if (req.files["image"] && req.files["image"][0]) {
    const imageFile = req.files["image"][0];
    const imageResult = await cloudinary.uploader.upload(imageFile.path, {
      folder: "uploads",
      resource_type: "auto",
    });
    updatedFiles.push({
      fileName: imageResult.original_filename,
      fileType: imageResult.resource_type,
      filePath: imageResult.secure_url,
      fileSize: imageResult.bytes,
    });
  } else {
    // If no new image provided, retain the previous one
    updatedFiles.push(...existingNews.image);
  }

  // Handle video update
  if (req.files["video"] && req.files["video"][0]) {
    const videoFile = req.files["video"][0];
    const videoResult = await cloudinary.uploader.upload(videoFile.path, {
      folder: "uploads",
      resource_type: "auto",
    });
    updatedFiles.push({
      fileName: videoResult.original_filename,
      fileType: videoResult.resource_type,
      filePath: videoResult.secure_url,
      fileSize: videoResult.bytes,
    });
  } else {
    // If no new video provided, retain the previous one
    updatedFiles.push(...existingNews.video);
  }

  const updatedNews = await News.findByIdAndUpdate(
    id,
    {
      headline,
      datelineCity,
      datelineState,
      datelineCountry,
      companyName,
      companyUrl,
      image: updatedFiles.filter((file) => file.fileType.startsWith("image")),
      video: updatedFiles.filter((file) => file.fileType.startsWith("video")),
      mediaContactUrl,
      contact,
      email,
      details,
    },
    { new: true } // Return the updated document
  );

  // Update news category if necessary
const updatedCategory = await Category.findOneAndUpdate(
  { news: id }, // Search condition
  { $set: { category: category } }, // Update operation to set the category field
  { new: true } // Return the modified document after update
);
  console.log(updatedCategory);
  // Return updated news data and category
  res.status(200).json({ news: updatedNews, category: updatedCategory });
});


module.exports = editNewsController;
