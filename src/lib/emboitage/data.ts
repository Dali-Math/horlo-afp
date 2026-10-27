/**
 * HorloLearn — Académie Pratique · Posages & Emboîtages d'Atelier
 * Données du cours : 7 gestes fondamentaux, grille AFP/CFC, quiz, flashcards,
 * produits d'établi et points chauds (hotspots) des schémas techniques.
 * Écriture & thème : « Théorie & Académie Horlogère Suisse » (horlolearn.ch/theorie).
 */

// =========================================================================
// 1. LES 7 ÉTAPES FONDAMENTALES D'EMBOÎTAGE
// =========================================================================

export interface StepData {
  id: number;
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
  | 'dial_feet'
  | 'hands_clearance'
  | 'dial_protection'
  | 'grazing_beam'
  | 'gaskets_casing'
  | 'case_assembly'
  | 'stem_cutting'
  | 'waterproof_testing';

export const STEPS_DATA: StepData[] = [
  {
    id: 1,
    badge: 'Phase Préparatoire',
    title: 'Contrôle, Cadrage & Fixation du Cadran',
    summary:
      "Le cadran est le visage de la montre. Avant toute fixation sur la platine, inspectez scrupuleusement la rectitude des deux pieds en cuivre à la loupe 4x. Un pied faussé créera une tension asymétrique qui fera bomber le cadran ou frotter le disque dateur.",
    tools: ['Tournevis 30081 (0.80 mm)', 'Brucelles fines N°3', "Loupe d'établi 4x"],
    torques: '1.2 cNm max',
    standard: 'NIHS 91-10',
    masterTip:
      'Ne bloquez JAMAIS la première vis à fond ! Approchez la première vis sans forcer, approchez la seconde vis, contrôlez le centrage parfait du guichet de date autour du disque, puis appliquez le serrage final alternatif.',
    trapAlert:
      "Serrer la vis avec un tournevis trop large ou forcer le couple : le pied en cuivre se sectionne net à la base ou l'émail saute sur la face visible du cadran. Zéro éliminatoire immédiat aux examens !",
    schemaType: 'dial_feet',
  },
  {
    id: 2,
    badge: 'Micro-Mécanique de Précision',
    title: 'Chassage des Aiguilles & Gardes NIHS 91-10',
    summary:
      "Le chassage des aiguilles requiert un sang-froid absolu. L'aiguille doit être parfaitement horizontale, parallèle au cadran, sans aucune trace d'outil, et positionnée à des distances micrométriques impératives définies par la norme suisse NIHS 91-10.",
    tools: [
      'Presse à chasser Bergeon',
      'Tasseaux en Delrin',
      'Protecteur Mylar Bergeon 6938',
      'Pince aux aiguilles Presto N°1',
    ],
    torques: 'Chassage progressif sans à-coup',
    standard: 'NIHS 91-10 (G1, G2, G3, G4)',
    masterTip:
      "Avant de poser la première aiguille, faites tourner la tige en position mise à l'heure jusqu'au saut franc de la date. Stoppez net ! Posez alors l'aiguille des heures pointant rigoureusement sur 12h00, puis l'aiguille des minutes. Votre date sautera ainsi précisément à 00:00 (tolérance : 23h55 – 00:05).",
    trapAlert:
      "Chasser une aiguille sans protecteur de cadran en Mylar, ou laisser l'aiguille des minutes frotter les index appliqués ou la face interne du saphir. Baisse d'amplitude fatale et rayure irrémédiable.",
    schemaType: 'hands_clearance',
  },
  {
    id: 3,
    badge: 'Hygiène Chirurgicale',
    title: 'La Chasse Chirurgicale à la Poussière (Protocole 45°)',
    summary:
      "C'est la hantise de l'horloger : la micro-poussière invisible lors de l'assemblage qui, une fois la boîte fermée et livrée, vient se coller en plein milieu du saphir au soleil ! Pour éliminer ce risque, l'atelier suisse applique le protocole d'inspection en lumière rasante à 45°.",
    tools: [
      'Poire à soufflet Bergeon 4657 (Filtre HEPA)',
      'Pâte Rodico 6033 fraîche',
      'Bâtonnet de moelle de sureau',
      "Lampe d'établi articulée 45°",
    ],
    torques: 'Pression douce par tamponnement',
    standard: 'Protocole Salle Blanche Horlogère',
    masterTip:
      "L'éclairage zénithal (par le dessus) crée des reflets qui masquent les poussières. En inclinant la lumière à 45° en faisceau rasant sur fond sombre, chaque micro-fibre projette une ombre portée nette et diffuse la lumière, devenant visible comme une étoile dans la nuit !",
    trapAlert:
      "Utiliser une bombe d'air comprimé industrielle (projette des micro-gouttelettes d'huile propulseur) ou un chiffon synthétique (crée de l'électricité statique attirant les particules).",
    schemaType: 'grazing_beam',
  },
  {
    id: 4,
    badge: 'Habillage & Étanchéité',
    title: 'Préparation de la Boîte, de la Glace & des Joints',
    summary:
      'La carrure doit être nettoyée aux ultrasons, séchée à l\'étuve à 60°C et débarrassée de tout résidu de pâte à polir. Les joints sont les gardiens de la montre : leur manipulation et lubrification répondent à des règles suisses inflexibles.',
    tools: [
      'Boîte à graisse silicone Bergeon 7007',
      'Graisse Fomblin UT18',
      'Potence à chasser les verres',
      'Tasseaux adaptés au profil de glace',
    ],
    torques: 'Friction contrôlée',
    standard: 'ISO 22810 & NIHS 92-20',
    masterTip:
      "Avant d'insérer le mouvement, placez la carrure vide sous la lumière rasante pour inspecter la face intérieure de la glace. Une trace de doigt ou un dépôt gras laissé par une brucelle métallique ne pourra plus être nettoyé une fois le mouvement en place sans redémonter tout l'ensemble !",
    trapAlert:
      "Graisser le joint de glace Hytrel / Téflon : le joint de glace se monte STRICTEMENT À SEC ! L'adjonction de graisse détruit la friction d'emmanchement et la glace saute sous la pression de l'eau !",
    schemaType: 'gaskets_casing',
  },
  {
    id: 5,
    badge: 'Assemblage Carrure',
    title: 'Emboîtage du Mouvement, Cercle & Brides de Fixation',
    summary:
      'Le calibre équipé de son cadran et de ses aiguilles est déposé dans la carrure sur un porte-pièce d\'emboîtage évidé (pour ne jamais appuyer sur le balancier ou les aiguilles). Il est ensuite verrouillé à l\'aide de brides de boîte (casing clamps) vissées dans la gorge de carrure.',
    tools: [
      "Porte-pièce d'emboîtage Delrin évidé",
      'Tournevis 30081 (1.20 mm)',
      'Pâte Rodico pour préhension de vis',
    ],
    torques: '1.8 à 2.2 cNm (Serrage en croix)',
    standard: 'Directives ETA / Valjoux',
    masterTip:
      'Les vis de boîte sont microscopiques : déposez une tête d\'épingle de Rodico frais sur la panne de votre tournevis. La vis y adhère parfaitement, vous permettant de la guider dans le trou taraudé de la platine sans risque de la faire tomber dans le balancier-spiral.',
    trapAlert:
      'Serrer une bride à fond sans approcher la seconde : le calibre se met en biais par rapport au tube de carrure, ce qui fait frotter la tige de remontoir dans le tube et fausse le remontage.',
    schemaType: 'case_assembly',
  },
  {
    id: 6,
    badge: 'Cote Fondamentale',
    title: 'Découpe Micrométrique de la Tige de Remontoir & Loctite 222',
    summary:
      "La tige de remontoir brute fournie par la manufacture est toujours trop longue. Elle doit être tronquée au centième de millimètre près. C'est l'un des exercices les plus sélectifs de l'examen suisse : une tige trop courte est bonne pour la poubelle, une tige trop longue ruine l'étanchéité !",
    tools: [
      'Pied à coulisse digital au 1/100e',
      'Pince coupante au carbure de tungstène',
      "Pierre d'Arkansas pour chanfrein 45°",
      'Loctite 222 (violette démontable)',
    ],
    torques: 'Formule : L = A + B − 0.20 (Jeu : 0.20 mm)',
    standard: 'Norme Métrologique NIHS',
    masterTip:
      "Après découpe à la pince carbure, ébavurez impérativement l'amorce de filet sur une pierre d'Arkansas en faisant tourner la tige à 45°. Si le filet n'est pas chanfreiné, il refoule le taraudage de la couronne au vissage !",
    trapAlert:
      'Utiliser de la Loctite 270 (verte) ou Loctite 243 (bleue) : elles soudent la tige dans la couronne et rendent tout démontage futur impossible sans casser la tige nette !',
    schemaType: 'stem_cutting',
  },
  {
    id: 7,
    badge: 'Contrôle Métrologique Final',
    title: "Contrôle d'Étanchéité selon Normes NIHS 92-20 & ISO 22810",
    summary:
      'Une montre emboîtée ne quitte jamais l\'établi sans un test de résistance à l\'eau officiel. L\'appareil de référence (Witschi Proofmaster) mesure la déformation élastique de la carrure sous vide (-0.5 bar) et sous surpression (+2 à +10 bar).',
    tools: [
      "Chrono-comparateur d'étanchéité Witschi Proofmaster",
      'Plaque chauffante thermostatée à 40°C - 45°C',
      "Compte-gouttes d'eau froide à 18°C",
    ],
    torques: 'Cycles -0.5 bar / +5.0 bar',
    standard: 'NIHS 92-20 & ISO 22810',
    masterTip:
      "Commencez TOUJOURS par le test sous dépression (vide -0.5 bar). Si la boîte fuit, la dépression écarte légèrement le joint sans aucun danger pour le calibre, alertant immédiatement l'appareil sans introduire d'humidité.",
    trapAlert:
      "Omettre le test de condensation thermique : une montre peut passer le test de pression d'air tout en contenant de l'air humide emprisonné lors de l'emboîtage qui embuera au moindre froid !",
    schemaType: 'waterproof_testing',
  },
];

// =========================================================================
// 2. GRILLE OFFICIELLE D'ÉVALUATION AFP / CFC (30 points)
// =========================================================================

export interface ExamCriterion {
  id: number;
  label: string;
  points: number;
  isEliminatory?: boolean;
  desc: string;
}

export const EXAM_CRITERIA: ExamCriterion[] = [
  { id: 1, label: '1. Propreté cadran & saphir (Zéro poussière, zéro trace)', points: 4, isEliminatory: true, desc: 'Inspection sous lumière rasante 45° et loupe 2.5x. Critère éliminatoire direct.' },
  { id: 2, label: '2. Parallélisme des aiguilles sur 12 heures', points: 4, desc: 'Tolérance ±0.05 mm, absence totale de cambrage vicieux ou de plongeon.' },
  { id: 3, label: '3. Synchronisation du saut de date à 00:00', points: 3, desc: 'Tolérance helvétique : saut franc entre 23h55 et 00:05.' },
  { id: 4, label: '4. Gardes d\'aiguillage G1, G2, G3, G4 conformes NIHS 91-10', points: 4, desc: 'G1 ≥ 0.20 mm, G2 ≥ 0.15 mm, G3 ≥ 0.15 mm, G4 ≥ 0.25 mm.' },
  { id: 5, label: '5. Cadrage & centrage dans la lunette', points: 2, desc: 'Pieds serrés sans déformation (couple 1.2 cNm), concentricité parfaite avec le réhaut.' },
  { id: 6, label: '6. Brides d\'emboîtage & centrage mouvement', points: 2, desc: 'Serrage en croix (2.0 cNm), aucune bavure sur les têtes de vis bleuies.' },
  { id: 7, label: '7. Coupe de tige & fonctionnement couronne', points: 4, desc: 'Jeu sous couronne ≤ 0.05 mm, chanfrein Arkansas 45°, Loctite 222 violette.' },
  { id: 8, label: '8. Graissage & intégrité des joints', points: 3, desc: 'Joint de glace Hytrel monté à sec, joint de fond siliconé au Fomblin UT18 sans pincement.' },
  { id: 9, label: '9. Test étanchéité Proofmaster conforme (NIHS 92-20)', points: 2, desc: 'Déformation stable sous vide (-0.5 bar) et sous surpression (+5 bar).' },
  { id: 10, label: '10. Test de condensation négatif', points: 2, desc: 'Plaque chauffante à 40°C puis goutte froide à 18°C. Aucune buée sur la face interne.' },
];

export const EXAM_TOTAL = EXAM_CRITERIA.reduce((a, c) => a + c.points, 0); // 30

// =========================================================================
// 3. QUIZ DE CONNAISSANCES — 12 QUESTIONS QCM
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
    question: 'Vous fixez un cadran sur la platine. Quelle est la règle de serrage des deux vis de pieds ?',
    options: [
      'Serrer la première à fond, puis la seconde',
      'Approcher les deux vis, contrôler le centrage du guichet, puis serrer en alternance',
      'Serrer uniquement la seconde vis, la première reste libre',
      'Appliquer un frein-filet moyen sur chaque pied avant vissage',
    ],
    correct: 1,
    explanation:
      'Règle maîtresse de l\'étape 1 : jamais de serrage à fond sur le premier pied sans avoir engagé le second — sinon le cadran se voile (« voilage ») et le disque dateur frotte. Couple maximal : 1.2 cNm.',
  },
  {
    id: 2,
    stepRef: 1,
    question: 'Quel est le couple de serrage maximal des vis de pieds de cadran ?',
    options: ['0.5 cNm', '1.2 cNm', '2.0 cNm', '5.0 cNm'],
    correct: 1,
    explanation:
      '1.2 cNm maximum. Au-delà, le pied en cuivre se sectionne net à la base ou l\'émail saute sur la face visible du cadran : défaut éliminatoire immédiat aux examens AFP / CFC.',
  },
  {
    id: 3,
    stepRef: 2,
    question: "Avant de chasser les aiguilles, comment positionnez-vous la tige de remontoir ?",
    options: [
      'En position 1 (remontage), couronne tirée au minimum',
      "Peu importe, la position de la tige n'influence pas l'aiguillage",
      "En position mise à l'heure, juste après le saut franc de la date, heures pointées sur 12h00",
      'En position 0 (plongée), aiguilles libres',
    ],
    correct: 2,
    explanation:
      "On tourne la tige en position mise à l'heure jusqu'au saut franc de la date, on stoppe net, puis on pose l'aiguille des heures sur 12h00 exactement. Le saut de date tombera alors précisément à 00:00 (tolérance 23h55 – 00:05).",
  },
  {
    id: 4,
    stepRef: 3,
    question: "Pourquoi inspecter le cadran en lumière rasante à 45° plutôt qu'en lumière zénithale ?",
    options: [
      "La lumière rasante chauffe moins le cadran et préserve l'émail",
      'Les micro-fibres projettent une ombre portée nette et deviennent visibles',
      'Elle élimine l\'électricité statique qui attire les poussières',
      'Elle permet de travailler sans loupe, même à 1x',
    ],
    correct: 1,
    explanation:
      "L'éclairage zénithal crée des reflets spéculaires qui masquent les particules. En faisceau rasant à 45° sur fond sombre, chaque micro-fibre projette une ombre portée nette : elle devient visible comme une étoile dans la nuit.",
  },
  {
    id: 5,
    stepRef: 4,
    question: 'Comment se monte le joint de glace Hytrel (L-Ring) ?',
    options: [
      'Graisé au Fomblin UT18 pour faciliter l\'emmanchement',
      'Strictement à sec, l\'étanchéité vient de l\'écrasement contrôlé',
      'Humidifié à l\'alcool pour le glissement',
      'Graisé à la silicone Moebius 9504',
    ],
    correct: 1,
    explanation:
      "STRICTEMENT À SEC ! Le joint de glace assure l'étanchéité par écrasement géométrique. Toute graisse détruit la friction d'emmanchement : la glace saute sous la pression de l'eau. Seuls les joints toriques se graissent au Fomblin.",
  },
  {
    id: 6,
    stepRef: 4,
    question: 'Avec quel produit lubrifie-t-on les joints toriques de fond et de couronne ?',
    options: ['Huile Moebius 9010', 'Pâte de rodage diamantée', 'Fomblin UT18 (ou Moebius 8513)', 'Loctite 222'],
    correct: 2,
    explanation:
      'Fomblin UT18, graisse perfluorée chimiquement inerte qui ne sèche jamais : elle empêche le pincement du joint lors du vissage du fond. Le joint de glace, lui, reste à sec.',
  },
  {
    id: 7,
    stepRef: 6,
    question: 'Quel frein-filet autorisez-vous sur la tige de remontoir dans la couronne ?',
    options: ['Loctite 270 (verte)', 'Loctite 243 (bleue)', 'Loctite 222 (violette, démontable)', 'Aucun, la tige reste libre'],
    correct: 2,
    explanation:
      'Loctite 222 violette, démontable à froid. Les 270 et 243 soudent la tige dans la couronne : tout démontage futur devient impossible sans casser la tige nette.',
  },
  {
    id: 8,
    stepRef: 6,
    question: "Vous devez couper une tige de remontoir. Quelle est la règle d'or de la coupe ?",
    options: [
      'Couper 0.20 mm de moins que la cote, puis ajuster à la lime',
      'Couper exactement à la cote du pied à coulisse, d\'un seul coup',
      'Couper 0.20 mm de plus pour laisser le joint se compresser',
      'Couper au tiers, essayer, et recommencer jusqu\'au bon engagement',
    ],
    correct: 0,
    explanation:
      "Une tige trop courte est irrémédiablement perdue ; une tige un peu longue se retouche à la lime en 10 secondes. On coupe donc toujours 0.20 mm DE MOINS, puis on ébavure l'amorce de filet sur la pierre d'Arkansas à 45°.",
  },
  {
    id: 9,
    stepRef: 2,
    question: 'Quelle est la garde G1 minimale (cadran ↔ aiguille des heures) selon la NIHS 91-10 ?',
    options: ['0.05 mm', '0.10 mm', '0.20 mm', '0.50 mm'],
    correct: 2,
    explanation:
      'G1 ≥ 0.20 mm au-dessus des index appliqués. Viennent ensuite G2 (heures ↔ minutes) ≥ 0.15 mm, G3 (minutes ↔ trotteuse) ≥ 0.15 mm et G4 (trotteuse ↔ glace) ≥ 0.25-0.30 mm.',
  },
  {
    id: 10,
    stepRef: 7,
    question: 'Dans quel ordre effectuez-vous les tests du Proofmaster ?',
    options: [
      'Surpression +5 bar, puis dépression -0.5 bar',
      'Dépression -0.5 bar d\'abord, puis surpression',
      'Indifféremment, l\'ordre n\'a pas d\'importance',
      'Uniquement le test de surpression, la dépression est facultative',
    ],
    correct: 1,
    explanation:
      'On commence TOUJOURS par la dépression : si la boîte fuit, le vide écarte légèrement le joint sans danger pour le calibre et l\'appareil alerte sans introduire d\'humidité dans la montre.',
  },
  {
    id: 11,
    stepRef: 7,
    question: 'À quoi sert le test de condensation (plaque 40°C + goutte à 18°C) ?',
    options: [
      'À mesurer la dureté du traitement anti-reflet de la glace',
      'À tester la résistance mécanique de la glace aux chocs thermiques',
      "À détecter l'air humide emprisonné lors de l'emboîtage (buée au moindre froid)",
      'À valider la colle du joint de glace',
    ],
    correct: 2,
    explanation:
      "Une montre peut passer le test de pression d'air tout en contenant de l'air humide emprisonné à l'emboîtage. Le choc thermique révèle toute buée sur la face interne : aucune trace admissible sous 60 secondes.",
  },
  {
    id: 12,
    stepRef: 5,
    question: "Comment prenez-vous une micro-vis de bride sans risquer de la perdre dans le mouvement ?",
    options: [
      'Avec des brucelles à pointe courbe, doigt ferme',
      'Avec un aspirateur de paillasse réglé au minimum',
      "Une tête d'épingle de Rodico frais sur la panne du tournevis",
      'En mouillant la vis d\'huile 9010 pour qu\'elle adhère',
    ],
    correct: 2,
    explanation:
      "L'astuce du maître : une tête d'épingle de Rodico frais sur la panne. La vis y adhère parfaitement et se guide dans le trou taraudé sans risque de chute dans le balancier-spiral.",
  },
];

// =========================================================================
// 4. FLASHCARDS DE NORMES (FICHES MÉMO)
// =========================================================================

export interface Flashcard {
  id: number;
  tag: string;
  front: string;
  back: string;
}

export const FLASHCARDS: Flashcard[] = [
  { id: 1, tag: 'Gardes NIHS', front: 'G1 — Cadran ↔ Aiguille des heures', back: '≥ 0.20 mm au-dessus des index appliqués (garde index).' },
  { id: 2, tag: 'Gardes NIHS', front: 'G2 — Heures ↔ Minutes', back: '≥ 0.15 mm — parallélisme contrôlé sur 12 h à la loupe 10x.' },
  { id: 3, tag: 'Gardes NIHS', front: 'G3 — Minutes ↔ Trotteuse', back: '≥ 0.15 mm — liberté de rotation sur le canon des minutes.' },
  { id: 4, tag: 'Gardes NIHS', front: 'G4 — Trotteuse ↔ Glace saphir', back: '≥ 0.25 à 0.30 mm — garde glace, contrôlée au profile-projecteur.' },
  { id: 5, tag: 'Couples', front: 'Vis de pied de cadran', back: '1.2 cNm maximum — serrage alternatif après centrage du guichet.' },
  { id: 6, tag: 'Couples', front: 'Vis de bride d\'emboîtage', back: '1.8 à 2.2 cNm — serrage EN CROIX, jamais en séquence circulaire.' },
  { id: 7, tag: 'Aiguillage', front: 'Saut de date conforme', back: 'Saut franc entre 23h55 et 00h05 — réglage par position mise à l\'heure.' },
  { id: 8, tag: 'Joints', front: 'Joint de glace Hytrel', back: 'Montage STRICTEMENT À SEC — étanchéité par écrasement géométrique.' },
  { id: 9, tag: 'Joints', front: 'Joints toriques fond & couronne', back: 'Graisés au Fomblin UT18 — anti-pincement lors du vissage.' },
  { id: 10, tag: 'Chimie', front: 'Loctite 222', back: 'Violette DÉMONTABLE, uniquement tige ↔ couronne. Jamais 243 ni 270.' },
  { id: 11, tag: 'Protocoles', front: 'Lumière rasante', back: '45° sur fond sombre — chaque micro-fibre projette une ombre nette.' },
  { id: 12, tag: 'Protocoles', front: 'Cycle Proofmaster', back: 'Dépression -0.5 bar AVANT surpression +5 bar, puis condensation 40°C / goutte 18°C.' },
  { id: 13, tag: 'Aiguillage', front: 'Contrôle des aiguilles', back: 'Loupe 10x sur 12 heures complètes — zéro frottement toléré (NIHS 91-10).' },
  { id: 14, tag: 'Tige', front: 'Chanfrein du filet', back: "Pierre d'Arkansas à 45° après coupe — sinon le filet refoule le taraudage." },
];

// =========================================================================
// 5. PRODUITS & OUTILS D'ÉTABLI (LEXIQUE)
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
    detail: 'Exclusivement pour la tige dans la couronne. Démontage facile à froid sans chalumeau.',
    tone: 'violet',
  },
  {
    code: 'FOMBLIN UT18',
    name: 'Graisse Perfluorée',
    role: 'Joints toriques',
    detail: 'Joints toriques de fond vissé et de tube de couronne. Inerte chimiquement, ne sèche jamais.',
    tone: 'emerald',
  },
  {
    code: 'MOEBIUS 9504',
    name: 'Graisse Contact Métal',
    role: 'Tirette & tige',
    detail: 'Gorge de tirette, encoches de tige et dents de pignon coulant lors du remontage final.',
    tone: 'amber',
  },
  {
    code: 'BERGEON 6938',
    name: 'Protecteur de Cadran',
    role: 'Chassage des aiguilles',
    detail: 'Feuille Mylar ultra-fine intercalée sous les aiguilles pour éliminer tout risque de rayure.',
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
  dial_feet: { w: 500, h: 240 },
  hands_clearance: { w: 500, h: 280 },
  dial_protection: { w: 500, h: 280 },
  grazing_beam: { w: 400, h: 200 },
  gaskets_casing: { w: 500, h: 240 },
  case_assembly: { w: 500, h: 280 },
  stem_cutting: { w: 500, h: 280 },
  waterproof_testing: { w: 500, h: 280 },
};

export const SCHEMA_HOTSPOTS: Record<SchemaType, Hotspot[]> = {
  dial_feet: [
    { x: 116, y: 85, title: 'Pieds en cuivre', text: "Deux pieds cylindriques brasés au dos du cadran. Leur rectitude est contrôlée à la loupe 4x : un pied faussé crée une tension asymétrique (voilage, frottement du disque dateur)." },
    { x: 137, y: 108, title: 'Vis oblique 45°', text: 'Serrage alternatif des deux pieds, couple 1.2 cNm maximum. Au-delà : cisaillement du pied ou saut d\'émail.' },
    { x: 370, y: 110, title: 'Verrou excentrique', text: 'Alternative professionnelle : le verrou pince le pied sans entaille par une simple rotation d\'un quart de tour.' },
    { x: 250, y: 219, title: 'Règle maîtresse', text: 'Ne JAMAIS serrer le premier pied à fond sans avoir engagé le second — c\'est la cause n°1 du voilage cadran.' },
  ],
  hands_clearance: [
    { x: 185, y: 159, title: 'Aiguille des Heures', text: 'Posée en premier, montée à force calibrée sur le canon des heures. Son plan doit rester parallèle au cadran sur 12 h complets.' },
    { x: 230, y: 118, title: 'Aiguille des Minutes', text: 'Plan intermédiaire. La garde G2 avec les heures doit rester ≥ 0.15 mm même en superposition à 12h00.' },
    { x: 255, y: 80, title: 'Trotteuse', text: 'Plan supérieur. Sa liberté sur le canon (G3 ≥ 0.15 mm) garantit un démarrage franc au premier appoint.' },
    { x: 140, y: 138, title: 'G2 ≥ 0.15 mm', text: 'Parallélisme heures/minutes : tolérance NIHS 91-10, contrôlée à la loupe 10x à 12h00, 3h00, 6h00 et 9h00.' },
    { x: 220, y: 187, title: 'G1 ≥ 0.20 mm', text: 'Garde index : distance minimale entre le plan des heures et les index appliqués (hauteur typique 0.50 mm).' },
    { x: 140, y: 95, title: 'G3 ≥ 0.15 mm', text: 'Liberté du canon : si G3 est négatif, la trotteuse « plonge » sur les minutes et freine l\'échappement.' },
    { x: 300, y: 62, title: 'G4 ≥ 0.30 mm', text: 'Garde glace : entre la trotteuse et la face interne du saphir. Trop faible, toute flexion de la glace provoque un arrêt.' },
    { x: 375, y: 202, title: 'Index appliqué', text: 'Hauteur 0.50 mm typique : c\'est lui qui fixe la cote G1. Un index tordu devient un point dur éliminatoire.' },
  ],
  dial_protection: [
    { x: 150, y: 130, title: 'Film Mylar', text: 'Le film protège-cadran s\'interpose systématiquement entre aiguilles et cadran durant le chassage. Il se lève par un coin, jamais par le centre.' },
    { x: 110, y: 95, title: 'Cadran émaillé', text: 'Surface irréversible : une micro-rayure sur une laque ou un émail ne se rattrape pas. Le cadran se manipule aux doigts gantés, bord périphérique uniquement.' },
    { x: 370, y: 62, title: 'Pince Presto N°1', text: 'Dépose des aiguilles sans contact avec le cadran : les mors pressent le moyeu, jamais la fente ni laface supérieure.' },
    { x: 370, y: 97, title: 'Posoir Delrin', text: 'Chassage perpendiculaire avec embout Téflon/Delrin : aucun marquage de la laque, répartition uniforme de la force.' },
    { x: 370, y: 150, title: 'Rodico & Sureau', text: 'Élimination des micro-fibres par tamponnement doux, vérifié à la loupe 10x. Le sureau « avale » la poussière sans la déplacer.' },
    { x: 250, y: 257, title: 'Interdiction absolue', text: 'JAMAIS de brucelles métalliques en contact du cadran : toujours interposer le film protecteur.' },
  ],
  grazing_beam: [
    { x: 70, y: 50, title: 'Lampe à 45°', text: "Lampe d'établi articulée inclinée à 45° : le faisceau rasant transforme chaque relief en relief d'ombre visible." },
    { x: 240, y: 133, title: 'Micro-fibre révélée', text: 'En zénithal, invisible ; en rasant, la fibre diffuse la lumière et projette une ombre portée nette : elle devient une étoile dans la nuit.' },
    { x: 302, y: 148, title: 'Ombre portée', text: 'La longueur de l\'ombre indique la hauteur de la particule : plus l\'ombre est longue, plus le corps s\'élève au-dessus du vernis.' },
    { x: 240, y: 40, title: 'Regard loupe 4x', text: 'L\'œil regarde à contre-faisceau, légèrement à l\'écart de l\'axe du spot, pour capter la lumière diffusée.' },
  ],
  gaskets_casing: [
    { x: 170, y: 70, title: 'Glace saphir', text: 'Durcie 2000 Vickers, elle repose sur le joint de glace via la lunette. Contrôler la face interne en lumière rasante AVANT l\'insertion du mouvement.' },
    { x: 130, y: 60, title: 'Joint de glace Hytrel (L-Ring)', text: 'Profil en L qui s\'écrase à l\'emmanchement. Montage STRICTEMENT À SEC : la graisse détruirait la friction et la glace sauterait sous pression.' },
    { x: 120, y: 170, title: 'Montage à sec', text: 'L\'Hytrel assure l\'étanchéité par écrasement contrôlé. Aucune graisse silicone, aucune huile.' },
    { x: 400, y: 105, title: 'O-Ring + Fomblin', text: 'Les joints toriques de fond et de couronne, eux, se lubrifient au Fomblin UT18 : le film gras empêche le pincement au vissage.' },
    { x: 355, y: 170, title: 'Lubrification obligatoire', text: 'Fomblin UT18 ou Moebius 8513 en boîte silicone — une noisette suffit, l\'excès migre sur le mouvement.' },
  ],
  case_assembly: [
    { x: 250, y: 56, title: 'Glace & joint Hytrel', text: 'Ensemble posé via potence à chasser les verres. Vérifier l\'absence de trace sur la face interne avant fermeture.' },
    { x: 102, y: 96, title: 'Bride & vis', text: 'Les brides de boîte (casing clamps) verrouillent le mouvement dans la gorge de carrure. Serrage en croix, 1.8 à 2.2 cNm.' },
    { x: 250, y: 142, title: 'Mouvement habillé', text: 'Calibre + cadran + aiguilles déposés sur un porte-pièce DELRIN ÉVIDÉ : jamais d\'appui sur le balancier ni sur les aiguilles.' },
    { x: 350, y: 125, title: 'Tube de boîte', text: 'Le tube guide la tige de remontoir. Un calibre en biais (bride trop serrée) fait frotter la tige dans le tube et fausse le remontage.' },
    { x: 455, y: 140, title: 'Couronne & joint torique', text: 'La couronne plaque contre le tube avec un jeu ≤ 0.05 mm ; le joint torique graissé assure l\'étanchéité dynamique du remontoir.' },
    { x: 250, y: 233, title: 'Fond vissé & joint', text: 'Fond vissé sur joint torique Fomblin : dernier rempart contre l\'eau. Couple de vissage franc, sans forcer.' },
  ],
  stem_cutting: [
    { x: 77, y: 90, title: 'Carré', text: 'Extrémité d\'entraînement du rochet. Aucune coupe dans cette zone : le carré définit la position de remontage.' },
    { x: 125, y: 90, title: 'Gorge', text: 'Repli du pignon coulant : elle accueille le levier de tirette. La graisse Moebius 9504 s\'applique ici au remontage.' },
    { x: 245, y: 90, title: 'Filetage S0.90 / S1.20', text: 'Filetage mâle de fixation de la couronne. L\'amorce doit être chanfreinée à 45° sur pierre d\'Arkansas après coupe.' },
    { x: 260, y: 42, title: 'Point de coupe L', text: "Règle d'or : couper TOUJOURS 0.20 mm de moins que la cote mesurée, puis ajuster à la lime. Une tige courte est perdue !" },
    { x: 302, y: 100, title: 'Chute à couper', text: 'Coupe franche à la pince carbure ou au bocfil 3/0 — jamais à la meule (échauffement, recuit du filet).' },
    { x: 365, y: 90, title: 'Taraudage couronne (A)', text: 'Profondeur utile du taraudage de la couronne : le filet doit s\'engager complet sans buter au fond.' },
    { x: 365, y: 185, title: 'Loctite 222', text: 'Une micro-touche de Loctite 222 violette (démontable) sur l\'amorce de filet. JAMAIS de 243 ni de 270.' },
  ],
  waterproof_testing: [
    { x: 140, y: 140, title: 'Cloche à air', text: 'Enceinte étanche : la déformation élastique de la carrure sous pression est mesurée sans immersion.' },
    { x: 140, y: 118, title: 'Palpeur LVDT', text: 'Capteur de déplacement à 0.1 µm : il trace la courbe de déformation en temps réel.' },
    { x: 360, y: 75, title: 'Courbe conforme', text: 'Stabilisation rapide puis plateau : moins de 0.1 µm/min de dérive = montre étanche.' },
    { x: 360, y: 112, title: 'Fuite détectée', text: 'Déformation qui s\'effondre : l\'air s\'échappe par un joint pincé, sec ou coupé.' },
    { x: 370, y: 160, title: 'ISO 22810', text: 'Conformité 10 BAR / 100 m validée après cycle -0.5 bar puis +5 bar.' },
    { x: 250, y: 257, title: 'Test de condensation', text: 'Plaque à 40°C, goutte d\'eau à 18°C sur la glace : aucune buée interne admissible sous 60 secondes.' },
  ],
};

// =========================================================================
// 7. UTILITAIRES — NOTE SUISSE
// =========================================================================

export function swissNote(score: number, max: number): number {
  if (max <= 0) return 1;
  return Math.round((1 + (score / max) * 5) * 10) / 10;
}

export function swissMention(note: number): { label: string; tone: 'emerald' | 'sky' | 'amber' | 'red' } {
  if (note >= 5.5) return { label: 'Très Bien — Excellence', tone: 'emerald' };
  if (note >= 4.5) return { label: 'Bien — Compétence validée', tone: 'sky' };
  if (note >= 4.0) return { label: 'Suffisant — Seuil de réussite', tone: 'amber' };
  return { label: 'Insuffisant — Reprendre l\'atelier', tone: 'red' };
}
