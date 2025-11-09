// app/theorie/manufactures/rolex/page.tsx
import { Metadata } from 'next'

// ==================== DONNÉES COMPLÈTES ====================
const ROLEX_DATA = {
  meta: {
    title: "Rolex SA - Manufacture Horlogère Suisse",
    description: "Guide complet 2025 de Rolex : histoire depuis 1905, collections iconiques (Submariner, Daytona, GMT-Master), mouvements manufacture, certification Superlative Chronometer.",
    tagline: "Une Couronne pour chaque Succès",
    founded: "1905 à Londres",
    headquarters: "Genève, Suisse",
    employees: "Plus de 30'000",
    production: "1 million de montres/an",
    signature: "La Couronne de la Réussite"
  },
  
  // TIMELINE DÉTAILLÉE - 15 ÉVÉNEMENTS AVEC IMAGES WIKIMEDIA
  timeline: [
    { year: 1905, title: "Fondation", desc: "Hans Wilsdorf (24 ans) crée Wilsdorf & Davis à Londres. Importe mouvements suisses.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Hans_Wilsdorf.jpg/600px-Hans_Wilsdorf.jpg", category: "fondation" },
    { year: 1908, title: "Nom de la marque", desc: "Enregistrement de 'ROLEX' - nom court, facile à prononcer dans toutes les langues.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Rolex_logo.svg/400px-Rolex_logo.svg.png", category: "identité" },
    { year: 1910, title: "Première certification", desc: "Première montre au monde certifiée chronomètre par l'Observatoire de Bienne.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Swiss_official_chronometer_testing.jpg/400px-Swiss_official_chronometer_testing.jpg", category: "innovation" },
    { year: 1926, title: "La Oyster", desc: "Première montre étanche au monde avec boîtier hermétique et couronne vissée.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Rolex_Oyster_case_1926.jpg/500px-Rolex_Oyster_case_1926.jpg", category: "innovation" },
    { year: 1931, title: "Perpetual Rotor", desc: "Invention du rotor à 360°, première masse oscillante libre. Révolutionne l'automatique.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Rolex_perpetual_rotor.jpg/500px-Rolex_perpetual_rotor.jpg", category: "mouvement" },
    { year: 1945, title: "Datejust", desc: "Première montre avec date qui change instantanément à minuit. Création du bracelet Jubilee.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Rolex_Datejust_sl.jpg/500px-Rolex_Datejust_sl.jpg", category: "collection" },
    { year: 1953, title: "Explorer & Submariner", desc: "Sir Edmund Hillary sur l'Everest. Submariner première plongée étanche à 100m.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Rolex_Submariner_Date_16610.jpg/500px-Rolex_Submariner_Date_16610.jpg", category: "collection" },
    { year: 1954, title: "GMT-Master", desc: "Créée pour les pilotes de Pan Am. Lunette rotative bicolore pour deux fuseaux horaires.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Rolex_GMT_Master_II.jpg/500px-Rolex_GMT_Master_II.jpg", category: "collection" },
    { year: 1956, title: "Day-Date", desc: "Première montre affichant le jour en 26 langues. Devenue la 'montre des Présidents'.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Rolex_Day-Date_1803.jpg/500px-Rolex_Day-Date_1803.jpg", category: "collection" },
    { year: 1960, title: "Deep Sea Challenge", desc: "Bathyscaphe Trieste descend à 10'916m avec une Deep Sea Special au point le plus bas.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Trieste_bathyscaphe_problem.jpg/500px-Trieste_bathyscaphe_problem.jpg", category: "exploit" },
    { year: 1963, title: "Cosmograph Daytona", desc: "Chronographe pour pilotes de course. Échelle tachymétrique sur lunette, compteurs 3-6-9.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Rolex_Daytona_116520.jpg/500px-Rolex_Daytona_116520.jpg", category: "collection" },
    { year: 2008, title: "Deepsea", desc: "Étanche à 3'900m. Boîtier Ringlock, lunette Cerachrom, bracelet Glidelock.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Rolex_Deepsea.jpg/500px-Rolex_Deepsea.jpg", category: "collection" },
    { year: 2012, title: "Sky-Dweller", desc: "La plus complexe des Rolex : double fuseau, calendrier annuel Saros, commande Ring Command.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Rolex_Sky-Dweller.jpg/500px-Rolex_Sky-Dweller.jpg", category: "collection" },
    { year: 2015, title: "Calibre 3255", desc: "Nouvelle génération de mouvements : 14 brevets, 70h de réserve, Chronergy, précision -2/+2 sec/jour.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Rolex_calibre_3255.jpg/500px-Rolex_calibre_3255.jpg", category: "mouvement" },
    { year: 2023, title: "Deepsea Challenge", desc: "Commercialisation de la montre étanche à 11'000m. Boîtier Grade 5, certifiée Guinness.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Rolex_Deepsea_Challenge.jpg/500px-Rolex_Deepsea_Challenge.jpg", category: "collection" }
  ],

  // COLLECTIONS DÉTAILLÉES - 12 MODÈLES
  collections: [
    {
      id: "submariner",
      name: "Oyster Perpetual Submariner",
      nickname: "La montre de plongée par excellence",
      description: "Créée en 1953, première montre étanche à 100m. Aujourd'hui 300m avec lunette Cerachrom unidirectionnelle.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Rolex_Submariner_Date_16610.jpg/800px-Rolex_Submariner_Date_16610.jpg",
      price: "CHF 9'100 - 40'400",
      availability: "Disponible sous liste d'attente",
      movement: "Calibre 3230 (sans date) / 3235 (date)",
      case: "Oystersteel 41mm",
      bezel: "Céramique Cerachrom, graduation 60 minutes",
      bracelet: "Oyster avec sécurité Glidelock",
      water: "300m / 1'000 pieds",
      features: ["Détenteurs du monde", "Cadran Chromalight", "-2/+2 sec/jour"]
    },
    {
      id: "daytona",
      name: "Cosmograph Daytona",
      nickname: "La montre des champions",
      description: "Chronographe légendaire créé pour les pilotes de course. Compteurs 3-6-9, échelle tachymétrique.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Rolex_Daytona_116500_Ceramic.jpg/800px-Rolex_Daytona_116500_Ceramic.jpg",
      price: "CHF 15'100 - 75'500",
      availability: "Liste d'attente 3+ ans",
      movement: "Calibre 4130, chronographe intégré",
      case: "Oystersteel 40mm",
      bezel: "Céramique Cerachrom ou métal tachymétrique",
      bracelet: "Oyster",
      water: "100m",
      features: ["Paul Newman", "Roue à colonnes", "72h de réserve"]
    },
    {
      id: "gmt-master-ii",
      name: "GMT-Master II",
      nickname: "La montre des globe-trotters",
      description: "Deux fuseaux horaires avec aiguille indépendante. Lunette bicolore emblématique Bleu/Rouge.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Rolex_GMT_Master_II_Batman.jpg/800px-Rolex_GMT_Master_II_Batman.jpg",
      price: "CHF 9'700 - 38'800",
      availability: "Disponible sous liste d'attente",
      movement: "Calibre 3285, second fuseau horaire",
      case: "Oystersteel 40mm",
      bezel: "Céramique Cerachrom bicolore",
      bracelet: "Jubilee ou Oyster",
      water: "100m",
      features: ["Pepsi", "Batman", "Destro"]
    },
    {
      id: "datejust",
      name: "Datejust",
      nickname: "L'emblématique",
      description: "La montre classique par excellence depuis 1945. Date à 3h qui change à minuit.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Rolex_Datejust_41.jpg/800px-Rolex_Datejust_41.jpg",
      price: "CHF 7'500 - 13'200",
      availability: "Disponible en boutique",
      movement: "Calibre 3235 avec date instantanée",
      case: "Oystersteel 36mm ou 41mm",
      bezel: "Lisse, cannelée ou diamants",
      bracelet: "Jubilee ou Oyster",
      water: "100m",
      features: ["Jubilee 1945", "Cyclope", "Milles utilisations"]
    },
    {
      id: "day-date",
      name: "Day-Date",
      nickname: "La montre des Présidents",
      description: "Affiche jour complet en toutes lettres et date. Créée en 1956 pour les leaders.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Rolex_Day-Date_40_President.jpg/800px-Rolex_Day-Date_40_President.jpg",
      price: "CHF 36'500 - 120'000",
      availability: "Sur commande",
      movement: "Calibre 3255, jour et date",
      case: "Or 18ct 36mm ou 40mm",
      bezel: "Cannelée ou diamants",
      bracelet: "President exclusif",
      water: "100m",
      features: ["Présidents", "Or 18ct", "Jour complet"]
    },
    {
      id: "explorer",
      name: "Explorer",
      nickname: "L'aventure incarnée",
      description: "Montre de l'Everest 1953. Robustesse extrême, lisibilité parfaite dans l'obscurité.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Rolex_Explorer_214270.jpg/800px-Rolex_Explorer_214270.jpg",
      price: "CHF 7'200 - 8'300",
      availability: "Disponible",
      movement: "Calibre 3230",
      case: "Oystersteel 36mm ou 40mm",
      bezel: "Lisse",
      bracelet: "Oyster",
      water: "100m",
      features: ["Everest 1953", "Chromalight", "Tool watch"]
    },
    {
      id: "yacht-master",
      name: "Yacht-Master",
      nickname: "L'esprit nautique",
      description: "Montre de voile luxueuse. Lunette Cerachrom graduée, bracelet Oysterflex.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Rolex_Yacht-Master_42.jpg/800px-Rolex_Yacht-Master_42.jpg",
      price: "CHF 12'500 - 27'300",
      availability: "Disponible sous liste",
      movement: "Calibre 3235",
      case: "Oystersteel/Rose gold 42mm",
      bezel: "Céramique Cerachrom graduée",
      bracelet: "Oysterflex",
      water: "100m",
      features: ["Regatta", "Oysterflex", "Rolesor"]
    },
    {
      id: "sea-dweller",
      name: "Sea-Dweller",
      nickname: "Le plongeur professionnel",
      description: "Étanche à 1'220m avec valve à hélium. Pour plongeurs en saturation.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Rolex_Deepsea.jpg/800px-Rolex_Deepsea.jpg",
      price: "CHF 12'950 - 15'600",
      availability: "Disponible sous liste",
      movement: "Calibre 3235",
      case: "Oystersteel 43mm",
      bezel: "Céramique Cerachrom",
      bracelet: "Oyster avec extension Fliplock",
      water: "1'220m",
      features: ["Valve hélium", "Deepsea", "COMEX"]
    },
    {
      id: "milgauss",
      name: "Milgauss",
      nickname: "L'anti-magnétique",
      description: "Résiste à 1'000 gauss. Créée pour les ingénieurs du CERN.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Rolex_Milgauss_116400.jpg/800px-Rolex_Milgauss_116400.jpg",
      price: "CHF 8'200",
      availability: "Collectionnée / Vintage",
      movement: "Calibre 3131 avec blindage anti-magnétique",
      case: "Oystersteel 40mm",
      bezel: "Lisse",
      bracelet: "Oyster",
      water: "100m",
      features: ["CERN", "1'000 gauss", "Eclairage vert"]
    },
    {
      id: "air-king",
      name: "Air-King",
      nickname: "L'hommage à l'aviation",
      description: "Tribute à l'épopée de l'aviation. Cadran spécial avec 'Air-King' typographie.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Rolex_Air-King_116900.jpg/800px-Rolex_Air-King_116900.jpg",
      price: "CHF 7'000",
      availability: "Disponible",
      movement: "Calibre 3131",
      case: "Oystersteel 40mm",
      bezel: "Lisse",
      bracelet: "Oyster",
      water: "100m",
      features: ["Aviation", "Typographie", "Bloodhound SSC"]
    },
    {
      id: "oyster-perpetual",
      name: "Oyster Perpetual",
      nickname: "L'essence de Rolex",
      description: "La base de toutes les Rolex. Sans complications, juste la perfection horlogère.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Oyster_Perpetual_41.jpg/800px-Oyster_Perpetual_41.jpg",
      price: "CHF 5'900 - 6'600",
      availability: "Disponible",
      movement: "Calibre 3230",
      case: "Oystersteel 28-41mm",
      bezel: "Lisse",
      bracelet: "Oyster",
      water: "100m",
      features: ["5 tailles", "Couleurs vives", "Essentiel"]
    },
    {
      id: "sky-dweller",
      name: "Sky-Dweller",
      nickname: "La plus complexe",
      description: "Calendrier annuel Saros, deux fuseaux. Pour globe-trotters exigeants.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Rolex_Sky-Dweller.jpg/800px-Rolex_Sky-Dweller.jpg",
      price: "CHF 14'800 - 48'150",
      availability: "Sur commande",
      movement: "Calibre 9001, calendrier annuel",
      case: "Oystersteel/Rolesor 42mm",
      bezel: "Ring Command rotatif",
      bracelet: "Oyster",
      water: "100m",
      features: ["Saros", "Calendrier annuel", "Ring Command"]
    }
  ],

  // MOUVEMENTS MANUFACTURE
  movements: [
    {
      name: "Calibre 3230",
      type: "Automatique",
      intro: "Mouvement de base nouvelle génération, sans date.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Rolex_calibre_3235.jpg/600px-Rolex_calibre_3235.jpg",
      specs: {
        "Réserve de marche": "70 heures",
        "Précision": "-2/+2 sec/jour",
        "Fréquence": "28'800 alt/h",
        "Rubis": "31",
        "Spiral": "Parachrom Bleu",
        "Oscillateur": "Chronergy"
      },
      innovations: ["14 brevets", "Echappement Chronergy", "Rotor Perpetual"],
      used: ["Submariner sans date", "Explorer", "Oyster Perpetual"]
    },
    {
      name: "Calibre 3235",
      type: "Automatique avec date",
      intro: "Version avec date instantanée du 3230. Le mouvement le plus utilisé.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Rolex_calibre_3235.jpg/600px-Rolex_calibre_3235.jpg",
      specs: {
        "Réserve de marche": "70 heures",
        "Précision": "-2/+2 sec/jour",
        "Fréquence": "28'800 alt/h",
        "Rubis": "31",
        "Spiral": "Parachrom Bleu",
        "Oscillateur": "Chronergy"
      },
      innovations: ["Date instantanée", "Correction rapide", "70h de réserve"],
      used: ["Submariner Date", "Datejust", "Sea-Dweller"]
    },
    {
      name: "Calibre 3285",
      type: "Automatique GMT",
      intro: "Version GMT du 3235 avec aiguille supplémentaire indépendante.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Rolex_calibre_3235.jpg/600px-Rolex_calibre_3235.jpg",
      specs: {
        "Réserve de marche": "70 heures",
        "Précision": "-2/+2 sec/jour",
        "Fréquence": "28'800 alt/h",
        "Rubis": "31",
        "GMT": "Aiguille indépendante",
        "Correction": "Heure locale sans arrêter"
      },
      innovations: ["Système GMT breveté", "Correction heure locale", "Two Time Zones"],
      used: ["GMT-Master II", "Explorer II"]
    },
    {
      name: "Calibre 4130",
      type: "Chronographe automatique",
      intro: "Chronographe intégré, développé pour la Daytona. Moins de composants, plus fiable.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Rolex_calibre_3235.jpg/600px-Rolex_calibre_3235.jpg",
      specs: {
        "Réserve de marche": "72 heures",
        "Précision": "-2/+2 sec/jour",
        "Fréquence": "28'800 alt/h",
        "Rubis": "44",
        "Chronographe": "Roue à colonnes verticale",
        "Compteurs": "3-6-9 heures"
      },
      innovations: ["Moins de pièces", "Montage vertical", "Précision chronométrique"],
      used: ["Cosmograph Daytona"]
    },
    {
      name: "Calibre 9001",
      type: "Calendrier annuel GMT",
      intro: "Le plus complexe des mouvements Rolex. Calendrier annuel Saros et GMT.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Rolex_calibre_3235.jpg/600px-Rolex_calibre_3235.jpg",
      specs: {
        "Réserve de marche": "72 heures",
        "Précision": "-2/+2 sec/jour",
        "Fréquence": "28'800 alt/h",
        "Rubis": "40",
        "Calendrier": "Annuel Saros",
        "Mois": "Correction automatique 30/31 jours"
      },
      innovations: ["Mécanisme Saros", "Ring Command", "Mois affiché par fenêtre"],
      used: ["Sky-Dweller"]
    }
  ],

  // MANUFACTURES ROLEX
  manufactures: [
    {
      name: "Plan-les-Ouates",
      location: "Genève",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Rolex_Plan-les-Ouates.jpg/600px-Rolex_Plan-les-Ouates.jpg",
      activities: ["Fonderie de l'or", "Production des boîtiers", "Assemblage final", "Contrôle qualité"],
      employees: "> 5'000",
      surface: "110'000 m²"
    },
    {
      name: "Bienne",
      location: "Suisse alémanique",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Rolex_Bienne.jpg/600px-Rolex_Bienne.jpg",
      activities: ["Production des mouvements", "Tests chronométriques", "Assemblage des calibres", "Recherche & développement"],
      employees: "> 2'000",
      surface: "92'000 m²"
    },
    {
      name: "Chêne-Bourg",
      location: "Genève",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Rolex_Chene-Bourg.jpg/600px-Rolex_Chene-Bourg.jpg",
      activities: ["Fabrication des cadrans", "Céramique Cerachrom", "Mise en peinture", "Pose des index"],
      employees: "> 1'500",
      surface: "25'000 m²"
    },
    {
      name: "Genève (siège)",
      location: "Les Acacias",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Rolex_Geneva_Headquarters.jpg/600px-Rolex_Geneva_Headquarters.jpg",
      activities: ["Siège mondial", "Direction artistique", "Marketing", "Service après-vente"],
      employees: "> 1'000",
      surface: "45'000 m²"
    }
  ],

  // CERTIFICATION
  certification: {
    title: "Superlative Chronometer",
    description: "Chaque Rolex est certifiée selon des critères bien plus strictes que le COSC. Le sceau vert n'est pas juste une certification, c'est une promesse.",
    tests: [
      { name: "Précision", value: "-2/+2 sec/jour", detail: "2 fois plus strict que le COSC (-4/+6). Testée sur 24 jours." },
      { name: "Étanchéité", value: "25% supérieure", detail: "Testée à 25% au-dessus de la limite annoncée." },
      { name: "Réserve", value: "70h testées", detail: "Vérification complète de la réserve de marche." },
      { name: "Température", value: "8°C à 38°C", detail: "Tests entre 8°C et 38°C, plus extrême que le COSC." },
      { name: "Chocs", value: "Simulateur", detail: "Tests de chocs simulant la vie quotidienne." },
      { name: "Autonomie", value: "Fin du ressort", detail: "Précision vérifiée jusqu'à la fin complète du ressort." }
    ],
    guarantee: "Garantie internationale de 5 ans. Toutes les réparations faites par Rolex certifiées."
  },

  // PRIX 2025
  pricing: {
    title: "Valeur & Investissement",
    intro: "Rolex ne communique pas les prix officiels sur son site. Voici les fourchettes 2025 observées en boutique.",
    categories: [
      { name: "Accession", models: ["Oyster Perpetual"], price: "CHF 5'900 - 6'600", waiting: "Disponible" },
      { name: "Classiques", models: ["Datejust", "Explorer"], price: "CHF 7'200 - 13'200", waiting: "3-6 mois" },
      { name: "Professionnelles", models: ["Submariner", "GMT-Master II"], price: "CHF 9'100 - 40'400", waiting: "1-3 ans" },
      { name: "Haut de gamme", models: ["Daytona", "Sea-Dweller"], price: "CHF 12'950 - 75'500", waiting: "2-5 ans" },
      { name: "Prestige", models: ["Day-Date"], price: "CHF 36'500 - 120'000", waiting: "Sur commande" },
      { name: "Complications", models: ["Sky-Dweller"], price: "CHF 14'800 - 48'150", waiting: "Sur commande" }
    ],
    investment: "Certaines références (Daytona Plexiglas, Submariner LV, GMT-Master II Pepsi) ont vu leur valeur multipliée par 3 à 5 sur le marché secondaire depuis 2020."
  },

  // FAQ
  faq: [
    { q: "Pourquoi une liste d'attente ?", a: "Production limitée, demande mondiale explosive, stratégie de marque. Certains modèles ont 5+ ans d'attente." },
    { q: "Rolex produit-elle vraiment 1 million de montres ?", a: "C'est la rumeur, Rolex ne communique pas les chiffres. Analystes estiment entre 800'000 et 1'050'000 unités/an." },
    { q: "Quelle est la différence entre calibre 3135 et 3235 ?", a: "3135 (1988-2020) : 48h réserve. 3235 (2015+) : 70h, Chronergy, Parachrom, -2/+2 sec/jour." },
    { q: "Pourquoi les prix augmentent chaque année ?", a: "Inflation, matières premières, main d'œuvre suisse, investissement R&D, stratégie de luxe." },
    { q: "Est-ce un bon investissement ?", a: "Certaines références oui, mais pas toutes. Acier sportives s'apprécient, or plein se déprécie." },
    { q: "Où sont fabriquées les Rolex ?", a: "Entièrement en Suisse dans 4 manufactures : Plan-les-Ouates, Bienne, Chêne-Bourg, Genève." }
  ]
};

// ==================== METADATA CORRECT ====================
export const metadata: Metadata = {
  title: "Rolex - Guide Complet 2025 | HorloLearn",
  description: ROLEX_DATA.meta.description,
  keywords: "Rolex, Submariner, Daytona, GMT-Master II, Datejust, Day-Date, mouvement 3235, calibre 4130, Superlative Chronometer, manufacture horlogère suisse",
  openGraph: {
    title: ROLEX_DATA.meta.title,
    description: ROLEX_DATA.meta.description,
    images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Rolex_Submariner_Date_16610.jpg/1200px-Rolex_Submariner_Date_16610.jpg"],
    type: "article",
    locale: "fr_CH",
    url: "https://www.horlolearn.ch/theorie/manufactures/rolex"
  },
  twitter: {
    card: "summary_large_image",
    title: ROLEX_DATA.meta.title,
    description: ROLEX_DATA.meta.description,
    images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Rolex_Submariner_Date_16610.jpg/800px-Rolex_Submariner_Date_16610.jpg"]
  }
};

// ==================== COMPOSANTS ====================
// Hero
const Hero = () => (
  <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 text-white">
    <div className="max-w-5xl mx-auto px-6 text-center">
      <p className="text-green-400 uppercase tracking-widest mb-4">Manufacture Horlogère Suisse Depuis 1905</p>
      <h1 className="text-6xl md:text-9xl font-bold mb-6 font-serif bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
        ROLEX SA
      </h1>
      <p className="text-xl md:text-2xl mb-8">{ROLEX_DATA.meta.tagline}</p>
      <p className="text-lg mb-8 opacity-80 max-w-3xl mx-auto">{ROLEX_DATA.meta.description}</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {['Explorer l\'Histoire', 'Collections 2025'].map((btn, i) => (
          <button 
            key={i}
            className={`px-8 py-4 rounded-full font-semibold transition-all ${
              i === 0 
                ? 'bg-green-600 hover:bg-green-500' 
                : 'border-2 border-white/50 hover:bg-white hover:text-slate-900'
            }`}
          >
            {btn}
          </button>
        ))}
      </div>
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          { value: '1905', label: 'Fondation' },
          { value: '4', label: 'Manufactures' },
          { value: '30k+', label: 'Employés' },
          { value: '-2/+2s', label: 'Précision/jour' }
        ].map((stat, i) => (
          <div key={i}>
            <div className="text-3xl font-bold">{stat.value}</div>
            <div className="text-sm opacity-80">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Timeline
const Timeline = () => (
  <section className="py-20 bg-white dark:bg-slate-900">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-4 dark:text-white">Histoire & Patrimoine</h2>
      <p className="text-center text-slate-600 dark:text-slate-400 mb-12">15 dates qui ont façonné la légende</p>
      <div className="relative">
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 to-transparent" />
        <div className="space-y-12">
          {ROLEX_DATA.timeline.map((item, i) => (
            <div key={i} className={`flex ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="w-full md:w-5/12 md:px-8 ml-16 md:ml-0">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all">
                  <img src={item.image} alt={item.title} className="w-full h-64 object-cover rounded-lg mb-4" loading="lazy" />
                  <span className="text-3xl font-bold text-green-600 font-mono">{item.year}</span>
                  <h3 className="text-2xl font-bold mt-2 mb-2 dark:text-white">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                </div>
              </div>
              <div className="hidden md:block w-2/12 relative">
                <div className="absolute left-1/2 top-6 transform -translate-x-1/2 w-6 h-6 bg-green-600 rounded-full border-4 border-white dark:border-slate-900 ring-4 ring-green-600" />
              </div>
              <div className="w-full md:w-5/12" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// Collections
const Collections = () => (
  <section className="py-20 bg-slate-50 dark:bg-slate-800">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-4 dark:text-white">Collections 2025</h2>
      <p className="text-center text-slate-600 dark:text-slate-400 mb-12">12 collections emblématiques, des centaines de références</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ROLEX_DATA.collections.map((col) => (
          <div key={col.id} className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all h-full flex flex-col">
            <div className="relative">
              <img src={col.image} alt={col.name} className="w-full h-64 object-cover transition-transform group-hover:scale-105" loading="lazy" />
              <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {col.category}
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="mb-3">
                <h3 className="text-2xl font-bold dark:text-white">{col.name}</h3>
                <p className="text-green-600 font-medium">{col.nickname}</p>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-4 flex-1">{col.description}</p>
              
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-1">
                  <span className="text-slate-500">Mouvement</span>
                  <span className="font-semibold dark:text-white">{col.movement}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-1">
                  <span className="text-slate-500">Boîtier</span>
                  <span className="font-semibold dark:text-white">{col.case}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-1">
                  <span className="text-slate-500">Étanchéité</span>
                  <span className="font-semibold dark:text-white">{col.water}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {col.features.map((feature, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full">
                    {feature}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xl font-bold text-green-600">{col.price}</span>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    col.availability.includes("Disponible") 
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" 
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                  }`}>
                    {col.availability}
                  </span>
                </div>
                <button className="w-full px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors">
                  Voir les références
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Movements
const Movements = () => (
  <section className="py-20 bg-white dark:bg-slate-900">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-4 dark:text-white">Mouvements & Technologie</h2>
      <p className="text-center text-slate-600 dark:text-slate-400 mb-12">5 mouvements manufacture, tous certifiés Superlative Chronometer</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          {ROLEX_DATA.movements.map((movement, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-start gap-4">
                <img src={movement.image} alt={movement.name} className="w-24 h-24 object-contain" loading="lazy" />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold dark:text-white">{movement.name}</h3>
                  <p className="text-green-600 font-medium">{movement.type}</p>
                  <p className="text-slate-600 dark:text-slate-400 mt-2">{movement.intro}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {movement.innovations.map((inv, j) => (
                      <span key={j} className="text-xs px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded">
                        {inv}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(movement.specs).map(([key, value]) => (
                  <div key={key} className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="text-lg font-bold text-green-600">{value}</div>
                    <div className="text-xs text-slate-500">{key}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                <strong>Utilisé dans :</strong> {movement.used.join(", ")}
              </div>
            </div>
          ))}
        </div>
        <div className="sticky top-8">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4 dark:text-white">Innovations Clés Rolex</h3>
            <ul className="space-y-4">
              {[
                { icon: "🌀", name: "Chronergy", desc: "Echappement optimisé +15% d'efficacité" },
                { icon: "🔵", name: "Parachrom Bleu", desc: "Spiral anti-magnétique, 10x plus précis" },
                { icon: "💎", name: "Cerachrom", desc: "Céramique quasi indestructible" },
                { icon: "🏛️", name: "Oyster", desc: "Boîtier hermétique inventé 1926" }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <strong>{item.name}</strong>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Manufactures
const Manufactures = () => (
  <section className="py-20 bg-slate-50 dark:bg-slate-800">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-4 dark:text-white">La Production Rolex</h2>
      <p className="text-center text-slate-600 dark:text-slate-400 mb-12">4 manufactures, 100% production interne</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ROLEX_DATA.manufactures.map((mfg, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all h-full flex flex-col">
            <img src={mfg.image} alt={mfg.name} className="w-full h-48 object-cover" loading="lazy" />
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-xl font-bold dark:text-white">{mfg.name}</h3>
              <p className="text-green-600">{mfg.location}</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400 flex-1">
                {mfg.activities.map((act, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex justify-between text-sm">
                  <span>{mfg.employees}</span>
                  <span>{mfg.surface}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-4xl mx-auto">
          Rolex est l'une des rares manufactures à produire <strong>100% de ses composants en interne</strong> : boîtiers, mouvements, cadrans, bracelets. Même les alliages d'or sont créés dans sa propre fonderie.
        </p>
      </div>
    </div>
  </section>
);

// Certification
const Certification = () => (
  <section className="py-20 bg-white dark:bg-slate-900">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-4 dark:text-white">Certification Superlative Chronometer</h2>
      <p className="text-center text-slate-600 dark:text-slate-400 mb-12">Bien plus strict que le COSC</p>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Rolex_Superlative_Chronometer.jpg/600px-Rolex_Superlative_Chronometer.jpg" alt="Certificat" className="w-full rounded-xl shadow-lg" loading="lazy" />
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-4 dark:text-white">{ROLEX_DATA.certification.title}</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">{ROLEX_DATA.certification.description}</p>
            <p className="text-green-600 font-semibold">🛡️ Garantie de 5 ans incluse</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ROLEX_DATA.certification.tests.map((test, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{test.value}</div>
              <h4 className="text-lg font-bold mb-2 dark:text-white">{test.name}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">{test.detail}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center p-8 bg-green-50 dark:bg-green-900/20 rounded-xl">
          <p className="text-lg text-slate-900 dark:text-white max-w-3xl mx-auto">
            <strong>Ce qui fait la différence :</strong> Le COSC teste les mouvements seuls. Rolex teste la montre 
            <span className="text-green-600 font-semibold"> entièrement assemblée </span> 
            dans des conditions réelles : portée au poignet, en mouvement, avec les chocs du quotidien.
          </p>
        </div>
      </div>
    </div>
  </section>
);

// Pricing
const Pricing = () => (
  <section className="py-20 bg-slate-50 dark:bg-slate-800">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-4 dark:text-white">Valeur & Investissement</h2>
      <p className="text-center text-slate-600 dark:text-slate-400 mb-12">Prix officiels et disponibilités 2025</p>
      <div className="overflow-x-auto">
        <table className="w-full bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-lg">
          <thead className="bg-slate-900 dark:bg-slate-700 text-white">
            <tr>
              <th className="p-4 text-left">Catégorie</th>
              <th className="p-4 text-left">Modèles</th>
              <th className="p-4 text-right">Prix (CHF)</th>
              <th className="p-4 text-center">Délai*</th>
            </tr>
          </thead>
          <tbody>
            {ROLEX_DATA.pricing.categories.map((cat, i) => (
              <tr key={i} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                <td className="p-4 font-semibold">{cat.name}</td>
                <td className="p-4">{cat.models.join(", ")}</td>
                <td className="p-4 text-right text-green-600 font-bold">{cat.price}</td>
                <td className="p-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    cat.waiting.includes("Disponible") ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" :
                    cat.waiting.includes("ans") ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" :
                    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                  }`}>
                    {cat.waiting}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-slate-500 mt-4">*Délai observé moyen en boutique officielle. Peut varier fortement selon le modèle et la relation client.</p>
      
      <div className="mt-12 p-6 bg-white dark:bg-slate-900 rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold mb-4 dark:text-white">💡 Investissement Rolex : les clés</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-bold text-green-600 mb-2">✅ Qui s'apprécie</h4>
            <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
              <li>• Acier sportives (Daytona, GMT, Sub)</li>
              <li>• Série limitée / Vintage</li>
              <li>• Cadrans spéciaux (Tiffany, Stella)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-red-600 mb-2">❌ Qui se déprécie</h4>
            <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
              <li>• Or plein massif (Day-Date 36mm)</li>
              <li>• Diamants sur boîtier</li>
              <li>• Milgauss modernes</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-yellow-600 mb-2">⚠️ Risques 2025</h4>
            <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
              <li>• Marché secondaire surévalué</li>
              <li>• Clones chinois ultra-performants</li>
              <li>• Stratégie prix Rolex agressive</li>
            </ul>
          </div>
        </div>
        <p className="mt-6 text-sm text-slate-500">{ROLEX_DATA.pricing.investment}</p>
      </div>
    </div>
  </section>
);

// FAQ
const FAQ = () => (
  <section className="py-20 bg-white dark:bg-slate-900">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-4 dark:text-white">FAQ Rolex 2025</h2>
      <p className="text-center text-slate-600 dark:text-slate-400 mb-12">Ce que tout le monde demande sur Rolex</p>
      <div className="max-w-4xl mx-auto space-y-4">
        {ROLEX_DATA.faq.map((item, i) => (
          <details key={i} className="group bg-slate-50 dark:bg-slate-800 rounded-lg shadow hover:shadow-lg transition-all">
            <summary className="p-6 cursor-pointer font-bold text-lg flex justify-between items-center list-none">
              <span>{item.q}</span>
              <span className="text-green-600 text-2xl group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="px-6 pb-6 text-slate-600 dark:text-slate-400">
              <p>{item.a}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  </section>
);

// CTA
const CTA = () => (
  <section className="py-20 bg-gradient-to-r from-slate-900 to-green-900 text-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">Vous voulez en savoir plus ?</h2>
        <p className="text-xl mb-8 opacity-90">
          Rejoignez la communauté HorloLearn et recevez le guide exclusif "Rolex 2025 - Tout ce qu'il faut savoir"
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <input type="email" placeholder="Votre email" className="px-6 py-4 rounded-full text-slate-900 w-full sm:w-80 focus:outline-none focus:ring-4 focus:ring-green-400" />
          <button className="px-8 py-4 bg-green-600 hover:bg-green-500 rounded-full font-bold transition-all transform hover:scale-105">
            Télécharger le Guide
          </button>
        </div>
        <p className="text-sm opacity-70">+ Accès aux archives complètes, analyses des nouveautés, sélection des meilleures références</p>
      </div>
    </div>
  </section>
);

// ==================== PAGE PRINCIPALE ====================
export default function RolexPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      <Hero />
      <Timeline />
      <Collections />
      <Movements />
      <Manufactures />
      <Certification />
      <Pricing />
      <FAQ />
      <CTA />
      
      <footer className="py-12 bg-slate-950 text-white text-center">
        <div className="max-w-7xl mx-auto px-6">
          <p className="mb-4">© 2025 HorloLearn - La référence horlogère suisse</p>
          <p className="text-sm text-slate-400">Toutes les images provenant de <a href="https://commons.wikimedia.org" className="text-green-400 hover:underline">Wikimedia Commons</a> (sources libres)</p>
          <p className="text-xs text-slate-500 mt-2">ROLEX SA est une marque déposée. Ce contenu est éducatif et non affilié à Rolex.</p>
        </div>
      </footer>
    </main>
  );
}
