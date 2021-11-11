const Service = require("../models/serviceModel");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.add = catchAsyncErrors(async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    res.status(200).json({ success: true, service });
  } catch (err) {
    const message =
      err.code === 11000
        ? `${Object.values(err.keyValue)[0]} already exists.`
        : err.message;
    res.status(500).json({ success: false, message });
  }
});

exports.update = catchAsyncErrors(async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service)
      return res
        .status(404)
        .json({ success: false, message: "This Service doesn't exist" });
    service.name = req.body.name;
    await service.save();
    res.status(200).json({ success: true, service });
  } catch (err) {
    const message =
      err.code === 11000
        ? `${Object.values(err.keyValue)[0]} already exists.`
        : err.message;
    res.status(500).json({ success: false, message });
  }
});

exports.remove = catchAsyncErrors(async (req, res, next) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Deleted the service." });
  } catch (err) {
    res.status(500).json({ success: false, message: "Invalid Service Id." });
  }
});
