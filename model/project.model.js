const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      populate: { select: "name  email" },
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters long"],
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
