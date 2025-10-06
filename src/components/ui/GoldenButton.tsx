"use client";
import { motion } from "framer-motion";
import type { ButtonHTMLAttributes } from "react";

interface GoldenButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  href?: string;
}

export default function GoldenButton({ label, href, ...props }: GoldenButtonProps) {
  // on évite les conflits en typant explicitement notre élément
  const MotionButton = motion.create<HTMLButtonElement>("button");

  const content = (
    <MotionButton
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      {...props}
      className={`relative overflow-hidden px-6 py-3 font-semibold text-[#E2B44F] border border-[#E2B44F]/40 rounded-md tracking-wide transition-all duration-300 bg-gradient-to-r from-[#1a1a1a] via-black to-[#1a1a1a] hover:shadow-[0_0_20px_rgba(226,180,79,0.4)] ${props.className || ""}`}
    >
      {/* effet de lueur dorée */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E2B44F]/25 to-transparent"
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
