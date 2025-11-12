import type { SimulationInputs, SimulationResults } from './types';

/**
 * Moteur de calcul principal pour la simulation horlogère
 * Basé sur les principes de physique horlogère et empirisme
 */
export function calculateSimulation(inputs: SimulationInputs): SimulationResults {
  const {
    specs,
    amplitude,
    beatError,
    gain,
    position,
    temperature,
    age,
    pivotWear,
    mainspringWear
  } = inputs;

  // 1. CALCUL ISOCHRONISME
  // L'isochronisme mesure la régularité des oscillations
  // Une perte d'amplitude indique un défaut d'isochronisme
  const amplitudeLoss = specs.ampNorm - amplitude;
  const isochronismError = amplitudeLoss * 0.03; // 3% d'erreur par 10° de perte
  
  let isochronismStatus: 'status-ok' | 'status-warning' | 'status-critical';
  if (isochronismError < 3) {
    isochronismStatus = 'status-ok';
  } else if (isochronismError < 8) {
    isochronismStatus = 'status-warning';
  } else {
    isochronismStatus = 'status-critical';
  }

  // 2. POSITION DE HUYGENS (stabilité positionnelle)
  // Mesure l'effet de la gravité sur différentes positions
  const positionDeviation = specs.positions[position] || 0;
  const huygensScore = Math.max(0, 100 - Math.abs(positionDeviation) * 5);
  
  let huygensStatus: 'status-ok' | 'status-warning' | 'status-critical';
  if (huygensScore > 80) {
    huygensStatus = 'status-ok';
  } else if (huygensScore > 60) {
    huygensStatus = 'status-warning';
  } else {
    huygensStatus = 'status-critical';
  }

  // 3. EFFET DYNAMIQUE SPIRAL
  // Le battement et la température affectent la fréquence
  const beatImpact = beatError * 2; // Impact du battement en s/j
  const tempImpact = (temperature - 23) * specs.tempCoef; // Déviation thermique
  const dynamicError = beatImpact + tempImpact;

  // 4. DÉVIATION TOTALE
  // Somme de tous les effets
  const totalDeviation = positionDeviation + gain + tempImpact - isochronismError;
  
  let deviationStatus: 'status-ok' | 'status-warning' | 'status-critical';
  if (Math.abs(totalDeviation) <= 5) {
    deviationStatus = 'status-ok';
  } else if (Math.abs(totalDeviation) <= 10) {
    deviationStatus = 'status-warning';
  } else {
    deviationStatus = 'status-critical';
  }

  // 5. RÉSERVE DE MARCHE
  // Calcul de la perte due à l'usure et à l'âge
  const powerLoss = (mainspringWear * 0.5) + (age * 1.2);
  const effectiveReserve = Math.max(0, specs.powerReserve - powerLoss);

  return {
    isochronismError,
    isochronismStatus,
    amplitudeLoss,
    positionDeviation,
    huygensScore,
    huygensStatus,
    beatImpact,
    tempImpact,
    dynamicError,
    totalDeviation,
    deviationStatus,
    powerLoss,
    effectiveReserve
  };
}

/**
 * Calcule le facteur de qualité Q du balancier
 * Q = (énergie stockée) / (énergie dissipée par cycle)
 */
export function calculateQualityFactor(
  amplitude: number,
  frequency: number,
  pivotWear: number
): number {
  const baseQ = 20000; // Q typique pour un mouvement de qualité
  const wearFactor = 1 - (pivotWear / 100) * 0.5; // L'usure réduit Q
  const amplitudeFactor = amplitude / 300; // Normalisation
  
  return baseQ * wearFactor * amplitudeFactor;
}

/**
 * Estime le temps de fonctionnement restant avant révision
 */
export function estimateServiceInterval(
  age: number,
  pivotWear: number,
  mainspringWear: number
): number {
  const baseInterval = 5; // 5 ans standard
  const ageReduction = age * 0.1;
  const wearReduction = ((pivotWear + mainspringWear) / 200) * 2;
  
  return Math.max(0, baseInterval - ageReduction - wearReduction);
}
