/**
 * HorloLearn — Académie Pratique · Posages & Emboîtages d'Atelier
 * Cours complet d'atelier horloger suisse : 13 gestes fondamentaux d'emboîtage & aiguillage,
 * outillage officiel, grille d'évaluation, quiz d'établi, flashcards et points chauds interactifs.
 * Écriture & éthique : Artisan horloger authentique — Normes suisses officielles (NIHS, ISO, ETA).
 */

// =========================================================================
// 1. LES 13 ÉTAPES FONDAMENTALES D'EMBOÎTAGE & AIGUILLAGE
// =========================================================================

export interface StepData {
  id: number;
  phase: string;
  badge: string;
  title: string;
  summary: string;
  tools: string[];
  torques: string;
  standard: string;
  masterTip: string;
  trapAlert: string;
  schemaType: SchemaType;
}

export type SchemaType =
  | 'workshop_kit'
  | 'auto_module_removal'
  | 'dial_feet_support'
  | 'dial_feet'
  | 'limitation_finger'
  | 'date_jump_sync'
  | 'hours_minutes_fitting'
  | 'hands_clearance'
  | 'seconds_reaming'
  | 'safe_stem_release'
  | 'cleanliness_protocol'
  | 'arkansas_cone'
  | 'casing_final'
  | 'dial_protection'
  | 'grazing_beam'
  | 'gaskets_casing'
  | 'case_assembly'
  | 'stem_cutting'
  | 'waterproof_testing';

export const STEPS_DATA: StepData[] = [
  {
    id: 1,
    phase: 'Phase 1 · Préparation & Démontage',
    badge: 'Équipement d\'Atelier',
    title: 'Outillage & Kit d\'Emboîtage Indispensable',
    summary:
      "Avant de poser le premier composant, l'établi doit être rigoureusement organisé selon les standards helvétiques. Le kit complet comprend : posage universel avec bague de réduction, posage gigogne recouvert d'un cabron de peau propre, porte-pièce à aiguiller équipé de sa vis de soutien moletée (doigt de limitation), tournevis rouge 1.20 mm, brucelles en laiton anti-rayure, pierre d'Arkansas fine, équarrissoirs, ouvre-boîte et brosse marron en poil de martre.",
    tools: [
      'Posage universel + bague de réduction',
      'Posage gigogne + cabron de peau',
      'Porte-pièce à aiguiller avec vis de soutien',
      'Tournevis horloger rouge 1.20 mm & 0.80 mm',
      'Brucelles en laiton (anti-rayures)',
      'Pierre d\'Arkansas fine & équarrissoirs',
      'Brosse marron en poil de martre (propreté cadran)',
    ],
    torques: 'Préparation du poste de travail',
    standard: 'Standards Horlogers Suisses d\'Atelier',
    masterTip:
      "Nettoyez systématiquement le cabron de peau et les brucelles en laiton avec un chiffon non pelucheux avant d'entamer le travail. Des brucelles sales ou bavées peuvent rayer irrémédiablement une platine perlée ou un cadran laqué.",
    trapAlert:
      "Utiliser des brucelles métalliques acérées en acier sur les brides de cadran : tout dérapage entraîne une balafre indélébile sur les côtes de Genève ou le perlage de la platine !",
    schemaType: 'workshop_kit',
  },
  {
    id: 2,
    phase: 'Phase 1 · Préparation & Démontage',
    badge: 'Sécurisation Calibre',
    title: 'Dépose du Module Automatique (ETA 2824-2)',
    summary:
      "Sur les calibres automatiques suisses (ex. ETA 2824-2), le module de remontage automatique et sa masse oscillante doivent impérativement être retirés avant tout aiguillage. À l'aide du tournevis rouge (panne 1.20 mm affûtée), desserrez et retirez les 2 vis noires de fixation du bâti automatique, puis soulevez le module complet d'un bloc.",
    tools: ['Tournevis rouge 1.20 mm', 'Brucelles N°2 ou 3', 'Sous-cloche de protection'],
    torques: 'Desserrage contrôlé (couple nominal 1.8 cNm)',
    standard: 'Directives Techniques ETA 2824-2',
    masterTip:
      "Repérez bien les deux vis noires : elles ont un traitement de surface spécifique (bleuies ou brillant-noir) qui les distingue des vis de ponts de rouage. Rangez le module automatique sous cloche à l'abri des courants d'air.",
    trapAlert:
      "Chasser les aiguilles avec le module automatique encore monté : la pression verticale exercée lors du chassage se transmet aux micro-billes du roulement de rotor et aux pivots, les écrasant ou créant du jeu axial prématuré.",
    schemaType: 'auto_module_removal',
  },
  {
    id: 3,
    phase: 'Phase 2 · Cadrage & Aiguillage',
    badge: 'Contrôle Composants',
    title: 'Contrôle des Pieds de Cadran & Roue des Heures',
    summary:
      "Inspectez la face inférieure du cadran : les deux pieds en cuivre brasés doivent être rigoureusement rectilignes et former un angle d'équerre de 90°. Sur la platine, vérifiez la présence indispensable de la roue des heures et de sa rondelle de friction (rondelle clinquant) qui maintient la roue plaquée et prévient tout décalage d'engrènement lors des chocs.",
    tools: ['Loupe d\'établi 4x', 'Brucelles laiton', 'Réglette d\'équerre horlogère'],
    torques: 'Contrôle dimensionnel sans contrainte',
    standard: 'NIHS 91-10',
    masterTip:
      "N'oubliez jamais la rondelle clinquant sur la roue des heures ! Si elle est omise, l'aiguille des heures aura un jeu axial excessif qui la fera frotter contre le dessous de l'aiguille des minutes ou contre le cadran.",
    trapAlert:
      "Tenter de redresser un pied de cadran tordu à mains nues ou avec une pince sans support de base : le pied en cuivre se rompt net au ras de la laque, rendant le cadran irrécupérable.",
    schemaType: 'dial_feet_support',
  },
  {
    id: 4,
    phase: 'Phase 2 · Cadrage & Aiguillage',
    badge: 'Règle d\'Or d\'Atelier',
    title: 'Bridage du Cadran & Interdiction d\'Appui s/ Rubis',
    summary:
      "Engagez délicatement les pieds de cadran dans les alésages de la platine. Retournez l'ensemble sur le posage gigogne garni de son cabron de peau. À l'aide des brucelles en laiton, poussez les brides de cadran en butée franche. RÈGLE MAÎTRESSE : il est STRICTEMENT INTERDIT d'appuyer sur les pierres (rubis) des ponts de rouage ! L'appui du doigt se fait exclusivement sur le laiton métallique des ponts.",
    tools: ['Posage gigogne + cabron', 'Brucelles laiton', 'Doigtier propre'],
    torques: 'Poussée manuelle en butée douce',
    standard: 'Règles de l\'Art Horloger Suisse',
    masterTip:
      "Poussez les brides d'un mouvement franc et symétrique. Vérifiez immédiatement après que le cadran est parfaitement plaqué sur la platine sans aucun jour visible à la loupe.",
    trapAlert:
      "Appuyer avec le pouce ou un cabron directement sur les pierres synthétiques des ponts : risque immédiat d'ébrécher le rubis ou d'expulser la goutte d'huile lubrifiée (Moebius 9010), polluant le rouage et asséchant le pivot !",
    schemaType: 'dial_feet',
  },
  {
    id: 5,
    phase: 'Phase 2 · Cadrage & Aiguillage',
    badge: 'Support Haute Précision',
    title: 'Porte-pièce à Doigt de Limitation sous la Seconde',
    summary:
      "Déposez le calibre cadran vers le haut sur le porte-pièce d'aiguillage spécifique. Tournez la molette inférieure moletée jusqu'à amener le doigt de soutien en contact franc et affleurant sous la pierre de seconde centrale (ou le contre-pivot). Ce soutien direct est vital pour absorber l'effort de chassage sans répercuter de flexion sur la platine.",
    tools: ['Porte-pièce à vis de soutien moletée', 'Loupe 10x', 'Brucelles fines'],
    torques: 'Contact affleurant (zéro soulèvement de pont)',
    standard: 'Protocole de Chassage ETA',
    masterTip:
      "Le doigt de soutien doit être en contact parfait mais ne doit PAS soulever le calibre ni contraindre le pont. Faites tourner délicatement la roue des secondes avant chassage : elle doit conserver toute sa liberté de rotation.",
    trapAlert:
      "Chasser la trotteuse sur un posage creux sans doigt de soutien : la force axiale pousse le pivot de seconde contre le rubis, provoquant au choix le déchassage de la pierre du pont ou la casse nette du micro-pivot !",
    schemaType: 'limitation_finger',
  },
  {
    id: 6,
    phase: 'Phase 2 · Cadrage & Aiguillage',
    badge: 'Chronométrie',
    title: 'Synchronisation du Saut de Date à 00h00 Pile',
    summary:
      "Insérez la tige en position de mise à l'heure (position 3). Tournez délicatement la couronne en sens antihoraire pour faire avancer les aiguilles vers minuit. Ralentissez à l'approche de minuit : dès que le sautoir de date déclenche le saut franc du disque, STOPPEZ NET ! La position angulaire du rouage correspond maintenant exactement à 00:00:00 (tolérance officielle : 23h55 – 00h05).",
    tools: ['Tige de travail moletée', 'Loupe 4x', 'Doigtier'],
    torques: 'Rotation manuelle au ralenti',
    standard: 'Tolérance Horlogère Suisse : ±5 min (23h55 – 00h05)',
    masterTip:
      "Si vous dépassez le saut de date par mégarde, revenez au moins 4 heures en arrière (vers 20h00) avant de réavancer lentement vers minuit, pour annuler tous les jeux d'engrènement du rouage de calendrier.",
    trapAlert:
      "Poser les aiguilles à une heure quelconque sans avoir provoqué le saut franc de la date : votre montre sautera alors à midi ou en plein après-midi, motif de refus immédiat au contrôle final.",
    schemaType: 'date_jump_sync',
  },
  {
    id: 7,
    phase: 'Phase 2 · Cadrage & Aiguillage',
    badge: 'Chassage Fondamental',
    title: 'Chassage de l\'Aiguille des Heures à 12h00 Pile',
    summary:
      "Positionnez l'aiguille des heures pointant rigoureusement sur le repère de 12h00 (ou l'index de midi). Avec le posoir manuel ou le tasseau de presse en Delrin adapté au diamètre du canon, chassez l'aiguille perpendiculairement jusqu'à ce que son canon affleure parfaitement le sommet de la roue des heures. Contrôlez ensuite le saut de date en reculant à 8h00 puis en réavançant vers 12h00.",
    tools: ['Posoir aux aiguilles Delrin', 'Film protecteur de cadran (Mylar)', 'Loupe 10x'],
    torques: 'Chassage progressif axial sans à-coup',
    standard: 'NIHS 91-10 — Garde G1 ≥ 0.20 mm',
    masterTip:
      "Interposez toujours le film Mylar (Bergeon 6938) entre l'aiguille et le cadran lors du chassage. Inspectez le parallélisme de l'aiguille des heures avec le cadran sur les 12 index à la loupe d'établi.",
    trapAlert:
      "Chasser l'aiguille en biais : l'extrémité de l'aiguille va plonger et labourer les index en relief du cadran lors de la rotation.",
    schemaType: 'hours_minutes_fitting',
  },
  {
    id: 8,
    phase: 'Phase 2 · Cadrage & Aiguillage',
    badge: 'Indexation de Précision',
    title: 'Chassage des Minutes & Indexation (-2 / +2 min)',
    summary:
      "Chassez l'aiguille des minutes sur le cône de la chaussée en la pointant exactement sur 12h00 pile. Le canon des minutes doit être chassé à fleur de la chaussée. L'indexation finale doit respecter la norme helvétique : lorsque l'aiguille des heures est parfaitement centrée sur 12h00, l'aiguille des minutes doit se trouver entre 11h58 et 12h02 (tolérance stricte de -2 à +2 minutes).",
    tools: ['Posoir aux aiguilles embout fin', 'Protecteur Mylar', 'Loupe 10x'],
    torques: 'Chassage micrométrique à fleur',
    standard: 'NIHS 91-10 — Garde G2 ≥ 0.15 mm',
    masterTip:
      "Faites faire deux tours complets de cadran (24 heures) à la minuterie pour vérifier le parallélisme parfait entre les heures et les minutes à 12h, 3h, 6h et 9h. La garde G2 ne doit jamais descendre sous 0.15 mm.",
    trapAlert:
      "Un canon de minute chassé trop profondément : il vient frotter sur le canon des heures en rotation, provoquant un arrêt de la montre dès la superposition des aiguilles.",
    schemaType: 'hands_clearance',
  },
  {
    id: 9,
    phase: 'Phase 2 · Cadrage & Aiguillage',
    badge: 'Micro-Mécanique',
    title: 'Équarrissage du Canon & Chassage de la Trotteuse',
    summary:
      "Avant de poser la trotteuse (seconde centrale), préparez son canon : introduisez un micro-équarrissoir par le dessous à 90° jusqu'à mi-hauteur maximum pour ébavurer l'entrée du tube sans l'évaser. Vérifiez que la vis de soutien inférieure est fermement bloquée sous la pierre de seconde, puis chassez la trotteuse à fleur de l'axe central. Contrôlez les gardes G3 (≥ 0.15 mm) et G4 (≥ 0.30 mm).",
    tools: ['Micro-équarrissoir d\'horloger', 'Posoir à seconde creux', 'Porte-pièce à vis de limitation', 'Loupe 10x'],
    torques: 'Chassage axial doux sous appui direct',
    standard: 'NIHS 91-10 — Gardes G3 & G4',
    masterTip:
      "Vérifiez attentivement le contrepoids de la trotteuse : il doit rester parfaitement horizontal et ne jamais plonger vers le plan de l'aiguille des minutes lorsqu'on incline la montre.",
    trapAlert:
      "Équarrir le canon sur toute sa hauteur ou forcer avec l'équarrissoir : le canon s'évase complètement et l'aiguille de seconde perd son serrage, patinant au premier choc de la montre.",
    schemaType: 'seconds_reaming',
  },
  {
    id: 10,
    phase: 'Phase 3 · Emboîtage & Habillage',
    badge: 'Sécurité Calibre',
    title: 'Retrait Sécurisé de la Tige & Aiguilles à 15h15',
    summary:
      "Pour transférer le calibre habillé dans la carrure, retirez la tige de remontoir en appliquant la consigne de sécurité : positionnez préalablement les aiguilles groupées à 15h15 (vers la couronne / 3h) pour les écarter des rebords du posage et de la carrure. Placez la tige en position de mise à l'heure, puis pressez délicatement avec un tournevis rouge 1.20 mm sur le plot de tirette tout en tirant la tige dans l'axe.",
    tools: ['Tournevis rouge 1.20 mm', 'Brucelles laiton', 'Sous-cloche'],
    torques: 'Pression douce sur tirette (sans forcer)',
    standard: 'Règle d\'Or Horlogère : Position 15h15',
    masterTip:
      "En plaçant les aiguilles à 15h15, vous réduisez à zéro le risque qu'une aiguille heurte la lunette ou le rebord de carrure lors du retournement ou de l'emboîtage.",
    trapAlert:
      "Appuyer trop fort ou avec un outil pointu sur le plot de tirette : vous déboîtez la bascule du tiret ! Le sautoir saute et nécessite le démontage complet des aiguilles et du cadran pour le remettre en place.",
    schemaType: 'safe_stem_release',
  },
  {
    id: 11,
    phase: 'Phase 3 · Emboîtage & Habillage',
    badge: 'Propreté Chirurgicale',
    title: 'Protocole Propreté : Zéro Rodico sur le Cadran',
    summary:
      "La propreté d'emboîtage répond à une consigne intransigeante : le Rodico est STRICTEMENT INTERDIT sur la surface du cadran (il dépose des films gras indélébiles sur les vernis et les laques). Le dépoussiérage du cadran habillé s'effectue UNIQUEMENT avec la brosse marron en poil de martre très propre. N'utilisez jamais la soufflette directement sur le cadran habillé. Nettoyez l'intérieur de la carrure et la glace avec une microfibre d'horloger sous lumière rasante à 45°.",
    tools: [
      'Brosse marron en poil de martre propre',
      'Microfibre optique d\'horloger blanche',
      'Lampe rasante articulée 45°',
      'Cloche anti-poussière',
    ],
    torques: 'Balayage doux sans pression',
    standard: 'Protocole Salle Blanche & Inspection 45°',
    masterTip:
      "Gardez une brosse en poil de martre dédiée EXCLUSIVEMENT aux cadrans, rangée dans un tube hermétique pour qu'elle ne prenne jamais la poussière grasse de l'atelier.",
    trapAlert:
      "Appliquer du Rodico sur un cadran noir mat ou soleillé : la pâte laisse une auréole brillante impossible à faire disparaître, nécessitant le remplacement pur et simple du cadran.",
    schemaType: 'cleanliness_protocol',
  },
  {
    id: 12,
    phase: 'Phase 3 · Emboîtage & Habillage',
    badge: 'Ajustement & Finition',
    title: 'Coupe de Tige, Cône à 90° s/ Arkansas & Loctite 222',
    summary:
      "Insérez le calibre dans la boîte avec la tige d'origine en position 1 (remontage neutre). Vissez la couronne à blanc et mesurez l'écart résiduel avec le tube. Reportez cette cote sur la tige neuve en ajoutant +1 mm de marge de sécurité, puis coupez à la pince d'horloger. Montez la tige dans un mandrin en laiton, maintenez-le à 45° sur la pierre d'Arkansas fine et faites-le rouler d'avant en arrière entre vos doigts pour tailler un cône à 90° sur l'amorce du filet. Ébavurez avec la lame d'un ouvre-boîte et appliquez une micro-goutte de Loctite 222 violette.",
    tools: [
      'Pied à coulisse au 1/100e ou réglette',
      'Mandrin aux tiges en laiton',
      'Pierre d\'Arkansas fine',
      'Lame de couteau ouvre-boîte',
      'Loctite 222 (violette démontable)',
    ],
    torques: 'Jeu fonctionnel sous couronne : 0.05 à 0.10 mm',
    standard: 'Norme Métrologique NIHS',
    masterTip:
      "Le cône à 90° réalisé à la pierre d'Arkansas est la signature d'un vrai artisan : il guide l'entrée du filet dans la couronne sans jamais fausser le taraudage.",
    trapAlert:
      "Utiliser de la Loctite 243 (bleue) ou 270 (verte) : ces colles soudent la tige de façon définitive. Lors du prochain service, la tige cassera dans la couronne lors de toute tentative de dévissage !",
    schemaType: 'arkansas_cone',
  },
  {
    id: 13,
    phase: 'Phase 3 · Emboîtage & Habillage',
    badge: 'Assemblage Final',
    title: 'Emboîtage Final, Repose Automatisme & Fond à la Potence',
    summary:
      "Placez le calibre muni de son cercle d'emboîtage dans la carrure. Vissez les deux vis de boîte et leurs brides de maintien en alternance croisée (couple 2.0 cNm). Reposez le module automatique ETA 2824 et serrez ses 2 vis noires avec le tournevis rouge 1.20 mm. Lubrifiez le joint de fond au Fomblin UT18. Enfin, fermez le fond à la potence d'horloger en respectant l'alignement : logo ETA vers le haut (12h) et passage de tige vers la gauche (couronne). Procédez au contrôle final d'étanchéité.",
    tools: [
      'Tournevis rouge 1.20 mm',
      'Cercle d\'emboîtage & brides',
      'Boîte à silicone Fomblin UT18',
      'Potence à fermer les fonds avec tasseaux Delrin',
    ],
    torques: 'Brides : 2.0 cNm · Fond vissé/chassé selon spécifications',
    standard: 'ISO 22810 & Directives Manufactures Suisses',
    masterTip:
      "Faites un dernier balayage à la brosse martre sur le mouvement avant de poser le fond, et vérifiez que la masse oscillante tourne librement à 360° sans heurter le fond.",
    trapAlert:
      "Chasser le fond de travers à la potence sans centrer le logo : le joint torique se pince dans le filetage, ruinant l'étanchéité et écrasant le joint.",
    schemaType: 'casing_final',
  },
];

// =========================================================================
// 2. GRILLE OFFICIELLE D'ÉVALUATION HORLOGÈRE SUISSE (30 points)
// =========================================================================

export interface ExamCriterion {
  id: number;
  label: string;
  points: number;
  isEliminatory?: boolean;
  desc: string;
}

export const EXAM_CRITERIA: ExamCriterion[] = [
  { id: 1, label: '1. Propreté cadran & saphir (Zéro poussière, ZÉRO Rodico cadran)', points: 4, isEliminatory: true, desc: 'Inspection sous lumière rasante 45°. Utilisation exclusive de la brosse en poil de martre. Critère éliminatoire direct.' },
  { id: 2, label: '2. Parallélisme & planéité des aiguilles sur 12 heures', points: 4, desc: 'Tolérance ±0.05 mm, absence totale de cambrage vicieux, de plongée de trotteuse ou de frottement.' },
  { id: 3, label: '3. Synchronisation du saut de date à 00:00 (±5 min)', points: 3, desc: 'Saut franc net entre 23h55 et 00h05 détecté au ralenti.' },
  { id: 4, label: '4. Gardes d\'aiguillage G1, G2, G3, G4 conformes NIHS 91-10', points: 4, desc: 'G1 ≥ 0.20 mm, G2 ≥ 0.15 mm, G3 ≥ 0.15 mm, G4 ≥ 0.25-0.30 mm.' },
  { id: 5, label: '5. Cadrage, centrage guichet & interdiction appui rubis', points: 3, desc: 'Pieds vérifiés à 90°, cabron de peau sous gigogne, aucun appui sur les pierres des ponts.' },
  { id: 6, label: '6. Utilisation du doigt de limitation sous la seconde', points: 3, desc: 'Doigt moleté en appui affleurant franc sous le contre-pivot lors du chassage de la trotteuse.' },
  { id: 7, label: '7. Retrait de tige à 15h15 & manœuvre tirette douce', points: 2, desc: 'Aiguilles orientées à 15h15 vers la couronne, pression mesurée sur le plot sans déboîter la bascule.' },
  { id: 8, label: '8. Coupe de tige, cône 90° Arkansas & Loctite 222', points: 4, desc: 'Jeu sous couronne 0.05 mm, chanfrein à 45° roulé au mandrin, frein-filet violet démontable.' },
  { id: 9, label: '9. Brides d\'emboîtage & repose module automatique', points: 2, desc: '2 vis de brides serrées en croix, module ETA 2824 reposé avec ses 2 vis noires au tournevis 1.20 mm.' },
  { id: 10, label: '10. Fermeture du fond & étanchéité ISO 22810', points: 1, desc: 'Joint siliconé Fomblin UT18, alignement logo ETA à 12h, passage tige à gauche, test étanchéité conforme.' },
];

export const EXAM_TOTAL = EXAM_CRITERIA.reduce((a, c) => a + c.points, 0); // 30

// =========================================================================
// 3. QUIZ DE CONNAISSANCES D'ATELIER — 15 QUESTIONS QCM
// =========================================================================

export interface QuizQuestion {
  id: number;
  stepRef: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const QUIZ_DATA: QuizQuestion[] = [
  {
    id: 1,
    stepRef: 1,
    question: 'Quel outil d\'établi est STRICTEMENT INTERDIT pour dépoussiérer ou nettoyer la face d\'un cadran verni ou laqué ?',
    options: [
      'La brosse marron en poil de martre',
      'La pâte Rodico (verte ou grise)',
      'Le cabron de peau propre',
      'Le pinceau antistatique',
    ],
    correct: 1,
    explanation:
      'La pâte Rodico est formellement interdite sur la surface d\'un cadran : elle y dépose des résidus gras microscopiques et des auréoles indélébiles sur les vernis mats et soleillés. Seule la brosse marron en poil de martre est agréée.',
  },
  {
    id: 2,
    stepRef: 2,
    question: 'Pourquoi faut-il impérativement déposer le module automatique (ETA 2824) avant de chasser les aiguilles ?',
    options: [
      'Pour réduire le poids global du mouvement sur la balance',
      'Pour éviter d\'écraser les billes du roulement de rotor lors des pressions de chassage',
      'Parce que le ressort de barillet ne peut pas être remonté avec le module monté',
      'Pour permettre la lubrification des aiguilles',
    ],
    correct: 1,
    explanation:
      'L\'effort vertical exercé lors du chassage des aiguilles traverse le mouvement. Si le module automatique est en place, les contraintes se reportent sur les micro-billes du roulement et les pivots, provoquant des déformations et du jeu prématuré.',
  },
  {
    id: 3,
    stepRef: 4,
    question: 'Lors du bridage du cadran sur le posage gigogne, sur quelle zone est-il INTERDIT d\'exercer une pression du doigt ?',
    options: [
      'Sur les ponts métalliques en laiton',
      'Sur le pourtour extérieur de la platine',
      'Directement sur les pierres (rubis) des ponts de rouage',
      'Sur le rochet de barillet',
    ],
    correct: 2,
    explanation:
      'Règle d\'or d\'atelier suisse : interdiction absolue d\'appuyer sur les pierres des ponts ! Vous risquez d\'ébrécher le rubis ou d\'expulser la goutte d\'huile de lubrification (Moebius 9010), asséchant le pivot et polluant le rouage.',
  },
  {
    id: 4,
    stepRef: 5,
    question: 'À quoi sert le doigt de limitation (vis de soutien inférieure) sur le porte-pièce d\'aiguillage ?',
    options: [
      'À bloquer le balancier pendant le transport',
      'À soutenir le contre-pivot de la roue de seconde pour éviter de déchasser le rubis ou casser le pivot',
      'À régler la hauteur de la tige de remontoir',
      'À mesurer le couple de serrage des vis',
    ],
    correct: 1,
    explanation:
      'Lors du chassage de la trotteuse, l\'effort axial sur le canon est considérable. Le doigt de limitation, vissé en appui affleurant franc sous la pierre de seconde centrale, absorbe la force et protège le rubis et le pivot d\'une rupture fatale.',
  },
  {
    id: 5,
    stepRef: 6,
    question: 'Quelle est la tolérance officielle d\'un saut de date instantané sur un calibre suisse ?',
    options: [
      'Entre 22h00 et 02h00',
      'Entre 23h30 et 00h30',
      'Entre 23h55 et 00h05 (± 5 minutes)',
      'Exactement 00h00 sans aucune tolérance de seconde',
    ],
    correct: 2,
    explanation:
      'La tolérance officielle helvétique pour le saut de date est de ± 5 minutes, soit entre 23h55 et 00h05. C\'est pourquoi on avance au ralenti et on stoppe net dès le saut franc pour chasser les heures à 12h00 pile.',
  },
  {
    id: 6,
    stepRef: 8,
    question: 'Quelle est la tolérance d\'indexation de l\'aiguille des minutes lorsque l\'aiguille des heures pointe sur 12h00 pile ?',
    options: [
      '-5 min à +5 min',
      '-2 min à +2 min (minutes entre 11h58 et 12h02)',
      '0 min strict',
      '-10 min à +10 min',
    ],
    correct: 1,
    explanation:
      'Selon les critères d\'examen suisses, lorsque l\'aiguille des heures est parfaitement alignée sur l\'index de 12h00, l\'aiguille des minutes doit se situer entre 11h58 et 12h02 (tolérance de -2 à +2 minutes).',
  },
  {
    id: 7,
    stepRef: 9,
    question: 'Comment prépare-t-on le canon d\'une trotteuse neuve avant le chassage ?',
    options: [
      'On le chauffe à la flamme d\'alcool pour le dilater',
      'On passe un équarrissoir par le dessous à 90° jusqu\'à mi-hauteur maximum pour ébavurer',
      'On l\'huile abondamment à la Moebius 9010',
      'On l\'élargit sur toute sa longueur avec une pointe d\'acier',
    ],
    correct: 1,
    explanation:
      'L\'équarrissoir est introduit par le dessous à 90° jusqu\'à mi-hauteur maximum pour chanfreiner l\'entrée et ébavurer les bavures d\'estampage, sans ovaliser ni détendre le reste du tube de canon.',
  },
  {
    id: 8,
    stepRef: 10,
    question: 'Quelle position des aiguilles est recommandée avant d\'extraire la tige pour emboîter le mouvement ?',
    options: [
      'Groupées à 15h15 (vers la couronne / 3h)',
      'Opposées à 6h00 (une en haut, une en bas)',
      'Superposées à 12h00 pile',
      'Aucune importance',
    ],
    correct: 0,
    explanation:
      'En groupant les aiguilles à 15h15 vers la couronne, elles pointent vers le côté le plus accessible et sont totalement dégagées des rebords du posage et de la gorge de boîte lors des manipulations.',
  },
  {
    id: 9,
    stepRef: 10,
    question: 'Quel est le risque majeur si l\'on presse trop fort sur le plot de tirette avec le tournevis ?',
    options: [
      'On plie la masse oscillante',
      'On fait déboîter la bascule de tiret, obligeant à redémonter le cadran et les aiguilles',
      'On détend le ressort de barillet',
      'On décolle le saphir de boîte',
    ],
    correct: 1,
    explanation:
      'Un enfoncement excessif du plot de tirette fait sauter la bascule hors de sa gorge de pignon coulant. La remise en place exige la dépose complète des aiguilles, du cadran et de la plaque de maintien de calendrier.',
  },
  {
    id: 10,
    stepRef: 12,
    question: 'Comment forme-t-on le cône d\'amorce de filet à 90° sur une tige de remontoir coupée ?',
    options: [
      'À la meuleuse d\'établi à sec',
      'Au mandrin en laiton incliné à 45° roulé d\'avant en arrière sur la pierre d\'Arkansas',
      'À la pince universelle',
      'Par martelage sur un tas d\'acier',
    ],
    correct: 1,
    explanation:
      'La tige est pincée dans un mandrin en laiton, inclinée à 45° sur la pierre d\'Arkansas fine et roulée entre le pouce et l\'index : la rotation combinée à l\'angle de 45° génère un cône parfait à 90° sans bavure.',
  },
  {
    id: 11,
    stepRef: 12,
    question: 'Quel frein-filet est EXCLUSIVEMENT prescrit pour visser la couronne sur la tige de remontoir ?',
    options: [
      'Loctite 270 (verte, forte résistance)',
      'Loctite 243 (bleue, résistance moyenne)',
      'Loctite 222 (violette, frein faible démontable à froid)',
      'Colle cyanoacrylate rapide',
    ],
    correct: 2,
    explanation:
      'Seule la Loctite 222 violette (faible résistance, démontable à froid) est autorisée. Les 243 et 270 soudent la tige dans la couronne et provoquent la rupture nette de la tige lors des futurs services d\'entretien.',
  },
  {
    id: 12,
    stepRef: 13,
    question: 'Comment doit être orienté le fond de boîte lors de la fermeture à la potence sur calibre ETA ?',
    options: [
      'Logo ETA vers 6h (en bas), passage tige à droite',
      'Logo ETA vers 12h (en haut), passage tige à gauche (vers la couronne)',
      'Peu importe l\'orientation pourvu que le fond soit serré',
      'Numéro de série orienté vers 3h',
    ],
    correct: 1,
    explanation:
      'Dans les manufactures suisses, l\'orientation du fond respecte une norme stricte : logo ou signature fabricant orientée vers 12h (haut) et dégagement de tige orienté vers la gauche (position 9h / axe de couronne).',
  },
  {
    id: 13,
    stepRef: 7,
    question: 'Quelle est la garde minimale G1 (cadran ↔ aiguille des heures) selon la norme NIHS 91-10 ?',
    options: ['0.05 mm', '0.10 mm', '0.20 mm au-dessus des index', '0.60 mm'],
    correct: 2,
    explanation:
      'La garde G1 doit être au minimum de 0.20 mm au-dessus du relief le plus haut du cadran (index appliqués). Viennent ensuite G2 (≥ 0.15 mm), G3 (≥ 0.15 mm) et G4 (≥ 0.25-0.30 mm sous la glace).',
  },
  {
    id: 14,
    stepRef: 11,
    question: 'Pourquoi interdit-on l\'usage de la soufflette d\'air comprimé directement sur un cadran muni de ses aiguilles ?',
    options: [
      'Parce que le souffle fait tourner le balancier trop vite',
      'Parce que le flux d\'air projette des micro-fibres qui se coincent sous les canons d\'aiguilles',
      'Parce que l\'air refroidit l\'émail',
      'Parce que le souffle détend le ressort de tirette',
    ],
    correct: 1,
    explanation:
      'Le flux d\'air direct projette les particules ambiantes sous les canons des aiguilles et entre le disque de date et la platine, où elles restent piégées et deviennent impossibles à déloger sans tout démonter.',
  },
  {
    id: 15,
    stepRef: 13,
    question: 'Avec quel lubrifiant traite-t-on le joint torique du fond de boîte avant fermeture ?',
    options: [
      'Huile fine Moebius 9010',
      'Graisse perfluorée Fomblin UT18 (ou boîte silicone Moebius)',
      'Graisse graphite haute température',
      'Aucun, le joint torique se monte toujours strictement à sec',
    ],
    correct: 1,
    explanation:
      'Les joints toriques (O-Ring) de fond se lubrifient au Fomblin UT18 ou en boîte silicone pour éviter le pincement et l\'écrasement rotatif au vissage. En revanche, le joint de glace Hytrel se monte STRICTEMENT À SEC.',
  },
];

// =========================================================================
// 4. FLASHCARDS DE NORMES D'ÉTABLI (FICHES MÉMO)
// =========================================================================

export interface Flashcard {
  id: number;
  tag: string;
  front: string;
  back: string;
}

export const FLASHCARDS: Flashcard[] = [
  { id: 1, tag: 'Gardes NIHS', front: 'G1 — Cadran ↔ Aiguille des heures', back: '≥ 0.20 mm au-dessus des index appliqués les plus hauts.' },
  { id: 2, tag: 'Gardes NIHS', front: 'G2 — Heures ↔ Minutes', back: '≥ 0.15 mm — parallélisme contrôlé sur 12 h à la loupe 10x.' },
  { id: 3, tag: 'Gardes NIHS', front: 'G3 — Minutes ↔ Trotteuse', back: '≥ 0.15 mm — liberté sur toute la circonférence de rotation.' },
  { id: 4, tag: 'Gardes NIHS', front: 'G4 — Trotteuse ↔ Glace saphir', back: '≥ 0.25 à 0.30 mm — garde glace contrôlée sous lumière rasante.' },
  { id: 5, tag: 'Aiguillage', front: 'Doigt de limitation sous la seconde', back: 'Vis moletée en appui franc sous la pierre : absorbe la force de chassage pour éviter de casser le pivot.' },
  { id: 6, tag: 'Aiguillage', front: 'Position des aiguilles au retrait de tige', back: '15h15 (vers 3h / couronne) : dégage les aiguilles des parois de posage et de carrure.' },
  { id: 7, tag: 'Aiguillage', front: 'Indexation des minutes (NIHS)', back: 'Tolérance : -2 à +2 min (minutes entre 11h58 et 12h02 quand les heures sont à 12h00 pile).' },
  { id: 8, tag: 'Aiguillage', front: 'Saut de date conforme', back: 'Saut franc net entre 23h55 et 00h05 (± 5 min).' },
  { id: 9, tag: 'Hygiène', front: 'Propreté du cadran : Rodico ou Martre ?', back: 'ZÉRO Rodico sur cadran ! Dépoussiérage UNIQUEMENT à la brosse marron en poil de martre.' },
  { id: 10, tag: 'Tige', front: 'Cône d\'amorce de filet sur Arkansas', back: 'Mandrin laiton à 45° roulé entre les doigts : crée un cône parfait à 90° sans bavure.' },
  { id: 11, tag: 'Chimie', front: 'Frein-filet tige ↔ couronne', back: 'Loctite 222 (violette démontable à froid). Jamais de 243 ni de 270.' },
  { id: 12, tag: 'Joints', front: 'Joint de glace Hytrel (L-Ring)', back: 'Montage STRICTEMENT À SEC. Aucune graisse ni huile.' },
  { id: 13, tag: 'Joints', front: 'Joint torique de fond (O-Ring)', back: 'Lubrifié au Fomblin UT18 en boîte silicone pour prévenir tout pincement au vissage.' },
  { id: 14, tag: 'Emboîtage', front: 'Orientation du fond à la potence', back: 'Logo ETA orienté vers 12h (haut), passage de tige orienté vers la gauche (9h/couronne).' },
  { id: 15, tag: 'Automatisme', front: 'Dépose module automatique ETA 2824', back: 'Dévisser les 2 vis noires au tournevis 1.20 mm pour préserver les billes de roulement du rotor.' },
];

// =========================================================================
// 5. PRODUITS & OUTILS D'ÉTABLI (LEXIQUE OFFICIEL)
// =========================================================================

export interface BenchProduct {
  code: string;
  name: string;
  role: string;
  detail: string;
  tone: 'violet' | 'emerald' | 'amber' | 'sky';
}

export const BENCH_PRODUCTS: BenchProduct[] = [
  {
    code: 'LOCTITE 222',
    name: 'Frein-Filet Faible (Violet)',
    role: 'Tige ↔ couronne',
    detail: 'Exclusivement réservé à la fixation de la tige dans la couronne. Démontage facile à froid.',
    tone: 'violet',
  },
  {
    code: 'FOMBLIN UT18',
    name: 'Graisse Perfluorée Neutre',
    role: 'Joints toriques (O-Ring)',
    detail: 'Joints de fond et de tube de couronne. Inerte chimiquement, protège contre l\'écrasement et ne sèche jamais.',
    tone: 'emerald',
  },
  {
    code: 'MOEBIUS 9504',
    name: 'Graisse Contact Métal/Métal',
    role: 'Tirette & pignon coulant',
    detail: 'Gorge de tirette, crans de tige et dents de pignon coulant lors du remontage final de la boîte.',
    tone: 'amber',
  },
  {
    code: 'POIL DE MARTRE',
    name: 'Brosse Marron Ultra-Douce',
    role: 'Dépoussiérage cadran',
    detail: 'La seule méthode agréée pour balayer un cadran habillé sans laisser de voile gras ni rayer les laques.',
    tone: 'sky',
  },
];

// =========================================================================
// 6. HOTSPOTS INTERACTIFS DES SCHÉMAS (coordonnées dans le viewBox)
// =========================================================================

export interface Hotspot {
  x: number;
  y: number;
  title: string;
  text: string;
}

export const SCHEMA_VIEWS: Record<SchemaType, { w: number; h: number }> = {
  workshop_kit: { w: 500, h: 280 },
  auto_module_removal: { w: 500, h: 260 },
  dial_feet_support: { w: 500, h: 260 },
  dial_feet: { w: 500, h: 240 },
  limitation_finger: { w: 500, h: 280 },
  date_jump_sync: { w: 500, h: 260 },
  hours_minutes_fitting: { w: 500, h: 280 },
  hands_clearance: { w: 500, h: 280 },
  seconds_reaming: { w: 500, h: 280 },
  safe_stem_release: { w: 500, h: 260 },
  cleanliness_protocol: { w: 500, h: 260 },
  arkansas_cone: { w: 500, h: 280 },
  casing_final: { w: 500, h: 280 },
  dial_protection: { w: 500, h: 280 },
  grazing_beam: { w: 400, h: 200 },
  gaskets_casing: { w: 500, h: 240 },
  case_assembly: { w: 500, h: 280 },
  stem_cutting: { w: 500, h: 280 },
  waterproof_testing: { w: 500, h: 280 },
};

export const SCHEMA_HOTSPOTS: Record<SchemaType, Hotspot[]> = {
  workshop_kit: [
    { x: 95, y: 90, title: 'Posage Universel', text: 'Support réglable avec bague de réduction pour caler parfaitement la platine sans toucher le balancier.' },
    { x: 250, y: 90, title: 'Doigt de limitation', text: 'Porte-pièce muni de sa vis moletée inférieure : soutient le rubis de seconde centrale lors du chassage.' },
    { x: 405, y: 90, title: 'Posage gigogne + cabron', text: 'Assure un plan d\'appui doux qui protège la laque du cadran lors du bridage des targettes.' },
    { x: 75, y: 205, title: 'Tournevis rouge 1.20 mm', text: 'Calibre standard suisse pour les vis du module automatique et les vis de brides d\'emboîtage.' },
    { x: 190, y: 205, title: 'Brucelles en laiton', text: 'Mors doux en laiton : élimine tout risque de rayure sur la platine perlée ou bleuie.' },
    { x: 310, y: 205, title: 'Pierre d\'Arkansas & Couteau', text: 'Grain d\'Arkansas pour tailler le cône à 90° et lame d\'ouvre-boîte pour ébavurer les premiers filets.' },
    { x: 430, y: 205, title: 'Brosse poil de martre', text: 'Brosse marron exclusive pour le cadran : élimine les poussières sans aucun risque de trace grasse.' },
  ],
  auto_module_removal: [
    { x: 145, y: 107, title: 'Vis noire n°1', text: 'Vis bleuie/brillant noir du bâti automatique. Dévissage au tournevis rouge 1.20 mm.' },
    { x: 215, y: 107, title: 'Vis noire n°2', text: 'Deuxième point d\'ancrage du module. Desserrer alternativement sans rayer le pont.' },
    { x: 180, y: 140, title: 'Rotor & Roulement', text: 'La masse oscillante et son bâti se retirent d\'un bloc pour protéger les micro-billes.' },
    { x: 385, y: 135, title: 'Règle d\'atelier ETA', text: 'Ne jamais chasser les aiguilles avec le module monté : la pression axiale détruirait le roulement.' },
  ],
  dial_feet_support: [
    { x: 180, y: 185, title: 'Cabron de peau', text: 'Protection impérative sur le posage gigogne pour accueillir la face visible du cadran.' },
    { x: 120, y: 115, title: 'Interdiction rubis', text: 'JAMAIS d\'appui direct sur les pierres synthétiques : risque d\'expulsion d\'huile ou de casse.' },
    { x: 180, y: 93, title: 'Appui laiton seul', text: 'La pression de maintien se fait exclusivement sur le laiton métallique des ponts.' },
    { x: 288, y: 133, title: 'Brides cadran', text: 'Poussées en butée franche avec les brucelles en laiton (jamais de tournevis blessant).' },
  ],
  dial_feet: [
    { x: 116, y: 85, title: 'Pieds en cuivre', text: 'Deux pieds cylindriques brasés au dos du cadran. Rectitude contrôlée à l\'équerre de précision.' },
    { x: 137, y: 108, title: 'Vis oblique 45°', text: 'Serrage alternatif des deux pieds, couple 1.2 cNm maximum pour éviter de cisailler le pied.' },
    { x: 370, y: 110, title: 'Verrou excentrique', text: 'Pince le pied sans entaille par une simple rotation d\'un quart de tour.' },
    { x: 250, y: 219, title: 'Règle maîtresse', text: 'Ne JAMAIS bloquer le 1er pied à fond sans avoir approché le second (risque de voilage).' },
  ],
  limitation_finger: [
    { x: 248, y: 13, title: 'Force axiale F', text: 'Pression de chassage verticale exercée par le posoir lors de l\'enfoncement de la trotteuse.' },
    { x: 248, y: 107, title: 'Pierre de seconde', text: 'Rubis de contre-pivot recevant l\'extrémité du pivot traversant la chaussée.' },
    { x: 248, y: 175, title: 'Doigt de limitation', text: 'Vis de soutien moletée amenée en contact franc sous le contre-pivot : absorbe l\'effort.' },
    { x: 248, y: 235, title: 'Molette de réglage', text: 'Moletée pour un ajustement au doigt sans contraindre ni soulever la platine.' },
    { x: 98, y: 150, title: 'Sécurité absolue', text: 'Empêche le déchassage de la pierre du pont ou la rupture nette du pivot de rouage.' },
  ],
  date_jump_sync: [
    { x: 155, y: 68, title: 'Saut franc 00h00', text: 'Déclenchement instantané du cliquet de date à minuit pile.' },
    { x: 210, y: 140, title: 'Guichet de date', text: 'Disque dateur sautant entre 23h55 et 00h05 (tolérance officielle suisse ± 5 min).' },
    { x: 110, y: 83, title: 'Sens antihoraire', text: 'Rotation lente de la tige en position 3 en ralentissant à l\'approche de minuit.' },
    { x: 375, y: 140, title: 'Arrêt immédiat', text: 'Stopper net dès le « clic » avant de chasser l\'aiguille des heures à 12h00 pile.' },
  ],
  hours_minutes_fitting: [
    { x: 75, y: 160, title: 'Aiguille des heures', text: 'Chassée à 12h00 pile à fleur de la roue des heures. Parallélisme vérifié sur 360°.' },
    { x: 70, y: 138, title: 'Aiguille des minutes', text: 'Chassée à 12h00 pile à fleur de la chaussée sans contact avec les index.' },
    { x: 95, y: 148, title: 'Garde G2 ≥ 0.15 mm', text: 'Espace franc entre le plan des heures et celui des minutes pour éviter tout frottement.' },
    { x: 377, y: 155, title: 'Indexation ±2 min', text: 'Tolérance stricte : minutes entre 11h58 et 12h02 quand les heures sont à midi pile.' },
  ],
  hands_clearance: [
    { x: 185, y: 159, title: 'Aiguille des Heures', text: 'Posée en premier, montée à force calibrée sur le canon des heures.' },
    { x: 230, y: 118, title: 'Aiguille des Minutes', text: 'Plan intermédiaire. Garde G2 avec les heures ≥ 0.15 mm sur 12 h complètes.' },
    { x: 255, y: 80, title: 'Trotteuse', text: 'Plan supérieur. Garde G3 ≥ 0.15 mm et garde glace G4 ≥ 0.30 mm.' },
    { x: 140, y: 138, title: 'G2 ≥ 0.15 mm', text: 'Parallélisme contrôlé à la loupe 10x à 12h, 3h, 6h et 9h.' },
    { x: 220, y: 187, title: 'G1 ≥ 0.20 mm', text: 'Garde index : distance minimale entre l\'aiguille des heures et les index appliqués.' },
    { x: 140, y: 95, title: 'G3 ≥ 0.15 mm', text: 'Liberté du canon de trotteuse au-dessus du canon des minutes.' },
    { x: 300, y: 62, title: 'G4 ≥ 0.30 mm', text: 'Garde glace : distance de sécurité sous la face intérieure du saphir.' },
  ],
  seconds_reaming: [
    { x: 135, y: 110, title: 'Canon de trotteuse', text: 'Alésage tubulaire recevant le pivot de seconde centrale.' },
    { x: 135, y: 150, title: 'Équarrissage 90°', text: 'Introduit par le dessous à 90° jusqu\'à mi-hauteur max pour ébavurer l\'entrée.' },
    { x: 365, y: 80, title: 'Garde glace G4 ≥ 0.30 mm', text: 'Distance de sécurité sous le saphir pour absorber la flèche de déformation sous pression.' },
    { x: 365, y: 120, title: 'Garde G3 ≥ 0.15 mm', text: 'Empêche la trotteuse de toucher le plan des minutes.' },
    { x: 325, y: 100, title: 'Contrepoids', text: 'Contrôle horizontal du contrepoids : ne doit jamais plonger en avant.' },
  ],
  safe_stem_release: [
    { x: 145, y: 140, title: 'Aiguilles à 15h15', text: 'Groupées vers 3h (couronne) : aucun risque de contact avec les bords de boîte.' },
    { x: 315, y: 103, title: 'Plot de tirette', text: 'Pression douce et mesurée avec la panne du tournevis rouge 1.20 mm.' },
    { x: 400, y: 103, title: 'Traction axiale', text: 'Extraction de la tige en ligne droite sans mouvement oscillant.' },
    { x: 372, y: 175, title: 'Piège de la bascule', text: 'Ne jamais forcer : un enfoncement excessif fait sauter la bascule hors du tiret !' },
  ],
  cleanliness_protocol: [
    { x: 135, y: 100, title: 'ZÉRO Rodico s/ cadran', text: 'Interdiction absolue : laisse des micro-dépôts gras irréversibles sur vernis et laques.' },
    { x: 365, y: 100, title: 'Brosse poil de martre', text: 'Brosse marron dédiée au cadran : balaie délicatement les particules sans trace.' },
    { x: 135, y: 190, title: 'Pas de soufflette directe', text: 'La soufflette projette les fibres sous les canons d\'aiguilles et sous le disque dateur.' },
    { x: 365, y: 190, title: 'Microfibre & Faisceau 45°', text: 'Inspection de la glace et de la boîte sous éclairage rasant à 45°.' },
  ],
  arkansas_cone: [
    { x: 170, y: 190, title: 'Pierre d\'Arkansas', text: 'Support abrasif fin pour rectifier l\'acier sans l\'échauffer ni le bleuir.' },
    { x: 160, y: 125, title: 'Mandrin laiton à 45°', text: 'Tenu à 45° et roulé d\'avant en arrière pour usiner un cône à 90° sur le premier filet.' },
    { x: 210, y: 110, title: 'Va-et-vient régulier', text: 'Mouvement fluide entre les doigts pour une concentricité parfaite du cône.' },
    { x: 380, y: 120, title: 'Ébavurage ouvre-boîte', text: 'Passer la lame de couteau d\'horloger dans le filet pour éliminer le morfil.' },
    { x: 380, y: 200, title: 'Loctite 222 violette', text: 'Frein-filet faible démontable à froid. Jamais de 243 (bleue) ni de 270 (verte) !' },
  ],
  casing_final: [
    { x: 140, y: 150, title: 'Cercle d\'emboîtage', text: 'Bague de centrage maintenant le calibre concentrique au tube de boîte.' },
    { x: 92, y: 125, title: 'Brides & vis de boîte', text: '2 vis de boîte serrées en croix à 2.0 cNm dans la gorge de carrure.' },
    { x: 367, y: 105, title: 'Logo ETA à 12h', text: 'Orientation officielle suisse : logo manufacture positionné en haut à 12h.' },
    { x: 317, y: 140, title: 'Passage tige à gauche', text: 'Dégagement d\'axe de couronne orienté vers la gauche (position 9h).' },
    { x: 367, y: 205, title: 'Fermeture potence', text: 'Pression axiale progressive sur joint siliconé au Fomblin UT18 sans voilage.' },
  ],
  dial_protection: [
    { x: 150, y: 130, title: 'Film Mylar', text: 'Protecteur Bergeon 6938 interposé systématiquement sous les aiguilles au chassage.' },
    { x: 110, y: 95, title: 'Cadran émaillé', text: 'Surface sensible : manipulation par la tranche uniquement avec doigtiers propres.' },
    { x: 370, y: 62, title: 'Pince Presto N°1', text: 'Dépose axiale des aiguilles sans frottement sur le cadran.' },
    { x: 370, y: 97, title: 'Posoir Delrin', text: 'Tasseaux en matière synthétique douce pour ne pas rayer le vernis des aiguilles.' },
    { x: 370, y: 150, title: 'Moelle de sureau', text: 'Nettoyage des pointes de brucelles et aiguilles sans dépôt de résidu.' },
    { x: 250, y: 257, title: 'Consigne Mylar', text: 'Toujours retirer le film en le faisant glisser parallèlement au cadran.' },
  ],
  grazing_beam: [
    { x: 70, y: 50, title: 'Lampe à 45°', text: 'Faisceau rasant sur fond sombre révélant les micro-poussières invisibles en zénithal.' },
    { x: 240, y: 133, title: 'Micro-fibre révélée', text: 'Diffuse la lumière et projette une ombre portée nette comme une étoile dans la nuit.' },
    { x: 302, y: 148, title: 'Ombre portée', text: 'Permet de localiser immédiatement la hauteur et la position de la poussière.' },
    { x: 240, y: 40, title: 'Regard loupe 4x', text: 'Inspection méthodique secteur par secteur avant le passage en boîte.' },
  ],
  gaskets_casing: [
    { x: 170, y: 70, title: 'Glace saphir', text: 'Contrôler la face intérieure en lumière rasante avant l\'insertion du calibre.' },
    { x: 130, y: 60, title: 'Joint Hytrel (L-Ring)', text: 'Joint de glace : montage STRICTEMENT À SEC. Aucune graisse silicone !' },
    { x: 120, y: 170, title: 'Montage à sec', text: 'L\'Hytrel assure l\'étanchéité par écrasement. La graisse détruit la tenue.' },
    { x: 400, y: 105, title: 'O-Ring + Fomblin', text: 'Les joints toriques de fond et de tige se lubrifient à la graisse perfluorée Fomblin.' },
    { x: 355, y: 170, title: 'Boîte silicone', text: 'Boîte à coussinets Bergeon pour une imprégnation fine et homogène sans excès.' },
  ],
  case_assembly: [
    { x: 250, y: 56, title: 'Glace & joint Hytrel', text: 'Posés à la potence avant montage du mouvement.' },
    { x: 102, y: 96, title: 'Bride & vis', text: 'Brides d\'emboîtage serrées en croix à 2.0 cNm dans la gorge de carrure.' },
    { x: 250, y: 142, title: 'Mouvement habillé', text: 'Calibre reposant sur un porte-pièce évidé sans contrainte sur le rouage.' },
    { x: 350, y: 125, title: 'Tube de boîte', text: 'Alignement rigoureux avec le pignon coulant pour éviter tout frottement de tige.' },
    { x: 455, y: 140, title: 'Couronne & joint', text: 'Jeu sous couronne contrôlé à 0.05 mm en position remontage neutre.' },
    { x: 250, y: 233, title: 'Fond vissé & joint', text: 'Dernier rempart d\'étanchéité serré au couple manufacturier prescrit.' },
  ],
  stem_cutting: [
    { x: 77, y: 90, title: 'Carré de remontoir', text: 'Zone motrice d\'entraînement : aucune coupe dans cette partie.' },
    { x: 125, y: 90, title: 'Gorge de tirette', text: 'Accueille le levier de tirette lubrifié à la graisse Moebius 9504.' },
    { x: 245, y: 90, title: 'Filetage S0.90 / S1.20', text: 'Filet de vissage de couronne chanfreiné sur Arkansas après découpe.' },
    { x: 260, y: 42, title: 'Point de coupe L', text: 'Règle d\'or : couper avec +1 mm de marge puis ajuster sur la pierre d\'Arkansas.' },
    { x: 302, y: 100, title: 'Chute à couper', text: 'Coupe franche à la pince d\'horloger carbure.' },
    { x: 365, y: 90, title: 'Taraudage couronne', text: 'Profondeur utile vérifiée pour un vissage complet sans butée prématurée.' },
    { x: 365, y: 185, title: 'Loctite 222', text: 'Micro-touche de frein-filet violet démontable à froid.' },
  ],
  waterproof_testing: [
    { x: 140, y: 140, title: 'Cloche étanche', text: 'Mesure de déformation micrométrique sous pression sans immersion.' },
    { x: 140, y: 118, title: 'Palpeur LVDT', text: 'Capteur haute précision mesurant la flexion élastique de la carrure.' },
    { x: 360, y: 75, title: 'Courbe étanche', text: 'Déformation stable : moins de 0.1 µm de fuite par minute.' },
    { x: 360, y: 112, title: 'Fuite détectée', text: 'Chute de la courbe trahissant un défaut de joint ou un pincement.' },
    { x: 370, y: 160, title: 'Norme ISO 22810', text: 'Cycle dépression -0.5 bar puis surpression +5 à +10 bar conforme.' },
    { x: 250, y: 257, title: 'Choc thermique 40°C/18°C', text: 'Test de condensation sur plaque chaude : aucune trace de buée interne.' },
  ],
};

// =========================================================================
// 7. UTILITAIRES — NOTE SUISSE (ÉCHELLE 1 À 6)
// =========================================================================

export function swissNote(score: number, max: number): number {
  if (max <= 0) return 1;
  return Math.round((1 + (score / max) * 5) * 10) / 10;
}

export function swissMention(note: number): { label: string; tone: 'emerald' | 'sky' | 'amber' | 'red' } {
  if (note >= 5.5) return { label: 'Très Bien — Maîtrise d\'Atelier', tone: 'emerald' };
  if (note >= 4.5) return { label: 'Bien — Compétence Validée', tone: 'sky' };
  if (note >= 4.0) return { label: 'Suffisant — Seuil de Réussite', tone: 'amber' };
  return { label: 'Insuffisant — Reprendre les Gestes d\'Atelier', tone: 'red' };
}
