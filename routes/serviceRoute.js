const express = require("express");
const { add, update, remove } = require("../controllers/serviceController.js");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.route("/add").post(add);
router.route("/update/:id").put(update);
router.route("/remove/:id").delete(remove);

module.exports = router;
