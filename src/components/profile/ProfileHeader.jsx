import React, { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Camera } from "lucide-react";

export default function ProfileHeader() {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPicture, setIsEditingPicture] = useState(false);
  const [name, setName] = useState("Loading...");
  const [avatarUrl, setAvatarUrl] = useState("https://via.placeholder.com/80");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedToken = localStorage.getItem("authToken");
        const token = storedToken ? JSON.parse(storedToken).token : null;

        if (!token) throw new Error("No token found");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch profile data");

        const data = await response.json();
        setName(data.username || "Guest");
        setAvatarUrl(data.profilePicture || "https://via.placeholder.com/80");
      } catch (error) {
        console.error("Error fetching profile:", error);
        setMessage("Failed to load profile data.");
      }
    };

    fetchProfile();
  }, []);

  const handleSaveName = async () => {
    setLoading(true);
    setMessage("");

    try {
      const storedToken = localStorage.getItem("authToken");
      const token = storedToken ? JSON.parse(storedToken).token : null;

      if (!token) throw new Error("You need to be logged in!");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/profile/updateProfile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name }),
        }
      );

      if (!response.ok) throw new Error("Failed to update profile");

      const data = await response.json();
      setMessage(data.message || "Name updated successfully!");
      setIsEditingName(false);
    } catch (error) {
      console.error("Error updating name:", error);
      setMessage(error.message || "Error updating name");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default"); // Use your actual upload preset name
      formData.append("cloud_name", "dn5urc7ez"); // Use your Cloudinary cloud name

      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dn5urc7ez/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to upload image to Cloudinary");

      const data = await response.json();
      const uploadedUrl = data.secure_url;

      // Update profile picture URL in the backend
      const storedToken = localStorage.getItem("authToken");
      const token = storedToken ? JSON.parse(storedToken).token : null;

      const updateResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/profile/updateProfile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ profilePicture: uploadedUrl }),
        }
      );

      if (!updateResponse.ok)
        throw new Error("Failed to update profile picture");

      const updateData = await updateResponse.json();
      setAvatarUrl(uploadedUrl);
      setMessage(updateData.message || "Profile picture updated successfully!");
      setIsEditingPicture(false);
    } catch (error) {
      console.error("Error updating profile picture:", error);
      setMessage(error.message || "Error updating profile picture");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="rounded-lg bg-[#E8F1EE] p-6 mb-6 flex items-center">
        <div className="relative">
          <Avatar className="w-20 h-20 border-4 border-[#75A586]">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Camera
            className="absolute bottom-0 right-0 w-6 h-6 bg-[#75A586] text-white p-1 rounded-full cursor-pointer"
            onClick={() => document.getElementById("fileInput").click()}
          />
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
        <div className="ml-4 flex flex-col">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold text-black">{name}</h2>
            <Pencil
              className="w-4 h-4 ml-2 text-[#75A586] cursor-pointer"
              onClick={() => setIsEditingName(true)}
            />
          </div>
          <p className="text-sm text-black/70">Your journey to inner peace</p>
        </div>
      </div>

      {isEditingName && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold text-center mb-4">
              Edit Name
            </h3>
            <div className="space-y-4">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-secondary"
              />
              <div className="flex justify-between mt-4">
                <Button
                  onClick={() => setIsEditingName(false)}
                  className="w-[48%] bg-gray-300 hover:bg-gray-400 text-black"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveName}
                  disabled={loading}
                  className="w-[48%] bg-[#75A586] hover:bg-[#658E74] text-white"
                >
                  {loading ? "Saving..." : "Save"}
                </Button>
              </div>
              <div className="mt-2 text-sm text-center text-red-500">
                {message}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
