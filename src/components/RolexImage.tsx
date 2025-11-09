// components/RolexImage.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';

interface RolexImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fallback?: boolean;
}

export const RolexImage = ({ src, alt, className = '', width = 800, height = 600, fallback = true }: RolexImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (fallback && !hasError) {
      // Fallback vers Wikimedia Commons avec taille standard
      const fallbackUrl = imgSrc.replace(/\/\d+px-.*$/, `/800px-Rolex_Submariner_Date_16610.jpg`);
      setImgSrc(fallbackUrl);
      setHasError(true);
    }
  };

  // Correction automatique des espaces
  const correctedSrc = imgSrc.trim().replace(/\s+/g, '');

  return (
    <div className={`relative ${className}`}>
      <Image
        src={correctedSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onError={handleError}
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,..."
        loading="lazy"
        quality={85}
      />
      {hasError && (
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">⌚</div>
            <p className="text-sm text-slate-500">Image non disponible</p>
          </div>
        </div>
      )}
    </div>
  );
};
