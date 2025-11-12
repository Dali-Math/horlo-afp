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
}
export interface SimulationResults {
  isochronismError: number;
  amplitudeLoss: number;
  positionDeviation: number;
  huygensScore: number;
  beatImpact: number;
  tempImpact: number;
  dynamicError: number;
  totalDeviation: number;
  powerLoss: number;
  effectiveReserve: number;
  isochronismStatus: string;
  huygensStatus: string;
  deviationStatus: string;
}
export interface MagnetismResult {
  level: number;
  amplitudeLoss: number;
  beatRateDeviation: number;
  recommendedAction: 'none' | 'warning' | 'critical';
  diagnostic: string;
}

export interface ImpactResult {
  amplitudeDrop: number; // %
  pivotDeformation: number; // mm
  jewelDamage: 'none' | 'warning' | 'critical';
  escapementShift: number; // microns
  recommendedAction: string;
}

export interface AcousticAnalysis {
  rotorNoise: number; // dB
  beatIrregularity: number; // CV
  tickingAmplitude: number; // dB
  anomalies: string[];
}

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

export type DiagnosticLevel = 'ok' | 'warning' | 'critical';
export interface Diagnostic {
  level: DiagnosticLevel;
  text: string;
}
export interface MouvementSpecs {
  name: string;
  beatRate: number;
  frequency: number;
  ampNorm: number;
  powerReserve: number;
  tempCoef: number;
  positions: number[];
}
