import React from 'react';

// Les icônes sont directement dans le code pour éviter tout problème
const XCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '1.5rem', height: '1.5rem', flexShrink: 0 }}>
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
  </svg>
);
const CheckCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '1.5rem', height: '1.5rem', flexShrink: 0 }}>
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
  </svg>
);

const FichePratiques = () => {
  const erreurs = [
    "Oublier une tolérance sur une cote fonctionnelle.",
    "Tolérance trop serrée (augmente le coût et les rejets).",
    "Tolérance trop large (crée un jeu excessif).",
    "Confondre la cote maximale et la cote minimale.",
    "Négliger les tolérances géométriques (parallélisme...).",
    "Mélanger les unités (mm et µm) sans précision.",
  ];

  const bonnesPratiques = [
    "Analyser la fonction pour définir une tolérance juste.",
    "Utiliser la syntaxe de la norme ISO appropriée.",
    "Penser à l'assemblage final en cotant la pièce.",
    "Valider la faisabilité des tolérances avec l'atelier.",
    "Faire contrôler ses plans par un pair avant production.",
    "Rester cohérent dans les unités sur tout le plan.",
  ];

  return (
    <div style={{
      backgroundColor: '#161b22',
      border: '1px solid #E2B44F',
      borderRadius: '12px',
      padding: '2.5rem',
      margin: '4rem 0',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      color: '#c9d1d9'
    }}>
      <h2 style={{
        color: '#E2B44F',
        textAlign: 'center',
        fontSize: '1.5rem',
        fontWeight: 700,
        margin: '0 0 2.5rem 0',
        textTransform: 'uppercase'
      }}>
        Mémo Technique : Erreurs & Bonnes Pratiques
      </h2>
      <div style={{
        display: 'flex',
        gap: '2rem',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        {/* Colonne des Erreurs */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h3 style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '1.2rem',
            fontWeight: 600,
            margin: '0 0 1.5rem 0',
            color: '#e57373'
          }}>
            <XCircleIcon /> Erreurs Fréquentes
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {erreurs.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', lineHeight: '1.6' }}>
                <span style={{ color: '#e57373' }}>-</span> <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Colonne des Bonnes Pratiques */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h3 style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '1.2rem',
            fontWeight: 600,
            margin: '0 0 1.5rem 0',
            color: '#81c784'
          }}>
            <CheckCircleIcon /> Bonnes Pratiques
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {bonnesPratiques.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', lineHeight: '1.6' }}>
                <span style={{ color: '#81c784' }}>+</span> <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FichePratiques;
