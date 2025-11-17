import database from './spirals-database.json';

export interface SpiralParams {
  diametre: number;
  frequence: number;
  amplitude: number;
  materiau: keyof typeof database.materials;
  typeSpiral: 'phillips' | 'breguet' | 'grossmann';
  customFactor?: number; // Pour mouvements non référencés
}

export interface CalculatedResults {
  longueur: number;
  rayonCorne: number;
  levee: number;
  spires: number;
  raideur: number;
  periode: number;
  inertie: number;
  materialData: typeof database.materials.nivarox;
  validated: boolean;
  sourceMovement?: string;
}

export interface MovementMatch {
  exactMatch: boolean;
  closestMovement: typeof database.movements[0];
  confidence: number; // 0-100
}

/**
 * Trouve le mouvement le plus proche dans la base
 */
export function findClosestMovement(params: SpiralParams): MovementMatch {
  const matches = database.movements
    .filter(m => 
      Math.abs(m.frequency - params.frequence) <= 3600 &&
      Math.abs(m.balanceDiameter - params.diametre) <= 1.0
    )
    .sort((a, b) => {
      const scoreA = Math.abs(a.frequency - params.frequence) + 
                    Math.abs(a.balanceDiameter - params.diametre) * 1000;
      const scoreB = Math.abs(b.frequency - params.frequence) + 
                    Math.abs(b.balanceDiameter - params.diametre) * 1000;
      return scoreA - scoreB;
    });

  if (matches.length === 0) {
    return {
      exactMatch: false,
      closestMovement: database.movements[0],
      confidence: 0
    };
  }

  const closest = matches[0];
  const confidence = 100 - Math.min(
    Math.abs(closest.frequency - params.frequence) / 3600 * 50 +
    Math.abs(closest.balanceDiameter - params.diametre) * 25,
    100
  );

  return {
    exactMatch: closest.frequency === params.frequence && 
                closest.balanceDiameter === params.diametre,
    closestMovement: closest,
    confidence
  };
}

/**
 * Calcul principal du spiral
 */
export function calculateSpiral(params: SpiralParams): CalculatedResults {
  // Validation des entrées
  if (!params.diametre || params.diametre <= 0) {
    throw new Error('Diamètre invalide');
  }
  
  if (!database.materials[params.materiau]) {
    throw new Error('Matériau non supporté');
  }

  // Trouver mouvement correspondant
  const match = findClosestMovement(params);
  const movement = match.closestMovement;
  
  // Calculs physiques
  const periode = 1 / (params.frequence / 7200); // conversion a/h vers Hz
  const rayon = params.diametre / 2;
  
  // Inertie (modèle amélioré avec validation)
  const masse = movement ? 
    movement.balanceMass : 
    (Math.PI * rayon * rayon * 0.5 * 7.8) / 1000; // fallback si non référencé
  
  const inertie = movement ? 
    movement.balanceInertia / 1e6 : // conversion µg·cm² → kg·m²
    (masse * rayon * rayon) / 2;

  // Raideur K = I·ω²
  const omega = 2 * Math.PI / periode;
  const raideur = inertie * omega * omega;

  // Longueur (utiliser facteur du mouvement si disponible)
  let longueur: number;
  if (params.customFactor) {
    longueur = params.diametre * params.customFactor;
  } else if (movement && match.confidence > 80) {
    longueur = movement.recommendedSpringLength;
  } else {
    // Fallback formule Grossmann
    const facteur = movement?.calculationFactor || 
                   3.58 * (28800 / params.frequence) ** 0.5;
    longueur = params.diametre * facteur;
  }

  // Rayon corne d'âge (règle Phillips/Grossmann)
  const rayonRatio = database.calculationRules.hornRadiusRatio;
  const rayonCorne = params.diametre * rayonRatio;

  // Hauteur de levée (Breguet uniquement)
  const breguetRatio = database.calculationRules.breguetLiftRatio;
  const levee = params.typeSpiral === 'breguet' ? 
                params.diametre * breguetRatio : 0;

  // Nombre de spires actives
  const spiresRatio = database.calculationRules.activeCoilsRatio;
  const spires = Math.round(longueur / (Math.PI * params.diametre * spiresRatio));

  return {
    longueur: Math.round(longueur * 100) / 100,
    rayonCorne: Math.round(rayonCorne * 100) / 100,
    levee: Math.round(levee * 100) / 100,
    spires,
    raideur: Math.round(raideur * 1e6) / 1e6,
    periode,
    inertie: Math.round(inertie * 1e9) / 1e9,
    materialData: database.materials[params.materiau],
    validated: match.exactMatch,
    sourceMovement: `${movement.brand} ${movement.caliber}`
  };
}

/**
 * Génération du schéma pour canvas
 */
export interface DrawingData {
  centerX: number;
  centerY: number;
  scale: number;
  balanceRadius: number;
  springPath: Array<{x: number, y: number}>;
  hornCircle: {x: number, y: number, radius: number};
  annotations: Array<{text: string, x: number, y: number}>;
}

export function generateDrawingSchema(
  params: SpiralParams, 
  results: CalculatedResults
): DrawingData {
  const scale = 12;
  const balanceRadius = params.diametre * scale / 2;
  const centerX = 250; // canvas width / 2
  const centerY = 200; // canvas height / 2
  
  // Générer le chemin du spiral
  const springPath: Array<{x: number, y: number}> = [];
  let angle = 0;
  let radius = balanceRadius + 5;
  
  for (let i = 0; i < 20; i++) {
    springPath.push({
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius
    });
    angle += Math.PI / 4;
    radius += 3;
  }
  
  // Position de la corne d'âge
  const dernierAngle = angle - Math.PI / 4;
  const dernierRadius = radius - 3;
  
  const hornCircle = {
    x: centerX + Math.cos(dernierAngle) * dernierRadius,
    y: centerY + Math.sin(dernierAngle) * dernierRadius,
    radius: results.rayonCorne * scale
  };
  
  // Annotations
  const annotations = [
    { text: `Corne d'âge : r = ${results.rayonCorne}mm`, x: 10, y: 20 },
    { text: `Balancier : Ø ${params.diametre}mm`, x: 10, y: 38 },
    { text: `Mouvement : ${params.frequence} a/h`, x: 10, y: 56 }
  ];
  
  if (results.levee > 0) {
    annotations.push({
      text: `Levée : ${results.levee}mm`,
      x: 10,
      y: 74
    });
  }
  
  return {
    centerX,
    centerY,
    scale,
    balanceRadius,
    springPath,
    hornCircle,
    annotations
  };
}

/**
 * Génération de fichier DXF professionnel
 */
export function generateDXF(params: SpiralParams, results: CalculatedResults): string {
  const scale = 10; // échelle DXF (unités en mm)
  
  let dxf = `0\nSECTION\n2\nHEADER\n`;
  dxf += `9\n$INSUNITS\n70\n4\n`; // Unités en mm
  dxf += `0\nENDSEC\n0\nSECTION\n2\nTABLES\n`;
  dxf += `0\nLAYER\n2\nspiral\n70\n0\n62\n5\n6\nCONTINUOUS\n`; // couche bleue
  dxf += `0\nLAYER\n2\ncorne\n70\n0\n62\n1\n6\nCONTINUOUS\n`; // couche rouge
  dxf += `0\nENDTAB\n0\nENDSEC\n0\nSECTION\n2\nENTITIES\n`;
  
  // Cercle du balancier (couche 0)
  dxf += `0\nCIRCLE\n8\n0\n10\n0\n20\n0\n40\n${params.diametre/2}\n`;
  
  // Polyline spiral (simplifié)
  const angleStep = Math.PI / 4;
  let angle = 0;
  let radius = params.diametre / 2 + 2;
  
  dxf += `0\nLWPOLYLINE\n8\nspiral\n90\n20\n70\n0\n`;
  for (let i = 0; i < 20; i++) {
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    dxf += `10\n${x}\n20\n${y}\n`;
    angle += angleStep;
    radius += 1.5;
  }
  
  // Cercle corne d'âge
  const lastX = Math.cos(angle - angleStep) * (radius - 1.5);
  const lastY = Math.sin(angle - angleStep) * (radius - 1.5);
  dxf += `0\nCIRCLE\n8\ncorne\n10\n${lastX}\n20\n${lastY}\n40\n${results.rayonCorne}\n`;
  
  // Point d'ancrage
  dxf += `0\nPOINT\n8\ncorne\n10\n${lastX}\n20\n${lastY}\n`;
  
  dxf += `0\nENDSEC\n0\nEOF`;
  
  return dxf;
}
