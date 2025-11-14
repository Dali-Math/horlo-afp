"use client";

import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface WorkshopGuide {
  title: string;
  steps: string[];
  tools: string[];
  safety: string[];
  commonMistakes: string[];
}

interface TechnicalData {
  property: string;
  value: string;
  unit?: string;
  application: string;
  explanation: string;
}

interface LearningCard {
  question: string;
  answer: string;
  memoryTip?: string;
}

interface MaterialData {
  id: string;
  category: 'metal' | 'acier' | 'alloy' | 'composite';
  type: string;
  title: string;
  icon: string;
  complexity: 'apprenti' | 'compagnon' | 'master';
  technicalData: TechnicalData[];
  quickStats: string[];
  properties: {
    physical: TechnicalData[];
    mechanical: TechnicalData[];
    horlogerie: Array<{
      property: string;
      value: string;
      why: string;
    }>;
  };
  workshop: {
    machinability: number;
    polishability: number;
    guides: WorkshopGuide[];
    precautions: string[];
    heatTreatment?: string;
  };
  identification: {
    visual: string[];
    magnetic: boolean;
    color: string;
    hardness: string;
    sound?: string;
    densityTest: string;
  };
  commonIssues: Array<{
    problem: string;
    cause: string;
    solution: string;
  }>;
  history: string;
  description: string;
  applications: string[];
  horlogerieUses: string[];
  treatments: string[];
  norms: string[];
  learningCards: LearningCard[];
  practice: {
    exercises: string[];
    miniProjects: string[];
  };
}

export default function HorloLearnPedagogique() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialData | null>(null);
  const [activeTab, setActiveTab] = useState('fiche');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, boolean>>({});
  const [studyMode, setStudyMode] = useState(false);

  const materials: MaterialData[] = [
    {
      id: '316l',
      category: 'acier',
      type: 'Acier Inoxydable Austénitique',
      title: '316L',
      icon: '⚙️',
      complexity: 'apprenti',
      technicalData: [
        { property: 'Masse volumique', value: '8.0', unit: 'Kg/dm³', application: 'Poids boîtiers', explanation: 'Permet de calculer le poids final de la montre' },
        { property: 'Point de fusion', value: '1400-1450', unit: '°C', application: 'Soudage brasage', explanation: 'Ne jamais chauffer >600°C en polissage' },
        { property: 'Limite élastique', value: '200', unit: 'MPa', application: 'Résistance déformation', explanation: 'Ne pas dépasser sous peine de déformation permanente' },
        { property: 'Dureté Brinell', value: '150', unit: 'HB', application: 'Usure quotidienne', explanation: 'Dureté suffisante pour résister aux rayures' }
      ],
      quickStats: ['18% Cr', '14% Ni', '3% Mo', 'Non-magnétique', 'A4'],
      properties: {
        physical: [
          { property: 'Conductivité thermique', value: '15', unit: 'W/m·K', application: 'Dispersion chaleur mouvement', explanation: 'Évite la dilatation thermique qui perturberait le balancier' },
          { property: 'Coefficient dilatation', value: '16', unit: '10⁻⁶/°C', application: 'Tolérances ajustages', explanation: 'À 20°C→40°C, un pont de 10mm s’allonge de 3.2μm' },
          { property: 'Résistance corrosion', value: 'Excellente', unit: '', application: 'Boîtiers étanches', explanation: 'Résiste à l\'eau de mer grâce au Mo à 3%' }
        ],
        mechanical: [
          { property: 'Limite élastique', value: '200', unit: 'MPa', application: 'Résistance plateau', explanation: 'Un ressort de barillet ne déforme pas le pont à 180 MPa' },
          { property: 'Allongement à rupture', value: '40', unit: '%', application: 'Formage bracelet', explanation: 'Permet cintrage maillon sans fissure' },
          { property: 'Module Young', value: '200', unit: 'GPa', application: 'Rigidité structure', explanation: 'Pont rigide qui ne fléchit pas sous l\'échappement' }
        ],
        horlogerie: [
          { property: 'Usinabilité', value: '8/10', why: 'Bon compromis vitesse/finition, copeaux réguliers' },
          { property: 'Polissabilité', value: '9/10', why: 'Miroir optique possible jusqu\'à 0.1μm Ra' },
          { property: 'Magnétisme', value: '<2%', why: 'Échappement à ancre peu affecté par champs <50 Gauss' },
          { property: 'Stabilité', value: 'Excellente', why: 'Maintient cotes long terme, vieillissement négligeable' }
        ]
      },
      workshop: {
        machinability: 8,
        polishability: 9,
        guides: [
          {
            title: 'Usinage de précision (tour)',
            steps: [
              'Choisir plaquette carbure PVD-TiN (rayure bleue sur flanc)',
              'Vitesse de coupe: 80-120 m/min (ex: Ø10mm → 2500-3800 tr/min)',
              'Avance: 0.1-0.2 mm/tr pour finition, 0.05 mm/tr pour surfaçage',
              'Profondeur passe: 0.2-0.5mm max en finition',
              'Refroidissement: émulsion 5% en haute pression (30 bars)',
              'Vérifier usure plaquette toutes les 30min (bavures = changement)'
            ],
            tools: ['Tour CNC ou manuel précision', 'Porte-plaquette 16x16', 'Plaquettes carbure PVD-TiN', 'Émulsion soluble 5%', 'Jauge digitale 0.001mm'],
            safety: ['Port de lunettes obligatoire', 'Vérifier fixation pièce', 'Ne pas toucher copeaux chauds'],
            commonMistakes: ['Vitesse trop haute → surchauffe + déformation', 'Avance trop forte → trainée + mauvaise finition', 'Refroidissement insuffisant → usure prématurée']
          },
          {
            title: 'Polissage miroir (finishing)',
            steps: [
              'Phase 1: émeri 400 sur feutre dur, 2000 tr/min, pression légère',
              'Phase 2: émeri 800, changer sens polissage de 90°',
              'Phase 3: émeri 1200, vérifier disparition rayures 400',
              'Phase 4: émeri 2000, surface doit être uniforme gris clair',
              'Phase 5: pâte diamant 3μm sur feutre mou, 1500 tr/min',
              'Phase 6: pâte diamant 1μm, surface commence à refléter',
              'Phase 7: pâte diamant 0.25μm, miroir parfait',
              'Phase 8: final oxyde de cérium sur feutre doux, 1000 tr/min',
              'Décontamination: bain ultra-sons 10min alcool + rinçage eau déminéralisée'
            ],
            tools: ['Polissoir vitesse variable', 'Feutres dur, moyen, mou, doux', 'Émeris 400-800-1200-2000', 'Pâtes diamant 3-1-0.25μm', 'Oxyde cérium', 'Bac ultra-sons'],
            safety: ['Masque anti-poussière FFP2', 'Ventilation aspirante au-dessus polissoir', 'Pas de flamme (poudres inflammables)'],
            commonMistakes: ['Sauter grain → rayures profondes', 'Pression trop forte → surchauffe + couches oxyde jaunes', 'Contamination entre pâtes → refaire depuis début']
          }
        ],
        precautions: [
          '⚠️ Ne jamais chauffer >600°C (risque précipitation carbures → sensibilité corrosion)',
          '🧪 Décontamination acide nitrique 30% 30min après polissage (restaure couche passive Cr2O3)',
          '💧 Stockage sec avec pastille absorbeur humidité (oxydation possible en milieu chloré)',
          '🧲 Garder à l\'écart aimants forts (sinon démagnétisation nécessaire)'
        ],
        heatTreatment: '✅ Recuit solution 1050°C + trempe eau (en usine uniquement) - Ne pas refaire en atelier!'
      },
      identification: {
        visual: ['Gris argenté brillant', 'Non oxydé à l\'air', 'Grains fins polis visibles loupe x30', 'Reflet neutre pas cuivreux'],
        magnetic: false,
        color: 'Gris argenté neutre',
        hardness: 'Résiste à la lime douce (lime glisse sans gratter)',
        sound: 'Son métallique clair (pas mat comme l\'aluminium)',
        densityTest: 'Plombe dans l\'eau (8 kg/dm³), similaire au laiton'
      },
      commonIssues: [
        { 
          problem: 'Piqûres de corrosion en milieu chloré (plage)', 
          cause: 'Mo insuffisant si 304 utilisé à la place de 316L', 
          solution: 'Vérifier composition spectro (Ni>10%, Mo>2%). Remplacer pièce ou traitement passivation renforcée'
        },
        { 
          problem: 'Magnétisation anormale (aimantation champ fort)', 
          cause: 'Contact avec aimant de haut-parleur, fermeture sac', 
          solution: 'Démagnétiseur professionnel (champ alternatif décroissant). Ne pas frapper!'
        },
        { 
          problem: 'Rayures apparaissent malgré polissage miroir', 
          cause: 'Contamination abrasifs (pâte diamant usée, poussière)', 
          solution: 'Repolir depuis grain 1200 minimum, bac ultra-sons entre chaque étape'
        },
        { 
          problem: 'Décoloration jaunâtre après polissage', 
          cause: 'Surchauffe >600°C → formation oxyde ferrique', 
          solution: 'Repolir avec émeri 800 + refroidissement constant, jamais sec'
        }
      ],
      history: 'Développé en 1912 pour industrie chimique (résistance acides). Adopté horlogerie suisse 1960 remplaçant l\'acier carbone (rouille). Standard montres de plongée depuis Rolex Submariner 1954. Evolution vers 904L (Rolex) pour meilleure résistance.',
      description: 'Acier inoxydable austénitique de référence en horlogerie. Composition équilibrée offrant excellente résistance à la corrosion grâce au molybdène (3%), bonne usinabilité et finition miroir possible. Standard pour boîtiers de qualité.',
      applications: ['Boîtiers montres de sport', 'Bracelets maillons', 'Couronnes vissées', 'Fonds boîtier transparents', 'Carters mouvement', 'Vis décoratives'],
      horlogerieUses: [
        'Boîtiers de plongée 100m+: Rolex Submariner, Omega Seamaster',
        'Bracelets Oyster/Jubilee: maillons pleins ou creux moulés',
        'Couronnes vissées: filetage résistant à l\'usure',
        'Fonds transparent saphir: tenue pression 5 bar',
        'Carters protection échappement: rigidité vibration'
      ],
      treatments: [
        'Passivation acide nitrique 30% 30min: restaure couche passive Cr2O3',
        'Polissage miroir (Ra<0.1μm): émeri 2000 + feutre + oxyde cérium',
        'Brossage linéaire: brosses abrasives grain 180 direction constante',
        'Sablage décoratif: corindon 50-100μm pression 3-4 bar',
        'PVD TiN/DLC: 2-4μm durcissement surface + coloris'
      ],
      norms: ['EN 1.4404', 'ASTM A240 (chimie)', 'EN 10088-3 (barres)', 'ISO 5832-1 (implant)', 'RoHS 3 (santé)'],
      learningCards: [
        { 
          question: 'Comment différencier 316L du 304 sans analyseur?', 
          answer: 'Test goutte acide chlorhydrique: 316L résiste >5min (Mo), 304 s\'attaque rapidement',
          memoryTip: 'Mo = Molybdène = Mer = Résiste à l\'eau de mer'
        },
        { 
          question: 'Pourquoi polir à refroidissement constant?', 
          answer: 'Surchauffe >600°C forme oxyde jaunâtre (Fe2O3) qui n\'est plus inoxydable',
          memoryTip: 'Jaune = Chaud = Mauvais. Gris froid = Bon'
        }
      ],
      practice: {
        exercises: [
          'Identifier 3 boîtiers de montre au hasard: 316L, 304, laiton',
          'Polir un échantillon 316L jusqu\'à miroir (5 heures estimées)',
          'Rédiger fiche sécurité stockage matériaux inox atelier'
        ],
        miniProjects: [
          'Réaliser cube 10x10x10mm en 316L tolérance ±0.02mm',
          'Créer collection échantillons métaux horlogerie (10 pièces)',
          'Étude comparative corrosion: immerger 316L vs 304 vs acier carbone 1 semaine dans eau salée'
        ]
      }
    }
  ];

  // Calcul pour affichage dashboard
  const machinabilityData = materials.map(m => ({
    name: m.title,
    machinability: m.workshop.machinability,
    polishability: m.workshop.polishability
  }));

  // Gestion quiz interactif
  const handleQuizAnswer = (materialId: string, cardIndex: number, isCorrect: boolean) => {
    setQuizAnswers({...quizAnswers, [`${materialId}-${cardIndex}`]: isCorrect});
  };

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
        material.workshop.guides.some(guide => 
          guide.steps.some(step => step.toLowerCase().includes(searchLower))
        )
      );
    });
  }, [activeFilter, searchTerm]);

  return (
    <>
      {/* Animation fond */}
      <div className="bg-animation">
        <div className="bg-gradient"></div>
        <div className="grid-overlay"></div>
      </div>

      <div className="container-pedago">
        {/* Header Éducatif */}
        <header className="header-pedago">
          <div className="brand-section">
            <h1 className="logo-pedago">HORLOLEARN<span className="edu-badge">Formation</span></h1>
            <p className="tagline">Base de connaissances technique pour horlogers en formation</p>
          </div>
          <div className="complexity-selector">
            {[
              { id: 'apprenti', label: 'Apprenti', color: 'green' },
              { id: 'compagnon', label: 'Compagnon', color: 'orange' },
              { id: 'master', label: 'Master', color: 'red' }
            ].map(level => (
              <button
                key={level.id}
                className={`complexity-btn ${activeFilter === level.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(level.id)}
              >
                {level.label}
              </button>
            ))}
          </div>
        </header>

        {/* Barre de recherche pédagogique */}
        <div className="search-pedago-container">
          <div className="search-wrapper-pedago">
            <input
              type="text"
              className="search-input-pedago"
              placeholder="Rechercher: propriété, problème atelier, technique..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="search-icon-pedago">🔍</span>
          </div>
          <div className="pedago-tools">
            <button 
              className="tool-btn-pedago"
              onClick={() => setStudyMode(!studyMode)}
            >
              {studyMode ? '📝 Mode Normal' : '📖 Mode Révision'}
            </button>
            <button className="tool-btn-pedago">📋 Fiches Synthèse</button>
          </div>
        </div>

        {/* Dashboard pédagogique */}
        <div className="dashboard-pedago">
          <div className="chart-card-pedago">
            <h3>📊 Comparaison Usinabilité</h3>
            <p className="chart-explanation">Plus le score est haut, plus le métal est facile à usiner sans outils spéciaux</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={machinabilityData}>
                <CartesianGrid stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#a1a1aa" fontSize={11} angle={-45} textAnchor="end" />
                <YAxis stroke="#a1a1aa" />
                <Tooltip contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }} />
                <Bar dataKey="machinability" fill="url(#machinabilityGradient)" />
                <defs>
                  <linearGradient id="machinabilityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--success)" />
                    <stop offset="100%" stopColor="var(--warning)" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="tips-card-pedago">
            <h3>💡 Astuces Mémorisation</h3>
            <ul className="tips-list-pedago">
              <li><strong>316L:</strong> Mo = Molybdène = Mer → résiste à l'eau de mer</li>
              <li><strong>Laiton:</strong> Cuivre + Zinc → couleur jaune cuivreux</li>
              <li><strong>Bronze:</strong> Cuivre + Étain → sonorité plus claire</li>
            </ul>
          </div>
          <div className="quiz-card-pedago">
            <h3>🎯 Quiz Rapide</h3>
            <div className="quiz-preview">
              <p>Quelle est la principale différence entre 304 et 316L ?</p>
              <div className="quiz-options">
                <button className="quiz-option">% de carbone</button>
                <button className="quiz-option correct">% de molybdène</button>
              </div>
            </div>
          </div>
        </div>

        {/* Grille des matériaux */}
        <div className="materials-grid-pedago">
          {filteredMaterials.map((material) => (
            <div
              key={material.id}
              className={`material-card-pedago ${material.complexity}`}
              onClick={() => {
                setSelectedMaterial(material);
                setActiveTab('fiche');
              }}
            >
              <div className="card-header-pedago">
                <div className="card-title-pedago">
                  <span className="material-icon-pedago">{material.icon}</span>
                  <div>
                    <h3>{material.title}</h3>
                    <p className="type-pedago">{material.type}</p>
                  </div>
                </div>
                <div className="complexity-badge">
                  {material.complexity === 'apprenti' && '🟢'}
                  {material.complexity === 'compagnon' && '🟡'}
                  {material.complexity === 'master' && '🔴'}
                </div>
              </div>

              <div className="specs-preview-pedago">
                {material.technicalData.slice(0, 2).map((spec, idx) => (
                  <div key={idx} className="spec-mini-pedago">
                    <span className="spec-label-pedago">{spec.property}</span>
                    <span className="spec-value-pedago">{spec.value} {spec.unit}</span>
                  </div>
                ))}
              </div>

              <div className="properties-preview-pedago">
                {material.properties.horlogerie.slice(0, 2).map((prop, idx) => (
                  <div key={idx} className="prop-chip-pedago">
                    <strong>{prop.property}:</strong> {prop.value}
                  </div>
                ))}
              </div>

              <div className="applications-preview-pedago">
                <span className="app-label-pedago">Applications:</span>
                <div className="app-tags-pedago">
                  {material.applications.slice(0, 2).map((app, idx) => (
                    <span key={idx} className="app-tag-pedago">{app}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modale d'apprentissage détaillée */}
        {selectedMaterial && (
          <div className="modal-overlay-pedago" onClick={() => setSelectedMaterial(null)}>
            <div className="modal-content-pedago" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-pedago">
                <div className="modal-title-pedago">
                  <span className="material-icon-lg-pedago">{selectedMaterial.icon}</span>
                  <div>
                    <h2>{selectedMaterial.title}</h2>
                    <p className="type-detail-pedago">{selectedMaterial.type}</p>
                  </div>
                </div>
                <button className="close-btn-pedago" onClick={() => setSelectedMaterial(null)}>✕</button>
              </div>

              {/* Onglets pédagogiques */}
              <div className="tabs-pedago">
                <button 
                  className={`tab-pedago ${activeTab === 'fiche' ? 'active' : ''}`}
                  onClick={() => setActiveTab('fiche')}
                >
                  📋 Fiche Technique
                </button>
                <button 
                  className={`tab-pedago ${activeTab === 'atelier' ? 'active' : ''}`}
                  onClick={() => setActiveTab('atelier')}
                >
                  🔧 Guide Atelier
                </button>
                <button 
                  className={`tab-pedago ${activeTab === 'identification' ? 'active' : ''}`}
                  onClick={() => setActiveTab('identification')}
                >
                  🔍 Identification
                </button>
                <button 
                  className={`tab-pedago ${activeTab === 'exercices' ? 'active' : ''}`}
                  onClick={() => setActiveTab('exercices')}
                >
                  ✍️ Exercices
                </button>
                <button 
                  className={`tab-pedago ${activeTab === 'history' ? 'active' : ''}`}
                  onClick={() => setActiveTab('history')}
                >
                  📚 Historique
                </button>
              </div>

              {/* Contenu des onglets */}
              <div className="tab-content-pedago">
                {activeTab === 'fiche' && (
                  <div className="fiche-content">
                    <p className="description-pedago">{selectedMaterial.description}</p>
                    
                    <div className="properties-grid-pedago">
                      {/* Propriétés physiques */}
                      <div className="section-pedago">
                        <h3>📐 Propriétés Physiques</h3>
                        <ul className="property-list-pedago">
                          {selectedMaterial.properties.physical.map((prop, idx) => (
                            <li key={idx} className="property-item-pedago">
                              <div className="prop-header">
                                <strong>{prop.property}:</strong> {prop.value} {prop.unit}
                              </div>
                              <div className="prop-application">
                                <small>🎯 {prop.application}</small>
                              </div>
                              <div className="prop-explanation">
                                <small>ℹ️ {prop.explanation}</small>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Propriétés mécaniques */}
                      <div className="section-pedago">
                        <h3>⚙️ Propriétés Mécaniques</h3>
                        <ul className="property-list-pedago">
                          {selectedMaterial.properties.mechanical.map((prop, idx) => (
                            <li key={idx} className="property-item-pedago">
                              <div className="prop-header">
                                <strong>{prop.property}:</strong> {prop.value} {prop.unit}
                              </div>
                              <div className="prop-application">
                                <small>🎯 {prop.application}</small>
                              </div>
                              <div className="prop-explanation">
                                <small>ℹ️ {prop.explanation}</small>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Spécificités horlogère */}
                      <div className="section-pedago">
                        <h3>🕰️ Spécificités Horlogère</h3>
                        <ul className="property-list-pedago">
                          {selectedMaterial.properties.horlogerie.map((prop, idx) => (
                            <li key={idx} className="property-item-pedago">
                              <div className="prop-header">
                                <strong>{prop.property}:</strong> {prop.value}
                              </div>
                              <div className="prop-explanation">
                                <small>ℹ️ Pourquoi: {prop.why}</small>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Normes */}
                      <div className="section-pedago">
                        <h3>📜 Normes & Standards</h3>
                        <div className="norms-grid-pedago">
                          {selectedMaterial.norms.map((norm, idx) => (
                            <div key={idx} className="norm-card-pedago">
                              <strong>{norm.split(' ')[0]}</strong>
                              <small>{norm.split(' ').slice(1).join(' ')}</small>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'atelier' && (
                  <div className="atelier-content">
                    <div className="difficulty-section-pedago">
                      <h3>Difficulté d'usinage: {selectedMaterial.workshop.machinability}/10</h3>
                      <div className="difficulty-bar-pedago">
                        <div 
                          className="difficulty-fill-pedago"
                          style={{width: `${selectedMaterial.workshop.machinability * 10}%`}}
                        ></div>
                      </div>
                    </div>

                    {selectedMaterial.workshop.guides.map((guide, idx) => (
                      <div key={idx} className="guide-card-pedago">
                        <h4>{guide.title}</h4>
                        
                        <div className="steps-section-pedago">
                          <h5>Étapes détaillées:</h5>
                          <ol className="steps-list-pedago">
                            {guide.steps.map((step, stepIdx) => (
                              <li key={stepIdx}>{step}</li>
                            ))}
                          </ol>
                        </div>

                        <div className="tools-section-pedago">
                          <h5>Outils nécessaires:</h5>
                          <div className="tools-tags-pedago">
                            {guide.tools.map((tool, toolIdx) => (
                              <span key={toolIdx} className="tool-tag-pedago">{tool}</span>
                            ))}
                          </div>
                        </div>

                        <div className="safety-section-pedago">
                          <h5>⚠️ Sécurité:</h5>
                          <ul className="safety-list-pedago">
                            {guide.safety.map((safety, safetyIdx) => (
                              <li key={safetyIdx}>{safety}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="mistakes-section-pedago">
                          <h5>❌ Erreurs courantes:</h5>
                          <ul className="mistakes-list-pedago">
                            {guide.commonMistakes.map((mistake, mistakeIdx) => (
                              <li key={mistakeIdx}>{mistake}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}

                    <div className="precautions-section-pedago">
                      <h4>⚠️ Précautions Générales</h4>
                      <ul className="precautions-list-pedago">
                        {selectedMaterial.workshop.precautions.map((prec, idx) => (
                          <li key={idx}>{prec}</li>
                        ))}
                      </ul>
                    </div>

                    {selectedMaterial.workshop.heatTreatment && (
                      <div className="heat-treatment-pedago">
                        <h4>🔥 Traitement Thermique</h4>
                        <p>{selectedMaterial.workshop.heatTreatment}</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'identification' && (
                  <div className="identification-content">
                    <div className="ident-methods-pedago">
                      <h3>Tests d'Identification en Atelier</h3>
                      
                      <div className="test-section-pedago">
                        <h4>1. Test Visuel</h4>
                        <ul>
                          {selectedMaterial.identification.visual.map((desc, idx) => (
                            <li key={idx}>👁️ {desc}</li>
                          ))}
                        </ul>
                        <div className="color-sample-pedago">
                          <span className="color-label-pedago">Couleur caractéristique:</span>
                          <div className="color-box-pedago" style={{backgroundColor: selectedMaterial.identification.color}}></div>
                          <span>{selectedMaterial.identification.color}</span>
                        </div>
                      </div>

                      <div className="test-section-pedago">
                        <h4>2. Test Magnétique</h4>
                        <p><strong>Résultat:</strong> {selectedMaterial.identification.magnetic ? 'Aimanté' : 'Non aimanté'}</p>
                        <p><strong>Comment faire:</strong> Approcher un petit aimant neodymium</p>
                      </div>

                      <div className="test-section-pedago">
                        <h4>3. Test Dureté</h4>
                        <p><strong>Méthode:</strong> Gratter avec lime douce</p>
                        <p><strong>Résultat:</strong> {selectedMaterial.identification.hardness}</p>
                      </div>

                      <div className="test-section-pedago">
                        <h4>4. Test Densité (si doute)</h4>
                        <p>{selectedMaterial.identification.densityTest}</p>
                      </div>

                      {selectedMaterial.identification.sound && (
                        <div className="test-section-pedago">
                          <h4>5. Test Sonore</h4>
                          <p>{selectedMaterial.identification.sound}</p>
                        </div>
                      )}
                    </div>

                    <div className="troubleshooting-section-pedago">
                      <h3>🚨 Dépannage Problèmes Courants</h3>
                      {selectedMaterial.commonIssues.map((issue, idx) => (
                        <div key={idx} className="issue-card-pedago">
                          <h4>Problème: {issue.problem}</h4>
                          <p><strong>Cause:</strong> {issue.cause}</p>
                          <p><strong>Solution:</strong> {issue.solution}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'exercices' && (
                  <div className="exercices-content">
                    <div className="exercises-section-pedago">
                      <h3>✍️ Exercices Pratiques</h3>
                      <ul className="exercises-list-pedago">
                        {selectedMaterial.practice.exercises.map((exercise, idx) => (
                          <li key={idx} className="exercise-item-pedago">
                            <span className="exercise-number">{idx + 1}.</span>
                            <span>{exercise}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="projects-section-pedago">
                      <h3>🎯 Mini-Projets</h3>
                      <ul className="projects-list-pedago">
                        {selectedMaterial.practice.miniProjects.map((project, idx) => (
                          <li key={idx} className="project-item-pedago">
                            <span className="project-number">{idx + 1}.</span>
                            <span>{project}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="learning-cards-section-pedago">
                      <h3>🧠 Fiches Mémorisation</h3>
                      {selectedMaterial.learningCards.map((card, idx) => (
                        <div key={idx} className="learning-card-pedago">
                          <div className="card-question-pedago">
                            <strong>❓ {card.question}</strong>
                          </div>
                          <div className="card-answer-pedago">
                            <p>💡 {card.answer}</p>
                            {card.memoryTip && (
                              <p className="memory-tip-pedago">🎯 Astuce: {card.memoryTip}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'history' && (
                  <div className="history-content">
                    <h3>📚 Historique & Évolution</h3>
                    <p className="history-text-pedago">{selectedMaterial.history}</p>
                    
                    <div className="timeline-pedago">
                      <h4>Points Clés:</h4>
                      <ul className="timeline-list-pedago">
                        {selectedMaterial.history.split('.').filter(Boolean).map((event, idx) => (
                          <li key={idx} className="timeline-item-pedago">
                            <span className="timeline-bullet-pedago">•</span>
                            <span>{event.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="evolution-pedago">
                      <h4>Évolution Technologique:</h4>
                      <p>Ce matériau a remplacé progressivement les aciers au carbone en horlogerie moderne grâce à sa résistance à la corrosion sans traitement de surface obligatoire.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer éducatif */}
        <footer className="footer-pedago">
          <p>🎯 Conçu pour l'apprentissage technique des horlogers - Formation continue</p>
          <p>Version pédagogique 2024 - Basé sur normes ISO/ASTM/EN horlogerie</p>
        </footer>
      </div>

      <style jsx global>{`
        /* Variables thème éducatif */
        :root {
          --primary: #0a0e27;
          --secondary: #1a1f3a;
          --accent: #00d4ff;
          --accent2: #9333ea;
          --success: #10b981;
          --warning: #f59e0b;
          --danger: #ef4444;
          --text: #e4e4e7;
          --text-dim: #a1a1aa;
          --card-bg: rgba(26, 31, 58, 0.6);
          --card-bg-hover: rgba(26, 31, 58, 0.8);
          --border: rgba(255, 255, 255, 0.1);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: var(--primary);
          color: var(--text);
          line-height: 1.6;
        }

        /* Fond animé */
        .bg-animation {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
        }

        .bg-gradient {
          position: absolute;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at 20% 50%, rgba(0, 212, 255, 0.15) 0%, transparent 50%),
                      radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.15) 0%, transparent 50%);
          animation: rotate 20s linear infinite;
        }

        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .grid-overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: 
              linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 50px 50px;
          opacity: 0.5;
        }

        /* Container principal */
        .container-pedago {
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 30px;
          position: relative;
          z-index: 1;
          min-height: 100vh;
        }

        /* Header éducatif */
        .header-pedago {
          padding: 40px 0 30px;
          text-align: center;
          border-bottom: 2px solid var(--border);
          margin-bottom: 30px;
        }

        .logo-pedago {
          font-size: 3em;
          font-weight: 800;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -2px;
        }

        .edu-badge {
          display: inline-block;
          margin-left: 15px;
          padding: 6px 16px;
          background: rgba(0, 212, 255, 0.1);
          border: 1px solid rgba(0, 212, 255, 0.3);
          border-radius: 20px;
          font-size: 0.4em;
          color: var(--accent);
          vertical-align: middle;
        }

        .tagline {
          font-size: 1.1em;
          color: var(--text-dim);
          margin-top: 10px;
        }

        .complexity-selector {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 20px;
        }

        .complexity-btn {
          padding: 8px 20px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border);
          border-radius: 20px;
          color: var(--text-dim);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .complexity-btn.active {
          color: var(--primary);
          font-weight: 800;
        }

        .complexity-btn.active[data-level="apprenti"] {
          background: var(--success);
          border-color: var(--success);
        }
        .complexity-btn.active[data-level="compagnon"] {
          background: var(--warning);
          border-color: var(--warning);
        }
        .complexity-btn.active[data-level="master"] {
          background: var(--danger);
          border-color: var(--danger);
        }

        /* Barre recherche */
        .search-pedago-container {
          display: flex;
          gap: 15px;
          margin-bottom: 30px;
          padding: 20px;
          background: var(--card-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border);
          border-radius: 16px;
        }

        .search-wrapper-pedago {
          flex: 1;
          position: relative;
        }

        .search-input-pedago {
          width: 100%;
          padding: 12px 45px 12px 15px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--text);
          font-size: 1em;
        }

        .search-icon-pedago {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--accent);
        }

        .pedago-tools {
          display: flex;
          gap: 10px;
        }

        .tool-btn-pedago {
          padding: 10px 20px;
          background: rgba(147, 51, 234, 0.1);
          border: 1px solid rgba(147, 51, 234, 0.3);
          border-radius: 8px;
          color: var(--accent2);
          font-weight: 600;
          cursor: pointer;
        }

        /* Dashboard */
        .dashboard-pedago {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .chart-card-pedago, .tips-card-pedago, .quiz-card-pedago {
          background: var(--card-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px;
        }

        .chart-card-pedago h3, .tips-card-pedago h3, .quiz-card-pedago h3 {
          color: var(--accent);
          margin-bottom: 10px;
        }

        .chart-explanation {
          font-size: 0.85em;
          color: var(--text-dim);
          margin-bottom: 15px;
        }

        .tips-list-pedago {
          list-style: none;
        }

        .tips-list-pedago li {
          padding: 8px 0;
          border-bottom: 1px solid var(--border);
          font-size: 0.9em;
        }

        .tips-list-pedago li:last-child {
          border-bottom: none;
        }

        .quiz-preview {
          font-size: 0.9em;
        }

        .quiz-options {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        .quiz-option {
          flex: 1;
          padding: 8px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--text);
          cursor: pointer;
          font-size: 0.85em;
        }

        .quiz-option.correct {
          background: rgba(16, 185, 129, 0.2);
          border-color: var(--success);
        }

        /* Grille matériaux */
        .materials-grid-pedago {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .material-card-pedago {
          background: var(--card-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px;
          transition: all 0.3s;
          cursor: pointer;
        }

        .material-card-pedago:hover {
          transform: translateY(-5px);
          border-color: var(--accent);
        }

        .material-card-pedago.apprenti {
          border-left: 4px solid var(--success);
        }
        .material-card-pedago.compagnon {
          border-left: 4px solid var(--warning);
        }
        .material-card-pedago.master {
          border-left: 4px solid var(--danger);
        }

        .card-header-pedago {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 15px;
        }

        .card-title-pedago {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .material-icon-pedago {
          font-size: 2em;
        }

        .card-title-pedago h3 {
          color: var(--text);
          font-size: 1.3em;
          margin-bottom: 2px;
        }

        .type-pedago {
          color: var(--text-dim);
          font-size: 0.8em;
        }

        .complexity-badge {
          font-size: 1.5em;
        }

        .specs-preview-pedago {
          margin-bottom: 15px;
        }

        .spec-mini-pedago {
          display: flex;
          justify-content: space-between;
          padding: 6px 0;
          border-bottom: 1px solid var(--border);
        }

        .spec-mini-pedago:last-child {
          border-bottom: none;
        }

        .spec-label-pedago {
          font-size: 0.85em;
          color: var(--text-dim);
        }

        .spec-value-pedago {
          font-weight: 600;
          color: var(--text);
        }

        .properties-preview-pedago {
          margin-bottom: 15px;
        }

        .prop-chip-pedago {
          padding: 6px 10px;
          background: rgba(0, 212, 255, 0.1);
          border: 1px solid rgba(0, 212, 255, 0.3);
          border-radius: 6px;
          font-size: 0.8em;
          margin-bottom: 5px;
        }

        .applications-preview-pedago {
          margin-top: 15px;
        }

        .app-label-pedago {
          font-size: 0.8em;
          color: var(--text-dim);
          font-weight: 600;
          margin-bottom: 5px;
          display: block;
        }

        .app-tags-pedago {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }

        .app-tag-pedago {
          padding: 4px 8px;
          background: rgba(147, 51, 234, 0.1);
          border: 1px solid rgba(147, 51, 234, 0.3);
          border-radius: 4px;
          font-size: 0.75em;
          color: var(--accent2);
        }

        /* Modal */
        .modal-overlay-pedago {
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

        .modal-content-pedago {
          max-width: 1200px;
          margin: 20px auto;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
        }

        .modal-header-pedago {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 25px;
          border-bottom: 1px solid var(--border);
        }

        .modal-title-pedago {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .material-icon-lg-pedago {
          font-size: 3em;
        }

        .type-detail-pedago {
          color: var(--text-dim);
        }

        .close-btn-pedago {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border);
          color: var(--text);
          font-size: 1.5em;
          cursor: pointer;
        }

        /* Onglets */
        .tabs-pedago {
          display: flex;
          border-bottom: 1px solid var(--border);
          padding: 0 25px;
        }

        .tab-pedago {
          padding: 15px 25px;
          background: none;
          border: none;
          color: var(--text-dim);
          font-weight: 600;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
        }

        .tab-pedago.active {
          color: var(--accent);
          border-bottom-color: var(--accent);
        }

        .tab-content-pedago {
          padding: 25px;
        }

        /* Sections contenu */
        .fiche-content, .atelier-content, .identification-content, .exercices-content, .history-content {
          animation: fadeIn 0.3s ease-in;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .description-pedago {
          font-size: 1.1em;
          margin-bottom: 25px;
          padding: 20px;
          background: rgba(0, 212, 255, 0.05);
          border-left: 4px solid var(--accent);
          border-radius: 8px;
        }

        .properties-grid-pedago {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
        }

        .section-pedago h3 {
          color: var(--accent);
          margin-bottom: 15px;
          font-size: 1.1em;
        }

        .property-list-pedago {
          list-style: none;
        }

        .property-item-pedago {
          padding: 12px;
          margin-bottom: 10px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 8px;
          border: 1px solid var(--border);
        }

        .property-item-pedago:last-child {
          margin-bottom: 0;
        }

        .prop-header {
          font-size: 0.95em;
          margin-bottom: 5px;
        }

        .prop-application, .prop-explanation {
          margin-top: 5px;
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 0.85em;
        }

        .prop-application {
          background: rgba(16, 185, 129, 0.1);
          border-left: 2px solid var(--success);
        }

        .prop-explanation {
          background: rgba(0, 212, 255, 0.1);
          border-left: 2px solid var(--accent);
        }

        .norms-grid-pedago {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 10px;
        }

        .norm-card-pedago {
          padding: 12px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border);
          border-radius: 6px;
          font-size: 0.85em;
        }

        .norm-card-pedago strong {
          display: block;
          color: var(--text);
          margin-bottom: 3px;
        }

        .norm-card-pedago small {
          color: var(--text-dim);
        }

        /* Section atelier */
        .difficulty-section-pedago {
          margin-bottom: 25px;
        }

        .difficulty-bar-pedago {
          width: 100%;
          height: 10px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 5px;
          overflow: hidden;
        }

        .difficulty-fill-pedago {
          height: 100%;
          background: linear-gradient(90deg, var(--success), var(--warning));
        }

        .guide-card-pedago {
          margin-bottom: 25px;
          padding: 20px;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 12px;
        }

        .guide-card-pedago h4 {
          color: var(--accent);
          margin-bottom: 15px;
        }

        .steps-section-pedago h5, .tools-section-pedago h5, .safety-section-pedago h5, .mistakes-section-pedago h5 {
          margin: 15px 0 10px;
          color: var(--text);
        }

        .steps-list-pedago {
          list-style: none;
          counter-reset: step-counter;
        }

        .steps-list-pedago li {
          counter-increment: step-counter;
          padding: 8px 0;
          padding-left: 20px;
          position: relative;
        }

        .steps-list-pedago li::before {
          content: counter(step-counter) ".";
          position: absolute;
          left: 0;
          color: var(--accent);
          font-weight: 700;
        }

        .tools-tags-pedago {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tool-tag-pedago {
          padding: 6px 12px;
          background: rgba(147, 51, 234, 0.1);
          border: 1px solid rgba(147, 51, 234, 0.3);
          border-radius: 20px;
          font-size: 0.8em;
          color: var(--accent2);
        }

        .safety-list-pedago, .mistakes-list-pedago {
          list-style: none;
          padding-left: 0;
        }

        .safety-list-pedago li {
          padding: 6px 0;
          padding-left: 20px;
          position: relative;
        }

        .safety-list-pedago li::before {
          content: "⚠️";
          position: absolute;
          left: 0;
        }

        .mistakes-list-pedago li {
          padding: 6px 0;
          padding-left: 20px;
          position: relative;
        }

        .mistakes-list-pedago li::before {
          content: "❌";
          position: absolute;
          left: 0;
        }

        .precautions-section-pedago, .heat-treatment-pedago {
          margin-top: 25px;
          padding: 15px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 8px;
        }

        .precautions-list-pedago {
          list-style: none;
        }

        .precautions-list-pedago li {
          padding: 5px 0;
          padding-left: 20px;
          position: relative;
        }

        .precautions-list-pedago li::before {
          content: "⚠️";
          position: absolute;
          left: 0;
        }

        /* Identification */
        .test-section-pedago {
          margin-bottom: 20px;
          padding: 15px;
          background: rgba(0, 212, 255, 0.05);
          border: 1px solid var(--border);
          border-radius: 8px;
        }

        .test-section-pedago h4 {
          color: var(--accent);
          margin-bottom: 10px;
        }

        .color-sample-pedago {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 10px;
        }

        .color-box-pedago {
          width: 30px;
          height: 30px;
          border-radius: 4px;
          border: 1px solid var(--border);
        }

        .troubleshooting-section-pedago {
          margin-top: 25px;
        }

        .issue-card-pedago {
          margin-bottom: 15px;
          padding: 15px;
          background: rgba(0, 0, 0, 0.3);
          border-left: 4px solid var(--danger);
          border-radius: 8px;
        }

        .issue-card-pedago h4 {
          color: var(--danger);
          margin-bottom: 8px;
        }

        /* Exercices */
        .exercises-list-pedago, .projects-list-pedago {
          list-style: none;
        }

        .exercise-item-pedago, .project-item-pedago {
          padding: 10px 0;
          padding-left: 20px;
          position: relative;
          margin-bottom: 5px;
        }

        .exercise-item-pedago::before, .project-item-pedago::before {
          position: absolute;
          left: 0;
          font-weight: 700;
        }

        .exercise-item-pedago::before {
          content: "✍️";
        }

        .project-item-pedago::before {
          content: "🎯";
        }

        .exercise-number, .project-number {
          font-weight: 700;
          color: var(--accent);
          margin-right: 8px;
        }

        .learning-card-pedago {
          margin-bottom: 15px;
          padding: 15px;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 8px;
        }

        .card-question-pedago {
          margin-bottom: 10px;
        }

        .card-answer-pedago {
          padding: 10px;
          background: rgba(16, 185, 129, 0.1);
          border-left: 3px solid var(--success);
          border-radius: 4px;
        }

        .memory-tip-pedago {
          margin-top: 8px;
          padding: 8px;
          background: rgba(147, 51, 234, 0.1);
          border-left: 3px solid var(--accent2);
          border-radius: 4px;
          font-style: italic;
        }

        /* Historique */
        .history-text-pedago {
          padding: 20px;
          background: var(--card-bg);
          border-radius: 8px;
          line-height: 1.8;
        }

        .timeline-pedago {
          margin-top: 20px;
        }

        .timeline-list-pedago {
          list-style: none;
        }

        .timeline-item-pedago {
          display: flex;
          align-items: flex-start;
          padding: 10px 0;
        }

        .timeline-bullet-pedago {
          color: var(--accent);
          font-weight: 700;
          margin-right: 10px;
          margin-top: 2px;
        }

        /* Footer */
        .footer-pedago {
          text-align: center;
          padding: 30px;
          border-top: 1px solid var(--border);
          margin-top: 50px;
          color: var(--text-dim);
          font-size: 0.9em;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .container-pedago {
            padding: 0 15px;
          }
          
          .header-pedago {
            padding: 30px 0 20px;
          }
          
          .logo-pedago {
            font-size: 2em;
          }
          
          .dashboard-pedago {
            grid-template-columns: 1fr;
          }
          
          .properties-grid-pedago {
            grid-template-columns: 1fr;
          }
          
          .tabs-pedago {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </>
  );
}
