const asyncHandler = require("express-async-handler");
const News = require("../../Model/NewsModel");
const Category = require("../../Model/CategoryModel");
const cloudinary = require("cloudinary").v2;

const publishNewsController = asyncHandler(async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // Ensure all required fields are present
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

  // Check for required fields
  if (
    !headline ||
    !datelineCity ||
    !datelineState ||
    !datelineCountry ||
    !companyName ||
    !companyUrl ||
    !category ||
    !mediaContactUrl ||
    !contact ||
    !email ||
    !details
  ) {
    res.status(400);
    throw new Error("Fill all required fields");
  }

  // Ensure files are uploaded
  if (!req.files || !req.files["image"] || !req.files["video"]) {
    return res
      .status(400)
      .json({ message: "Please upload both image and video files." });
  }

  // Initialize array to store uploaded files
  const uploadedFiles = [];

  // Upload image file to Cloudinary
  const imageFile = req.files["image"][0];
  const imageResult = await cloudinary.uploader.upload(imageFile.path, {
    folder: "uploads",
    resource_type: "auto",
  });
  uploadedFiles.push({
    fileName: imageResult.original_filename,
    fileType: imageResult.resource_type,
    filePath: imageResult.secure_url,
    fileSize: imageResult.bytes,
  });

  // Upload video file to Cloudinary
  const videoFile = req.files["video"][0];
  const videoResult = await cloudinary.uploader.upload(videoFile.path, {
    folder: "uploads",
    resource_type: "auto",
  });
  uploadedFiles.push({
    fileName: videoResult.original_filename,
    fileType: videoResult.resource_type,
    filePath: videoResult.secure_url,
    fileSize: videoResult.bytes,
  });

  // Create news document
  const news = await News.create({
    user: req.user._id,
    headline,
    datelineCity,
    datelineState,
    datelineCountry,
    companyName,
    companyUrl,
    image: uploadedFiles.filter((file) => file.fileType.startsWith("image")),
    video: uploadedFiles.filter((file) => file.fileType.startsWith("video")),
    mediaContactUrl,
    contact,
    email,
    details,
  });
  const saveCategory = await Category.create({
    news: news._id,
    category: category,
  });

  res.status(201).json({ news: news, category: saveCategory });
});

module.exports = publishNewsController;
