"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SkeletonClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds() * 6;
  const minutes = time.getMinutes() * 6 + seconds / 60;
  const hours = ((time.getHours() % 12) + time.getMinutes() / 60) * 30;

  return (
    <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
      {/* Fond transparent */}
      <div className="absolute inset-0 rounded-full border-4 border-[#E2B44F]/60 backdrop-blur-sm shadow-[0_0_30px_rgba(226,180,79,0.3)]" />

      {/* Engrenages */}
      <motion.div
        className="absolute w-10 h-10 border-[3px] border-[#E2B44F]/70 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        style={{ top: "20%", left: "25%" }}
      />
      <motion.div
        className="absolute w-6 h-6 border-[2px] border-[#E2B44F]/70 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        style={{ top: "60%", left: "65%" }}
      />

      {/* Aiguilles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="absolute w-[4px] h-14 bg-[#E2B44F] origin-bottom rounded-full"
          style={{ transform: `rotate(${hours}deg)` }}
        />
        <div
          className="absolute w-[3px] h-20 bg-[#E2B44F] origin-bottom rounded-full"
          style={{ transform: `rotate(${minutes}deg)` }}
        />
        <div
          className="absolute w-[2px] h-24 bg-[#FFD966] origin-bottom rounded-full"
          style={{ transform: `rotate(${seconds}deg)` }}
        />
        <div className="w-3 h-3 bg-[#E2B44F] rounded-full absolute shadow-[0_0_10px_rgba(226,180,79,0.8)]" />
      </div>
    </div>
  );
}
