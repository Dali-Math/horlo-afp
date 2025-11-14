'use client';

import React, { useState } from 'react';
import { Calculator, Settings, Info, HelpCircle, Wrench, Cog, Database, FileText, BarChart3, Clock, Zap, Gauge, Target, Compass, BookOpen, Ruler, Music, Activity, Thermometer, Atom, Layers, Microscope, Award, TrendingUp, Search, Filter, Star, ChevronRight, Home, Menu, X } from 'lucide-react';

// Composant de démonstration pour les outils (remplacez par vos vrais composants)
const ToolPlaceholder = ({ name }) => (
  <div className="p-8 text-center text-slate-400">
    <p className="text-lg">Composant: {name}</p>
    <p className="text-sm mt-2">Intégrez vos composants réels ici</p>
  </div>
);

// Base de données des métaux du PDF
const metauxDatabase = {
  communs: [
    {
      id: 'fer',
      nom: 'Fer',
      symbole: 'Fe',
      masseVolumique: 7.86,
      pointFusion: 1535,
      couleur: 'Blanc-gris',
      proprietes: ['Mou', 'Ductile', 'Malléable', 'Magnétisable', 'Bon conducteur'],
      utilisations: ['Armes', 'Outils', 'Fer forgé', 'Chemins de fer', 'Carrosseries'],
      category: 'commun'
    },
    {
      id: 'chrome',
      nom: 'Chrome',
      symbole: 'Cr',
      masseVolumique: 7.2,
      pointFusion: 1857,
      couleur: 'Blanc bleuté',
      proprietes: ['Très dur', 'Résistant à l\'usure', 'Inoxydable', 'Résistant à la corrosion'],
      utilisations: ['Acier inoxydable 18-10', 'Ustensiles de cuisine', 'Installations chimiques'],
      category: 'commun'
    },
    {
      id: 'aluminium',
      nom: 'Aluminium',
      symbole: 'Al',
      masseVolumique: 2.702,
      pointFusion: 660,
      couleur: 'Blanc argenté',
      proprietes: ['Léger', 'Résistant à la corrosion', 'Malléable', 'Non magnétique', '100% recyclable'],
      utilisations: ['Machines outils', 'Toiture', 'Emballage', 'Aérosol'],
      category: 'commun'
    },
    {
      id: 'titane',
      nom: 'Titane',
      symbole: 'Ti',
      masseVolumique: 4.54,
      pointFusion: 1660,
      couleur: 'Gris métallique',
      proprietes: ['Léger', 'Résistance élevée', 'Amagnétique', 'Excellente résistance à la corrosion'],
      utilisations: ['Aviation', 'Astronautique', 'Horlogerie', 'Bijouterie', 'Médecine'],
      category: 'commun',
      horlogerie: '45% plus léger que l\'acier'
    },
    {
      id: 'nickel',
      nom: 'Nickel',
      symbole: 'Ni',
      masseVolumique: 8.906,
      pointFusion: 1455,
      couleur: 'Blanc argenté',
      proprietes: ['Ductile', 'Malléable', 'Très dur', 'Ferromagnétique', 'Résistant à la corrosion'],
      utilisations: ['Pièces de monnaie', 'Ustensiles de cuisine', 'Alliage Invar'],
      category: 'commun',
      horlogerie: 'Invar (36% Ni) - ressorts spiral, balancier'
    },
    {
      id: 'cuivre',
      nom: 'Cuivre',
      symbole: 'Cu',
      masseVolumique: 8.92,
      pointFusion: 1083,
      couleur: 'Rouge-orange',
      proprietes: ['Meilleur conducteur après l\'argent', 'Non-magnétique', 'Très malléable', 'Ductile'],
      utilisations: ['Fil électrique', 'Bobinage moteurs', 'Toiture', 'Tuyauteries'],
      category: 'commun'
    },
    {
      id: 'zinc',
      nom: 'Zinc',
      symbole: 'Zn',
      masseVolumique: 7.14,
      pointFusion: 419.5,
      couleur: 'Gris-bleu',
      proprietes: ['Cassant à froid', 'Se moule bien', 'Inoxydable à froid'],
      utilisations: ['Galvanisation', 'Piquets de barrière', 'Lampadaires'],
      category: 'commun'
    },
    {
      id: 'etain',
      nom: 'Étain',
      symbole: 'Sn',
      masseVolumique: 7.28,
      pointFusion: 231.9,
      couleur: 'Blanc argenté',
      proprietes: ['Mou', 'Très malléable', 'Inoxydable à l\'air', 'Bon conducteur'],
      utilisations: ['Étamage', 'Soudage électronique', 'Industrie chimique'],
      category: 'commun'
    },
    {
      id: 'tungstene',
      nom: 'Tungstène',
      symbole: 'W',
      masseVolumique: 19.35,
      pointFusion: 3410,
      couleur: 'Gris acier',
      proprietes: ['Très dur', 'Ductile mais fragile', 'Température de fusion la plus élevée'],
      utilisations: ['Outils de coupe', 'Aciers rapides', 'Soudage TIG'],
      category: 'commun',
      horlogerie: 'Carrures et lunettes de luxe'
    },
    {
      id: 'plomb',
      nom: 'Plomb',
      symbole: 'Pb',
      masseVolumique: 11.34,
      pointFusion: 327.5,
      couleur: 'Gris bleuâtre',
      proprietes: ['Très mou', 'Très malléable', 'Ductile', 'Toxique'],
      utilisations: ['Munition', 'Protection rayons X', 'Toitures'],
      category: 'commun'
    }
  ],
  alliages: [
    {
      id: 'laiton',
      nom: 'Laiton',
      composition: 'Cu (58%) + Zn (39%) + Pb (3%)',
      masseVolumique: '8.5-8.8',
      pointFusion: '900-980',
      couleur: 'Jaune doré',
      proprietes: ['Bonne résistance à la corrosion', 'Ductile', 'Malléable', 'Bonne conductivité'],
      utilisations: ['Boîtes de montre', 'Pièces de mouvement', 'Douilles', 'Robinetterie'],
      category: 'alliage',
      horlogerie: 'Platines, ponts, roues de minuterie, leviers'
    },
    {
      id: 'bronze',
      nom: 'Bronze',
      composition: 'Cu (95%) + Sn (2-10%)',
      masseVolumique: '8.7-8.8',
      pointFusion: '~1000',
      couleur: 'Brun-rouge',
      proprietes: ['Bonne résistance à la corrosion', 'Facile à travailler', 'Non-magnétique'],
      utilisations: ['Œuvres d\'art', 'Robinetterie', 'Cloches', 'Roues dentées', 'Ressorts'],
      category: 'alliage',
      horlogerie: 'Platines haut de gamme, composants gravés'
    },
    {
      id: 'maillechort',
      nom: 'Maillechort',
      composition: 'Cu (50-60%) + Zn (15-40%) + Ni (5-30%)',
      couleur: 'Blanc argenté',
      proprietes: ['Très résistant à la corrosion', 'Malléable', 'Ductile', 'Inaltérable'],
      utilisations: ['Pointes stylos', 'Instruments musique', 'Brucelles'],
      category: 'alliage',
      horlogerie: 'Pièces de mouvement, montres artisanales'
    }
  ],
  aciers: [
    {
      id: 'acier-carbone',
      nom: 'Acier au Carbone',
      composition: 'Fe + C (0.02-2%)',
      types: ['Type S - usage général', 'Type P - appareils à pression', 'Type L - tubes', 'Type E - construction mécanique'],
      category: 'acier',
      horlogerie: 'Boîtiers, bracelets, aiguilles, ressorts, axes, vis'
    },
    {
      id: 'acier-inox',
      nom: 'Acier Inoxydable',
      composition: 'Fe + Cr (12-25%) + Ni/Mo',
      proprietes: ['Résistance à la corrosion', 'Non-magnétique', 'Excellent polissage', 'Bonne usinabilité'],
      category: 'acier',
      horlogerie: 'Boîtiers classiques, sportifs, plongée (Rolex, Omega)'
    }
  ]
};

// Composant Guide des Métaux
const GuideMetaux = () => {
  const [selectedCategory, setSelectedCategory] = useState('tous');
  const [selectedMetal, setSelectedMetal] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'tous', label: 'Tous les métaux', icon: Layers },
    { id: 'commun', label: 'Métaux communs', icon: Atom },
    { id: 'alliage', label: 'Alliages', icon: Microscope },
    { id: 'acier', label: 'Aciers', icon: Award }
  ];

  const getAllMetals = () => {
    return [...metauxDatabase.communs, ...metauxDatabase.alliages, ...metauxDatabase.aciers];
  };

  const filteredMetals = getAllMetals().filter(metal => {
    const matchesCategory = selectedCategory === 'tous' || metal.category === selectedCategory;
    const matchesSearch = metal.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (metal.symbole && metal.symbole.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="h-full flex flex-col">
      {/* Header avec recherche */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-amber-500/20 p-3 rounded-lg">
            <Atom className="w-8 h-8 text-amber-500" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Guide des Métaux en Horlogerie</h3>
            <p className="text-slate-400">Base de données complète des matériaux horlogers</p>
          </div>
        </div>

        {/* Barre de recherche */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher un métal ou alliage..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Catégories */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => {
            const IconComponent = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-white shadow-lg'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Liste et détails */}
      <div className="flex-1 flex overflow-hidden">
        {/* Liste des métaux */}
        <div className="w-1/3 border-r border-slate-700 overflow-y-auto">
          <div className="p-4 space-y-2">
            {filteredMetals.map(metal => (
              <button
                key={metal.id}
                onClick={() => setSelectedMetal(metal)}
                className={`w-full text-left p-4 rounded-lg transition-all ${
                  selectedMetal?.id === metal.id
                    ? 'bg-amber-500/20 border-2 border-amber-500'
                    : 'bg-slate-700 hover:bg-slate-600 border-2 border-transparent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white flex items-center gap-2">
                      {metal.nom}
                      {metal.symbole && (
                        <span className="text-xs bg-slate-600 px-2 py-0.5 rounded">
                          {metal.symbole}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-slate-400 mt-1">
                      {metal.composition || metal.couleur}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
                {metal.horlogerie && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-amber-400">
                    <Star className="w-3 h-3" />
                    <span>Application horlogère</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Détails du métal sélectionné */}
        <div className="flex-1 overflow-y-auto">
          {selectedMetal ? (
            <div className="p-6">
              <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-6 mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {selectedMetal.nom}
                      {selectedMetal.symbole && (
                        <span className="ml-3 text-xl text-amber-400">({selectedMetal.symbole})</span>
                      )}
                    </h3>
                    {selectedMetal.composition && (
                      <p className="text-slate-300">{selectedMetal.composition}</p>
                    )}
                  </div>
                  <div className="bg-amber-500 px-4 py-2 rounded-lg">
                    <span className="text-white font-semibold capitalize">{selectedMetal.category}</span>
                  </div>
                </div>

                {/* Caractéristiques physiques */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {selectedMetal.masseVolumique && (
                    <div className="bg-slate-800/50 p-4 rounded-lg">
                      <div className="text-slate-400 text-sm mb-1">Masse volumique</div>
                      <div className="text-white text-xl font-bold">{selectedMetal.masseVolumique} kg/dm³</div>
                    </div>
                  )}
                  {selectedMetal.pointFusion && (
                    <div className="bg-slate-800/50 p-4 rounded-lg">
                      <div className="text-slate-400 text-sm mb-1">Point de fusion</div>
                      <div className="text-white text-xl font-bold">{selectedMetal.pointFusion}°C</div>
                    </div>
                  )}
                  {selectedMetal.couleur && (
                    <div className="bg-slate-800/50 p-4 rounded-lg col-span-2">
                      <div className="text-slate-400 text-sm mb-1">Couleur</div>
                      <div className="text-white text-lg font-semibold">{selectedMetal.couleur}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Propriétés */}
              {selectedMetal.proprietes && (
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Microscope className="w-5 h-5 text-amber-500" />
                    Propriétés
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedMetal.proprietes.map((prop, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-slate-700 p-3 rounded-lg">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span className="text-slate-300">{prop}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Applications en horlogerie */}
              {selectedMetal.horlogerie && (
                <div className="mb-6 bg-amber-500/10 border-2 border-amber-500/30 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-amber-400 mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Application Horlogère Spéciale
                  </h4>
                  <p className="text-white text-lg">{selectedMetal.horlogerie}</p>
                </div>
              )}

              {/* Utilisations */}
              {selectedMetal.utilisations && (
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-amber-500" />
                    Utilisations
                  </h4>
                  <div className="bg-slate-700 rounded-lg p-4">
                    <ul className="space-y-2">
                      {selectedMetal.utilisations.map((util, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-300">
                          <ChevronRight className="w-4 h-4 mt-1 text-amber-500 flex-shrink-0" />
                          <span>{util}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Types (pour aciers) */}
              {selectedMetal.types && (
                <div>
                  <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-amber-500" />
                    Types
                  </h4>
                  <div className="space-y-2">
                    {selectedMetal.types.map((type, idx) => (
                      <div key={idx} className="bg-slate-700 p-4 rounded-lg text-slate-300">
                        {type}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400">
              <div className="text-center">
                <Atom className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Sélectionnez un métal pour voir ses détails</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Composant Tableau Comparatif
const TableauComparatif = () => {
  return (
    <div className="p-6 overflow-auto">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Tableau Comparatif des Matériaux</h3>
        <p className="text-slate-400">Comparaison des propriétés pour les applications horlogères</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-700">
              <th className="p-3 text-left text-white font-semibold">Critère</th>
              <th className="p-3 text-left text-white font-semibold">Acier</th>
              <th className="p-3 text-left text-white font-semibold">Laiton</th>
              <th className="p-3 text-left text-white font-semibold">Maillechort</th>
              <th className="p-3 text-left text-white font-semibold">Aluminium</th>
              <th className="p-3 text-left text-white font-semibold">Plastique</th>
            </tr>
          </thead>
          <tbody>
            {[
              { critere: 'Poids', values: ['Lourd', 'Lourd', 'Lourd', 'Très léger', 'Très léger'] },
              { critere: 'Dureté / solidité', values: ['Très élevée', 'Moyenne', 'Élevée', 'Moyenne', 'Variable'] },
              { critere: 'Résistance corrosion', values: ['Excellente', 'Bonne', 'Très bonne', 'Moyenne', 'Bonne'] },
              { critere: 'Esthétique', values: ['Poli, brossé', 'Doré, plaqué', 'Gris-blanc', 'Coloré', 'Coloré'] },
              { critere: 'Coût', values: ['Moyen/élevé', 'Faible', 'Élevé', 'Faible', 'Très faible'] },
              { critere: 'Usinabilité', values: ['Moyenne', 'Excellente', 'Bonne', 'Très bonne', 'Excellente'] },
            ].map((row, idx) => (
              <tr key={idx} className="border-b border-slate-700 hover:bg-slate-700/50">
                <td className="p-3 font-semibold text-amber-400">{row.critere}</td>
                {row.values.map((val, vidx) => (
                  <td key={vidx} className="p-3 text-slate-300">{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Avantages/Inconvénients */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { nom: 'Acier', avantages: 'Robuste, durable, esthétique', inconvenients: 'Lourd, difficile à usiner', color: 'blue' },
          { nom: 'Laiton', avantages: 'Facile à travailler, économique', inconvenients: 'Moins noble, nécessite traitement', color: 'yellow' },
          { nom: 'Maillechort', avantages: 'Belle finition, stable, pas de traitement', inconvenients: 'Coûteux, savoir-faire spécifique', color: 'purple' },
          { nom: 'Aluminium', avantages: 'Léger, colorable, bon pour le sport', inconvenients: 'Moins résistant, rayable', color: 'green' },
          { nom: 'Plastique', avantages: 'Léger, bon marché, idéal quartz', inconvenients: 'Moins prestigieux, peu durable', color: 'red' },
        ].map((materiau, idx) => (
          <div key={idx} className="bg-slate-700 rounded-lg p-4">
            <h4 className="text-lg font-bold text-white mb-3">{materiau.nom}</h4>
            <div className="mb-3">
              <div className="text-xs text-green-400 font-semibold mb-1">✓ Avantages</div>
              <div className="text-slate-300 text-sm">{materiau.avantages}</div>
            </div>
            <div>
              <div className="text-xs text-red-400 font-semibold mb-1">✗ Inconvénients</div>
              <div className="text-slate-300 text-sm">{materiau.inconvenients}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Liste de tous les outils
const allTools = [
  { id: 'guide-metaux', name: 'Guide des Métaux', component: GuideMetaux, icon: Atom, featured: true },
  { id: 'tableau-comparatif', name: 'Tableau Comparatif', component: TableauComparatif, icon: BarChart3, featured: true },
  { id: 'cosc-calculator', name: 'Calculateur Précision COSC', component: ToolPlaceholder, icon: Calculator },
  { id: 'rapport-engrenages', name: 'Rapport d\'Engrenages', component: ToolPlaceholder, icon: Settings },
  { id: 'convertisseur-frequence', name: 'Convertisseur de Fréquence', component: ToolPlaceholder, icon: Zap },
  { id: 'reserve-marche', name: 'Réserve de Marche', component: ToolPlaceholder, icon: Clock },
  { id: 'longueur-spiral', name: 'Longueur de Spiral', component: ToolPlaceholder, icon: Wrench },
  { id: 'tableau-couples', name: 'Tableau des Couples', component: ToolPlaceholder, icon: Cog },
  { id: 'guide-amplitude', name: 'Guide d\'Amplitude', component: ToolPlaceholder, icon: Gauge },
  { id: 'identifier-mouvement', name: 'Identifier Mouvement', component: ToolPlaceholder, icon: Compass },
  { id: 'chronometre', name: 'Chronomètre', component: ToolPlaceholder, icon: BarChart3 },
  { id: 'convertisseur-unites', name: 'Convertisseur d\'Unités', component: ToolPlaceholder, icon: Target },
  { id: 'simulateur-echappement', name: 'Simulateur d\'Échappement', component: ToolPlaceholder, icon: Target },
  { id: 'generateur-fiches', name: 'Générateur de Fiches', component: ToolPlaceholder, icon: FileText },
  { id: 'base-donnees-pieces', name: 'Base de Données des Pièces', component: ToolPlaceholder, icon: Database },
  { id: 'complications', name: 'Simulateur de Complications', component: ToolPlaceholder, icon: Info },
  { id: 'finishing', name: 'Finitions Swiss Made', component: ToolPlaceholder, icon: HelpCircle },
  { id: 'calculateur-tolerances', name: 'Calculateur de Tolérances ISO 286', component: ToolPlaceholder, icon: Ruler },
  { id: 'simulateur-resonance', name: 'Simulateur de Résonance Horlogère', component: ToolPlaceholder, icon: Music },
  { id: 'calculateur-frequence-avance', name: 'Calculateur de Fréquence Avancé', component: ToolPlaceholder, icon: Activity },
  { id: 'simulateur-chronometrie-thermique', name: 'Simulateur de Chronométrie Thermique', component: ToolPlaceholder, icon: Thermometer },
  { id: 'calculateur-dimensions-spiral', name: 'Calculateur de Dimensions du Spiral', component: ToolPlaceholder, icon: Compass },
];

export default function HorloLearnToolsPage() {
  const [selectedTool, setSelectedTool] = useState('guide-metaux');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const selectedToolData = allTools.find(tool => tool.id === selectedTool);
  const ToolComponent = selectedToolData?.component || Tool
