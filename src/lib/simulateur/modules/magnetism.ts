import { MagnetismResult } from '../types';

export function calculateMagnetism(
  beatRate: number,
  amplitude: number,
  ageHours: number,
  magneticField: number
): MagnetismResult {
  const level = Math.min(100, magneticField / 5);
  const beatRateDeviation = (magneticField / 100) * 0.5;
  const amplitudeLoss = (magneticField / 100) * 30;

  return {
    level,
    beatRateDeviation,
    amplitudeLoss,
    recommendedAction: level > 60 ? 'critical' : level > 30 ? 'warning' : 'none',
    diagnostic: level > 60 ? 'Magnétisme sévère' : level > 30 ? 'Magnétisme modéré' : 'Pas de magnétisme'
  };
}
