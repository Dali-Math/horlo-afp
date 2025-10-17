const tools: Tool[] = [
  // ========== BASES DE CONNAISSANCES ==========
  {
    id: '1',
    name: 'Base Chronos',
    description: 'Base de connaissances technique complète : pannes, diagnostics, procédures atelier. Référence pour les professionnels suisses.',
    url: 'https://www.cliniquehorlogere.ch',
    category: 'Connaissances',
    tags: ['diagnostic', 'pannes', 'atelier'],
    level: 'Intermédiaire',
    isFree: true,
    isRecommended: true,
    rating: 4.9,
    usageCount: 1247
  },
  {
    id: '2',
    name: 'SSC – Banque de données',
    description: 'Publications scientifiques et références de la Société Suisse de Chronométrie. Archives historiques et techniques avancées.',
    url: 'https://www.ssc.ch/fr/bibliotheque',
    category: 'Connaissances',
    tags: ['scientifique', 'recherche', 'histoire'],
    level: 'Avancé',
    isFree: true,
    rating: 4.7,
    usageCount: 892
  },
  {
    id: '3',
    name: 'Horlogerie-Suisse.com',
    description: 'Portail francophone complet : revues techniques, dossiers approfondis, annonces professionnelles et forums actifs.',
    url: 'https://horlogerie-suisse.com',
    category: 'Connaissances',
    tags: ['communauté', 'forum', 'actualités'],
    level: 'Débutant',
    isFree: true,
    isTrending: true,
    rating: 4.6,
    usageCount: 2103
  },
  {
    id: '4',
    name: 'SuissMontre.com',
    description: 'Répertoire francophone exhaustif des marques horlogères suisses, manufactures et calibres associés avec historique.',
    url: 'https://www.suissmontre.com',
    category: 'Connaissances',
    tags: ['marques', 'calibres', 'manufactures'],
    level: 'Débutant',
    isFree: true,
    rating: 4.5,
    usageCount: 1523
  },

  // ========== CALCULATEURS & OUTILS PRATIQUES ==========
  {
    id: '5',
    name: 'Calculateur d\'engrenages',
    description: 'Calcul précis des rapports de transmission, nombres de dents et vitesses de rotation. Indispensable pour la conception.',
    url: 'https://www.omnicalculator.com/physics/gear-ratio',
    category: 'Calculateurs',
    tags: ['engrenages', 'calcul', 'transmission'],
    level: 'Intermédiaire',
    isFree: true,
    isRecommended: true,
    rating: 4.8,
    usageCount: 1563
  },
  {
    id: '6',
    name: 'Balance Frequency Calculator',
    description: 'Convertisseur instantané entre alternances/heure (A/h), Hertz (Hz) et vibrations. Essentiel pour le réglage.',
    url: 'https://www.horological-meantime.com/frequency-calculator',
    category: 'Calculateurs',
    tags: ['fréquence', 'alternance', 'réglage'],
    level: 'Débutant',
    isFree: true,
    rating: 4.9,
    usageCount: 3241
  },
  {
    id: '7',
    name: 'Omni Calculator',
    description: 'Collection complète de calculateurs pour l\'horlogerie : engrenages, fréquences, dimensions, forces et bien plus.',
    url: 'https://www.omnicalculator.com',
    category: 'Calculateurs',
    tags: ['calculateurs', 'collection', 'polyvalent'],
    level: 'Débutant',
    isFree: true,
    rating: 4.7,
    usageCount: 2891
  },
  {
    id: '8',
    name: 'Horological Meantime',
    description: 'Convertisseur professionnel d\'alternances et fréquences horlogères avec explications pédagogiques détaillées.',
    url: 'https://www.horological-meantime.com',
    category: 'Calculateurs',
    tags: ['conversion', 'alternances', 'fréquences'],
    level: 'Intermédiaire',
    isFree: true,
    rating: 4.6,
    usageCount: 1245
  },

  // ========== CAO & MODÉLISATION 3D ==========
  {
    id: '9',
    name: 'TinkerCAD',
    description: 'Modélisation 3D gratuite en ligne, idéale pour concevoir et prototyper des pièces horlogères simples. Interface intuitive.',
    url: 'https://www.tinkercad.com',
    category: 'CAO',
    tags: ['3D', 'modélisation', 'conception'],
    level: 'Débutant',
    isFree: true,
    isNew: true,
    rating: 4.5,
    usageCount: 1829
  },
  {
    id: '10',
    name: 'Blender',
    description: 'Logiciel 3D open source ultra-puissant pour modéliser des mouvements horlogers complets avec rendu photoréaliste.',
    url: 'https://www.blender.org',
    category: 'CAO',
    tags: ['3D', 'open-source', 'rendu'],
    level: 'Avancé',
    isFree: true,
    rating: 4.8,
    usageCount: 3421
  },
  {
    id: '11',
    name: 'OnShape Education',
    description: 'Plateforme CAO en ligne professionnelle gratuite pour étudiants et enseignants. Collaboration en temps réel.',
    url: 'https://www.onshape.com/en/education',
    category: 'CAO',
    tags: ['CAO', 'cloud', 'éducation'],
    level: 'Intermédiaire',
    isFree: true,
    rating: 4.6,
    usageCount: 982
  },
  {
    id: '12',
    name: 'FreeCAD',
    description: 'Logiciel de CAO paramétrique open source, puissant pour modéliser des mouvements horlogers complets avec précision.',
    url: 'https://www.freecad.org',
    category: 'CAO',
    tags: ['CAO', 'paramétrique', 'open-source'],
    level: 'Avancé',
    isFree: true,
    rating: 4.4,
    usageCount: 1523
  },
  {
    id: '13',
    name: 'Inkscape',
    description: 'Logiciel de dessin vectoriel gratuit, parfait pour créer des plans techniques horlogers et schémas d\'éclatés.',
    url: 'https://inkscape.org',
    category: 'CAO',
    tags: ['2D', 'vectoriel', 'plans'],
    level: 'Intermédiaire',
    isFree: true,
    rating: 4.5,
    usageCount: 1891
  },
  {
    id: '14',
    name: 'QCAD',
    description: 'Logiciel de CAO 2D open source pour dessins techniques précis. Alternative gratuite à AutoCAD pour l\'horlogerie.',
    url: 'https://www.qcad.org',
    category: 'CAO',
    tags: ['2D', 'CAO', 'technique'],
    level: 'Intermédiaire',
    isFree: true,
    rating: 4.3,
    usageCount: 743
  },
  {
    id: '15',
    name: 'LibreCAD',
    description: 'Application CAO 2D gratuite et open source, idéale pour créer des plans d\'atelier et schémas de montage.',
    url: 'https://librecad.org',
    category: 'CAO',
    tags: ['2D', 'gratuit', 'plans'],
    level: 'Débutant',
    isFree: true,
    rating: 4.2,
    usageCount: 892
  },

  // ========== APPLICATIONS MOBILES ==========
  {
    id: '16',
    name: 'WatchTracker',
    description: 'Application mobile pour mesurer la précision de vos montres mécaniques via analyse audio du tic-tac.',
    url: 'https://www.watchtracker.io',
    category: 'Applications',
    tags: ['mobile', 'précision', 'mesure'],
    level: 'Débutant',
    isFree: false,
    isTrending: true,
    rating: 4.7,
    usageCount: 5421
  },
  {
    id: '17',
    name: 'Kello App',
    description: 'Application gratuite pour tester la précision des montres mécaniques. Interface simple, résultats instantanés.',
    url: 'https://kello.app',
    category: 'Applications',
    tags: ['mobile', 'test', 'gratuit'],
    level: 'Débutant',
    isFree: true,
    isRecommended: true,
    rating: 4.8,
    usageCount: 4103
  },
  {
    id: '18',
    name: 'Toolwatch',
    description: 'Mesure de précision de montre en ligne via enregistrement audio. Historique et suivi de vos montres.',
    url: 'https://www.toolwatch.io',
    category: 'Applications',
    tags: ['web', 'mesure', 'suivi'],
    level: 'Débutant',
    isFree: true,
    rating: 4.5,
    usageCount: 2341
  },

  // ========== BASES DE DONNÉES ==========
  {
    id: '19',
    name: 'Ranfft Database',
    description: 'Base de données la plus complète de calibres horlogers : fiches techniques détaillées, photos, spécifications.',
    url: 'https://www.ranfft.de',
    category: 'Bases de données',
    tags: ['calibres', 'spécifications', 'référence'],
    level: 'Intermédiaire',
    isFree: true,
    isRecommended: true,
    rating: 4.9,
    usageCount: 6892
  },
  {
    id: '20',
    name: 'Mikrolisk',
    description: 'Catalogue exhaustif de mouvements horlogers avec spécifications techniques, schémas et historique des marques.',
    url: 'https://mikrolisk.de',
    category: 'Bases de données',
    tags: ['mouvements', 'catalogue', 'marques'],
    level: 'Intermédiaire',
    isFree: true,
    rating: 4.6,
    usageCount: 3241
  },
  {
    id: '21',
    name: 'Watch Wiki',
    description: 'Encyclopédie horlogère collaborative. Terminologie, histoire, biographies d\'horlogers célèbres.',
    url: 'https://www.watch-wiki.org',
    category: 'Bases de données',
    tags: ['encyclopédie', 'wiki', 'histoire'],
    level: 'Débutant',
    isFree: true,
    rating: 4.5,
    usageCount: 2891
  },

  // ========== RESSOURCES PÉDAGOGIQUES ==========
  {
    id: '22',
    name: 'Animations Université de Nantes',
    description: 'Modules interactifs pédagogiques : oscilloscope, circuits électriques, ondes, lentilles, thermodynamique et mécanique.',
    url: 'https://phyanim.sciences.univ-nantes.fr',
    category: 'Pédagogie',
    tags: ['animations', 'physique', 'interactif'],
    level: 'Intermédiaire',
    isFree: true,
    isNew: true,
    rating: 4.7,
    usageCount: 1234
  },
  {
    id: '23',
    name: 'Simulateur d\'Alternance HorloLearn',
    description: 'Simulateur visuel en temps réel du balancier horloger. Calculez et visualisez les fréquences de 3600 à 72000 A/h.',
    url: '/outils#simulateur',
    category: 'Pédagogie',
    tags: ['simulateur', 'balancier', 'interne'],
    level: 'Débutant',
    isFree: true,
    isRecommended: true,
    isNew: true,
    rating: 5.0,
    usageCount: 892
  }
];
