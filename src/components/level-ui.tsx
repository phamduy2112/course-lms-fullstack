import React from "react";

interface Props {
  level: "Beginner" | "Intermediate" | "Advanced";
}

const LevelUI: React.FC<any> = ({ level }) => {
  // Map level → màu Tailwind
  const levelClasses: Record<string, string> = {
    Beginner: "bg-green-100 text-green-600",
    Intermediate: "bg-yellow-100 text-yellow-600",
    Advanced: "bg-red-100 text-red-600",
  };

  return (
    <div
      className={`mt-2 inline-block text-xs font-semibold px-2 py-1 rounded ${
        levelClasses[level]
      }`}
    >
      {level}
    </div>
  );
};

export default LevelUI;
