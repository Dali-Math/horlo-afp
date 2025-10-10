"use client";
import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) setIsVisible(true);
      else setIsVisible(false);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 20px #E2B44F",
            transition: { type: "spring", stiffness: 250 },
          }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          aria-label="Retour en haut"
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center 
          bg-[#E2B44F] text-black rounded-full shadow-lg
          hover:shadow-[0_0_18px_#E2B44F] hover:scale-105 
          transition-all duration-300
          w-10 h-10 sm:w-12 sm:h-12"
        >
          <ChevronUp className="w-6 h-6 sm:w-7 sm:h-7" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
