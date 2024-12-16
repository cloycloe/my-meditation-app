const express = require("express");
const {
  updateProfile,
  getProfile,
} = require("../controllers/profileController"); // Profile controllers
const verifyToken = require("../middleware/authMiddleware"); // Authentication middleware

const router = express.Router();

// Route to fetch user profile
router.get("/", verifyToken, getProfile);

// Route to update user profile
router.put("/updateProfile", verifyToken, updateProfile);

// Catch-all handler for undefined routes in this router
router.all("*", (req, res) => {
  res.status(404).json({ message: "Profile route not found." });
});

module.exports = router;
