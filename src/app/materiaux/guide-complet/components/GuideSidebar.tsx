'use client';

import { useState, useEffect } from 'react';
import { guideData } from '../data/guide-data';
import styles from '../../styles/guide.module.css';

export default function GuideSidebar() {
  const [activeChapter, setActiveChapter] = useState('sommaire');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const chapters = document.querySelectorAll('.chapter');
      chapters.forEach(chapter => {
        const rect = chapter.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveChapter(chapter.id);
        }
      });

      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const circumference = 2 * Math.PI * 28;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h2>📚 Guide Matériaux</h2>
        <div className={styles.progressRing}>
          <svg className={styles.progressCircle} width="60" height="60">
            <circle className={styles.progressBg} cx="30" cy="30" r="28"></circle>
            <circle className={styles.progressFill} cx="30" cy="30" r="28" 
                    style={{ strokeDashoffset: offset }}></circle>
          </svg>
          <div className={styles.progressText}>{Math.round(progress)}%</div>
        </div>
      </div>
      
      <nav className={styles.navMenu}>
        <div className={styles.chapterTitle}>Chapitres</div>
        {guideData.chapters.map(chapter => (
          <a
            key={chapter.id}
            href={`#${chapter.id}`}
            className={`${styles.navItem} ${activeChapter === chapter.id ? styles.active : ''}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(chapter.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <i className={chapter.icon}></i>
            <span>{chapter.title}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}
