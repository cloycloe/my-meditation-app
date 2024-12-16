const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization; // Get the Authorization header
  console.log("Authorization Header:", authHeader); // Debugging log

  // Check if the Authorization header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.error("No token provided in Authorization header.");
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1]; // Extract the token part
  console.log("Extracted Token:", token); // Debugging log

  try {
    // Verify the token using the secret from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user data to the request object
    console.log("Decoded Token Data:", decoded); // Debugging log
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.error("JWT Verification Error:", error.message); // Log errors
    return res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = verifyToken;
