// src/lib/searchData.ts
// Moteur de recherche complet et vérifié : 100 % des routes réelles d'HorloLearn (zéro lien 404)

export interface SearchItem {
  id: number;
  title: string;
  description: string;
  type: "page" | "quiz" | "outil" | "ressource" | "culture" | "theorie" | "evenement";
  url: string;
  keywords?: string[];
}

export const searchData: SearchItem[] = [
  // === ACCUEIL ===
  {
    id: 1,
    title: "Accueil HorloLearn",
    description: "Plateforme suisse de culture, d'établi, de schémas techniques et de simulateurs horlogers.",
    type: "page",
    url: "/",
    keywords: ["accueil", "horlolearn", "horlogerie", "suisse", "lune", "phase de lune"],
  },

  // === ATELIER & 12 POSTES D'OUTILS ===
  {
    id: 10,
    title: "Atelier de Mesure & Simulateurs (12 Postes d'Établi)",
    description: "Les 12 postes d'établi : convertisseur lignes/mm, rouages, étanchéité NIHS, réserve de marche, COSC ISO 3159, tournevis, base de 130+ calibres, traces Witschi, piles Renata, Shazam des mouvements, ETA vs Sellita et ressort D/3.",
    type: "outil",
    url: "/outils",
    keywords: ["outil", "convertisseur", "lignes", "witschi", "angle de levée", "lift angle", "renata", "aiguilles", "sellita", "sw200", "barillet", "cosc", "iso 3159", "nihs"],
  },
  {
    id: 11,
    title: "Chronocomparateur Acoustique & Diagnostic Witschi",
    description: "Simulateur d'oscilloscope acoustique Witschi : marche diurne, amplitude, erreur de repère (beat error).",
    type: "outil",
    url: "/outils/chronocomparateur",
    keywords: ["chronocomparateur", "witschi", "amplitude", "repère", "beat error", "marche", "oscilloscope"],
  },
  {
    id: 12,
    title: "Simulateur d'Ébats & Ajustements ISO 286-2",
    description: "Contrôle micrométrique des ébats axiaux, jeux de rouage et tolérances d'ajustement H7/g6.",
    type: "outil",
    url: "/outils/ebats-ajustements",
    keywords: ["ébats", "jeu axial", "endshake", "ajustement", "iso 286", "micromètre", "tolérance"],
  },
  {
    id: 13,
    title: "Simulateur de Résonance & Battements Acoustiques",
    description: "Étude physique du couplage acoustique entre deux oscillateurs balancier-spiral (F.P. Journe / Breguet).",
    type: "outil",
    url: "/outils/simulateur-resonance",
    keywords: ["résonance", "oscillateur", "breguet", "journe", "fréquence", "isochronisme"],
  },
  {
    id: 14,
    title: "Banc Pro Chronographe & Embrayages",
    description: "Banc d'essai avancé des systèmes de chronographe : roue à colonnes, came navette et embrayage vertical.",
    type: "outil",
    url: "/outils/chronographe-banc-pro",
    keywords: ["chronographe", "banc", "roue à colonnes", "embrayage vertical", "pignon oscillant"],
  },
  {
    id: 15,
    title: "Analyseur IA de Montre & Calibre",
    description: "Analyse visuelle assistée par IA pour identifier une montre, son calibre et ses caractéristiques techniques.",
    type: "outil",
    url: "/outils/analyseur",
    keywords: ["ia", "analyseur", "identification", "photo", "reconnaissance", "calibre"],
  },
  {
    id: 16,
    title: "Métrologie & Outils de Mesure d'Atelier",
    description: "comparateur au 1/100e, micromètre extérieur, jauges tampons et projecteur de profil.",
    type: "outil",
    url: "/outils/outils-de-mesure",
    keywords: ["métrologie", "comparateur", "micromètre", "palmer", "jauge", "mesure"],
  },

  // === PRATIQUE & MODULES D'ÉTABLI ===
  {
    id: 20,
    title: "Pratique d'Atelier & Établi Horloger",
    description: "Tous les postes pratiques d'établi : démontage, remontage, huilage Moebius, réglage, micromécanique, échappement et emboîtage.",
    type: "page",
    url: "/pratique",
    keywords: ["pratique", "atelier", "établi", "horloger", "rhabillage", "flashcards"],
  },
  {
    id: 21,
    title: "Micromécanique & Tour Schaublin 70",
    description: "Usinage horloger au centième de mm, affûtage des burins et tournevis, trempe et revenu de l'acier Böhler K720.",
    type: "theorie",
    url: "/pratique/micromecanique",
    keywords: ["micromécanique", "schaublin 70", "tour", "burin", "trempe", "revenu", "affûtage", "pierre arkansas"],
  },
  {
    id: 22,
    title: "Échappement à Ancre Suisse & Balancier-Spiral",
    description: "Cinématique complète de l'échappement suisse : repos, tirage 12°, impulsion, chute, retouche du spiral et Incabloc.",
    type: "theorie",
    url: "/pratique/echappement",
    keywords: ["échappement", "ancre", "palette", "dard", "fourchette", "ellipse", "tirage", "incabloc"],
  },
  {
    id: 23,
    title: "Posage du Cadran, Aiguillage & Emboîtage (NIHS 92-20)",
    description: "Pose des aiguilles à la potence, coupe de tige de remontoir, joints Toriques FKM et test d'étanchéité.",
    type: "theorie",
    url: "/pratique/emboitage",
    keywords: ["emboîtage", "aiguillage", "posage", "cadran", "potence", "tige", "étanchéité", "joint"],
  },
  {
    id: 24,
    title: "Rhabillage Complet & Diagnostic d'Atelier",
    description: "Protocole complet de révision d'un calibre mécanique : démontage, lavage par ultrasons, épilamage et contrôle final.",
    type: "theorie",
    url: "/pratique/rhabillage",
    keywords: ["rhabillage", "révision", "lavage", "épilamage", "benzine", "ultrasons"],
  },
  {
    id: 25,
    title: "Cartographie de Lubrification & Huiles Moebius",
    description: "Les 5 lubrifiants certifiés Moebius (9010, HP-1300, 9415, 9504, 8217), piques-huiles Bergeon et dosages au rubis.",
    type: "theorie",
    url: "/pratique/huilage",
    keywords: ["huilage", "lubrification", "moebius", "9010", "hp-1300", "9415", "9504", "8217", "pique-huile"],
  },
  {
    id: 26,
    title: "Démontage Méthodique du Calibre ETA 6497",
    description: "Ordre de dépose sécurisé : désarmement du barillet, dépose du balancier, de l'ancre, des ponts et de la minuterie.",
    type: "theorie",
    url: "/pratique/demontage",
    keywords: ["démontage", "dépose", "eta 6497", "unitas", "désarmement", "barillet"],
  },
  {
    id: 27,
    title: "Remontage Pas-à-Pas du Calibre ETA 6497",
    description: "Séquenceur visuel en 6 étapes avec photos d'assemblage, couples de serrage en cNm et contrôles d'ébats.",
    type: "theorie",
    url: "/pratique/remontage",
    keywords: ["remontage", "assemblage", "eta 6497", "couple de serrage", "étapes"],
  },
  {
    id: 28,
    title: "Réglage Chronométrique & Mise au Repère",
    description: "Correction du repère (beat error), réglage de la raquette, équilibrage et contrôle sur 5 positions ISO 3159.",
    type: "theorie",
    url: "/pratique/reglage",
    keywords: ["réglage", "raquette", "repère", "positions", "amplitude", "marche diurne"],
  },
  {
    id: 29,
    title: "Dépose & Manipulation du Balancier-Spiral",
    description: "Gestes de sécurité pour extraire, retourner et stocker le coq et le balancier-spiral sans fausser les pivots.",
    type: "theorie",
    url: "/pratique/demontage-balancier",
    keywords: ["balancier", "coq", "spiral", "pivot", "brucelles", "manipulation"],
  },
  {
    id: 30,
    title: "Ergonomie à l'Établi & Horlogers Gauchers",
    description: "Aménagement du poste de travail, hauteur d'accoudoirs et organisation des outils pour droitiers et gauchers.",
    type: "theorie",
    url: "/pratique/gauchers",
    keywords: ["gaucher", "ergonomie", "établi", "accoudoir", "posture"],
  },

  // === FICHES TECHNIQUES DE CALIBRES ===
  {
    id: 31,
    title: "Fiches Techniques Officielles des Calibres Suisses",
    description: "Bibliothèque des communications techniques : ETA 6497-1, ETA 2824-2, Valjoux 7750 et ETA 2892-A2.",
    type: "ressource",
    url: "/pratique/fiches",
    keywords: ["fiches", "communication technique", "calibre", "eta", "valjoux", "unitas"],
  },
  {
    id: 32,
    title: "Fiche Technique & Fournitures Réelles ETA 6497-1",
    description: "Inspection à la loupe 10x des 19 vraies pièces détourées de l'Unitas 6497-1 + codes Ebauches SA + PDF officiel.",
    type: "ressource",
    url: "/pratique/fiches/eta6497",
    keywords: ["eta 6497", "unitas 6497", "16 1/2", "fournitures", "pièces", "fiche"],
  },
  {
    id: 33,
    title: "Fiche Technique & Plan Interactif ETA 2824-2",
    description: "Module automatique à 2 roues inverseuses (1488), raquette Etachron, pièges SW200-1 et PDF officiel ETA 2824-2.",
    type: "ressource",
    url: "/pratique/fiches/eta2824",
    keywords: ["eta 2824", "2824-2", "roue inverseuse", "etachron", "automatique", "fiche"],
  },
  {
    id: 34,
    title: "Fiche Technique Interactive ETA / Valjoux 7750",
    description: "Chronographe automatique à came navette et pignon oscillant (Code 8080) : réglages d'excentriques et lubrification.",
    type: "ressource",
    url: "/pratique/fiches/valjoux7750",
    keywords: ["valjoux 7750", "eta 7750", "chronographe", "came navette", "pignon oscillant", "8080"],
  },
  {
    id: 35,
    title: "Fiche Technique Interactive ETA 2892-A2",
    description: "Calibre automatique extra-plat haut de gamme (3.60 mm) : roulement à billes, sautoir de quantième et huilage.",
    type: "ressource",
    url: "/pratique/fiches/eta2892",
    keywords: ["eta 2892", "2892-a2", "extra-plat", "omega 1120", "iwc", "automatique"],
  },

  // === RESSOURCES TECHNIQUES SPÉCIALISÉES ===
  {
    id: 40,
    title: "Centre de Ressources & Bibliothèque Horlogère",
    description: "Dictionnaire Ebauches SA, banc de chronographe, laboratoire du spiral, gestes d'atelier et maisons suisses.",
    type: "ressource",
    url: "/ressources",
    keywords: ["ressources", "bibliothèque", "documentation", "guides", "archives"],
  },
  {
    id: 41,
    title: "Dictionnaire Illustré & Codes Officiels Ebauches SA (FR/DE/EN)",
    description: "Nomenclature officielle des fournitures (Codes 100 à 8200), traduction trilingue Français / Allemand / Anglais et huiles Moebius.",
    type: "ressource",
    url: "/ressources/termes-techniques",
    keywords: ["dictionnaire", "lexique", "ebauches sa", "codes", "fournitures", "allemand", "anglais", "federhaus", "anker", "unruh"],
  },
  {
    id: 42,
    title: "Banc Cinématique de Chronographe (Start / Stop / Reset)",
    description: "Simulation interactive Poussoir 2h / 4h : Roue à Colonnes vs Came Navette 7750, pignon oscillant et marteau sur cœur.",
    type: "ressource",
    url: "/ressources/chronographe",
    keywords: ["chronographe", "roue à colonnes", "came navette", "poussoir", "marteau", "cœur", "remise à zéro"],
  },
  {
    id: 43,
    title: "Laboratoire du Spiral, Courbe Phillips & Export CAO .DXF",
    description: "Calculateur géométrique de spiral d'Archimède, courbe terminale de Phillips (Breguet), théorème de Caspari et export .DXF.",
    type: "ressource",
    url: "/ressources/reglage",
    keywords: ["spiral", "archimède", "phillips", "breguet", "caspari", "dxf", "cao", "isochronisme", "virole", "piton"],
  },
  {
    id: 44,
    title: "Gestes de Précision : Spiral, Équilibrage & Vibrographe",
    description: "Schémas SVG d'atelier : centrage du spiral aux brucelles N°5, équilibrage sur couteaux d'agate et contrôle 5 positions.",
    type: "ressource",
    url: "/ressources/gestes",
    keywords: ["gestes", "équilibrage", "couteaux", "brucelles", "spiral", "plat", "centrage"],
  },

  // === THÉORIE HORLOGÈRE & DESSIN TECHNIQUE ===
  {
    id: 50,
    title: "Académie de Théorie Horlogère",
    description: "Cours complets : chaîne cinématique, organes moteurs, rouage, échappement, lecture de plan ISO et complications.",
    type: "theorie",
    url: "/theorie",
    keywords: ["théorie", "cours", "fondamentaux", "physique", "horlogerie"],
  },
  {
    id: 51,
    title: "Introduction à la Montre Mécanique",
    description: "Les 5 organes fondamentaux d'un garde-temps mécanique et le flux d'énergie du barillet au balancier.",
    type: "theorie",
    url: "/theorie/introduction-montre-mecanique",
    keywords: ["introduction", "montre mécanique", "organes", "chaîne cinématique"],
  },
  {
    id: 52,
    title: "Barillet & Ressort Moteur (Alliage Nivaflex)",
    description: "Courbe de couple du ressort moteur, arbre, bonde, tambour et bride glissante d'automatique.",
    type: "theorie",
    url: "/theorie/barillet-ressort-moteur",
    keywords: ["barillet", "ressort moteur", "nivaflex", "bonde", "couple", "bride glissante"],
  },
  {
    id: 53,
    title: "Le Rouage de Finissage & Minuterie",
    description: "Calcul des rapports d'engrenage, profils épicycloïdaux NIHS 20-02, roues et pignons.",
    type: "theorie",
    url: "/theorie/rouage",
    keywords: ["rouage", "engrenage", "pignon", "grande moyenne", "minuterie", "chaussée"],
  },
  {
    id: 54,
    title: "Théorie de l'Échappement à Ancre Suisse",
    description: "Angles de levée, repos, tirage, impulsion sur le plan de la dent et de la palette, sécurités dard/plateau.",
    type: "theorie",
    url: "/theorie/echappement-ancre",
    keywords: ["échappement", "ancre suisse", "palette", "repos", "impulsion", "chute"],
  },
  {
    id: 55,
    title: "Organe Réglant : Balancier & Spiral",
    description: "Formule de la période d'oscillation, moment d'inertie, couple élastique Nivarox et facteur de qualité.",
    type: "theorie",
    url: "/theorie/balancier-spiral",
    keywords: ["balancier", "spiral", "nivarox", "glucydur", "inertie", "fréquence"],
  },
  {
    id: 56,
    title: "Mécanismes de Remontage & Mise à l'Heure",
    description: "Tige, pignon coulant, pignon de remontoir, tirette, bascule et systèmes automatiques à masse oscillante.",
    type: "theorie",
    url: "/theorie/remontage",
    keywords: ["remontage", "mise à l'heure", "tirette", "bascule", "pignon coulant", "masse oscillante"],
  },
  {
    id: 57,
    title: "Lecture de Plan Horloger (Normes ISO & NIHS)",
    description: "Projections orthographiques, coupes, cartouche ISO 7200, traits normalisés et tolérances géométriques.",
    type: "theorie",
    url: "/theorie/lecture-de-plan",
    keywords: ["lecture de plan", "dessin technique", "iso 128", "cartouche", "cotation", "tolérance"],
  },
  {
    id: 58,
    title: "Cartouche Horloger Normalisé ISO 7200",
    description: "Décryptage interactif de toutes les zones du cartouche d'un plan de manufacture suisse.",
    type: "theorie",
    url: "/theorie/lecture-de-plan/cartouche-horloger",
    keywords: ["cartouche", "iso 7200", "échelle", "tolérance générale", "plan"],
  },
  {
    id: 59,
    title: "Cotes, Tolérances Micrométriques & Ajustements",
    description: "Tolérances dimensionnelles en microns, états de surface Ra et ajustements arbres/alésages.",
    type: "theorie",
    url: "/theorie/lecture-de-plan/cotes-tolerances",
    keywords: ["cotes", "tolérances", "microns", "rugosité", "état de surface"],
  },
  {
    id: 60,
    title: "Vues Techniques, Coupes & Sections",
    description: "Conventions de représentation en vue de dessus, vue de dessous et coupe brisée à plans parallèles.",
    type: "theorie",
    url: "/theorie/lecture-de-plan/vues-techniques",
    keywords: ["vues", "coupe", "section", "projection", "hachures"],
  },
  {
    id: 61,
    title: "Symboles Normalisés & Tolérances Géométriques",
    description: "Concentricité, battement axial, perpendicularité, parallélisme et symboles d'usinage.",
    type: "theorie",
    url: "/theorie/lecture-de-plan/symboles-normalises",
    keywords: ["symboles", "concentricité", "battement", "perpendicularité", "planéité"],
  },

  // === GRANDES COMPLICATIONS & MANUFACTURES ===
  {
    id: 70,
    title: "Grandes Complications Horlogères",
    description: "Tourbillon, quantième perpétuel, répétition minutes, équation du temps, fusée-chaînette et phases de lune.",
    type: "theorie",
    url: "/theorie/complications",
    keywords: ["complications", "tourbillon", "quantième perpétuel", "sonnerie", "répétition minutes", "phase de lune"],
  },
  {
    id: 71,
    title: "Le Tourbillon (Breguet 1801)",
    description: "Cage tournante compensant les écarts de marche dus à la gravité dans les positions verticales.",
    type: "theorie",
    url: "/theorie/complications/tourbillon",
    keywords: ["tourbillon", "cage", "breguet", "gravité", "balancier"],
  },
  {
    id: 72,
    title: "Quantième Perpétuel (Came de 48 Mois)",
    description: "Mémoire mécanique du grand levier, came des années bissextiles et gestion automatique du mois de février.",
    type: "theorie",
    url: "/theorie/complications/calendrier-perpetuel",
    keywords: ["quantième perpétuel", "qp", "came 48 mois", "bissextile", "grand levier"],
  },
  {
    id: 73,
    title: "Répétition Minutes & Sonneries",
    description: "Râteaux des heures, quarts et minutes, limaçons, marteaux, timbres cathédrale et régulateur centrifuge.",
    type: "theorie",
    url: "/theorie/complications/sonnerie",
    keywords: ["répétition minutes", "sonnerie", "timbre", "marteau", "râteau", "limaçon"],
  },
  {
    id: 74,
    title: "Grandes Manufactures Horlogères Suisses",
    description: "Histoire technique, calibres emblématiques et brevets de Rolex, Patek Philippe, Audemars Piguet, Vacheron Constantin et Omega.",
    type: "culture",
    url: "/theorie/manufactures",
    keywords: ["manufactures", "rolex", "patek philippe", "audemars piguet", "vacheron constantin", "omega"],
  },
  {
    id: 75,
    title: "Matériaux Horlogers (Aciers, Laitons, Silicium, Or)",
    description: "Propriétés métallurgiques de l'acier 316L/904L, maillechort, laiton CuZn37, silicium DRIE et Glucydur.",
    type: "theorie",
    url: "/materiaux",
    keywords: ["matériaux", "acier 316l", "904l", "laiton", "maillechort", "silicium", "titane", "céramique"],
  },

  // === QUIZ, CULTURE, ACTUALITÉS & FAQ ===
  {
    id: 80,
    title: "Centre de Quiz & Défis Horlogers",
    description: "Testez vos connaissances sur l'ETA 6497, les complications, la lecture de plan et la métrologie.",
    type: "quiz",
    url: "/quiz",
    keywords: ["quiz", "qcm", "examen", "test", "révision"],
  },
  {
    id: 81,
    title: "Horlogerie Suisse, Régions & Poinçon de Genève",
    description: "L'Arc Jurassien, Genève, Vallée de Joux, La Chaux-de-Fonds, Le Locle et les critères du Swiss Made.",
    type: "culture",
    url: "/suisse",
    keywords: ["suisse", "arc jurassien", "genève", "vallée de joux", "swiss made", "poinçon de genève"],
  },
  {
    id: 82,
    title: "Histoire de l'Horlogerie Suisse (Du XVIe siècle à nos jours)",
    description: "De Jean Calvin et Daniel Jeanrichard à la révolution du quartz et au renouveau mécanique contemporain.",
    type: "culture",
    url: "/theorie/histoire-horlogerie-suisse",
    keywords: ["histoire", "chronologie", "jeanrichard", "breguet", "quartz", "patrimoine"],
  },
  {
    id: 83,
    title: "Actualités Horlogères en Direct (Flux RSS Suisse)",
    description: "Toute l'actualité horlogère suisse et internationale triée chronologiquement en temps réel.",
    type: "page",
    url: "/actualites",
    keywords: ["actualités", "news", "nouveautés", "watches and wonders", "industrie"],
  },
  {
    id: 84,
    title: "Fuseaux Horaires & Heure Universelle (GMT / UTC)",
    description: "Horloge mondiale des 24 fuseaux horaires pour le réglage des montres GMT et Worldtimer.",
    type: "outil",
    url: "/fuseaux-horaires",
    keywords: ["fuseaux horaires", "gmt", "utc", "worldtimer", "heure mondiale"],
  },
  {
    id: 85,
    title: "FAQ Technique d'Atelier & Horlogerie Suisse",
    description: "20 questions-réponses d'horloger : échappement, huiles Moebius, calibres ETA/Sellita, COSC ISO 3159 et étanchéité NIHS.",
    type: "ressource",
    url: "/faq",
    keywords: ["faq", "questions", "aide", "problème", "amplitude", "magnétisme", "huilage"],
  },
  {
    id: 86,
    title: "Communauté & Cercle des Passionnés",
    description: "Échanges techniques, galerie et codex horloger.",
    type: "page",
    url: "/communaute",
    keywords: ["communauté", "forum", "échange", "passionnés"],
  },
  {
    id: 87,
    title: "Contact",
    description: "Contacter l'atelier HorloLearn.",
    type: "page",
    url: "/contact",
    keywords: ["contact", "message", "email"],
  },
];

export function searchContent(query: string): SearchItem[] {
  if (!query || query.trim().length < 2) return [];

  const lower = query.trim().toLowerCase();
  return searchData.filter(
    (item) =>
      item.title.toLowerCase().includes(lower) ||
      item.description.toLowerCase().includes(lower) ||
      item.keywords?.some((k) => k.toLowerCase().includes(lower))
  );
}
