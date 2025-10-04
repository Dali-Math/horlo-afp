'use client';

import React from 'react';

interface ResourceCardProps {
  category: string;
  title: string;
  description: string;
  buttonText: string;
  buttonIcon: string;
  link?: string;
  onButtonClick?: () => void;
}

export default function ResourceCard({
  category,
  title,
  description,
  buttonText,
  buttonIcon,
  link,
  onButtonClick,
}: ResourceCardProps) {
  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else if (link) {
      window.open(link, '_blank');
    }
  };

  return (
    <div
      className="group relative bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl p-6 border border-zinc-800 hover:border-amber-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(217,119,6,0.3)] animate-fade-in"
      style={{
        animationDelay: '0.1s',
        animationFillMode: 'backwards',
      }}
    >
      {/* Gold glow effect on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-amber-500/0 to-amber-600/0 group-hover:from-amber-500/5 group-hover:to-amber-600/10 transition-all duration-500 pointer-events-none" />

      {/* Category badge */}
      <div className="relative mb-4">
        <span className="inline-block px-3 py-1 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full">
          {category}
        </span>
      </div>

      {/* Title */}
      <h3 className="relative text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors duration-300">
        {title}
      </h3>

      {/* Description */}
      <p className="relative text-zinc-400 mb-6 leading-relaxed">
        {description}
      </p>

      {/* Action button */}
      <button
        onClick={handleClick}
        className="relative w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-semibold rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(217,119,6,0.5)] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
      >
        <span>{buttonIcon}</span>
        <span>{buttonText}</span>
      </button>
    </div>
  );
}
