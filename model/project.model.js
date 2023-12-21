const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [6, "Name must be at least 6 characters long"],
    maxlength: [255, "Name cannot exceed 255 characters"],
  },
  descriptions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Description",
      populate: { select: "title description status createdAt" },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Project", projectSchema);
