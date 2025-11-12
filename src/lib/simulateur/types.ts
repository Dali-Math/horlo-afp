// =====================================
// TYPES DU SIMULATEUR HORLOGER PRO
// =====================================

// Spécifications techniques d'un mouvement
export interface TechnicalSpecs {
  name: string;
  frequency: number; // Hz
  ampNorm: number; // Degrés
  powerReserve: number; // Heures
  positions: number[]; // Déviations par position (s/j)
  tempCoef: number; // s/j par °C
  beatRate: number; // A/h
  category: 'automatic' | 'manual' | 'chronograph' | 'tourbillon';
  jewels?: number;
  diameter?: number;
  height?: number;
  hairspring: string; // Type de spiral
  regulator: string; // Type de régulateur
}

// Résultats de simulation magnétisme
export interface MagnetismResult {
  level: number;
  amplitudeLoss: number;
  beatRateDeviation: number;
  recommendedAction: 'none' | 'warning' | 'critical';
  diagnostic: string;
}

// Résultats de simulation impact/chute
export interface ImpactResult {
  amplitudeDrop: number; // %
  pivotDeformation: number; // mm
  jewelDamage: 'none' | 'warning' | 'critical';
  escapementShift: number; // microns
  recommendedAction: string;
}

// Analyse acoustique du mouvement
export interface AcousticAnalysis {
  rotorNoise: number; // dB
  beatIrregularity: number; // CV
  tickingAmplitude: number; // dB
  anomalies: string[];
}

// Données brutes de simulation
export interface SimulationData {
  amplitude: number;
  beatError: number;
  gain: number;
  position: number;
  temperature: number;
  age: number;
  pivotWear: number;
  mainspringWear: number;
  magnetismLevel: number;
  magneticField: number;
}

// Niveau de diagnostic
export type DiagnosticLevel = 'ok' | 'warning' | 'critical';

// Diagnostic individuel
export interface Diagnostic {
  level: DiagnosticLevel;
  text: string;
}

// Entrées du moteur de simulation
export interface SimulationInputs {
  specs: TechnicalSpecs;
  amplitude: number;
  beatError: number;
  gain: number;
  position: number;
  temperature: number;
  age: number;
  pivotWear: number;
  mainspringWear: number;
  magneticField: number;
}

// Résultats complets du moteur de simulation
export interface SimulationResults {
  isochronismError: number;
  isochronismStatus: 'status-ok' | 'status-warning' | 'status-critical';
  amplitudeLoss: number;
  positionDeviation: number;
  huygensScore: number;
  huygensStatus: 'status-ok' | 'status-warning' | 'status-critical';
  beatImpact: number;
  tempImpact: number;
  dynamicError: number;
  totalDeviation: number;
  deviationStatus: 'status-ok' | 'status-warning' | 'status-critical';
  powerLoss: number;
  effectiveReserve: number;
}
