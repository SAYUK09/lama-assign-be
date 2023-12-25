const mongoose = require("mongoose");

const descriptionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [2, "Title must be at least 2 characters long"],
      maxlength: [255, "Title cannot exceed 255 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [2, "Description must be at least 2 characters long"],
      maxlength: [255, "Description cannot exceed 255 characters"],
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      populate: { select: "name" },
    },
    status: {
      type: String,
      required: [true, "Status is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Description", descriptionSchema);
