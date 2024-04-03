const mongoose = require("mongoose");

const feedBackModel = mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      require: true,
    },
    message: {
      type: "string",
      required: true,
    },
  },
  { timestamps: true }
);
const FeedBack = mongoose.model("FeedBack", feedBackModel);
module.exports = FeedBack;
