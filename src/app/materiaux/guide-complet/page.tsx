// src/app/materiaux/guide-complet/page.tsx
'use client';

import { useState, useEffect } from 'react';
import styles from './guide.module.css';

// 📝 CONTENU COMPLET DANS 1 SEULE CONSTANTE
const GUIDE_CONTENT = `
<!-- SOMMAIRE -->
<div id="sommaire" class="chapter">
  <h2>📚 Sommaire Interactif</h2>
  <div class="info-card">
    <h4>🎯 Guide professionnel complet</h4>
    <p>42 pages sur les métaux et alliages en horlogerie suisse.</p>
  </div>
  <ul class="sommaire-liste">
    <li><a href="#generalites">📖 Généralités sur les métaux</a></li>
    <li><a href="#fer">🔩 Le fer et ses alliages</a></li>
    <li><a href="#acier">⚙️ Classification des aciers</a></li>
    <li><a href="#fonte">🏭 La fonte</a></li>
    <li><a href="#siderurgie">🔥 Sidérurgie - Du minerai à l'acier</a></li>
    <li><a href="#aluminium">✈️ Aluminium et alliages légers</a></li>
    <li><a href="#titane">🚀 Titane</a></li>
    <li><a href="#cuivre">🟤 Cuivre et laiton</a></li>
    <li><a href="#comparatif">📊 Comparatif & Applications horlogère</a></li>
  </ul>
</div>

<!-- GÉNÉRALITÉS -->
<div id="generalites" class="chapter">
  <h2>⚛️ Généralités sur les Métaux</h2>
  <p>Les métaux peuvent être classés en <strong>trois catégories principales</strong> :</p>
  
  <div class="table-container">
    <table class="materials-table">
      <thead>
        <tr>
          <th><i class="fas fa-magnet"></i> Métaux ferreux</th>
          <th><i class="fas fa-leaf"></i> Métaux non ferreux</th>
          <th><i class="fas fa-gem"></i> Métaux précieux</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Le fer (Fe)</td><td>Le cuivre (Cu)</td><td>L'or (Au)</td></tr>
        <tr><td>L'acier (Ac)</td><td>L'aluminium (Al)</td><td>L'argent (Ag)</td></tr>
        <tr><td>La fonte (Ft)</td><td>Le titane (Ti)</td><td>Le platine (Pt)</td></tr>
      </tbody>
    </table>
  </div>

  <div class="info-card">
    <h4>💡 Définition : Alliage métallique</h4>
    <p>Un alliage est un matériau composé de <strong>deux ou plusieurs éléments</strong>, dont au moins un métal. Les alliages améliorent les propriétés chimiques et mécaniques.</p>
  </div>

  <h3>➕ Exemples d'alliages courants :</h3>
  <ul class="alloys-list">
    <li><span class="formula">Fer + Carbone</span> → Acier et Fonte</li>
    <li><span class="formula">Cuivre + Zinc + Plomb</span> → Laiton horloger</li>
    <li><span class="formula">Cuivre + Étain</span> → Bronze</li>
    <li><span class="formula">Aluminium + Magnésium</span> → Alliage léger</li>
  </ul>
</div>

<!-- MÉTAUX FERREUX -->
<div id="fer" class="chapter">
  <h2>🔩 Métaux Ferreux</h2>
  
  <div class="info-card">
    <h4>Le fer (Fe)</h4>
    <p><strong>Masse volumique :</strong> 7.86 kg/dm³</p>
    <p><strong>Point de fusion :</strong> 1535°C</p>
  </div>

  <h3>⚙️ Propriétés du fer</h3>
  <ul>
    <li>Mou, ductile et malléable à l'état pur</li>
    <li>S'oxyde facilement → protection anticorrosion nécessaire</li>
    <li>Entièrement recyclable sans perte de qualité</li>
    <li>Bon conducteur thermique et électrique</li>
    <li>Magnétisable (ferromagnétique)</li>
  </ul>

  <div class="warning-card">
    <h4>⚠️ Note importante</h4>
    <p>Le fer pur n'est <strong>pas utilisé en horlogerie moderne</strong>. On utilise uniquement ses alliages (acier, fonte) pour leurs propriétés mécaniques supérieures.</p>
  </div>
</div>

<!-- ACIER -->
<div id="acier" class="chapter">
  <h2>⚙️ L'Acier - Alliage de référence</h2>
  
  <div class="info-card">
    <h4>Composition</h4>
    <p>Alliage de fer contenant entre <strong>0,02% et 2% de carbone</strong>.</p>
    <p>Plus la teneur en carbone est élevée, plus l'acier est dur.</p>
  </div>

  <h3>🗂️ Les deux grandes catégories</h3>
  <div class="table-container">
    <table class="materials-table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Caractéristiques</th>
          <th>Usage en horlogerie</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Aciers non-alliés</strong></td>
          <td>Seulement du carbone (≤2%)</td>
          <td>Composants standard, ressorts</td>
        </tr>
        <tr>
          <td><strong>Aciers alliés</strong></td>
          <td>+ Chrome, nickel, molybdène...</td>
          <td>Boîtiers, mouvements, vis</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<!-- LA FONTE -->
<div id="fonte" class="chapter">
  <h2>🏭 La Fonte</h2>
  
  <div class="info-card">
    <h4>Définition</h4>
    <p>Alliage de fer contenant <strong>plus de 2% de carbone</strong>.</p>
    <p>Obtenue directement du haut-fourneau.</p>
  </div>
</div>

<!-- SIDÉRURGIE -->
<div id="siderurgie" class="chapter">
  <h2>🔥 Sidérurgie - Du minerai à l'acier</h2>
  
  <h3>📊 Production mondiale d'acier (2024)</h3>
  <div class="chart-placeholder">
    <p>Graphique à insérer : Chine 55%, Inde 8%, etc.</p>
  </div>
</div>

<!-- ALUMINIUM -->
<div id="aluminium" class="chapter">
  <h2>✈️ Aluminium - Le métal léger</h2>
  
  <div class="info-card">
    <h4>Aluminium pur</h4>
    <p><strong>Masse volumique :</strong> 2.70 kg/dm³ (3x moins lourd que le fer)</p>
    <p><strong>Point de fusion :</strong> 660°C</p>
  </div>
</div>

<!-- TITANE -->
<div id="titane" class="chapter">
  <h2>🚀 Titane - Le métal d'exception</h2>
  
  <div class="info-card">
    <h4>Titane Grade 5 (Ti-6Al-4V)</h4>
    <p><strong>Masse volumique :</strong> 4.54 kg/dm³</p>
    <p><strong>Résistance :</strong> Supérieure à l'acier</p>
  </div>
  
  <h3>🎯 Applications en horlogerie</h3>
  <ul>
    <li><strong>Boîtiers sport haut de gamme</strong> : Rolex Yacht-Master, Omega Seamaster</li>
    <li><strong>Bracelets ultra-légers</strong> : 45% moins lourds qu'en acier</li>
    <li><strong>Composants aéronautiques</strong> : Montres limitées</li>
  </ul>
</div>

<!-- CUIVRE & LAITON -->
<div id="cuivre" class="chapter">
  <h2>🟤 Cuivre & Laiton - Les classiques</h2>
  
  <div class="info-card">
    <h4>Cuivre pur (Cu)</h4>
    <p><strong>Conductivité électrique :</strong> 2e meilleur après l'argent</p>
    <p><strong>Propriété unique :</strong> L'eau pure ne corrode pas le cuivre</p>
  </div>

  <h3>⚙️ Laiton horloger</h3>
  <div class="formula-box">
    <strong>Formule :</strong> Cuivre (58%) + Zinc (39%) + Plomb (3%) = <strong>Laiton</strong>
  </div>
  
  <div class="table-container">
    <table class="materials-table">
      <thead>
        <tr>
          <th>Composant horloger</th>
          <th>Matériau utilisé</th>
          <th>Pourquoi ?</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Platines, ponts</td>
          <td>Laiton</td>
          <td>Facile à usiner, bon marché</td>
        </tr>
        <tr>
          <td>Rouages</td>
          <td>Laiton</td>
          <td>Usinage précis, faible frottement</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<!-- COMPARATIF -->
<div id="comparatif" class="chapter">
  <h2>📊 Comparatif & Applications Horlogères</h2>
  
  <div class="table-container">
    <table class="materials-table">
      <thead>
        <tr>
          <th>Matériau</th>
          <th>Poids</th>
          <th>Dureté</th>
          <th>Corrosion</th>
          <th>Coût</th>
          <th>Usage principal</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Acier 316L</strong></td>
          <td>Lourd (7.9)</td>
          <td>Élevée</td>
          <td>Excellente</td>
          <td>€€</td>
          <td>Boîtiers, bracelets</td>
        </tr>
        <tr>
          <td><strong>Titane</strong></td>
          <td>Léger (4.5)</td>
          <td>Très élevée</td>
          <td>Parfaite</td>
          <td>€€€€</td>
          <td>Sport haut de gamme</td>
        </tr>
        <tr>
          <td><strong>Laiton</strong></td>
          <td>Lourd (8.5)</td>
          <td>Moyenne</td>
          <td>Bonne (traitée)</td>
          <td>€</td>
          <td>Mouvements internes</td>
        </tr>
        <tr>
          <td><strong>Aluminium</strong></td>
          <td>Très léger (2.7)</td>
          <td>Faible</td>
          <td>Moyenne</td>
          <td>€€</td>
          <td>Montres sport/quartz</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3>🎯 Tableau de décision pour les élèves</h3>
  <div class="decision-grid">
    <div class="decision-card">
      <h4>💰 Budget limité</h4>
      <p><strong>Solution :</strong> Laiton galvanisé</p>
      <p>Bonne finition, coût maîtrisé</p>
    </div>
    <div class="decision-card">
      <h4>🏃 Montre sport</h4>
      <p><strong>Solution :</strong> Titane ou aluminium</p>
      <p>Léger, résistant, confortable</p>
    </div>
    <div class="decision-card">
      <h4>💎 Haute horlogerie</h4>
      <p><strong>Solution :</strong> Acier 904L, or 18k</p>
      <p>Prestige, durabilité, valeur</p>
    </div>
  </div>
</div>
`;

// =========================================

export default function GuideCompletPage() {
  const [activeChapter, setActiveChapter] = useState('sommaire');
  const [progress, setProgress] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Nettoyage IDR Solutions (dernière couche de sécurité)
    document.querySelectorAll('*').forEach(el => {
      if (el.textContent?.includes('IDR SOLUTION') || el.innerHTML?.includes('IDR SOLUTION')) {
        el.remove();
      }
    });
    
    // Restaurer mode sombre
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedMode);
    if (savedMode) document.body.classList.add('dark-mode');

    // Suivi du scroll
    const handleScroll = () => {
      const chapters = document.querySelectorAll('.chapter');
      chapters.forEach(chapter => {
        const rect = chapter.getBoundingClientRect();
        if (rect.top <= 150) {
          setActiveChapter(chapter.id);
        }
      });
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calcul cercle progression
  const circumference = 2 * Math.PI * 28;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={styles.guideContainer}>
      {/* SIDEBAR */}
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
          {GUIDE_CONTENT.match(/<div id="([^"]+)" class="chapter">[\s\S]*?<h2>([^<]+)/g)?.map(chapter => {
            const id = chapter.match(/id="([^"]+)"/)?.[1];
            const title = chapter.match(/<h2>([^<]+)/)?.[1];
            return (
              <a
                key={id}
                href={`#${id}`}
                className={`${styles.navItem} ${activeChapter === id ? styles.active : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(id!)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>{title?.split(' ')[0]}</span>
                <span>{title?.replace(/^[^ ]+ /, '')}</span>
              </a>
            );
          })}
        </nav>
      </aside>

      {/* CONTENU */}
      <main className={styles.contentArea}>
        <header className={styles.contentHeader}>
          <div className={styles.focusBtn} onClick={() => document.body.classList.toggle('focus-mode')}>
            <i className="fas fa-compress"></i> Mode Focus
          </div>
          <h1>Guide Complet des Matériaux en Horlogerie</h1>
          <div className={styles.metaBar}>
            <span>📄 42 pages</span>
            <span>⏱️ 25 min</span>
            <span>🎓 Formation Pro</span>
            <a href="/downloads/Chapitre-2-Metaux-communs.pdf" className={styles.btnPrimary} download>
              📥 PDF Original
            </a>
          </div>
        </header>

        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="🔍 Rechercher..."
            className={styles.searchInput}
            onChange={(e) => {
              const term = e.target.value.toLowerCase();
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
              }
            }}
          />
        </div>

        {/* Rendu du contenu */}
        <div dangerouslySetInnerHTML={{ __html: GUIDE_CONTENT }} />
      </main>

      {/* BOUTONS UTILES */}
      <div className={styles.darkModeToggle} onClick={() => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', String(!isDarkMode));
      }}>
        <i className={isDarkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>
      </div>
    </div>
  );
}
