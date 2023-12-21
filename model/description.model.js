const mongoose = require("mongoose");

const descriptionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [6, "Title must be at least 6 characters long"],
    maxlength: [255, "Title cannot exceed 255 characters"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minlength: [6, "Description must be at least 6 characters long"],
    maxlength: [255, "Description cannot exceed 255 characters"],
  },
  status: {
    type: String,
    required: [true, "Status is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Description", descriptionSchema);
