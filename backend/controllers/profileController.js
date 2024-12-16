const User = require("../models/User");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to get the profile of the logged-in user
const getProfile = async (req, res) => {
  try {
    // Fetch user data from the database using ID from token
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with user profile details
    res.status(200).json({
      username: user.username,
      profilePicture: user.profilePicture || null, // Default to null if no profile picture
    });
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to update the profile of the logged-in user
const updateProfile = async (req, res) => {
  try {
    const { name, profilePicture } = req.body;

    // Fetch user data from the database using ID from token
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update username if provided
    if (name) user.username = name;

    // Handle profile picture upload
    if (profilePicture) {
      try {
        // Upload the image to Cloudinary
        const result = await cloudinary.uploader.upload(profilePicture, {
          folder: "profile_pictures",
          resource_type: "image",
        });
        // Update user's profile picture with the Cloudinary URL
        user.profilePicture = result.secure_url;
      } catch (uploadError) {
        console.error("Error uploading to Cloudinary:", uploadError.message);
        return res
          .status(500)
          .json({ message: "Error uploading profile picture" });
      }
    }

    // Save changes
    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        username: user.username,
        profilePicture: user.profilePicture || null,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getProfile, updateProfile };
