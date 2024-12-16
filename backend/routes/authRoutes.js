const express = require("express");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

// Signup and login routes (no authentication required)
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
