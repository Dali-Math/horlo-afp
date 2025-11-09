'use client';

import Image from 'next/image';
import { useState } from 'react';

interface RolexImageAutoProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

/**
 * Composant ultra-robuste pour images Rolex
 * - Corrige les URLs automatiquement
 * - Gère les erreurs 404
 * - Fallback vers image de secours
 * - Pas besoin de télécharger quoi que ce soit
 */
export const RolexImageAuto = ({ 
  src, 
  alt, 
  className = '', 
  width = 800, 
  height = 600 
}: RolexImageAutoProps) => {
  const [imgSrc, setImgSrc] = useState(src.trim());
  const [hasError, setHasError] = useState(false);

  // Nettoyage de l'URL (supprime espaces et vérification)
  const cleanUrl = imgSrc.replace(/\s+/g, '').replace(/\/$/, '');

  const handleError = () => {
    if (!hasError) {
      // Fallback vers une image Rolex générique de Wikimedia
      setImgSrc("https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Rolex_Submariner_Date_16610.jpg/800px-Rolex_Submariner_Date_16610.jpg");
      setHasError(true);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Image
        src={cleanUrl}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onError={handleError}
        loading="lazy"
        quality={90}
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPmxvYWRpbmcuLi48L3RleHQ+PC9zdmc+"
      />
      {hasError && (
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 flex items-center justify-center rounded-lg">
          <div className="text-center p-4">
            <div className="text-4xl mb-2">⌚</div>
            <p className="text-sm text-slate-500">Image non disponible</p>
          </div>
        </div>
      )}
    </div>
  );
};
