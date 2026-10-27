/**
 * HorloLearn — Écorché Éclaté 3D · Calibre École ETA 6497-1 (Unitas 16 ½''')
 * Base technique des 9 organes interactifs + données d'échappement.
 * Rédaction conforme au traité HorloLearn (référentiels AFP / CFC, NIHS & ISO 3159).
 */

export type OrganId =
  | 'barrel'
  | 'centerWheel'
  | 'thirdWheel'
  | 'fourthWheel'
  | 'escapeWheel'
  | 'palletFork'
  | 'balance'
  | 'winding'
  | 'dial';

export type LevelBadge = 'FONDAMENTAL' | 'PRATIQUE' | 'AVANCÉ' | 'CULTURE';

export interface OrganData {
  id: OrganId;
  category: string;
  title: string;
  gearBadge: string;
  level: LevelBadge;
  description: string;
  speed: string;
  oil: string;
  oiler: string;
  endshake: string;
  examTrap: string;
  focusOffset: { x: number; y: number; z: number };
  zoomDist: number;
}

export const ORGAN_DATABASE: Record<OrganId, OrganData> = {
  barrel: {
    id: 'barrel',
    category: '01. ORGANE MOTEUR · ACCUMULATEUR D\u2019ÉNERGIE',
    title: '01. Barillet, Ressort Nivaflex & Rochet (à 1h30)',
    gearBadge: 'Z = 84 dents',
    level: 'FONDAMENTAL',
    description:
      'Tambour denté (Z=84) contenant le ressort-moteur en alliage Nivaflex. Sur le calibre à remontage manuel ETA 6497-1, l\u2019extrémité externe du ressort se termine par un crochet rivé qui s\u2019ancre dans une encoche franche du tambour (pas de bride glissante).',
    speed: '0.143 tr/h (1 tr / 7h)',
    oil: 'Moebius HP-1300 (Arbre)',
    oiler: 'Huilier Bleu (Ø 0.18 mm)',
    endshake: '0.025 à 0.045 mm',
    examTrap:
      'PIÈGE ÉLIMINATOIRE : Toujours désarmer le ressort de barillet (en tenant la couronne et en écartant le cliquet) avant de dévisser le pont de barillet ! Vis de roue de couronne à PAS GAUCHE (fente double/repérée).',
    focusOffset: { x: -4.5, y: -0.5, z: 3.2 },
    zoomDist: 12.5,
  },
  centerWheel: {
    id: 'centerWheel',
    category: '02. ROUAGE DE TRANSMISSION · 1er MOBILE',
    title: '02. Roue de Centre & Chaussée (Centre 0,0)',
    gearBadge: 'Z = 64 / z = 12',
    level: 'FONDAMENTAL',
    description:
      'Placée exactement au centre géométrique de la platine, son pignon (z = 12 ailes) est entraîné par les 84 dents du barillet. Son axe traverse la platine pour recevoir la chaussée à friction qui porte l\u2019aiguille des minutes.',
    speed: '1.00 tour / heure exact',
    oil: 'Moebius HP-1300 / D5',
    oiler: 'Huilier Rouge / Bleu',
    endshake: '0.020 à 0.035 mm',
    examTrap:
      'Lubrifier les paliers rubis à la HP-1300. Vérifier le couple de friction de la chaussée : ni trop lâche (décalage des aiguilles), ni trop dur (risque de bris de denture de minuterie).',
    focusOffset: { x: 0, y: -0.4, z: 0 },
    zoomDist: 12.0,
  },
  thirdWheel: {
    id: 'thirdWheel',
    category: '03. ROUAGE DE TRANSMISSION · 2e MOBILE',
    title: '03. Roue de Moyenne (Positionnée à 11h)',
    gearBadge: 'Z = 60 / z = 8',
    level: 'PRATIQUE',
    description:
      'Mobile intermédiaire en laiton doré à 5 bras reliant la roue de centre (64 dents → pignon 8 ailes, rapport 8:1) au pignon de la roue de seconde située à 9h.',
    speed: '8.00 tours / heure',
    oil: 'Moebius HP-1300',
    oiler: 'Huilier Rouge (Ø 0.12 mm)',
    endshake: '0.020 à 0.035 mm',
    examTrap:
      'Lors de la pose du grand pont de rouage du 6497-1, engager délicatement le pivot de moyenne sans forcer avec la brucelle : un pivot faussé bloque toute la chaîne cinématique.',
    focusOffset: { x: 3.2, y: -0.6, z: 2.8 },
    zoomDist: 11.5,
  },
  fourthWheel: {
    id: 'fourthWheel',
    category: '04. ROUAGE DE FINISSAGE · PETITE SECONDE 9H',
    title: '04. Roue de Seconde à 9h (Signature Unitas 6497-1)',
    gearBadge: 'Z = 60 / z = 8',
    level: 'PRATIQUE',
    description:
      'Caractéristique des calibres de poche Lépine (tige à 3h, petite seconde à 9h). Elle effectue exactement 1 tour par minute et possède un long pivot inférieur traversant le cadran à 9h pour porter la trotteuse.',
    speed: '60 tours / heure (1 tr/min)',
    oil: 'Moebius 9010 (Huile fine)',
    oiler: 'Huilier Noir (Ø 0.08 mm)',
    endshake: '0.015 à 0.030 mm',
    examTrap:
      'Transition de viscosité : à partir de la roue de seconde, la vitesse augmente et le couple diminue → on passe impérativement de la HP-1300 à l\u2019huile synthétique fine Moebius 9010 !',
    focusOffset: { x: 5.4, y: -0.5, z: -0.2 },
    zoomDist: 11.5,
  },
  escapeWheel: {
    id: 'escapeWheel',
    category: '05. DISTRIBUTEUR D\u2019ÉNERGIE · ROUAGE RAPIDE',
    title: '05. Mobile d\u2019Échappement en Acier (15 Dents en Club)',
    gearBadge: 'Z = 15 / z = 6',
    level: 'AVANCÉ',
    description:
      'Roue en acier poli à 15 dents asymétriques à profil « club » (talon dégagé, plan de repos et plan d\u2019impulsion partagé avec les palettes d\u2019ancre). Son pignon à 6 ailes est entraîné par les 60 dents de la roue de seconde (rapport 10:1 → 1 tour en 6 secondes).',
    speed: '600 tr/h (1 tour / 6 sec)',
    oil: 'Pivots: 9010 | Dents: 9415',
    oiler: 'Huilier Noir (Ø 0.08 mm)',
    endshake: '0.015 à 0.025 mm',
    examTrap:
      'Ne jamais toucher les dents traitées à l\u2019épilame (Fixodrop) avec des brucelles grasses. Une infime trace de doigt détruit la tension superficielle et fait fuir la Moebius 9415.',
    focusOffset: { x: 2.8, y: -0.4, z: -3.9 },
    zoomDist: 8.5,
  },
  palletFork: {
    id: 'palletFork',
    category: '06. ÉCHAPPEMENT À ANCRE SUISSE · 5 PHASES',
    title: '06. Ancre Suisse 3D, Palettes Rubis, Fourchette & Dard',
    gearBadge: 'Tirage 12° · 2 Palettes',
    level: 'AVANCÉ',
    description:
      'Ancre suisse usinée avec bras coudés, palettes d\u2019entrée et de sortie en rubis corindon synthétique, baguette, cornes de fourchette, dard de sécurité et goupilles de limitation.',
    speed: '18\u2019000 basculements / heure',
    oil: 'Palettes : Moebius 9415 SEULE',
    oiler: 'Pique-huile Rouge (Palettes)',
    endshake: '0.015 à 0.025 mm',
    examTrap:
      'INTERDICTION ABSOLUE (Zéro tolérance) : Les pivots d\u2019ancre, la fourchette et le dard ne doivent JAMAIS être huilés ! Seuls les plans d\u2019impulsion des palettes reçoivent de la Moebius 9415.',
    focusOffset: { x: 0.6, y: -0.4, z: -4.2 },
    zoomDist: 7.8,
  },
  balance: {
    id: 'balance',
    category: '07. ORGANE RÉGULATEUR · OSCILLATEUR 2.5 HZ',
    title: '07. Balancier Glucydur, Double Plateau, Ellipse & Coq',
    gearBadge: '18\u2019000 A/h (44°)',
    level: 'AVANCÉ',
    description:
      'Cœur chronométrique du calibre 6497-1 battant à 18\u2019000 alternances/heure (200 ms). Doté d\u2019un balancier annulaire à 16 vis d\u2019équilibrage, d\u2019un double plateau (ellipse rubis + petit plateau à encoche face au dard) et d\u2019un coq sculpté avec raquette et Incabloc.',
    speed: '5 alternances / sec (2.5 Hz)',
    oil: 'Contre-pivots : Moebius 9010',
    oiler: 'Huilier Noir (Ø 0.08 mm)',
    endshake: '0.015 à 0.025 mm',
    examTrap:
      'Sur le chrono-comparateur Witschi, toujours paramétrer l\u2019angle de levée du 6497-1 sur 44° (et non 50° ou 52° !), sinon l\u2019amplitude affichée sera faussée de +35°.',
    focusOffset: { x: -2.8, y: -0.6, z: -3.6 },
    zoomDist: 9.8,
  },
  winding: {
    id: 'winding',
    category: '08. REMONTOIR & MISE À L\u2019HEURE · TIGE À 3H',
    title: '08. Tige de Remontoir, Pignon Coulant, Tirette & Bascule',
    gearBadge: 'Denture Breguet',
    level: 'PRATIQUE',
    description:
      'Mécanisme commandé par la couronne à 3h. En position 1 (poussée), le pignon coulant engrène par sa denture loup (Breguet) avec le pignon de remontoir pour armer la roue de couronne et le rochet. En position 2 (tirée), il règle l\u2019heure.',
    speed: 'Actionné manuellement',
    oil: 'Graisse Moebius 8200 / DX',
    oiler: 'Huilier Vert (Ø 0.25 mm)',
    endshake: 'Jeu de tige : 0.15 mm',
    examTrap:
      'La vis de la roue de couronne (2 fentes) possède un FILETAGE À GAUCHE : on la dévisse dans le sens horaire ! Forcer en sens anti-horaire brise la tête de vis dans le pont de barillet.',
    focusOffset: { x: -6.8, y: -0.3, z: 0 },
    zoomDist: 11.5,
  },
  dial: {
    id: 'dial',
    category: '09. AFFICHAGE & HABILLAGE · CADRAN LÉPINE',
    title: '09. Cadran Soleillé Anthracite, Petite Seconde 9h & Quantième',
    gearBadge: 'Minuterie 12:1',
    level: 'CULTURE',
    description:
      'Côté cadran du calibre 6497-1 Lépine (tige à 3h et petite seconde à 9h alignées). La chaussée (sur la roue de centre) entraîne la roue de minuterie et la roue des heures (démultiplication 12:1) sous des aiguilles facettées Dauphine.',
    speed: 'Heures : 2 tr/j · Min : 24 tr/j',
    oil: 'Chaussée : Graisse Moebius 8200',
    oiler: 'Huilier Vert (Ø 0.25 mm)',
    endshake: 'Liberté des aiguilles : ~0.15 mm',
    examTrap:
      'Toujours poser une feuille de protection plastique avant d\u2019utiliser les leviers aux aiguilles. Vérifier le parallélisme des aiguilles en vue de profil sur 360°.',
    focusOffset: { x: 0, y: 0.6, z: 0 },
    zoomDist: 19.5,
  },
};

/**
 * HUD des 5 phases de l'échappement à ancre suisse — anti-défilement :
 * à vitesse animée le HUD est FIGÉ ; l'affichage phase par phase n'est réactivé
 * que si chaque phase reste assez longtemps à l'écran (Micro-Pas / Pause-Manuel).
 */
export const ESCAPEMENT_PHASES: { tag: string; desc: string }[] = [
  {
    tag: '1. Repos & Tirage (12°)',
    desc: 'La dent club de la roue d\u2019échappement 3D s\u2019appuie sur le plan de repos de la palette rubis pendant que le balancier descend son arc.',
  },
  {
    tag: '2. Dégagement par l\u2019Ellipse',
    desc: 'L\u2019ellipse en rubis du double plateau 3D entre dans les cornes de la fourchette et dégage la palette du plan de repos.',
  },
  {
    tag: '3. Impulsion sur Palette (44°)',
    desc: 'La dent club glisse sur le plan d\u2019impulsion de la palette rubis (Moebius 9415) et relance le double plateau du balancier.',
  },
  {
    tag: '4. Chute & Verrouillage',
    desc: 'La dent quitte la palette de sortie et la roue 3D parcourt sa chute libre (~1.5°) avant le choc acoustique sur la palette opposée.',
  },
  {
    tag: '5. Arc Supplémentaire',
    desc: 'L\u2019ancre est maintenue contre sa goupille de limitation par le tirage de 12° pendant que le balancier achève son oscillation libre.',
  },
];

export const HUD_FROZEN = {
  tag: 'Cycle 5 Phases (18 000 A/h)',
  desc: 'Lecture figée pour le confort — réglez « Micro-Pas » ou glissez le curseur de phase en « Pause / Manuel » pour dérouler l\u2019échappement pas à pas.',
};

/** Tableau de la chaîne cinématique (module « Écorché » du traité). */
export const KINEMATIC_TABLE: {
  organ: OrganId;
  num: string;
  name: string;
  detail: string;
  badge: string;
  accent: 'bronze' | 'ruby' | 'sky';
}[] = [
  { organ: 'barrel', num: '01.', name: 'Tambour Barillet', detail: 'Engrène sur pignon de centre (z=12)', badge: 'Z = 84', accent: 'bronze' },
  { organ: 'centerWheel', num: '02.', name: 'Roue de Centre', detail: '1.00 tr/h · Porte la chaussée (Minutes)', badge: 'Z = 64 / z = 12', accent: 'bronze' },
  { organ: 'thirdWheel', num: '03.', name: 'Roue de Moyenne', detail: '8.00 tr/h · Transmission à 11h', badge: 'Z = 60 / z = 8', accent: 'bronze' },
  { organ: 'fourthWheel', num: '04.', name: 'Roue de Seconde (9h)', detail: '60 tr/h (1 tr/min) · Trotteuse à 9h', badge: 'Z = 60 / z = 8', accent: 'bronze' },
  { organ: 'escapeWheel', num: '05.', name: 'Roue d\u2019Échappement', detail: '600 tr/h (1 tr / 6 s) · Acier 15 dents club', badge: 'Z = 15 / z = 6', accent: 'ruby' },
  { organ: 'balance', num: '07.', name: 'Balancier-Spiral Glucydur', detail: '5 alternances/s · Double plateau & Ellipse', badge: '18\u2019000 A/h', accent: 'sky' },
];

export type PresetId = 'iso' | 'topBridges' | 'dial' | 'escapement' | 'balanceMacro' | 'profile';

export const CAMERA_PRESETS: { id: PresetId; label: string }[] = [
  { id: 'iso', label: '1. Côté Ponts (3D)' },
  { id: 'topBridges', label: '2. Ponts à Plat (90°)' },
  { id: 'dial', label: '3. Côté Cadran & Date' },
  { id: 'escapement', label: '4. Macro Échappement' },
  { id: 'balanceMacro', label: '5. Macro Balancier & Coq' },
  { id: 'profile', label: '6. Profil Éclaté Z' },
];

export const ORGAN_PILLS: { id: OrganId; label: string }[] = [
  { id: 'barrel', label: '01. Barillet (Z=84)' },
  { id: 'centerWheel', label: '02. Centre (Z=64)' },
  { id: 'thirdWheel', label: '03. Moyenne (Z=60)' },
  { id: 'fourthWheel', label: '04. Seconde 9h (Z=60)' },
  { id: 'escapeWheel', label: '05. Échappement (Z=15)' },
  { id: 'palletFork', label: '06. Ancre Suisse' },
  { id: 'balance', label: '07. Balancier 2.5Hz' },
  { id: 'winding', label: '08. Remontoir 3h' },
  { id: 'dial', label: '09. Cadran & Date' },
];
