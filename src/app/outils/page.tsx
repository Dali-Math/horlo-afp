'use client';

import React, { useState } from 'react';
import { Calculator, Settings, Info, HelpCircle, Wrench, Cog, Database, FileText, BarChart3, Clock, Zap, Gauge, Target, Compass, BookOpen, Ruler, Music, Activity, Thermometer } from 'lucide-react';
import { 
  COSCCalculator, 
  ComplicationsSimulator, 
  PowerReserveCalculator, 
  ProblemDiagnostic,
  FinishingSimulator,
  UnitsConverter,
  FrequencyCalculator,
  ChronographSimulator,
  RapportEngrenages,
  LongueurSpiral,
  TableauCouples,
  GuideAmplitude,
  SimulateurEchappement,
  GenerateurFiches,
  BaseDonneesPieces,
  RessourcesPage,
  CalculateurTolerancesISO,
  SimulateurResonance,
  CalculateurFrequenceAvance,
  SimulateurChronometrieThermique,
  CalculateurDimensionsSpiral,
  SimulateurEchappementAncreAvance,
  import SimulateurResonance3D from '../../components/SimulateurResonance3D'; 
} from '../../components';

const allTools = [
  { id: 'bibliotheque-ressources', name: 'Bibliothèque de Ressources', component: RessourcesPage, icon: BookOpen },
  { id: 'cosc-calculator', name: 'Calculateur Précision COSC', component: COSCCalculator, icon: Calculator },
  { id: 'rapport-engrenages', name: 'Rapport d\'Engrenages', component: RapportEngrenages, icon: Settings },
  { id: 'convertisseur-frequence', name: 'Convertisseur de Fréquence', component: FrequencyCalculator, icon: Zap },
  { id: 'reserve-marche', name: 'Réserve de Marche', component: PowerReserveCalculator, icon: Clock },
  { id: 'longueur-spiral', name: 'Longueur de Spiral', component: LongueurSpiral, icon: Wrench },
  { id: 'tableau-couples', name: 'Tableau des Couples', component: TableauCouples, icon: Cog },
  { id: 'guide-amplitude', name: 'Guide d\'Amplitude', component: GuideAmplitude, icon: Gauge },
  { id: 'identifier-mouvement', name: 'Identifier Mouvement', component: ProblemDiagnostic, icon: Compass },
  { id: 'chronometre', name: 'Chronomètre', component: ChronographSimulator, icon: BarChart3 },
  { id: 'convertisseur-unites', name: 'Convertisseur d\'Unités', component: UnitsConverter, icon: Target },
  { id: 'simulateur-echappement', name: 'Simulateur d\'Échappement', component: SimulateurEchappement, icon: Target },
  { id: 'generateur-fiches', name: 'Générateur de Fiches', component: GenerateurFiches, icon: FileText },
  { id: 'base-donnees-pieces', name: 'Base de Données des Pièces', component: BaseDonneesPieces, icon: Database },
  { id: 'complications', name: 'Simulateur de Complications', component: ComplicationsSimulator, icon: Info },
  { id: 'finishing', name: 'Finitions Swiss Made', component: FinishingSimulator, icon: HelpCircle },
  { id: 'calculateur-tolerances', name: 'Calculateur de Tolérances ISO 286', component: CalculateurTolerancesISO, icon: Ruler },
  { id: 'simulateur-resonance', name: 'Simulateur de Résonance Horlogère', component: SimulateurResonance, icon: Music },
  { id: 'calculateur-frequence-avance', name: 'Calculateur de Fréquence Avancé', component: CalculateurFrequenceAvance, icon: Activity },
  { id: 'simulateur-chronometrie-thermique', name: 'Simulateur de Chronométrie Thermique', component: SimulateurChronometrieThermique, icon: Thermometer },
  { id: 'calculateur-dimensions-spiral', name: 'Calculateur de Dimensions du Spiral', component: CalculateurDimensionsSpiral, icon: Compass },
  { id: 'simulateur-echappement-avance', name: 'Simulateur d\'Échappement Ancre Avancé', component: SimulateurEchappementAncreAvance, icon: Settings },
  { id: 'simulateur-resonance-3d', name: 'Simulateur Résonance 3D (THREE.js)', component: SimulateurResonance3D, icon: Cog },
];

export default function HorloLearnToolsPage() {
  const [selectedTool, setSelectedTool] = useState('bibliotheque-ressources');

  const selectedToolData = allTools.find(tool => tool.id === selectedTool);
  const ToolComponent = selectedToolData?.component || RessourcesPage;
  const SelectedIcon = selectedToolData?.icon || BookOpen;

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar Navigation */}
      <div className="w-80 bg-slate-800 border-r border-slate-700 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="bg-amber-500 p-2 rounded-lg">
              <Calculator className="w-6 h-6 text-slate-900" />
            </div>
            HorloLearn Tools
          </h1>
          <p className="text-slate-400 text-sm mt-2">22 outils horlogers professionnels</p>
        </div>

        {/* Tools Navigation */}
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-2">
            {allTools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    selectedTool === tool.id
                      ? 'bg-amber-500 text-white shadow-lg font-semibold'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <IconComponent className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium text-sm">{tool.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-700">
          <p className="text-slate-400 text-xs text-center">
            © 2025 HorloLearn – Outils Professionnels Horlogers
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Main Header */}
        <header className="bg-slate-800 border-b border-slate-700 p-6">
          <div className="flex items-center gap-4">
            <div className="bg-amber-500/20 p-3 rounded-lg">
              <SelectedIcon className="w-8 h-8 text-amber-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{selectedToolData?.name}</h2>
              <p className="text-slate-400">Outil professionnel pour l'horlogerie de précision</p>
            </div>
          </div>
        </header>

        {/* Tool Content */}
        <main className="flex-1 bg-slate-900 p-6 overflow-y-auto">
          <div className="bg-slate-800 rounded-xl border border-slate-700 h-full">
            <ToolComponent />
          </div>
        </main>
      </div>
    </div>
  );
}
