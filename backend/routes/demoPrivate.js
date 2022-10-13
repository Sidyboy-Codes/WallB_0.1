const express = require("express");
const router = express.Router();

// controller methods
const { demoPrivateRoute } = require("../controllers/demoPrivateController");
const { protect } = require("../middleware/auth");

router.route("/private").get(protect, demoPrivateRoute);

module.exports = router;