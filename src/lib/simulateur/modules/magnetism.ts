import { MagnetismResult } from '../types';

export function calculateMagnetism(
  currentBeatRate: number,
  currentAmplitude: number,
  exposureTime: number, // heures
  magneticFieldStrength: number // Gauss
): MagnetismResult {
  const magnetizationRate = 0.02 * Math.pow(Math.max(0, magneticFieldStrength) / 100, 2);
  const magnetismLevel = Math.min(100, exposureTime * magnetizationRate);
  
  const beatRateDeviation = currentBeatRate * (magnetismLevel * 0.0015);
  const amplitudeLoss = currentAmplitude * (magnetismLevel * 0.008);
  
  return {
    level: magnetismLevel,
    beatRateDeviation,
    amplitudeLoss,
    recommendedAction: magnetismLevel > 60 ? 'critical' : magnetismLevel > 30 ? 'warning' : 'none',
    diagnostic: `Magnétisme ${magnetismLevel.toFixed(0)}% : ${
      magnetismLevel > 60 ? 'DÉMAGNÉTISATION IMMÉDIATE REQUISE' : 
      magnetismLevel > 30 ? 'Risque de déviation chronométrique' : 
      'Aucun effet significatif'
    }`
  };
}
