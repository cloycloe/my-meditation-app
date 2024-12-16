import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AffirmationPage from "./pages/AffirmationPage";
import RelaxationPage from "./pages/RelaxationPage";
import SoundPage from "./pages/SoundPage";
import MindfullChallengesPage from "./pages/MindfullChallengesPage";
import UserProfilePage from "./pages/UserProfilePage";
import MeditationStats from "./components/profile/MeditationStats"; // Import MeditationStats
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/common/PageTransition";
import WelcomePage from "./pages/WelcomePage";

// Route guard component for protected routes
const ProtectedRoute = ({ children }) => {
  const storedToken = localStorage.getItem("authToken");

  try {
    const token = storedToken ? JSON.parse(storedToken).token : null;

    if (!token) throw new Error("No token found");
    return children;
  } catch (error) {
    console.error("Authentication error:", error.message);
    return <Navigate to="/login" replace />;
  }
};

export default function App() {
  const storedToken = localStorage.getItem("authToken");
  const token = storedToken ? JSON.parse(storedToken).token : null;

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public routes */}
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/affirmation" element={<AffirmationPage />} />
          <Route path="/relaxation" element={<RelaxationPage />} />
          <Route path="/sound" element={<SoundPage />} />
          <Route
            path="/mindful-challenges"
            element={<MindfullChallengesPage />}
          />
          <Route path="/profile" element={<UserProfilePage />} />

          {/* Route for MeditationStats */}
          <Route
            path="/stats"
            element={
              <PageTransition>
                <MeditationStats />
              </PageTransition>
            }
          />

          {/* Protected routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <HomePage />
                </PageTransition>
              </ProtectedRoute>
            }
          />

          {/* Default and fallback routes */}
          <Route
            path="/"
            element={<Navigate to={token ? "/home" : "/welcome"} replace />}
          />
          <Route
            path="*"
            element={<Navigate to={token ? "/home" : "/login"} replace />}
          />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}
