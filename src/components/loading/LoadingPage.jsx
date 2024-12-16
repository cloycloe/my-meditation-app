import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirection after loading
import logo from "@/assets/logoA.png";

export default function LoadingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate a 2-second loading duration
    const timer = setTimeout(() => {
      setIsLoading(false);
      navigate("/home"); // Redirect to homepage or any route after loading
    }, 2000); // 2000ms = 2 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <img
          src={logo}
          alt="Loading Logo"
          className="h-24 w-24 animate-pulse"
        />
      </div>
    );
  }

  return null; // If not loading, return nothing
}
