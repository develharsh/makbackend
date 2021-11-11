const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const partnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name can not be empty."],
    },
    email: {
      type: String,
      required: [true, "Email can not be empty."],
      unique: true,
      select: false,
    },
    phone: {
      type: String,
      required: [true, "Phone can not be empty."],
      unique: true,
      select: false,
    },
    address: {
      type: String,
      required: [true, "Address can not be empty."],
      select: false,
    },
    password: {
      type: String,
      required: [true, "Password can not be empty."],
      minLength: [8, "Password must be at least 8 characters."],
      select: false,
    },
    type: {
      type: String,
      default: "partner",
    },
    services: [
      {
        service: {
          type: mongoose.Schema.ObjectId,
          ref: "Service",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
      },
    ],
    ratings: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        client: {
          type: mongoose.Schema.ObjectId,
          ref: "Client",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    approvedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "Team",
      select: false,
    },
    active: {
      type: Boolean,
      default: false,
      select: false,
    },
    served: {
      type: Number,
      default: 0,
      select: false,
    },
    profilePic: {
      type: String,
      required: true,
    },
    legalf: {
      type: String,
      required: true,
      select: false,
    },
    legalb: {
      type: String,
      required: true,
      select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);
partnerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 12);
});
partnerSchema.methods.getJWTToken = function () {
  return jwt.sign(
    { id: this._id, type: this.type },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    }
  );
};

//Compare Password
partnerSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
// Generating Password Reset Token
partnerSchema.methods.getResetPasswordToken = function () {
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

module.exports =
  mongoose.models.Partner || mongoose.model("Partner", partnerSchema);
