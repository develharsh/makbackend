const jwt = require("jsonwebtoken");
const Team = require("../models/teamModel");
const Client = require("../models/clientModel.js");
const Partner = require("../models/partnerModel.js");
const catchAsyncErrors = require("./catchAsyncErrors");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.query;

  if (!token || token === "undefined") {
    return res.status(401).json({
      success: false,
    });
  }
  let decodedData = null;
  try {
    decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    return res.status(422).json({
      success: false,
    });
  }

  if (decodedData.type === "team") {
    req.user = await Team.findById(decodedData.id);
  } else if (decodedData.type === "client") {
    req.user = await Client.findById(decodedData.id);
  } else if (decodedData.type === "partner") {
    req.user = await Partner.findById(decodedData.id);
  }

  next();
});
