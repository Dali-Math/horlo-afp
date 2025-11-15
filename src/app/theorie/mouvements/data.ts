import type { Module } from './types';

export const modules: Module[] = [
  {
    id: 'architecture',
    title: "🏗️ Architecture du Mouvement",
    icon: "Layers",
    color: "from-blue-500 to-cyan-600",
    concepts: [
      { 
        id: 'platine-definition', 
        title: "Définition de la Platine", 
        desc: "Plaque de base, châssis principal du mouvement. Supporte tous les organes.", 
        level: "Débutant",
        tags: ["structure", "base", "châssis"],
        iso: ["ISO 3158"]
      },
      { 
        id: 'platine-materiaux', 
        title: "Matériaux de Platine", 
        desc: "Laiton, maillechort, german silver, Cupro-Cérachrom. Propriétés mécaniques.", 
        level: "Intermédiaire",
        tags: ["maillechort", "laiton", "materiel"],
        iso: ["NIHS 20-05"]
      },
      { 
        id: 'platine-3-4', 
        title: "Construction à Platine 3/4", 
        desc: "Style Glashütte. Pont unique couvrant 270°. Stabilité maximale.", 
        level: "Expert",
        tags: ["glashutte", "allemand", "stabilité"],
        manufactures: ["A. Lange & Söhne", "Glashütte Original"]
      },
      { 
        id: 'ponts-separes', 
        title: "Ponts Séparés Suisse", 
        desc: "Ponts individuels : barillet, rouage, ancre, coq. Finitions décoratives.", 
        level: "Intermédiaire",
        tags: ["suisse", "decoration", "coq"],
        manufactures: ["Patek Philippe", "Vacheron Constantin"]
      },
      { 
        id: 'coq-balancier', 
        title: "Le Coq (Pont du Balancier)", 
        desc: "Nom traditionnel suisse. Forme sculptée, gravée. Pièce maîtresse esthétique.", 
        level: "Débutant",
        tags: ["terminologie", "esthetique", "tradition"],
        history: "XVIe siècle, forme de coq"
      },
      { 
        id: 'vis-ponts', 
        title: "Vis de Ponts", 
        desc: "Vis CHC avec tête colletée. Pas 0.60mm, 0.80mm. Couple de serrage précis.", 
        level: "Intermédiaire",
        tags: ["vis", "assemblage", "couple"],
        iso: ["ISO 15072"]
      },
      { 
        id: 'chocs-incabloc', 
        title: "Système de Chocs Incabloc", 
        desc: "Protection pivots contre chocs. Ressort lyre, fourche de blocage.", 
        level: "Intermédiaire",
        tags: ["protection", "anti-choc", "incabloc"],
        patent: ["Brevet 1934"] // ← CORRIGÉ : tableau
      },
      { 
        id: 'fixation-cadran', 
        title: "Fixation du Cadran", 
        desc: "Pieds de cadran, vis cadran. Alignement précis. Indexage horaire.", 
        level: "Débutant",
        tags: ["cadran", "alignement", "indexage"]
      },
      { 
        id: 'dilatation-thermique', 
        title: "Coefficient de Dilatation", 
        desc: "α = 19×10⁻⁶/K pour laiton. Impact sur jeux et précision.", 
        level: "Expert",
        tags: ["physique", "temperature", "precision"],
        formula: "ΔL = L₀ × α × ΔT"
      },
      { 
        id: 'traitements-surface', 
        title: "Traitements de Surface", 
        desc: "Rhodiage, PVD, DLC. Dureté, corrosion, esthétique.", 
        level: "Intermédiaire",
        tags: ["rhodium", "dlc", "pvd"],
        thickness: "0.5 à 5 μm"
      },
      { 
        id: 'perlage', 
        title: "Technique du Perlage", 
        desc: "Cercles imbriqués avec meule rotative. 0.12mm de diamètre.", 
        level: "Expert",
        tags: ["decoration", "finition", "artisanat"],
        tool: "Meule D=2mm, 15'000 tr/min"
      },
      { 
        id: 'cotes-geneve', 
        title: "Côtes de Genève", 
        desc: "Vagues parallèles à la meule. 0.50mm d'espacement.", 
        level: "Expert",
        tags: ["decoration", "genève", "vagues"],
        direction: "// à l'axe des ponts"
      },
      { 
        id: 'anglage', 
        title: "Anglage (Chanfreinage)", 
        desc: "Polissage arêtes à 45°. Travail manuel à la lime.", 
        level: "Expert",
        tags: ["polissage", "chanfrein", "artisanat"],
        angle: "45° ±2°"
      },
      { 
        id: 'gravure-ponts', 
        title: "Gravure sur Ponts", 
        desc: "Signe de fabrique, numéro calibre. Grafeur manuel ou laser.", 
        level: "Intermédiaire",
        tags: ["identification", "marquage", "laser"],
        depth: "0.05 à 0.10mm"
      },
      { 
        id: 'pervage-paliers', 
        title: "Pervage des Paliers", 
        desc: "Alésage diamètre pivot +0.005mm. Rondeur <0.001mm.", 
        level: "Expert",
        tags: ["usingage", "aleage", "precision"],
        tolerance: "H7"
      }
    ]
  },
  
  {
    id: 'rouages',
    title: "⚙️ Rouages & Transmission",
    icon: "Zap",
    color: "from-purple-500 to-pink-600",
    concepts: [
      { 
        id: 'roue-barillet', 
        title: "Roue du Barillet", 
        desc: "Rapport 6:1 à 8:1. Denture module 0.15 à 0.25.", 
        level: "Débutant",
        tags: ["barillet", "transmission", "denture"],
        ratio: "6:1 à 8:1"
      },
      { 
        id: 'roue-de-rencontre', 
        title: "Roue de Rencontre", 
        desc: "Première roue du rouage. Pont indépendant.", 
        level: "Intermédiaire",
        tags: ["rencontre", "rouage", "pont"],
        height: "0.25mm au-dessus du barillet"
      },
      { 
        id: 'roue-aubier', 
        title: "Roues d'Aubier", 
        desc: "Socle mobile pour roue intermédiaire. Fixation par vis.", 
        level: "Intermédiaire",
        tags: ["aubier", "mobile", "intermediaire"],
        patent: ["Breguet 1801"] // ← CORRIGÉ : tableau
      },
      { 
        id: 'roue-trois-pommes', 
        title: "Roue à Trois Pommes", 
        desc: "Roue de seconde avec 3 branches. Légèreté et équilibrage.", 
        level: "Débutant",
        tags: ["seconde", "equilibrage", "design"],
        weight: "Réduction 40% vs pleine"
      },
      { 
        id: 'engrenage-module', 
        title: "Module d'Engrenage", 
        desc: "m = p/π. Module 0.20 standard calibres modernes.", 
        level: "Expert",
        tags: ["module", "calcul", "standards"],
        formula: "m = d/z"
      },
      { 
        id: 'denture-conique', 
        title: "Denture Conique", 
        desc: "Roue et pignon à axes non parallèlles. Angle 90°.", 
        level: "Expert",
        tags: ["conique", "angle", "complication"],
        angle: "90° ±5°"
      },
      { 
        id: 'finissage-roues', 
        title: "Finissage des Roues", 
        desc: "Rodage pivots, polissage flancs de dents. Ra < 0.2μm.", 
        level: "Expert",
        tags: ["polissage", "rodage", "rugosite"],
        roughness: "Ra < 0.2 μm"
      },
      { 
        id: 'pivots-carbones', 
        title: "Pivots Carbure de Silicium", 
        desc: "Dureté 2400 HV. Aucun lubrifiant nécessaire.", 
        level: "Expert",
        tags: ["silicium", "ceramique", "lubrification"],
        hardness: "2400 HV"
      },
      { 
        id: 'roues-grappe', 
        title: "Roues en Grappe", 
        desc: "Plusieurs roues usinées dans même pièce. Assemblage simplifié.", 
        level: "Intermédiaire",
        tags: ["grappe", "industriel", "efficacite"],
        process: "Décrochage chimique"
      },
      { 
        id: 'axe-canon', 
        title: "Axe-Canon Monobloc", 
        desc: "Pignon et roue usinés ensemble. Concentricité parfaite.", 
        level: "Expert",
        tags: ["monobloc", "concentricite", "precision"],
        tolerance: "0.001mm"
      },
      { 
        id: 'jeu-pivots', 
        title: "Jeu dans les Paliers", 
        desc: "0.005 à 0.015mm selon diamètre. Lubrification capillarité.", 
        level: "Expert",
        tags: ["jeu", "paliers", "lubrification"],
        clearance: "0.005-0.015mm"
      },
      { 
        id: 'roue-libre', 
        title: "Roue Libre de Remontoir", 
        desc: "Débrayage sens unique. Clik-clik autowind.", 
        level: "Intermédiaire",
        tags: ["remontoir", "automatique", "debrayage"],
        sound: "Clik-clik caractéristique"
      }
    ]
  },
  
  {
    id: 'echappement',
    title: "⏱️ Échappements & Régulation",
    icon: "Clock",
    color: "from-amber-500 to-orange-600",
    concepts: [
      { 
        id: 'echappement-ancre', 
        title: "Échappement à Ancre Suiss", 
        desc: "Ancre à dents, pignon d'échappement. 18'000 à 36'000 alt/h.", 
        level: "Intermédiaire",
        tags: ["ancre", "suiss", "pignon"],
        frequency: "18'000 à 36'000 alt/h"
      },
      { 
        id: 'pignon-echappement', 
        title: "Pignon d'Échappement", 
        desc: "15 dents, module 0.09. Dents de rehausse. Acier trempé.", 
        level: "Expert",
        tags: ["pignon", "dents", "acier"],
        hardness: "750 HV"
      },
      { 
        id: 'ancre-double', 
        title: "Ancre à Double Queue", 
        desc: "2 palettes d'impulsion + 2 palettes de repos. Échappement suisse.", 
        level: "Expert",
        tags: ["palette", "double", "impulsion"],
        liftAngle: "52°"
      },
      { 
        id: 'coq-echappement', 
        title: "Coq d'Échappement", 
        desc: "Maintient ancre et pignon. Réglage fin excentrique.", 
        level: "Intermédiaire",
        tags: ["coq", "excentrique", "reglage"],
        adjustment: "Excentrique D=2mm"
      },
      { 
        id: 'detente-chronometre', 
        title: "Échappement à Détente", 
        desc: "Pour chronomètres. Roue à colonnes, détente spécifique.", 
        level: "Expert",
        tags: ["detente", "chronometre", "marine"],
        history: "Marine chronometers 18e siècle"
      },
      { 
        id: 'co-axial', 
        title: "Échappement Co-Axial", 
        desc: "George Daniels 1974. Lubrification réduite. Omega 1999.", 
        level: "Expert",
        tags: ["coaxial", "daniels", "omega"],
        patent: ["GB 1508022"] // ← CORRIGÉ : tableau
      },
      { 
        id: 'spiral-silicium', 
        title: "Spiral en Silicium", 
        desc: "DRIE fabrication. Anti-magnétique, insensible à la température.", 
        level: "Expert",
        tags: ["silicium", "drie", "antimagnetique"],
        brands: ["Patek Philippe", "Ulysse Nardin"]
      },
      { 
        id: 'spiral-parachrom', 
        title: "Spiral Parachrom (Rolex)", 
        desc: "Alliage Nb-Zr-O. 10x plus résistant aux chocs.", 
        level: "Intermédiaire",
        tags: ["rolex", "parachrom", "niobium"],
        patent: ["EP 1208483"] // ← CORRIGÉ : tableau
      },
      { 
        id: 'masse-oscillante', 
        title: "Masse Oscillante", 
        desc: "Perle, micro-rotor, centre. Roulements ou pivots.", 
        level: "Débutant",
        tags: ["automatique", "rotor", "roulement"],
        types: ["Peripheral", "Micro-rotor", "Central"]
      },
      { 
        id: 'remontoir-bidirectionnel', 
        title: "Remontoir Bidirectionnel", 
        desc: "Renvoi d'angle à cliquets. Monts dans les 2 sens.", 
        level: "Expert",
        tags: ["remontoir", "bidirectionnel", "cliquets"],
        efficiency: "≈ 40% énergie captée"
      }
    ]
  },
  
  {
    id: 'regulation',
    title: "🎯 Régulation & Balancier",
    icon: "Target",
    color: "from-emerald-500 to-teal-600",
    concepts: [
      { 
        id: 'balancier-reglage', 
        title: "Réglage du Balancier", 
        desc: "Vis sans fin, rondelles de réglage. 5 positions, 3 températures.", 
        level: "Expert",
        tags: ["reglage", "positions", "temperature"],
        cosc: "5 positions, 3 températures"
      },
      { 
        id: 'inertie-balancier', 
        title: "Moment d'Inertie", 
        desc: "I = ½mr². Vibration 28'800 alt/h. Inertie 10-15 mg·cm².", 
        level: "Expert",
        tags: ["physique", "inertie", "vibration"],
        formula: "I = ½mr²"
      },
      { 
        id: 'taux-oscillation', 
        title: "Taux d'Oscillation", 
        desc: "18'000, 21'600, 28'800, 36'000 alt/h. Vibration moderne.", 
        level: "Intermédiaire",
        tags: ["vibration", "frequence", "modern"],
        standard: "28'800 alt/h (4Hz)"
      },
      { 
        id: 'courbe-reglage', 
        title: "Courbe de Réglage", 
        desc: "Isocronisme. Spirale Breguet ou Philips. Compense température.", 
        level: "Expert",
        tags: ["isochronisme", "spirale", "compensation"],
        patent: ["Breguet 1795"] // ← CORRIGÉ : tableau
      },
      { 
        id: 'index-raquette', 
        title: "Index & Raquette", 
        desc: "Réglage fin longueur effective spirale. Pas 0.1mm.", 
        level: "Intermédiaire",
        tags: ["index", "raquette", "micrometrie"],
        adjustment: "0.1mm = ≈ 30s/jour"
      },
      { 
        id: 'equilibrage-balancier', 
        title: "Équilibrage Dynamique", 
        desc: "Régule masse sur bras. Vibrateur équilibrage.", 
        level: "Expert",
        tags: ["equilibrage", "dynamique", "vibrateur"],
        tolerance: "< 5 μg·cm débalancement"
      },
      { 
        id: 'palier-spiral', 
        title: "Palier de Spiral", 
        desc: "Point fixe. Collier, taquets. Centrage parfait.", 
        level: "Intermédiaire",
        tags: ["palier", "fixation", "collier"],
        material: "Or ou platine"
      },
      { 
        id: 'etude-amplitude', 
        title: "Amplitude du Balancier", 
        desc: "240° à 310° en position. Mesure au chronographe.", 
        level: "Expert",
        tags: ["amplitude", "chronographe", "mesure"],
        optimal: "270-300°"
      },
      { 
        id: 'faulte-battement', 
        title: "Faulte de Battement", 
        desc: "Décalage ancre-spiral. Cause isochronisme défectueux.", 
        level: "Expert",
        tags: ["battement", "erreur", "diagnostic"],
        max: "< 0.02mm"
      },
      { 
        id: 'chronographe-reglage', 
        title: "Réglage Chronométrique", 
        desc: "Appareil à écouter. 6 positions, 24h. Variation < -4/+6s.", 
        level: "Expert",
        tags: ["chronometre", "certification", "cosc"],
        cosc: "-4/+6 s/jour"
      },
      { 
        id: 'spiral-metalloide', 
        title: "Spiral Métalloïde", 
        desc: "Elinvar, Nivarox. Constante d'élasticité thermique.", 
        level: "Expert",
        tags: ["elinvar", "nivarox", "invar"],
        composition: "Fe-Ni-Cr-Be"
      },
      { 
        id: 'reglage-micrometrique', 
        title: "Réglage Micrométrique", 
        desc: "Vis à pas fin 0.20mm. 1 tour = 30s/jour.", 
        level: "Intermédiaire",
        tags: ["micrometrique", "vis", "reglage"],
        pitch: "0.20mm"
      }
    ]
  },
  
  {
    id: 'diagnostic',
    title: "🔧 Diagnostic & Dépannage",
    icon: "Wrench",
    color: "from-gray-500 to-slate-600",
    concepts: [
      { 
        id: 'diagnostic-arret', 
        title: "Mouvement à l'Arrêt", 
        desc: "Spiral collé, ancre bloquée, barillet détendu. Arbre de première brisé.", 
        level: "Débutant",
        tags: ["arret", "diagnostic", "depannage"],
        checklist: ["Spiral libre?", "Ancre mobile?", "Barillet remonté?"]
      },
      { 
        id: 'amplitude-faible', 
        title: "Amplitude < 220°", 
        desc: "Lubrification sèche, spiral touchant, démagnétisation.", 
        level: "Intermédiaire",
        tags: ["amplitude", "lubrification", "demagnetisation"],
        causes: ["Sécheresse", "Décohésion", "Magnétisme"]
      },
      { 
        id: 'roue-libre-ronron', 
        title: "Ronronnement Roue Libre", 
        desc: "Graissage insuffisant. 1 goutte Moebius 9010.", 
        level: "Débutant",
        tags: ["roue-libre", "bruit", "graissage"],
        solution: "Moebius 9010 roue libre"
      },
      { 
        id: 'defaut-isochronisme', 
        title: "Défaut d'Isochronisme", 
        desc: "Amplitude varie avec détente. Spirale défectueuse.", 
        level: "Expert",
        tags: ["isochronisme", "amplitude", "defaut"],
        test: "24h à différentes positions"
      },
      { 
        id: 'trottoir-ecappement', 
        title: "Trottoir sur Ancre", 
        desc: "Matière arrachée sur palettes. Rehausse nécessaire.", 
        level: "Expert",
        tags: ["trottoir", "usure", "ancre"],
        repair: "Rehausse laser ou remplacement"
      },
      { 
        id: 'magnetisation', 
        title: "Détection Magnétisation", 
        desc: "Boussole, détecteur Gauss. Champ > 60 Gauss.", 
        level: "Intermédiaire",
        tags: ["magnetisme", "detection", "gauss"],
        limit: "> 60 Gauss = démagnétiser"
      },
      { 
        id: 'demagnetisation-procedure', 
        title: "Procédure Démagnétisation", 
        desc: "Déma devolutor. Mouvement tournant, champ décroissant.", 
        level: "Intermédiaire",
        tags: ["demagnetisation", "procedure", "champ"],
        device: "Déma Devolutor 2 200"
      },
      { 
        id: 'centre-amplitude', 
        title: "Amplitude au Centre", 
        desc: "Montre au poignet. 240-260° acceptable.", 
        level: "Expert",
        tags: ["centre", "amplitude", "port"],
        wrist: "240-260° normal"
      }
    ]
  },
  
  {
    id: 'histoire',
    title: "📜 Histoire & Manufactures",
    icon: "Scroll",
    color: "from-amber-700 to-yellow-600",
    concepts: [
      { 
        id: 'calibre-12-lignes', 
        title: "Calibre 12 Lignes", 
        desc: "Diamètre 27mm. Standard homme classique. ETA 2892.", 
        level: "Débutant",
        tags: ["calibre", "lignes", "standard"],
        size: "12 lignes = 27.07mm"
      },
      { 
        id: 'lepine-construction', 
        title: "Construction Lépine", 
        desc: "Ancre à côté barillet. Platine plate. 1760.", 
        level: "Intermédiaire",
        tags: ["lepine", "historique", "construction"],
        inventor: "Jean-Antoine Lépine 1760"
      },
      { 
        id: 'montre-lepine', 
        title: "Montre Lépine", 
        desc: "Aiguilles en ligne. Cadran ouvert. Mouvement plat.", 
        level: "Débutant",
        tags: ["lepine", "cadran", "plat"],
        characteristic: "Aiguilles superposées"
      },
      { 
        id: 'calibre-eta-2824', 
        title: "ETA Calibre 2824-2", 
        desc: "Automatique 25 rubis. 28'800 alt/h. Workhorse moderne.", 
        level: "Débutant",
        tags: ["eta", "standard", "automatique"],
        specs: "25 rubis, 38h réserve"
      },
      { 
        id: 'rolex-3135', 
        title: "Rolex Calibre 3135", 
        desc: "Chronomètre certifié. Parachrom, KIF. 1988-2020.", 
        level: "Intermédiaire",
        tags: ["rolex", "chronometre", "parachrom"],
        production: "1988-2020, remplacé par 3235" // ← OK car [key: string]: any
      },
      { 
        id: 'patek-324', 
        title: "Patek 324 SC", 
        desc: "Finissage Genève. Gyromax, Spiromax. 4.27mm épais.", 
        level: "Expert",
        tags: ["patek", "genève", "gyromax"],
        decoration: "Poinçon Genève"
      },
      { 
        id: 'lange-l901', 
        title: "A. Lange L901.0", 
        desc: "Platine 3/4, tourbillon, rattrapante. 425 composants.", 
        level: "Expert",
        tags: ["lange", "platine-3/4", "complication"],
        components: "425 pièces"
      },
      { 
        id: 'co-axial-history', 
        title: "Histoire Co-Axial", 
        desc: "George Daniels 1974. Omega 1999. Lubrification révolution.", 
        level: "Intermédiaire",
        tags: ["coaxial", "daniels", "omega"],
        evolution: "8500, 8900, 9900 series"
      },
      { 
        id: 'spring-drive', 
        title: "Seiko Spring Drive", 
        desc: "Tri-synchro régulateur. Quartz + mécanique. 1977-2004.", 
        level: "Expert",
        tags: ["seiko", "spring-drive", "hybride"],
        accuracy: "±1s/jour"
      },
      { 
        id: 'iso-3158', 
        title: "Norme ISO 3158", 
        desc: "Mouvements horlogers. Terminologie, dimensions.", 
        level: "Expert",
        tags: ["iso", "norme", "standards"],
        scope: "Terminologie et cotes"
      }
    ]
  }
];
