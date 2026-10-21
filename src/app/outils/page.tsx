// src/app/outils/page.tsx

'use client';

import React, { useState } from 'react';
import {
  Calculator,
  Settings,
  Info,
  HelpCircle,
  Wrench,
  Cog,
  Database,
  FileText,
  BarChart3,
  Clock,
  Zap,
  Gauge,
  Target,
  Compass,
  BookOpen,
  Ruler,
  Music,
  Activity,
  Thermometer,
} from 'lucide-react';
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
} from '../../components';
import SimulateurResonance3D from '../../components/SimulateurResonance3D';
import ChronographeBancProPage from './chronographe-banc-pro/page';

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
  { id: 'simulateur-resonance-3d', name: 'Simulateur Résonance 3D', component: SimulateurResonance3D, icon: Cog },
  { id: 'chronographe-banc-pro', name: 'Chronographe Banc Pro', component: ChronographeBancProPage, icon: Gauge },
];

export default function HorloLearnToolsPage() {
  const [selectedTool, setSelectedTool] = useState('bibliotheque-ressources');

  const selectedToolData = allTools.find(tool => tool.id === selectedTool);
  const ToolComponent = selectedToolData?.component || RessourcesPage;
  const SelectedIcon = selectedToolData?.icon || BookOpen;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white flex transition-colors duration-300">
      
      {/* Barre latérale (Sidebar) */}
      <div className="w-80 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col transition-colors duration-300 shadow-sm">
        
        {/* En-tête Sidebar */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <div className="bg-amber-500 p-2 rounded-xl text-slate-950 font-bold shadow-sm">
              <Calculator className="w-6 h-6 text-slate-950" />
            </div>
            HorloLearn Tools
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 font-medium">
            22 outils horlogers professionnels
          </p>
        </div>

        {/* Liste des outils */}
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-1.5">
            {allTools.map((tool) => {
              const IconComponent = tool.icon;
              const isSelected = selectedTool === tool.id;
              return (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-all duration-200 text-sm ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/70 hover:text-slate-900 dark:hover:text-white font-medium'
                  }`}
                >
                  <IconComponent className="w-5 h-5 flex-shrink-0" />
                  <span>{tool.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Pied de Sidebar */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <p className="text-slate-400 dark:text-slate-500 text-xs text-center">
            © {new Date().getFullYear()} HorloLearn • Outils Professionnels
          </p>
        </div>
      </div>

      {/* Contenu principal de l'outil */}
      <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300 min-w-0">
        
        {/* En-tête de l'outil actif */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-8 py-5 shadow-sm transition-colors duration-300">
          <div className="flex items-center gap-4">
            <div className="bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/20 p-2.5 rounded-xl">
              <SelectedIcon className="w-7 h-7 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {selectedToolData?.name}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Outil professionnel pour l'horlogerie de précision
              </p>
            </div>
          </div>
        </header>

        {/* Cadre de l'outil */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden h-full">
            <ToolComponent />
          </div>
        </main>
      </div>
    </div>
  );
}
