"use client";

import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Types pour TypeScript
interface MaterialSpec {
  label: string;
  value: string;
  unit?: string;
}

interface MaterialProperty {
  label: string;
  value: string | number;
  rating?: number; // 1-5 étoiles
}

interface MaterialCost {
  basePrice: number; // €/kg
  processingCost: number; // €/kg
  availability: 'Excellent' | 'Bon' | 'Moyen' | 'Faible';
}

interface MaterialData {
  id: string;
  category: 'metal' | 'acier' | 'alloy' | 'composite';
  type: string;
  title: string;
  icon: string;
  specs: MaterialSpec[];
  quickStats: string[];
  mechanicalProperties: MaterialProperty[];
  physicalProperties: MaterialProperty[];
  horlogerieProperties: MaterialProperty[];
  cost: MaterialCost;
  certifications: string[];
  suppliers: string[];
  description: string;
  applications: string[];
  horlogerieUses: string[];
  treatments: string[];
  norms: string[];
  machinability: number; // 1-10
  weldability: number; // 1-10
  polishability: number; // 1-10
}

export default function HorloLearnPro() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialData | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);
  const [weightCalculator, setWeightCalculator] = useState({ volume: 1, density: 8.5 });
  const [costCalculator, setCostCalculator] = useState({ weight: 1, material: 'acier' });

  const materials: MaterialData[] = [
    {
      id: '316l',
      category: 'acier',
      type: 'Acier Inoxydable',
      title: '316L',
      icon: '⚙️',
      specs: [
        { label: 'Masse volumique', value: '8.0', unit: 'Kg/dm³' },
        { label: 'Point de fusion', value: '1400-1450', unit: '°C' },
        { label: 'Limite élastique', value: '200', unit: 'MPa' },
        { label: 'Résistance traction', value: '500', unit: 'MPa' },
        { label: 'Dureté Brinell', value: '140-180', unit: 'HB' }
      ],
      quickStats: ['18% Cr', '14% Ni', '3% Mo', 'A4'],
      mechanicalProperties: [
        { label: 'Résistance à la traction', value: 500, rating: 4 },
        { label: 'Ductilité', value: 'Excellent', rating: 5 },
        { label: 'Résistance fatigue', value: 'Très bon', rating: 4 }
      ],
      physicalProperties: [
        { label: 'Conductivité thermique', value: '15 W/m·K', rating: 3 },
        { label: 'Coefficient dilatation', value: '16×10⁻⁶/°C', rating: 4 },
        { label: 'Résistance corrosion', value: 'Excellent', rating: 5 }
      ],
      horlogerieProperties: [
        { label: 'Usinabilité', value: 8, rating: 4 },
        { label: 'Polissabilité', value: 9, rating: 5 },
        { label: 'Magnétisme', value: 'Faible', rating: 4 }
      ],
      cost: {
        basePrice: 12.5,
        processingCost: 8.2,
        availability: 'Excellent'
      },
      certifications: ['ISO 9001', 'ASTM A240', 'EN 10088-3', 'RoHS'],
      suppliers: ['Acerinox', 'Outokumpu', 'ThyssenKrupp'],
      description: 'Acier inoxydable austénitique de haute qualité, spécialement conçu pour la bijouterie et l\'horlogerie. Excellent compromis entre résistance à la corrosion, facilité d\'usinage et esthétique.',
      applications: ['Boîtiers de montres de luxe', 'Bracelets', 'Couronnes', 'Fond de boîtier'],
      horlogerieUses: [
        'Boîtiers de plongée (100m+)',
        'Bracelets Oyster et Jubilee',
        'Couronnes vissées',
        'Fonds de boîtier transparents',
        'Carters de mouvement'
      ],
      treatments: ['Passivation', 'Polissage miroir', 'Brossage', 'Sablage', 'PVD (TiN, DLC)'],
      norms: ['EN 1.4404', 'ASTM F138', 'ISO 5832-1'],
      machinability: 8,
      weldability: 9,
      polishability: 9
    },
    {
      id: '904l',
      category: 'acier',
      type: 'Acier Inoxydable Super',
      title: '904L',
      icon: '💎',
      specs: [
        { label: 'Masse volumique', value: '8.24', unit: 'Kg/dm³' },
        { label: 'Point de fusion', value: '1350-1400', unit: '°C' },
        { label: 'Limite élastique', value: '220', unit: 'MPa' },
        { label: 'Résistance traction', value: '490', unit: 'MPa' },
        { label: 'Dureté Brinell', value: '150-190', unit: 'HB' }
      ],
      quickStats: ['Rolex', 'Super austénitique', 'Cu 25%', '20% Cr'],
      mechanicalProperties: [
        { label: 'Résistance à la traction', value: 490, rating: 4 },
        { label: 'Ductilité', value: 'Excellent', rating: 5 },
        { label: 'Résistance usure', value: 'Très bon', rating: 4 }
      ],
      physicalProperties: [
        { label: 'Conductivité thermique', value: '12 W/m·K', rating: 3 },
        { label: 'Coefficient dilatation', value: '15×10⁻⁶/°C', rating: 4 },
        { label: 'Résistance corrosion', value: 'Supérieure', rating: 5 }
      ],
      horlogerieProperties: [
        { label: 'Usinabilité', value: 6, rating: 3 },
        { label: 'Polissabilité', value: 9, rating: 5 },
        { label: 'Finition', value: 'Exceptionnelle', rating: 5 }
      ],
      cost: {
        basePrice: 45.0,
        processingCost: 15.5,
        availability: 'Bon'
      },
      certifications: ['ASTM B677', 'EN 10088-3', 'RoHS'],
      suppliers: ['VDM Metals', 'Nippon Steel', 'Rolex'],
      description: 'Acier inoxydable super-austénitique premium, utilisé exclusivement par Rolex. Excellente résistance à la corrosion en milieux chlorés, mais plus difficile à usiner.',
      applications: ['Montres de luxe haut de gamme', 'Boîtiers professionnels'],
      horlogerieUses: [
        'Boîtiers Rolex (Submariner, GMT-Master II)',
        'Bracelets Oyster robustes',
        'Pièces en contact avec l\'eau de mer'
      ],
      treatments: ['Polissage miroir spécial', 'Brossage à la main', 'Traitement anti-rayures'],
      norms: ['EN 1.4539', 'UNS N08904'],
      machinability: 6,
      weldability: 8,
      polishability: 10
    }
  ];

  // Données pour les graphiques
  const corrosionData = materials.map(m => ({
    name: m.title,
    corrosion: m.physicalProperties.find(p => p.label === 'Résistance corrosion')?.rating || 0
  }));

  const machinabilityData = materials.map(m => ({
    name: m.title,
    machinability: m.machinability
  }));

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleComparison = (materialId: string) => {
    setSelectedForComparison(prev => 
      prev.includes(materialId) 
        ? prev.filter(id => id !== materialId)
        : [...prev, materialId]
    );
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
        material.horlogerieUses.some(use => use.toLowerCase().includes(searchLower))
      );
    });
  }, [activeFilter, searchTerm]);

  return (
    <>
      <div className="bg-animation">
        <div className="bg-gradient"></div>
        <div className="grid-overlay"></div>
      </div>

      <div className="container">
        {/* Header Pro */}
        <header className="header-pro">
          <div className="brand-section">
            <h1 className="logo">HORLOLEARN PRO</h1>
            <p className="subtitle">Base de Données Technique des Matériaux Horlogers</p>
          </div>
          <div className="pro-badges">
            <span className="pro-badge certif">CERTIFIÉ</span>
            <span className="pro-badge norm">NORMES EN</span>
            <span className="pro-badge iso">ISO 9001</span>
          </div>
        </header>

        {/* Barre d'outils pro */}
        <div className="pro-toolbar">
          <div className="search-container">
            <div className="search-wrapper">
              <input
                type="text"
                className="search-input"
                placeholder="Rechercher par propriété, norme, fournisseur..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>
          <div className="tool-buttons">
            <button className="tool-btn" onClick={() => setShowComparison(!showComparison)}>
              📊 Comparaison ({selectedForComparison.length})
            </button>
            <button className="tool-btn">
              📥 Exporter PDF
            </button>
            <button className="tool-btn">
              ⚙️ Paramètres
            </button>
          </div>
        </div>

        {/* Filtres avancés */}
        <div className="advanced-filters">
          <div className="filter-group">
            <label>Catégorie</label>
            <div className="filter-buttons">
              {['all', 'metal', 'acier', 'alloy'].map(filter => (
                <button
                  key={filter}
                  className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => handleFilterClick(filter)}
                >
                  {filter === 'all' ? 'Tous' : filter === 'metal' ? 'Métaux' : filter === 'acier' ? 'Aciers' : 'Alliages'}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <label>Propriétés</label>
            <select className="filter-select">
              <option>Résistance corrosion ≥ 4★</option>
              <option>Usinabilité ≥ 7/10</option>
              <option>Prix ≤ 20€/kg</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Normes</label>
            <select className="filter-select">
              <option>ISO 9001</option>
              <option>ASTM</option>
              <option>EN 10088</option>
            </select>
          </div>
        </div>

        {/* Tableau de bord */}
        <div className="dashboard-grid">
          {/* Graphique corrosion */}
          <div className="chart-card">
            <h3>Comparaison Résistance Corrosion</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={corrosionData}>
                <CartesianGrid stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} />
                <YAxis stroke="#a1a1aa" />
                <Tooltip contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }} />
                <Bar dataKey="corrosion" fill="url(#corrosionGradient)" />
                <defs>
                  <linearGradient id="corrosionGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" />
                    <stop offset="100%" stopColor="var(--accent2)" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Graphique usinabilité */}
          <div className="chart-card">
            <h3>Usinabilité (1-10)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={machinabilityData}>
                <CartesianGrid stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#a1a1aa" fontSize={11} angle={-45} textAnchor="end" />
                <YAxis stroke="#a1a1aa" />
                <Tooltip contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }} />
                <Line type="monotone" dataKey="machinability" stroke="var(--accent)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Calculateur de poids */}
          <div className="calculator-card">
            <h3>Calculateur de Poids</h3>
            <div className="calc-inputs">
              <div className="calc-group">
                <label>Volume (cm³)</label>
                <input 
                  type="number" 
                  value={weightCalculator.volume}
                  onChange={(e) => setWeightCalculator({...weightCalculator, volume: Number(e.target.value)})}
                />
              </div>
              <div className="calc-group">
                <label>Densité (Kg/dm³)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={weightCalculator.density}
                  onChange={(e) => setWeightCalculator({...weightCalculator, density: Number(e.target.value)})}
                />
              </div>
              <div className="calc-result">
                Poids: {(weightCalculator.volume * weightCalculator.density / 1000).toFixed(2)} kg
              </div>
            </div>
          </div>

          {/* Indicateurs clés */}
          <div className="kpis-card">
            <h3>Statistiques Base</h3>
            <div className="kpi-grid">
              <div className="kpi-item">
                <div className="kpi-value">{materials.length}</div>
                <div className="kpi-label">Matériaux référencés</div>
              </div>
              <div className="kpi-item">
                <div className="kpi-value">124</div>
                <div className="kpi-label">Propriétés mesurées</div>
              </div>
              <div className="kpi-item">
                <div className="kpi-value">98%</div>
                <div className="kpi-label">Certifications</div>
              </div>
            </div>
          </div>
        </div>

        {/* Grille des matériaux */}
        <div className="materials-grid">
          {filteredMaterials.map((material) => (
            <div
              key={material.id}
              className={`material-card-pro ${selectedForComparison.includes(material.id) ? 'selected' : ''}`}
              onClick={() => selectedForComparison.includes(material.id) ? toggleComparison(material.id) : setSelectedMaterial(material)}
            >
              <div className="card-header-pro">
                <div className="card-title-section">
                  <span className="material-icon-pro">{material.icon}</span>
                  <div>
                    <h3 className="material-title-pro">{material.title}</h3>
                    <div className="material-type-pro">{material.type}</div>
                  </div>
                </div>
                <div className="card-actions">
                  {showComparison && (
                    <button 
                      className="compare-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleComparison(material.id);
                      }}
                    >
                      {selectedForComparison.includes(material.id) ? '✓' : '+'}
                    </button>
                  )}
                </div>
              </div>

              <div className="specs-grid-pro">
                {material.specs.slice(0, 4).map((spec, idx) => (
                  <div key={idx} className="spec-item-pro">
                    <div className="spec-label-pro">{spec.label}</div>
                    <div className="spec-value-pro">{spec.value} {spec.unit}</div>
                  </div>
                ))}
              </div>

              <div className="quick-stats-pro">
                {material.quickStats.map((stat, idx) => (
                  <span key={idx} className="stat-badge-pro">{stat}</span>
                ))}
              </div>

              <div className="ratings-section">
                <div className="rating-item">
                  <span>Usinabilité</span>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(material.machinability / 2) ? 'star filled' : 'star'}>★</span>
                    ))}
                  </div>
                </div>
                <div className="rating-item">
                  <span>Polissage</span>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < material.polishability / 2 ? 'star filled' : 'star'}>★</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="cost-section">
                <div className="price">
                  <span className="price-label">Prix indicatif</span>
                  <span className="price-value">{material.cost.basePrice.toFixed(2)} €/kg</span>
                </div>
                <div className={`availability ${material.cost.availability.toLowerCase()}`}>
                  {material.cost.availability}
                </div>
              </div>

              <div className="certifs-list">
                {material.certifications.slice(0, 3).map((cert, idx) => (
                  <span key={idx} className="certif-tag">{cert}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Modale de détails */}
        {selectedMaterial && (
          <div className="modal-overlay" onClick={() => setSelectedMaterial(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-title-section">
                  <span className="material-icon-pro">{selectedMaterial.icon}</span>
                  <div>
                    <h2>{selectedMaterial.title}</h2>
                    <div className="material-type-pro">{selectedMaterial.type}</div>
                  </div>
                </div>
                <button className="close-btn" onClick={() => setSelectedMaterial(null)}>✕</button>
              </div>

              <div className="modal-body">
                <div className="tabs">
                  <button className="tab active">Fiche Technique</button>
                  <button className="tab">Propriétés</button>
                  <button className="tab">Applications</button>
                  <button className="tab">Fournisseurs</button>
                </div>

                <div className="tab-content">
                  {/* Fiche technique complète */}
                  <div className="tech-sheet">
                    <div className="section-group">
                      <h3>Caractéristiques Mécaniques</h3>
                      <table className="tech-table">
                        <thead>
                          <tr>
                            <th>Propriété</th>
                            <th>Valeur</th>
                            <th>Unité</th>
                            <th>Norme</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedMaterial.specs.map((spec, idx) => (
                            <tr key={idx}>
                              <td>{spec.label}</td>
                              <td>{spec.value}</td>
                              <td>{spec.unit || '-'}</td>
                              <td>{selectedMaterial.norms[0] || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="section-group">
                      <h3>Traitements de Surface Recommandés</h3>
                      <div className="treatments-grid">
                        {selectedMaterial.treatments.map((treatment, idx) => (
                          <div key={idx} className="treatment-card">
                            <h4>{treatment}</h4>
                            <p>Traitement professionnel recommandé pour applications horlogères</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="section-group">
                      <h3>Applications Spécifiques Horlogerie</h3>
                      <ul className="detailed-list">
                        {selectedMaterial.horlogerieUses.map((use, idx) => (
                          <li key={idx}>
                            <strong>{use.split(':')[0]}:</strong> {use.split(':')[1]}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="section-group">
                      <h3>Fournisseurs Agréés</h3>
                      <div className="suppliers-list">
                        {selectedMaterial.suppliers.map((supplier, idx) => (
                          <div key={idx} className="supplier-card">
                            <h4>{supplier}</h4>
                            <button className="supplier-btn">Contacter</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mode comparaison */}
        {showComparison && selectedForComparison.length > 0 && (
          <div className="comparison-panel">
            <h3>Comparaison Materiaux ({selectedForComparison.length})</h3>
            <button onClick={() => setShowComparison(false)}>Fermer</button>
            <div className="comparison-content">
              {/* Tableau comparatif détaillé */}
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        /* Styles globaux - thème sombre pro */
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

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: var(--primary);
          color: var(--text);
          overflow-x: hidden;
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

        .container {
          max-width: 1800px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
          z-index: 1;
        }

        /* Header Pro */
        .header-pro {
          padding: 60px 0 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border);
          margin-bottom: 30px;
        }

        .brand-section .logo {
          font-size: 3em;
          font-weight: 800;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -2px;
        }

        .pro-badges {
          display: flex;
          gap: 12px;
        }

        .pro-badge {
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.75em;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .pro-badge.certif {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: var(--success);
        }

        .pro-badge.norm {
          background: rgba(147, 51, 234, 0.1);
          border: 1px solid rgba(147, 51, 234, 0.3);
          color: var(--accent2);
        }

        .pro-badge.iso {
          background: rgba(0, 212, 255, 0.1);
          border: 1px solid rgba(0, 212, 255, 0.3);
          color: var(--accent);
        }

        /* Toolbar Pro */
        .pro-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding: 20px;
          background: var(--card-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border);
          border-radius: 16px;
        }

        .tool-buttons {
          display: flex;
          gap: 12px;
        }

        .tool-btn {
          padding: 10px 20px;
          background: rgba(0, 212, 255, 0.1);
          border: 1px solid rgba(0, 212, 255, 0.3);
          border-radius: 8px;
          color: var(--accent);
          font-weight: 600;
          font-size: 0.9em;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tool-btn:hover {
          background: rgba(0, 212, 255, 0.2);
          transform: translateY(-2px);
        }

        /* Filtres avancés */
        .advanced-filters {
          display: flex;
          gap: 30px;
          margin-bottom: 40px;
          padding: 20px;
          background: var(--card-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border);
          border-radius: 16px;
        }

        .filter-group {
          flex: 1;
        }

        .filter-group label {
          display: block;
          font-size: 0.8em;
          font-weight: 700;
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }

        .filter-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 8px 16px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border);
          border-radius: 20px;
          color: var(--text);
          font-size: 0.8em;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-btn.active {
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          border-color: transparent;
          color: white;
        }

        .filter-select {
          width: 100%;
          padding: 10px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--text);
          font-size: 0.9em;
        }

        /* Dashboard */
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .chart-card, .calculator-card, .kpis-card {
          background: var(--card-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px;
        }

        .chart-card h3, .calculator-card h3, .kpis-card h3 {
          font-size: 1.1em;
          font-weight: 700;
          color: var(--accent);
          margin-bottom: 16px;
        }

        .calc-inputs {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .calc-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .calc-group label {
          font-size: 0.8em;
          color: var(--text-dim);
          font-weight: 600;
        }

        .calc-group input {
          padding: 8px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--text);
          font-size: 0.9em;
        }

        .calc-result {
          padding: 12px;
          background: rgba(0, 212, 255, 0.1);
          border: 1px solid rgba(0, 212, 255, 0.3);
          border-radius: 8px;
          font-weight: 700;
          color: var(--accent);
          text-align: center;
          margin-top: 8px;
        }

        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .kpi-item {
          text-align: center;
          padding: 16px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 8px;
          border: 1px solid var(--border);
        }

        .kpi-value {
          font-size: 2em;
          font-weight: 800;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .kpi-label {
          font-size: 0.75em;
          color: var(--text-dim);
          font-weight: 600;
          margin-top: 4px;
        }

        /* Grille matériaux */
        .materials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 24px;
          margin-bottom: 60px;
        }

        .material-card-pro {
          background: var(--card-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 28px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
        }

        .material-card-pro:hover {
          transform: translateY(-6px);
          border-color: var(--accent);
          box-shadow: 0 20px 60px rgba(0, 212, 255, 0.2);
        }

        .material-card-pro.selected {
          border-color: var(--accent);
          background: rgba(0, 212, 255, 0.1);
        }

        .card-header-pro {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }

        .card-title-section {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .material-icon-pro {
          font-size: 2.5em;
        }

        .material-title-pro {
          font-size: 1.6em;
          font-weight: 800;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .material-type-pro {
          font-size: 0.8em;
          color: var(--text-dim);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .compare-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: rgba(0, 0, 0, 0.3);
          color: var(--text);
          cursor: pointer;
          font-size: 1.2em;
          transition: all 0.2s;
        }

        .compare-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
        }

        .specs-grid-pro {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 20px;
        }

        .spec-item-pro {
          background: rgba(0, 0, 0, 0.3);
          padding: 12px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.2s;
        }

        .spec-item-pro:hover {
          border-color: var(--accent);
        }

        .spec-label-pro {
          font-size: 0.7em;
          color: var(--text-dim);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 4px;
          font-weight: 600;
        }

        .spec-value-pro {
          font-size: 1.1em;
          font-weight: 700;
          color: var(--text);
        }

        .quick-stats-pro {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .stat-badge-pro {
          padding: 4px 10px;
          background: rgba(0, 212, 255, 0.1);
          border: 1px solid rgba(0, 212, 255, 0.3);
          border-radius: 20px;
          font-size: 0.7em;
          color: var(--accent);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .ratings-section {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          padding: 12px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 8px;
        }

        .rating-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .rating-item span {
          font-size: 0.7em;
          color: var(--text-dim);
          font-weight: 600;
        }

        .stars {
          display: flex;
          gap: 2px;
        }

        .star {
          color: rgba(255, 255, 255, 0.2);
          font-size: 1em;
        }

        .star.filled {
          color: #fbbf24;
        }

        .cost-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 8px;
          margin-bottom: 16px;
        }

        .price-label {
          font-size: 0.7em;
          color: var(--text-dim);
          font-weight: 600;
        }

        .price-value {
          font-size: 1.2em;
          font-weight: 800;
          color: var(--accent);
        }

        .availability {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.7em;
          font-weight: 700;
          text-transform: uppercase;
        }

        .availability.excellent {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: var(--success);
        }

        .availability.bon {
          background: rgba(0, 212, 255, 0.1);
          border: 1px solid rgba(0, 212, 255, 0.3);
          color: var(--accent);
        }

        .certifs-list {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .certif-tag {
          padding: 3px 8px;
          background: rgba(147, 51, 234, 0.1);
          border: 1px solid rgba(147, 51, 234, 0.3);
          border-radius: 4px;
          font-size: 0.6em;
          color: var(--accent2);
          font-weight: 700;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }

        .modal-content {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 20px;
          max-width: 1200px;
          max-height: 90vh;
          overflow-y: auto;
          width: 100%;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid var(--border);
        }

        .modal-title-section {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .close-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: rgba(0, 0, 0, 0.3);
          color: var(--text);
          cursor: pointer;
          font-size: 1.4em;
          transition: all 0.2s;
        }

        .close-btn:hover {
          border-color: var(--danger);
          color: var(--danger);
        }

        .tabs {
          display: flex;
          border-bottom: 1px solid var(--border);
        }

        .tab {
          padding: 12px 24px;
          background: none;
          border: none;
          color: var(--text-dim);
          font-weight: 600;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
        }

        .tab.active {
          color: var(--accent);
          border-bottom-color: var(--accent);
        }

        .tab-content {
          padding: 24px;
        }

        .section-group {
          margin-bottom: 32px;
        }

        .section-group h3 {
          font-size: 1.2em;
          font-weight: 700;
          color: var(--accent);
          margin-bottom: 16px;
        }

        .tech-table {
          width: 100%;
          border-collapse: collapse;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 8px;
          overflow: hidden;
        }

        .tech-table th,
        .tech-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid var(--border);
        }

        .tech-table th {
          background: rgba(0, 212, 255, 0.1);
          font-weight: 700;
          color: var(--accent);
          font-size: 0.8em;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .tech-table td {
          color: var(--text-dim);
          font-size: 0.9em;
        }

        .treatments-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
        }

        .treatment-card {
          padding: 16px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border);
          border-radius: 8px;
          transition: all 0.2s;
        }

        .treatment-card:hover {
          border-color: var(--accent);
        }

        .treatment-card h4 {
          font-size: 0.9em;
          color: var(--text);
          margin-bottom: 6px;
        }

        .treatment-card p {
          font-size: 0.8em;
          color: var(--text-dim);
          line-height: 1.4;
        }

        .detailed-list {
          list-style: none;
        }

        .detailed-list li {
          padding: 8px 0;
          border-bottom: 1px solid var(--border);
          font-size: 0.9em;
        }

        .detailed-list li:last-child {
          border-bottom: none;
        }

        .suppliers-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
        }

        .supplier-card {
          padding: 20px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border);
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .supplier-card h4 {
          font-size: 1em;
          color: var(--text);
        }

        .supplier-btn {
          padding: 8px 16px;
          background: var(--accent);
          border: none;
          border-radius: 6px;
          color: white;
          font-weight: 600;
          cursor: pointer;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .container {
              padding: 0 20px;
          }
          
          .materials-grid {
              grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          }
          
          .advanced-filters {
              flex-direction: column;
          }
        }

        @media (max-width: 768px) {
          .header-pro {
              flex-direction: column;
              gap: 20px;
          }
          
          .pro-toolbar {
              flex-direction: column;
              gap: 16px;
          }
          
          .kpi-grid {
              grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
