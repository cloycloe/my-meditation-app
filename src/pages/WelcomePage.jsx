import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import welcomePageIcon from "../assets/welcomepageicon.png";

const WelcomePage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleGetStarted = () => {
    navigate("/login"); // Navigate to the login page when clicked
  };

  return (
    <div
      className="flex flex-col items-center justify-center 
                    min-h-screen 
                    bg-white 
                    text-black 
                    p-4"
    >
      <img
        src={welcomePageIcon}
        alt="Welcome Icon"
        className="w-64 h-64 mb-8"
      />

      <h1 className="text-3xl font-serif mb-4 text-center">
        <span style={{ color: "#75A586" }}>Inner</span>
        <span style={{ color: "#e5ac5a" }}>Bloom</span>
      </h1>

      <p className="text-xl text-black text-center max-w-md mb-12">
        Your journey to mindfulness begins here
      </p>

      <div className="mt-8">
        <button
          className="text-white 
                           px-10 py-3 
                           rounded-full 
                           font-semibold 
                           hover:opacity-90 
                           transition-opacity
                           w-64 
                           text-center"
          style={{
            backgroundColor: "#e5ac5a",
          }}
          onClick={handleGetStarted} // Add the onClick event to handle navigation
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
