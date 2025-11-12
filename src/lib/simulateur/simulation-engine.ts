import type { SimulationInputs, SimulationResults } from './types';
import { TECHNICAL_SPECS } from './database';
import { calculateMagnetism } from './modules/magnetism';
import { calculatePowerReserve } from './physics-engine';

export function runSimulationEngine(inputs: SimulationInputs): SimulationResults {
  const specs = TECHNICAL_SPECS[inputs.calibre];

  const magResult = calculateMagnetism(
    specs.beatRate,
    inputs.amplitude,
    inputs.age * 8760,
    inputs.magneticField
  );

  const effectiveReserve = calculatePowerReserve(
    specs.powerReserve,
    inputs.mainspringWear,
    inputs.age
  );

  const amplitudeLoss = specs.ampNorm - inputs.amplitude;
  const isochronismError = Math.max(0, amplitudeLoss * 0.03);
  const positionDeviation = specs.positions[inputs.position];
  const tempImpact = (inputs.temperature - 23) * specs.tempCoef;
  const beatImpact = inputs.beatError * 2;
  const totalDeviation = positionDeviation + inputs.gain + tempImpact - isochronismError;

  return {
    isochronismError,
    isochronismStatus: isochronismError > 5 ? 'status-critical' : isochronismError > 2 ? 'status-warning' : 'status-ok',
    amplitudeLoss,
    positionDeviation,
    huygensScore: 100 - Math.abs(positionDeviation) * 5,
    huygensStatus: Math.abs(positionDeviation) > 10 ? 'status-critical' : Math.abs(positionDeviation) > 5 ? 'status-warning' : 'status-ok',
    beatImpact,
    tempImpact,
    dynamicError: beatImpact + tempImpact,
    totalDeviation,
    powerLoss: specs.powerReserve - effectiveReserve,
    effectiveReserve,
    deviationStatus: Math.abs(totalDeviation) > 15 ? 'status-critical' : Math.abs(totalDeviation) > 5 ? 'status-warning' : 'status-ok'
  };
}

export function calculateQualityFactor(
  amplitude: number,
  frequency: number,
  pivotWear: number
): number {
  const baseQ = 20000;
  const wearFactor = 1 - (pivotWear / 100) * 0.5;
  const amplitudeFactor = amplitude / 300;
  return baseQ * wearFactor * amplitudeFactor;
}

export function estimateServiceInterval(
  age: number,
  pivotWear: number,
  mainspringWear: number
): number {
  const baseInterval = 5;
  const ageReduction = age * 0.1;
  const wearReduction = ((pivotWear + mainspringWear) / 200) * 2;
  return Math.max(0, baseInterval - ageReduction - wearReduction);
}
