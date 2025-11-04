// components/Timeline.tsx
import React from 'react';
import Image from 'next/image';
import { Period } from '../types';

interface TimelineProps {
  periods: Period[];
}

export function Timeline({ periods }: TimelineProps) {
  return (
    <section id="chronologie" className="section-timeline">
      <div className="section-container">
        <h2 className="headline-1">Chronologie Historique</h2>
        <div className="timeline-container">
          {periods.map((period, index) => (
            <article
              key={period.year}
              className={`timeline-card ${index % 2 === 1 ? 'reverse' : ''}`}
            >
              <div className="timeline-image">
                <Image
                  src={period.image}
                  alt={period.title}
                  width={600}
                  height={400}
                  loading="lazy"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="timeline-content">
                <h3 className="headline-2 timeline-title">{period.title}</h3>
                <p className="body timeline-description">{period.description}</p>
                {/* Le badge année est bien sous le texte */}
                <span className="timeline-date-badge">{period.year}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
