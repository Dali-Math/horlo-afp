"use client";
import { motion, MotionProps } from "framer-motion";
import { ButtonHTMLAttributes } from "react";

interface GoldenButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    MotionProps {
  label: string;
  href?: string;
}

export default function GoldenButton({ label, href, ...props }: GoldenButtonProps) {
  const MotionButton = motion.button; // ✅ corrige les types Framer + HTML

  const content = (
    <MotionButton
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="relative overflow-hidden px-6 py-3 font-semibold text-[#E2B44F] border border-[#E2B44F]/40 rounded-md tracking-wide transition-all duration-300 bg-gradient-to-r from-[#1a1a1a] via-black to-[#1a1a1a] hover:shadow-[0_0_20px_rgba(226,180,79,0.4)]"
      {...props}
    >
      {/* Glow doré animé */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E2B44F]/30 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      />
      <span className="relative z-10">{label}</span>
    </MotionButton>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    content
  );
}
