import React from 'react';

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div 
      className={`animate-pulse bg-neutral-200 dark:bg-neutral-800 rounded-sm ${className}`}
    />
  );
};

export default Skeleton;