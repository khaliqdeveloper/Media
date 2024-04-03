const mongoose = require("mongoose");

const NewsModel = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    headline: {
      type: String,
      required: true,
    },
    datelineCity: {
      type: String,
      required: true,
    },
    datelineState: {
      type: String,
      required: true,
    },
    datelineCountry: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    companyUrl: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
      default: {},
    },
    video: {
      type: Object,
      default: {},
    },
    publishStatus: {
      type: Boolean,
      required: true,
      default: false,
    },
    mediaContactUrl: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    details: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model("News", NewsModel);

module.exports = News;
