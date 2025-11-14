"use client";

import { useState, useMemo, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MaterialSpec {
  label: string;
  value: string;
  unit?: string;
  importance?: 'critique' | 'important' | 'standard';
}

interface WorkshopTip {
  title: string;
  content: string;
  difficulty: 'facile' | 'moyen' | 'difficile';
  tools: string[];
}

interface MaterialData {
  id: string;
  category: 'metal' | 'acier' | 'alloy' | 'composite';
  type: string;
  title: string;
  icon: string;
  specs: MaterialSpec[];
  quickStats: string[];
  physicalProperties: Array<{label: string; value: string; application: string}>;
  mechanicalProperties: Array<{property: string; value: string; relevance: string}>;
  horlogerieProperties: Array<{property: string; value: string; why: string}>;
  workshop: {
    machinability: number;
    tips: WorkshopTip[];
    precautions: string[];
    recommendedTools: string[];
    heatTreatment?: string;
  };
  identification: {
    visual: string[];
    magnetic: boolean;
    color: string;
    hardness: string;
    densityTest: string;
  };
  commonIssues: Array<{problem: string; cause: string; solution: string}>;
  history: string;
  description: string;
  applications: string[];
  horlogerieUses: string[];
  treatments: string[];
  norms: string[];
}

export default function HorloLearnAtelier() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialData | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const materials: MaterialData[] = [
    {
      id: '316l',
      category: 'acier',
      type: 'Acier Inoxydable Austénitique',
      title: '316L',
      icon: '⚙️',
      specs: [
        { label: 'Masse volumique', value: '8.0', unit: 'Kg/dm³', importance: 'critique' },
        { label: 'Point de fusion', value: '1400-1450', unit: '°C', importance: 'important' },
        { label: 'Limite élastique', value: '200', unit: 'MPa', importance: 'critique' },
        { label: 'Résistance traction', value: '500', unit: 'MPa', importance: 'important' },
        { label: 'Dureté Brinell', value: '140-180', unit: 'HB', importance: 'standard' },
        { label: 'Module Young', value: '200', unit: 'GPa', importance: 'important' }
      ],
      quickStats: ['18% Cr', '14% Ni', '3% Mo', 'Non-magnétique', 'A4'],
      physicalProperties: [
        { label: 'Conductivité thermique', value: '15 W/m·K', application: 'Dispersion chaleur mouvement' },
        { label: 'Coefficient dilatation', value: '16×10⁻⁶/°C', application: 'Tolérances ajustages' },
        { label: 'Résistance corrosion', value: 'Excellent (sels, acides)', application: 'Boîtiers étanches' },
        { label: 'Capacité thermique', value: '0.5 J/g·K', application: 'Stabilité température' }
      ],
      mechanicalProperties: [
        { property: 'Limite élastique', value: '200 MPa', relevance: 'Résistance déformation plateau' },
        { property: 'Allongement', value: '40%', relevance: 'Formage bracelet maillons' },
        { property: 'Dureté', value: '150 HB', relevance: 'Usinage équilibré' },
        { property: 'Résilience', value: '100 J', relevance: 'Chocs quotidiens' }
      ],
      horlogerieProperties: [
        { property: 'Usinabilité', value: '8/10', why: 'Bon compromis vitesse/finition' },
        { property: 'Polissabilité', value: '9/10', why: 'Miroir optique possible' },
        { property: 'Magnétisme', value: 'Faible (<2%)', why: 'Échappement peu perturbé' },
        { property: 'Stabilité', value: 'Excellent', why: 'Maintien cotes long terme' }
      ],
      workshop: {
        machinability: 8,
        tips: [
          {
            title: 'Usinage de précision',
            content: 'Vitesse coupe 80-120 m/min, avance 0.1-0.2 mm/tr. Utiliser plaquettes carbure PVD-TiN. Refroidissement haute pression recommandé.',
            difficulty: 'moyen',
            tools: ['Tour CNC', 'Plaquettes carbure', 'HF pression']
          },
          {
            title: 'Polissage miroir',
            content: 'Séquence: émeri 400-800-1200-2000, puis pâte diamant 3μm-1μm-0.25μm. Final au feutre avec oxyde de cérium.',
            difficulty: 'difficile',
            tools: ['Polissoir', 'Pâtes diamant', 'Feutre', 'Oxyde cérium']
          }
        ],
        precautions: [
          'Éviter surchauffe >600°C (risque précipitation carbures)',
          'Décontamination acide nitrique après polissage',
          'Stockage sec (oxydation possible en milieu chloré)'
        ],
        recommendedTools: ['Coffret forets carbure', 'Jeu limes horlogères', 'Polissoirs feutre', 'Pâte diamant 3μm-1μm-0.25μm'],
        heatTreatment: 'Recuit solution 1050°C + trempe eau (en usine uniquement)'
      },
      identification: {
        visual: ['Gris argenté brillant', 'Non oxydé à l\'air', ' grains fins polis'],
        magnetic: false,
        color: 'Gris argenté neutre',
        hardness: 'Résiste à la lime douce',
        densityTest: 'Plombe dans l\'eau (8 kg/dm³)'
      },
      commonIssues: [
        { problem: 'Piqures corrosion', cause: 'Contact sel + humidité prolongée', solution: 'Passivation acide nitrique 30% + rinçage ultra-sons' },
        { problem: 'Magnétisation anormale', cause: 'Contact avec aimant fort', solution: 'Démagnétisation progressive (champ alternatif décroissant)' },
        { problem: 'Rayures polissage', cause: 'Contamination abrasifs', solution: 'Repolir avec séquence grain fin, nettoyage bac ultra-sons entre étapes' }
      ],
      history: 'Développé en 1912 pour l\'industrie chimique. Adopté par l\'horlogerie suisse dans les années 1960 pour sa résistance à la transpiration et à l\'eau de mer.',
      description: 'Acier inoxydable austénitique de référence en horlogerie. Composition équilibrée offrant excellente résistance à la corrosion, bonne usinabilité et finition miroir possible. Standard pour boîtiers de qualité.',
      applications: ['Boîtiers montres de sport', 'Bracelets', 'Couronnes', 'Fond de boîtier', 'Carters mouvement'],
      horlogerieUses: [
        'Boîtiers de plongée (100m+): Submariner, Seamaster',
        'Bracelets Oyster et Jubilee: maillons pleins ou creux',
        'Couronnes vissées: étanchéité garantie',
        'Fonds de boîtier transparents: résistance pression',
        'Carters de mouvement: protection échappement'
      ],
      treatments: [
        'Passivation acide nitrique (enhance Cr2O3 layer)',
        'Polissage miroir (émeri 2000 + feutre + oxyde cérium)',
        'Brossage (brosses abrasives grain 180)',
        'Sablage (corindon 50-100μm)',
        'PVD TiN (2-4μm, durcissement surface)'
      ],
      norms: ['EN 1.4404', 'ASTM A240', 'EN 10088-3', 'ISO 5832-1', 'RoHS 3']
    },
    {
      id: 'cuivre-beryllium',
      category: 'alloy',
      type: 'Alliage Cuivre-Béryllium',
      title: 'CuBe2',
      icon: '🟠',
      specs: [
        { label: 'Masse volumique', value: '8.25', unit: 'Kg/dm³', importance: 'important' },
        { label: 'Point de fusion', value: '870-980', unit: '°C', importance: 'important' },
        { label: 'Limite élastique', value: '1000-1200', unit: 'MPa', importance: 'critique' },
        { label: 'Dureté Vickers', value: '350-420', unit: 'HV', importance: 'critique' }
      ],
      quickStats: ['98% Cu', '2% Be', 'Traitement vieillissement', 'Amagnétique'],
      physicalProperties: [
        { label: 'Conductivité électrique', value: '45% IACS', application: 'Induction faible' },
        { label: 'Conductivité thermique', value: '130 W/m·K', application: 'Dissipation chaleur' },
        { label: 'Coefficient dilatation', value: '17×10⁻⁶/°C', application: 'Compatibilité laiton' }
      ],
      mechanicalProperties: [
        { property: 'Limite élastique', value: '1100 MPa', relevance: 'Ressorts haute performance' },
        { property: 'Dureté', value: '400 HV', relevance: 'Usure contact pivots' },
        { property: 'Fatigue', value: '10⁷ cycles', relevance: 'Durée vie ressort' }
      ],
      horlogerieProperties: [
        { property: 'Élasticité', value: 'Excellent', why: 'Ressorts spiral, barillet' },
        { property: 'Amagnétique', value: '<0.1%', why: 'Échappement non perturbé' },
        { property: 'Usure', value: 'Très faible', why: 'Pivot de balancier durable' }
      ],
      workshop: {
        machinability: 5,
        tips: [
          {
            title: 'Ressorts spiral',
            content: 'Laminage à froid + traitement vieillissement 3h@315°C. Pas de soudage (fragilisation). Déformation <5% après trempe.',
            difficulty: 'difficile',
            tools: ['Laminoir', 'Four précision ±5°C', 'Calibre ressort']
          },
          {
            title: 'Usinage fin',
            content: 'Vitesse réduite 50-80 m/min. Béryllium toxique: aspiration forcée + protection. Utiliser carbure C2.',
            difficulty: 'difficile',
            tools: ['Carbure C2', 'Aspiration HEPA', 'Masque FFP3']
          }
        ],
        precautions: [
          '⚠️ Toxicité béryllium: ne jamais braser/brûler',
          'Vieillissement obligatoire après formage',
          'Fragile sous chocs: éviter déformation plastique'
        ],
        recommendedTools: ['Limes diamant', 'Dremel vitesse variable', 'Four étuve numérique', 'Calibre à ressort'],
        heatTreatment: 'Vieillissement 3h @ 315°C (exact, sonde thermocouple)'
      },
      identification: {
        visual: ['Cuivre rougeâtre', 'Patine brun-vert', 'Grain très fin'],
        magnetic: false,
        color: 'Rouge cuivreux',
        hardness: 'Résiste fort à la lime',
        densityTest: 'Similaire acier inox'
      },
      commonIssues: [
        { problem: 'Cassure ressort', cause: 'Vieillissement manquant ou soudage', solution: 'Refaire trempe + vieillissement complet' },
        { problem: 'Usure prématurée pivots', cause: 'Dureté insuffisante (vieillissement)', solution: 'Contrôle dureté Vickers, revieillir si <350HV' },
        { problem: 'Fragilité anormale', cause: 'Contamination soudage ou surchauffe', solution: 'Changer pièce, non réparable' }
      ],
      history: 'Développé dans années 1930 pour aéronautique. Adopté horlogerie 1950 pour ressorts haute performance. Standard industriel depuis.',
      description: 'Alliage cuivre-béryllium traité vieillissement. Propriétés mécaniques exceptionnelles après traitement thermique. Utilisé pour ressorts haute performance et composants sollicités.',
      applications: ['Ressorts spiral', 'Barillet ressort', 'Pivots de balancier', 'Déclic répétition', 'Contact électrique'],
      horlogerieUses: [
        'Ressorts spiral modernes: remplace acier blue, 10× plus de cycles',
        'Barillet: haute énergie stockée, montres automatiques',
        'Pivots balancier: usure quasi nulle, chronométrie stable',
        'Déclic répétition: sonorité cristalline, durabilité'
      ],
      treatments: ['Vieillissement 3h@315°C', 'Polissage chimique (HNO₃+H₂SO₄)', 'Décapage anti-oxydation', 'Revêtement anti-usure (CVD)'],
      norms: ['EN 1654', 'ASTM B197', 'RoHS (Be étudié)']
    }
  ];

  // Quiz interactif
  const quizQuestions = [
    {
      question: "Quel est le principal avantage du 316L pour les boîtiers de plongée ?",
      options: ["Sa dureté", "Sa résistance à la corrosion", "Son faible coût", "Son magnétisme"],
      correct: 1,
      explanation: "Le 316L contient 3% de molybdène qui améliore fortement la résistance aux chlorures (eau de mer)."
    },
    {
      question: "Pourquoi le CuBe2 doit-il être vieilli après formage ?",
      options: ["Pour durcir", "Pour le rendre magnétique", "Pour le nettoyer", "Pour le rendre brillant"],
      correct: 0,
      explanation: "Le traitement vieillissement (3h@315°C) précipite les phases CuBe, augmentant la dureté de 200 à 400HV."
    }
  ];

  const filteredMaterials = useMemo(() => {
    return materials.filter(material => {
      const matchesFilter = activeFilter === 'all' || material.category === activeFilter;
      
      if (!searchTerm.trim()) {
        return matchesFilter;
      }
      
      const searchLower = searchTerm.toLowerCase();
      return (
        material.title.toLowerCase().includes(searchLower) ||
        material.type.toLowerCase().includes(searchLower) ||
        material.description.toLowerCase().includes(searchLower) ||
        material.applications.some(app => app.toLowerCase().includes(searchLower)) ||
        material.horlogerieUses.some(use => use.toLowerCase().includes(searchLower)) ||
        material.workshop.tips.some(tip => tip.content.toLowerCase().includes(searchLower))
      );
    });
  }, [activeFilter, searchTerm]);

  const toggleFavorite = (materialId: string) => {
    setFavorites(prev => 
      prev.includes(materialId) 
        ? prev.filter(id => id !== materialId)
        : [...prev, materialId]
    );
  };

  return (
    <>
      <div className="bg-animation">
        <div className="bg-gradient"></div>
        <div className="grid-overlay"></div>
      </div>

      <div className="container">
        {/* Header Éducatif */}
        <header className="header-edu">
          <div className="brand-section">
            <h1 className="logo">HORLOLEARN<span className="subtitle-edu">Atelier Technique</span></h1>
            <p className="tagline">Base de connaissances pour horlogers et apprentis</p>
          </div>
          <div className="edu-badges">
            <span className="edu-badge">📚 Formation</span>
            <span className="edu-badge">⚙️ Technique</span>
            <span className="edu-badge">🎯 Pratique</span>
          </div>
        </header>

        {/* Barre de recherche éducative */}
        <div className="search-edu-container">
          <div className="search-wrapper-edu">
            <input
              type="text"
              className="search-input-edu"
              placeholder="Rechercher par propriété, outil, problème atelier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="search-icon-edu">🔍</span>
          </div>
          <button className="quiz-btn" onClick={() => setShowQuiz(!showQuiz)}>
            📝 Quiz Technique
          </button>
          <button className="favorites-btn">
            ⭐ Mes Favoris ({favorites.length})
          </button>
        </div>

        {/* Filtres par métier */}
        <div className="profession-filters">
          <div className="filter-group-edu">
            <label>Métier</label>
            <div className="filter-buttons-edu">
              {[
                { id: 'all', label: 'Tous', icon: '👥' },
                { id: 'apprenti', label: 'Apprenti', icon: '🎓' },
                { id: 'compagnon', label: 'Compagnon', icon: '🔧' },
                { id: 'master', label: 'Master', icon: '🏆' }
              ].map(filter => (
                <button
                  key={filter.id}
                  className={`filter-btn-edu ${activeFilter === filter.id ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  <span className="filter-icon">{filter.icon}</span>
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-group-edu">
            <label>Atelier</label>
            <select className="workshop-select">
              <option>Usinage & décolletage</option>
              <option>Polissage & finition</option>
              <option>Ressorts & échappement</option>
              <option>Boîtiers & étanchéité</option>
            </select>
          </div>
        </div>

        {/* Section apprentissage actif */}
        {showQuiz && (
          <div className="learning-panel">
            <h3>🎯 Quiz Technique Horlogerie</h3>
            <div className="quiz-container">
              {quizQuestions.map((q, idx) => (
                <div key={idx} className="question-card">
                  <p className="question-text">{q.question}</p>
                  <div className="options-grid">
                    {q.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        className="option-btn"
                        onClick={() => {
                          if (optIdx === q.correct) {
                            setQuizScore(quizScore + 1);
                            alert(`✅ Correct! ${q.explanation}`);
                          } else {
                            alert(`❌ Incorrect. ${q.explanation}`);
                          }
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <div className="score-display">
                Score: {quizScore}/{quizQuestions.length}
              </div>
            </div>
          </div>
        )}

        {/* Dashboard technique */}
        <div className="tech-dashboard">
          <div className="chart-section">
            <h3>📊 Propriétés Comparatives (Horlogerie)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={materials.map(m => ({
                name: m.title,
                usinage: m.workshop.machinability,
                poli: m.horlogerieProperties.find(p => p.property === 'Polissabilité')?.value.split('/')[0],
                cor: m.physicalProperties.find(p => p.label.includes('corrosion'))?.value.length
              }))}>
                <CartesianGrid stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#a1a1aa" fontSize={11} angle={-45} textAnchor="end" />
                <YAxis stroke="#a1a1aa" />
                <Tooltip contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }} />
                <Line type="monotone" dataKey="usinage" stroke="var(--accent)" strokeWidth={2} name="Usinabilité" />
                <Line type="monotone" dataKey="poli" stroke="var(--accent2)" strokeWidth={2} name="Poli" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="tips-section">
            <h3>💡 Astuces Atelier</h3>
            <div className="tips-list">
              <div className="tip-card">
                <h4>Identification 316L vs 304</h4>
                <p>Test goutte acide chlorhydrique: 316L résiste >5min, 304 s'attaque rapidement.</p>
              </div>
              <div className="tip-card">
                <h4>Vieillissement CuBe2</h4>
                <p>Toujours vérifier température four avec pyromètre, ±5°C max!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Grille matériaux */}
        <div className="materials-grid-edu">
          {filteredMaterials.map((material) => (
            <div
              key={material.id}
              className="material-card-edu"
              onClick={() => setSelectedMaterial(material)}
            >
              <div className="card-header-edu">
                <div className="card-title-edu">
                  <span className="material-icon-edu">{material.icon}</span>
                  <div>
                    <h3>{material.title}</h3>
                    <p>{material.type}</p>
                  </div>
                </div>
                <button 
                  className={`favorite-btn ${favorites.includes(material.id) ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(material.id);
                  }}
                >
                  {favorites.includes(material.id) ? '⭐' : '☆'}
                </button>
              </div>

              <div className="specs-preview">
                {material.specs.slice(0, 2).map((spec, idx) => (
                  <div key={idx} className="spec-mini">
                    <span className="spec-label">{spec.label}</span>
                    <span className="spec-value">{spec.value} {spec.unit}</span>
                  </div>
                ))}
              </div>

              <div className="workshop-indicators">
                <div className="indicator">
                  <span className="indicator-label">Usinage</span>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{width: `${material.workshop.machinability * 10}%`}}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="quick-applications">
                {material.applications.slice(0, 2).map((app, idx) => (
                  <span key={idx} className="app-tag">{app}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Modale technique détaillée */}
        {selectedMaterial && (
          <div className="modal-overlay" onClick={() => setSelectedMaterial(null)}>
            <div className="modal-content-tech" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-tech">
                <div className="modal-title">
                  <span className="material-icon-lg">{selectedMaterial.icon}</span>
                  <div>
                    <h2>{selectedMaterial.title}</h2>
                    <p className="type-detail">{selectedMaterial.type}</p>
                  </div>
                </div>
                <button className="close-btn" onClick={() => setSelectedMaterial(null)}>✕</button>
              </div>

              <div className="modal-body-tech">
                {/* Onglets techniques */}
                <div className="tech-tabs">
                  <button className="tab-tech active">📋 Fiche Technique</button>
                  <button className="tab-tech">🔧 Atelier</button>
                  <button className="tab-tech">🎯 Identification</button>
                  <button className="tab-tech">📚 Histoire</button>
                </div>

                {/* Contenu fiche technique */}
                <div className="tab-content-tech">
                  <div className="properties-grid">
                    <div className="property-section">
                      <h3>Propriétés Physiques</h3>
                      <ul className="prop-list">
                        {selectedMaterial.physicalProperties.map((prop, idx) => (
                          <li key={idx} className="prop-item">
                            <strong>{prop.label}:</strong> {prop.value}
                            <br/><small>{prop.application}</small>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="property-section">
                      <h3>Propriétés Mécaniques</h3>
                      <ul className="prop-list">
                        {selectedMaterial.mechanicalProperties.map((prop, idx) => (
                          <li key={idx} className="prop-item">
                            <strong>{prop.property}:</strong> {prop.value}
                            <br/><small>{prop.relevance}</small>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="property-section">
                      <h3>Spécificités Horlogère</h3>
                      <ul className="prop-list">
                        {selectedMaterial.horlogerieProperties.map((prop, idx) => (
                          <li key={idx} className="prop-item">
                            <strong>{prop.property}:</strong> {prop.value}
                            <br/><small>→ {prop.why}</small>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Section atelier */}
                  <div className="workshop-section">
                    <h3>🔧 Guide Atelier</h3>
                    <div className="difficulty-indicator">
                      Difficulté: {'★'.repeat(selectedMaterial.workshop.machinability / 2)}{'☆'.repeat(5 - selectedMaterial.workshop.machinability / 2)}
                    </div>
                    
                    <div className="tips-grid">
                      {selectedMaterial.workshop.tips.map((tip, idx) => (
                        <div key={idx} className={`tip-card ${tip.difficulty}`}>
                          <h4>{tip.title}</h4>
                          <p>{tip.content}</p>
                          <div className="tools-needed">
                            <strong>Outils:</strong> {tip.tools.join(', ')}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="precautions-box">
                      <h4>⚠️ Précautions</h4>
                      <ul>
                        {selectedMaterial.workshop.precautions.map((prec, idx) => (
                          <li key={idx}>{prec}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="tools-list">
                      <h4>Outils Recommandés</h4>
                      <div className="tools-tags">
                        {selectedMaterial.workshop.recommendedTools.map((tool, idx) => (
                          <span key={idx} className="tool-tag">{tool}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Section identification */}
                  <div className="identification-section">
                    <h3>🔍 Guide d'Identification</h3>
                    <div className="ident-grid">
                      <div className="ident-item">
                        <h4>Visuel</h4>
                        <ul>
                          {selectedMaterial.identification.visual.map((desc, idx) => (
                            <li key={idx}>{desc}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="ident-item">
                        <h4>Tests</h4>
                        <ul>
                          <li><strong>Magnétique:</strong> {selectedMaterial.identification.magnetic ? 'Oui' : 'Non'}</li>
                          <li><strong>Couleur:</strong> {selectedMaterial.identification.color}</li>
                          <li><strong>Dureté:</strong> {selectedMaterial.identification.hardness}</li>
                          <li><strong>Densité:</strong> {selectedMaterial.identification.densityTest}</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Section problèmes courants */}
                  <div className="issues-section">
                    <h3>🚨 Problèmes Courants & Solutions</h3>
                    <div className="issues-list">
                      {selectedMaterial.commonIssues.map((issue, idx) => (
                        <div key={idx} className="issue-card">
                          <h4>{issue.problem}</h4>
                          <p><strong>Cause:</strong> {issue.cause}</p>
                          <p><strong>Solution:</strong> {issue.solution}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section histoire */}
                  <div className="history-section">
                    <h3>📚 Historique & Évolution</h3>
                    <p>{selectedMaterial.history}</p>
                  </div>

                  {/* Normes */}
                  <div className="norms-section">
                    <h3>📜 Normes & Références</h3>
                    <div className="norms-list">
                      {selectedMaterial.norms.map((norm, idx) => (
                        <span key={idx} className="norm-tag">{norm}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer éducatif */}
        <footer className="edu-footer">
          <p>🎯 Conçu pour la formation des horlogers et l'apprentissage continu</p>
          <p>Mises à jour techniques régulières - Version atelier 2024</p>
        </footer>
      </div>

      <style jsx global>{`
        :root {
          --primary: #0a0e27;
          --secondary: #1a1f3a;
          --accent: #00d4ff;
          --accent2: #9333ea;
          --text: #e4e4e7;
          --text-dim: #a1a1aa;
          --card-bg: rgba(26, 31, 58, 0.6);
          --card-bg-hover: rgba(26, 31, 58, 0.8);
          --border: rgba(255, 255, 255, 0.1);
          --success: #10b981;
          --warning: #f59e0b;
          --danger: #ef4444;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: var(--primary);
          color: var(--text);
          line-height: 1.6;
        }

        .bg-animation {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
        }

        .container {
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 30px;
          position: relative;
          z-index: 1;
        }

        /* Header Éducatif */
        .header-edu {
          padding: 50px 0 30px;
          text-align: center;
          border-bottom: 2px solid var(--border);
          margin-bottom: 30px;
        }

        .logo {
          font-size: 3.2em;
          font-weight: 800;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -2px;
        }

        .subtitle-edu {
          display: block;
          font-size: 0.5em;
          color: var(--accent);
          font-weight: 300;
          margin-top: 5px;
        }

        .tagline {
          font-size: 1.1em;
          color: var(--text-dim);
          margin-top: 10px;
        }

        .edu-badges {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 20px;
        }

        .edu-badge {
          padding: 6px 16px;
          background: rgba(0, 212, 255, 0.1);
          border: 1px solid rgba(0, 212, 255, 0.3);
          border-radius: 20px;
          font-size: 0.75em;
          font-weight: 700;
          color: var(--accent);
        }

        /* Barre recherche éducative */
        .search-edu-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 15px;
          margin-bottom: 30px;
          padding: 20px;
          background: var(--card-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border);
          border-radius: 16px;
        }

        .search-wrapper-edu {
          flex: 1;
          max-width: 600px;
          position: relative;
        }

        .search-input-edu {
          width: 100%;
          padding: 16px 50px 16px 20px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border);
          border-radius: 12px;
          color: var(--text);
          font-size: 1em;
        }

        .search-icon-edu {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--accent);
        }

        .quiz-btn, .favorites-btn {
          padding: 12px 24px;
          background: rgba(147, 51, 234, 0.1);
          border: 1px solid rgba(147, 51, 234, 0.3);
          border-radius: 8px;
          color: var(--accent2);
          font-weight: 600;
          cursor: pointer;
        }

        /* Filtres professionnels */
        .profession-filters {
          display: flex;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 30px;
          padding: 20px;
          background: var(--card-bg);
          border-radius: 12px;
        }

        .filter-group-edu label {
          display: block;
          font-size: 0.8em;
          font-weight: 700;
          color: var(--accent);
          margin-bottom: 8px;
        }

        .filter-buttons-edu {
          display: flex;
          gap: 10px;
        }

        .filter-btn-edu {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 8px 16px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border);
          border-radius: 20px;
          color: var(--text);
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-btn-edu.active {
          background: var(--accent);
          color: var(--primary);
        }

        .workshop-select {
          padding: 10px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--text);
        }

        /* Panel d'apprentissage */
        .learning-panel {
          margin-bottom: 30px;
          padding: 25px;
          background: linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(0, 212, 255, 0.1));
          border: 1px solid var(--accent);
          border-radius: 16px;
        }

        .question-card {
          margin-bottom: 20px;
          padding: 20px;
          background: var(--card-bg);
          border-radius: 12px;
        }

        .question-text {
          font-size: 1.1em;
          margin-bottom: 15px;
          color: var(--text);
        }

        .options-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        .option-btn {
          padding: 12px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--text);
          cursor: pointer;
          transition: all 0.2s;
        }

        .option-btn:hover {
          border-color: var(--accent);
        }

        /* Dashboard technique */
        .tech-dashboard {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 20px;
          margin-bottom: 30px;
        }

        .tips-section h3, .chart-section h3 {
          color: var(--accent);
          margin-bottom: 15px;
        }

        .tip-card {
          padding: 15px;
          margin-bottom: 10px;
          background: var(--card-bg);
          border-left: 4px solid var(--accent);
          border-radius: 8px;
        }

        /* Grille matériaux */
        .materials-grid-edu {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .material-card-edu {
          background: var(--card-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px;
          transition: all 0.3s;
          cursor: pointer;
        }

        .material-card-edu:hover {
          transform: translateY(-5px);
          border-color: var(--accent);
        }

        .card-header-edu {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 15px;
        }

        .card-title-edu {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .material-icon-edu {
          font-size: 2em;
        }

        .card-title-edu h3 {
          color: var(--text);
          font-size: 1.3em;
          margin-bottom: 2px;
        }

        .card-title-edu p {
          color: var(--text-dim);
          font-size: 0.8em;
        }

        .favorite-btn {
          background: none;
          border: none;
          font-size: 1.5em;
          cursor: pointer;
          color: var(--text-dim);
        }

        .favorite-btn.active {
          color: var(--accent);
        }

        /* Modal technique */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(10px);
          z-index: 1000;
          overflow-y: auto;
        }

        .modal-content-tech {
          max-width: 1200px;
          margin: 20px auto;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 20px;
        }

        .modal-header-tech {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 25px;
          border-bottom: 1px solid var(--border);
        }

        .modal-title {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .material-icon-lg {
          font-size: 3em;
        }

        .type-detail {
          color: var(--text-dim);
          font-size: 0.9em;
        }

        .close-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border);
          color: var(--text);
          font-size: 1.5em;
          cursor: pointer;
        }

        .tech-tabs {
          display: flex;
          border-bottom: 1px solid var(--border);
          padding: 0 25px;
        }

        .tab-tech {
          padding: 15px 25px;
          background: none;
          border: none;
          color: var(--text-dim);
          font-weight: 600;
          cursor: pointer;
          border-bottom: 2px solid transparent;
        }

        .tab-tech.active {
          color: var(--accent);
          border-bottom-color: var(--accent);
        }

        .tab-content-tech {
          padding: 25px;
        }

        .properties-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .property-section h3 {
          color: var(--accent);
          margin-bottom: 15px;
          font-size: 1.1em;
        }

        .prop-list {
          list-style: none;
        }

        .prop-item {
          padding: 8px 0;
          border-bottom: 1px solid var(--border);
        }

        .prop-item:last-child {
          border-bottom: none;
        }

        .prop-item small {
          color: var(--text-dim);
          font-size: 0.8em;
        }

        /* Footer */
        .edu-footer {
          text-align: center;
          padding: 30px;
          border-top: 1px solid var(--border);
          margin-top: 50px;
          color: var(--text-dim);
        }

        .edu-footer p {
          margin: 5px 0;
        }
      `}</style>
    </>
  );
}
