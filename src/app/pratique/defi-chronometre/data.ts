export interface ChallengeQuestion {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-based
  explanation: string;
}

export const QUESTION_BANK_100: ChallengeQuestion[] = [
  // --- 1. TRIBOLOGIE & LUBRIFICATION OFFICIELLE MOEBIUS (1-20) ---
  {
    id: 1,
    category: "Tribologie & Huilage",
    question: "Quelle huile certifiée Moebius s'applique EXCLUSIVEMENT sur les palettes de l'ancre suisse ?",
    options: ["Moebius 9010", "Moebius 9415 (ou 941)", "Moebius HP-1300", "Moebius 8217"],
    correctAnswer: 1,
    explanation: "La Moebius 9415 est une graisse thixotrope conçue pour se fluidifier sous le choc d'impulsion et se figer au repos sans gicler sur le dard."
  },
  {
    id: 2,
    category: "Tribologie & Huilage",
    question: "Quelle est la règle absolue concernant la lubrification des pivots de la tige d'ancre suisse ?",
    options: ["1 micro-goutte de 9010 sur chaque pivot", "Une gouttelette de HP-500", "Ils doivent impérativement rester STRICTEMENT SECS", "Graisse 9504 sous pression"],
    correctAnswer: 2,
    explanation: "Les pivots d'ancre ne doivent JAMAIS être huilés : la moindre trace d'huile freine la fourchette et effondre l'amplitude du balancier."
  },
  {
    id: 3,
    category: "Tribologie & Huilage",
    question: "Quelle graisse graphitée est indispensable sur la paroi interne du barillet automatique ?",
    options: ["Moebius 8217", "Moebius 9010", "Huile de vaseline", "Moebius 9415"],
    correctAnswer: 0,
    explanation: "La Moebius 8217 apporte la friction visqueuse contrôlée pour permettre le glissement de la bride sans à-coups à plein armage."
  },
  {
    id: 4,
    category: "Tribologie & Huilage",
    question: "Quelle proportion de surface la goutte de 9010 doit-elle occuper sur le contre-pivot de balancier ?",
    options: ["100% de la surface", "1/3 à 1/2 du diamètre de la pierre", "Moins de 10%", "Aucune, on huile la chatonnière"],
    correctAnswer: 1,
    explanation: "Une goutte couvrant 1/3 à 1/2 de la pierre assure une réserve de 3 à 5 ans sans risque de débordement par capillarité."
  },
  {
    id: 5,
    category: "Tribologie & Huilage",
    question: "Quel lubrifiant spécifique par immersion est préconisé pour les roues inverseuses ETA 2824-2 ?",
    options: ["Huile pour chaîne", "Moebius Lubeta V105", "Pâte diamantée 1µm", "Graisse silicone"],
    correctAnswer: 1,
    explanation: "Le Lubeta V105 dépose un micro-film lubrifiant ultra-fin par évaporation sur les cliquets internes des inverseurs sans les coller."
  },
  {
    id: 6,
    category: "Tribologie & Huilage",
    question: "Quelle huile haute pression Moebius est la référence moderne pour le rouage de finissage lent (centre, moyenne) ?",
    options: ["Moebius HP-1300 (Microgliss D5)", "Moebius 9010", "Huile d'olive pure", "Moebius 9415"],
    correctAnswer: 0,
    explanation: "La Moebius HP-1300 résiste aux pressions de contact élevées des mobiles lents transmettant le couple moteur du barillet."
  },
  {
    id: 7,
    category: "Tribologie & Huilage",
    question: "Où s'applique la graisse plastique Moebius 9504 à l'établi ?",
    options: ["Sur le spiral", "Sur les contacts acier/acier du remontoir et de la minuterie (tirette, bascule)", "Sur le balancier", "Sur les dents de la roue d'échappement"],
    correctAnswer: 1,
    explanation: "La 9504 est une graisse synthétique bleue idéale pour les fortes pressions de glissement du mécanisme de mise à l'heure."
  },
  {
    id: 8,
    category: "Tribologie & Huilage",
    question: "Quel produit chimique applique-t-on pour empêcher l'huile de s'étaler hors des rubis (épimélangage) ?",
    options: ["Acétone", "Fixodrop (Moebius 8941)", "Alcool à 90°", "White Spirit"],
    correctAnswer: 1,
    explanation: "Le Fixodrop forme une couche fluorée nanométrique abaissant l'énergie de surface, empêchant l'huile de franchir la frontière."
  },
  {
    id: 9,
    category: "Tribologie & Huilage",
    question: "Sur un barillet de montre manuelle (ex: ETA 6497-1), quelle graisse met-on sur la lame du ressort moteur ?",
    options: ["Moebius 8200 ou 8300", "Moebius 9010 fluide", "Graisse alimentaire", "Aucune, il tourne à sec"],
    correctAnswer: 0,
    explanation: "La Moebius 8200/8300 permet aux spires du ressort de glisser entre elles lors de l'armage et du désarmage sans blocage."
  },
  {
    id: 10,
    category: "Tribologie & Huilage",
    question: "Quelle huile s'utilise sur le pivot de roue d'échappement tournant à grande vitesse ?",
    options: ["Moebius 9010", "Graisse 8217", "Moebius HP-1300", "Huile de ricin"],
    correctAnswer: 0,
    explanation: "La 9010 est une huile fluide synthétique à faible frottement, idéale pour les pivots tournant rapidement avec un couple très faible."
  },
  {
    id: 11,
    category: "Tribologie & Huilage",
    question: "Quelle est la règle de lubrification des dents de la roue de seconde au centre ?",
    options: ["Huilage abondant à la 9010", "Elles travaillent STRICTEMENT SÈCHES", "Graisse HP-1300", "Bain d'huile"],
    correctAnswer: 1,
    explanation: "Les dentures du rouage ne sont JAMAIS huilées (sauf la roue d'échappement via les levées). L'huile sur les dents capterait les poussières."
  },
  {
    id: 12,
    category: "Tribologie & Huilage",
    question: "Comment nettoie-t-on les pierres de contre-pivot antichoc avant huilage ?",
    options: ["Au chiffon en laine", "À l'essence C / One-Dip puis séchage sur papier Bergeon ou moelle de sureau", "À l'eau savonneuse", "Au chalumeau"],
    correctAnswer: 1,
    explanation: "L'essence C dégraisse sans résidu, et la moelle de sureau élimine toute particule ou trace grasse microscopique."
  },
  {
    id: 13,
    category: "Tribologie & Huilage",
    question: "Quel instrument utilise l'horloger pour doser une goutte de 9010 sur un contre-pivot ?",
    options: ["Une seringue médicale", "Un pique-huile automatique ou une micro-pique fine Bergeon", "Un tournevis n°100", "Un cure-dent"],
    correctAnswer: 1,
    explanation: "Le pique-huile transfère la goutte par tension superficielle sans rayer le rubis poli miroir."
  },
  {
    id: 14,
    category: "Tribologie & Huilage",
    question: "Que se passe-t-il si une goutte d'huile sur un contre-pivot touche le bord du chaton ?",
    options: ["L'amplitude augmente de 50°", "L'huile s'échappe instantanément par capillarité et la pierre devient sèche", "La montre s'arrête net", "Le ressort lyre casse"],
    correctAnswer: 1,
    explanation: "L'effet de capillarité attire tout le fluide vers l'interstice métallique, laissant le pivot tourner sur une pierre complètement sèche."
  },
  {
    id: 15,
    category: "Tribologie & Huilage",
    question: "Quelle graisse s'applique sur la surface de contact de la tirette et du sautoir de tirette ?",
    options: ["Moebius 9504 ou 9501", "Moebius 9010", "Huile de paraffine", "Huile d'amande douce"],
    correctAnswer: 0,
    explanation: "La 9504 amortit le saut sec de la tirette et supprime l'usure acier contre acier lors des tirages de couronne."
  },
  {
    id: 16,
    category: "Tribologie & Huilage",
    question: "Les roues de minuterie et roue d'heures doivent-elles être huilées sur leur canon ?",
    options: ["Non, jamais", "Oui, une légère trace de HP-1300 ou 9010 sur la portée du canon", "Baignées dans la graisse", "Arrosées de WD-40"],
    correctAnswer: 1,
    explanation: "Une trace de HP-1300 sur la portée de la chaussée et du canon évite le grippage lors de la rotation continue des aiguilles."
  },
  {
    id: 17,
    category: "Tribologie & Huilage",
    question: "Quel composant d'échappement ne doit sous aucun prétexte recevoir la moindre trace d'huile ?",
    options: ["Le dard de l'ancre et la cheville de plateau", "Les levées d'ancre", "Le rochet", "Le tambour de barillet"],
    correctAnswer: 0,
    explanation: "L'huile sur le dard ou l'encoche de fourchette provoquerait un collage fluide, détruisant instantanément l'impulsion du balancier."
  },
  {
    id: 18,
    category: "Tribologie & Huilage",
    question: "Quelle huile s'utilise pour les pivots de roue des secondes et roue moyenne sur ETA 6497-1 ?",
    options: ["Moebius HP-1300 ou 9010 selon le couple", "Moebius 8217", "Huile de vaseline", "Graisse silicone"],
    correctAnswer: 0,
    explanation: "HP-1300 pour la roue de grande moyenne et 9010 pour la roue de seconde et d'échappement conformément aux fiches ETA."
  },
  {
    id: 19,
    category: "Tribologie & Huilage",
    question: "Quelle est la viscosité cinématique approximative de l'huile Moebius 9010 à 20°C ?",
    options: ["150 mm²/s (cSt)", "1500 mm²/s", "15 mm²/s", "12 000 mm²/s"],
    correctAnswer: 0,
    explanation: "À 150 cSt, la 9010 offre une excellente fluidité sans évaporation prématurée sur les paliers rapides."
  },
  {
    id: 20,
    category: "Tribologie & Huilage",
    question: "Quel lubrifiant applique-t-on sur la denture de la roue de remontoir (crown wheel) et du rochet ?",
    options: ["Moebius HP-1300 ou graisse Moebius 9504 avec grande parcimonie", "Moebius 9010 fluide", "Huile de tournesol", "Aucune, à sec"],
    correctAnswer: 0,
    explanation: "Une infime touche de graisse 9504 ou HP-1300 sur la denture d'angle assure un remontage manuel doux sans projection."
  },

  // --- 2. ÉCHAPPEMENT À ANCRE SUISSE & GÉOMÉTRIE (21-40) ---
  {
    id: 21,
    category: "Échappement Suisse",
    question: "Combien de dents possède la roue d'échappement standard d'une montre suisse moderne ?",
    options: ["15 dents", "12 dents", "20 dents", "18 dents"],
    correctAnswer: 0,
    explanation: "La roue d'échappement suisse classique compte 15 dents pointues avec plans d'impulsion inclinés à angle précis."
  },
  {
    id: 22,
    category: "Échappement Suisse",
    question: "Quel angle de levée le balancier possède-t-il typiquement sur un calibre ETA 2824-2 ?",
    options: ["50°", "44°", "52°", "56°"],
    correctAnswer: 0,
    explanation: "L'angle de levée du 2824-2 est de 50°, indispensable à paramétrer sur le Witschi pour calculer l'amplitude exacte."
  },
  {
    id: 23,
    category: "Échappement Suisse",
    question: "Quel angle de levée officiel paramètre-t-on sur le chrono-comparateur pour un calibre ETA 6497-1 ?",
    options: ["44°", "50°", "52°", "38°"],
    correctAnswer: 0,
    explanation: "Le calibre de poche ETA 6497-1 (Unitas) utilise un angle de levée standard de 44°."
  },
  {
    id: 24,
    category: "Échappement Suisse",
    question: "Comment s'appellent les deux rubis fixés sur la fourchette de l'ancre ?",
    options: ["Palette d'entrée et palette de sortie", "Rubis de choc et rubis de frein", "Levée droite et levée gauche", "Contre-pivots"],
    correctAnswer: 0,
    explanation: "La palette d'entrée reçoit la dent en premier, suivie de la palette de sortie lors du basculement alterné."
  },
  {
    id: 25,
    category: "Échappement Suisse",
    question: "Quel composant empêche le renversement accidentel de l'ancre en cas de choc extérieur ?",
    options: ["Le dard qui coopère avec le petit plateau et son encoche", "Le ressort de cliquet", "La raquette", "Le rochet"],
    correctAnswer: 0,
    explanation: "Le dard passe à quelques centièmes de mm du petit plateau et ne peut pénétrer que dans l'encoche au moment du passage de la cheville."
  },
  {
    id: 26,
    category: "Échappement Suisse",
    question: "Qu'appelle-t-on le 'Tirage' dans l'échappement à ancre suisse ?",
    options: [
      "L'inclinaison des plans de repos qui force l'ancre à se plaquer contre sa goupille de limitation sous la poussée de la dent",
      "La force pour remonter le ressort",
      "L'extraction de la tige de remontoir",
      "Le décalage des aiguilles"
    ],
    correctAnswer: 0,
    explanation: "L'angle de tirage (environ 12° à 15°) garantit la sécurité de l'échappement en empêchant le dard de frotter contre le plateau."
  },
  {
    id: 27,
    category: "Échappement Suisse",
    question: "Où se transmet l'impulsion motrice entre l'ancre et le balancier ?",
    options: ["Entre les cornes de la fourchette et la cheville de plateau (rubis demi-lune)", "Par contact magnétique", "Sur le spiral", "Par la virole"],
    correctAnswer: 0,
    explanation: "Les cornes de la fourchette poussent la cheville de plateau en rubis, donnant l'impulsion qui entretient les oscillations du balancier."
  },
  {
    id: 28,
    category: "Échappement Suisse",
    question: "Quelle colle traditionnelle naturelle utilise l'artisan horloger pour fixer les palettes de l'ancre ?",
    options: ["La gomme laque (shellac)", "La colle blanche cyanoacrylate", "L'époxy industrielle", "La colle à bois"],
    correctAnswer: 0,
    explanation: "La gomme laque fond doucement sur la chaufferette à 80-90°C et permet un ajustement micrométrique parfait des levées."
  },
  {
    id: 29,
    category: "Échappement Suisse",
    question: "Qu'est-ce que le chemin perdu dans le fonctionnement de l'échappement ?",
    options: [
      "L'angle parcouru par l'ancre entre le moment où la dent quitte le plan de repos et la butée sur la touche de limitation",
      "Une roue qui patine",
      "Le jeu entre la couronne et le boîtier",
      "Le temps de réserve de marche perdu"
    ],
    correctAnswer: 0,
    explanation: "Le chemin perdu est une marge de sécurité nécessaire (environ 1° à 1.5°) assurant le dégagement franc de la dent."
  },
  {
    id: 30,
    category: "Échappement Suisse",
    question: "Si l'angle de levée paramétré sur le Witschi est faux, quelle valeur affichée devient erronée ?",
    options: ["L'amplitude du balancier", "La marche journalière (s/j)", "La fréquence (Hz)", "Le repère (ms)"],
    correctAnswer: 0,
    explanation: "Le calcul de l'amplitude découle directement de la durée du signal acoustique divisée par l'angle de levée configuré."
  },
  {
    id: 31,
    category: "Échappement Suisse",
    question: "Quelle est la fonction des goupilles ou des parois de limitation (touches de limitation) ?",
    options: ["Limiter la course angulaire totale de l'ancre", "Retenir le balancier", "Freiner le rouage", "Empêcher le spiral de s'étendre"],
    correctAnswer: 0,
    explanation: "Elles arrêtent la course de l'ancre à un angle précis (généralement 10° à 11° total) pour préserver la géométrie d'engrènement."
  },
  {
    id: 32,
    category: "Échappement Suisse",
    question: "Sur un calibre à 28'800 A/h, combien d'alternances par seconde le balancier effectue-t-il ?",
    options: ["8 alternances / seconde (4 Hz)", "5 alternances (2.5 Hz)", "10 alternances (5 Hz)", "6 alternances (3 Hz)"],
    correctAnswer: 0,
    explanation: "28'800 alternances / 3600 secondes = 8 A/s, soit une fréquence propre de 4 Hz (4 oscillations complètes par seconde)."
  },
  {
    id: 33,
    category: "Échappement Suisse",
    question: "Sur un calibre à 18'000 A/h (ETA 6497-1), quelle est la fréquence en Hertz ?",
    options: ["2.5 Hz (5 A/s)", "3.0 Hz", "4.0 Hz", "1.0 Hz"],
    correctAnswer: 0,
    explanation: "18'000 / 3600 = 5 alternances par seconde, soit 2.5 Hz (le battement noble et lent des calibres de poche)."
  },
  {
    id: 34,
    category: "Échappement Suisse",
    question: "Qu'est-ce que le rebat dans une montre mécanique ?",
    options: [
      "Le balancier prend trop d'amplitude (> 330°-340°) et la cheville de plateau vient frapper l'extérieur de la fourchette d'ancre",
      "Le spiral qui se détache",
      "Le cliquet qui saute deux crans",
      "L'aiguille qui frotte sur le verre"
    ],
    correctAnswer: 0,
    explanation: "Le rebat provoque une avance spectaculaire de plusieurs minutes par heure et un cliquetis métallique caractéristique au chronocomparateur."
  },
  {
    id: 35,
    category: "Échappement Suisse",
    question: "Quelle matière est universellement utilisée pour les palettes d'ancre et la cheville de plateau ?",
    options: ["Corindon synthétique (Rubis rouge Al₂O₃)", "Acier cémenté", "Carbure de tungstène", "Titane"],
    correctAnswer: 0,
    explanation: "Le rubis synthétique offre une dureté Vickers de 2000 HV, un coefficient de frottement minimal et une inaltérabilité totale."
  },
  {
    id: 36,
    category: "Échappement Suisse",
    question: "Pourquoi les dents de la roue d'échappement suisse ont-elles un profil en talon avec plan d'impulsion ?",
    options: [
      "Pour partager l'angle d'impulsion entre la dent et la palette (impulsion divisée)",
      "Pour être plus faciles à découper",
      "Pour stocker l'huile",
      "Pour faire plus de bruit"
    ],
    correctAnswer: 0,
    explanation: "Contrairement à l'échappement anglais où seule la palette a un plan d'impulsion, l'échappement suisse partage le travail pour réduire les frottements."
  },
  {
    id: 37,
    category: "Échappement Suisse",
    question: "Comment vérifie-t-on le jeu du dard sous loupe 10x à l'établi ?",
    options: [
      "En poussant l'ancre vers le plateau et en vérifiant qu'il existe un ébat libre sans coincement dans toutes les positions",
      "En tirant fort sur la tige",
      "En secouant la montre",
      "Au pied à coulisse"
    ],
    correctAnswer: 0,
    explanation: "Le jeu du dard doit être d'environ 0.02 mm : s'il est nul, le dard frotte ; s'il est trop grand, la cheville peut manquer l'encoche."
  },
  {
    id: 38,
    category: "Échappement Suisse",
    question: "Qu'appelle-t-on la chute dans l'échappement à ancre ?",
    options: [
      "Le déplacement angulaire libre de la roue d'échappement entre le dégagement d'une dent et l'arrêt de la suivante sur le plan de repos",
      "Une pièce qui tombe par terre",
      "La baisse de réserve de marche",
      "La perte d'amplitude"
    ],
    correctAnswer: 0,
    explanation: "La chute représente l'énergie perdue dans l'échappement : elle doit être minimale (1.5° à 2°) mais suffisante pour éviter les accrochages."
  },
  {
    id: 39,
    category: "Échappement Suisse",
    question: "Quel angle d'oscillation total de l'ancre est considéré comme le standard optimal suisse ?",
    options: ["Environ 10° à 11°", "45°", "90°", "3°"],
    correctAnswer: 0,
    explanation: "Un angle d'ancre de 10°30' offre le parfait compromis entre sécurité de repos, tirage et liberté de passage de la cheville."
  },
  {
    id: 40,
    category: "Échappement Suisse",
    question: "Sur un échappement suisse, de combien de dents la roue d'échappement avance-t-elle à chaque demi-oscillation ?",
    options: ["1/2 dent", "1 dent entière", "2 dents", "1/4 de dent"],
    correctAnswer: 0,
    explanation: "À chaque alternance, la roue avance d'une demi-dent. Elle fait donc un tour complet en 30 alternances (15 dents × 2)."
  },

  // --- 3. BALANCIER-SPIRAL, ISOCHRONISME & RÉGLAGE (41-60) ---
  {
    id: 41,
    category: "Balancier-Spiral",
    question: "Qu'est-ce que l'isochronisme d'un régleur en haute horlogerie ?",
    options: [
      "La propriété d'un oscillateur de conserver une durée d'oscillation rigoureusement identique quelle que soit l'amplitude (180° ou 300°)",
      "Le fait de sonner les heures",
      "La résistance aux chocs",
      "L'étanchéité sous l'eau"
    ],
    correctAnswer: 0,
    explanation: "Un balancier isochrone bat au même rythme quand la montre est remontée à fond ou presque déchargée."
  },
  {
    id: 42,
    category: "Balancier-Spiral",
    question: "En quoi consiste la courbe terminale Breguet ?",
    options: [
      "Une spire extérieure surélevée et repliée vers le centre pour assurer un développement concentrique parfait du spiral",
      "Un spiral taillé en carré",
      "Une couleur dorée",
      "Un spiral sans piton"
    ],
    correctAnswer: 0,
    explanation: "Découverte par A.-L. Breguet en 1795, cette courbe élimine le déplacement latéral du centre de gravité du spiral."
  },
  {
    id: 43,
    category: "Balancier-Spiral",
    question: "De quel alliage thermo-compensateur sont forgés la majorité des spiraux modernes de haute précision ?",
    options: ["Nivarox (ou Silicium / Parachrom)", "Fer pur", "Cuivre rouge", "Plomb durci"],
    correctAnswer: 0,
    explanation: "Le Nivarox possède un coefficient thermo-élastique quasi-nul, neutralisant l'effet des variations de température sur la marche."
  },
  {
    id: 44,
    category: "Balancier-Spiral",
    question: "Sur un balancier Glucydur non fendu, de quoi est composé l'alliage de la serge ?",
    options: ["Cuivre, Béryllium et Fer (CuBe)", "Aluminium léger", "Or pur 24 carats", "Argent massif"],
    correctAnswer: 0,
    explanation: "Le Glucydur est amagnétique, très dur, inoxydable et présente une excellente stabilité thermique."
  },
  {
    id: 45,
    category: "Balancier-Spiral",
    question: "Qu'appelle-t-on le défaut de repère (Beat Error) sur un chronocomparateur ?",
    options: [
      "Le décalage temporel entre le tic et le tac (cheville de plateau décentrée par rapport à la ligne de centres au repos)",
      "Une faute de frappe sur le boîtier",
      "Une aiguille tordue",
      "Une erreur d'affichage de la date"
    ],
    correctAnswer: 0,
    explanation: "Un Beat Error idéal doit être inférieur à 0.4 ms (idéalement 0.0 à 0.2 ms) pour un départ spontané de la montre au moindre armage."
  },
  {
    id: 46,
    category: "Balancier-Spiral",
    question: "Comment corrige-t-on le défaut de repère sur un calibre moderne équipé d'un porte-piton mobile ?",
    options: [
      "En faisant pivoter délicatement le porte-piton mobile avec un tournevis d'établi",
      "En déplaçant la raquette",
      "En huilant le spiral",
      "En resserrant la vis de pont"
    ],
    correctAnswer: 0,
    explanation: "Le porte-piton mobile modifie la position angulaire du point d'attache extérieur sans toucher à la longueur active réglée par la raquette."
  },
  {
    id: 47,
    category: "Balancier-Spiral",
    question: "À quoi sert la raquette munie de ses deux goupilles sur le coq ?",
    options: [
      "À modifier la longueur active du spiral pour ajuster l'avance ou le retard (la marche de la montre)",
      "À freiner le balancier",
      "À remonter la réserve de marche",
      "À tenir le cadran"
    ],
    correctAnswer: 0,
    explanation: "Raccourcir la longueur active fait battre le spiral plus vite (+ d'avance) ; la rallonger le fait battre plus lentement (+ de retard)."
  },
  {
    id: 48,
    category: "Balancier-Spiral",
    question: "Quel doit être le comportement du spiral entre les goupilles de raquette au repos ?",
    options: [
      "Il doit respirer exactement au milieu sans toucher ni l'une ni l'autre des goupilles au repos",
      "Il doit être pincé fort et serré",
      "Il doit frotter en permanence sur la goupille externe",
      "Il doit baigner dans la graisse"
    ],
    correctAnswer: 0,
    explanation: "Le jeu total entre les goupilles doit être infime (environ 0.01 mm) : le spiral ne doit toucher les goupilles que lors des oscillations."
  },
  {
    id: 49,
    category: "Balancier-Spiral",
    question: "Comment appelle-t-on l'opération consistant à équilibrer parfaitement la serge du balancier au compas aux huit-chiffres ?",
    options: ["L'équilibrage dynamique / statique (suppression du balourd)", "Le limage de coq", "Le virolage", "Le trempage"],
    correctAnswer: 0,
    explanation: "Supprimer le balourd garantit que la gravité terrestre n'accélère ni ne freine le balancier selon la position verticale de la montre."
  },
  {
    id: 50,
    category: "Balancier-Spiral",
    question: "Qu'est-ce que la virole sur un ensemble balancier-spiral ?",
    options: [
      "La petite bague fendue chassée sur l'axe de balancier sur laquelle est fixé le bout intérieur du spiral",
      "La rondelle sous le cadran",
      "La bague de fond de boîte",
      "Le rubis de centre"
    ],
    correctAnswer: 0,
    explanation: "La virole permet de solidariser le centre du spiral avec l'arbre du balancier et d'ajuster le repère d'origine."
  },
  {
    id: 51,
    category: "Balancier-Spiral",
    question: "Quel instrument utilise l'horloger pour démagnétiser un balancier-spiral collé par magnétisme ?",
    options: ["Un démagnétiseur d'établi à champ alternatif décroissant", "Un aimant néodyme puissant", "Une flamme de chalumeau", "Un bain à ultrasons"],
    correctAnswer: 0,
    explanation: "Le démagnétiseur émet un champ magnétique alternatif intense qui décroît progressivement jusqu'à réaligner les dipôles à zéro."
  },
  {
    id: 52,
    category: "Balancier-Spiral",
    question: "Quel symptôme caractéristique au Witschi révèle un spiral magnétisé dont les spires collent entre elles ?",
    options: [
      "Une avance foudroyante de +30 à +120 minutes par jour avec une amplitude effondrée",
      "Un retard de 5 secondes",
      "Une amplitude de 330°",
      "Le quantième qui change à midi"
    ],
    correctAnswer: 0,
    explanation: "Les spires collées raccourcissent drastiquement la longueur active du ressort, ce qui fait osciller le balancier à une vitesse folle."
  },
  {
    id: 53,
    category: "Balancier-Spiral",
    question: "Qu'est-ce que le système de raquetterie 'Etachron' d'ETA ?",
    options: [
      "Un système de réglage où les goupilles sont portées par un bloc rotatif orientable pour ajuster le jeu sans plier le métal",
      "Un mouvement électronique",
      "Un spiral en plastique",
      "Une couronne vissée"
    ],
    correctAnswer: 0,
    explanation: "L'Etachron permet de régler le parallélisme et l'écartement des goupilles de raquette d'un simple coup de clé spéciale."
  },
  {
    id: 54,
    category: "Balancier-Spiral",
    question: "Quelle amplitude de balancier est considérée comme optimale à plein armage en position horizontale (HH) ?",
    options: ["270° à 315°", "180° à 200°", "350° à 360°", "120° à 150°"],
    correctAnswer: 0,
    explanation: "Entre 270° et 315°, le balancier possède son maximum d'énergie régulatrice sans risquer d'entrer en rebat (> 330°)."
  },
  {
    id: 55,
    category: "Balancier-Spiral",
    question: "Après 24 heures de marche, quelle amplitude minimale le calibre doit-il conserver selon les normes suisses ?",
    options: ["Au minimum 200° à 220°", "Moins de 100°", "300° obligatoire", "50°"],
    correctAnswer: 0,
    explanation: "En dessous de 200°, les frottements perturbent la régularité et les écarts de position s'amplifient considérablement."
  },
  {
    id: 56,
    category: "Balancier-Spiral",
    question: "Combien de positions de contrôle chronométrique officiel la norme ISO 3159 (COSC) impose-t-elle ?",
    options: ["5 positions (HH, HB, VG, VB, VD)", "2 positions", "8 positions", "1 seule position"],
    correctAnswer: 0,
    explanation: "Horizontale Haut, Horizontale Bas, Verticale Gauche, Verticale Bas, Verticale Droite pendant 15 jours consécutifs."
  },
  {
    id: 57,
    category: "Balancier-Spiral",
    question: "Quelle est la tolérance de marche journalière moyenne exigée par le COSC pour un calibre mécanique standard (Ø > 20 mm) ?",
    options: ["-4 à +6 secondes par jour", "-15 à +30 s/j", "0.0 s/j exact", "-1 à +1 minute/j"],
    correctAnswer: 0,
    explanation: "La certification officielle de chronomètre suisse garantit une marche contenue entre -4 et +6 secondes sur 24 heures."
  },
  {
    id: 58,
    category: "Balancier-Spiral",
    question: "Qu'est-ce qu'un balancier 'à inertie variable' (sans raquette, type Gyromax ou Microstella) ?",
    options: [
      "Le réglage se fait par des masselottes ou vis réparties sur la serge sans toucher à la longueur du spiral",
      "Un balancier en caoutchouc",
      "Un balancier qui change de taille avec l'heure",
      "Un balancier sans axe"
    ],
    correctAnswer: 0,
    explanation: "En éliminant les goupilles de raquette, le spiral respire librement à 100%, procurant un isochronisme supérieur."
  },
  {
    id: 59,
    category: "Balancier-Spiral",
    question: "Comment vérifie-t-on la planéité d'un spiral sous binoculaire ?",
    options: [
      "En regardant de profil : toutes les spires doivent être strictement alignées sur une ligne horizontale parfaite",
      "En appuyant dessus au doigt",
      "En le mesurant avec une règle en bois",
      "En le faisant chauffer"
    ],
    correctAnswer: 0,
    explanation: "Un spiral voilé frotte sur la serge du balancier ou sous le pont de coq, causant des sauts de marche aléatoires."
  },
  {
    id: 60,
    category: "Balancier-Spiral",
    question: "Qu'est-ce que le piton mobile par rapport au piton fixe historique ?",
    options: [
      "Le piton mobile est monté sur une bague coaxiale au coq permettant d'ajuster le repère sans déviroler",
      "C'est un piton qui saute pendant le chrono",
      "Un piton en plastique",
      "Une vis de pont"
    ],
    correctAnswer: 0,
    explanation: "Le porte-piton mobile a révolutionné l'établi moderne en évitant les démontages risqués du balancier pour centrer la cheville."
  },

  // --- 4. BARILLET, RESSORT MOTEUR & RÉSERVE DE MARCHE (61-75) ---
  {
    id: 61,
    category: "Barillet & Force Motrice",
    question: "Quel rôle joue la bride glissante dans un barillet de montre automatique ?",
    options: [
      "Glisser sur la paroi du tambour une fois le ressort armé à fond pour éviter la rupture par surtension",
      "Bloquer le barillet",
      "Freiner l'aiguille des minutes",
      "Accélérer le rouage"
    ],
    correctAnswer: 0,
    explanation: "Sans bride glissante, les mouvements continus de la masse oscillante casseraient net le ressort de barillet."
  },
  {
    id: 62,
    category: "Barillet & Force Motrice",
    question: "Sur un barillet manuel (ex: ETA 6497), comment le ressort moteur est-il accroché à la paroi ?",
    options: [
      "Par un crochet d'attache rigide qui s'encastre dans une encoche fraisée de la paroi",
      "Par de la colle forte",
      "Par friction d'huile",
      "Par un aimant"
    ],
    correctAnswer: 0,
    explanation: "Le crochet rigide bloque l'extrémité du ressort : quand le remontage arrive en butée dure, l'utilisateur sent qu'il faut s'arrêter."
  },
  {
    id: 63,
    category: "Barillet & Force Motrice",
    question: "Comment s'appelle l'arbre central sur lequel le ressort moteur s'enroule à son centre ?",
    options: ["L'arbre de barillet", "La tige de remontoir", "Le pignon coulant", "L'axe de balancier"],
    correctAnswer: 0,
    explanation: "L'arbre de barillet comporte une bondonne fraisée avec un crochet recevant l'œil du ressort moteur."
  },
  {
    id: 64,
    category: "Barillet & Force Motrice",
    question: "Quel composant d'acier trempé empêche le ressort de se désarmer instantanément lorsqu'on lâche la couronne ?",
    options: ["Le cliquet et son ressort de cliquet", "La raquette", "Le doigt de quantième", "La virole"],
    correctAnswer: 0,
    explanation: "Le cliquet s'enclenche dans les dents de loup du rochet pour bloquer la rotation dans le sens inverse de l'armage."
  },
  {
    id: 65,
    category: "Barillet & Force Motrice",
    question: "Combien d'heures de réserve de marche offre typiquement un barillet de calibre ETA 6497-1 ?",
    options: ["Environ 46 à 50 heures", "12 heures", "8 jours", "24 heures exactes"],
    correctAnswer: 0,
    explanation: "Le grand barillet de 16½ lignes du 6497-1 emmagasine environ 46 à 50 heures de force motrice stable."
  },
  {
    id: 66,
    category: "Barillet & Force Motrice",
    question: "Quel outil horloger spécifique utilise-t-on pour réinsérer un ressort moteur neuf dans son tambour sans le déformer ?",
    options: ["Une estrapade à main ou mécanique", "Une pince universelle", "Un marteau d'horloger", "Une clé à molette"],
    correctAnswer: 0,
    explanation: "L'estrapade enroule le ressort dans un tambour intermédiaire avant de le chasser droit dans son barillet sans le tordre."
  },
  {
    id: 67,
    category: "Barillet & Force Motrice",
    question: "Pourquoi est-il proscrit de remonter un ressort moteur à la main avec les doigts sans estrapade ?",
    options: [
      "Cela déforme la courbe en S (forme de Nivaflex) et crée des frottements de spires asymétriques irréversibles",
      "On salit le sol",
      "Le barillet rétrécit",
      "L'or s'oxyde"
    ],
    correctAnswer: 0,
    explanation: "Le bobinage manuel gauchit le ruban élastique, ce qui provoque une perte massive de couple et de réserve de marche."
  },
  {
    id: 68,
    category: "Barillet & Force Motrice",
    question: "Combien de tours de développement le ressort moteur effectue-t-il environ dans un barillet moderne ?",
    options: ["6 à 7 tours utiles", "25 tours", "1 seul tour", "50 tours"],
    correctAnswer: 0,
    explanation: "Un barillet standard fournit entre 6 et 7.5 tours de rotation utile entre le plein armage et le désarmage complet."
  },
  {
    id: 69,
    category: "Barillet & Force Motrice",
    question: "Quelle roue dentée massive est vissée directement sur le carré supérieur de l'arbre de barillet ?",
    options: ["Le rochet de barillet", "La roue de seconde", "L'ancre", "La roue d'heures"],
    correctAnswer: 0,
    explanation: "Le rochet transmet la force de remontage depuis la roue de couronne directement à l'arbre du ressort."
  },
  {
    id: 70,
    category: "Barillet & Force Motrice",
    question: "Quel sens de pas possède la vis de roue de couronne (crown wheel screw) sur la majorité des mouvements suisses ?",
    options: ["Filetage à gauche (pas inverse, se desserre dans le sens horaire)", "Filetage standard à droite", "Elle est emmanchée sans vis", "Vis à baïonnette"],
    correctAnswer: 0,
    explanation: "Le pas à gauche empêche la rotation naturelle de la couronne de desserrer la vis pendant le remontage manuel."
  },
  {
    id: 71,
    category: "Barillet & Force Motrice",
    question: "Comment reconnaît-on traditionnellement une vis à filetage à gauche en horlogerie suisse ?",
    options: [
      "Elle comporte souvent trois fentes parallèles gravées sur sa tête ou une fente entourée d'un cercle",
      "Elle est peinte en rouge",
      "Elle est carrée",
      "Elle est en plastique"
    ],
    correctAnswer: 0,
    explanation: "Les 3 fentes distinctives avertissent l'horloger qu'il doit tourner dans le sens horaire pour la desserrer."
  },
  {
    id: 72,
    category: "Barillet & Force Motrice",
    question: "Dans quel sens la denture du tambour de barillet entraîne-t-elle le rouage ?",
    options: [
      "Elle entraîne directement le pignon de la roue de grande moyenne (roue de centre)",
      "Elle entraîne directement l'ancre",
      "Elle entraîne les aiguilles sans pignon",
      "Elle ne tourne pas"
    ],
    correctAnswer: 0,
    explanation: "Le tambour de barillet est la première roue motrice (roue n°1) qui engrène avec le pignon de centre."
  },
  {
    id: 73,
    category: "Barillet & Force Motrice",
    question: "Qu'est-ce que le cliquetage élastique dans le pont de barillet ?",
    options: [
      "Le recul de 2 à 3 degrés que le cliquet autorise au rochet pour détendre la première spire et supprimer la surtension d'armage",
      "Le bruit du réveil",
      "Le cliquetis des aiguilles",
      "Un défaut de fabrication"
    ],
    correctAnswer: 0,
    explanation: "Ce léger retour élastique protège les pivots fins du rouage contre le pic de couple extrême du ressort tendu à bloc."
  },
  {
    id: 74,
    category: "Barillet & Force Motrice",
    question: "Quel contrôle d'ébat effectue-t-on sur le barillet monté entre platine et pont de barillet ?",
    options: ["L'ébat de hauteur de l'arbre et l'ébat libre du tambour", "La couleur du couvercle", "Le poids de la vis", "L'odeur de l'huile"],
    correctAnswer: 0,
    explanation: "L'arbre et le tambour doivent avoir un jeu axial libre (0.02 à 0.04 mm) sans frotter contre la platine ni le pont."
  },
  {
    id: 75,
    category: "Barillet & Force Motrice",
    question: "Quelle forme libre présente un ressort moteur moderne en Nivaflex désarmé hors de son barillet ?",
    options: ["Une forme de courbe inverse en 'S'", "Un cercle fermé", "Une ligne droite plate", "Un zigzag triangulaire"],
    correctAnswer: 0,
    explanation: "La courbe en S inversé compense la perte de couple au désarmage pour fournir une force quasi-constante sur 30 heures."
  },

  // --- 5. ROUAGE, REMONTOIR, CALIBRES SUISSES & COMPLICATIONS (76-100) ---
  {
    id: 76,
    category: "Calibres & Mécanismes",
    question: "Quel système d'embrayage de chronographe légendaire équipe le calibre ETA Valjoux 7750 ?",
    options: ["Le pignon oscillant (brevet Edouard Heuer 1887)", "L'embrayage vertical à friction", "La roue à colonnes classique", "L'embrayage par courroie"],
    correctAnswer: 0,
    explanation: "Le pignon oscillant bascule en une fraction de seconde pour engrener directement avec la roue des secondes du chrono."
  },
  {
    id: 77,
    category: "Calibres & Mécanismes",
    question: "Comment fonctionne la distribution des fonctions Start/Stop/Reset sur un calibre ETA 7750 ?",
    options: ["Par une came navette 3D à deux niveaux", "Par une roue à colonnes à 9 piliers", "Par câble électrique", "Par engrenage hélicoïdal"],
    correctAnswer: 0,
    explanation: "Le 7750 a popularisé la came navette en acier découpé de haute précision, plus robuste et économique que la roue à colonnes."
  },
  {
    id: 78,
    category: "Calibres & Mécanismes",
    question: "Sur un quantième instantané ETA 2824-2, à quel moment le saut de date s'opère-t-il ?",
    options: [
      "À minuit pile en moins de 1/1000e de seconde grâce au doigt entraîneur et son ressort sautoir",
      "Lentement entre 22h et 2h du matin",
      "À midi en plein jour",
      "Toutes les 12 heures"
    ],
    correctAnswer: 0,
    explanation: "La came accumule la tension du ressort toute la soirée jusqu'au décrochement instantané du sautoir à 00h00."
  },
  {
    id: 79,
    category: "Calibres & Mécanismes",
    question: "Pourquoi est-il formellement interdit de corriger rapidement la date à la couronne entre 20h et 03h ?",
    options: [
      "Le doigt de quantième est engagé dans la denture de l'étoile et forcer le correcteur casse le doigt ou la dent",
      "La montre explose",
      "Le ressort moteur se détend",
      "La lunette tourne toute seule"
    ],
    correctAnswer: 0,
    explanation: "Dans cette 'zone rouge', le mécanisme de date automatique est en prise directe. La correction rapide forcerait les mobiles."
  },
  {
    id: 80,
    category: "Calibres & Mécanismes",
    question: "Combien de rubis de synthèse compte le mouvement automatique officiel suisse ETA 2824-2 ?",
    options: ["25 rubis", "17 rubis", "31 rubis", "7 rubis"],
    correctAnswer: 0,
    explanation: "Le 2824-2 standard est doté de 25 rubis protégeant le rouage, l'échappement, le balancier et le module automatique."
  },
  {
    id: 81,
    category: "Calibres & Mécanismes",
    question: "Combien de rubis fonctionnels possède le calibre école à remontage manuel ETA 6497-1 ?",
    options: ["17 rubis", "25 rubis", "21 rubis", "15 rubis"],
    correctAnswer: 0,
    explanation: "Le 6497-1 possède 17 rubis : barillet (2), centre (2), moyenne (2), seconde (2), échappement (2), ancre (2), balancier (4) + cheville."
  },
  {
    id: 82,
    category: "Calibres & Mécanismes",
    question: "Quel rôle assure le pignon coulant (sliding pinion) sur la tige de remontoir ?",
    options: [
      "Coulisser le long du carré de la tige pour embrayer soit sur le pignon de remontoir (Pos. 0), soit sur la minuterie (Pos. 2)",
      "Maintenir le cadran",
      "Freiner le spiral",
      "Afficher la date"
    ],
    correctAnswer: 0,
    explanation: "Le pignon coulant possède une denture de loup d'un côté (remontage) et une denture droite de l'autre (mise à l'heure)."
  },
  {
    id: 83,
    category: "Calibres & Mécanismes",
    question: "Quel organe maintient la tige de remontoir dans le boîtier tout en permettant ses 3 positions d'établi ?",
    options: ["La tirette et son sautoir de tirette", "La vis de lunette", "Le piton", "Le coq"],
    correctAnswer: 0,
    explanation: "Le téton de la tirette s'engage dans la gorge de la tige, et le sautoir verrouille les crans d'établi 0, 1 et 2."
  },
  {
    id: 84,
    category: "Calibres & Mécanismes",
    question: "Comment libère-t-on la tige de remontoir d'un mouvement ETA 2824-2 à l'établi ?",
    options: [
      "En pressant délicatement sur le poussoir de tirette avec une pointe fine en position mise à l'heure (Pos. 2)",
      "En tirant dessus de toutes ses forces",
      "En dévissant le balancier",
      "En chauffant la couronne"
    ],
    correctAnswer: 0,
    explanation: "Presser le point d'appui de la tirette en position 2 dégage le téton de la gorge sans déformer le sautoir."
  },
  {
    id: 85,
    category: "Calibres & Mécanismes",
    question: "Sur ETA 6497-1, quelle vis doit-on desserrer (d'un tour et demi seulement) pour extraire la tige ?",
    options: ["La petite vis de tirette", "La vis de pont de barillet", "La vis de rochet", "La vis de coq"],
    correctAnswer: 0,
    explanation: "Attention : desserrer la vis de tirette de plus de 2 tours la fait tomber sous le cadran, obligeant à redémonter le mécanisme."
  },
  {
    id: 86,
    category: "Calibres & Mécanismes",
    question: "Quel composant assure la friction nécessaire pour tourner les aiguilles sans forcer le rouage moteur ?",
    options: ["La chaussée (friction sur l'axe de centre ou pignon de minuterie)", "Le spiral", "Le ressort lyre", "Le rotor"],
    correctAnswer: 0,
    explanation: "La chaussée est pincée avec un léger serrage (lanterne) : elle tourne avec la roue mais peut glisser lors de la mise à l'heure."
  },
  {
    id: 87,
    category: "Calibres & Mécanismes",
    question: "Si le serrage de la chaussée (lanternage) est trop faible, quel problème survient ?",
    options: [
      "La montre fonctionne mais les aiguilles retardent énormément ou s'arrêtent sur le cadran",
      "Le verre explose",
      "Le remontoir casse",
      "L'ancre se bloque"
    ],
    correctAnswer: 0,
    explanation: "L'axe tourne dans le vide sans entraîner la chaussée : le calibre tourne à l'heure mais les aiguilles restent immobiles."
  },
  {
    id: 88,
    category: "Calibres & Mécanismes",
    question: "Quel est le rapport de démultiplication exact entre la roue des heures et la chaussée ?",
    options: ["Rapport de 1/12 (la roue des heures tourne 12 fois moins vite que la chaussée des minutes)", "Rapport de 1/60", "Rapport de 1/24", "Rapport de 1/2"],
    correctAnswer: 0,
    explanation: "Grâce au rouage de minuterie, 12 tours de l'aiguille des minutes correspondent à un tour complet du cadran pour l'aiguille des heures."
  },
  {
    id: 89,
    category: "Calibres & Mécanismes",
    question: "Quel dispositif arrête net le balancier lorsqu'on tire la couronne en position mise à l'heure sur un ETA 2824-2 ?",
    options: ["Le levier stop-seconde (hack lever)", "Le frein de tambour", "Le dard", "La came navette"],
    correctAnswer: 0,
    explanation: "Le levier stop-seconde vient appuyer délicatement sur la serge du balancier pour synchroniser la seconde au top horaire."
  },
  {
    id: 90,
    category: "Calibres & Mécanismes",
    question: "Comment s'appellent les roues à cliquets intérieurs permettant le remontage automatique bidirectionnel sur ETA 2824 ?",
    options: ["Les roues inverseuses (reversing wheels)", "Les roues de colonne", "Les roues d'échappement", "Les lanternes"],
    correctAnswer: 0,
    explanation: "Les deux roues inverseuses transforment les oscillations gauche/droite du rotor en un sens unique d'armage du barillet."
  },
  {
    id: 91,
    category: "Calibres & Mécanismes",
    question: "Quel couple de serrage officiel en cNm applique-t-on sur la vis de pont de balancier (coq) ?",
    options: ["Environ 1.0 à 1.2 cNm", "10 cNm", "0.1 cNm", "25 cNm"],
    correctAnswer: 0,
    explanation: "Un serrage de 1.0 cNm assure le plaquage rigide du pied de coq sans écraser le filetage ni déformer les ébats d'axe."
  },
  {
    id: 92,
    category: "Calibres & Mécanismes",
    question: "Quel est le filetage métrique horloger d'une vis de pont standard sur ETA 2824-2 ?",
    options: ["NIHS S 0.90 à S 1.00", "M6 standard", "Pas américain 1/4 pouce", "S 0.20"],
    correctAnswer: 0,
    explanation: "La visserie de platine et ponts horlogers suisses est normalisée NIHS S 0.90 à S 1.20 avec des pas ultra-fins (0.225 mm)."
  },
  {
    id: 93,
    category: "Calibres & Mécanismes",
    question: "Quel outil utilise l'artisan horloger pour vérifier la présence d'un ébat de hauteur sur un rouage assemblé ?",
    options: [
      "Des brucelles d'horloger n°3 ou n°5 pour soulever délicatement le mobile par sa serge",
      "Une pince étau",
      "Un pied à coulisse digital",
      "Un tournevis d'électricien"
    ],
    correctAnswer: 0,
    explanation: "Le toucher horloger aux brucelles fines perçoit immédiatement le petit jeu axial libre sans blesser les dentures."
  },
  {
    id: 94,
    category: "Calibres & Mécanismes",
    question: "Quelle est la valeur d'ébat de hauteur admissible pour les mobiles du rouage (seconde, moyenne) selon les normes NIHS ?",
    options: ["0.015 à 0.030 mm (15 à 30 microns)", "0.50 mm", "0.001 mm", "1.0 mm"],
    correctAnswer: 0,
    explanation: "Moins de 15 µm risque le bridage thermique ; plus de 30 µm génère des dévers et des frottements de pignons contre les ponts."
  },
  {
    id: 95,
    category: "Calibres & Mécanismes",
    question: "Pourquoi les vis horlogères de haute horlogerie sont-elles bleuies thermiquement à la flamme à 290°C ?",
    options: [
      "Pour former une couche d'oxydation bleue (magnétite Fe₃O₄) protégeant de la corrosion et augmentant l'élasticité de surface",
      "C'est de la peinture bleue pour faire joli",
      "Pour les retrouver si elles tombent",
      "Pour les rendre magnétiques"
    ],
    correctAnswer: 0,
    explanation: "Le bleuissement thermique traditionnel confère une protection contre l'oxydation et un revenu d'élasticité sans peinture."
  },
  {
    id: 96,
    category: "Calibres & Mécanismes",
    question: "Qu'est-ce que le perlage (ou œil-de-perdrix) réalisé sur la platine principale d'un calibre ?",
    options: [
      "Une finition décorative de cercles concentriques guillochés à la pâte abrasive et au tampon de bois",
      "Des petits trous pour aérer",
      "Des traces de rouille",
      "Un logo gravé"
    ],
    correctAnswer: 0,
    explanation: "Le perlage chevauché retient les micro-poussières et diffracte la lumière avec élégance sous les ponts."
  },
  {
    id: 97,
    category: "Calibres & Mécanismes",
    question: "Qu'appelle-t-on les Côtes de Genève sur les ponts d'un calibre suisse ?",
    options: [
      "Des bandes régulières parallèles satinées obtenues par passage d'une meule ou d'un buis abrasif",
      "Des fissures dans le laiton",
      "Le numéro de série de la manufacture",
      "La marque des vis"
    ],
    correctAnswer: 0,
    explanation: "Emblème de la haute horlogerie suisse, les Côtes de Genève illuminent les surfaces planes des ponts décorés."
  },
  {
    id: 98,
    category: "Calibres & Mécanismes",
    question: "Qu'est-ce que l'anglage main d'un pont en haute horlogerie ?",
    options: [
      "Abattre l'arête vive à 45° à la lime douce puis la polir miroir avec un cabron de bois de gentiane et diamant",
      "Tordre le pont avec une pince",
      "Arrondir les coins au marteau",
      "Couper les vis"
    ],
    correctAnswer: 0,
    explanation: "L'anglage bercé main avec angle rentrant franc est l'un des sommets du savoir-faire artisanal helvétique."
  },
  {
    id: 99,
    category: "Calibres & Mécanismes",
    question: "Quel test d'étanchéité d'atelier effectue-t-on sur la boîte avant d'emboîter le mouvement mécanique ?",
    options: [
      "Un contrôle à sec sous cloche à dépression et surpression (test de déformation capacitive Witschi)",
      "La jeter au fond d'un seau d'eau avec le mouvement dedans",
      "Souffler dessus avec la bouche",
      "La congeler dans le frigo"
    ],
    correctAnswer: 0,
    explanation: "Le test à sec mesure au micron la flexion du verre sans aucun risque d'infiltrer d'eau en cas de joint défaillant."
  },
  {
    id: 100,
    category: "Calibres & Mécanismes",
    question: "Quel métal précieux compose traditionnellement la masse périphérique d'un rotor de chronographe de manufacture ?",
    options: ["Or 21k/22k ou Tungstène lourd (haute densité d'inertie)", "Aluminium léger", "Bois verni", "Plastique renforcé"],
    correctAnswer: 0,
    explanation: "La densité élevée de l'or ou du tungstène maximise le couple d'inertie pour remonter le barillet au moindre geste du poignet."
  }
];
