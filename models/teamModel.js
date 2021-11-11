const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name can not be empty."],
    },
    email: {
      type: String,
      required: [true, "Email can not be empty."],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Phone can not be empty."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password can not be empty."],
      minLength: [8, "Password must be at least 8 characters."],
      select: false,
    },
    type: {
      type: String,
      default: "team",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    addedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "Team",
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
teamSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 12);
});
teamSchema.methods.getJWTToken = function () {
  return jwt.sign(
    { id: this._id, type: this.type },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    }
  );
};

//Compare Password
teamSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generating Password Reset Token
teamSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.models.Team || mongoose.model("Team", teamSchema);
