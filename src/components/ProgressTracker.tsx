import React from 'react';
import { motion } from 'framer-motion';

interface ProgressTrackerProps {
  progress: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ progress }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-[122px] left-4 sm:left-6 z-40"
    >
      <div
        className="backdrop-blur-md border px-2.5 py-2"
        style={{
          background: 'color-mix(in srgb, var(--hl-surface-strong) 88%, transparent)',
          borderColor: 'var(--hl-line)',
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-24 h-[3px] overflow-hidden"
            style={{ background: 'var(--hl-line)' }}
          >
            <motion.div
              className="h-full"
              style={{ background: 'var(--hl-metal)' }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <div
            className="text-[10px] leading-none whitespace-nowrap"
            style={{ color: 'var(--hl-muted)' }}
          >
            {progress}%
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressTracker;
