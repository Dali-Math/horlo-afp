"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

/**
 * SceneTransition Component
 * Smooth transitions between storytelling scenes
 * Gold/black animated overlays
 */

interface SceneTransitionProps {
  children: ReactNode;
  show: boolean;
  direction?: "fade" | "slide-up" | "slide-down" | "curtain";
  duration?: number;
}

export default function SceneTransition({
  children,
  show,
  direction = "fade",
  duration = 0.8,
}: SceneTransitionProps) {
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    "slide-up": {
      initial: { opacity: 0, y: 100 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -100 },
    },
    "slide-down": {
      initial: { opacity: 0, y: -100 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 100 },
    },
    curtain: {
      initial: { scaleY: 0, transformOrigin: "top" },
      animate: { scaleY: 1 },
      exit: { scaleY: 0, transformOrigin: "bottom" },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants[direction]}
          transition={{ duration, ease: "easeInOut" }}
          className="relative"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * GoldenCurtain Component
 * Premium curtain transition effect
 */

export function GoldenCurtain({ isOpen }: { isOpen: boolean }) {
  return (
    <AnimatePresence>
      {!isOpen && (
        <>
          {/* Left curtain */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="fixed top-0 left-0 w-1/2 h-screen bg-gradient-to-r from-black via-zinc-900 to-black border-r-4 border-yellow-400 z-50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 to-transparent" />
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(234, 179, 8, 0.1) 10px, rgba(234, 179, 8, 0.1) 11px)",
              }}
            />
          </motion.div>

          {/* Right curtain */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="fixed top-0 right-0 w-1/2 h-screen bg-gradient-to-l from-black via-zinc-900 to-black border-l-4 border-yellow-400 z-50"
          >
            <div className="absolute inset-0 bg-gradient-to-l from-yellow-600/10 to-transparent" />
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(234, 179, 8, 0.1) 10px, rgba(234, 179, 8, 0.1) 11px)",
              }}
            />
          </motion.div>

          {/* Center logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  scale: { duration: 2, repeat: Infinity },
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                }}
                className="w-32 h-32 rounded-full border-4 border-yellow-400 bg-black/80 backdrop-blur-sm flex items-center justify-center"
              >
                <span className="text-6xl">⌚</span>
              </motion.div>
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute inset-0 rounded-full border-4 border-yellow-400"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * PageTransition Component
 * Smooth page-level transitions
 */

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
