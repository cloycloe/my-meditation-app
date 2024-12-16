import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import timerSound from '@/assets/TimerNatureSound.mp3';
import { ArrowLeft } from "lucide-react";

const MindfullChallengesPage = () => {
  // State to track the timer, breathing phases, and circle size
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [currentPhase, setCurrentPhase] = useState("inhale"); // inhale, hold, or exhale
  const [circleSize, setCircleSize] = useState(0);
  const audioRef = useRef(null);

  // Timer durations for the 4-7-8 method
  const totalDuration = 300; // 5 minutes = 300 seconds
  const breathingInDuration = 4; // 4 seconds for inhale
  const holdingDuration = 7; // 7 seconds for hold
  const breathingOutDuration = 8; // 8 seconds for exhale

  // Modified breathing cycle calculations
  const cycleDuration = breathingInDuration + holdingDuration + breathingOutDuration;
  const cycleTimeRef = useRef(0);

  // Modified handlePlayPause
  const handlePlayPause = () => {
    if (isTimerRunning) {
      setIsTimerRunning(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    } else {
      setIsTimerRunning(true);
      setSecondsLeft(totalDuration);
      cycleTimeRef.current = 0;
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.log('Audio playback failed:', e));
      }
    }
  };

  // Modified breathing phase effect
  useEffect(() => {
    let timer;
    if (isTimerRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
        cycleTimeRef.current = (cycleTimeRef.current + 1) % cycleDuration;
        
        // Update breathing phase and circle size
        if (cycleTimeRef.current < breathingInDuration) {
          setCurrentPhase("inhale");
          setCircleSize((cycleTimeRef.current / breathingInDuration) * 100);
        } else if (cycleTimeRef.current < breathingInDuration + holdingDuration) {
          setCurrentPhase("hold");
          setCircleSize(100);
        } else {
          setCurrentPhase("exhale");
          const exhaleProgress = (cycleTimeRef.current - breathingInDuration - holdingDuration) / breathingOutDuration;
          setCircleSize(100 - (exhaleProgress * 100));
        }
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsTimerRunning(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, secondsLeft]);

  // Helper function to get the current instruction text
  const getInstructionText = () => {
    switch (currentPhase) {
      case "inhale":
        return "Breathe In";
      case "hold":
        return "Hold";
      case "exhale":
        return "Breathe Out";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white backdrop-blur-md px-4 sm:px-6">
      {/* Header Section */}
      <div className="p-4 flex items-center relative">
        <button
          onClick={() => window.history.back()}
          className="text-black absolute top-6 left-6 sm:left-8 transform -translate-x-1/2"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center pb-20">
        {/* Breathing Circles Container */}
        <div className="relative w-full max-w-[260px] sm:max-w-[320px] aspect-square mt-4 sm:mt-6">
          {/* Outer animated circle */}
          <div
            className={`absolute 
              left-1/2 
              top-1/2 
              -translate-x-1/2 
              -translate-y-1/2
              bg-[#a2d0b3] 
              rounded-full 
              transition-all 
              duration-1000 
              ease-in-out
              ${!isTimerRunning && 'scale-75'}`}
            style={{
              width: `${circleSize}%`,
              height: `${circleSize}%`,
              opacity: '0.6'
            }}
          />

          {/* Inner static circle with timer */}
          <div
            className="absolute 
              left-1/2 
              top-1/2 
              -translate-x-1/2 
              -translate-y-1/2
              bg-white 
              rounded-full 
              w-[120px]
              h-[120px]
              z-10
              flex
              items-center
              justify-center"
          >
            <span className="text-black text-3xl transition-opacity duration-1000">
              {Math.floor(secondsLeft / 60)}:{(secondsLeft % 60).toString().padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Breathing Instruction Below Circle */}
        <div className="text-center text-black text-lg mt-4 sm:mt-6">
          {isTimerRunning && (
            <>
              {currentPhase === "inhale" && "Inhale"}
              {currentPhase === "hold" && "Hold"}
              {currentPhase === "exhale" && "Exhale"}
            </>
          )}
        </div>

        {/* Start Button */}
        <div className="w-full flex justify-center mt-8 sm:mt-10">
          <button
            onClick={handlePlayPause}
            className="bg-[#9bc4a9] hover:bg-[#8abf9e] text-black w-[317px] h-[56px] rounded-md flex items-center justify-center gap-2"
            aria-label={isTimerRunning ? "Stop the timer" : "Start the timer"}
          >
            {isTimerRunning ? "Stop" : "Start"}
          </button>
        </div>

        {/* Keep the audio element */}
        <audio 
          ref={audioRef} 
          loop 
          preload="auto"
          src={timerSound}
        />
      </div>
    </div>
  );
};

export default MindfullChallengesPage;
