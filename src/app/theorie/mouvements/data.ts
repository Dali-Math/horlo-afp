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
        iso: ["ISO 3158"],
        manufactures: ["ETA", "Sellita", "Ronda"],
        history: "Premières platines en laiton au XVIe siècle. Évolution vers maillechort en 1820.",
        details: {
          principle: "La platine est la fondation mécanique du mouvement. Elle transmet les efforts, maintient les positions géométriques et résiste aux variations thermiques.",
          materials: ["Laiton CuZn37 (standard)", "Maillechort CuNi12Zn28 (haute gamme)", "German Silver CuNiZnAg (Lange)", "Cupro-Cérachrom (Omega)"],
          dimensions: {
            "Épaisseur standard": "1.5 à 3.0 mm",
            "Tolérance planeité": "< 0.02 mm",
            "Dureté surface": "120-180 HV",
            "Rugosité Ra": "0.4 µm"
          },
          adjustment: "Aucun réglage possible post-usinage. La platine est une pièce de dimensionnement critique.",
          commonErrors: ["Déformation lors du dévissage", "Oxydation des surfaces non protégées", "Fissures autour des perçages de fixation"],
          tools: ["Micromètre à porté 0-25mm", "Miroir de surface (planéité)", "Duretomètre Vickers"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/platine/eta-2824-platine.jpg",
          "https://cdn.horlolearn.ch/platine/lange-platine-3-4.jpg"
        ],
        relatedConcepts: ["vis-ponts", "pervage-paliers", "dilatation-thermique"]
      },
      { 
        id: 'platine-materiaux', 
        title: "Matériaux de Platine", 
        desc: "Laiton, maillechort, german silver, Cupro-Cérachrom. Propriétés mécaniques comparées.", 
        level: "Intermédiaire",
        tags: ["matériaux", "laiton", "maillechort", "alliage"],
        iso: ["NIHS 20-05", "ISO 3160"],
        manufactures: ["Patek Philippe", "Audemars Piguet", "Omega"],
        formula: "Résistance à la traction: Rm = Fmax / S0 (MPa)",
        details: {
          principle: "Le choix du matériau impacte la stabilité dimensionnelle, la résistance à la corrosion et le coût de production.",
          materials: [
            "Laiton CuZn37: Rm=370MPa, α=20×10⁻⁶/K, Custo=1x",
            "Maillechort CuNi12: Rm=450MPa, α=18×10⁻⁶/K, Custo=3x", 
            "German Silver: Rm=520MPa, α=16×10⁻⁶/K, Custo=8x",
            "Cupro-Cérachrom: Rm=800MPa, α=12×10⁻⁶/K, Custo=15x"
          ],
          dimensions: {
            "Coefficient dilatation laiton": "α = 19×10⁻⁶/K",
            "Coefficient dilatation maillechort": "α = 16×10⁻⁶/K",
            "Masse volumique laiton": "8.4 g/cm³"
          },
          adjustment: "Pas d'ajustement. Le matériau est choisi en phase de conception.",
          commonErrors: ["Confusion entre laiton et maillechort au niveau visuel", "Corrosion galvanique avec vis acier inox"],
          tools: ["Analyseur XRF (composition)", "Dilatomètre (α)"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/materiaux/laiton-micrographie.jpg",
          "https://cdn.horlolearn.ch/materiaux/maillechort-composition.jpg"
        ],
        relatedConcepts: ["dilatation-thermique", "traitements-surface"]
      },
      { 
        id: 'platine-3-4', 
        title: "Construction à Platine 3/4", 
        desc: "Style Glashütte. Pont unique couvrant 270°. Stabilité maximale, esthétique distinctive.", 
        level: "Expert",
        tags: ["glashutte", "allemand", "stabilité", "pont-unique"],
        manufactures: ["A. Lange & Söhne", "Glashütte Original", "Moritz Grossmann"],
        history: "Développée par Ferdinand A. Lange en 1864 à Glashütte. Reste l'emblème de l'horlogerie allemande.",
        patent: ["Brevet D.R.P. 2543 (1864)"],
        details: {
          principle: "Un seul grand pont soutient barillet, rouage et ancre. Seul le coq est séparé. Réduit les déformations.",
          materials: ["German Silver (maillechort argenté)", "Finissage grainé manuel", "Vis CHC à tête colletée"],
          dimensions: {
            "Couverture": "270° du diamètre",
            "Épaisseur pont": "1.8 à 2.2 mm",
            "Fixation": "3 vis principales"
          },
          adjustment: "Pont ajusté par rodage des patins de support. Tolérance de planéité critique.",
          commonErrors: ["Déformation du pont lors du démontage", "Difficulté d'accès au rouage central"],
          tools: ["Tournevis CHC 1.60mm", "Extracteur de pont", "Jauge d'épaisseur"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/platine-3-4/lange-l901-pont.jpg",
          "https://cdn.horlolearn.ch/platine-3-4/glashutte-saxonette.jpg"
        ],
        relatedConcepts: ["ponts-separes", "coq-balancier", "systeme-fixation"]
      },
      { 
        id: 'ponts-separes', 
        title: "Ponts Séparés Suisse", 
        desc: "Ponts individuels : barillet, rouage, ancre, coq. Finitions décoratives élaborées.", 
        level: "Intermédiaire",
        tags: ["suisse", "decoration", "coq", "ponts-multiples"],
        manufactures: ["Patek Philippe", "Vacheron Constantin", "Breguet", "Jaeger-LeCoultre"],
        history: "Apparition au XVIIIe siècle. Permet l'anglage et les Côtes de Genève. Norme suisse depuis 1850.",
        details: {
          principle: "Chaque fonction a son pont. Facilite l'entretien et permet des finitions visibles.",
          materials: ["Laiton rhodié (standard)", "Maillechort (haute gamme)", "Or 18k (pièces exceptionnelles)"],
          dimensions: {
            "Pont barillet": "0.8 mm d'épaisseur",
            "Pont rouage": "0.6 mm d'épaisseur",
            "Vis standards": "M1.2 à M1.6"
          },
          adjustment: "Ajustage individuel par rodage des patins. Chronométrage après chaque montage.",
          commonErrors: ["Mélange des vis entre ponts", "Déformation lors du serrage non uniforme"],
          tools: ["Jeu de tournevis CHC", "Comparateur de hauteur", "Lime à platine"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/ponts-separes/patek-240-ps.jpg",
          "https://cdn.horlolearn.ch/ponts-separes/vacheron-2460.jpg"
        ],
        relatedConcepts: ["vis-ponts", "cotes-geneve", "anglage"]
      },
      { 
        id: 'coq-balancier', 
        title: "Le Coq (Pont du Balancier)", 
        desc: "Nom traditionnel suisse. Forme sculptée, gravée. Pièce maîtresse esthétique du mouvement.", 
        level: "Débutant",
        tags: ["terminologie", "esthetique", "tradition", "gravure"],
        manufactures: ["Patek Philippe", "Vacheron Constantin", "Audemars Piguet"],
        history: "Terme suisse du XVIe siècle. Forme originale évoquant un coq. Devenu élément artistique visible au fond.",
        details: {
          principle: "Pont du balancier souvent le plus décoré. Forme sculptée pour rigidité et esthétique.",
          materials: ["Maillechort gravé", "Or 18k (pièces d'art)", "Platine (haute complication)"],
          dimensions: {
            "Hauteur typique": "4-6 mm",
            "Épaisseur base": "1.2-1.5 mm",
            "Poids": "0.5-2.0 g"
          },
          adjustment: "Réglage du jeu axial par vis excentrée. Position critique pour l'amplitude.",
          commonErrors: ["Gravure endommagée par solvents", "Déformation par choc", "Perte de vis de fixation"],
          tools: ["Ouvre-cadran", "Extracteur de coq", "Touret à graver"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/coq/patek-spiral-cock.jpg",
          "https://cdn.horlolearn.ch/coq/vacheron-malte-cock.jpg"
        ],
        relatedConcepts: ["pervage-paliers", "balancier-reglage", "finitions-decoratives"]
      },
      { 
        id: 'vis-ponts', 
        title: "Vis de Ponts", 
        desc: "Vis CHC avec tête colletée. Pas 0.60mm, 0.80mm. Couple de serrage précis.", 
        level: "Intermédiaire",
        tags: ["vis", "assemblage", "couple", "chc"],
        iso: ["ISO 15072"],
        manufactures: ["ETA", "Sellita", "Rolex"],
        formula: "Couple serrage (N·mm) = 0.2 × diamètre (mm) × classe résistance",
        details: {
          principle: "Transmission effort de serrage sans déformation. Tête colletée pour butée précise.",
          materials: ["Acier inox A2-70 (standard)", "Acier au chrome A4-80 (haute résistance)", "Titane (ultra-léger)"],
          dimensions: {
            "Diamètre": "M0.8 à M1.6",
            "Pas standard": "0.60mm (M1.2)",
            "Couple M1.2": "15-20 N·mm"
          },
          adjustment: "Serrage en croix. Couple contrôlé par dynamomètre. Pas de serrage-désserrage répété.",
          commonErrors: ["Couple trop élevé → déformation", "Mélange vis inox et acier → galvanisation", "Pas filet endommagé"],
          tools: ["Tournevis CHC 1.60mm", "Dynamomètre calibreé", "Lubrifiant Moebius 9504"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/vis/vis-chc-1-2.jpg",
          "https://cdn.horlolearn.ch/vis/couple-dynamometre.jpg"
        ],
        relatedConcepts: ["systeme-fixation", "chocs-incabloc", "pervage-paliers"]
      },
      { 
        id: 'chocs-incabloc', 
        title: "Système de Chocs Incabloc", 
        desc: "Protection pivots contre chocs. Ressort lyre, fourche de blocage.", 
        level: "Intermédiaire",
        tags: ["protection", "anti-choc", "incabloc", "pivots"],
        manufactures: ["Incabloc SA", "KIF", "Etashoc"],
        patent: ["Brevet CH 254 432 (1934)"],
        history: "Développé par F. Marti en 1933. Devenu standard industriel après 1945.",
        details: {
          principle: "Pivot flotte dans bloc amovible. Ressort lyre absorbe énergie lors de choc. Renvoi automatique au centre.",
          materials: ["Bloc: Acier durci 52-56 HRC", "Ressort: Bronze élastique", "Capacité: 5000 g choc"],
          dimensions: {
            "Diamètre pivot protégé": "0.08-0.25 mm",
            "Course latérale": "±0.15 mm",
            "Hauteur totale": "1.2 mm"
          },
          adjustment: "Montage par pression du bloc. Vérification jeu radial après installation.",
          commonErrors: ["Bloc mal positionné → blocage", "Ressort décroché → perte protection", "Jeu excessif → mauvais centrement"],
          tools: ["Presseur de bloc", "Pince à ressort lyre", "Micromètre 0-10mm"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/incabloc/bloc-incabloc.jpg",
          "https://cdn.horlolearn.ch/incabloc/monte-incabloc.jpg"
        ],
        relatedConcepts: ["fixation-cadran", "pivots-carbones", "pervage-paliers"]
      },
      { 
        id: 'fixation-cadran', 
        title: "Fixation du Cadran", 
        desc: "Pieds de cadran, vis cadran. Alignement précis. Indexage horaire.", 
        level: "Débutant",
        tags: ["cadran", "alignement", "indexage", "assemblage"],
        iso: ["ISO 3765"],
        manufactures: ["Rolex", "Omega", "Tissot"],
        details: {
          principle: "Deux pieds + vis garantissant parallélisme et centrage du cadran. Indexage horaire par ergot ou pastilles.",
          materials: ["Pieds laiton (standard)", "Vis M1.4 chromées", "Pastilles indexage (polyamide)"],
          dimensions: {
            "Diamètre vis cadran": "M1.4",
            "Couple serrage": "8-12 N·mm",
            "Tolérance alignment": "±0.05 mm"
          },
          adjustment: "Positionnement par gabarit. Serrage croisé. Vérification sous loupe 5x.",
          commonErrors: ["Cadran décentré → aiguilles frottent", "Vis trop longues → touchent le mouvement", "Indexage mal positionné → chiffres décalés"],
          tools: ["Gabarit de centrage", "Tournevis cadran 1.40mm", "Loupe binoculaire"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/cadran/fixation-pieds.jpg",
          "https://cdn.horlolearn.ch/cadran/indexage-ergot.jpg"
        ],
        relatedConcepts: ["vis-ponts", "chocs-incabloc"]
      },
      { 
        id: 'dilatation-thermique', 
        title: "Coefficient de Dilatation Thermique", 
        desc: "α = 19×10⁻⁶/K pour laiton. Impact sur jeux et précision.", 
        level: "Expert",
        tags: ["physique", "temperature", "precision", "coefficient"],
        formula: "ΔL = L₀ × α × ΔT",
        manufactures: ["Toutes manufactures haute gamme"],
        details: {
          principle: "Dilatation thermique différentielle entre platine (α≈19) et pivots (acier α≈12) modifie les jeux et frottements.",
          materials: ["Platine laiton: α=19×10⁻⁶/K", "Pivots acier: α=12×10⁻⁶/K", "Spiral Nivarox: α=5×10⁻⁶/K"],
          dimensions: {
            "Déformation 1mm (ΔT=30°C)": "ΔL=0.57 µm (laiton)",
            "Variation jeu pivot": "±0.2 µm",
            "Impact amplitude": "±10°"
          },
          adjustment: "Compensation par choix matériaux (maillechort α=16) ou conception isotherme.",
          commonErrors: ["Calculs négligés → variations positions", "Mélange matériaux incompatibles → déformations importantes"],
          tools: ["Dilatomètre", "Chambre climatique", "Chronocomparateur"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/physique/dilatation-platine.jpg",
          "https://cdn.horlolearn.ch/physique/courbe-dilatation.jpg"
        ],
        relatedConcepts: ["platine-materiaux", "stabilite-dimensionnelle", "spiral-metalloide"]
      },
      { 
        id: 'traitements-surface', 
        title: "Traitements de Surface", 
        desc: "Rhodiage, PVD, DLC. Dureté, corrosion, esthétique.", 
        level: "Intermédiaire",
        tags: ["rhodium", "dlc", "pvd", "traitement", "protection"],
        manufactures: ["Rolex (DLC)", "Omega (Sedna gold)", "Hublot (Magic Gold)"],
        details: {
          principle: "Dépôt physique ou électrochimique pour améliorer dureté, résistance corrosion et aspect.",
          materials: ["Rhodium galvanique: 0.5-2µm", "DLC: 2-5µm, 4000HV", "PVD Titane: 1-3µm"],
          dimensions: {
            "Dureté rhodium": "800 HV",
            "Dureté DLC": "3500-4500 HV",
            "Résistance corrosion": "CCT > 1000h (DLC)"
          },
          adjustment: "Aucun. Processus industriel contrôlé. Polissage avant traitement essentiel.",
          commonErrors: ["Mauvaise préparation → adhérence faible", "Décoloration UV (PVD)", "Micro-fissures sous contrainte"],
          tools: ["Micro-duretomètre", "Calotte d'usure", "Test CCT"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/traitements/rhodiage-electrolytique.jpg",
          "https://cdn.horlolearn.ch/traitements/dlc-omega.jpg"
        ],
        relatedConcepts: ["cotes-geneve", "anglage", "perlage"]
      },
      { 
        id: 'perlage', 
        title: "Technique du Perlage", 
        desc: "Cercles imbriqués avec meule rotative. 0.12mm de diamètre.", 
        level: "Expert",
        tags: ["decoration", "finition", "artisanat", "perlage"],
        manufactures: ["Breguet", "Vacheron Constantin", "Audemars Piguet"],
        history: "Technique ancestrale. Nom vient du 'perle' obtenue. Mécanisé mais reste manuel en haute horlogerie.",
        details: {
          principle: "Meule rotative à grain diamanté crée des cercles imbriqués. Motif décoratif et réduit frottements.",
          materials: ["Meule diamant D=2mm", "Lubrifiant Moebius 9501", "Platine laiton ou maillechort"],
          dimensions: {
            "Diamètre perle": "0.10-0.15 mm",
            "Superposition": "30-40%",
            "Vitesse meule": "15'000 tr/min"
          },
          adjustment: "Pression et vitesse constantes. Repérage visuel. Homogénéité essentielle.",
          commonErrors: ["Pression inégale → diamètres variables", "Meule usée → pattes irrégulières", "Vitesse trop haute → écaillage"],
          tools: ["Touret horloger", "Meules diamant", "Microscope 10x"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/perlage/technique-perlage.jpg",
          "https://cdn.horlolearn.ch/perlage/platine-perlee.jpg"
        ],
        relatedConcepts: ["cotes-geneve", "anglage", "finitions-decoratives"]
      },
      { 
        id: 'cotes-geneve', 
        title: "Côtes de Genève", 
        desc: "Vagues parallèles à la meule. 0.50mm d'espacement. Emblème horlogerie suisse.", 
        level: "Expert",
        tags: ["decoration", "geneve", "vagues", "finition"],
        manufactures: ["Patek Philippe", "Vacheron Constantin", "Cartier"],
        history: "Apparition à Genève au XIXe siècle. D'abord pour réduire poussière, devenu signe qualité.",
        details: {
          principle: "Meule abrasive crée des stries parallèles. Longueur, profondeur et espacement contrôlés.",
          materials: ["Meule abrasive grain 400-800", "Pont maillechort pré-polished", "Lubrifiant minéral"],
          dimensions: {
            "Espacement": "0.45-0.55 mm",
            "Profondeur": "3-5 µm",
            "Largeur strie": "0.08 mm"
          },
          adjustment: "Angle meule // axe pont. Vitesse avance constante. Repérage visuel.",
          commonErrors: ["Meule usée → stires irrégulières", "Vibration → motifs ondulés", "Mauvais angle → aspect brossé"],
          tools: ["Touret à guidage linéaire", "Meules abrasives", "Lunette loupe 4x"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/cotes-geneve/finition-geneve.jpg",
          "https://cdn.horlolearn.ch/cotes-geneve/pont-lange.jpg"
        ],
        relatedConcepts: ["anglage", "perlage", "finitions-decoratives"]
      },
      { 
        id: 'anglage', 
        title: "Anglage (Chanfreinage 45°)", 
        desc: "Polissage arêtes des ponts à 45°. Travail manuel exigeant.", 
        level: "Expert",
        tags: ["polissage", "chanfrein", "artisanat", "finition"],
        manufactures: ["Philippe Dufour", "F.P. Journe", "Kari Voutilainen"],
        history: "Finition aristocratique. Seulement maintenu en haute horlogerie indépendante.",
        details: {
          principle: "Lime manuelle à 45° puis polissage à la pierre d'agate. Surface miroir sur arête vive.",
          materials: ["Lime n°4 grain 600", "Pierre agate polissage", "Diamantine pâte abrasive"],
          dimensions: {
            "Angle": "45° ± 1°",
            "Largeur chanfrein": "0.10-0.15 mm",
            "Poli": "Miroir Ra < 0.05 µm"
          },
          adjustment: "Seule la main de l'artisan. 2h par pont. Contrôle sous microscope 50x.",
          commonErrors: ["Angle incorrect → 40° ou 50°", "Poli inégal → lignes visibles", "Arête arrondie → perte netteté"],
          tools: ["Limes courbes n°4", "Pierres agate", "Microscope binoculaire 50x"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/anglage/chanfrein-45.jpg",
          "https://cdn.horlolearn.ch/anglage/polisse-miroir.jpg"
        ],
        relatedConcepts: ["cotes-geneve", "perlage", "gravure-ponts"]
      },
      { 
        id: 'gravure-ponts', 
        title: "Gravure sur Ponts", 
        desc: "Signe de fabrique, numéro calibre. Grafeur manuel ou laser.", 
        level: "Intermédiaire",
        tags: ["identification", "marquage", "laser", "artisanat"],
        manufactures: ["Patek Philippe", "Audemars Piguet", "Breguet"],
        history: "Origine pour signer l'ouvrier. Devenu marque de manufacture et protection anti-contrefaçon.",
        details: {
          principle: "Grafeur à main ou laser YAG creuse métal. Profondeur contrôlée pour durabilité.",
          materials: ["Pont maillechort", "Grafeur carbure", "Laser YAG 1064nm"],
          dimensions: {
            "Profondeur gravure": "0.05-0.10 mm",
            "Largeur trait": "0.03 mm (laser)",
            "Hauteur caractères": "0.8 mm"
          },
          adjustment: "Positionnement par précision mécanique. Angle grafeur 45°. Vérification sous microscope.",
          commonErrors: ["Profondeur insuffisante → usure", "Mauvais angle → illisible", "Laser puissance trop haute → fonte bords"],
          tools: ["Grafeur manuel", "Laser YAG 20W", "Microscope 20x"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/gravure/gravure-main.jpg",
          "https://cdn.horlolearn.ch/gravure/laser-yag.jpg"
        ],
        relatedConcepts: ["finitions-decoratives", "coq-balancier", "cotes-geneve"]
      },
      { 
        id: 'pervage-paliers', 
        title: "Pervage des Paliers", 
        desc: "Alésage diamètre pivot +0.005mm. Rondeur <0.001mm. Finition miroir.", 
        level: "Expert",
        tags: ["usingage", "alesage", "precision", "paliers"],
        iso: ["ISO 286-2"],
        manufactures: ["Rolex", "Breguet", "Zenith"],
        details: {
          principle: "Alésage diamanté ou laser. Tolérance serrée garantit centrage pivot sans jeu excessif.",
          materials: ["Platine laiton semi-dure", "Outils diamant monocristal", "Lubrifiant alésage"],
          dimensions: {
            "Tolérance alésage": "H7 (+0.010/+0.015 mm)",
            "Rondeur": "< 0.001 mm",
            "Rugosité Ra": "< 0.2 µm"
          },
          adjustment: "Alésage en 2 passes (grossière + fine). Mesure au palpeur 3D après usinage.",
          commonErrors: ["Outil usé → conicité", "Température élevée → retassures", "Vibration → rondeur mauvaise"],
          tools: ["Aléseuse CNC", "Palpeur 3D TESA", "Lubrifiant alésage Moebius"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/pervage/alésage-diamant.jpg",
          "https://cdn.horlolearn.ch/pervage/palpeur-3d.jpg"
        ],
        relatedConcepts: ["platine-definition", "vis-ponts", "chocs-incabloc"]
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
        desc: "Rapport 6:1 à 8:1. Denture module 0.15 à 0.25. Première roue du rouage.", 
        level: "Débutant",
        tags: ["barillet", "transmission", "denture", "rouage"],
        manufactures: ["ETA", "Sellita", "Seiko"],
        formula: "R = z_roue / z_pignon (6 ≤ R ≤ 8)",
        details: {
          principle: "Transfert énergie du barillet vers le rouage. Module faible pour compacité.",
          materials: ["Laiton usiné", "Pivots acier durci", "Denture rectifiée"],
          dimensions: {
            "Module standard": "0.20",
            "Diamètre roue": "6-8 mm",
            "Rapport typique": "7:1"
          },
          adjustment: "Ajuste axial par cale. Centrage par pervage platine.",
          commonErrors: ["Denture usée → jeu excessif", "Pivots ovalisés → roue désaxée", "Graissage insuffisant → usure rapide"],
          tools: ["Rouleau à dresser", "Palpeur 2D", "Graisseur Moebius 9010"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/roue-barillet/eta-2824-roue.jpg",
          "https://cdn.horlolearn.ch/roue-barillet/denture-module-020.jpg"
        ],
        relatedConcepts: ["roue-de-rencontre", "engrenage-module", "finissage-roues"]
      },
      { 
        id: 'roue-de-rencontre', 
        title: "Roue de Rencontre", 
        desc: "Première roue du rouage. Pont indépendant. Hauteur contrôlée.", 
        level: "Intermédiaire",
        tags: ["rencontre", "rouage", "pont", "transmission"],
        manufactures: ["ETA", "Valjoux", "Lemania"],
        details: {
          principle: "Première roue intermédiaire entre barillet et rouage fileteur. Pont isolé pour finissage.",
          materials: ["Laiton", "Pivots acier", "Pont laiton"],
          dimensions: {
            "Hauteur au-dessus barillet": "0.25 mm",
            "Tolérance hauteur": "±0.02 mm",
            "Module": "0.20"
          },
          adjustment: "Hauteur ajustée par cale sous palier. Vidage si nécessaire.",
          commonErrors: ["Hauteur mal ajustée → engrenage dur", "Pont déformé → désaxement", "Graissage excès → projections"],
          tools: ["Jauge hauteur", "Cales de 0.01mm", "Graisseur fin"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/roue-rencontre/pont-independant.jpg",
          "https://cdn.horlolearn.ch/roue-rencontre/ajustage-hauteur.jpg"
        ],
        relatedConcepts: ["roue-barillet", "roue-trois-pommes", "systeme-fixation"]
      },
      { 
        id: 'roue-aubier', 
        title: "Roues d'Aubier", 
        desc: "Socle mobile pour roue intermédiaire. Fixation par vis.", 
        level: "Intermédiaire",
        tags: ["aubier", "mobile", "intermediaire", "ajustable"],
        manufactures: ["Breguet", "Jaeger-LeCoultre", "Vacheron Constantin"],
        patent: ["Breguet 1801"],
        history: "Invention Breguet pour contourner contraintes d'usinage. Révolutionné l'horlogerie plate.",
        details: {
          principle: "Roue montée sur socle pivotant. Permet ajustement rayon engrenage sans modifier platine.",
          materials: ["Socle laiton", "Roue laiton", "Vis M1.2"],
          dimensions: {
            "Course ajustage": "±0.1 mm",
            "Pivots socle": "0.15 mm",
            "Serrage vis": "12 N·mm"
          },
          adjustment: "Déplacement radial par rotation socale. Verrouillage vis après chronométrage.",
          commonErrors: ["Socle qui bouge → désaxement", "Course insuffisante → mauvais engrenage", "Vis desserrée → jeu"],
          tools: ["Tournevis M1.2", "Pince à aubier", "Chronocomparateur"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/roue-aubier/breguet-aubier.jpg",
          "https://cdn.horlolearn.ch/roue-aubier/ajustage-socle.jpg"
        ],
        relatedConcepts: ["roue-trois-pommes", "engrenage-module", "roue-de-rencontre"]
      },
      { 
        id: 'roue-trois-pommes', 
        title: "Roue à Trois Pommes", 
        desc: "Roue de seconde avec 3 branches. Légèreté et équilibrage.", 
        level: "Débutant",
        tags: ["seconde", "equilibrage", "design", "legerete"],
        manufactures: ["Rolex", "Omega", "ETA"],
        details: {
          principle: "Réduction masse tout en maintenant rigidité. 3 branches à 120°. Centrage amélioré.",
          materials: ["Laiton ou or", "Pivots acier", "Equilibre dynamique"],
          dimensions: {
            "Masse réduite": "-40% vs roue pleine",
            "Inertie": "0.8 mg·cm² (vs 1.3 pleine)",
            "Rondeur": "< 0.002 mm"
          },
          adjustment: "Equilibrage dynamique après usinage. Repérage masse lourde. Matage ou perçage compensateur.",
          commonErrors: ["Branche mal calée → désaxement", "Equilibrage négligé → vibrations", "Frottement sur platine"],
          tools: ["Vibrateur équilibrage", "Tour diviseur", "Foret 0.3mm"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/roue-trois-pommes/rolex-3135-roue.jpg",
          "https://cdn.horlolearn.ch/roue-trois-pommes/equilibrage-dynamique.jpg"
        ],
        relatedConcepts: ["equilibrage-balancier", "roue-barillet", "finissage-roues"]
      },
      { 
        id: 'engrenage-module', 
        title: "Module d'Engrenage", 
        desc: "m = p/π. Module 0.20 standard calibres modernes. Détermine taille denture.", 
        level: "Expert",
        tags: ["module", "calcul", "standards", "denture"],
        formula: "m = d(z) / z",
        manufactures: ["ETA", "Sellita", "Miyota"],
        details: {
          principle: "Standardisation taille dents. Module petit = compacité. Module grand = robustesse.",
          materials: ["Pas de matériau spécifique (standard)"],
          dimensions: {
            "Module standard": "0.20 (ETA 2824)",
            "Module barillet": "0.25 (robustesse)",
            "Module échappement": "0.09 (précision)"
          },
          adjustment: "Pas d'ajustement. Déterminé en CAO. Vérification par mesure dents.",
          commonErrors: ["Module mal calculé → engrenage dur", "Pas adapté au couple → usure rapide", "Contrôle CAO négligé"],
          tools: ["Loupe à dents", "Projecteur de profil", "Logiciel CAO"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/engrenage/formule-module.jpg",
          "https://cdn.horlolearn.ch/engrenage/profil-dent.jpg"
        ],
        relatedConcepts: ["roue-barillet", "pignon-echappement", "denture-conique"]
      },
      { 
        id: 'denture-conique', 
        title: "Denture Conique", 
        desc: "Roue et pignon à axes non parallèlles. Angle 90°. Complications spatiales.", 
        level: "Expert",
        tags: ["conique", "angle", "complication", "espace"],
        manufactures: ["Audemars Piguet (Royal Oak)", "Cartier (Santos)"],
        details: {
          principle: "Transmission entre arbres orthogonaux. Module variable suivant rayon. Calcul complexe.",
          materials: ["Laiton spécial", "Usinage 5 axes", "Rectification spécifique"],
          dimensions: {
            "Angle": "90° ±5°",
            "Module petit rayon": "0.15",
            "Module grand rayon": "0.25"
          },
          adjustment: "Ajustage axial par cale épaisseur. Chronométrage position verticale.",
          commonErrors: ["Usure concentrée petit rayon", "Bruit élevé (engrenage conique)", "Difficulté de lubrification"],
          tools: ["Machine 5 axes", "Palpeur 3D", "Chronocomparateur vertical"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/denture-conique/roue-conique.jpg",
          "https://cdn.horlolearn.ch/denture-conique/usinage-5-axes.jpg"
        ],
        relatedConcepts: ["roue-aubier", "finissage-roues", "engrenage-module"]
      },
      { 
        id: 'finissage-roues', 
        title: "Finissage des Roues", 
        desc: "Rodage pivots, polissage flancs de dents. Ra < 0.2μm. Réduit frottements.", 
        level: "Expert",
        tags: ["polissage", "rodage", "rugosite", "finition"],
        iso: ["ISO 1302"],
        manufactures: ["Patek Philippe", "Breguet", "Vacheron"],
        details: {
          principle: "Rodage pivots avec pierre d'agate. Polissage flancs pour écoulement lubrifiant optimal.",
          materials: ["Pierres agate grain 800", "Pâte diamantine 1µm", "Lubrifiant rodage"],
          dimensions: {
            "Rugosité Ra pivots": "< 0.1 µm",
            "Rugosité Ra flancs": "< 0.2 µm",
            "Cylindricité": "< 0.5 µm"
          },
          adjustment: "Rodage manuel sous microscope. Contrôle profil avant/après. Graissage immédiat après.",
          commonErrors: ["Rodage excessif → diamètre trop petit", "Décentrage → pivot ovalisé", "Contamination → rayures"],
          tools: ["Touret rodage", "Microscope 50x", "Palpeur rugosité"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/finissage/rodage-pivot.jpg",
          "https://cdn.horlolearn.ch/finissage/rugosite-ra-01.jpg"
        ],
        relatedConcepts: ["roue-barillet", "pivots-carbones", "jeu-pivots"]
      },
      { 
        id: 'pivots-carbures', 
        title: "Pivots Carbure de Silicium", 
        desc: "Dureté 2400 HV. Aucun lubrifiant nécessaire. Anti-magnétique.", 
        level: "Expert",
        tags: ["silicium", "carbure", "ceramique", "anti-usure"],
        manufactures: ["Ulysse Nardin", "Breguet", "Patek Philippe (expérimental)"],
        patent: ["EP 1205823"],
        details: {
          principle: "DRIE (Deep Reactive Ion Etching) crée pivots céramiques. Dureté extrême, pas d'usure.",
          materials: ["Silicium polycristallin", "Carbure de silicium SiC", "Revêtement DLC optionnel"],
          dimensions: {
            "Dureté Vickers": "2400 HV",
            "Rugosité": "Ra < 0.02 µm",
            "Coefficient frottement": "0.05 (sans lubrifiant)"
          },
          adjustment: "Pas d'ajustement. Fabrication batch par wafer DRIE. Contrôle dimensionnel 100%.",
          commonErrors: ["Fragilité aux chocs → rupture", "Difficulté de réparation → remplacement pont complet", "Coût élevé"],
          tools: ["Microscope électronique", "Duretomètre Vickers", "Analyseur spectromètre"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/pivots-silicium/drie-wafer.jpg",
          "https://cdn.horlolearn.ch/pivots-silicium/pivot-carbure.jpg"
        ],
        relatedConcepts: ["chocs-incabloc", "finissage-roues", "rouages-grappe"]
      },
      { 
        id: 'roues-grappe', 
        title: "Roues en Grappe", 
        desc: "Plusieurs roues usinées dans même pièce. Assemblage simplifié.", 
        level: "Intermédiaire",
        tags: ["grappe", "industriel", "efficacite", "assemblage"],
        manufactures: ["ETA", "Sellita", "Miyota"],
        details: {
          principle: "Usinage groupe roues dans même plat. Dégrappage chimique. Réduit coût assemblage.",
          materials: ["Laiton plaque", "Décapant chimique", "Pivots rapportés"],
          dimensions: {
            "Nombre roues par grappe": "10-20",
            "Tolérance grappe": "±0.02 mm",
            "Diamètre trait de scie": "0.15 mm"
          },
          adjustment: "Pas d'ajustement individuel. Dégagement chimique contrôlé. Lubrification groupée.",
          commonErrors: ["Décapage excessif → perte matière", "Bras cassés lors dégrappage", "Déformation thermique"],
          tools: ["Machine décapage", "Lime à dégrapper", "Lubrificateur automatique"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/roue-grappe/grappe-usinee.jpg",
          "https://cdn.horlolearn.ch/roue-grappe/degrappage-chimique.jpg"
        ],
        relatedConcepts: ["engrenage-module", "finissage-roues", "axe-canon"]
      },
      { 
        id: 'axe-canon', 
        title: "Axe-Canon Monobloc", 
        desc: "Pignon et roue usinés ensemble. Concentricité parfaite.", 
        level: "Expert",
        tags: ["monobloc", "concentricite", "precision", "usinage"],
        manufactures: ["Rolex", "Omega Co-Axial", "Grand Seiko"],
        details: {
          principle: "Usinage monobloc évite assemblage. Concentricité < 0.001mm. Réduit perte énergie.",
          materials: ["Laiton usiné", "Pivots rapportés", "Traitement thermique"],
          dimensions: {
            "Concentricité": "< 0.001 mm",
            "Rectitude": "< 0.002 mm",
            "Diamètre pivot": "0.08-0.20 mm"
          },
          adjustment: "Pas d'ajustement possible. Contrôle 100% en production. Rejet au moindre défaut.",
          commonErrors: ["Usinage difficile → taux rebut élevé", "Prix élevé", "Non réparable → remplacement"],
          tools: ["Tour CNC 5 axes", "Palpeur 3D", "Contrôle ombre portée"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/axe-canon/monobloc-usine.jpg",
          "https://cdn.horlolearn.ch/axe-canon/controle-3d.jpg"
        ],
        relatedConcepts: ["finissage-roues", "pivots-carbures", "engrenage-module"]
      },
      { 
        id: 'jeu-pivots', 
        title: "Jeu dans les Paliers", 
        desc: "0.005 à 0.015mm selon diamètre. Lubrification capillarité.", 
        level: "Expert",
        tags: ["jeu", "paliers", "lubrification", "capillarite"],
        iso: ["NIHS 95-10"],
        manufactures: ["Toutes manufactures"],
        formula: "Jeu = D_alésage - D_pivot",
        details: {
          principle: "Jeu minimal pour rotation libre mais centrage. Lubrifiant capillaire maintient film.",
          materials: ["Paliers rubis (pierres)", "Pivots acier durci", "Lubrifiant Moebius 9010"],
          dimensions: {
            "Jeu pivot 0.12mm": "0.008 mm",
            "Jeu pivot 0.16mm": "0.010 mm",
            "Jeu pivot 0.20mm": "0.012 mm"
          },
          adjustment: "Pas d'ajustement. Détermine par alésage et pivot. Vérification sous microscope.",
          commonErrors: ["Jeu trop petit → frottement", "Jeu trop grand → jeu angulaire", "Lubrifiant séché → usure"],
          tools: ["Micromètre 0-10mm", "Microscope 50x", "Lubrificateur precision"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/jeu-pivots/microscope-50x.jpg",
          "https://cdn.horlolearn.ch/jeu-pivots/lubrification-capillaire.jpg"
        ],
        relatedConcepts: ["pervage-paliers", "finissage-roues", "chocs-incabloc"]
      },
      { 
        id: 'roue-libre', 
        title: "Roue Libre de Remontoir", 
        desc: "Débrayage sens unique. Clik-clik autowind.", 
        level: "Intermédiaire",
        tags: ["remontoir", "automatique", "debrayage", "roue-libre"],
        manufactures: ["ETA", "Sellita", "Miyota"],
        patent: ["Brevet CH 247 856"],
        details: {
          principle: "Cliquets autor glissement sens unique. Lubrification Moebius 9010. Montage marche sen mont/arrêt.",
          materials: ["Roue acier durci", "Cliquets carbure", "Ressort retenue"],
          dimensions: {
            "Angle cliquet": "15°",
            "Pression ressort": "0.1 N",
            "Bruit sonore": "55 dB"
          },
          adjustment: "Pas d'ajustage. Graissage cliquets uniquement. Débrayage contrôlé au bruit.",
          commonErrors: ["Sécheresse → cliquets qui collent", "Usure cliquets → débrayage bidirectionnel", "Graissage excessif → projections"],
          tools: ["Graisseur precision", "Lubrifiant 9010", "Stéthoscope acoustique"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/roue-libre/cliquets-autor.jpg",
          "https://cdn.horlolearn.ch/roue-libre/graisse-9010.jpg"
        ],
        relatedConcepts: ["remontoir-bidirectionnel", "masse-oscillante", "roue-barillet"]
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
        tags: ["ancre", "suiss", "pignon", "echappement"],
        iso: ["ISO 3158"],
        manufactures: ["ETA", "Sellita", "Patek Philippe"],
        history: "Standard depuis 1750. Remplace échappement verge. Fiabilité et précision améliorées.",
        details: {
          principle: "Pierre d'ancre bloque/ débloque pignon. Impulsion directe spiral. 2 impulsions/tour.",
          materials: ["Ancre: Acier durci 58-62 HRC", "Pignon: Acier 55 HRC", "Pierres rubis"],
          dimensions: {
            "Angle levage": "52°",
            "Largeur palette impulsion": "0.08 mm",
            "Hauteur pignon": "0.12 mm"
          },
          adjustment: "Levage par ébavurage pierres. Dépouille 15°. Centrage par excentriques.",
          commonErrors: ["Levage trop grand → chevauchement", "Dépouille nulle → butée", "Pierres cassées → arrêt"],
          tools: ["Pince à dépouiller", "Pierces d'ancre", "Microscope 30x"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/echappement/ancre-suiss.jpg",
          "https://cdn.horlolearn.ch/echappement/levage-palette.jpg"
        ],
        relatedConcepts: ["pignon-echappement", "ancre-double", "coq-echappement"]
      },
      { 
        id: 'pignon-echappement', 
        title: "Pignon d'Échappement", 
        desc: "15 dents, module 0.09. Dents de rehausse. Acier trempé.", 
        level: "Expert",
        tags: ["pignon", "dents", "acier", "rehausse"],
        iso: ["NIHS 30-05"],
        manufactures: ["Nivarox", "Atokal", "Patek Philippe"],
        details: {
          principle: "15 dents avec rehausse pour impulsion. Profil spécial pour libération d'ancre. Dureté élevée anti-usure.",
          materials: ["Acier 20MnCr5", "Cémentation 0.2mm", "Durée 58-62 HRC"],
          dimensions: {
            "Module": "0.09",
            "Diamètre pied": "0.12 mm",
            "Longueur dents": "0.50 mm"
          },
          adjustment: "Pas d'ajustement. Usinage ultra-précis. Contrôle 100% au microscope.",
          commonErrors: ["Usure dents → échappement qui saute", "Rehausse lisse → mauvaise impulsion", "Déformation → arrêt"],
          tools: ["Microscope 50x", "Profil-projecteur", "Duretomètre Vickers"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/pignon-echappement/profil-15-dents.jpg",
          "https://cdn.horlolearn.ch/pignon-echappement/rehausse-impulsion.jpg"
        ],
        relatedConcepts: ["echappement-ancre", "ancre-double", "finissage-roues"]
      },
      { 
        id: 'ancre-double', 
        title: "Ancre à Double Queue", 
        desc: "2 palettes d'impulsion + 2 palettes de repos. Échappement suisse standard.", 
        level: "Expert",
        tags: ["palette", "double", "impulsion", "echappement"],
        manufactures: ["ETA", "Patek Philippe", "Vacheron Constantin"],
        details: {
          principle: "4 palettes: 2 impulsettes, 2 de repos. Alternance bloquage/débloquage. 2 impulsions/tour pignon.",
          materials: ["Acier 20MnCr5 trempé", "Polissage miroir palettes", "Pierces rubis"],
          dimensions: {
            "Angle levage": "52°",
            "Distance palettes": "0.30 mm",
            "Largeur palette repos": "0.10 mm"
          },
          adjustment: "Ajustage levage par pierçage. Dépouille impulsettes 45°. Lissage palettes à la pierre d'agate.",
          commonErrors: ["Levage asymétrique → battement", "Dépouille insuffisante → butée", "Poli mauvais → stick-slip"],
          tools: ["Pierces d'ancre", "Pierre agate", "Microscope 30x"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/ancre-double/ancre-4-palettes.jpg",
          "https://cdn.horlolearn.ch/ancre-double/ajustage-levage.jpg"
        ],
        relatedConcepts: ["coq-echappement", "pignon-echappement", "echappement-ancre"]
      },
      { 
        id: 'coq-echappement', 
        title: "Coq d'Échappement", 
        desc: "Maintient ancre et pignon. Réglage fin excentrique.", 
        level: "Intermédiaire",
        tags: ["coq", "excentrique", "reglage", "support"],
        manufactures: ["ETA", "Sellita", "Rolex"],
        details: {
          principle: "Pont rigide maintenant pignon et ancre. Excentriques pour centrage. Accès facilité.",
          materials: ["Pont laiton", "Excentriques acier", "Vis CHC"],
          dimensions: {
            "Excentrique D": "2.0 mm",
            "Course excentrique": "±0.10 mm",
            "Jeux centrages": "0.002 mm"
          },
          adjustment: "Centrage pignon par excentrique. Verrouillage vis M1.4. Contrôle jeu axial.",
          commonErrors: ["Excentrique bloqué → mauvais centrage", "Pont déformé → pas de jeu", "Vis desserrées → mouvement"],
          tools: ["Tournevis CHC", "Pince à excentriques", "Palpeur 2D"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/coq-echappement/excentriques.jpg",
          "https://cdn.horlolearn.ch/coq-echappement/montage-pignon.jpg"
        ],
        relatedConcepts: ["echappement-ancre", "pignon-echappement", "vis-ponts"]
      },
      { 
        id: 'detente-chronometre', 
        title: "Échappement à Détente", 
        desc: "Pour chronomètres. Roue à colonnes, détente spécifique. Marine chronometers.", 
        level: "Expert",
        tags: ["detente", "chronometre", "marine", "historique"],
        manufactures: ["Breguet (historique)", "Ulysse Nardin (rééditions)"],
        history: "John Harrison 1759 (H4). Essentiel pour navigation maritime. Remplacé par ancre suisse en 1850.",
        details: {
          principle: "Détente bloque roue à colonnes. Impulsion par roue, pas par détente. Haute précision temporelle.",
          materials: ["Roue à colonnes acier", "Détente acier trempé", "Ressort de détente"],
          dimensions: {
            "Angle détente": "15°",
            "Colonnes roue": "15",
            "Impulsion": "1/tour"
          },
          adjustment: "Polissage détente à la pierre. Levage minime. Huile fine Moebius 9010 uniquement.",
          commonErrors: ["Détente usée → mauvais blocage", "Roue mal alignée → faux détentes", "Sécheresse → arrêt"],
          tools: ["Pierre polissage", "Microscope 50x", "Huile graisseur"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/detente/breguet-marine.jpg",
          "https://cdn.horlolearn.ch/detente/roue-colonnes.jpg"
        ],
        relatedConcepts: ["echappement-ancre", "chronographe-reglage", "history"]
      },
      { 
        id: 'co-axial', 
        title: "Échappement Co-Axial", 
        desc: "George Daniels 1974. Lubrification réduite. Omega 1999.", 
        level: "Expert",
        tags: ["coaxial", "daniels", "omega", "lubrification"],
        manufactures: ["Omega (Seamaster, Speedmaster)"],
        patent: ["GB 1508022", "EP 084450"],
        history: "Invention George Daniels 1974. Industrialisation Omega 1999. Réduit friction et entretien.",
        details: {
          principle: "3 palettes au lieu de 2. Impulsion tangencielle. Lubrification uniquement sur palettes repos.",
          materials: ["Ancre acier spécial", "Pignon acier cémenté", "Pales Si14 (Omega)"],
          dimensions: {
            "Angle levage": "32° (vs 52° suisse)",
            "Dureté": "58-62 HRC",
            "Intervalle entretien": "10 ans (vs 5 ans)"
          },
          adjustment: "Ajustage palettes uniquement en manufacture. Pas de réglage terrain.",
          commonErrors: ["Pales usées → mauvaise impulsion", "Lubrifiant séché → arrêt", "Coût réparation élevé"],
          tools: ["Microscope spécial", "Outils Omega", "Formation certifiée"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/coaxial/omega-8900.jpg",
          "https://cdn.horlolearn.ch/coaxial/pales-tangencielles.jpg"
        ],
        relatedConcepts: ["echappement-ancre", "spiral-silicium", "masse-oscillante"]
      },
      { 
        id: 'spiral-silicium', 
        title: "Spiral en Silicium", 
        desc: "DRIE fabrication. Anti-magnétique, insensible à la température. Diamant 1.2µm.", 
        level: "Expert",
        tags: ["silicium", "drie", "antimagnetique", "temperature"],
        manufactures: ["Patek Philippe (Spiromax)", "Ulysse Nardin", "Zenith"],
        patent: ["EP 1367495"],
        details: {
          principle: "DRIE gravure profonde. Forme planeur optimale. Revêtement diamant anti-oxydation.",
          materials: ["Silicium pur 99.999%", "Revêtement diamant 1.2µm", "Moule DRIE"],
          dimensions: {
            "Épaisseur": "0.15 mm",
            "Largeur bande": "0.05 mm",
            "Diametre extérieur": "8.0 mm"
          },
          adjustment: "Aucun. Fabrication wafer. Contrôle dimensionnel par interferométrie.",
          commonErrors: ["Fragilité → rupture chocs", "Coût élevé", "Pas de réparation possible"],
          tools: ["Microscope électronique", "Interféromètre", "Chambre jaune"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/spiral-silicium/drie- gravure.jpg",
          "https://cdn.horlolearn.ch/spiral-silicium/spiromax-patek.jpg"
        ],
        relatedConcepts: ["spiral-parachrom", "co-axial", "masse-oscillante"]
      },
      { 
        id: 'spiral-parachrom', 
        title: "Spiral Parachrom (Rolex)", 
        desc: "Alliage Nb-Zr-O. 10x plus résistant aux chocs. Bleu par anodisation.", 
        level: "Intermédiaire",
        tags: ["rolex", "parachrom", "niobium", "alliage"],
        manufactures: ["Rolex (exclusif)"],
        patent: ["EP 1208483"],
        details: {
          principle: "Alliage Nb-Zr-O amorphe. Anti-magnétique, anti-corrosion. Traitement surface bleu anodique.",
          materials: ["Niobium 85%", "Zirconium 15%", "Oxygène dopant"],
          dimensions: {
            "Module Young": "105 GPa",
            "Résistance chocs": "10x vs Nivarox",
            "Dureté surface": "400 HV"
          },
          adjustment: "Aucun. Spiraux testés individuellement. Sélection isochronisme.",
          commonErrors: ["Contrefaçons pas de bleu", "Tests isochronisme drastiques", "Coût très élevé"],
          tools: ["Spectromètre XRF", "Testeur isochronisme", "Microscope 50x"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/parachrom/spiral-bleue.jpg",
          "https://cdn.horlolearn.ch/parachrom/alliage-nb-zr.jpg"
        ],
        relatedConcepts: ["spiral-silicium", "masse-oscillante", "taux-oscillation"]
      },
      { 
        id: 'masse-oscillante', 
        title: "Masse Oscillante", 
        desc: "Perle, micro-rotor, centre. Roulements ou pivots. Bidirectionnel.", 
        level: "Débutant",
        tags: ["automatique", "rotor", "roulement", "remontoir"],
        manufactures: ["ETA", "Sellita", "Patek (Micro-rotor)"],
        details: {
          principle: "Gravité + mouvement poignet → oscillation → remontage barillet. 3 architectures: perle, micro-rotor, centre.",
          materials: ["Masse laiton + or/platine", "Roulements 6801ZZ", "Paliers ouverts"],
          dimensions: {
            "Masse standard": "3-5 g",
            "Roulement D": "12 mm",
            "Angle oscillation": "±45°"
          },
          adjustment: "Equilibrage statique. Graissage roulements. Décalage si bruit.",
          commonErrors: ["Roulements usés → bruit", "Masse désaxée → frottements", "Bidirectionnel bloqué → perte autowind"],
          tools: ["Graisseur roulements", "Equilibreuse statique", "Stéthoscope acoustique"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/rotor/perle-eta.jpg",
          "https://cdn.horlolearn.ch/rotor/micro-rotor-patek.jpg"
        ],
        relatedConcepts: ["remontoir-bidirectionnel", "roue-libre", "spiral-parachrom"]
      },
      { 
        id: 'remontoir-bidirectionnel', 
        title: "Remontoir Bidirectionnel", 
        desc: "Renvoi d'angle à cliquets. Monts dans les 2 sens. Rendement 40%.", 
        level: "Expert",
        tags: ["remontoir", "bidirectionnel", "cliquets", "rendement"],
        manufactures: ["ETA", "Sellita", "Seiko (Magic Lever)"],
        details: {
          principle: "Cliquets autoreverse mont barillet sens horlogique uniquement. 2 canaux cliquets déphasés.",
          materials: ["Roue acier durci", "Cliquets carbure", "Ressorts bras"],
          dimensions: {
            "Rendement": "38-42%",
            "Angle cliquet": "15°",
            "Bruit sonore": "52 dB"
          },
          adjustment: "Graissage cliquets Moebius 9010. Pas d'ajustement mécanique. Remplacement si usure.",
          commonErrors: ["Graissage excessif → projections → platine sale", "Cliquets émoussés → rendement", "Retournement mal synchronisé"],
          tools: ["Graisseur precision", "Stéthoscope", "Testeur autowind"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/remontoir/bidirectionnel-eta.jpg",
          "https://cdn.horlolearn.ch/remontoir/cliquets-autor.jpg"
        ],
        relatedConcepts: ["roue-libre", "masse-oscillante", "roue-barillet"]
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
        desc: "Vis sans fin, rondelles de réglage. 5 positions, 3 températures. COSC.", 
        level: "Expert",
        tags: ["reglage", "positions", "temperature", "cosc", "certification"],
        iso: ["ISO 3159"],
        manufactures: ["Rolex", "Omega", "Breitling"],
        details: {
          principle: "Modification inertie balancier par vis/rondelles. Optimisation isochronisme positions et températures.",
          materials: ["Rondelles Or 750", "Vis sans fin acier", "Balancier Glucydur"],
          adjustment: "5 positions (plat, 2x couronne, 2x pendant). 3 températures (8°, 23°, 38°). Variation < -4/+6s.",
          commonErrors: ["Rondelles dévissées → déséquilibre", "Poli balancier endommagé → mauvais résultat", "Sélection rondelles → temps"],
          tools: ["Chronocomparateur Witschi", "Chambre climatique", "Démaimanteur", "Loupe 10x"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/reglage/balancier-rolex.jpg",
          "https://cdn.horlolearn.ch/reglage/chronocomparateur.jpg"
        ],
        relatedConcepts: ["inertie-balancier", "taux-oscillation", "courbe-reglage"]
      },
      { 
        id: 'inertie-balancier', 
        title: "Moment d'Inertie", 
        desc: "I = ½mr². Vibration 28'800 alt/h. Inertie 10-15 mg·cm².", 
        level: "Expert",
        tags: ["physique", "inertie", "vibration", "calcul"],
        formula: "I = ½mr²",
        manufactures: ["Toutes manufactures"],
        details: {
          principle: "Inertie détermine cadence. Plus inertie élevée, plus stable mais répond moins aux variations couple.",
          materials: ["Glucydur (Be-Cu)", "Nivarox", "Or (haute horlogerie)"],
          dimensions: {
            "Inertie standard": "12 mg·cm²",
            "Masse balancier": "30-50 mg",
            "Rayon giration": "3.5 mm"
          },
          adjustment: "Calculé en CAO. Vérifié par oscillateur. Rondelles ajustent.",
          commonErrors: ["Inertie mal calculée → isochronisme mauvais", "Masse non homogène → battement", "Résonance → amplitudes parasites"],
          tools: ["Logiciel CAO", "Vibrateur balancier", "Analyseur FFT"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/inertie/formule-moment.jpg",
          "https://cdn.horlolearn.ch/inertie/balancier-glucydur.jpg"
        ],
        relatedConcepts: ["taux-oscillation", "balancier-reglage", "equilibrage-balancier"]
      },
      { 
        id: 'taux-oscillation', 
        title: "Taux d'Oscillation", 
        desc: "18'000, 21'600, 28'800, 36'000 alt/h. Vibration moderne.", 
        level: "Intermédiaire",
        tags: ["vibration", "frequence", "modern", "alt/h"],
        manufactures: ["ETA (28'800)", "Zenith (36'000)", "Seiko (21'600)"],
        details: {
          principle: "Cadence balancier. Plus élevé = meilleure stabilité mais plus frottements et usure.",
          materials: ["Spiral court (36k)", "Pivots durs (36k)", "Lubrifiant spécial (36k)"],
          dimensions: {
            "Standard moderne": "28'800 alt/h (4Hz)",
            "El Primero": "36'000 alt/h (5Hz)",
            "Classique": "18'000 alt/h (2.5Hz)"
          },
          adjustment: "Pas d'ajustement. Déterminé par conception. Spirale et masse adaptées.",
          commonErrors: ["Mauvaise lubrification (36k) → usure rapide", "Amplitude faible (36k) → 240° au lieu 300°", "Pivots ovalisés (36k) → courbés"],
          tools: ["Chronocomparateur", "Microphone haute fréquence", "Analyseur amplitude"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/oscillation/frequences-comp.jpg",
          "https://cdn.horlolearn.ch/oscillation/spirale-36k.jpg"
        ],
        relatedConcepts: ["spiral-parachrom", "courbe-reglage", "balancier-reglage"]
      },
      { 
        id: 'courbe-reglage', 
        title: "Courbe de Réglage", 
        desc: "Isocronisme. Spirale Breguet ou Philips. Compense température.", 
        level: "Expert",
        tags: ["isochronisme", "spirale", "compensation", "breguet", "philips"],
        patent: ["Breguet 1795"],
        manufactures: ["Patek Philippe", "Breguet (historique)"],
        details: {
          principle: "Forme spirale optimise développement thermique. Rétrécit/expansion compense propriétés matériau.",
          materials: ["Spiral Elinvar", "Forme Breguet (overcoil)", "Forme Philips (terminaison)"],
          dimensions: {
            "Hauteur overcoil": "0.50 mm",
            "Rayon terminason": "0.80 mm",
            "Compensation": "±2 s/°C"
          },
          adjustment: "Formage à la main par artisan. Contrôle interferométrie. Sélection meilleurs résultats pour COSC.",
          commonErrors: ["Forme incorrecte → mauvaise compensation", "Stress contrainte → rupture", "Cout élevé"],
          tools: ["Touret formage", "Microscope interferomètre", "Chambre climatique"],
        gallery: [
          "https://cdn.horlolearn.ch/courbe/breguet-overcoil.jpg",
          "https://cdn.horlolearn.ch/courbe/philips-terminaison.jpg"
        ],
        relatedConcepts: ["spiral-metalloide", "index-raquette", "balancier-reglage"]
      },
      { 
        id: 'index-raquette', 
        title: "Index & Raquette", 
        desc: "Réglage fin longueur effective spirale. Pas 0.1mm. 1 tour = 30s/jour.", 
        level: "Intermédiaire",
        tags: ["index", "raquette", "micrometrie", "reglage"],
        manufactures: ["ETA", "Sellita", "Rolex"],
        formula: "ΔR = 30s/tour (approx)",
        details: {
          principle: "Déplacement index modifie longueur active spirale. Raquette guide index. Pas fin pour précision.",
          materials: ["Index acier", "Raquette maillechort", "Vis sans fin"],
          dimensions: {
            "Pas index": "0.10 mm",
            "Course totale": "±2 tours",
            "Déplacement 1 cran": "±30s/j"
          },
          adjustment: "Outil index. Déplacement cran par cran. Mesure après chaque cran au chronocomparateur.",
          commonErrors: ["Index qui saute → déréglage", "Crans usés → pas précis", "Raquette bloquée → impossibilité réglage"],
          tools: ["Outil index", "Chronocomparateur", "Loupe 10x"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/index-raquette/reglage-cran.jpg",
          "https://cdn.horlolearn.ch/index-raquette/pas-01mm.jpg"
        ],
        relatedConcepts: ["balancier-reglage", "courbe-reglage", "reglage-micrometrique"]
      },
      { 
        id: 'equilibrage-balancier', 
        title: "Équilibrage Dynamique", 
        desc: "Régule masse sur bras. Vibrateur équilibrage. <5µg·cm déséquilibre.", 
        level: "Expert",
        tags: ["equilibrage", "dynamique", "vibrateur", "precision"],
        iso: ["ISO 1940-1"],
        manufactures: ["Rolex", "Patek Philippe", "Audemars Piguet"],
        details: {
          principle: "Masse homogène sur bras balancier. Vibrateur détecte déséquilibre. Matage/perçage compense.",
          materials: ["Balancier Glucydur", "Rondelles masse", "Vis sans fin"],
          dimensions: {
            "Déséquilibre max": "< 5 µg·cm",
            "Vitesse test": "28'800 alt/h",
            "Compensation": "±2 mg"
          },
          adjustment: "Vibrateur automatique. Repérage position lourde. Matage ou perçage compensateur.",
          commonErrors: ["Matage incorrect → surcompensation", "Fissure bras → rejet", "Température → variation masse"],
          tools: ["Vibrateur équilibrage", "Foret 0.3mm", "Marteau matoir"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/equilibrage/vibrateur-auto.jpg",
          "https://cdn.horlolearn.ch/equilibrage/balancier-equilibre.jpg"
        ],
        relatedConcepts: ["roue-trois-pommes", "inertie-balancier", "taux-oscillation"]
      },
      { 
        id: 'palier-spiral', 
        title: "Palier de Spiral", 
        desc: "Point fixe. Collier, taquets. Centrage parfait. Matière Or/Platine.", 
        level: "Intermédiaire",
        tags: ["palier", "fixation", "collier", "taquets"],
        manufactures: ["Patek Philippe", "Vacheron Constantin", "Breguet"],
        details: {
          principle: "Collier ou taquets maintien spiral. Fixe point de départ. Permet libre développement.",
          materials: ["Collier or 18k", "Taquets maillechort", "Visserie CHC"],
          dimensions: {
            "Diamètre collier": "0.8 mm",
            "Force serrage": "0.05 N",
            "Position": "Exact centre balancier"
          },
          adjustment: "Soudure laser ou colle. Vérification centrage sous microscope. Ajustement difficile.",
          commonErrors: ["Collier dessoudé → détachement", "Taquets lâches → centre faux", "Soudure laser → surchauffe"],
          tools: ["Soudure laser", "Microscope 50x", "Epoxy horlogère"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/palier-spiral/collier-or.jpg",
          "https://cdn.horlolearn.ch/palier-spiral/soudure-laser.jpg"
        ],
        relatedConcepts: ["spiral-metalloide", "spiral-parachrom", "courbe-reglage"]
      },
      { 
        id: 'etude-amplitude', 
        title: "Amplitude du Balancier", 
        desc: "240° à 310° en position. Mesure au chronographe. 270-300° optimal.", 
        level: "Expert",
        tags: ["amplitude", "chronographe", "mesure", "optimal"],
        manufactures: ["Toutes manufactures"],
        details: {
          principle: "Angle oscillation balancier. Mesuré par microphone ou optique. Indique santé mouvement.",
          materials: ["Microphone haute fréquence", "Capteur optique LED", "Logiciel analyse"],
          dimensions: {
            "Optimal plat": "270-300°",
            "Acceptable": "240-310°",
            "Delta positions": "< 30°"
          },
          adjustment: "Amplitude ajustée par longueur spirale uniquement. Pas de modification directe.",
          commonErrors: ["Amplitude < 220° → défaut lubrification", "Amplitude > 320° → risque rebond", "Delta trop élevé → problème équilibrage"],
          tools: ["Chronocomparateur Witschi", "Microphone piezo", "Logiciel Lepetit"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/amplitude/mesure-microphone.jpg",
          "https://cdn.horlolearn.ch/amplitude/courbe-amplitude.jpg"
        ],
        relatedConcepts: ["chronographe-reglage", "defaut-isochronisme", "spiral-metalloide"]
      },
      { 
        id: 'faute-battement', 
        title: "Faulte de Battement", 
        desc: "Décalage ancre-spiral. Cause isochronisme défectueux. <0.02mm.", 
        level: "Expert",
        tags: ["battement", "erreur", "diagnostic", "ancre", "spiral"],
        manufactures: ["Toutes manufactures"],
        details: {
          principle: "Décalage point de chute palette vs spiral. Causé par mauvais centrage ancre ou index.",
          materials: ["Microscope mesure", "Logiciel analyse", "Ancre balancier"],
          dimensions: {
            "Max toléré": "0.02 mm",
            "Optimal": "0.00 mm",
            "Impact isochronisme": "5s/jour par 0.01mm"
          },
          adjustment: "Centrage ancre par excentriques. Ajustage index. Contrôle microscopique.",
          commonErrors: ["Défaut usinage ancre", "Index mal positionné", "Choc → déplacement"],
          tools: ["Microscope 50x", "Jauge micrométrique", "Analyseur temporel"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/faulte/mesure-decalage.jpg",
          "https://cdn.horlolearn.ch/faulte/impact-iso.jpg"
        ],
        relatedConcepts: ["echappement-ancre", "palier-spiral", "index-raquette"]
      },
      { 
        id: 'chronographe-reglage', 
        title: "Réglage Chronométrique", 
        desc: "Appareil à écouter. 6 positions, 24h. Variation < -4/+6s. COSC.", 
        level: "Expert",
        tags: ["chronometre", "certification", "cosc", "appareil-ecouter"],
        iso: ["ISO 3159"],
        manufactures: ["COSC (certifieurs)", "Rolex", "Omega", "Breitling"],
        details: {
          principle: "Mesure précision 24h, 6 positions, 3 températures. Variation totale < -4/+6s/jour.",
          materials: ["Appareil Witschi", "Chambre climatique", "Microphone haute précision"],
          dimensions: {
            "Positions test": "6 (plat, 2 couronne, 2 pendentif)",
            "Températures": "8°, 23°, 38°C",
            "Durée": "24h par position"
          },
          adjustment: "Sélection mouvements. Réglages fin index. Test consécutifs jusqu'à passage.",
          commonErrors: ["Mouvement non stabilisé → échec", "Sélection aléatoire → faible taux passage", "Coût élevé (CHF 5/movement)"],
          tools: ["Witschi Chronoscope S1", "Chambre Weiss", "Logiciel COSC"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/cosc/appareil-witschi.jpg",
          "https://cdn.horlolearn.ch/cosc/certificat-cosc.jpg"
        ],
        relatedConcepts: ["balancier-reglage", "spiral-metalloide", "etude-amplitude"]
      },
      { 
        id: 'spiral-metalloide', 
        title: "Spiral Métalloïde", 
        desc: "Elinvar, Nivarox. Constante d'élasticité thermique. 28'800 alt/h.", 
        level: "Expert",
        tags: ["elinvar", "nivarox", "invar", "metallode", "alliage"],
        manufactures: ["Nivarox SA", "Swatch Group", "Patek Philippe"],
        formula: "E = σ/ε",
        details: {
          principle: "Alliage Fe-Ni-Cr avec α thermique compensée. Constante d'élasticité stable 0-60°C.",
          materials: ["Nivarox CT: Fe-36Ni-12Cr", "Elinvar: Fe-42Ni-5Cr", "Invar: Fe-36Ni"],
          dimensions: {
            "Coefficient α": "±5×10⁻⁶/K",
            "Module E": "180 GPa",
            "Limite élastique": "1200 MPa"
          },
          adjustment: "Choix grade par manufacture. Pas d'ajustage possible. Sélection isochronisme.",
          commonErrors: ["Contrefaçon → α non compensé", "Fatigue → rupture", "Magnétisation → isochronisme détruit"],
          tools: ["Dilatomètre", "Testeur magnétisme", "Analyseur spectrométrie"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/spirale/nivarox-ct.jpg",
          "https://cdn.horlolearn.ch/spirale/alliage-fe-ni-cr.jpg"
        ],
        relatedConcepts: ["courbe-reglage", "index-raquette", "spiral-parachrom"]
      },
      { 
        id: 'reglage-micrometrique', 
        title: "Réglage Micrométrique", 
        desc: "Vis à pas fin 0.20mm. 1 tour = 30s/jour. Précision extrême.", 
        level: "Intermédiaire",
        tags: ["micrometrique", "vis", "reglage", "precision"],
        manufactures: ["Rolex (Microstella)", "Patek (Gyromax)", "Omega"],
        patent: ["Brevet 1920"],
        details: {
          principle: "Vis M2.5 à pas ultra-fin. Rotation 1 cran = 30s/j. Pas besoin index/raquette.",
          materials: ["Vis acier inox", "Rondelles réglable", "Balancier maillechort"],
          dimensions: {
            "Pas vis": "0.20 mm",
            "Course": "±5 tours",
            "Sensibilité": "30 s/j/tour"
          },
          adjustment: "Outil spécial Rolex/Patek. Réglage cran par cran. Contrôle chronocomparateur.",
          commonErrors: ["Vis bloquée → pas de réglage", "Rondelles qui bougent → dérèglement", "Pas de vis → usure"],
          tools: ["Outil Microstella", "Outil Gyromax", "Chronocomparateur"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/micrometrique/rolex-microstella.jpg",
          "https://cdn.horlolearn.ch/micrometrique/patek-gyromax.jpg"
        ],
        relatedConcepts: ["index-raquette", "balancier-reglage", "equilibrage-balancier"]
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
        tags: ["arret", "diagnostic", "depannage", "checklist"],
        details: {
          principle: "Diagnostic systématique par élimination. Commencer par énergie, puis rouage, puis échappement.",
          materials: ["Checklist papier", "Brucelle", "Loupe 4x"],
          dimensions: {
            "Tension ressort barillet": "> 30% pour démarrage",
            "Amplitude min": "180°",
            "Jeux pivots": "< 0.020 mm"
          },
          adjustment: "Vérification pas à pas. Démarrage manuel par barillet. Ecoute échappement.",
          commonErrors: ["Sauter étapes → diagnostic long", "Forcer composants → casse", "Lubrification sauvage → blocage"],
          tools: ["Checklist", "Brucelle", "Stéthoscope acoustique"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/diagnostic/checklist-depannage.jpg",
          "https://cdn.horlolearn.ch/diagnostic/brucelle-manuelle.jpg"
        ],
        relatedConcepts: ["amplitude-faible", "roue-libre-ronron", "defaut-isochronisme"]
      },
      { 
        id: 'amplitude-faible', 
        title: "Amplitude < 220°", 
        desc: "Lubrification sèche, spiral touchant, démagnétisation nécessaire.", 
        level: "Intermédiaire",
        tags: ["amplitude", "lubrification", "demagnetisation", "diagnostic"],
        details: {
          principle: "Amplitude basse = frottements élevés ou énergie faible. Causes multiples à isoler.",
          materials: ["Testeur amplitude", "Démaimanteur", "Lubrifiant Moebius"],
          dimensions: {
            "Amplitude normale": "270-300°",
            "Seuil alarme": "220°",
            "Abaissement": "-5°/année (vieillissement lubrifiant)"
          },
          adjustment: "Démagnétisation si Bes. Graissage si sécheresse. Changement spiral si touchant.",
          commonErrors: ["Graissage excessif → blocage", "Démagnétisation partielle → revient", "Spiral déformé → touche"],
          tools: ["Chronocomparateur", "Démaimanteur", "Graisseur precision"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/amplitude-faible/test-amplitude.jpg",
          "https://cdn.horlolearn.ch/amplitude-faible/chrono-witschi.jpg"
        ],
        relatedConcepts: ["etude-amplitude", "spiral-silicium", "magnetisation"]
      },
      { 
        id: 'roue-libre-ronron', 
        title: "Ronronnement Roue Libre", 
        desc: "Graissage insuffisant. 1 goutte Moebius 9010.", 
        level: "Débutant",
        tags: ["roue-libre", "bruit", "graissage", "cliquets"],
        details: {
          principle: "Bruit = frottement sec cliquets. Lubrifiant manquant ou épais.",
          materials: ["Moebius 9010", "Graisseur precision", "Stéthoscope"],
          dimensions: {
            "Quantité huile": "1 goutte (0.02 µL)",
            "Viscosité 9010": "17 cSt",
            "Intervalle": "Tous les 5 ans"
          },
          adjustment: "Démontage roue. Nettoyage solvant. Graissage 1 goutte 9010. Test acoustique.",
          commonErrors: ["Trop d'huile → projections → platine sale", "Huile épaisse (8000) → blocage", "Oubli goutte → repasse 1 an"],
          tools: ["Graisseur", "Solvant R603", "Stéthoscope"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/ronron/graisseur-9010.jpg",
          "https://cdn.horlolearn.ch/ronron/stethoscope-acoustique.jpg"
        ],
        relatedConcepts: ["remontoir-bidirectionnel", "masse-oscillante", "diagnostic-arret"]
      },
      { 
        id: 'defaut-isochronisme', 
        title: "Défaut d'Isochronisme", 
        desc: "Amplitude varie avec détente. Spirale défectueuse. Test 24h positions.", 
        level: "Expert",
        tags: ["isochronisme", "amplitude", "defaut", "test", "positions"],
        iso: ["ISO 3159"],
        details: {
          principle: "Variation vitesse selon position. Spirale non concentrique ou mal compensée.",
          materials: ["Testeur isochronisme", "Chronocomparateur", "Logiciel analyse"],
          dimensions: {
            "Variation max": "30 s/j entre positions",
            "Test durée": "24h/position",
            "Positions": "6 (plat, couronne, pendentif)"
          },
          adjustment: "Analyse delta positions. Recentrage spiral si faulte. Remplacement si défectueux.",
          commonErrors: ["Test pas assez long → variations non visibles", "Température variable → fausse mesure", "Spiral touchant → delta élevé"],
          tools: ["Chronocomparateur", "Chambre climatique", "Analyseur temporel"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/isochronisme/test-24h.jpg",
          "https://cdn.horlolearn.ch/isochronisme/centre-amplitude.jpg"
        ],
        relatedConcepts: ["etude-amplitude", "faulte-battement", "spiral-metalloide"]
      },
      { 
        id: 'trottoir-ecappement', 
        title: "Trottoir sur Ancre", 
        desc: "Matière arrachée sur palettes. Rehausse nécessaire.", 
        level: "Expert",
        tags: ["trottoir", "usure", "ancre", "rehausse"],
        details: {
          principle: "Usure localisée par frottement pointe palette. Trottoir = creux. Empêche bon levage.",
          materials: ["Ancre acier", "Pierre rehausse", "Polissage"],
          dimensions: {
            "Profondeur trottoir": "0.01-0.02 mm",
            "Longueur rehausse": "0.5 mm",
            "Largeur palette": "0.08 mm"
          },
          adjustment: "Rehausse laser ou soudure. Polissage pierre d'agathe. Contrôle microscope 30x.",
          commonErrors: ["Rehausse trop haute → chevauchement", "Rehausse désaxée → faux appui", "Poli mauvais → réusure rapide"],
          tools: ["Laser rehausse", "Pierre agate", "Microscope 30x"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/trottoir/trottoir-microscope.jpg",
          "https://cdn.horlolearn.ch/trottoir/rehausse-laser.jpg"
        ],
        relatedConcepts: ["echappement-ancre", "ancre-double", "pignon-echappement"]
      },
      { 
        id: 'magnetisation', 
        title: "Détection Magnétisation", 
        desc: "Boussole, détecteur Gauss. Champ > 60 Gauss.", 
        level: "Intermédiaire",
        tags: ["magnetisme", "detection", "gauss", "diagnostic"],
        details: {
          principle: "Champ magnétique perturbe acier spirale/ancre. Boussole dévie. Gaussmètre mesure.",
          materials: ["Boussole de table", "Gaussmètre numérique", "Testeur détente"],
          dimensions: {
            "Seuil critique": "60 Gauss (ISO 764)",
            "Champ iPhone": "50 Gauss",
            "Champ MRI": "10'000 Gauss"
          },
          adjustment: "Détection: Boussole ou gaussmètre. Démagnétisation si > 60 Gauss.",
          commonErrors: ["Boussole pas précise → faux négatif", "Champ variable → mesure difficile", "Acier non magnétique → rien"],
          tools: ["Boussole", "Gaussmètre GM07", "Test aimant"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/magnetisation/boussole-table.jpg",
          "https://cdn.horlolearn.ch/magnetisation/gaussmetre-num.jpg"
        ],
        relatedConcepts: ["demagnetisation-procedure", "amplitude-faible", "spiral-metalloide"]
      },
      { 
        id: 'demagnetisation-procedure', 
        title: "Procédure Démagnétisation", 
        desc: "Déma devolutor. Mouvement tournant, champ décroissant. 2 cycles.", 
        level: "Intermédiaire",
        tags: ["demagnetisation", "procedure", "champ", "devolutor"],
        manufactures: ["Bergeon", "Depez", "AF"],
        details: {
          principle: "Champ alternatif décroissant ramène dipôles acier à zéro. 2 passages garanti.",
          materials: ["Déma Devolutor 2", "Support mouvement", "Cycle 2 passages"],
          dimensions: {
            "Champ max": "800 A/m",
            "Temps cycle": "30 secondes",
            "Distance": "5 cm"
          },
          adjustment: "Mouvement éloigné lentement. 2 fois. Pas de contact. Tester après avec boussole.",
          commonErrors: ["Pas assez loin → champ trop fort → ne démagnétise pas", "Trop rapide → champ ne decroiît pas", "Un seul passage → inutile"],
          tools: ["Déma Bergeon 2", "Boussole", "Gaussmètre"]
        },
        gallery: [
          "https://cdn.horlolearn.ch/demagnetisation/devolutor-2.jpg",
          "https://cdn.horlolearn.ch/demagnetisation/cycle-champ.jpg"
        ],
        relatedConcepts: ["magnetisation", "amplitude-faible", "spiral-metalloide"]
      },
      { 
        id: 'centre-amplitude', 
        title: "Amplitude au Centre", 
        desc: "Montre au poignet. 240-260° acceptable. Frottement huître.", 
        level: "Expert",
        tags: ["centre", "amplitude", "port", "statistique"],
        manufactures: ["Rolex", "Omega", "T
