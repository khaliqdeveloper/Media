const asyncHandler = require("express-async-handler");
const News = require("../../Model/NewsModel");

const publishNewsStatusController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { publishStatus } = req.body;
  // console.log(publishStatus);
  if (publishStatus === undefined || publishStatus === null) {
    res.status(400).json({ message: "update value not found" });
  }

  try {
    const updatedNews = await News.findByIdAndUpdate(
      id,
      { publishStatus: publishStatus },
      { new: true }
    );

    // Check if the news was found and updated successfully
    if (!updatedNews) {
      return res.status(404).json({ message: "News not found" });
    }

    // Send the updated news as the response
    res.json(updatedNews);
  } catch (error) {
    console.error("Error updating publish status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Export the controller function for use in routes
module.exports = publishNewsStatusController;
