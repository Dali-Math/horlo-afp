import type { MouvementSpecs, SimulationResults, Diagnostic } from './types';

interface ExportData {
  specs: MouvementSpecs;
  inputs: {
    amplitude: number;
    beatError: number;
    gain: number;
    position: number;
    temperature: number;
    age: number;
    pivotWear: number;
    mainspringWear: number;
  };
  results: SimulationResults;
  diagnostics: Diagnostic[];
}

const POSITION_NAMES = [
  'CH (Cadran Haut)',
  '6H (Couronne Gauche)',
  '9H (Couronne Bas)',
  '3H (Couronne Haut)',
  '12H (Cadran Bas)',
  'CU (Couronne Dessus)'
];

/**
 * Exporte un rapport technique complet au format JSON
 * (En production, intégrer jsPDF pour génération PDF réelle)
 */
export function exportTechnicalReport(data: ExportData): void {
  const { specs, inputs, results, diagnostics } = data;

  const report = {
    metadata: {
      titre: `Rapport Technique - ${specs.name}`,
      date: new Date().toLocaleString('fr-CH', {
        dateStyle: 'full',
        timeStyle: 'medium'
      }),
      version: '2.0.0',
      logiciel: 'Simulateur Pro - Résonance & Diagnostics'
    },
    
    identificationMouvement: {
      calibre: specs.name,
      categorie: specs.category.toUpperCase(),
      diametre: `${specs.diameter} mm`,
      hauteur: `${specs.height} mm`,
      rubis: specs.jewels,
      frequence: `${specs.frequency} Hz (${specs.beatRate} A/h)`,
      reserveMarche: `${specs.powerReserve}h`,
      spiral: specs.hairspring,
      regulateur: specs.regulator
    },

    parametresMesure: {
      amplitude: `${inputs.amplitude}°`,
      amplitudeNominale: `${specs.ampNorm}°`,
      ecartAmplitude: `${results.amplitudeLoss}°`,
      battement: `${inputs.beatError} ms`,
      gainReglage: `${inputs.gain > 0 ? '+' : ''}${inputs.gain} s/j`,
      position: POSITION_NAMES[inputs.position],
      temperature: `${inputs.temperature}°C`,
      ageModvement: `${inputs.age} ans`
    },

    etatUsure: {
      pivots: `${inputs.pivotWear}%`,
      ressortMoteur: `${inputs.mainspringWear}%`,
      interpretation: getWearInterpretation(inputs.pivotWear, inputs.mainspringWear)
    },

    resultatsSimulation: {
      isochronisme: {
        erreur: `${results.isochronismError.toFixed(2)} s/j`,
        statut: getStatusLabel(results.isochronismStatus),
        interpretation: getIsochronismInterpretation(results.isochronismError)
      },
      stabilitePosition: {
        scoreHuygens: `${results.huygensScore.toFixed(0)}%`,
        deviation: `${results.positionDeviation} s/j`,
        statut: getStatusLabel(results.huygensStatus)
      },
      effetDynamique: {
        total: `${results.dynamicError.toFixed(2)} s/j`,
        impactBattement: `${results.beatImpact.toFixed(2)} s/j`,
        impactThermique: `${results.tempImpact.toFixed(2)} s/j`
      },
      deviationTotale: {
        valeur: `${results.totalDeviation > 0 ? '+' : ''}${results.totalDeviation.toFixed(1)} s/j`,
        statut: getStatusLabel(results.deviationStatus),
        precision: getPrecisionClass(results.totalDeviation)
      },
      reserveMarche: {
        effective: `${results.effectiveReserve.toFixed(0)}h`,
        nominale: `${specs.powerReserve}h`,
        perte: `${results.powerLoss.toFixed(1)}h`
      }
    },

    diagnosticAutomatique: diagnostics.map(d => ({
      niveau: d.level.toUpperCase(),
      description: d.text,
      priorite: d.level === 'critical' ? 'URGENTE' : d.level === 'warning' ? 'IMPORTANTE' : 'INFO'
    })),

    recommendations: generateRecommendations(diagnostics),

    certifications: {
      tolerancesCOSC: Math.abs(results.totalDeviation) <= 5 ? 'CONFORME' : 'NON CONFORME',
      tolerancesChronometre: Math.abs(results.totalDeviation) <= 4 ? 'CONFORME' : 'NON CONFORME',
      tolerancesGeneve: results.isochronismError < 3 && Math.abs(results.totalDeviation) <= 5 ? 'CONFORME' : 'NON CONFORME'
    },

    notes: [
      'Ce rapport est généré par simulation et ne remplace pas un contrôle par horloger certifié',
      'Les valeurs d\'usure sont des estimations basées sur les paramètres entrés',
      'Pour un diagnostic précis, utiliser un appareil de contrôle certifié (Witschi, Timegrapher)'
    ]
  };

  // Création du fichier
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const filename = `Rapport-${specs.name.replace(/ /g, '-')}-${Date.now()}.json`;
  
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  alert(`✅ Rapport technique exporté: ${filename}\n\n📄 Format: JSON (PDF disponible en version Pro)`);
}

/**
 * Exporte les données brutes au format JSON pour analyse
 */
export function exportJSON(data: ExportData): void {
  const { specs, inputs, results, diagnostics } = data;

  const exportData = {
    metadata: {
      generatedAt: new Date().toISOString(),
      softwareVersion: '2.0.0',
      format: 'Watchmaking Simulation Data v2.0'
    },
    
    calibre: specs,
    
    inputs: {
      amplitude: inputs.amplitude,
      beatError: inputs.beatError,
      gain: inputs.gain,
      position: inputs.position,
      positionName: POSITION_NAMES[inputs.position],
      temperature: inputs.temperature,
      age: inputs.age,
      pivotWear: inputs.pivotWear,
      mainspringWear: inputs.mainspringWear
    },

    calculations: {
      isochronismError: results.isochronismError,
      amplitudeLoss: results.amplitudeLoss,
      positionDeviation: results.positionDeviation,
      huygensScore: results.huygensScore,
      beatImpact: results.beatImpact,
      tempImpact: results.tempImpact,
      dynamicError: results.dynamicError,
      totalDeviation: results.totalDeviation,
      powerLoss: results.powerLoss,
      effectiveReserve: results.effectiveReserve
    },

    status: {
      isochronism: results.isochronismStatus,
      huygens: results.huygensStatus,
      deviation: results.deviationStatus
    },

    diagnostics: diagnostics,

    timestamp: Date.now()
  };

  const jsonString = JSON.stringify(exportData, null, 2);
  
  // Copie dans le presse-papier
  navigator.clipboard.writeText(jsonString).then(() => {
    alert('✅ Données techniques copiées dans le presse-papier!\n\n📋 Format: JSON\n💾 Prêt pour import dans logiciel d\'analyse');
  }).catch(() => {
    // Fallback: téléchargement
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Data-${specs.name.replace(/ /g, '-')}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });
}

// Fonctions utilitaires
function getStatusLabel(status: string): string {
  switch(status) {
    case 'status-ok': return 'EXCELLENT';
    case 'status-warning': return 'ACCEPTABLE';
    case 'status-critical': return 'CRITIQUE';
    default: return 'INDÉTERMINÉ';
  }
}

function getIsochronismInterpretation(error: number): string {
  if (error < 1) return 'Isochronisme optimal - qualité chronométrique';
  if (error < 3) return 'Isochronisme bon - dans les normes';
  if (error < 5) return 'Isochronisme acceptable - surveillance recommandée';
  if (error < 8) return 'Défaut léger - intervention à planifier';
  return 'Défaut majeur - révision nécessaire';
}

function getPrecisionClass(deviation: number): string {
  const abs = Math.abs(deviation);
  if (abs <= 2) return 'CHRONOMÉTRE SUPÉRIEUR';
  if (abs <= 4) return 'CHRONOMÉTRE COSC';
  if (abs <= 5) return 'QUALITÉ POINÇON GENÈVE';
  if (abs <= 10) return 'PRÉCISION STANDARD';
  if (abs <= 20) return 'HORS SPÉCIFICATIONS';
  return 'NÉCESSITE RÉVISION';
}

function getWearInterpretation(pivot: number, mainspring: number): string {
  const avg = (pivot + mainspring) / 2;
  if (avg < 20) return 'Usure minimale - excellent entretien';
  if (avg < 40) return 'Usure normale pour l\'âge';
  if (avg < 60) return 'Usure notable - surveillance nécessaire';
  if (avg < 80) return 'Usure importante - révision à planifier';
  return 'Usure critique - intervention urgente';
}

function generateRecommendations(diagnostics: Diagnostic[]): string[] {
  const criticals = diagnostics.filter(d => d.level === 'critical').length;
  const warnings = diagnostics.filter(d => d.level === 'warning').length;

  const recommendations: string[] = [];

  if (criticals > 0) {
    recommendations.push('🔴 PRIORITÉ HAUTE: Consultation horloger dans les 7 jours');
    recommendations.push('Arrêter le port jusqu\'à révision si amplitude < 220°');
    recommendations.push('Préparer: historique entretien + factures précédentes');
  } else if (warnings >= 3) {
    recommendations.push('🟡 RÉVISION PRÉVENTIVE: Planifier sous 2-3 mois');
    recommendations.push('Éviter chocs et conditions extrêmes');
    recommendations.push('Surveillance mensuelle amplitude recommandée');
  } else if (warnings > 0) {
    recommendations.push('🟢 SURVEILLANCE: Contrôle semestriel suffisant');
    recommendations.push('Continuer usage normal');
    recommendations.push('Noter toute dégradation pour prochain contrôle');
  } else {
    recommendations.push('✅ MAINTENANCE OPTIMALE');
    recommendations.push('Continuer programme entretien actuel');
    recommendations.push('Prochain contrôle dans 12-24 mois');
  }

  recommendations.push('');
  recommendations.push('GÉNÉRAL:');
  recommendations.push('- Éviter champs magnétiques (aimants, haut-parleurs)');
  recommendations.push('- Remontage manuel doux et progressif');
  recommendations.push('- Stockage position couronne haute si non porté');
  recommendations.push('- Révision complète tous les 5-7 ans minimum');

  return recommendations;
}
