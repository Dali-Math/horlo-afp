// Computational Fluid Dynamics - Frottement visqueux
export interface CFDResult {
  dragForce: number; // N
  amplitudeLoss: number; // Degrés
  altitudeImpact: number; // s/j
}

export function calculateAirDrag(
  amplitude: number,
  frequency: number,
  altitude: number = 0, // mètres
  temperature: number = 23
): CFDResult {
  // Densité air en fonction altitude (modèle simplifié)
  const airDensity = 1.225 * Math.exp(-altitude / 8500); // kg/m³
  
  // Coefficient traînée pour balancier (forme disque)
  const dragCoefficient = 1.2;
  const crossSection = 0.0005; // m² (surface balancier)
  
  // Vitesse tangentielle max
  const maxVelocity = (amplitude * Math.PI / 180) * frequency * 0.05; // 0.05m = rayon
  
  // Force traînée
  const dragForce = 0.5 * airDensity * Math.pow(maxVelocity, 2) * dragCoefficient * crossSection;
  const amplitudeLoss = dragForce * 50; // Conversion en degrés perdus
  
  // Impact chronométrique
  const altitudeImpact = (1.225 - airDensity) * 0.3; // 0.3s/j par variation densité
  
  return {
    dragForce,
    amplitudeLoss,
    altitudeImpact
  };
}
