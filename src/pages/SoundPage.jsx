import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import nightAudio from "@/assets/NightSound1.mp3";
import thunderstormAudio from "@/assets/ThunderStormSound1.mp3";
import fireCracklingAudio from "@/assets/FireCrackingSound1.mp3";
import wavesAudio from "@/assets/WaveSound1.mp3";
import pianoAudio from "@/assets/PianoSound1.mp3";
import forestAudio from "@/assets/ForestSound1.mp3";
import nightImage from "@/assets/NightSound.jpg";
import thunderstormImage from "@/assets/ThunderStormSound.jpg";
import fireCracklingImage from "@/assets/FireCrackingSound.jpg";
import wavesImage from "@/assets/WaveSound.jpg";
import pianoImage from "@/assets/PianoMelodySound.jpg";
import forestImage from "@/assets/ForestSound.jpg";
import PageTransition from "@/components/common/PageTransition";

const sounds = [
  { audio: nightAudio, image: nightImage, title: "Night Ambience" },
  { audio: thunderstormAudio, image: thunderstormImage, title: "Thunderstorm" },
  { audio: fireCracklingAudio, image: fireCracklingImage, title: "Campfire" },
  { audio: wavesAudio, image: wavesImage, title: "Ocean Waves" },
  { audio: pianoAudio, image: pianoImage, title: "Soft Piano" },
  { audio: forestAudio, image: forestImage, title: "Forest Sounds" },
];

const SoundPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const initialIndex = location.state?.soundIndex || 0;
  const [currentSoundIndex, setCurrentSoundIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);

  const currentSound = sounds[currentSoundIndex];

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNextSound = () => {
    const nextIndex = (currentSoundIndex + 1) % sounds.length;
    handleSoundChange(nextIndex);
  };

  const handlePreviousSound = () => {
    const prevIndex = (currentSoundIndex - 1 + sounds.length) % sounds.length;
    handleSoundChange(prevIndex);
  };

  const handleSoundChange = (index) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setCurrentSoundIndex(index);
    setIsPlaying(false);
    setAudioProgress(0);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setAudioProgress(progress);
    }
  };

  const handleVolumeChange = (e) => {
    const volumeValue = parseFloat(e.target.value);
    setVolume(volumeValue);
    if (audioRef.current) {
      audioRef.current.volume = volumeValue;
    }
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    audioElement.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <PageTransition>
      <div className="h-screen bg-gradient-to-b from-[#f5f7fa] to-[#e9ecef] flex flex-col">
        {/* Navigation */}
        <div className="px-6 pt-8 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </button>
          <h2 className="text-xl font-semibold text-gray-800">
            Meditation Sounds
          </h2>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Sound Visualization */}
        <div className="flex-grow flex flex-col items-center justify-center px-6 space-y-6">
          {/* Album Art */}
          <div className="w-64 h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            <img
              src={currentSound.image}
              alt={currentSound.title}
              className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
            />
          </div>

          {/* Sound Details */}
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-gray-800">
              {currentSound.title}
            </h3>
            <div className="w-full h-1.5 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${audioProgress}%` }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-8">
            <button
              onClick={handlePreviousSound}
              className="text-gray-600 hover:text-gray-900 transition"
            >
              <SkipBack className="h-6 w-6" />
            </button>

            <button
              onClick={handlePlayPause}
              className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition transform active:scale-95"
            >
              {isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8" />
              )}
            </button>

            <button
              onClick={handleNextSound}
              className="text-gray-600 hover:text-gray-900 transition"
            >
              <SkipForward className="h-6 w-6" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-4 w-full max-w-xs">
            <Volume2 className="text-gray-600" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="flex-grow h-1 appearance-none bg-gray-300 rounded-full
                [&::-webkit-slider-thumb]:appearance-none 
                [&::-webkit-slider-thumb]:w-4 
                [&::-webkit-slider-thumb]:h-4 
                [&::-webkit-slider-thumb]:bg-blue-500 
                [&::-webkit-slider-thumb]:rounded-full"
            />
          </div>
        </div>

        <audio ref={audioRef} src={currentSound.audio} loop />
      </div>
    </PageTransition>
  );
};

export default SoundPage;
