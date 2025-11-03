// components/Manufactures.tsx
import React from 'react';
import Image from 'next/image';
import { Manufacture } from '../types';

interface ManufacturesProps {
  manufactures: Manufacture[];
}

export function Manufactures({ manufactures }: ManufacturesProps) {
  return (
    <section id="manufactures" className="section-manufactures">
      <div className="section-container">
        <h2 className="headline-1">Maisons Légendaires</h2>
        <div className="manufacture-grid">
          {manufactures.map((manufacture) => (
            <article key={manufacture.name} className="manufacture-card">
              <div className="manufacture-image">
                <Image
                  src={manufacture.image}
                  alt={manufacture.name}
                  width={300}
                  height={300}
                  loading="lazy"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="manufacture-content">
                <h3 className="headline-2">{manufacture.name}</h3>
                <div className="manufacture-meta">
                  <span className="caption">Fondée en {manufacture.founded}</span>
                  <span className="manufacture-specialty caption">
                    {manufacture.specialty}
                  </span>
                </div>
                <p className="body">{manufacture.description}</p>
                {manufacture.famous && (
                  <p className="manufacture-famous caption">
                    Modèles emblématiques : {manufacture.famous}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
