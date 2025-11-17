export interface SpiralParams {
  diametre: number;
  frequence: number;
  amplitude: number;
  materiau: 'nivarox' | 'silicium' | 'acier';
  typeSpiral: 'phillips' | 'breguet' | 'grossmann';
}

export interface CalculatedResults {
  longueur: number;
  rayonCorne: number;
  levee: number;
  spires: number;
  raideur: number;
  periode: number;
  inertie: number;
  validated: boolean;
  sourceMovement?: string;
}

export interface MovementMatch {
  exactMatch: boolean;
  closestMovement: any;
  confidence: number;
}

export function calculateSpiral(params: SpiralParams): CalculatedResults {
  const periode = 1 / (params.frequence / 7200);
  const rayon = params.diametre / 2;
  const masse = (Math.PI * rayon * rayon * 0.5 * 7.8) / 1000;
  const inertie = (masse * rayon * rayon) / 2;
  const omega = 2 * Math.PI / periode;
  const raideur = inertie * omega * omega;
  
  const facteur = params.frequence === 28800 ? 3.58 : 
                  params.frequence === 21600 ? 3.12 : 
                  params.frequence === 18000 ? 2.85 : 3.35;
  const longueur = params.diametre * facteur;
  const rayonCorne = params.diametre * 0.28;
  const levee = params.typeSpiral === 'breguet' ? params.diametre * 0.15 : 0;
  const spires = Math.round(longueur / (Math.PI * params.diametre * 0.7));

  return {
    longueur: Math.round(longueur * 100) / 100,
    rayonCorne: Math.round(rayonCorne * 100) / 100,
    levee: Math.round(levee * 100) / 100,
    spires,
    raideur: Math.round(raideur * 1e6) / 1e6,
    periode: Math.round(periode * 10000) / 10000,
    inertie: Math.round(inertie * 1e9) / 1e9,
    validated: false
  };
}

export function generateDXF(params: SpiralParams, results: CalculatedResults): string {
  let dxf = `0\nSECTION\n2\nENTITIES\n`;
  dxf += `0\nCIRCLE\n8\nbalancier\n10\n0\n20\n0\n40\n${params.diametre/2}\n`;
  dxf += `0\nCIRCLE\n8\ncorne-d-age\n10\n${params.diametre/2 + 2}\n20\n0\n40\n${results.rayonCorne}\n`;
  dxf += `0\nENDSEC\n0\nEOF`;
  return dxf;
}

export function generateDrawingSchema(params: SpiralParams, results: CalculatedResults) {
  const scale = 12;
  const centerX = 250;
  const centerY = 200;
  const balanceRadius = params.diametre * scale / 2;
  
  const springPath = [];
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
  
  return {
    centerX, centerY, scale, balanceRadius, springPath,
    hornCircle: {
      x: centerX + Math.cos(angle - Math.PI/4) * (radius - 3),
      y: centerY + Math.sin(angle - Math.PI/4) * (radius - 3),
      radius: results.rayonCorne * scale
    },
    annotations: [
      { text: `Corne d'âge : r = ${results.rayonCorne}mm`, x: 10, y: 20 },
      { text: `Balancier : Ø ${params.diametre}mm`, x: 10, y: 38 }
    ]
  };
}
