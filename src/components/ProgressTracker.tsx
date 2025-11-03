import React from 'react';
import { motion } from 'framer-motion';

interface ProgressTrackerProps {
  progress: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ progress }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-20 left-6 z-40"
    >
      <div className="bg-black/20 backdrop-blur-lg rounded-xl p-4 border border-white/10">
        <div className="text-white/80 text-sm mb-2">Progrès d'apprentissage</div>
        <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <div className="text-white/60 text-xs mt-1">{progress}% complété</div>
      </div>
    </motion.div>
  );
};

export default ProgressTracker;
