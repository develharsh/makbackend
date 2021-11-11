const express = require("express");
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/partnerController.js");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/forgot").post(forgotPassword);
router.route("/reset/:token").put(resetPassword);

module.exports = router;
