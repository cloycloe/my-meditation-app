import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "/components/ui/input";
import { useNavigate } from "react-router-dom";
import signupBg from "@/assets/SIGNUP.jpg";
import logoB from "@/assets/logoB.png";
import { motion } from "framer-motion";
import { Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";
import { signup } from "src/utils/api";
import zxcvbn from "zxcvbn";
import { toast } from "react-hot-toast";

export default function SignUpForm() {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Password strength check
    if (name === "password") {
      const strength = zxcvbn(value).score;
      setPasswordStrength(strength);
    }

    // Clear specific field error when typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (passwordStrength < 2) {
      newErrors.password = "Password is too weak";
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Password strength color and text
  const getPasswordStrengthInfo = () => {
    const strengthLabels = [
      "Very Weak",
      "Weak",
      "Medium",
      "Strong",
      "Very Strong",
    ];
    const strengthColors = [
      "bg-red-500",
      "bg-orange-500",
      "bg-yellow-500",
      "bg-green-500",
      "bg-green-600",
    ];

    return {
      label: strengthLabels[passwordStrength],
      color: strengthColors[passwordStrength],
    };
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the form errors");
      return;
    }

    setIsLoading(true);
    try {
      const { confirmPassword, ...signupData } = formData;
      const result = await signup(signupData);

      // Store the token in localStorage with a consistent key
      localStorage.setItem(
        "authToken",
        JSON.stringify({ token: result.token, expires: Date.now() + 86400000 }) // 24-hour expiry
      );
      toast.success("Signup successful!");
      navigate("/home");
    } catch (error) {
      toast.error(error.message || "Signup failed, please try again.");
      setErrors({
        submit: error.message || "Signup failed, please try again.",
      });
    } finally {
      setIsLoading(false);
    }
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
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>

      <div className="flex items-center justify-center min-h-screen relative z-10 p-4">
        <div className="w-full max-w-md px-6 py-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl">
          <div className="flex justify-center mb-6">
            <img src={logoB} alt="Logo" className="w-20 h-20 object-contain" />
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Create Your Account
            </h2>
            <p className="text-sm text-gray-600">
              Start your mindfulness journey today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Input */}
            <div>
              <Input
                name="username"
                type="text"
                placeholder="Username"
                className={`w-full h-12 ${
                  errors.username ? "border-red-500" : ""
                }`}
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <XCircle className="mr-2 size-4" /> {errors.username}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <Input
                name="email"
                type="email"
                placeholder="Email"
                className={`w-full h-12 ${
                  errors.email ? "border-red-500" : ""
                }`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <XCircle className="mr-2 size-4" /> {errors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="relative">
              <Input
                name="password"
                type={showPassword.password ? "text" : "password"}
                placeholder="Password"
                className={`w-full h-12 ${
                  errors.password ? "border-red-500" : ""
                }`}
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("password")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword.password ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

              {/* Password strength bar and label */}
              {formData.password && (
                <>
                  <div className="mt-1 h-1 w-full bg-gray-200 rounded">
                    <div
                      className={`h-1 rounded transition-all duration-500 ${
                        getPasswordStrengthInfo().color
                      }`}
                      style={{ width: `${(passwordStrength + 1) * 25}%` }}
                    />
                  </div>
                  <p className="text-xs mt-1 text-gray-600">
                    Password Strength: {getPasswordStrengthInfo().label}
                  </p>
                </>
              )}

              {errors.password && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <XCircle className="mr-2 size-4" /> {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <Input
                name="confirmPassword"
                type={showPassword.confirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className={`w-full h-12 ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <XCircle className="mr-2 size-4" /> {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <Button
                type="submit"
                className="w-full h-12"
                disabled={isLoading}
              >
                {isLoading ? "Signing up..." : "Sign Up"}
              </Button>
            </div>

            {/* Error message */}
            {errors.submit && (
              <p className="text-red-500 text-xs mt-2 text-center">
                {errors.submit}
              </p>
            )}
          </form>
        </div>
      </div>
    </motion.div>
  );
}
