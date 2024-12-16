import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import NavBar from "@/components/common/NavBar";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

// Import images
import affirmationImg from "@/assets/rectangleB.png";
import dailyThoughtsImg from "@/assets/rectangleA.png";
import relaxationImg from "@/assets/rectangleC.png";

const categories = [
  {
    title: "Mindfulness",
    subtitle: "Daily Breathing Exercise",
    bgColor: "bg-[#a2d0b3]",
    image: dailyThoughtsImg,
    span: "col-span-1",
    height: "h-[200px]",
    path: "/mindful-challenges",
    mood: "calm",
  },
  {
    title: "Affirmation",
    subtitle: "Quotes",
    bgColor: "bg-[#d0e3ed]",
    image: affirmationImg,
    span: "col-span-1",
    height: "h-[200px]",
    path: "/affirmation",
    mood: "focused",
  },
  {
    title: "Relaxation",
    subtitle: "Sleep Sound",
    bgColor: "bg-[#f1b574]",
    image: relaxationImg,
    span: "col-span-1",
    height: "h-[200px]",
    path: "/relaxation",
    mood: "stressed",
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState(null);
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    const tokenData = localStorage.getItem("authToken"); // Adjust key if needed
    if (tokenData) {
      try {
        const { token } = JSON.parse(tokenData);
        const decoded = jwt_decode(token);

        if (decoded.username) {
          setUsername(decoded.username);
        }
      } catch (err) {
        console.error("Error decoding token:", err);
        setUsername("Guest");
      }
    }
  }, []);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood === selectedMood ? null : mood);
  };

  const filteredCategories = selectedMood
    ? categories.filter((category) => category.mood === selectedMood)
    : categories;

  const moodStyles = {
    calm: {
      default: "bg-green-100 text-green-600",
      selected: "bg-green-600 text-white",
    },
    focused: {
      default: "bg-blue-100 text-blue-600",
      selected: "bg-blue-600 text-white",
    },
    stressed: {
      default: "bg-yellow-100 text-yellow-600",
      selected: "bg-yellow-600 text-white",
    },
  };

  return (
    <div className="h-screen bg-background">
      <ScrollArea className="h-full pb-24">
        <div className="container max-w-md mx-auto px-4 pt-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-0.5">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome, {username}!
              </h1>
              <p className="text-sm text-muted-foreground">
                Let's start your journey to inner peace together.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* How are you today? Section */}
          <div className="bg-secondary/50 rounded-xl p-4 mb-6 border border-secondary">
            <h2 className="text-lg font-semibold mb-3">How are you today?</h2>
            <div className="flex items-center space-x-3">
              <div className="flex space-x-2">
                {["calm", "focused", "stressed"].map((mood) => (
                  <button
                    key={mood}
                    onClick={() => handleMoodSelect(mood)}
                    className={clsx(
                      "px-3 py-1.5 rounded-full text-sm transition-all duration-300",
                      selectedMood === mood
                        ? moodStyles[mood].selected
                        : moodStyles[mood].default
                    )}
                  >
                    {mood.charAt(0).toUpperCase() + mood.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Section */}
          <div className="space-y-3 mb-8">
            <h2 className="text-lg font-semibold tracking-tight">
              {selectedMood
                ? `Recommended for ${selectedMood} mood`
                : "Recommended for you"}
            </h2>

            <AnimatePresence>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {filteredCategories.map((category) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      className={clsx(
                        "group hover:shadow-lg transition-all cursor-pointer border-none",
                        category.bgColor,
                        category.height,
                        "rounded-[20px]"
                      )}
                      onClick={() => navigate(category.path)}
                    >
                      <CardContent className="p-6 h-full flex justify-between items-center relative">
                        <div className="space-y-1 z-10">
                          <h3 className="font-medium tracking-tight text-lg">
                            {category.title}
                          </h3>
                          {category.subtitle && (
                            <p className="text-sm text-muted-foreground">
                              {category.subtitle}
                            </p>
                          )}
                        </div>

                        <div className="relative w-[200px] h-[200px] flex items-center justify-center">
                          <img
                            src={category.image}
                            alt={category.title}
                            className={clsx(
                              "w-full h-full object-cover transition-all duration-300",
                              category.title === "Affirmation"
                                ? "scale-105"
                                : ""
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </div>
        </div>
      </ScrollArea>

      {/* NavBar */}
      <NavBar />
    </div>
  );
};

export default HomePage;
