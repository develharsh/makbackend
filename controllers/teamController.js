const Team = require("../models/teamModel");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const sendToken = require("../utils/sendToken");

exports.signup = catchAsyncErrors(async (req, res, next) => {
  try {
    let user = await Team.create(req.body);
    sendToken(user, 200, res);
  } catch (err) {
    const message =
      err.code === 11000
        ? `${Object.values(err.keyValue)[0]} already exists.`
        : err.message;
    res.status(500).json({ success: false, message });
  }
});

exports.login = catchAsyncErrors(async (req, res, next) => {
  try {
    const { ID, password } = req.body;
    let WHOM = ID.includes("@")
        ? { email: ID, active: true }
        : { phone: ID, active: true },
      user = await Team.findOne(WHOM).select("+password");
    if (!user) {
      return res
        .status(422)
        .json({ success: false, message: "No such user found." });
    }
    const isPasMatched = await user.comparePassword(password);
    if (!isPasMatched) {
      return res
        .status(422)
        .json({ success: false, message: "No such user found." });
    }
    sendToken(user, 200, res);
  } catch (err) {
    res.status(500).json({ success: false, message: "Something Went Wrong." });
  }
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { ID } = req.body;
  let WHOM = ID.includes("@")
      ? { email: ID, active: true }
      : { phone: ID, active: true },
    user = await Team.findOne(WHOM);

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "No such user found." });
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save();

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/team/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Team-mate Password Reset`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    return res.status(500).json({ success: false, message: error.message });
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  try {
    //creating token hash
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await Team.findOne({
      active: true,
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "Invalid Reset Password Token OR Token expired.",
      });
    const { password, confirmPassword } = req.body;
    if (!password || password !== confirmPassword)
      return res.status(422).json({
        success: false,
        message: "Invalid: Password or Confirmed Password.",
      });
    user.password = req.body.password;
    user.resetPasswordToken = user.resetPasswordExpire = undefined;
    await user.save();
    //after changing password, automatically login him/her
    sendToken(user, 200, res);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});
