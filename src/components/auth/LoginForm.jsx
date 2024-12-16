import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import loginbg from "../../assets/lOGIN.jpg";

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Validate inputs
    if (!username.trim()) {
      setErrorMessage("Username is required");
      return;
    }

    if (!password.trim()) {
      setErrorMessage("Password is required");
      return;
    }

    try {
      setIsLoading(true);

      // Send login request to backend
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // Token handling
      if (response.status === 200 && response.data.token) {
        const { token } = response.data;

        // Save token and user data to localStorage
        const userData = {
          token,
          user: response.data.user || { username },
          expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        };

        // Store validated token in localStorage
        localStorage.setItem("authToken", JSON.stringify(userData));
        navigate("/home"); // Redirect to homepage
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      // Handle errors (e.g., invalid credentials or server issues)
      setErrorMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${loginbg})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      <div className="flex items-center justify-center min-h-screen relative z-10">
        <div className="w-full max-w-md px-4 space-y-6 bg-transparent">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-semibold text-white">
              Start Your Journey
            </h2>
            <p className="text-sm text-white">
              Let's begin your path to peace and mindfulness.
            </p>
          </div>

          <form
            className="space-y-4 flex flex-col items-center"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Username"
              className="w-[317px] h-[56px] mx-auto rounded-[8px] text-black px-4 focus:ring-2 focus:ring-black focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <div className="relative w-[317px]">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[56px] rounded-[8px] text-black px-4 focus:ring-2 focus:ring-black focus:outline-none"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errorMessage && (
              <div className="text-red-500 text-center">{errorMessage}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-[317px] h-[56px] mx-auto text-white font-bold rounded-[8px] mt-4 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#e5ac5a] hover:bg-[#c68e47]"
              }`}
            >
              {isLoading ? "Logging In..." : "Log In"}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-white">
              Don't have an account?{" "}
              <motion.a
                onClick={() => navigate("/signup")}
                className="text-white font-bold cursor-pointer hover:underline hover:text-[#75A586]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                Sign up
              </motion.a>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
