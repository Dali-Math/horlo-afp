export interface TechnicalSpecs {
  name: string;
  frequency: number;
  ampNorm: number;
  powerReserve: number;
  positions: number[];
  tempCoef: number;
  beatRate: number;
  category: 'automatic' | 'manual' | 'chronograph' | 'tourbillon';
  jewels?: number;
  diameter?: number;
  height?: number;
  hairspring: string;
  regulator: string;
}

export interface MagnetismResult {
  level: number;
  amplitudeLoss: number;
  beatRateDeviation: number;
  recommendedAction: 'none' | 'warning' | 'critical';
  diagnostic: string;
}

export interface ImpactResult {
  amplitudeDrop: number;
  pivotDeformation: number;
  jewelDamage: 'none' | 'warning' | 'critical';
  escapementShift: number;
  recommendedAction: string;
}

export interface AcousticAnalysis {
  rotorNoise: number;
  beatIrregularity: number;
  tickingAmplitude: number;
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
