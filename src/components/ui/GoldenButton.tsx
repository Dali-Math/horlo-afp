"use client";
import { motion } from "framer-motion";
import type { ButtonHTMLAttributes } from "react";

type GoldenButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  href?: string;
};

const MotionButton = motion(ButtonBase);

function ButtonBase(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} />;
}

export default function GoldenButton({ label, href, ...props }: GoldenButtonProps) {
  const content = (
    <MotionButton
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={`relative overflow-hidden px-6 py-3 font-semibold text-[#E2B44F] border border-[#E2B44F]/40 rounded-md tracking-wide transition-all duration-300 bg-gradient-to-r from-[#1a1a1a] via-black to-[#1a1a1a] hover:shadow-[0_0_20px_rgba(226,180,79,0.4)] ${props.className || ""}`}
      {...props}
    >
      {/* Lueur dorée */}
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
