'use client';

import { useEffect, useState } from 'react';
import { guideData } from '../data/guide-data';
import styles from '../../styles/guide.module.css';

export default function GuideContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Nettoyage IDR Solutions
    const cleanIDR = () => {
      document.querySelectorAll('*').forEach(el => {
        if (el.textContent?.includes('IDR SOLUTION') || 
            el.innerHTML?.includes('IDR SOLUTION')) {
          el.remove();
        }
      });
    };
    cleanIDR();

    // Restaurer dark mode
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedMode);
    if (savedMode) document.body.classList.add('dark-mode');
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term.length > 2) {
      document.querySelectorAll('.chapter p, .chapter li, .chapter td').forEach(el => {
        const text = el.textContent?.toLowerCase() || '';
        if (text.includes(term)) {
          el.innerHTML = el.textContent?.replace(
            new RegExp(`(${term})`, 'gi'),
            '<mark class="highlight">$1</mark>'
          ) || '';
        }
      });
    } else {
      document.querySelectorAll('.highlight').forEach(el => {
        el.outerHTML = el.innerHTML;
      });
    }
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', String(newMode));
  };

  return (
    <main className={styles.contentArea}>
      <header className={styles.contentHeader}>
        <button className={styles.focusBtn} onClick={() => document.body.classList.toggle('focus-mode')}>
          <i className="fas fa-compress"></i> Mode Focus
        </button>
        <h1>{guideData.title}</h1>
        <div className={styles.metaBar}>
          <div className={styles.metaItem}>
            <i className="fas fa-file-pdf"></i>
            <span>{guideData.meta.pages} pages</span>
          </div>
          <div className={styles.metaItem}>
            <i className="fas fa-clock"></i>
            <span>~{guideData.meta.readingTime}</span>
          </div>
          <div className={styles.metaItem}>
            <i className="fas fa-graduation-cap"></i>
            <span>{guideData.meta.level}</span>
          </div>
          <div className={styles.actionButtons}>
            <a href="/downloads/guide-materiaux.pdf" className={styles.btnPrimary} download>
              <i className="fas fa-download"></i> PDF
            </a>
            <button className={styles.btnSecondary} onClick={() => window.print()}>
              <i className="fas fa-print"></i> Imprimer
            </button>
          </div>
        </div>
      </header>

      <div className={styles.searchBar}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="🔍 Rechercher (ex: acier inoxydable, dureté Vickers)"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {guideData.chapters.map(chapter => (
        <article key={chapter.id} id={chapter.id} className={`${styles.chapter} chapter`}>
          <h2>{chapter.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
        </article>
      ))}
    </main>
  );
}
