"use client";

import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

interface StarRatingProps {
  maxStars?: number;
  value?: number;
  onChange?: (value: number) => void;
}

export default function StarRating({ maxStars = 5, value = 0, onChange }: StarRatingProps) {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(value);

  return (
    <div className="flex space-x-1">
      {Array.from({ length: maxStars }, (_, i) => i + 1).map((star) => {
        const filled = hover >= star || (!hover && rating >= star);

        return (
          <div
            key={star}
            onClick={() => {
              setRating(star);
              onChange?.(star);
            }}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
           
          >
            {filled ? (
              <FaStar className="w-6 h-6 text-yellow-400 transition-colors" />
            ) : (
              <FaRegStar className="w-6 h-6 text-gray-300 transition-colors" />
            )}
          </div>
        );
      })}
    </div>
  );
}
