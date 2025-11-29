"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface ShuffleProps {
  text: string;
  shuffleDirection?: "left" | "right" | "top" | "bottom";
  duration?: number;
  animationMode?: "evenodd" | "sync" | "cascade";
  shuffleTimes?: number;
  ease?: string;
  stagger?: number;
  threshold?: number;
  triggerOnce?: boolean;
  triggerOnHover?: boolean;
  respectReducedMotion?: boolean;
  className?: string;
}

const Shuffle: React.FC<ShuffleProps> = ({
  text,
  duration = 0.35,
  shuffleTimes = 1,
  stagger = 0.03,
  className = "",
}) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / shuffleTimes;
    }, duration * 100);

    return () => clearInterval(interval);
  }, [text, duration, shuffleTimes]);

  return (
    <motion.div className={`font-mono font-bold tracking-tight ${className}`}>
      {displayText}
    </motion.div>
  );
};

export default Shuffle;
