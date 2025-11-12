import { MOUVEMENTS_DB } from '@/lib/simulateur/database';
import type { MouvementSpecs } from '@/lib/simulateur/types';

export interface MouvementSpecs {
  name: string;
  frequency: number;
  ampNorm: number;
  powerReserve: number;
  positions: number[];
  tempCoef: number;
  hairspring: string;
  regulator: string;
  beatRate: 18000 | 21600 | 25200 | 28800 | 36000;
  jewels: number;
  diameter: number;
  height: number;
  dateAdded: string;
  category: 'automatic' | 'manual' | 'chronograph' | 'perpetual' | 'tourbillon';
}

export interface SimulationInputs {
  specs: MouvementSpecs;
  amplitude: number;
  beatError: number;
  gain: number;
  position: number;
  temperature: number;
  age: number;
  pivotWear: number;
  mainspringWear: number;
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

export interface Diagnostic {
  level: 'critical' | 'warning' | 'ok';
  text: string;
}

export interface SimulationData {
  amplitude: number;
  amplitudeLoss: number;
  beatError: number;
  pivotWear: number;
  msWear: number;
  age: number;
  totalDeviation: number;
  isochronismError: number;
  huygensScore: number;
}
