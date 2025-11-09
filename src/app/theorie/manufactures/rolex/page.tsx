// app/theorie/manufactures/rolex/page.tsx
import { Metadata } from 'next'
import rolexImages from '@/data/rolex_images.json';
// ==================== DONNÉES INTÉGRALES (850+ LIGNES) ====================
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
  
  // TIMELINE DÉTAILLÉE - 15 ÉVÉNEMENTS MAJEURS
  timeline: [
    { year: 1905, title: "Fondation", desc: "Hans Wilsdorf (24 ans) crée Wilsdorf & Davis à Londres. Importe mouvements suisses et les monte dans des boîtiers anglais.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Hans_Wilsdorf.jpg/600px-Hans_Wilsdorf.jpg", category: "fondation", impact: "Naissance d'une légende" },
    { year: 1908, title: "Nom de la marque", desc: "Enregistrement de 'ROLEX' - nom court, facile à prononcer dans toutes les langues, qui sonne comme une remontée mécanique.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Rolex_logo.svg/400px-Rolex_logo.svg.png", category: "identité", impact: "Identité mondiale" },
    { year: 1910, title: "Première certification", desc: "Première montre au monde certifiée chronomètre par l'Observatoire de Bienne. Rolex devient synonyme de précision.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Swiss_official_chronometer_testing.jpg/400px-Swiss_official_chronometer_testing.jpg", category: "innovation", impact: "Standard de précision" },
    { year: 1926, title: "La Oyster", desc: "Première montre étanche au monde avec boîtier hermétique, couronne vissée et fond vissé. Mercedes Gleitze traverse la Manche avec une Oyster au poignet, prouvant son étanchéité.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Rolex_Oyster_case_1926.jpg/500px-Rolex_Oyster_case_1926.jpg", category: "innovation", impact: "Révolution de l'étanchéité" },
    { year: 1931, title: "Perpetual Rotor", desc: "Invention du rotor Perpetual, première masse oscillante à 360°. Révolutionne l'horlogerie automatique, brevet mondial.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Rolex_perpetual_rotor.jpg/500px-Rolex_perpetual_rotor.jpg", category: "mouvement", impact: "Automatique moderne" },
    { year: 1945, title: "Datejust", desc: "Première montre avec date qui change instantanément à minuit. Fenêtre à 3h, bracelet Jubilee créé pour l'occasion.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Rolex_Datejust_sl.jpg/500px-Rolex_Datejust_sl.jpg", category: "collection", impact: "Complication essentielle" },
    { year: 1953, title: "Explorer & Submariner", desc: "Sir Edmund Hillary porte une Oyster Perpetual sur l'Everest. Lancement de la Submariner, première montre de plongée étanche à 100m (puis 300m).", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Rolex_Submariner_Date_16610.jpg/500px-Rolex_Submariner_Date_16610.jpg", category: "collection", impact: "Mondialisation de la plongée" },
    { year: 1954, title: "GMT-Master", desc: "Créée pour les pilotes de Pan Am Airways. Lunette rotative bicolore bleu/rouge pour jour/nuit, deux fuseaux horaires.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Rolex_GMT_Master_II.jpg/500px-Rolex_GMT_Master_II.jpg", category: "collection", impact: "Ère du jet" },
    { year: 1956, title: "Day-Date", desc: "Première montre affichant le jour en 26 langues. Devenue la 'montre des Présidents' avec bracelet President.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Rolex_Day-Date_1803.jpg/500px-Rolex_Day-Date_1803.jpg", category: "collection", impact: "Montre du pouvoir" },
    { year: 1960, title: "Deep Sea Special", desc: "Bathyscaphe Trieste descend à 10'916m dans la fosse des Mariannes avec une Deep Sea Special au point le plus bas. Intacte après la plongée.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Trieste_bathyscaphe_problem.jpg/500px-Trieste_bathyscaphe_problem.jpg", category: "exploit", impact: "Record absolu de profondeur" },
    { year: 1963, title: "Cosmograph Daytona", desc: "Chronographe pour pilotes de course. Échelle tachymétrique sur la lunette, compteurs 3-6-9. Légende des circuits.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Rolex_Daytona_116520.jpg/500px-Rolex_Daytona_116520.jpg", category: "collection", impact: "Mythe automobile" },
    { year: 2008, title: "Deepsea", desc: "Étanche à 3'900m. Lunette en céramique Cerachrom, boîtier Ringlock, bracelet Glidelock. Record de profondeur pour une montre de série.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Rolex_Deepsea.jpg/500px-Rolex_Deepsea.jpg", category: "collection", impact: "Plongée professionnelle" },
    { year: 2012, title: "Sky-Dweller", desc: "La plus complexe des Rolex : double fuseau, calendrier annuel Saros, commande Ring Command. Pour globe-trotters exigeants.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Rolex_Sky-Dweller.jpg/500px-Rolex_Sky-Dweller.jpg", category: "collection", impact: "Haute complication moderne" },
    { year: 2015, title: "Calibre 3255", desc: "Nouvelle génération de mouvements : 14 brevets, 70h de réserve, Chronergy, précision -2/+2 sec/jour. Nouveau standard Rolex.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Rolex_calibre_3255.jpg/500px-Rolex_calibre_3255.jpg", category: "mouvement", impact: "Révolution technique" },
    { year: 2023, title: "Deepsea Challenge", desc: "Commercialisation de la montre étanche à 11'000m. Boîtier Grade 5, certifiée Guinness. Accessible aux collectionneurs.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Rolex_Deepsea_Challenge.jpg/500px-Rolex_Deepsea_Challenge.jpg", category: "collection", impact: "Record commercial" }
  ],

  // COLLECTIONS LUXURY VERSION - sans prix, pour passionnés
  collections: [
    {
      id: "submariner",
      name: "Oyster Perpetual Submariner",
      nickname: "La reine des profondeurs",
      description: "Née en 1953 pour les plongeurs de la marine royale, la Submariner a défini ce qu'est une montre de plongée. Son design épuré, sa lunette rotative et sa couronne vissée sont devenus la référence absolue. Portée par Sean Connery dans James Bond, elle illustre l'élégance sous pression.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Rolex_Submariner_Date_16610.jpg/800px-Rolex_Submariner_Date_16610.jpg",
      legacy: "Première montre étanche à 100m (1953), aujourd'hui à 300m. Symbole de l'aventure sous-marine.",
      iconic_moment: "1962 : James Bond survit aux méchants avec une Submariner au poignet dans 'Dr. No'.",
      ambassadors: ["Jacques Cousteau", "James Bond", "Steve McQueen"],
      design_highlights: ["Lunette Cerachrom unidirectionnelle", "Cadran Chromaligh luminescent", "Indices circulaires et triangle à 12h"],
      innovations: ["Première lunette de plongée graduée", "Boîtier Oyster hermétique"],
      category: "sport"
    },
    {
      id: "daytona",
      name: "Cosmograph Daytona",
      nickname: "L'esprit de la course",
      description: "Créée en 1963 pour les pilotes du circuit de Daytona, cette chronographe incarne la vitesse et la précision. Sa lunette tachymétrique et ses compteurs 3-6-9 en font un instrument de mesure légendaire. Paul Newman en a fait une icône glamour et sportive.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Rolex_Daytona_116500_Ceramic.jpg/800px-Rolex_Daytona_116500_Ceramic.jpg",
      legacy: "Depuis 1963, la montre des champions. Nommée d'après le circuit de Daytona, qu'elle chronomètre officiellement.",
      iconic_moment: "1970s : Paul Newman porte sa Daytona 6263 quotidiennement, la rendant légendaire.",
      ambassadors: ["Paul Newman", "Jackie Stewart", "Jo Siffert"],
      design_highlights: ["Échelle tachymétrique sur lunette", "Compteurs contrastés 3-6-9", "Architecture d'horlogerie automobile"],
      innovations: ["Chronographe avec roue à colonnes", "Graduation pour calculer la vitesse moyenne"],
      category: "sport"
    },
    {
      id: "gmt-master-ii",
      name: "GMT-Master II",
      nickname: "Le maître du temps global",
      description: "Née en 1954 pour les pilotes de Pan Am Airways, la GMT-Master a révolutionné les voyages. Sa lunette bicolore Pepsi (rouge/bleu) ou Batman (noir/bleu) permet de lire deux fuseaux horaires. Un design audacieux devenu culte.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Rolex_GMT_Master_II_Batman.jpg/800px-Rolex_GMT_Master_II_Batman.jpg",
      legacy: "Créée pour les équipages du premier jet commercial mondial, le Boeing 707.",
      iconic_moment: "1950s : Pilotes de Pan Am reliant New York à Paris en 8h, synchronisés par leur GMT-Master.",
      ambassadors: ["Pilotes de Pan Am", "Harrison Ford", "Chesley 'Sully' Sullenberger"],
      design_highlights: ["Lunette Cerachrom bicolore iconique", "Aiguille GMT indépendante", "Heure locale ajustable sans perte de synchronisation"],
      innovations: ["Première lunette rotative bicolore", "Affichage jour/nuit pour le second fuseau"],
      category: "aviation"
    },
    {
      id: "datejust",
      name: "Oyster Perpetual Datejust",
      nickname: "L'emblématique intemporelle",
      description: "Lancée en 1945 pour le 40e anniversaire de Rolex, la Datejust est la montre classique par excellence. Sa loupe Cyclope inventée par Rolex permet de lire la date instantanément. Portée par des présidents et des artistes, elle transcende les styles.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Rolex_Datejust_41.jpg/800px-Rolex_Datejust_41.jpg",
      legacy: "Première montre avec date qui change instantanément à minuit (1945).",
      iconic_moment: "1960s : Le président Eisenhower porte une Datejust en or, baptisée 'montre des Présidents'.",
      ambassadors: ["Dwight Eisenhower", "Martin Luther King", "Andrea Bocelli"],
      design_highlights: ["Loupe Cyclope ×2,5 sur la date", "Bracelet Jubilee 5 maillons", "Cadran sunray aux mille variations"],
      innovations: ["Date instantanée + Cyclope", "Boîtier Oystersteel et or Rolesor"],
      category: "classique"
    },
    {
      id: "day-date",
      name: "Oyster Perpetual Day-Date",
      nickname: "La montre des leaders",
      description: "Lancée en 1956, le Day-Date affiche le jour en toutes lettres dans 26 langues. Devenue le symbole de la réussite, son bracelet President exclusif est reconnaissable entre mille. Une montre qui parle de pouvoir sans mot dire.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Rolex_Day-Date_40_President.jpg/800px-Rolex_Day-Date_40_President.jpg",
      legacy: "Seule montre à afficher le jour complet en toutes lettres. Surnom 'President' depuis son port par Eisenhower.",
      iconic_moment: "1960s : Lyndon B. Johnson porte un Day-Date à la Maison Blanche, consacrant le mythe.",
      ambassadors: ["Présidents des États-Unis", "Warren Buffett", "Roger Federer"],
      design_highlights: ["Arche à 12h pour le jour complet", "Bracelet President 3 maillons semi-circulaires", "Or 18ct créé dans sa propre fonderie"],
      innovations: ["Affichage du jour en toutes lettres", "Or 18ct propriétaire (Everose, yellow, white)", "Couronne cachée sur la carrure"],
      category: "classique"
    },
    {
      id: "explorer",
      name: "Oyster Perpetual Explorer",
      nickname: "L'esprit de l'aventure",
      description: "Conçue pour l'expédition Everest de 1953, l'Explorer incarne la conquête du monde. Son cadran noir contrasté, ses chiffres 3-6-9 et sa fiabilité extrême en font la montre des explorateurs. Simplicité redoutablement efficace.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Rolex_Explorer_214270.jpg/800px-Rolex_Explorer_214270.jpg",
      legacy: "Portée au sommet de l'Everest par Sir Edmund Hillary en 1953.",
      iconic_moment: "1953 : Hillary et Norgay atteignent 8'848m avec une Oyster Perpetuel au poignet.",
      ambassadors: ["Sir Edmund Hillary", "Tenzing Norgay", "Volcanologues", "Explorateurs polaires"],
      design_highlights: ["Cadran noir 3-6-9 emblématique", "Aiguilles grosse Superluminova", "Boîtier 36mm ou 40mm minimaliste"],
      innovations: ["Optimisation de la lisibilité extrême", "Compas magnétique anti-interférence"],
      category: "sport"
    },
    {
      id: "yacht-master",
      name: "Yacht-Master",
      nickname: "L'élégance nautique",
      description: "Conçue pour la voile de luxe, le Yacht-Master allie performance maritime et sophistication. Son bezel gradué en relief, son bracelet Oysterflex innovant et son boîtier Rolesor en font la montre des capitaines d'industrie qui aiment la mer.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Rolex_Yacht-Master_42.jpg/800px-Rolex_Yacht-Master_42.jpg",
      legacy: "Lancée en 1992 pour les navigateurs de régate. Le seul modèle Rolex avec un bezel bidirectionnel.",
      iconic_moment: "2000s : Les vainqueurs de la America's Cup reçoivent un Yacht-Master en récompense.",
      ambassadors: ["Sir Ben Ainslie", "Navigateurs de légende"],
      design_highlights: ["Lunette Cerachrom graduée en relief", "Bracelet Oysterflex (caoutchouc sur lame métallique)", "Boîtier Rolesor acier/or"],
      innovations: ["Première lunette bidirectionnelle Rolex", "Bracelet sport-luxe hybride Oysterflex"],
      category: "sport"
    },
    {
      id: "sea-dweller",
      name: "Sea-Dweller",
      nickname: "Le titan des abysses",
      description: "Créée pour les plongeurs professionnels de la Marine nationale et de la COMEX, la Sea-Dweller résiste à 1'220m avec une valve à hélium. C'est l'outil des explorateurs des profondeurs, des hommes qui vont où personne ne va.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Rolex_Deepsea.jpg/800px-Rolex_Deepsea.jpg",
      legacy: "Depuis 1967, la montre des plongeurs en saturation professionnels.",
      iconic_moment: "1970s : Plongeurs COMEX atteignent -600m en mer du Nord, Sea-Dweller intact.",
      ambassadors: ["Plongeurs COMEX", "Marine nationale", "Explorateurs sous-marins"],
      design_highlights: ["Valve à hélium à 9h", "Cadran supra-lisible", "Bracelet avec extension Fliplock"],
      innovations: ["Valve à hélène automatique", "Étanchéité extrême pour plongée professionnelle"],
      category: "sport"
    },
    {
      id: "milgauss",
      name: "Milgauss",
      nickname: "Le bouclier anti-magnétique",
      description: "Conçue en 1956 pour les ingénieurs du CERN, la Milgauss résiste à 1'000 gauss grâce à un blindage ferromagnétique. Sa seconde verte éclairante et son cadran de scientifique en font la montre des chercheurs qui repoussent les limites de la physique.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Rolex_Milgauss_116400.jpg/800px-Rolex_Milgauss_116400.jpg",
      legacy: "La première montre anti-magnétique professionnelle (1956).",
      iconic_moment: "2000s : Scientifiques du CERN au Large Hadron Collider portent Milgauss.",
      ambassadors: ["Ingénieurs du CERN", "Physiciens", "Techniciens IRM"],
      design_highlights: ["Seconde verte en forme d'éclair", "Cadran vert lime ou noir", "Boîtier avec blindage interne"],
      innovations: ["Résistance à 1'000 gauss", "Parachrom Bleu anti-magnétique"],
      category: "technologie"
    },
    {
      id: "air-king",
      name: "Air-King",
      nickname: "L'hommage à l'aéropostale",
      description: "Née dans les années 1930 pour célébrer l'épopée de l'aviation, l'Air-King rend hommage aux pionniers du ciel. Son cadran typographique unique et ses aiguilles vertes rappellent les instruments de bord des héros de l'air.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Rolex_Air-King_116900.jpg/800px-Rolex_Air-King_116900.jpg",
      legacy: "Créée en l'honneur des pilotes de la RAF pendant la Seconde Guerre mondiale.",
      iconic_moment: "1930s : Howard Hughes bat le record de vitesse avec une Rolex Air-King.",
      ambassadors: ["Howard Hughes", "Pilotes de la RAF", "Pionniers de l'aviation"],
      design_highlights: ["Typographie 'Air-King' unique", "Aiguilles vertes vives", "Cadran inspiré des instruments de bord"],
      innovations: ["Cadran typographique fonctionnel", "Hommage historique à l'aviation"],
      category: "aviation"
    },
    {
      id: "oyster-perpetual",
      name: "Oyster Perpetual",
      nickname: "L'essence pure",
      description: "La montre qui contient tout l'ADN Rolex. Sans complication, juste la perfection horlogère absolue. Son boîtier Oyster, son mouvement Perpetuel et son design éternel en font la porte d'entrée du monde Rolex, et pourtant déjà une icône.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Oyster_Perpetual_41.jpg/800px-Oyster_Perpetual_41.jpg",
      legacy: "Depuis 1926, la base de toutes les Rolex. Le nom même de la manufacture.",
      iconic_moment: "1953 : Sir Edmund Hillary porte une Oyster Perpetuel sur l'Everest.",
      ambassadors: ["Tous les explorateurs Rolex", "Sportifs d'élite"],
      design_highlights: ["Cadran vitrail aux couleurs vives", "Pureté du design Oyster", "Disponible en 5 tailles (28-41mm)", "Bâtonnets et chiffres classiques"],
      innovations: ["Fondation de l'ADN Rolex", "Disponibilité multigénérationnelle"],
      category: "classique"
    },
    {
      id: "sky-dweller",
      name: "Sky-Dweller",
      nickname: "Le globe-trotter d'exception",
      description: "La plus complexe des Rolex. Un calendrier annuel qui change automatiquement les mois de 30 et 31 jours, deux fuseaux horaires, le tout commandé par une lunette rotative Ring Command. Pour ceux qui maîtrisent le temps sur tous les continents.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Rolex_Sky-Dweller.jpg/800px-Rolex_Sky-Dweller.jpg",
      legacy: "Lancée en 2012, la montre la plus compliquée jamais créée par Rolex.",
      iconic_moment: "2012 : introduction du mécanisme Saros, nommé d'après le cycle lunaire.",
      ambassadors: ["Globe-trotters d'affaires", "Pilotes long-courrier", "Dirigeants multinationaux"],
      design_highlights: ["Cadran avec guichet annulaire", "Lunette Ring Command rotative", "Or 18ct ou Rolesor"],
      innovations: ["Calendrier annuel Saros", "Commande par lunette Ring Command", "Affichage mois discret"],
      category: "complication"
    }
  ],

  // MOUVEMENTS TECHNIQUES DÉTAILLÉS
  movements: [
    {
      name: "Calibre 3230",
      type: "Automatique",
      intro: "Mouvement de base nouvelle génération, sans date. 14 brevets, 70h de réserve, précision Superlative Chronometer.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Rolex_calibre_3235.jpg/600px-Rolex_calibre_3235.jpg",
      specs: {
        "Réserve de marche": "70 heures",
        "Précision": "-2/+2 sec/jour",
        "Fréquence": "28'800 alt/h (4 Hz)",
        "Rubis": "31",
        "Spiral": "Parachrom Bleu",
        "Oscillateur": "Chronergy",
        "Diamètre": "28.5mm",
        "Épaisseur": "5.5mm"
      },
      innovations: ["14 brevets", "Echappement Chronergy", "Rotor Perpetual", "70h vs 48h avant", "Anti-magnetisme 1000 gauss"],
      used: ["Submariner sans date", "Explorer", "Oyster Perpetual"],
      market: "Nouvelle génération depuis 2020"
    },
    {
      name: "Calibre 3235",
      type: "Automatique avec date",
      intro: "Version avec date instantanée du 3230. Le mouvement le plus utilisé dans la gamme Rolex actuelle.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Rolex_calibre_3235.jpg/600px-Rolex_calibre_3235.jpg",
      specs: {
        "Réserve de marche": "70 heures",
        "Précision": "-2/+2 sec/jour",
        "Fréquence": "28'800 alt/h",
        "Rubis": "31",
        "Spiral": "Parachrom Bleu",
        "Oscillateur": "Chronergy",
        "Date": "Changement instantané à minuit"
      },
      innovations: ["Date instantanée", "Correction rapide", "70h de réserve", "28% plus efficace"],
      used: ["Submariner Date", "Datejust", "Sea-Dweller"],
      market: "Standard des modèles modernes"
    },
    {
      name: "Calibre 3285",
      type: "Automatique GMT",
      intro: "Version GMT du 3235 avec aiguille supplémentaire indépendante. Parfait pour les voyageurs.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Rolex_calibre_3235.jpg/600px-Rolex_calibre_3235.jpg",
      specs: {
        "Réserve de marche": "70 heures",
        "Précision": "-2/+2 sec/jour",
        "Fréquence": "28'800 alt/h",
        "Rubis": "31",
        "GMT": "Aiguille indépendante",
        "Correction": "Heure locale sans arrêter",
        "Spiral": "Parachrom Bleu"
      },
      innovations: ["Système GMT breveté", "Correction heure locale", "Two Time Zones", "Cadran 24h"],
      used: ["GMT-Master II", "Explorer II"],
      market: "Voyageurs et professionnels"
    },
    {
      name: "Calibre 4130",
      type: "Chronographe automatique",
      intro: "Chronographe intégré, développé pour la Daytona. Moins de composants, plus fiable, architecture verticale.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Rolex_calibre_3235.jpg/600px-Rolex_calibre_3235.jpg",
      specs: {
        "Réserve de marche": "72 heures",
        "Précision": "-2/+2 sec/jour",
        "Fréquence": "28'800 alt/h",
        "Rubis": "44",
        "Chronographe": "Roue à colonnes verticale",
        "Compteurs": "3-6-9 heures",
        "Complication": "Chronographe intégré"
      },
      innovations: ["Moins de pièces (201 vs 300)", "Montage vertical", "Précision chronométrique", "Start/stop précis"],
      used: ["Cosmograph Daytona"],
      market: "Chronographe légendaire depuis 2000"
    },
    {
      name: "Calibre 9001",
      type: "Calendrier annuel GMT",
      intro: "Le plus complexe des mouvements Rolex. Calendrier annuel Saros et GMT. 380 composants, 7 brevets.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Rolex_calibre_3235.jpg/600px-Rolex_calibre_3235.jpg",
      specs: {
        "Réserve de marche": "72 heures",
        "Précision": "-2/+2 sec/jour",
        "Fréquence": "28'800 alt/h",
        "Rubis": "40",
        "Calendrier": "Annuel Saros",
        "Mois": "Correction automatique 30/31 jours",
        "GMT": "Aiguille centrale"
      },
      innovations: ["Mécanisme Saros", "Ring Command", "Mois affiché par fenêtre", "Correction par couronne"],
      used: ["Sky-Dweller"],
      market: "Haute complication Rolex"
    }
  ],

  // MANUFACTURES DÉTAILLÉES
  manufactures: [
    {
      name: "Plan-les-Ouates",
      location: "Genève",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Rolex_Plan-les-Ouates.jpg/600px-Rolex_Plan-les-Ouates.jpg",
      activities: ["Fonderie de l'or", "Production des boîtiers", "Assemblage final", "Contrôle qualité", "Polissage"],
      employees: "> 5'000",
      surface: "110'000 m²",
      established: "1965",
      specialties: ["Or 18ct", "Rolesor", "Oystersteel", "Boîtier monobloc"]
    },
    {
      name: "Bienne",
      location: "Suisse alémanique",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Rolex_Bienne.jpg/600px-Rolex_Bienne.jpg",
      activities: ["Production des mouvements", "Tests chronométriques", "Assemblage des calibres", "Recherche & développement", "Brevets"],
      employees: "> 2'000",
      surface: "92'000 m²",
      established: "2007",
      specialties: ["Calibre 3235", "Calibre 4130", "Superlative Chronometer", "Nanotechnologie"]
    },
    {
      name: "Chêne-Bourg",
      location: "Genève",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Rolex_Chene-Bourg.jpg/600px-Rolex_Chene-Bourg.jpg",
      activities: ["Fabrication des cadrans", "Céramique Cerachrom", "Mise en peinture", "Pose des index", "Chromalight"],
      employees: "> 1'500",
      surface: "25'000 m²",
      established: "2006",
      specialties: ["Cadrans sunray", "Cerachrom", "Luminosité Chromalight", "Galvanoplastie"]
    },
    {
      name: "Genève (Siège Mondial)",
      location: "Les Acacias",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Rolex_Geneva_Headquarters.jpg/600px-Rolex_Geneva_Headquarters.jpg",
      activities: ["Siège mondial", "Direction artistique", "Marketing", "Service après-vente", "Académie Rolex"],
      employees: "> 1'000",
      surface: "45'000 m²",
      established: "1965",
      specialties: ["Stratégie", "Formation", "Relation client VIP", "Métiers d'art"]
    }
  ],

  // CERTIFICATION SUPERLATIVE CHRONOMETER
  certification: {
    title: "Superlative Chronometer",
    description: "Chaque Rolex est certifiée selon des critères bien plus strictes que le COSC. Le sceau vert n'est pas juste une certification, c'est une promesse de fiabilité sur toute la montre, pas seulement le mouvement.",
    tests: [
      { name: "Précision", value: "-2/+2 sec/jour", detail: "2 fois plus strict que le COSC (-4/+6). Testée sur 24 jours, dans toutes les positions." },
      { name: "Étanchéité", value: "25% supérieure", detail: "Testée à 25% au-dessus de la limite annoncée. Submariner testée à 375m." },
      { name: "Réserve de marche", value: "70h testées", detail: "Vérification complète de la réserve de marche en conditions réelles." },
      { name: "Température", value: "8°C à 38°C", detail: "Tests entre 8°C et 38°C, plus extrême que le COSC (23°C). Simule tous les climats." },
      { name: "Chocs & Accélération", value: "Simulateur", detail: "Tests de chocs simulant la vie quotidienne, le sport et les accélérations." },
      { name: "Autonomie & Cylindre", value: "Fin du ressort", detail: "Précision vérifiée jusqu'à la fin complète du ressort, en décroissance." }
    ],
    guarantee: "Garantie internationale de 5 ans. Toutes les réparations faites par Rolex certifiées. Service disponible dans 100+ pays."
  },

  // PRIX & VALEUR D'INVESTISSEMENT
  pricing: {
    title: "Valeur & Investissement Rolex 2025",
    intro: "Rolex ne communique pas les prix officiels sur son site. Voici les fourchettes 2025 observées en boutique officielle et les délais d'attente moyens.",
    intro2: "Le marché secondaire peut être 2 à 5 fois supérieur pour les modèles les plus demandés.",
    categories: [
      { name: "Accession", models: ["Oyster Perpetual 28-41mm"], price: "CHF 5'900 - 6'600", waiting: "Disponible", market: "Prix stable" },
      { name: "Classiques", models: ["Datejust 36-41mm", "Explorer 36-40mm"], price: "CHF 7'200 - 13'200", waiting: "3-6 mois", market: "Bon investissement" },
      { name: "Professionnelles", models: ["Submariner 41mm", "GMT-Master II 40mm"], price: "CHF 9'100 - 40'400", waiting: "1-3 ans", market: "Très surcoté (×2-3)" },
      { name: "Haut de gamme", models: ["Daytona 40mm", "Sea-Dweller 43mm"], price: "CHF 12'950 - 75'500", waiting: "2-5 ans", market: "Records aux enchères" },
      { name: "Prestige", models: ["Day-Date 36-40mm or"], price: "CHF 36'500 - 120'000", waiting: "Sur commande", market: "Dépréciation or" },
      { name: "Complications", models: ["Sky-Dweller 42mm"], price: "CHF 14'800 - 48'150", waiting: "Sur commande", market: "Valeur technique" }
    ],
    investment: "Certaines références (Daytona Plexiglas 6263, Submariner LV 16610LV, GMT-Master II Pepsi 16710) ont vu leur valeur multipliée par 3 à 5 sur le marché secondaire depuis 2020. Cependant, l'or plein se déprécie de 15-25% à la revente.",
    tips: "Astuce : Les modèles en acier avec complications rares (Daytona, GMT) sont les plus recherchés. Les Day-Date en or sont magnifiques mais perdent de la valeur."
  },

  // FAQ DÉTAILLÉE
  faq: [
    { 
      q: "Pourquoi une liste d'attente aussi longue chez Rolex ?", 
      a: "Production intentionnellement limitée (moins de 1 million de montres/an), demande mondiale explosive depuis 2020, stratégie de marque de rareté. Certains modèles comme la Daytona ont 5+ ans d'attente. Les investisseurs spéculent aussi sur le marché." 
    },
    { 
      q: "Rolex produit-elle vraiment 1 million de montres par an ?", 
      a: "C'est la rumeur industrielle, mais Rolex ne communique pas les chiffres officiels. Analystes estiment entre 800'000 et 1'050'000 unités/an. Patek Philippe produit environ 60'000 montres/an pour comparaison." 
    },
    { 
      q: "Quelle est la différence entre calibre 3135 et 3235 ?", 
      a: "3135 (1988-2020) : 48h réserve, échappement standard, précision COSC -4/+6 sec/jour. 3235 (2015+) : 70h réserve, Chronergy, Parachrom Bleu, précision Superlative -2/+2 sec/jour. Le 3235 a 90% de pièces nouvelles." 
    },
    { 
      q: "Pourquoi les prix Rolex augmentent-ils chaque année ?", 
      a: "Inflation (CHF fort), matières premières (or, acier 904L), main d'œuvre suisse qualifiée, investissement R&D (14 brevets sur le 3235), stratégie de marque de luxe. Hausse moyenne 5-7%/an." 
    },
    { 
      q: "Acheter une Rolex est-il un bon investissement ?", 
      a: "Cela dépend : les acier sportives (Daytona, GMT, Sub) s'apprécient. L'or plein se déprécie de 15-25%. Les complications rares (Sky-Dweller) sont des valeurs sûres. Mais une Rolex se porte avant tout !" 
    },
    { 
      q: "Où sont fabriquées les Rolex exactement ?", 
      a: "Entièrement en Suisse dans 4 manufactures : Plan-les-Ouates (Genève) pour boîtiers, Bienne pour mouvements, Chêne-Bourg pour cadrans, et Genève Les Acacias pour siège. 100% production interne." 
    }
  ],

  // SOCIAL & LEGAL
  social: {
    instagram: "@rolex",
    facebook: "ROLEX",
    youtube: "Rolex Channel",
    website: "https://www.rolex.com"
  },
  legal: {
    note: "ROLEX SA est une marque déposée. Ce contenu éducatif n'est pas affilié à Rolex. Toutes les informations sont publiques ou issues d'analyses horlogères indépendantes.",
    sources: ["Wikipedia", "Forbes", "Revolution Watch", "Hodinkee", "WatchTime", "Monochrome Watches"]
  }
}; // <--- IMPORTANT : FERMETURE DE L'OBJET

// ==================== COMPOSANTS DÉTAILLÉS ====================
// Maintenant les composants sont déclarés HORS de l'objet ROLEX_DATA

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

const Timeline = () => (
  <section className="py-20 bg-white dark:bg-slate-900">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-12 dark:text-white">Histoire & Patrimoine</h2>
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
                  <p className="text-sm text-green-600 mt-2 font-medium">{item.impact}</p>
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

// VERSION LUXURY SANS PRIX
const Collections = () => (
  <section className="py-20 bg-slate-50 dark:bg-slate-900">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-4 dark:text-white">Collections 2025</h2>
      <p className="text-center text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-12">
        Douze icônes, douze histoires. Chaque Rolex est née d'une vision, d'un défi, d'une passion. 
        Découvrez l'âme derrière les couronnes les plus convoitées de la planète.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {ROLEX_DATA.collections.map((col) => (
          <div key={col.id} className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
            {/* Image avec overlay au hover */}
            <div className="relative overflow-hidden">
              <img 
                src={col.image} 
                alt={col.name} 
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110" 
                loading="lazy" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <p className="text-white text-sm uppercase tracking-widest">{col.legacy.split('.')[0]}</p>
                  <p className="text-green-400 text-2xl font-bold italic">"{col.nickname}"</p>
                </div>
              </div>
            </div>
            
            <div className="p-8 flex-1 flex flex-col">
              {/* Header */}
              <div className="mb-6">
                <h3 className="text-3xl font-bold mb-2 dark:text-white font-serif">{col.name}</h3>
                <p className="text-green-600 font-medium text-lg">{col.nickname}</p>
              </div>

              {/* Description */}
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1 italic">
                {col.description}
              </p>

              {/* Legacy & Iconic Moment */}
              <div className="mb-6 p-5 bg-green-50 dark:bg-green-900/20 rounded-xl border-l-4 border-green-600">
                <div className="mb-3">
                  <h4 className="font-bold text-green-700 dark:text-green-400 text-sm uppercase tracking-widest">Héritage</h4>
                  <p className="text-slate-700 dark:text-slate-300 text-sm">{col.legacy}</p>
                </div>
                <div>
                  <h4 className="font-bold text-green-700 dark:text-green-400 text-sm uppercase tracking-widest">Moment iconique</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{col.iconic_moment}</p>
                </div>
              </div>

              {/* Ambassadeurs */}
              <div className="mb-6">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm uppercase tracking-widest mb-3">Portée par des légendes</h4>
                <div className="flex flex-wrap gap-2">
                  {col.ambassadors.map((amb, i) => (
                    <span key={i} className="text-xs px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-300 rounded-full">
                      {amb}
                    </span>
                  ))}
                </div>
              </div>

              {/* Design & Innovations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm uppercase tracking-widest mb-2">Détails de design</h4>
                  <ul className="space-y-1">
                    {col.design_highlights.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <span className="text-green-500 mt-0.5">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm uppercase tracking-widest mb-2">Innovations</h4>
                  <ul className="space-y-1">
                    {col.innovations.map((innov, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>{innov}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer avec catégorie */}
              <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <span className={`px-4 py-2 rounded-full text-xs font-bold ${
                  col.category === "sport" ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" :
                  col.category === "aviation" ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300" :
                  col.category === "classique" ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300" :
                  col.category === "complication" ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" :
                  "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                }`}>
                  {col.category.toUpperCase()}
                </span>
                <button className="text-sm text-green-600 hover:text-green-700 font-semibold flex items-center gap-1">
                  Découvrir son histoire <span>→</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Movements = () => (
  <section className="py-20 bg-white dark:bg-slate-900">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-12 dark:text-white">Mouvements & Technologie</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          {ROLEX_DATA.movements.map((movement, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all">
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
                <br />
                <strong>Marché :</strong> {movement.market}
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
                { icon: "🏛️", name: "Oyster", desc: "Boîtier hermétique inventé 1926" },
                { icon: "⚙️", name: "Perpetual Rotor", desc: "Rotor à 360° depuis 1931" }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <strong className="dark:text-white">{item.name}</strong>
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

const Manufactures = () => (
  <section className="py-20 bg-slate-50 dark:bg-slate-800">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-12 dark:text-white">Les 4 Manufactures Rolex</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ROLEX_DATA.manufactures.map((mfg, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all h-full flex flex-col">
            <img src={mfg.image} alt={mfg.name} className="w-full h-48 object-cover" loading="lazy" />
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-xl font-bold dark:text-white">{mfg.name}</h3>
              <p className="text-green-600 text-sm">{mfg.location}</p>
              <p className="text-xs text-slate-500 mt-1">Depuis {mfg.established}<br/>{mfg.surface}, {mfg.employees}</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400 flex-1">
                {mfg.activities.map((act, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500">Spécialités : {mfg.specialties.join(", ")}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center p-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-4xl mx-auto">
          Rolex est l'une des rares manufactures à produire <strong>100% de ses composants en interne</strong> : boîtiers, mouvements, cadrans, bracelets. Même les alliages d'or sont créés dans sa propre fonderie.
        </p>
        <p className="mt-4 text-sm text-slate-500">
          Sources : {ROLEX_DATA.legal.sources.join(", ")} | <a href={ROLEX_DATA.social.website} className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">{ROLEX_DATA.social.website}</a>
        </p>
      </div>
    </div>
  </section>
);

const Certification = () => (
  <section className="py-20 bg-white dark:bg-slate-900">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-12 dark:text-white">Certification Superlative Chronometer</h2>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Rolex_Superlative_Chronometer.jpg/600px-Rolex_Superlative_Chronometer.jpg" alt="Certificat" className="w-full rounded-xl shadow-lg" loading="lazy" />
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-4 dark:text-white">{ROLEX_DATA.certification.title}</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">{ROLEX_DATA.certification.description}</p>
            <p className="text-green-600 font-semibold mb-2">🛡️ {ROLEX_DATA.certification.guarantee.split('.')[0]}</p>
            <p className="text-sm text-slate-500">{ROLEX_DATA.certification.guarantee.split('.')[1]}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ROLEX_DATA.certification.tests.map((test, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all">
              <div className="text-3xl font-bold text-green-600 mb-2 font-mono">{test.value}</div>
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

const FAQ = () => (
  <section className="py-20 bg-white dark:bg-slate-900">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-12 dark:text-white">FAQ Rolex 2025</h2>
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
            Télécharger le Guide Rolex 2025
          </button>
        </div>
        <p className="text-sm opacity-70">+ Accès aux archives complètes, analyses des nouveautés, sélection des meilleures références</p>
      </div>
    </div>
  </section>
);

// Nouvelle section Philosophie plus impactante
const Philosophy = () => (
  <section className="py-20 bg-white dark:bg-slate-900">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-12 dark:text-white">Pourquoi Rolex est unique</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h3 className="text-3xl font-bold mb-6 dark:text-white">La Vision originelle</h3>
          <blockquote className="border-l-4 border-green-600 pl-6 mb-6 text-lg italic text-slate-700 dark:text-slate-300">
            "Je pense que la montre-bracelet est destinée à un brillant avenir, notamment si on parvient à la rendre précise, étanche et robuste." 
            <footer className="text-sm mt-2 text-green-600 font-semibold">— Hans Wilsdorf, 1905</footer>
          </blockquote>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Cette vision a guidé chaque décision Rolex depuis 1905. Lorsque la plupart des montres étaient des objets fragiles, 
            Wilsdorf a créé un outil précis et indestructible pour la vie moderne.
          </p>
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
            <h4 className="font-bold text-green-700 dark:text-green-400 mb-3">Les 3 piliers fondateurs</h4>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-3"><span className="text-green-600 mt-1">✓</span> <span><strong>Précision absolue</strong> : aller au-delà des standards officiels</span></li>
              <li className="flex items-start gap-3"><span className="text-green-600 mt-1">✓</span> <span><strong>Étanchéité totale</strong> : l'Oyster, boîtier hermétique iconique</span></li>
              <li className="flex items-start gap-3"><span className="text-green-600 mt-1">✓</span> <span><strong>Fiabilité légendaire</strong> : une montre pour la vie, transmissible</span></li>
            </ul>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          {[
            { icon: "🏆", title: "100% Manufacture", desc: "Seule marque à produire totalement en interne : alliages d'or, mouvements, cadrans, bracelets" },
            { icon: "🧪", title: "Recherche d'avant-garde", desc: "Laboratoires internes en nanotechnologie, tribologie, matériaux composites" },
            { icon: "⏱️", title: "2 fois plus exigeante", desc: "Certification Superlative Chronometer : 2x plus stricte que le COSC officiel" },
            { icon: "🌍", title: "Testée dans le monde réel", desc: "Chaque montre testée sur simulateur avant livraison : chocs, pression, climats extrêmes" }
          ].map((item, i) => (
            <div key={i} className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all text-center">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h4 className="font-bold mb-2 dark:text-white">{item.title}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section Impact historique */}
      <div className="bg-gradient-to-r from-slate-900 to-green-900 text-white rounded-2xl p-12 mb-16">
        <h3 className="text-3xl font-bold mb-8 text-center">L'impact sur l'horlogerie mondiale</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4 text-green-300">1926 : L'étanchéité</h4>
            <p className="text-slate-200">Rolex invente la première montre hermétique. Aujourd'hui, TOUTES les montres de sport sont étanches grâce à cette innovation.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4 text-green-300">1931 : L'automatique moderne</h4>
            <p className="text-slate-200">Le rotor Perpetual à 360° devient le standard de l'industrie. 90% des montres automatiques utilisent ce principe aujourd'hui.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4 text-green-300">1950s : Les tool watches</h4>
            <p className="text-slate-200">Rolex crée le concept de montre-outil : Submariner, GMT-Master, Daytona. Une montre pour chaque profession.</p>
          </div>
        </div>
      </div>

      {/* Section Philosophie actuelle */}
      <div className="text-center max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold mb-6 dark:text-white">Une philosophie inchangée depuis 120 ans</h3>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
          Rolex ne suit pas les tendances. Elle les crée. Chaque nouvelle montre doit répondre à une question simple : 
          <span className="block mt-4 text-2xl font-bold text-green-600 font-serif">"Est-ce le meilleur outil pour cette mission ?"</span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-12">
          <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-xl shadow-lg">
            <h4 className="text-xl font-bold mb-4 dark:text-white">🎯 La quête de l'excellence</h4>
            <ul className="space-y-3 text-slate-600 dark:text-slate-400">
              <li>Une seule qualité de production : la meilleure possible</li>
              <li>Aucun compromis sur les matériaux (acier 904L, or 18ct maison)</li>
              <li>14 brevets pour un seul mouvement (calibre 3235)</li>
              <li>Testée 7 fois, vérifiée 70 heures, garantie 5 ans</li>
            </ul>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-xl shadow-lg">
            <h4 className="text-xl font-bold mb-4 dark:text-white">💎 Le luxe par la performance</h4>
            <ul className="space-y-3 text-slate-600 dark:text-slate-400">
              <li>Pas de marketing agressif : le produit parle de lui-même</li>
              <li>Une couronne sur le boîtier, pas de logos criards</li>
              <li>Des ambassadeurs qui utilisent vraiment la montre (explorateurs, athlètes)</li>
              <li>Valeur de revente : le marché reconnaît la qualité</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Citation finale */}
      <div className="mt-16 p-8 bg-green-50 dark:bg-green-900/20 rounded-xl border-l-4 border-green-600">
        <blockquote className="text-2xl font-serif text-center text-slate-800 dark:text-white italic">
          "Rolex n'est pas une montre de luxe. C'est une montre de précision qui est devenue un luxe par sa qualité."
        </blockquote>
        <p className="text-center mt-4 text-sm text-green-600 font-semibold">
          — Philosophes de l'horlogerie indépendante
        </p>
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
      <Philosophy />
      <FAQ />
      <CTA />
      
      <footer className="py-12 bg-slate-950 text-white text-center">
        <div className="max-w-7xl mx-auto px-6">
          <p className="mb-4">© 2025 HorloLearn - L'Académie Horlogère Suisse</p>
          <p className="text-sm text-slate-400">Une exploration émotionnelle de l'art horlogère | {ROLEX_DATA.legal.note}</p>
          <div className="mt-4 flex justify-center gap-4">
            <a href={`https://www.instagram.com/${ROLEX_DATA.social.instagram.replace('@', '')}`} className="text-green-400 hover:underline" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={`https://www.facebook.com/${ROLEX_DATA.social.facebook}`} className="text-green-400 hover:underline" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href={ROLEX_DATA.social.website} className="text-green-400 hover:underline" target="_blank" rel="noopener noreferrer">Site officiel Rolex</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
