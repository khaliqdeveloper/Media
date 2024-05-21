const asyncHandler = require("express-async-handler");
const User = require("../../Model/UserModel");
const cloudinary = require("cloudinary").v2;

const updateUserController = asyncHandler(async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  let updatedFiles = [];

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return; // Exit function early if user not found
  }

  user.name = req.body.name || user.name;
  user.journalName = req.body.journalName || user.journalName;

  if (req.files["image"] && req.files["image"][0]) {
    const imageFile = req.files["image"][0];
    try {
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
      // Update user's photo with Cloudinary URL
      user.photo = imageResult.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      res.status(500).json({ message: "Failed to upload image" });
      return; // Exit function if there's an error uploading image
    }
  }

  try {
    // Save the updated user data
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      photo: updatedUser.photo,
      journalName: updatedUser.journalName,
      updatedFiles: updatedFiles || [],
    });
  } catch (error) {
    console.error("Error saving user data:", error);
    res.status(500).json({ message: "Failed to update user" });
  }
});

module.exports = updateUserController;
