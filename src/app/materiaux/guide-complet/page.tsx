// src/app/materiaux/guide-complet/page.tsx
'use client';

import { useState, useEffect } from 'react';
import styles from './guide.module.css';

// 📝 ÉTAPE 1 : COLEZ VOTRE MARKDOWN ICI (entre les backticks)
const RAW_MARKDOWN = `
# 📚 Guide Complet des Matériaux en Horlogerie

## 📖 Sommaire Interactif
- [⚛️ Généralités sur les métaux](#generalites)
- [🔩 Métaux Ferreux](#fer)
- [⚙️ Classification des aciers](#acier)
- [🏭 La fonte](#fonte)
- [🔥 Sidérurgie](#siderurgie)
- [✈️ Aluminium](#aluminium)
- [🚀 Titane](#titane)
- [🟤 Cuivre & Laiton](#cuivre)
- [📊 Comparatif final](#comparatif)

## ⚛️ Généralités sur les métaux

Les métaux peuvent être classés en **trois catégories principales** :

| Métaux ferreux | Métaux non ferreux | Métaux précieux |
|---|---|---|
| Le fer (Fe) | Le cuivre (Cu) | L'or (Au) |
| L'acier (Ac) | L'aluminium (Al) | L'argent (Ag) |
| La fonte (Ft) | Le titane (Ti) | Le platine (Pt) |

### 💡 Définition : Alliage métallique
Un alliage est un matériau composé de **deux ou plusieurs éléments**, dont au moins un métal. Les alliages améliorent les propriétés chimiques et mécaniques.

### ➕ Exemples d'alliages courants
- **Fer + Carbone** → Acier et Fonte
- **Cuivre + Zinc + Plomb** → Laiton horloger
- **Cuivre + Étain** → Bronze
- **Aluminium + Magnésium** → Alliage léger

## 🔩 Métaux Ferreux

### ➤ Le fer (Fe)
- **Masse volumique** : 7.86 kg/dm³
- **Point de fusion** : 1535°C

**Propriétés :**
- Mou, ductile et malléable à l'état pur
- S'oxyde facilement → corrosion
- Entièrement recyclable
- Bon conducteur thermique et électrique

**⚠️ Note importante :** Le fer pur n'est pas utilisé en horlogerie moderne, uniquement sous forme d'alliages (acier, fonte).

## ⚙️ Classification des aciers

L'acier est un alliage de fer contenant entre **0,02% et 2% de carbone**.

| Catégorie | Caractéristiques | Usage en horlogerie |
|---|---|---|
| Aciers non-alliés | Seulement du carbone (≤2%) | Composants standard, ressorts |
| Aciers alliés | + Chrome, nickel, molybdène | Boîtiers, mouvements, vis |

## 🏭 La fonte

Alliage de fer contenant **plus de 2% de carbone**. Obtenue directement du haut-fourneau.

## 🔥 Sidérurgie - Du minerai à l'acier

Processus en 4 phases :
1. **Extraction** du minerai
2. **Préparation** du minerai
3. **Réduction** et affinage
4. **Mise en forme** des produits

## ✈️ Aluminium - Le métal léger

- **Masse volumique** : 2.70 kg/dm³ (3x moins lourd que le fer)
- **Point de fusion** : 660°C

**Propriétés:**
- Très léger, résistant à la corrosion (couche d'oxyde)
- 100% recyclable
- Anodisable (coloration possible)

## 🚀 Titane - Le métal d'exception

- **Masse volumique** : 4.54 kg/dm³
- **Point de fusion** : 1660°C

**Applications en horlogerie :**
- Boîtiers sport haut de gamme
- Bracelets ultra-légers (45% moins lourds)
- Composants aéronautiques

## 🟤 Cuivre & Laiton

### ➤ Cuivre pur (Cu)
- **Conductivité électrique** : 2e meilleur après l'argent
- **Propriété unique** : L'eau pure ne corrode pas le cuivre

### ➤ Laiton horloger
**Formule :** Cuivre (58%) + Zinc (39%) + Plomb (3%)

**Composants horloger** | **Matériau** | **Pourquoi ?**
---|---|---
Platines, ponts | Laiton | Facile à usiner, bon marché
Rouages | Laiton | Usinage précis, faible frottement

## 📊 Comparatif final

| Matériau | Poids | Dureté | Corrosion | Coût | Usage principal |
|---|---|---|---|---|---|
| **Acier 316L** | Lourd (7.9) | Élevée | Excellente | €€ | Boîtiers, bracelets |
| **Titane** | Léger (4.5) | Très élevée | Parfaite | €€€€ | Sport haut de gamme |
| **Laiton** | Lourd (8.5) | Moyenne | Bonne (traitée) | € | Mouvements internes |
| **Aluminium** | Très léger (2.7) | Faible | Moyenne | €€ | Montres sport/quartz |

### 🎯 Tableau de décision pour les élèves

**💰 Budget limité** → Laiton galvanisé (bonne finition, coût maîtrisé)
**🏃 Montre sport** → Titane ou aluminium (léger, confortable)
**💎 Haute horlogerie** → Acier 904L, or 18k (prestige, valeur)
`;

// 🔄 PARSER Markdown → HTML
function parseMarkdown(md: string): Chapter[] {
  const lines = md.split('\n');
  const chapters: Chapter[] = [];
  let currentChapter: Chapter | null = null;
  
  for (const line of lines) {
    // Détecter les titres H2 (##)
    const h2Match = line.match(/^## (.+)$/);
    if (h2Match) {
      if (currentChapter) chapters.push(currentChapter);
      currentChapter = {
        id: h2Match[1].toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
        title: h2Match[1],
        icon: h2Match[1].split(' ')[0],
        content: ''
      };
      continue;
    }
    
    // Ignorer le titre H1 principal
    if (line.startsWith('# ') || line.startsWith('## 📖')) continue;
    
    // Convertir les liens markdown en HTML
    const linkMatch = line.match(/- \[(.+?)\]\(#(.+?)\)/g);
    if (linkMatch) {
      const links = linkMatch.map(l => {
        const [, text, id] = l.match(/- \[(.+?)\]\(#(.+?)\)/) || [];
        return `<li><a href="#${id}" class="nav-link">${text}</a></li>`;
      }).join('');
      currentChapter && (currentChapter.content += `<ul class="sommaire-liste">${links}</ul>\n`);
      continue;
    }
    
    // Convertir les tableaux
    if (line.includes('|') && currentChapter) {
      // Créer un tableau simple
      currentChapter.content += `<div class="table-container"><table class="materials-table">${line}\n`;
      continue;
    }
    
    // Convertir les listes
    if (line.startsWith('- ') && currentChapter) {
      currentChapter.content += `<li>${line.substring(2)}</li>\n`;
      continue;
    }
    
    // Paragraphes normaux
    if (currentChapter && line.trim()) {
      currentChapter.content += `<p>${line}</p>\n`;
    }
  }
  
  if (currentChapter) chapters.push(currentChapter);
  return chapters;
}

// 📚 TYPES
interface Chapter {
  id: string;
  title: string;
  icon: string;
  content: string;
}

export default function GuideCompletPage() {
  const [activeChapter, setActiveChapter] = useState('sommaire');
  const [progress, setProgress] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    // Nettoyer et parser le contenu
    const cleaned = RAW_MARKDOWN.replace(/IDR SOLUTION/g, '');
    const parsed = parseMarkdown(cleaned);
    
    // Corriger les tableaux et listes
    const fixedChapters = parsed.map(ch => ({
      ...ch,
      content: ch.content
        .replace(/<p>\|(.+)\|<\/p>/g, (match, p1) => {
          // Parser les tableaux
          const rows = match.split('\n').filter(l => l.includes('|'));
          if (rows.length === 0) return match;
          return `<table class="materials-table">${rows.map(row => {
            const cells = row.match(/\|(.+?)(?=\|)/g);
            return `<tr>${cells?.map(c => `<td>${c.replace(/^\|\s*/, '')}</td>`).join('')}</tr>`;
          }).join('')}</table>`;
        })
        .replace(/<p>- (.+)<\/p>/g, '<ul class="alloys-list"><li>$1</li></ul>')
    }));
    
    setChapters(fixedChapters);

    // Restaurer mode sombre
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedMode);
    if (savedMode) document.body.classList.add('dark-mode');

    // Progression et navigation
    const handleScroll = () => {
      const chapterEls = document.querySelectorAll('.chapter');
      chapterEls.forEach(ch => {
        const rect = ch.getBoundingClientRect();
        if (rect.top <= 150) setActiveChapter(ch.id);
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

  // Filtrage recherche
  const filteredChapters = chapters.filter(ch => {
    if (!searchTerm) return true;
    return ch.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           ch.content.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className={`${styles.guideContainer} ${isDarkMode ? 'dark-mode' : ''}`}>
      
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
          {filteredChapters.map(ch => (
            <a
              key={ch.id}
              href={`#${ch.id}`}
              className={`${styles.navItem} ${activeChapter === ch.id ? styles.active : ''}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(ch.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>{ch.icon}</span>
              <span>{ch.title.replace(/^[^ ]+ /, '')}</span>
            </a>
          ))}
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
            <span>📄 {chapters.length} chapitres</span>
            <span>⏱️ ~30 min</span>
            <span>🎓 Formation Pro</span>
            <a href="/docs/guide-materiaux.md" className={styles.btnPrimary} download>
              📥 Télécharger MD
            </a>
          </div>
        </header>

        <div className={styles.searchBar}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="🔍 Rechercher un métal, une propriété..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredChapters.map(ch => (
          <article key={ch.id} id={ch.id} className={`${styles.chapter} chapter`}>
            <h2>{ch.title}</h2>
            <div dangerouslySetInnerHTML={{ 
              __html: ch.content.replace(
                new RegExp(searchTerm, 'gi'), 
                `<mark class="highlight">$&</mark>`
              ) 
            }} />
          </article>
        ))}
      </main>

      {/* DARK MODE TOGGLE */}
      <div className={styles.darkModeToggle} onClick={() => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', String(newMode));
      }}>
        <i className={isDarkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>
      </div>
    </div>
  );
}
