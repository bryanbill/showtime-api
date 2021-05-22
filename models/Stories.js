const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoriesSchema = new Schema(
  {
    title: {
      type: String,
      minLength: [3, "Must be three characters long"],
    },
    description: {
      type: String,
      default: "",
    },
    thumbnailUr: {
      type: String,
      default: "no-photo.jpg",
    },
    url: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

module.exports = mongoose.model("Stories", StoriesSchema);
