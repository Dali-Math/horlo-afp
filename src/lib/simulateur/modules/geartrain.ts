export interface GearDiagnostic {
  efficiency: number; // %
  profileError: number; // microns
  centerDistanceError: number; // mm
  status: 'ok' | 'warning' | 'critical';
  recommendation: string;
}

export function diagnoseGearTrain(
  teethDeviations: number[], // microns per tooth
  centerDistance: number, // mm nomimal
  measuredDistance: number
): GearDiagnostic {
  const maxDeviation = Math.max(...teethDeviations);
  const distanceError = Math.abs(measuredDistance - centerDistance);
  
  // Rendement = f(profil + jeu)
  const efficiency = Math.max(85, 98 - (maxDeviation * 0.5) - (distanceError * 50));
  
  return {
    efficiency,
    profileError: maxDeviation,
    centerDistanceError: distanceError,
    status: maxDeviation > 5 || distanceError > 0.01 ? 'critical' : maxDeviation > 3 ? 'warning' : 'ok',
    recommendation: 
      maxDeviation > 5 ? 'Usinage engrenage nécessaire' :
      distanceError > 0.01 ? 'Régler jeu d\'entraxe' :
      'Train de rouage optimal'
  };
}
