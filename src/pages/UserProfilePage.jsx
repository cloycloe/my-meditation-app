import React, { useEffect, useState } from "react";
import NavBar from "../components/common/NavBar";
import ProfileHeader from "../components/profile/ProfileHeader";
import MeditationProgress from "../components/profile/MeditationProgress";
import MeditationStats from "../components/profile/MeditationStats";
import Settings from "../components/profile/Settings";
import LoadingPage from "@/components/loading/LoadingPage"; // Import LoadingPage
import { ScrollArea } from "@/components/ui/scroll-area";
import PageTransition from "@/components/common/PageTransition";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedToken = localStorage.getItem("authToken");
        if (!storedToken) throw new Error("No token found in localStorage.");

        const token = JSON.parse(storedToken)?.token;
        if (!token) throw new Error("Invalid token format in localStorage.");

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile(response.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err.message || err);
        setError("Failed to load profile data. Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return <LoadingPage />; // Use custom loading component
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!profile) {
    return <div className="text-red-500 text-center">Profile not found.</div>;
  }

  return (
    <PageTransition>
      <div className="h-screen bg-background">
        <ScrollArea className="h-full pb-24">
          <div className="container max-w-md mx-auto px-4 pt-4">
            <ProfileHeader
              username={profile.username}
              profilePicture={profile.profilePicture}
            />
            <MeditationProgress meditationData={{}} />
            <MeditationStats meditationData={{}} />
            <Settings />
          </div>
        </ScrollArea>
        <NavBar />
      </div>
    </PageTransition>
  );
}
