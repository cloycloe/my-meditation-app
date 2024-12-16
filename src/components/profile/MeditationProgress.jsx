import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MeditationProgress({ meditationData }) {
  const [selectedDay, setSelectedDay] = useState(null);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handleDayClick = (day) => {
    setSelectedDay(selectedDay === day ? null : day);
  };

  return (
    <div className="rounded-lg bg-white p-6 mb-6 shadow-md">
      <h3 className="text-xl font-semibold text-black mb-4">
        Meditation Progress (This Week)
      </h3>

      {/* Days of the week */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <motion.div
            key={index}
            onClick={() => handleDayClick(day)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center justify-center text-center py-2 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedDay === day
                ? "bg-[#75A586] text-white shadow-lg"
                : "bg-gray-200 text-black hover:bg-gray-300 hover:shadow-md"
            }`}
          >
            {day}
          </motion.div>
        ))}
      </div>

      {/* Expanded Details for Selected Day */}
      <AnimatePresence mode="wait">
        {selectedDay && (
          <motion.div
            key={selectedDay} // Ensures the animation is tied to the selected day
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut", // Smooth transition
            }}
            className="overflow-hidden"
          >
            <motion.div
              className="mt-4 p-4 bg-[#E8F1EE] rounded-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h4 className="font-medium text-black mb-2">
                {selectedDay}'s Progress
              </h4>
              <div className="space-y-2">
                {/* Display Meditation Time */}
                <p className="text-sm text-black/70">
                  Meditation Time: {meditationData[selectedDay]?.time || 0}{" "}
                  minutes
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
