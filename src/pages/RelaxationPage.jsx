import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area"; // Import ShadCN ScrollArea
import NavBar from "@/components/common/NavBar";
import PageTransition from "@/components/common/PageTransition";

// Import all audio files
import waveAudio from "@/assets/WaveSound1.mp3";
import nightAudio from "@/assets/NightSound1.mp3";
import thunderstormAudio from "@/assets/ThunderStormSound1.mp3";
import forestAudio from "@/assets/ForestSound1.mp3";
import pianoAudio from "@/assets/PianoSound1.mp3";
import fireCrackingAudio from "@/assets/FireCrackingSound1.mp3";

// Import all images
import waveImg from "@/assets/WaveSound.jpg";
import nightImg from "@/assets/NightSound.jpg";
import thunderstormImg from "@/assets/ThunderstormSound.jpg";
import forestImg from "@/assets/ForestSound.jpg";
import pianoImg from "@/assets/PianoMelodySound.jpg";
import fireCrackingImg from "@/assets/FireCrackingSound.jpg";

const soundCategories = [
  {
    title: "Wave Sound",
    image: waveImg,
    audio: waveAudio,
    index: 3,
    bgColor: "bg-[#82C8F9]", // Soft blue
  },
  {
    title: "Thunderstorm Sound",
    image: thunderstormImg,
    audio: thunderstormAudio,
    index: 1,
    bgColor: "bg-[#C8A7D6]", // Lighter purple
  },
  {
    title: "Forest Sound",
    image: forestImg,
    audio: forestAudio,
    index: 5,
    bgColor: "bg-[#A8D5BA]", // Calm green
  },
  {
    title: "Piano Sound",
    image: pianoImg,
    audio: pianoAudio,
    index: 4,
    bgColor: "bg-[#B3C7E6]", // Soft light blue
  },
  {
    title: "Fire Cracking Sound",
    image: fireCrackingImg,
    audio: fireCrackingAudio,
    index: 2,
    bgColor: "bg-[#F6B33D]", // Warm yellow-orange
  },
  {
    title: "Night Sound",
    image: nightImg,
    audio: nightAudio,
    index: 0,
    bgColor: "bg-[#A4B8D7]", // Lighter blue-gray
  },
];

const RelaxationPage = () => {
  const navigate = useNavigate();

  const handleSoundClick = (category) => {
    navigate("/sound", {
      state: {
        soundIndex: category.index,
      },
    });
  };

  return (
    <PageTransition>
      <div className="flex flex-col h-screen bg-[#FFFFFF]">
        {/* Scroll Area with padding to avoid NavBar overlap */}
        <ScrollArea className="flex-1 pb-24">
          <div className="container max-w-lg mx-auto px-4 pt-4">
            {/* Header with centered arrow and title */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => navigate("/home")}
                className="p-2 hover:bg-secondary rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>

              <div className="flex-1 flex justify-center">
                {/* Optional Logo can go here */}
                {/* <img src={logo2} alt="Logo" className="w-8 h-8 object-contain" /> */}
              </div>
            </div>

            {/* Title */}
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Let the world sleep, while you heal
              </h1>
            </div>

            {/* Sound Categories */}
            <div className="flex flex-col gap-4">
              {soundCategories.map((category) => (
                <div
                  key={category.title}
                  className={`relative rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity ${category.bgColor}`}
                  onClick={() => handleSoundClick(category)}
                >
                  <div className="flex items-center h-[140px] p-4 space-x-4">
                    {/* Image container */}
                    <div className="w-[120px] h-[120px] flex-shrink-0">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Text content */}
                    <div className="flex flex-col justify-center flex-1">
                      <span className="text-black font-semibold text-lg">
                        {category.title}
                      </span>
                      <span className="text-black text-sm opacity-90">
                        Relaxing {category.title.toLowerCase()} for meditation
                      </span>
                      <span className="text-black text-xs opacity-70 mt-1">
                        10 minutes
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>

        {/* NavBar */}
        <NavBar />
      </div>
    </PageTransition>
  );
};

export default RelaxationPage;
