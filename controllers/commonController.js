const Client = require("../models/clientModel.js");
const Team = require("../models/teamModel");
const Partner = require("../models/partnerModel.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ success: true, type: req.user.type });
});

exports.profile = catchAsyncErrors(async (req, res, next) => {
  try {
    const { type, _id } = req.user;
    let user = null;
    if (type === "client") {
      user = await Client.findById(req.user._id);
    } else if (type === "team") {
      user = await Team.findById(req.user._id);
    } else if (type === "partner") {
      user = await Partner.findById(req.user._id);
    }
    if (!user)
      return res
        .status(422)
        .json({ success: false, message: "No such user found." });
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, message: "No such user found." });
  }
});
