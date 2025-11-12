import { TechnicalSpecs } from './types';

export function calculateAmplitudeLoss(
  currentAmplitude: number,
  pivotWear: number,
  powerReserve: number,
  age: number
): number {
  const wearFactor = 1 - (pivotWear / 100) * 0.3;
  const springFactor = 1 - (age / 30) * 0.2;
  return currentAmplitude * (1 - wearFactor * springFactor);
}

export function calculateTimingDeviation(
  position: number,
  temperature: number,
  specs: TechnicalSpecs
): number {
  const positionDev = specs.positions[position];
  const tempDev = (temperature - 23) * specs.tempCoef;
  return positionDev + tempDev;
}

export function calculatePowerReserve(
  baseReserve: number,
  mainspringWear: number,
  age: number
): number {
  const loss = (mainspringWear * 0.5) + (age * 1.2);
  return baseReserve - loss;
}
