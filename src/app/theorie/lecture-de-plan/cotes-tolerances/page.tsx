import React from 'react';

// --- Icônes SVG (auto-contenues, pas de dépendances) ---
const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

const XCircleIcon = ({ className = '' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
  </svg>
);

const CheckCircleIcon = ({ className = '' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
  </svg>
);


// --- Composant principal de la page ---
const TolerancesPage: React.FC = () => {
  // Les données sont définies ici pour plus de clarté
  const erreurs = [
    "Oublier d’indiquer la tolérance",
    "Tolérance trop serrée (blocage/usinage coûteux)",
    "Tolérance trop large (jeu excessif, perte de précision)",
    "Mauvaise lecture de cote maxi/mini",
    "Confondre diamètre et dimension linéaire",
    "Négliger les tolérances géométriques (ISO 1101)",
    "Mélanger unités (mm, µm)",
  ];

  const bonnes = [
    "Préciser une tolérance adaptée à la fonction réelle",
    "Utiliser la cotation ISO appropriée (symboles, orientations)",
    "Relire sa cotation avec le plan d’ensemble ou coupe",
    "Consulter les opérateurs d’usinage pour valider la faisabilité",
    "Faire relire/valider son plan avant la fabrication",
    "Conserver la cohérence d’échelle et d’unités",
    "Se référer aux normes ISO 129-1 et ISO 1101 à chaque plan",
  ];

  return (
    <>
      <style>{`
        /* --- Import de Polices --- */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Roboto+Slab:wght@700&display=swap');

        /* --- Variables de Design --- */
        :root {
          --color-primary: #005a9c; /* Bleu technique */
          --color-dark: #2c3e50; /* Gris foncé pour le texte */
          --color-light-gray: #f8f9fa; /* Fond de la page */
          --color-border: #e9ecef;
          --color-white: #ffffff;
          --color-error: #c0392b; /* Rouge sobre */
          --color-success: #27ae60; /* Vert sobre */
          --shadow-sm: 0 2px 4px rgba(0,0,0,0.05);
          --shadow-md: 0 4px 8px rgba(0,0,0,0.07);
          --border-radius: 8px;
        }

        /* --- Styles Globaux --- */
        body {
          background-color: var(--color-light-gray);
          font-family: 'Inter', sans-serif;
          color: var(--color-dark);
          line-height: 1.7;
          margin: 0;
        }
        
        /* --- Conteneur Principal --- */
        .tech-page-container {
          max-width: 900px;
          margin: 2rem auto;
          padding: 0 1rem;
        }

        /* --- En-tête --- */
        .tech-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background-color: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--border-radius);
          font-weight: 600;
          color: var(--color-primary);
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .back-button:hover {
          background-color: var(--color-primary);
          color: var(--color-white);
          box-shadow: var(--shadow-sm);
        }
        
        .page-title {
          font-family: 'Roboto Slab', serif;
          font-size: 2.5rem;
          color: var(--color-dark);
          margin: 0;
          text-align: right;
        }

        /* --- Carte de Contenu --- */
        .content-card {
          background-color: var(--color-white);
          border-radius: var(--border-radius);
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--color-border);
        }

        .content-card h2 {
          font-family: 'Roboto Slab', serif;
          font-size: 1.8rem;
          color: var(--color-primary);
          margin-top: 0;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid var(--color-primary);
        }
        
        .content-card h3 {
          font-family: 'Roboto Slab', serif;
          font-size: 1.4rem;
          color: var(--color-dark);
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .content-card p, .content-card li {
          font-size: 1rem;
          color: #34495e;
        }

        .content-card ul:not(.practices-list) {
          padding-left: 20px;
          list-style: none;
        }

        .content-card ul:not(.practices-list) li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.5rem;
        }
        
        .content-card ul:not(.practices-list) li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: var(--color-primary);
          font-weight: bold;
          font-size: 1.2rem;
        }
        
        .content-card strong {
          color: var(--color-dark);
        }

        /* --- Image et Figure --- */
        .image-wrapper {
          margin: 2rem 0;
          text-align: center;
        }
        
        .image-wrapper img {
          max-width: 100%;
          height: auto;
          border-radius: var(--border-radius);
          border: 1px solid var(--color-border);
          background-color: #fdfdfd;
        }
        
        .image-wrapper figcaption {
          margin-top: 0.75rem;
          font-style: italic;
          color: #7f8c8d;
          font-size: 0.9rem;
        }

        /* --- Tableau Stylisé --- */
        .styled-table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          font-size: 0.95rem;
        }

        .styled-table th, .styled-table td {
          padding: 0.8rem 1rem;
          border: 1px solid var(--color-border);
          text-align: left;
        }

        .styled-table thead {
          background-color: var(--color-dark);
          color: var(--color-white);
        }
        
        .styled-table thead th {
            font-weight: 600;
        }

        .styled-table tbody tr:nth-child(even) {
          background-color: var(--color-light-gray);
        }

        .styled-table tbody tr:hover {
          background-color: #e0eaf2;
        }
        
        /* --- Styles: Fiche Erreurs & Bonnes Pratiques --- */
        .practices-grid {
            display: flex;
            gap: 2rem;
            flex-wrap: wrap;
        }
        .practices-column {
            flex: 1;
            min-width: 300px;
        }
        .practices-title {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-family: 'Roboto Slab', serif;
            font-size: 1.4rem;
            margin: 0 0 1rem 0;
            padding: 0;
            border: none;
        }
        .practices-title.error { color: var(--color-error); }
        .practices-title.success { color: var(--color-success); }
        
        .practices-icon {
            width: 1.5rem;
            height: 1.5rem;
        }
        
        .practices-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        .practices-list li {
            display: flex;
            align-items: flex-start;
            gap: 0.5rem;
            font-size: 0.95rem;
        }
        
        .practices-list-icon {
            flex-shrink: 0;
            width: 1.2rem;
            height: 1.2rem;
            margin-top: 0.15rem;
        }
        .practices-list-icon.error { color: var(--color-error); }
        .practices-list-icon.success { color: var(--color-success); }


        /* --- Responsive --- */
        @media (max-width: 768px) {
          .tech-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .page-title {
            font-size: 2rem;
            text-align: left;
          }
          .content-card {
            padding: 1.5rem;
          }
        }
      `}</style>

      <div className="tech-page-container">
        <header className="tech-header">
          <a href="/theorie/lecture-de-plan" className="back-button">
            <ArrowLeftIcon />
            Retour à la théorie
          </a>
          <h1 className="page-title">Cotes et Tolérances</h1>
        </header>

        <main>
          {/* ... autres sections ... */}
          <section className="content-card">
            <h2>Définitions</h2>
            <ul>
              <li><strong>Cote :</strong> Valeur numérique exprimée dans une unité de mesure et indiquée sur un dessin technique.</li>
              <li><strong>Cotation :</strong> Ensemble des spécifications (lignes, symboles, notes) qui définissent les dimensions et la géométrie d'une pièce.</li>
              <li><strong>Tolérance :</strong> Écart admissible entre la dimension spécifiée (nominale) et la dimension réelle de la pièce finie. Elle garantit l'interchangeabilité et la fonctionnalité.</li>
            </ul>
          </section>

          <section className="content-card">
            <h2>Éléments de cotation</h2>
            <p>Une cotation complète inclut plusieurs éléments graphiques essentiels :</p>
            <ul>
              <li><strong>Ligne de cote :</strong> Ligne fine et continue, parallèle à la dimension cotée, se terminant par des flèches.</li>
              <li><strong>Ligne d'attache (ou de rappel) :</strong> Ligne fine prolongeant les arêtes de l'objet pour délimiter la ligne de cote.</li>
              <li><strong>Valeur de la cote :</strong> Le nombre indiquant la dimension.</li>
              <li><strong>Flèches :</strong> Indiquent les extrémités de la ligne de cote.</li>
            </ul>
            <figure className="image-wrapper">
              <img src="https://horlo-afp-git-test-lecture-de-plan-dali-maths-projects.vercel.app/images/cotes-tolerances/cotes.png" alt="Schéma des éléments de cotation" />
              <figcaption>Illustration des différents composants d'une cote.</figcaption>
            </figure>
          </section>

          <section className="content-card">
            <h2>Tolérances dimensionnelles</h2>
            {/* ... contenu ... */}
          </section>

          <section className="content-card">
            <h2>Tolérances géométriques</h2>
            {/* ... contenu ... */}
          </section>

          {/* ==================================================================== */}
          {/* --- DÉBUT DE LA FICHE ERREURS & BONNES PRATIQUES (INTÉGRÉE ICI) --- */}
          {/* ==================================================================== */}
          <section className="content-card">
            <h2>Erreurs Fréquentes & Bonnes Pratiques</h2>
            <div className="practices-grid">
              <div className="practices-column">
                <h3 className="practices-title error">
                  <XCircleIcon className="practices-icon" />
                  À éviter
                </h3>
                <ul className="practices-list">
                  {erreurs.map((e, i) => (
                    <li key={`error-${i}`}>
                      <XCircleIcon className="practices-list-icon error" />
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="practices-column">
                <h3 className="practices-title success">
                  <CheckCircleIcon className="practices-icon" />
                  À suivre
                </h3>
                <ul className="practices-list">
                  {bonnes.map((b, i) => (
                    <li key={`good-${i}`}>
                      <CheckCircleIcon className="practices-list-icon success" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          {/* ================================================================== */}
          {/* --- FIN DE LA FICHE ERREURS & BONNES PRATIQUES --- */}
          {/* ================================================================== */}
        </main>
      </div>
    </>
  );
};

export default TolerancesPage;
