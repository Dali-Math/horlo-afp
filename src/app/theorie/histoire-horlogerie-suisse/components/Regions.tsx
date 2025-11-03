// components/Regions.tsx
import React from 'react';
import Image from 'next/image';
import { Region } from '../types';

interface RegionsProps {
  regions: Region[];
}

export function Regions({ regions }: RegionsProps) {
  return (
    <section id="geographie" className="section-geography">
      <div className="section-container">
        <h2 className="headline-1">Géographie Horlogère</h2>
        <div className="region-grid">
          {regions.map((region) => (
            <article key={region.name} className="region-card">
              <div className="region-card-image">
                <Image
                  src={region.image}
                  alt={region.name}
                  width={400}
                  height={240}
                  loading="lazy"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="region-card-content">
                <h3 className="headline-2">{region.name}</h3>
                {region.specialty && (
                  <span className="region-specialty caption">{region.specialty}</span>
                )}
                <p className="body">{region.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
