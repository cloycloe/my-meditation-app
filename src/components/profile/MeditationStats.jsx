import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function MeditationStats({ meditationData = {} }) {
  // Convert meditationData object into an array for Recharts
  const weeklyData = Object.entries(meditationData).map(([day, data]) => ({
    day,
    time: data?.time || 0, // Default to 0 if time is not provided
  }));

  // Calculate the current streak
  const calculateCurrentStreak = (data) => {
    if (!data || data.length === 0) return 0;

    let streak = 0;
    for (const { time } of data) {
      if (time > 0) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  // Calculate the total meditation time for the week
  const calculateTotalTime = (data) => {
    return data.reduce((total, { time }) => total + time, 0);
  };

  const currentStreak = calculateCurrentStreak(weeklyData);
  const totalTime = calculateTotalTime(weeklyData);

  return (
    <div className="rounded-lg bg-white p-6 mb-6 shadow-md">
      <h3 className="text-xl font-semibold mb-4">Meditation Stats</h3>

      {/* Display current streak */}
      <p className="text-lg">
        <strong>Current Streak:</strong> {currentStreak} day(s)
      </p>

      {/* Display total weekly meditation time */}
      <p className="text-lg mt-2">
        <strong>Total Time This Week:</strong> {totalTime} minutes
      </p>

      {/* Bar Graph for Weekly Meditation */}
      <div className="mt-4">
        <h4 className="text-lg font-semibold">Weekly Meditation Overview</h4>
        {weeklyData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="time" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 mt-2">No data available for this week.</p>
        )}
      </div>
    </div>
  );
}
