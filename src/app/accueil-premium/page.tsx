// app/page.tsx
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import Script from 'next/script';

// Définition des types pour le simulateur professionnel
interface Metal {
  id: string;
  name: string;
  icon: string;
  description: string;
  baseProperties: {
    hardness: number;
    corrosion: number;
    density: number;
    cost: number;
    workability: number;
    color: string;
    colorName: string;
  };
  applications: string[];
  characteristics: string[];
}

interface Additive {
  id: string;
  name: string;
  symbol: string;
  maxPercent: number;
  minPercent: number;
  optimalRange: [number, number];
  effect: {
    hardness: number;
    corrosion: number;
    density: number;
    cost: number;
    workability: number;
    description: string;
    technicalNote: string;
  };
  contraindications: string[];
  synergies: string[];
}

interface AlloyResult {
  hardness: number;
  corrosion: number;
  density: number;
  cost: number;
  workability: number;
  color: string;
  colorName: string;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
  applications: string[];
  warnings: string[];
  recommendations: string[];
  industrialStandard?: string;
}

// Composant AlloyMixer professionnel amélioré
const AlloyMixer: React.FC = () => {
  const baseMetals: Metal[] = [
    { 
      id: 'steel316L', 
      name: 'Acier 316L', 
      icon: '⚙️',
      description: 'Acier inoxydable austénitique, standard de l\'industrie horlogère',
      baseProperties: { 
        hardness: 200, 
        corrosion: 85, 
        density: 7.9, 
        cost: 50,
        workability: 75,
        color: '#e0e0e0',
        colorName: 'Argenté brillant'
      },
      applications: ['Boîtiers sport', 'Bracelets', 'Composants internes', 'Montres plongée'],
      characteristics: ['Résistant à la corrosion', 'Biocompatible', 'Usinable', 'Polissable']
    },
    { 
      id: 'steel904L', 
      name: 'Acier 904L (Oystersteel)', 
      icon: '🏆',
      description: 'Acier superausténitique utilisé par Rolex, résistance exceptionnelle',
      baseProperties: { 
        hardness: 250, 
        corrosion: 95, 
        density: 8.0, 
        cost: 80,
        workability: 60,
        color: '#d5d5d5',
        colorName: 'Argenté premium'
      },
      applications: ['Montres luxe', 'Environnements marins', 'Boîtiers haute performance'],
      characteristics: ['Résistance chimique supérieure', 'Faible maintenance', 'Finition miroir']
    },
    { 
      id: 'titanium', 
      name: 'Titane Grade 5 (Ti-6Al-4V)', 
      icon: '🪶',
      description: 'Alliage de titane aéronautique, léger et biocompatible',
      baseProperties: { 
        hardness: 350, 
        corrosion: 95, 
        density: 4.5, 
        cost: 120,
        workability: 45,
        color: '#b8b8b8',
        colorName: 'Gris-argent mat'
      },
      applications: ['Montres sport', 'Plongée professionnelle', 'Composants aéronautiques'],
      characteristics: ['Ultra-léger', 'Hypoallergénique', 'Haute résistance', 'Ratio poids/résistance optimal']
    },
    { 
      id: 'gold18k', 
      name: 'Or 18 Carats (750‰)', 
      icon: '👑',
      description: 'Or pur à 75%, le standard de la haute horlogerie',
      baseProperties: { 
        hardness: 150, 
        corrosion: 100, 
        density: 15.4, 
        cost: 500,
        workability: 85,
        color: '#ffd700',
        colorName: 'Or jaune classique'
      },
      applications: ['Montres de luxe', 'Complications', 'Éditions limitées', 'Haute joaillerie'],
      characteristics: ['Inoxydable', 'Prestige', 'Facile à travailler', 'Valeur patrimoniale']
    },
    { 
      id: 'platinum', 
      name: 'Platine 950 (950‰)', 
      icon: '⭐',
      description: 'Le métal le plus noble et dense de l\'horlogerie',
      baseProperties: { 
        hardness: 130, 
        corrosion: 100, 
        density: 21.4, 
        cost: 800,
        workability: 40,
        color: '#e5e4e2',
        colorName: 'Blanc-gris noble'
      },
      applications: ['Pièces d\'exception', 'Montres à complications', 'Collections museum'],
      characteristics: ['Rareté extrême', 'Inaltérable', 'Poids substantiel', 'Prestige absolu']
    },
    { 
      id: 'bronze', 
      name: 'Bronze CuSn8 (92% Cu, 8% Sn)', 
      icon: '🏛️',
      description: 'Alliage traditionnel maritime avec patine vivante',
      baseProperties: { 
        hardness: 100, 
        corrosion: 70, 
        density: 8.8, 
        cost: 40,
        workability: 80,
        color: '#cd7f32',
        colorName: 'Cuivré chaud'
      },
      applications: ['Montres de plongée vintage', 'Éditions spéciales', 'Marine'],
      characteristics: ['Patine unique', 'Antimicrobien', 'Look vintage', 'Évolution naturelle']
    },
  ];

  const additives: Additive[] = [
    { 
      id: 'carbon', 
      name: 'Carbone', 
      symbol: 'C', 
      maxPercent: 2.0,
      minPercent: 0.1,
      optimalRange: [0.3, 1.2],
      effect: { 
        hardness: 180, 
        corrosion: -15, 
        density: 0.05, 
        cost: 5,
        workability: -25,
        description: 'Durcissement structural majeur',
        technicalNote: 'Formation de carbures, améliore la trempabilité'
      },
      contraindications: ['Éviter avec métaux précieux', 'Réduit la ductilité'],
      synergies: ['Chrome (Cr)', 'Molybdène (Mo)']
    },
    { 
      id: 'nickel', 
      name: 'Nickel', 
      symbol: 'Ni', 
      maxPercent: 30,
      minPercent: 2,
      optimalRange: [8, 14],
      effect: { 
        hardness: 50, 
        corrosion: 20, 
        density: 1.2, 
        cost: 15,
        workability: 10,
        description: 'Améliore ductilité et brillance',
        technicalNote: 'Stabilise la structure austénitique, peut causer allergies'
      },
      contraindications: ['Allergène potentiel', 'Réglementé dans certains pays'],
      synergies: ['Chrome (Cr)', 'Cuivre (Cu)']
    },
    { 
      id: 'chrome', 
      name: 'Chrome', 
      symbol: 'Cr', 
      maxPercent: 25,
      minPercent: 10.5,
      optimalRange: [16, 18],
      effect: { 
        hardness: 80, 
        corrosion: 45, 
        density: 0.8, 
        cost: 12,
        workability: -15,
        description: 'Formation de couche passive protectrice',
        technicalNote: 'Essentiel pour l\'inoxydabilité (>10.5% minimum)'
      },
      contraindications: ['Excès peut fragiliser'],
      synergies: ['Nickel (Ni)', 'Molybdène (Mo)']
    },
    { 
      id: 'copper', 
      name: 'Cuivre', 
      symbol: 'Cu', 
      maxPercent: 40,
      minPercent: 1,
      optimalRange: [12, 25],
      effect: { 
        hardness: -15, 
        corrosion: 8, 
        density: 1.0, 
        cost: 8,
        workability: 20,
        description: 'Améliore la formabilité et couleur',
        technicalNote: 'Base des alliages d\'or rose, favorise la ductilité'
      },
      contraindications: ['Peut oxyder'],
      synergies: ['Argent (Ag)', 'Zinc (Zn)', 'Or (Au)']
    },
    { 
      id: 'molybdenum', 
      name: 'Molybdène', 
      symbol: 'Mo', 
      maxPercent: 6,
      minPercent: 0.5,
      optimalRange: [2, 4],
      effect: { 
        hardness: 70, 
        corrosion: 30, 
        density: 1.5, 
        cost: 25,
        workability: -10,
        description: 'Résistance exceptionnelle aux chlorures',
        technicalNote: 'Crucial pour environnements marins (904L: 4-5%)'
      },
      contraindications: ['Coût élevé'],
      synergies: ['Chrome (Cr)', 'Nickel (Ni)']
    },
    { 
      id: 'zinc', 
      name: 'Zinc', 
      symbol: 'Zn', 
      maxPercent: 35,
      minPercent: 5,
      optimalRange: [15, 25],
      effect: { 
        hardness: 25, 
        corrosion: -8, 
        density: 0.9, 
        cost: 3,
        workability: 25,
        description: 'Facilite la fusion et le moulage',
        technicalNote: 'Composant principal du laiton, abaisse le point de fusion'
      },
      contraindications: ['Volatil à haute température'],
      synergies: ['Cuivre (Cu)']
    },
  ];

  const [selectedMetal, setSelectedMetal] = useState<Metal>(baseMetals[0]);
  const [selectedAdditives, setSelectedAdditives] = useState<Array<{additive: Additive, percentage: number}>>([]);
  const [results, setResults] = useState<AlloyResult | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Calcul professionnel des propriétés résultantes
  const calculateAlloyProperties = useCallback(() => {
    let totalWeight = 100;
    let weightedHardness = selectedMetal.baseProperties.hardness * 100;
    let weightedCorrosion = selectedMetal.baseProperties.corrosion * 100;
    let weightedDensity = selectedMetal.baseProperties.density * 100;
    let weightedCost = selectedMetal.baseProperties.cost * 100;
    let weightedWorkability = selectedMetal.baseProperties.workability * 100;

    selectedAdditives.forEach(({ additive, percentage }) => {
      totalWeight += percentage;
      weightedHardness += additive.effect.hardness * percentage;
      weightedCorrosion += additive.effect.corrosion * percentage;
      weightedDensity += additive.effect.density * percentage;
      weightedCost += additive.effect.cost * percentage;
      weightedWorkability += additive.effect.workability * percentage;
    });

    const finalHardness = Math.max(50, Math.min(2000, Math.round(weightedHardness / totalWeight)));
    const finalCorrosion = Math.max(0, Math.min(100, Math.round(weightedCorrosion / totalWeight)));
    const finalDensity = Math.max(1, Math.round((weightedDensity / totalWeight) * 10) / 10);
    const finalCost = Math.max(10, Math.round(weightedCost / totalWeight));
    const finalWorkability = Math.max(0, Math.min(100, Math.round(weightedWorkability / totalWeight)));

    // Détermination du grade
    let grade: 'A+' | 'A' | 'B' | 'C' | 'D' = 'C';
    const score = (finalHardness / 10) + finalCorrosion + (100 - finalDensity * 3) + finalWorkability - (finalCost / 5);
    
    if (score > 180) grade = 'A+';
    else if (score > 150) grade = 'A';
    else if (score > 120) grade = 'B';
    else if (score > 90) grade = 'C';
    else grade = 'D';

    // Déterminer les applications
    const apps: string[] = [];
    if (finalHardness > 600) apps.push('✦ Composants haute résistance');
    if (finalHardness > 400 && finalHardness <= 600) apps.push('✦ Boîtiers sport');
    if (finalCorrosion > 90) apps.push('✦ Montres de plongée professionnelle');
    if (finalCorrosion > 80 && finalCorrosion <= 90) apps.push('✦ Usage quotidien');
    if (finalDensity < 6) apps.push('✦ Montres ultra-légères');
    if (finalDensity > 15) apps.push('✦ Montres de prestige (poids substantiel)');
    if (finalWorkability > 70) apps.push('✦ Pièces complexes / Gravure');
    if (selectedMetal.id.includes('gold') || selectedMetal.id === 'platinum') apps.push('✦ Haute joaillerie');
    if (finalCost < 100) apps.push('✦ Production série');
    if (finalCost > 300) apps.push('✦ Éditions limitées / Luxe');

    // Avertissements et recommandations
    const warnings: string[] = [];
    const recommendations: string[] = [];

    selectedAdditives.forEach(({ additive, percentage }) => {
      if (percentage > additive.optimalRange[1]) {
        warnings.push(`⚠️ ${additive.symbol} au-dessus de la plage optimale (>${additive.optimalRange[1]}%)`);
      }
      if (percentage < additive.optimalRange[0]) {
        warnings.push(`⚠️ ${additive.symbol} en-dessous de la plage optimale (<${additive.optimalRange[0]}%)`);
      }
      additive.contraindications.forEach(ci => {
        warnings.push(`⚠️ ${additive.symbol}: ${ci}`);
      });
    });

    if (finalWorkability < 50) {
      warnings.push('⚠️ Usinabilité difficile - Outils spéciaux requis');
    }
    if (finalHardness > 1500) {
      warnings.push('⚠️ Dureté extrême - Usinage très complexe');
    }
    if (finalCorrosion < 70) {
      recommendations.push('💡 Envisager traitement de surface (PVD, DLC)');
    }
    if (finalDensity > 18) {
      recommendations.push('💡 Poids élevé - Vérifier confort au porté');
    }
    if (finalCost > 500) {
      recommendations.push('💡 Coût premium - Justifier par prestige / complications');
    }

    // Standards industriels
    let industrialStandard: string | undefined;
    if (selectedMetal.id === 'steel316L' && selectedAdditives.some(a => a.additive.id === 'chrome')) {
      industrialStandard = 'Conforme ASTM A240 / EN 1.4404';
    } else if (selectedMetal.id === 'steel904L') {
      industrialStandard = 'Conforme ASTM B625 / Rolex Oystersteel®';
    } else if (selectedMetal.id === 'titanium') {
      industrialStandard = 'Conforme ASTM B265 Grade 5 (Ti-6Al-4V)';
    } else if (selectedMetal.id === 'gold18k') {
      industrialStandard = 'Conforme hallmark 750‰ / 18K';
    } else if (selectedMetal.id === 'platinum') {
      industrialStandard = 'Conforme hallmark 950‰ Pt950';
    }

    setResults({
      hardness: finalHardness,
      corrosion: finalCorrosion,
      density: finalDensity,
      cost: finalCost,
      workability: finalWorkability,
      color: selectedMetal.baseProperties.color,
      colorName: selectedMetal.baseProperties.colorName,
      grade,
      applications: apps.length ? apps : ['✦ Usage standard'],
      warnings,
      recommendations,
      industrialStandard
    });
  }, [selectedMetal, selectedAdditives]);

  useEffect(() => {
    calculateAlloyProperties();
  }, [calculateAlloyProperties]);

  const addAdditive = (additive: Additive) => {
    if (!selectedAdditives.some(a => a.additive.id === additive.id) && selectedAdditives.length < 6) {
      setSelectedAdditives([...selectedAdditives, { additive, percentage: additive.optimalRange[0] }]);
    }
  };

  const removeAdditive = (id: string) => {
    setSelectedAdditives(selectedAdditives.filter(a => a.additive.id !== id));
  };

  const updatePercentage = (id: string, value: number) => {
    setSelectedAdditives(selectedAdditives.map(a => 
      a.additive.id === id ? { ...a, percentage: Math.min(a.additive.maxPercent, Math.max(a.additive.minPercent, value)) } : a
    ));
  };

  const resetSimulator = () => {
    setSelectedMetal(baseMetals[0]);
    setSelectedAdditives([]);
    setResults(null);
  };

  const getGradeColor = (grade: string) => {
    switch(grade) {
      case 'A+': return 'from-green-400 to-emerald-500';
      case 'A': return 'from-blue-400 to-cyan-500';
      case 'B': return 'from-yellow-400 to-orange-500';
      case 'C': return 'from-orange-400 to-red-500';
      case 'D': return 'from-red-500 to-pink-600';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getPropertyLevel = (value: number, type: 'hardness' | 'corrosion' | 'density' | 'cost' | 'workability') => {
    switch(type) {
      case 'hardness':
        if (value > 1000) return { level: 'Extrême', color: 'text-purple-600 dark:text-purple-400' };
        if (value > 600) return { level: 'Très élevée', color: 'text-blue-600 dark:text-blue-400' };
        if (value > 300) return { level: 'Élevée', color: 'text-green-600 dark:text-green-400' };
        if (value > 150) return { level: 'Moyenne', color: 'text-yellow-600 dark:text-yellow-400' };
        return { level: 'Faible', color: 'text-orange-600 dark:text-orange-400' };
      
      case 'corrosion':
        if (value > 90) return { level: 'Excellente', color: 'text-green-600 dark:text-green-400' };
        if (value > 75) return { level: 'Très bonne', color: 'text-blue-600 dark:text-blue-400' };
        if (value > 60) return { level: 'Bonne', color: 'text-yellow-600 dark:text-yellow-400' };
        return { level: 'Limitée', color: 'text-orange-600 dark:text-orange-400' };
      
      case 'density':
        if (value < 5) return { level: 'Ultra-léger', color: 'text-green-600 dark:text-green-400' };
        if (value < 8) return { level: 'Léger', color: 'text-blue-600 dark:text-blue-400' };
        if (value < 12) return { level: 'Moyen', color: 'text-yellow-600 dark:text-yellow-400' };
        if (value < 18) return { level: 'Lourd', color: 'text-orange-600 dark:text-orange-400' };
        return { level: 'Très lourd', color: 'text-purple-600 dark:text-purple-400' };
      
      case 'cost':
        if (value > 500) return { level: 'Très élevé', color: 'text-red-600 dark:text-red-400' };
        if (value > 200) return { level: 'Élevé', color: 'text-orange-600 dark:text-orange-400' };
        if (value > 100) return { level: 'Moyen', color: 'text-yellow-600 dark:text-yellow-400' };
        return { level: 'Abordable', color: 'text-green-600 dark:text-green-400' };
      
      case 'workability':
        if (value > 75) return { level: 'Excellente', color: 'text-green-600 dark:text-green-400' };
        if (value > 60) return { level: 'Bonne', color: 'text-blue-600 dark:text-blue-400' };
        if (value > 45) return { level: 'Moyenne', color: 'text-yellow-600 dark:text-yellow-400' };
        return { level: 'Difficile', color: 'text-orange-600 dark:text-orange-400' };
      
      default:
        return { level: '', color: '' };
    }
  };

  return (
    <div className="w-full">
      {/* En-tête avec bouton retour */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <Link 
          href="/materiaux"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-800 to-slate-700 dark:from-slate-700 dark:to-slate-600 text-white rounded-xl hover:from-slate-700 hover:to-slate-600 dark:hover:from-slate-600 dark:hover:to-slate-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-semibold"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Retour aux Matériaux</span>
        </Link>

        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/40 transition-all duration-300 font-medium text-sm"
        >
          {showAdvanced ? '📊 Mode Simple' : '🔬 Mode Avancé'}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border-2 border-gray-200 dark:border-gray-700">
        <div className="text-center mb-8">
          <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-3">
            🔬 Simulateur d&apos;Alliage Horloger Professionnel
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Créez et analysez des alliages métalliques selon les standards de l&apos;industrie horlogère
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Colonne 1: Métal de base */}
          <div>
            <h4 className="font-bold text-xl text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <span className="text-2xl">🛡️</span> Métal de Base
            </h4>
            
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {baseMetals.map(metal => (
                <button
                  key={metal.id}
                  onClick={() => { setSelectedMetal(metal); setSelectedAdditives([]); }}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    selectedMetal.id === metal.id 
                      ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 shadow-lg scale-105' 
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-lg text-gray-900 dark:text-gray-100">
                      {metal.icon} {metal.name}
                    </span>
                    <div 
                      className="w-8 h-8 rounded-full border-2 shadow-inner" 
                      style={{ backgroundColor: metal.baseProperties.color, borderColor: metal.baseProperties.color }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{metal.description}</p>
                  
                  {showAdvanced && (
                    <div className="grid grid-cols-2 gap-1 text-xs mt-2 pt-2 border-t dark:border-gray-600">
                      <div className="text-gray-700 dark:text-gray-300"><strong>Dureté:</strong> {metal.baseProperties.hardness} HV</div>
                      <div className="text-gray-700 dark:text-gray-300"><strong>Densité:</strong> {metal.baseProperties.density} g/cm³</div>
                      <div className="text-gray-700 dark:text-gray-300"><strong>Corrosion:</strong> {metal.baseProperties.corrosion}%</div>
                      <div className="text-gray-700 dark:text-gray-300"><strong>Coût:</strong> {metal.baseProperties.cost}/100</div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Colonne 2: Éléments d'addition */}
          <div>
            <h4 className="font-bold text-xl text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <span className="text-2xl">➕</span> Éléments d&apos;Addition
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-auto">
                {selectedAdditives.length}/6
              </span>
            </h4>

            <div className="space-y-2 max-h-64 overflow-y-auto p-2 border-2 rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700/50 dark:border-gray-600 mb-4">
              {additives.map(additive => {
                const isSelected = selectedAdditives.some(a => a.additive.id === additive.id);
                const canAdd = !isSelected && selectedAdditives.length < 6;
                
                return (
                  <button
                    key={additive.id}
                    onClick={() => canAdd && addAdditive(additive)}
                    disabled={!canAdd}
                    className={`w-full p-3 rounded-lg text-sm transition-all duration-300 ${
                      isSelected 
                        ? 'bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 cursor-not-allowed opacity-60' 
                        : canAdd
                          ? 'bg-white dark:bg-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 border-2 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 shadow-sm hover:shadow-md'
                          : 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed opacity-40'
                    }`}
                    title={additive.effect.technicalNote}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        <strong className="text-blue-600 dark:text-blue-400">{additive.symbol}</strong> {additive.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {additive.optimalRange[0]}-{additive.optimalRange[1]}%
                      </span>
                    </div>
                    {showAdvanced && (
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 text-left">
                        {additive.effect.description}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Additifs sélectionnés */}
            <div className="space-y-3">
              <h5 className="font-semibold text-sm text-gray-700 dark:text-gray-300">Composition de l&apos;alliage:</h5>
              
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-xl border-2 border-blue-200 dark:border-blue-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-gray-900 dark:text-gray-100">{selectedMetal.name}</span>
                  <span className="text-sm font-mono bg-white dark:bg-gray-800 px-2 py-1 rounded text-gray-800 dark:text-gray-200">
                    {(100 - selectedAdditives.reduce((sum, a) => sum + a.percentage, 0)).toFixed(1)}%
                  </span>
                </div>
              </div>

              {selectedAdditives.map(({ additive, percentage }) => (
                <div 
                  key={additive.id} 
                  className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 p-4 rounded-xl border-2 border-blue-200 dark:border-blue-700 shadow-md"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      <strong className="text-blue-600 dark:text-blue-400">{additive.symbol}</strong> {additive.name}
                    </span>
                    <button 
                      onClick={() => removeAdditive(additive.id)} 
                      className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:scale-110 transition-all text-xl"
                      title="Retirer cet élément"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <input 
                      type="range" 
                      min={additive.minPercent} 
                      max={additive.maxPercent} 
                      step="0.1" 
                      value={percentage} 
                      onChange={(e) => updatePercentage(additive.id, parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono bg-blue-600 text-white px-2 py-1 rounded font-bold">
                        {percentage.toFixed(1)}%
                      </span>
                      
                      <div className="flex gap-1">
                        {percentage >= additive.optimalRange[0] && percentage <= additive.optimalRange[1] ? (
                          <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
                            ✓ Optimal
                          </span>
                        ) : (
                          <span className="text-orange-600 dark:text-orange-400 flex items-center gap-1">
                            ⚠ Hors plage
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {showAdvanced && (
                      <div className="text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-700 p-2 rounded mt-2">
                        <strong>Note:</strong> {additive.effect.technicalNote}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Colonne 3: Résultats */}
          <div>
            <h4 className="font-bold text-xl text-gray-800 dark:text-gray-100 mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="text-2xl">📊</span> Propriétés Résultantes
              </span>
              {results && (
                <div className={`px-4 py-2 rounded-xl font-black text-2xl bg-gradient-to-r ${getGradeColor(results.grade)} text-white shadow-lg`}>
                  {results.grade}
                </div>
              )}
            </h4>

            {results && (
              <div className="space-y-4">
                {/* Couleur de l'alliage */}
                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl text-center border-2 dark:border-gray-700 shadow-lg">
                  <div 
                    className="w-24 h-24 mx-auto mb-3 rounded-full border-4 border-white dark:border-gray-700 shadow-2xl" 
                    style={{ backgroundColor: results.color }}
                  ></div>
                  <div className="font-bold text-lg text-gray-900 dark:text-gray-100">Alliage Créé</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{results.colorName}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Base: {selectedMetal.name}</div>
                </div>

                {/* Propriétés techniques */}
                {[
                  { label: 'Dureté Vickers', value: results.hardness, unit: 'HV', type: 'hardness' as const, icon: '⚡', max: 2000 },
                  { label: 'Résistance Corrosion', value: results.corrosion, unit: '%', type: 'corrosion' as const, icon: '🛡️', max: 100 },
                  { label: 'Densité', value: results.density, unit: 'g/cm³', type: 'density' as const, icon: '🪶', max: 25 },
                  { label: 'Indice de Coût', value: results.cost, unit: '/1000', type: 'cost' as const, icon: '💰', max: 1000 },
                  { label: 'Usinabilité', value: results.workability, unit: '%', type: 'workability' as const, icon: '✨', max: 100 }
                ].map((prop, i) => {
                  const propLevel = getPropertyLevel(prop.value, prop.type);
                  
                  return (
                    <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-xl border-2 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{prop.icon}</span>
                          <span className="font-semibold text-gray-800 dark:text-gray-100">{prop.label}</span>
                        </div>
                        <span className="font-mono text-lg font-bold text-gray-900 dark:text-gray-100">
                          {prop.value} <span className="text-sm text-gray-600 dark:text-gray-400">{prop.unit}</span>
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                          <div 
                            className={`h-3 rounded-full transition-all duration-500 bg-gradient-to-r ${
                              prop.type === 'cost' 
                                ? 'from-green-400 to-red-500' 
                                : 'from-blue-400 to-purple-500'
                            }`}
                            style={{ width: `${Math.min(100, (prop.value / prop.max) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className={`text-xs font-semibold ${propLevel.color}`}>
                        {propLevel.level}
                      </div>
                    </div>
                  );
                })}

                {/* Standard industriel */}
                {results.industrialStandard && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-300 dark:border-green-700 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">✓</span>
                      <h5 className="font-bold text-green-800 dark:text-green-300">Standard Industriel</h5>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-400">{results.industrialStandard}</p>
                  </div>
                )}

                {/* Applications */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700 p-4 rounded-xl">
                  <h5 className="font-bold mb-3 text-blue-900 dark:text-blue-300 flex items-center gap-2">
                    <span className="text-xl">🎯</span> Applications Recommandées
                  </h5>
                  {results.applications.length ? (
                    <div className="flex flex-wrap gap-2">
                      {results.applications.map((app, i) => (
                        <span key={i} className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                          {app}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-400 dark:text-gray-500 text-sm">Usage standard</span>
                  )}
                </div>

                {/* Avertissements */}
                {results.warnings.length > 0 && (
                  <div className="bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-200 dark:border-orange-700 p-4 rounded-xl">
                    <h5 className="font-bold mb-2 text-orange-800 dark:text-orange-300 flex items-center gap-2">
                      <span className="text-xl">⚠️</span> Avertissements
                    </h5>
                    <ul className="text-sm space-y-1 text-orange-700 dark:text-orange-400">
                      {results.warnings.map((warn, i) => (
                        <li key={i}>{warn}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommandations */}
                {results.recommendations.length > 0 && (
                  <div className="bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-700 p-4 rounded-xl">
                    <h5 className="font-bold mb-2 text-purple-800 dark:text-purple-300 flex items-center gap-2">
                      <span className="text-xl">💡</span> Recommandations
                    </h5>
                    <ul className="text-sm space-y-1 text-purple-700 dark:text-purple-400">
                      {results.recommendations.map((rec, i) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Bouton reset */}
                <button 
                  onClick={resetSimulator} 
                  className="w-full bg-gradient-to-r from-gray-800 to-gray-700 dark:from-gray-700 dark:to-gray-600 text-white py-3 rounded-xl hover:from-gray-700 hover:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300 text-sm font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <span className="text-xl">🔄</span> Réinitialiser le Simulateur
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Notes pédagogiques */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-blue-600 dark:border-blue-400 p-6 rounded-lg">
          <h4 className="font-bold mb-3 text-blue-900 dark:text-blue-300 flex items-center gap-2 text-lg">
            <span className="text-2xl">💡</span> Notes Pédagogiques Professionnelles
          </h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800 dark:text-blue-300">
            <ul className="space-y-2">
              <li>• <strong>Dureté Vickers (HV):</strong> &gt;400 HV pour boîtiers résistants aux rayures</li>
              <li>• <strong>Résistance corrosion:</strong> &gt;90% requis pour montres de plongée professionnelle</li>
              <li>• <strong>Densité:</strong> Faible (&lt;6 g/cm³) = confort, Élevée (&gt;15 g/cm³) = prestige</li>
              <li>• <strong>Titane Grade 5:</strong> Référence aéronautique et biomédicale</li>
            </ul>
            <ul className="space-y-2">
              <li>• <strong>Acier 904L:</strong> Standard Rolex pour résistance marine supérieure</li>
              <li>• <strong>Or 18K:</strong> 75% pureté, équilibre luxe/durabilité</li>
              <li>• <strong>Platine 950:</strong> Le summum de l&apos;horlogerie haut de gamme</li>
              <li>• <strong>Usinabilité:</strong> &lt;50% nécessite outils spéciaux carbure/diamant</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant Link temporaire (à remplacer par votre vrai composant Link)
const Link = ({ href, children, className }: any) => (
  <a href={href} className={className}>{children}</a>
);

// Page principale
export default function HomePage(): JSX.Element {
  const [mermaidReady, setMermaidReady] = useState(false);

  const initializeMermaidControls = useCallback(() => {
    const containers = document.querySelectorAll<HTMLElement>('.mermaid-container');
    
    containers.forEach(container => {
      const mermaidElement = container.querySelector<HTMLElement>('.mermaid');
      if (!mermaidElement) return;

      let scale = 1;
      let isDragging = false;
      let startX = 0, startY = 0, translateX = 0, translateY = 0;
      let isTouch = false;
      let touchStartTime = 0;
      let initialDistance = 0;
      let initialScale = 1;
      let isPinching = false;

      const zoomInBtn = container.querySelector<HTMLElement>('.zoom-in');
      const zoomOutBtn = container.querySelector<HTMLElement>('.zoom-out');
      const resetBtn = container.querySelector<HTMLElement>('.reset-zoom');
      const fullscreenBtn = container.querySelector<HTMLElement>('.fullscreen');

      const updateTransform = () => {
        mermaidElement.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
        container.classList.toggle('zoomed', scale > 1);
        mermaidElement.style.cursor = isDragging ? 'grabbing' : 'grab';
      };

      zoomInBtn?.addEventListener('click', () => {
        scale = Math.min(scale * 1.25, 4);
        updateTransform();
      });

      zoomOutBtn?.addEventListener('click', () => {
        scale = Math.max(scale / 1.25, 0.3);
        if (scale <= 1) {
          translateX = 0;
          translateY = 0;
        }
        updateTransform();
      });

      resetBtn?.addEventListener('click', () => {
        scale = 1;
        translateX = 0;
        translateY = 0;
        updateTransform();
      });

      fullscreenBtn?.addEventListener('click', () => {
        container.requestFullscreen?.();
      });

      const getTouchDistance = (touch1: Touch, touch2: Touch) => {
        return Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
      };

      const handleMouseDown = (e: MouseEvent) => {
        if (isTouch) return;
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        updateTransform();
        e.preventDefault();
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (isDragging && !isTouch) {
          translateX = e.clientX - startX;
          translateY = e.clientY - startY;
          updateTransform();
        }
      };

      const handleMouseUp = () => {
        if (isDragging && !isTouch) {
          isDragging = false;
          updateTransform();
        }
      };

      mermaidElement.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseleave', handleMouseUp);

      mermaidElement.addEventListener('touchstart', (e: TouchEvent) => {
        isTouch = true;
        touchStartTime = Date.now();

        if (e.touches.length === 1) {
          isPinching = false;
          isDragging = true;
          const touch = e.touches[0];
          startX = touch.clientX - translateX;
          startY = touch.clientY - translateY;
        } else if (e.touches.length === 2) {
          isPinching = true;
          isDragging = false;
          const touch1 = e.touches[0];
          const touch2 = e.touches[1];
          initialDistance = getTouchDistance(touch1, touch2);
          initialScale = scale;
        }
        e.preventDefault();
      }, { passive: false });

      mermaidElement.addEventListener('touchmove', (e: TouchEvent) => {
        if (e.touches.length === 1 && isDragging && !isPinching) {
          const touch = e.touches[0];
          translateX = touch.clientX - startX;
          translateY = touch.clientY - startY;
          updateTransform();
        } else if (e.touches.length === 2 && isPinching) {
          const touch1 = e.touches[0];
          const touch2 = e.touches[1];
          const currentDistance = getTouchDistance(touch1, touch2);
          if (initialDistance > 0) {
            const newScale = Math.min(Math.max(
              initialScale * (currentDistance / initialDistance),
              0.3
            ), 4);
            scale = newScale;
            updateTransform();
          }
        }
        e.preventDefault();
      }, { passive: false });

      mermaidElement.addEventListener('touchend', (e: TouchEvent) => {
        if (e.touches.length === 0) {
          isDragging = false;
          isPinching = false;
          initialDistance = 0;
          setTimeout(() => { isTouch = false; }, 100);
        } else if (e.touches.length === 1 && isPinching) {
          isPinching = false;
          isDragging = true;
          const touch = e.touches[0];
          startX = touch.clientX - translateX;
          startY = touch.clientY - translateY;
        }
        updateTransform();
      });

      container.addEventListener('wheel', (e: WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const newScale = Math.min(Math.max(scale * delta, 0.3), 4);
        if (newScale !== scale) {
          const scaleDiff = newScale / scale;
          translateX = translateX * scaleDiff;
          translateY = translateY * scaleDiff;
          scale = newScale;
          if (scale <= 1) {
            translateX = 0;
            translateY = 0;
          }
          updateTransform();
        }
      });

      updateTransform();
    });
  }, []);

  useEffect(() => {
    const tocLinks = document.querySelectorAll<HTMLAnchorElement>('.toc-link');
    tocLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href')?.substring(1);
        const targetElement = targetId ? document.getElementById(targetId) : null;
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    const handleScroll = () => {
      const sections = document.querySelectorAll<HTMLElement>('section[id], div[id]');
      const tocLinks = document.querySelectorAll<HTMLAnchorElement>('.toc-link');
      
      let currentSection = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          currentSection = section.getAttribute('id') || '';
        }
      });
      
      tocLinks.forEach(link => {
        link.classList.remove('bg-yellow-500', 'text-black', 'dark:bg-yellow-600');
        if (link.getAttribute('href') === '#' + currentSection) {
          link.classList.add('bg-yellow-500', 'dark:bg-yellow-600', 'text-black');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!mermaidReady) return;

    const init = () => {
      if (typeof window !== 'undefined' && (window as any).mermaid) {
        (window as any).mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          themeVariables: {
            primaryColor: '#f8f6f0',
            primaryTextColor: '#1a1208',
            primaryBorderColor: '#2c1810',
            lineColor: '#8b7355',
            secondaryColor: '#ffffff',
            tertiaryColor: '#fef3c7',
            background: '#ffffff',
            mainBkg: '#f8f6f0',
            secondBkg: '#ffffff',
            tertiaryBkg: '#fef3c7',
            nodeBorder: '#2c1810',
            clusterBkg: '#f9fafb',
            defaultLinkColor: '#8b7355',
            titleColor: '#1a1208',
            edgeLabelBackground: '#ffffff',
            nodeTextColor: '#1a1208'
          },
          flowchart: {
            useMaxWidth: false,
            htmlLabels: true,
            curve: 'basis',
            padding: 20
          },
          fontFamily: 'Inter, sans-serif',
          fontSize: '13px'
        });

        (window as any).mermaid.init(undefined, '.mermaid');
        
        setTimeout(initializeMermaidControls, 500);
      }
    };

    if (document.readyState === 'complete') {
      init();
    } else {
      window.addEventListener('load', init);
      return () => window.removeEventListener('load', init);
    }
  }, [mermaidReady, initializeMermaidControls]);

  return (
    <>
      <Head>
        <title>Guide Complet des Métaux en Horlogerie</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        
        <Script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js" strategy="afterInteractive" onLoad={() => setMermaidReady(true)} />
        
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      </Head>

      <style jsx global>{`
        :root {
          --color-primary: #2c1810;
          --color-secondary: #8b7355;
          --color-accent: #a68b5b;
          --color-light: #f8f6f0;
          --color-dark: #1a1208;
        }
        
        body {
          font-family: 'Inter', sans-serif;
          background-color: var(--color-light);
          color: var(--color-dark);
          line-height: 1.7;
          overflow-x: hidden;
        }

        @media (prefers-color-scheme: dark) {
          body {
            background-color: #1a1a1a;
            color: #e5e5e5;
          }
        }
        
        .serif-heading {
          font-family: 'Playfair Display', serif;
        }
        
        .hero-gradient {
          background: linear-gradient(135deg, var(--color-dark) 0%, var(--color-primary) 50%, var(--color-secondary) 100%);
        }
        
        .toc-fixed {
          position: fixed;
          top: 0;
          left: 0;
          width: 280px;
          height: 100vh;
          background: var(--color-dark);
          color: var(--color-light);
          overflow-y: auto;
          z-index: 1000;
          padding: 2rem 1.5rem;
          border-right: 3px solid var(--color-accent);
        }
        
        .main-content {
          margin-left: 280px;
          min-height: 100vh;
        }
        
        .toc-link {
          display: block;
          padding: 0.75rem 1rem;
          color: var(--color-light);
          text-decoration: none;
          border-radius: 0.5rem;
          transition: all 0.3s ease;
          border-left: 3px solid transparent;
        }
        
        .toc-link:hover {
          background: rgba(255, 255, 255, 0.1);
          border-left-color: var(--color-accent);
          transform: translateX(4px);
        }
        
        .section-card {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        @media (prefers-color-scheme: dark) {
          .section-card {
            background: #2a2a2a;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            border-color: #444;
          }
        }
        
        .citation {
          display: inline-block;
          background: var(--color-accent);
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          text-decoration: none;
          margin: 0 0.25rem;
          transition: all 0.3s ease;
        }
        
        .citation:hover {
          background: var(--color-primary);
          transform: scale(1.05);
        }
        
        .chart-container {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          margin: 2rem 0;
        }

        @media (prefers-color-scheme: dark) {
          .chart-container {
            background: #2a2a2a;
          }
        }
        
        .pull-quote {
          border-left: 4px solid var(--color-accent);
          background: rgba(166, 139, 91, 0.05);
          padding: 2rem;
          margin: 2rem 0;
          font-style: italic;
          font-size: 1.125rem;
          border-radius: 0 0.5rem 0.5rem 0;
        }

        @media (prefers-color-scheme: dark) {
          .pull-quote {
            background: rgba(166, 139, 91, 0.15);
          }
        }
        
        .mermaid-container {
          display: flex;
          justify-content: center;
          min-height: 300px;
          max-height: 800px;
          background: #ffffff;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          padding: 30px;
          margin: 30px 0;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          position: relative;
          overflow: hidden;
        }

        @media (prefers-color-scheme: dark) {
          .mermaid-container {
            background: #2a2a2a;
            border-color: #444;
          }
        }

        .mermaid-container .mermaid {
          width: 100%;
          max-width: 100%;
          height: 100%;
          cursor: grab;
          transition: transform 0.3s ease;
          transform-origin: center center;
          display: flex;
          justify-content: center;
          align-items: center;
          touch-action: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        .mermaid-container .mermaid svg {
          max-width: 100%;
          height: 100%;
          display: block;
          margin: 0 auto;
        }

        .mermaid-container .mermaid:active {
          cursor: grabbing;
        }

        .mermaid-container.zoomed .mermaid {
          height: 100%;
          width: 100%;
          cursor: grab;
        }

        .mermaid-controls {
          position: absolute;
          top: 15px;
          right: 15px;
          display: flex;
          gap: 10px;
          z-index: 20;
          background: rgba(255, 255, 255, 0.95);
          padding: 8px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        @media (prefers-color-scheme: dark) {
          .mermaid-controls {
            background: rgba(42, 42, 42, 0.95);
          }
        }

        .mermaid-control-btn {
          background: #ffffff;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          padding: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #374151;
          font-size: 14px;
          min-width: 36px;
          height: 36px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (prefers-color-scheme: dark) {
          .mermaid-control-btn {
            background: #3a3a3a;
            border-color: #555;
            color: #e5e5e5;
          }
        }

        .mermaid-control-btn:hover {
          background: #f8fafc;
          border-color: #3b82f6;
          color: #3b82f6;
          transform: translateY(-1px);
        }

        @media (prefers-color-scheme: dark) {
          .mermaid-control-btn:hover {
            background: #4a4a4a;
          }
        }

        .mermaid-control-btn:active {
          transform: scale(0.95);
        }

        .bento-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          grid-template-rows: auto auto;
          gap: 2rem;
          height: 60vh;
        }
        
        .bento-item {
          border-radius: 1rem;
          overflow: hidden;
          position: relative;
        }
        
        .bento-hero {
          grid-row: 1 / 3;
          background: linear-gradient(135deg, rgba(44, 24, 16, 0.8) 0%, rgba(139, 115, 85, 0.6) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        
        .bento-summary {
          background: white;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        @media (prefers-color-scheme: dark) {
          .bento-summary {
            background: #2a2a2a;
          }
        }
        
        .bento-visual {
          background: linear-gradient(45deg, var(--color-accent), var(--color-secondary));
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .hero-title {
          font-size: 4rem;
          font-weight: 700;
          font-style: italic;
          color: white;
          text-align: center;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          z-index: 2;
          position: relative;
        }
        
        .hero-subtitle {
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.9);
          text-align: center;
          margin-top: 1rem;
          z-index: 2;
          position: relative;
        }
        
        .material-card {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          margin: 1.5rem 0;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border-left: 4px solid var(--color-accent);
          transition: transform 0.3s ease;
        }

        @media (prefers-color-scheme: dark) {
          .material-card {
            background: #2a2a2a;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
          }
        }
        
        .material-card:hover {
          transform: translateY(-4px);
        }
        
        .comparison-table {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          margin: 2rem 0;
        }

        @media (prefers-color-scheme: dark) {
          .comparison-table {
            background: #2a2a2a;
          }
        }
        
        .comparison-table th {
          background: var(--color-primary);
          color: white;
          padding: 1rem;
          font-weight: 600;
        }
        
        .comparison-table td {
          padding: 1rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        @media (prefers-color-scheme: dark) {
          .comparison-table td {
            border-bottom-color: rgba(255, 255, 255, 0.1);
          }
        }
        
        .comparison-table tr:hover {
          background: rgba(166, 139, 91, 0.05);
        }

        @media (prefers-color-scheme: dark) {
          .comparison-table tr:hover {
            background: rgba(166, 139, 91, 0.15);
          }
        }
        
        @media (max-width: 1024px) {
          .toc-fixed {
            display: none;
          }
          
          .main-content {
            margin-left: 0;
          }
          
          .bento-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
            height: auto;
          }
          
          .bento-hero {
            grid-row: 1;
            padding: 3rem 1rem;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .mermaid-control-btn:not(.reset-zoom) {
            display: none;
          }
          .mermaid-controls {
            top: auto;
            bottom: 15px;
            right: 15px;
          }
        }

        @media (max-width: 768px) {
          section {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-subtitle {
            font-size: 1.2rem;
          }

          .bento-hero {
            padding: 2rem 1rem;
          }

          .bento-summary h3 {
            font-size: 1.5rem;
          }

          .bento-summary p {
            font-size: 0.95rem;
          }

          .bento-summary ul li {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 1.5rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .bento-summary h3 {
            font-size: 1.2rem;
          }
        }
      `}</style>

      {/* Fixed Table of Contents */}
      <nav className="toc-fixed">
        <h3 className="serif-heading text-xl font-bold mb-6 text-center border-b border-gray-600 pb-4">Table des Matières</h3>
        <div className="space-y-2">
          <a href="#introduction" className="toc-link"><i className="fas fa-play-circle mr-2"></i>Introduction</a>
          <a href="#metaux-precision" className="toc-link"><i className="fas fa-cog mr-2"></i>Métaux de Précision</a>
          <div className="ml-4 space-y-1">
            <a href="#acier" className="toc-link text-sm"><i className="fas fa-circle mr-2"></i>Acier Inoxydable</a>
            <a href="#titane" className="toc-link text-sm"><i className="fas fa-feather mr-2"></i>Titane</a>
            <a href="#alliages-cuivreux" className="toc-link text-sm"><i className="fas fa-coins mr-2"></i>Alliages Cuivreux</a>
          </div>
          <a href="#metaux-precieux" className="toc-link"><i className="fas fa-gem mr-2"></i>Métaux Précieux</a>
          <div className="ml-4 space-y-1">
            <a href="#or" className="toc-link text-sm"><i className="fas fa-crown mr-2"></i>Or</a>
            <a href="#platine" className="toc-link text-sm"><i className="fas fa-star mr-2"></i>Platine</a>
          </div>
          <a href="#materiaux-innovants" className="toc-link"><i className="fas fa-rocket mr-2"></i>Matériaux Innovants</a>
          <div className="ml-4 space-y-1">
            <a href="#ceramique" className="toc-link text-sm"><i className="fas fa-shield-alt mr-2"></i>Céramique</a>
            <a href="#bronze" className="toc-link text-sm"><i className="fas fa-mountain mr-2"></i>Bronze</a>
            <a href="#avant-garde" className="toc-link text-sm"><i className="fas fa-atom mr-2"></i>Avant-Garde</a>
          </div>
          <a href="#techniques-comparatifs" className="toc-link"><i className="fas fa-chart-bar mr-2"></i>Techniques &amp; Comparatifs</a>
          <a href="#pdf-reference" className="toc-link"><i className="fas fa-file-pdf mr-2"></i>PDF de Référence</a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section with Bento Layout */}
        <section className="p-8">
          <div className="bento-grid">
            <div className="bento-item bento-hero">
              <img 
                src="https://kimi-web-img.moonshot.cn/img/www.swisswatchexpo.com/23238b338e72f54fde90c79882e75973de8cb62b.png" 
                alt="Close-up macro photograph of luxury Swiss watch movement with metallic components" 
                className="absolute inset-0 w-full h-full object-cover opacity-30" 
              />
              <div className="relative z-10">
                <h1 className="hero-title serif-heading">Guide Complet des Métaux</h1>
                <p className="hero-subtitle">L&apos;Art et la Science des Matériaux Horlogers</p>
              </div>
            </div>

            <div className="bento-item bento-summary">
              <h3 className="serif-heading text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Résumé Exécutif</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Une exploration approfondie des métaux et alliages utilisés en horlogerie, de l&apos;acier inoxydable aux métaux précieux, en passant par les matériaux innovants comme le titane et la céramique.</p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <li>• 7 matériaux principaux analysés</li>
                <li>• Propriétés mécaniques comparées</li>
                <li>• Applications industrielles détaillées</li>
                <li>• Ressources pédagogiques intégrées</li>
              </ul>
            </div>

            <div className="bento-item bento-visual">
              <div className="text-center text-white">
                <i className="fas fa-clock text-6xl mb-4 opacity-80"></i>
                <p className="text-lg font-medium">L&apos;union du savoir-faire traditionnel et de l&apos;innovation moderne</p>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section id="introduction" className="p-8">
          <div className="section-card p-8">
            <h2 className="serif-heading text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">Introduction aux Matériaux Horlogers</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="material-card">
                <h3 className="serif-heading text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Vue d&apos;ensemble des métaux et alliages</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">L&apos;horlogerie, à l&apos;intersection de l&apos;art et de la science, repose sur une sélection rigoureuse des matériaux pour créer des garde-temps à la fois fonctionnels et esthétiques <a href="https://58facettes.fr/blogs/magazine/les-metaux-utilises-en-horlogerie " className="citation" target="_blank" rel="noopener noreferrer">[359]</a>. Chaque métal ou alliage joue un rôle spécifique, dicté par ses propriétés physiques, chimiques et mécaniques.</p>
                <p className="text-gray-700 dark:text-gray-300">Les matériaux les plus couramment utilisés vont des métaux communs comme <strong>l&apos;acier inoxydable</strong>, le <strong>laiton</strong> et le <strong>maillechort</strong>, aux métaux précieux comme <strong>l&apos;or</strong> et le <strong>platine</strong>, en passant par des matériaux innovants comme le <strong>titane</strong>, la <strong>céramique</strong> et le <strong>bronze</strong> <a href="https://58facettes.fr/blogs/magazine/les-metaux-utilises-en-horlogerie " className="citation" target="_blank" rel="noopener noreferrer">[359]</a>.</p>
              </div>

              <div className="material-card">
                <h3 className="serif-heading text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Importance de la sélection des matériaux</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">La sélection des matériaux en horlogerie est un processus critique qui influence directement la <strong>performance, la durabilité, l&apos;esthétique et le coût</strong> d&apos;une montre. Chaque composant, du boîtier aux plus petits rouages, exige des propriétés spécifiques.</p>
                <p className="text-gray-700 dark:text-gray-300">Par exemple, le boîtier, qui protège le mouvement, doit être robuste et résistant à la corrosion, ce qui fait de l&apos;acier inoxydable un choix populaire <a href="https://58facettes.fr/blogs/magazine/les-metaux-utilises-en-horlogerie " className="citation" target="_blank" rel="noopener noreferrer">[359]</a>. Cependant, pour les personnes sensibles au nickel, le titane, qui est hypoallergénique, est une alternative supérieure <a href="https://fr.haibowellti.com/info/titanium-watches-vs-stainless-steel-watches-96570776.html " className="citation" target="_blank" rel="noopener noreferrer">[355]</a>.</p>
              </div>
            </div>

            <div className="pull-quote text-gray-800 dark:text-gray-100">
              "La compréhension de ces matériaux est essentielle pour les élèves en formation horlogère et les passionnés, car elle éclaire les choix techniques et esthétiques des horlogers."
            </div>
          </div>
        </section>

        {/* Métaux de Précision Section */}
        <section id="metaux-precision" className="p-8">
          <div className="section-card p-8">
            <h2 className="serif-heading text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">Les Métaux de Précision : Propriétés et Applications</h2>

            {/* Acier Inoxydable */}
            <div id="acier" className="mb-12">
              <h3 className="serif-heading text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">L&apos;Acier Inoxydable : Le Matériau de Base</h3>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">Composition et alliages</h4>
                  <p className="mb-3 text-gray-700 dark:text-gray-300">Les deux principaux alliages sont <strong>l&apos;acier 316L</strong> et <strong>l&apos;acier 904L</strong>, tous deux appartenant à la famille des aciers austénitiques <a href="https://rnm-metallurgie.fr/wp-content/uploads/2017/07/TM439-Prof-horlogerie.pdf " className="citation" target="_blank" rel="noopener noreferrer">[325]</a>
                    <a href="https://www.chrono24.fr/magazine/durables-elegantes-et-intemporelles-quelle-est-lorigine-des-montres-en-acier-inoxydable-p_118021/ " className="citation" target="_blank" rel="noopener noreferrer">[338]</a>.
                  </p>
                  <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                    <li><strong>316L:</strong> 16-18% Cr, 10-14% Ni, 2-3% Mo</li>
                    <li><strong>904L:</strong> 19-23% Cr, 23-28% Ni, 4-5% Mo, 1-2% Cu</li>
                  </ul>
                </div>

                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">Propriétés mécaniques</h4>
                  <p className="mb-3 text-gray-700 dark:text-gray-300">Les aciers austénitiques offrent une excellente résistance à la corrosion, une facilité de mise en forme et un rendu esthétique variable selon la finition <a href="https://rnm-metallurgie.fr/wp-content/uploads/2017/07/TM439-Prof-horlogerie.pdf " className="citation" target="_blank" rel="noopener noreferrer">[325]</a>.</p>
                  <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                    <li><strong>Dureté 316L:</strong> ~250 HV</li>
                    <li><strong>Durcissement surface:</strong> jusqu&apos;à 1200 HV</li>
                    <li><strong>Résistance corrosion:</strong> Excellente</li>
                  </ul>
                </div>

                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">Applications</h4>
                  <p className="mb-3 text-gray-700 dark:text-gray-300">L&apos;acier inoxydable est le matériau de prédilection pour les boîtiers et les bracelets de montres, grâce à sa combinaison unique de robustesse et d&apos;esthétique polyvalente <a href="https://58facettes.fr/blogs/magazine/les-metaux-utilises-en-horlogerie " className="citation" target="_blank" rel="noopener noreferrer">[359]</a>.</p>
                  <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                    <li><strong>316L:</strong> Montres de sport et classiques</li>
                    <li><strong>904L:</strong> Montres de plongée et haut de gamme</li>
                    <li><strong>Rolex:</strong> Oystersteel (904L)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Titane */}
            <div id="titane" className="mb-12">
              <h3 className="serif-heading text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Le Titane : Légèreté et Performance</h3>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">Caractéristiques uniques</h4>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">Le titane s&apos;est imposé comme un matériau de choix dans l&apos;industrie horlogère, en particulier pour les montres techniques et sportives <a href="https://58facettes.fr/blogs/magazine/les-metaux-utilises-en-horlogerie " className="citation" target="_blank" rel="noopener noreferrer">[359]</a>.</p>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Avantages clés:</h5>
                    <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                      <li>• <strong>Légèreté:</strong> 45% plus léger que l&apos;acier</li>
                      <li>• <strong>Hypoallergénique:</strong> Idéal pour peaux sensibles</li>
                      <li>• <strong>Résistance corrosion:</strong> Supérieure à l&apos;acier</li>
                      <li>• <strong>Densité:</strong> ~4,51 g/cm³ vs ~7,8 g/cm³ (acier)</li>
                    </ul>
                  </div>
                </div>

                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">Comparaison avec l&apos;acier</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700">
                          <th className="p-2 text-left text-gray-900 dark:text-gray-100">Caractéristique</th>
                          <th className="p-2 text-left text-gray-900 dark:text-gray-100">Titane</th>
                          <th className="p-2 text-left text-gray-900 dark:text-gray-100">Acier</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2 border-b dark:border-gray-600 text-gray-700 dark:text-gray-300">Poids</td>
                          <td className="p-2 border-b dark:border-gray-600 text-green-600 dark:text-green-400">Très léger</td>
                          <td className="p-2 border-b dark:border-gray-600 text-gray-700 dark:text-gray-300">Lourd</td>
                        </tr>
                        <tr>
                          <td className="p-2 border-b dark:border-gray-600 text-gray-700 dark:text-gray-300">Résistance corrosion</td>
                          <td className="p-2 border-b dark:border-gray-600 text-green-600 dark:text-green-400">Excellente</td>
                          <td className="p-2 border-b dark:border-gray-600 text-gray-700 dark:text-gray-300">Bonne</td>
                        </tr>
                        <tr>
                          <td className="p-2 border-b dark:border-gray-600 text-gray-700 dark:text-gray-300">Biocompatibilité</td>
                          <td className="p-2 border-b dark:border-gray-600 text-green-600 dark:text-green-400">Hypoallergénique</td>
                          <td className="p-2 border-b dark:border-gray-600 text-gray-700 dark:text-gray-300">Peut contenir Ni</td>
                        </tr>
                        <tr>
                          <td className="p-2 text-gray-700 dark:text-gray-300">Prix</td>
                          <td className="p-2 text-red-600 dark:text-red-400">Plus cher</td>
                          <td className="p-2 text-gray-700 dark:text-gray-300">Abordable</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    Source: <a href="https://fr.haibowellti.com/info/titanium-watches-vs-stainless-steel-watches-96570776.html " className="citation" target="_blank" rel="noopener noreferrer">[355]</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Alliages Cuivreux */}
            <div id="alliages-cuivreux" className="mb-12">
              <h3 className="serif-heading text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Les Alliages Cuivreux Traditionnels</h3>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">Le Laiton : Utilisation historique</h4>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">Le laiton, un alliage de cuivre et de zinc, est l&apos;un des matériaux les plus historiquement significatifs en horlogerie <a href="https://www.machining-custom.com/fr/blog/brass-vs-aluminium-vs-stainless-steel.html " className="citation" target="_blank" rel="noopener noreferrer">[366]</a>.</p>
                  <ul className="space-y-2 mb-4 text-gray-700 dark:text-gray-300">
                    <li><strong>Composition:</strong> Cuivre (Cu) + Zinc (Zn)</li>
                    <li><strong>Avantages:</strong> Excellente usinabilité, bonne résistance à la corrosion</li>
                    <li><strong>Applications:</strong> Platines, ponts, rouages historiques</li>
                  </ul>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Utilisé traditionnellement pour la &quot;cage&quot; ou le &quot;bâti&quot; du mouvement <a href="https://fr.wikipedia.org/wiki/M%C3%A9canisme_(horlogerie )" className="citation" target="_blank" rel="noopener noreferrer">[349]</a>.</p>
                </div>

                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">Le Maillechort : Composition et avantages</h4>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">Le maillechort, également connu sous le nom d&apos;argentan, est un alliage de cuivre, de nickel et de zinc <a href="https://inside.code41watches.com/fr/les-differents-materiaux-utilises-en-horlogerie " className="citation" target="_blank" rel="noopener noreferrer">[214]</a>.</p>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-4">
                    <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Composition typique:</h5>
                    <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                      <li>• <strong>Cuivre:</strong> 45-65%</li>
                      <li>• <strong>Nickel:</strong> 5-25%</li>
                      <li>• <strong>Zinc:</strong> 20-45%</li>
                    </ul>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Résistance supérieure à la corrosion et rigidité accrue par rapport au laiton <a href="https://www.tartaix.com/content/103-maillechort " className="citation" target="_blank" rel="noopener noreferrer">[329]</a>.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Métaux Précieux Section */}
        <section id="metaux-precieux" className="p-8">
          <div className="section-card p-8">
            <h2 className="serif-heading text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">Les Métaux Précieux en Horlogerie de Luxe</h2>

            {/* Or */}
            <div id="or" className="mb-12">
              <h3 className="serif-heading text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">L&apos;Or : Un Symbole de Luxe</h3>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">Alliages d&apos;or</h4>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">L&apos;or est utilisé sous forme d&apos;alliage pour améliorer la dureté et la résistance. La teneur en or fin est exprimée en carats <a href="http://watches-lexic.ch/pages/fr/tec/exp6.htm " className="citation" target="_blank" rel="noopener noreferrer">[436]</a>.</p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-yellow-400 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300"><strong>Or jaune:</strong> Or + Cuivre + Argent</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-rose-400 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300"><strong>Or rose:</strong> Or + Cuivre (proportion plus élevée)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gray-200 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300"><strong>Or blanc:</strong> Or + Métaux blancs (Ni, Pd, Ag)</span>
                    </div>
                  </div>
                </div>

                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">Propriétés et traitement</h4>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">Après durcissement par alliage, l&apos;or 18 carats atteint une dureté de 120 à 200 HV, suffisante pour résister à l&apos;usure quotidienne <a href="http://watches-lexic.ch/pages/fr/tec/exp6.htm " className="citation" target="_blank" rel="noopener noreferrer">[436]</a>.</p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li><strong>Dureté:</strong> 120-200 HV (or 18K)</li>
                    <li><strong>Traitements:</strong> Polissage, satinage, rhodiage</li>
                    <li><strong>Résistance:</strong> Inoxydable et inaltérable</li>
                  </ul>
                </div>

                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">Applications</h4>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">L&apos;or est principalement utilisé pour les boîtiers de montres de luxe et les éléments décoratifs <a href="https://58facettes.fr/blogs/magazine/les-metaux-utilises-en-horlogerie " className="citation" target="_blank" rel="noopener noreferrer">[433]</a>.</p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li><strong>Boîtiers:</strong> Symboles de prestige</li>
                    <li><strong>Cadrans:</strong> Souvent avec guillochage</li>
                    <li><strong>Éléments:</strong> Aiguilles, index, couronnes</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Platine */}
            <div id="platine" className="mb-12">
              <h3 className="serif-heading text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Le Platine : L&apos;Excellence Rare</h3>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-gray-100">Caractéristiques et densité</h4>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">Le platine est un métal précieux encore plus rare et plus dense que l&apos;or, réservé aux garde-t
