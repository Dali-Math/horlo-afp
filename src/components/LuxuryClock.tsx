"use client";
import { useEffect, useState } from "react";

export default function LuxuryClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = ((time.getHours() % 12) + time.getMinutes() / 60) * 30;
  const minutes = time.getMinutes() * 6 + time.getSeconds() / 10;
  const seconds = time.getSeconds() * 6;

  return (
    <div className="relative w-52 h-52 flex items-center justify-center">
      {/* Fond cadran clair */}
      <div className="absolute inset-0 rounded-full bg-gradient-radial from-[#f8f7f3] to-[#e6e4da] border-[3px] border-[#D4AF37] shadow-[inset_0_0_15px_rgba(0,0,0,0.25),0_0_30px_rgba(212,175,55,0.3)]" />

      {/* Index dorés */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-[3px] h-6 bg-[#D4AF37] rounded-full"
          style={{
            transform: `rotate(${i * 30}deg) translateY(-92px)`,
            transformOrigin: "center",
          }}
        />
      ))}

      {/* Aiguilles */}
      <div
        className="absolute w-[4px] h-14 bg-[#C6A64B] origin-bottom rounded-full"
        style={{
          transform: `rotate(${hours}deg)`,
          transition: "transform 0.5s ease-in-out",
        }}
      />
      <div
        className="absolute w-[3px] h-20 bg-[#E2B44F] origin-bottom rounded-full shadow-[0_0_10px_rgba(226,180,79,0.4)]"
        style={{
          transform: `rotate(${minutes}deg)`,
          transition: "transform 0.3s ease-in-out",
        }}
      />
      <div
        className="absolute w-[1.5px] h-24 bg-[#FFD966] origin-bottom"
        style={{
          transform: `rotate(${seconds}deg)`,
          transition: "transform 1s linear",
        }}
      />

      {/* Centre or */}
      <div className="absolute w-4 h-4 bg-[#D4AF37] rounded-full shadow-[0_0_12px_rgba(212,175,55,0.8)]" />

      {/* Verre effet saphir */}
      <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.3)] pointer-events-none" />
    </div>
  );
}
