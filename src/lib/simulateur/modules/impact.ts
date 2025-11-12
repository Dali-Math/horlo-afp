import { ImpactResult } from '../types';

export function simulateDrop(
  dropHeight: number, // cm
  surfaceType: 'wood' | 'tile' | 'concrete',
  pivotWear: number, // %
  amplitude: number
): ImpactResult {
  const impactEnergy = 9.81 * dropHeight / 100 * 0.5; // Joules (masse estimée montre)
  const surfaceFactor = { wood: 0.3, tile: 0.7, concrete: 1.0 }[surfaceType];
  const absorbedEnergy = impactEnergy * surfaceFactor;
  
  const amplitudeDrop = Math.min(100, absorbedEnergy * 15);
  const deformation = absorbedEnergy * 0.02 * (1 + pivotWear / 100);
  const jewelDamage = absorbedEnergy > 0.05 ? 'critical' : absorbedEnergy > 0.02 ? 'warning' : 'none';
  
  return {
    amplitudeDrop,
    pivotDeformation: deformation,
    jewelDamage,
    escapementShift: deformation * 1000,
    recommendedAction: 
      deformation > 0.03 ? 'REMPLACEMENT AXES REQUIS' :
      jewelDamage === 'critical' ? 'INSPECTION PIERRES' :
      amplitudeDrop > 25 ? 'RÉGULATION NÉCESSAIRE' :
      'Aucune action requise'
  };
}
