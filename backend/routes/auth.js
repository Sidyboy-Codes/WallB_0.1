const express = require("express");
// using Router to handle routes
const router = express.Router();

// importing controller methods
const { signup, signin } = require("../controllers/authController");


// route for registration (signup)
router.route("/signup").post(signup);

// route for login (signin)
router.route("/signin").post(signin);

module.exports = router;