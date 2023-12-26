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
    general: {
      chatbotName: { type: String, default: "" },
      welcomeMessage: { type: String, default: "" },
      inputPlaceholder: { type: String, default: "" },
    },
    display: {
      primaryColor: { type: String, default: "#7BD568" },
      fontColor: { type: String, default: "#3C3C3C" },
      fontSize: { type: Number, default: 25 },
      chatHeight: { type: Number, default: 50 },
      showSources: { type: Boolean, default: false },
      chatIconSize: { type: Number, default: 48 },
      positionOnScreen: {
        type: String,
        enum: ["bottom right", "top right", "bottom left", "top left"],
        default: "bottom right",
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
