const express = require("express");
const { logout, profile } = require("../controllers/commonController.js");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.route("/logout").get(isAuthenticated, logout);
router.route("/profile").get(isAuthenticated, profile);

module.exports = router;
