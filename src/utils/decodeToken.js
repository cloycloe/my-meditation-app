import jwtDecode from "jwt-decode";

export const decodeToken = (token) => {
  if (!token || typeof token !== "string") {
    console.error("Invalid token: ", token); // Log invalid token for debugging
    throw new Error(
      "Invalid token specified: Token is missing or not a string."
    );
  }

  try {
    console.log("Decoding token:", token); // Log token for debugging
    // Check if the token is correctly formatted before decoding
    if (token.split(".").length !== 3) {
      throw new Error("Invalid token format.");
    }
    return jwtDecode(token); // Decode the token
  } catch (error) {
    console.error("Failed to decode token:", error); // Log error message
    throw new Error("Failed to decode token: " + error.message);
  }
};

export const isTokenExpired = (decodedToken) => {
  if (!decodedToken || !decodedToken.exp) {
    return true; // Return true if no 'exp' field exists, assuming expired
  }
  const currentTime = Date.now() / 1000; // Current time in seconds
  return decodedToken.exp < currentTime;
};
