// data/signatures.ts
export interface SignatureProfile {
  id: string;
  name: string;
  beatRate: number;
  liftAngle: number;
  baseAmplitude: number;
  jitterPattern: 'stable' | 'sporadic' | 'choppy' | 'drifting';
  driftRate: number; // s/j
  description: string;
  typicalIssues?: string[];
}

export const SIGNATURE_PROFILES: SignatureProfile[] = [
  {
    id: 'eta-2824-neuf',
    name: 'ETA 2824-2 (Neuf/Révisé)',
    beatRate: 28800,
    liftAngle: 52,
    baseAmplitude: 295,
    jitterPattern: 'stable',
    driftRate: 0,
    description: 'Mouvement Suisse standard en parfait état. +/- 2s/j',
    typicalIssues: []
  },
  {
    id: 'eta-2824-fatigue',
    name: 'ETA 2824-2 (Fatigué)',
    beatRate: 28800,
    liftAngle: 52,
    baseAmplitude: 260,
    jitterPattern: 'sporadic',
    driftRate: -12,
    description: '10 ans sans révision. Lubrification sèche, amplitude chutante',
    typicalIssues: ['Lubrification insuffisante', 'Roue d\'échappement usée']
  },
  {
    id: 'rolex-3135-neuf',
    name: 'Rolex 3135 (Neuf)',
    beatRate: 28800,
    liftAngle: 55,
    baseAmplitude: 305,
    jitterPattern: 'stable',
    driftRate: 0,
    description: 'Haute précision COSC. +1-2s/j typique',
    typicalIssues: []
  },
  {
    id: 'rolex-3135-fatigue',
    name: 'Rolex 3135 (Fatigué)',
    beatRate: 28800,
    liftAngle: 55,
    baseAmplitude: 275,
    jitterPattern: 'choppy',
    driftRate: -8,
    description: 'Usure normale après 15 ans. A besoin d\'une révision',
    typicalIssues: ['Usure de l\'ancre', 'Ressort moteur fatigué']
  },
  {
    id: 'seiko-nh35-neuf',
    name: 'Seiko NH35 (Neuf)',
    beatRate: 21600,
    liftAngle: 53,
    baseAmplitude: 280,
    jitterPattern: 'stable',
    driftRate: 2,
    description: 'Mouvement Japonais robuste. +10-15s/j typique',
    typicalIssues: []
  },
  {
    id: 'miyota-8215-fatigue',
    name: 'Miyota 8215 (Fatigué)',
    beatRate: 21600,
    liftAngle: 49,
    baseAmplitude: 240,
    jitterPattern: 'drifting',
    driftRate: -25,
    description: 'Usure avancée, forte dérive, amplitude critique',
    typicalIssues: ['Ancre critique', 'Roue de balancier usée']
  }
];
