const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Adjust the path to your User model

// Signup function
const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists by email
    const userExistsByEmail = await User.findOne({ email });
    if (userExistsByEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Check if the username already exists
    const userExistsByUsername = await User.findOne({ username });
    if (userExistsByUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save user to the database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, username: newUser.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Send response with token
    res.status(201).json({ token });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

// Login function
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Validation
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user exists by username
    const user = await User.findOne({ username });
    if (!user) {
      console.warn("Login failed: User not found");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.warn("Login failed: Incorrect password");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Send response with token
    res.status(200).json({
      token,
      user: {
        userId: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

module.exports = { signup, login };
