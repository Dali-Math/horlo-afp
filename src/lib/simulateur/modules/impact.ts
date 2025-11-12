import { ImpactResult } from '../types';

export function simulateDrop(height: number, pivotWear: number): ImpactResult {
  const amplitudeDrop = height * 0.5;
  const pivotDeformation = height * 0.01;
  const jewelDamage = height > 50 ? 'critical' : height > 20 ? 'warning' : 'none';
  
  return {
    amplitudeDrop,
    pivotDeformation,
    jewelDamage,
    escapementShift: height * 0.1,
    recommendedAction: height > 50 ? 'Révision immédiate' : 'Surveillance'
  };
}
