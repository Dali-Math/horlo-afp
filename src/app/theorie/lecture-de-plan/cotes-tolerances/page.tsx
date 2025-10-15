import FichePratiques from '../components/FichePratiques';

// --- Icônes SVG (auto-contenues, pas de dépendances) ---
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
const CotesEtTolerancesPage = () => {

  // Les données pour la fiche sont définies ici pour plus de clarté
  const erreurs = [
    "Oublier d’indiquer une tolérance sur une cote fonctionnelle.",
    "Définir une tolérance trop serrée (augmente le coût et les rejets).",
    "Choisir une tolérance trop large (crée un jeu excessif).",
    "Confondre la cote maximale et la cote minimale.",
    "Négliger les tolérances géométriques (parallélisme, etc.).",
    "Mélanger les unités de mesure (mm et µm) sans le préciser.",
  ];

  const bonnesPratiques = [
    "Analyser la fonction de la pièce pour définir une tolérance juste.",
    "Utiliser les symboles et la syntaxe de la norme ISO appropriée.",
    "Toujours relire la cotation en pensant à l'assemblage final.",
    "Valider la faisabilité des tolérances avec l'atelier d'usinage.",
    "Faire contrôler ses plans par un pair avant de lancer la production.",
    "Rester cohérent dans les unités et la précision sur tout le plan.",
  ];
  
  return (
    <>
      {/* Les styles sont encapsulés dans le composant pour être autonomes */}
      <style>{`
        :root {
            --bg-dark: #0d1117;
            --text-light: #c9d1d9;
            --text-secondary: #8b949e;
            --accent-gold: #E2B44F;
            --border-color: #30363d;
            --card-bg: #161b22;
        }
        body {
            background-color: var(--bg-dark);
            color: var(--text-light);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }
        .page-container {
            max-width: 1000px;
            margin: 2rem auto;
            padding: 1rem 2rem;
        }
        .back-link {
            color: var(--text-secondary);
            text-decoration: none;
            margin-bottom: 2rem;
            display: inline-block;
        }
        .back-link:hover {
            color: var(--accent-gold);
        }
        .intro-header h1 {
            color: var(--accent-gold);
            font-size: 2.5rem;
            font-weight: 700;
        }
        .intro-header p {
            font-size: 1.1rem;
            color: var(--text-light);
            max-width: 800px;
            margin-bottom: 3rem;
            line-height: 1.6;
        }
        .intro-header p strong {
            color: var(--text-light);
            font-weight: 600;
        }
        
        /* Schéma Interactif */
        .schema-container {
            margin-bottom: 4rem;
        }
        .schema-container h2 {
            color: var(--accent-gold);
            font-weight: 600;
            font-size: 1.2rem;
            margin-bottom: 1rem;
        }
        .schema-image-wrapper {
            background-color: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 10px;
            padding: 2rem;
            text-align: center;
        }
        .schema-image-wrapper img {
            max-width: 100%;
            background-color: white; /* Pour que le schéma blanc soit visible */
            border-radius: 5px;
        }
        .schema-image-wrapper figcaption {
            margin-top: 1rem;
            color: var(--text-secondary);
            font-style: italic;
        }

        /* Fiche Erreurs & Bonnes Pratiques (Stylisée pour ce thème) */
        .fiche-container {
            background-color: var(--card-bg);
            border: 1px solid var(--accent-gold);
            border-radius: 12px;
            padding: 2.5rem;
            margin: 4rem 0; /* Espace avant et après */
        }
        .fiche-title {
            color: var(--accent-gold);
            text-align: center;
            font-size: 1.5rem;
            font-weight: 700;
            margin: 0 0 2.5rem 0;
            text-transform: uppercase;
        }
        .fiche-grid {
            display: flex;
            gap: 3rem;
            justify-content: center;
            flex-wrap: wrap;
        }
        .fiche-column {
            flex: 1;
            min-width: 300px;
        }
        .fiche-subtitle {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 1.2rem;
            font-weight: 600;
            margin: 0 0 1.5rem 0;
        }
        .fiche-subtitle.error { color: #e57373; }
        .fiche-subtitle.success { color: #81c784; }
        .fiche-icon { width: 1.5rem; height: 1.5rem; flex-shrink: 0; }
        .fiche-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 1rem; }
        .fiche-list li { display: flex; align-items: flex-start; gap: 0.75rem; color: var(--text-light); line-height: 1.6; }
        .fiche-list-icon { width: 1.25rem; height: 1.25rem; flex-shrink: 0; margin-top: 4px; }
        
        /* Quiz */
        .quiz-container {
            background-color: var(--card-bg);
            border-radius: 10px;
            padding: 2rem;
            border: 1px solid var(--border-color);
        }
        .quiz-title {
            color: var(--accent-gold);
            font-weight: 600;
            font-size: 1.2rem;
            margin-bottom: 1.5rem;
        }
        .quiz-question {
            color: var(--text-light);
            font-size: 1.1rem;
            margin-bottom: 1.5rem;
        }
        .quiz-options button {
            display: block;
            width: 100%;
            text-align: left;
            padding: 1rem;
            margin-bottom: 0.5rem;
            border-radius: 8px;
            border: 1px solid var(--border-color);
            background-color: #21262d;
            color: var(--text-light);
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .quiz-options button:hover {
            border-color: var(--accent-gold);
            background-color: #30363d;
        }
      `}</style>

      <div className="page-container">
        <a href="#" className="back-link">← Retour</a>
        
        <header className="intro-header">
          <h1>Cotes et Tolérances (ISO 129-1 & ISO 1101)</h1>
          <p>
            Ces normes précisent les règles de cotation et les tolérances <strong>indispensables</strong> à la qualité en horlogerie. Maîtrise-les pour comprendre l'assemblage, l'usinage et le contrôle dimensionnel des montres.
          </p>
        </header>

        <main>
          <section className="schema-container">
            <h2>Schéma interactif</h2>
            <div className="schema-image-wrapper">
              <img src="https://horlo-afp-git-test-lecture-de-plan-dali-maths-projects.vercel.app/images/cotes-tolerances/tuto.png" alt="Schéma de cotes et tolérances horlogères" />
              <figcaption>Cliquez sur l'image pour afficher l'explication pédagogique.</figcaption>
            </div>
          </section>

          {/* ==================================================================== */}
          {/* --- FICHE ERREURS & BONNES PRATIQUES INTÉGRÉE ICI --- */}
          {/* ==================================================================== */}
          <section className="fiche-container">
            <h2 className="fiche-title">Mémo Technique : Erreurs & Bonnes Pratiques</h2>
            <div className="fiche-grid">
              <div className="fiche-column">
                <h3 className="fiche-subtitle error">
                  <XCircleIcon className="fiche-icon" />
                  Erreurs Fréquentes
                </h3>
                <ul className="fiche-list">
                  {erreurs.map((erreur, index) => (
                    <li key={`erreur-${index}`}>
                      <XCircleIcon className="fiche-list-icon" />
                      <span>{erreur}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="fiche-column">
                <h3 className="fiche-subtitle success">
                  <CheckCircleIcon className="fiche-icon" />
                  Bonnes Pratiques
                </h3>
                <ul className="fiche-list">
                  {bonnesPratiques.map((pratique, index) => (
                    <li key={`pratique-${index}`}>
                      <CheckCircleIcon className="fiche-list-icon" />
                      <span>{pratique}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          {/* ================================================================== */}
          {/* --- FIN DE LA FICHE --- */}
          {/* ================================================================== */}

          <section className="quiz-container">
            <h2 className="quiz-title">Quiz : Teste tes connaissances</h2>
            <p className="quiz-question">Qu'appelle-t-on 'cote nominale' ?</p>
            <div className="quiz-options">
              <button>La dimension idéale sans tolérance</button>
              <button>La tolérance maximale autorisée</button>
              <button>L'écart entre deux dimensions</button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default CotesEtTolerancesPage;
