// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const helmet = require("helmet");
const morgan = require("morgan");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// File upload middleware
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("✅ Cloudinary configured");

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/profile", profileRoutes); // Profile-related routes

// Default route for health check
app.get("/", (req, res) => {
  res.status(200).send("API is working!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
