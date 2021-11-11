const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name can not be empty."],
      unique:true
    },
    image: {
      type: String,
      required: [true, "Image can not be empty."]
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Service || mongoose.model("Service", serviceSchema);
