import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import signupBg from "@/assets/SIGNUP.jpg"; // Your custom background image
import logoB from "@/assets/logoB.png"; // Logo image
import { motion } from "framer-motion"; // Import motion for transitions
import { signup } from "../utils/api"; // Import the signup function from the correct relative path
import { Eye, EyeOff } from "lucide-react"; // Import eye icons for password toggle

export default function SignUpPage() {
  const navigate = useNavigate();

  // Form state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [errorMessage, setErrorMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the signup function (this will hit the backend API)
      const result = await signup(username, email, password);
      console.log("Signup Success:", result);

      // After successful signup, you can store the token or perform additional steps
      localStorage.setItem("token", result.token); // Assuming result has a token

      // Navigate to the home page
      navigate("/home");
    } catch (error) {
      setErrorMessage("Signup failed, please try again.");
    }
  };

  // Toggle password visibility
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
      style={{ backgroundImage: `url(${signupBg})` }}
    >
      {/* Light overlay for subtle darkening */}
      <div className="absolute inset-0 bg-gray-800 opacity-20"></div>

      <div className="flex items-center justify-center min-h-screen relative z-10">
        <div className="w-full max-w-md px-4 space-y-6 bg-transparent">
          {/* Logo */}
          <div className="flex justify-center">
            <img src={logoB} alt="Logo" className="w-20 h-20 object-contain" />
          </div>

          {/* Header text */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-white">
              Welcome to Your Mindfulness Journey
            </h2>
            <p className="text-sm text-white">Sign up to get started!</p>
          </div>

          {/* Error Message (if any) */}
          {errorMessage && (
            <div className="text-red-500 text-center">{errorMessage}</div>
          )}

          {/* Form */}
          <form
            className="space-y-4 flex flex-col items-center"
            onSubmit={handleSubmit}
          >
            <Input
              type="text"
              placeholder="Username"
              className="w-[317px] h-[56px] mx-auto rounded-[8px] text-black"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Email"
              className="w-[317px] h-[56px] mx-auto rounded-[8px] text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password Input with Toggle Visibility */}
            <div className="relative w-[317px]">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full h-[56px] rounded-[8px] text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Sign Up Button with new color scheme */}
            <Button
              type="submit"
              className="w-[317px] h-[56px] text-white font-bold bg-[#e5ac5a] hover:bg-[#c68e47] rounded-[8px] mt-4"
            >
              Sign Up
            </Button>
          </form>

          {/* Link to Login with underlined text */}
          <div className="text-center mt-4">
            <p className="text-sm text-white">
              Already have an account?{" "}
              <motion.a
                onClick={() => navigate("/login")}
                className="text-white font-bold cursor-pointer hover:underline hover:text-[#75A586]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                Log In
              </motion.a>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
