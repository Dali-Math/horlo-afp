'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Crown, Award, Calendar, Zap, Shield, Trophy, Heart, TrendingUp, 
  Globe, Users, Watch, Settings, Diamond, Sparkles, Clock, BookOpen,
  Activity, Moon, Sun, RotateCcw, Target, Eye, Share2, Star, Play, 
  Pause, Volume2, X, ChevronDown, ChevronLeft, ChevronRight, Search,
  Filter, Download, Bookmark, MessageCircle, ArrowUpRight, Info,
  Layers, BarChart3, Box, Hammer, Microscope, Calculator, LineChart, PieChart
} from 'lucide-react';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export default function PatekPhilippeUltimate() {
  // ============ STATES AVANCÉS ============
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedEra, setSelectedEra] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<(number | string)[]>([]);
  const [compareList, setCompareList] = useState<(number | string)[]>([]);
  const [showComparator, setShowComparator] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [expertMode, setExpertMode] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [userPreferences, setUserPreferences] = useState({
    theme: 'dark',
    priceRange: [0, 1000000],
    expertLevel: 'beginner'
  });

  // ============ DONNÉES ENCYCLOPÉDIQUES ============
  const encyclopedicData = {
    // Timeline ultra-détaillée
    historicalMilestones: [
      {
        id: 1,
        year: 1839,
        era: 'foundation',
        title: 'Fondation par Antoine Norbert de Patek',
        description: 'Antoine Norbert de Patek, aristocrate polonais exilé, fonde Patek, Czapek & Cie à Genève avec François Czapek.',
        impact: 'Révolutionnaire',
        context: 'Contexte historique : Après la révolution polonaise ratée de 1830, Patek trouve refuge en Suisse.',
        technicalDetails: 'Première production : montres de poche avec échappement à cylindre',
        witnesses: 'Archives Patek Philippe confirment 200 pièces produites la première année',
        rarity: 5,
        imageDescription: 'Atelier genevois du 19e siècle',
        funFact: 'Patek avait initialement voulu être soldat, pas horloger'
      },
      {
        id: 2,
        year: 1844,
        era: 'foundation',
        title: 'Rencontre Historique à Paris',
        description: 'Patek rencontre Jean Adrien Philippe lors de l\'Exposition Industrielle de Paris.',
        impact: 'Décisif',
        context: 'Philippe présente son système de remontoir à couronne qui rendra obsolète les clés',
        technicalDetails: 'Brevet n°1317 du 24 août 1844 pour le remontoir sans clé',
        witnesses: 'Médaille de bronze reçue à l\'exposition',
        rarity: 5,
        funFact: 'Leur stand était à côté de celui de Breguet'
      },
      {
        id: 3,
        year: 1851,
        era: 'golden',
        title: 'Consécration Royale',
        description: 'La Reine Victoria et le Prince Albert achètent des montres Patek Philippe lors de la Grande Exposition de Londres.',
        impact: 'International',
        context: 'Première montre royale britannique, ouvre les portes de la haute société',
        technicalDetails: 'Montre de gousset en or avec répétition minutes pour la Reine',
        witnesses: 'Archives royales britanniques',
        rarity: 5,
        funFact: 'Victoria portait sa Patek tous les jours jusqu\'à sa mort'
      },
      {
        id: 4,
        year: 1868,
        era: 'golden',
        title: 'Première Montre-Bracelet Suisse',
        description: 'Patek Philippe crée la première montre-bracelet suisse pour la Comtesse Koscowicz de Hongrie.',
        impact: 'Révolutionnaire',
        context: 'Invention précédant de 40 ans la popularisation des montres-bracelets',
        technicalDetails: 'Calibre miniature 27mm, boîtier or jaune, bracelet en or tissé',
        witnesses: 'Registre d\'archives Patek n°27368',
        rarity: 5,
        funFact: 'Elle pensait que c\'était une "absurdité" au début'
      },
      {
        id: 5,
        year: 1889,
        era: 'golden',
        title: 'Le Calibre le Plus Compliqué du Monde',
        description: 'Création de la montre de poche la plus compliquée jamais réalisée jusqu\'alors (10 complications).',
        impact: 'Record Mondial',
        context: 'Commandée par un collectionneur américain James Ward Packard',
        technicalDetails: 'Quantième perpétuel, répétition minutes, chronographe rattrapante, thermomètre',
        witnesses: 'Exposée au Patek Philippe Museum à Genève',
        rarity: 5,
        funFact: '5 ans de développement, 3 horlogers à temps plein'
      },
      {
        id: 6,
        year: 1925,
        era: 'complications',
        title: 'Révolution du Quantième Perpétuel',
        description: 'Première montre-bracelet au monde avec quantième perpétuel.',
        impact: 'Impossible devenu possible',
        context: 'Miniaturisation d\'un mécanisme jugé irréalisable en montre-bracelet',
        technicalDetails: 'Calibre 12-120 Q, 23 rubis, 97 composants pour le QP seul',
        witnesses: 'Vendue à un collectionneur genevois anonyme',
        rarity: 5,
        funFact: 'Seulement 7 exemplaires produits entre 1925 et 1940'
      },
      {
        id: 7,
        year: 1932,
        era: 'complications',
        title: 'Naissance du Calatrava',
        description: 'Lancement de la référence 96, modèle Calatrava iconique inspiré du Bauhaus.',
        impact: 'Design Éternel',
        context: 'Créé en pleine Grande Dépression, symbolise l\'élégance pure',
        technicalDetails: 'Cadran argenté, aiguilles Dauphine, boîtier 31mm',
        witnesses: 'Plus de 90 ans de production continue',
        rarity: 4,
        funFact: 'Le nom vient de l\'ordre militaire espagnol Calatrava'
      },
      {
        id: 8,
        year: 1932,
        era: 'complications',
        title: 'Sauvetage par la Famille Stern',
        description: 'Les frères Charles et Jean Stern rachètent Patek Philippe, sauvant la manufacture de la faillite.',
        impact: 'Indépendance Perpétuelle',
        context: 'Grande Dépression, beaucoup de manufactures disparaissent',
        technicalDetails: 'Les Stern étaient déjà fournisseurs de cadrans depuis 1902',
        witnesses: 'Contrat de vente conservé au musée',
        rarity: 5,
        funFact: 'Transaction conclue autour d\'un café au Café du Centre à Genève'
      },
      {
        id: 9,
        year: 1962,
        era: 'complications',
        title: 'Référence 2499 : La Légende',
        description: 'Lancement du chronographe quantième perpétuel Ref. 2499, graal des collectionneurs.',
        impact: 'Icône Absolue',
        context: 'Production de seulement 349 exemplaires en 35 ans',
        technicalDetails: 'Calibre 13-130 Q, phases de lune, QP, chronographe',
        witnesses: 'Record d\'enchères : 3,9M$ en 2018',
        rarity: 5,
        funFact: 'Un exemplaire appartenait à Eric Clapton'
      },
      {
        id: 10,
        year: 1976,
        era: 'modern',
        title: 'Le Nautilus de Gérald Genta',
        description: 'Lancement du Nautilus Ref. 3700/1A, révolution du sport-chic en acier.',
        impact: 'Nouveau Paradigme',
        context: 'Crise du quartz, Patek répond avec une montre de sport en acier à 3000$',
        technicalDetails: 'Boîtier octogonal 42mm, étanche 120m, bracelet intégré',
        witnesses: 'Genta l\'a dessiné en 5 minutes sur une serviette de table',
        rarity: 5,
        funFact: 'Échec commercial initial, devenu graal 40 ans plus tard'
      },
      {
        id: 11,
        year: 1989,
        era: 'modern',
        title: 'Calibre 89 : Le Sommet',
        description: 'Présentation du Calibre 89 pour le 150e anniversaire : 33 complications, 1728 composants.',
        impact: 'Record Absolu',
        context: 'Montre la plus compliquée au monde pendant 25 ans',
        technicalDetails: '9 ans de R&D, 4 exemplaires (or jaune, blanc, rose, platine)',
        witnesses: 'Exemplaire or blanc vendu 5M$ en 2004',
        rarity: 5,
        funFact: 'Le livret d\'utilisation fait 200 pages'
      },
      {
        id: 12,
        year: 2014,
        era: 'modern',
        title: 'Grandmaster Chime 6300 : L\'Olympe',
        description: 'Création pour le 175e anniversaire : 20 complications, première grande sonnerie en montre-bracelet.',
        impact: 'Zénith Technique',
        context: '7 ans de développement, 100\'000 heures de travail',
        technicalDetails: '1366 composants, boîtier réversible, 20 complications dont 5 inédites',
        witnesses: 'Only Watch 2019 : vendu 31M$ (record mondial)',
        rarity: 5,
        funFact: 'Nécessite 6 mois de formation pour comprendre toutes ses fonctions'
      }
    ],

    // Collections détaillées avec données de marché
    collections: [
      {
        id: 'calatrava',
        name: 'Calatrava',
        tagline: 'L\'essence de l\'élégance horlogère',
        foundingYear: 1932,
        philosophy: 'Design épuré inspiré du Bauhaus, forme ronde parfaite, lisibilité optimale',
        iconicReferences: [
          {
            ref: '96',
            year: 1932,
            description: 'Modèle fondateur, diamètre 31mm',
            production: '1932-présent',
            price: 'N/A (vintage)',
            rarity: 5,
            significance: 'Définit le langage design Patek'
          },
          {
            ref: '5196',
            year: 2004,
            description: 'Réinterprétation moderne du 96',
            production: '2004-présent',
            price: 'CHF 21,000-26,000',
            rarity: 2,
            significance: 'Best-seller entrée de gamme'
          },
          {
            ref: '5227',
            year: 2017,
            description: 'Cadran officier, fond transparent',
            production: '2017-présent',
            price: 'CHF 31,000-37,000',
            rarity: 3,
            significance: 'Mix classique-moderne parfait'
          },
          {
            ref: '6119',
            year: 2021,
            description: 'Cadran camaïeu bleu, automatique',
            production: '2021-présent',
            price: 'CHF 29,000-35,000',
            rarity: 2,
            significance: 'Couleur tendance contemporaine'
          }
        ],
        technicalSpecs: {
          movement: 'Calibre 215 PS (manuel) ou 324 S C (automatique)',
          powerReserve: '44-45 heures',
          frequency: '28,800 alternances/heure',
          jewels: '29 rubis',
          finishing: 'Poinçon de Genève',
          components: '164-213 pièces selon calibre'
        },
        marketData: {
          entryPrice: 21000,
          averagePrice: 37000,
          topPrice: 160000,
          waitingTime: 'Disponible sur demande',
          investmentPotential: 'Stable +5%/an',
          liquidityScore: 8
        },
        targetAudience: 'Puriste, amateur d\'élégance classique, première Patek',
        competitors: ['Vacheron Constantin Patrimony', 'A. Lange & Söhne Saxonia'],
        culturalImpact: 'Symbole du dress watch parfait, référence absolue du minimalisme horloger'
      },
      {
        id: 'nautilus',
        name: 'Nautilus',
        tagline: 'Le graal des collectionneurs modernes',
        foundingYear: 1976,
        philosophy: 'Sport-chic, luxe décontracté, boîtier octogonal iconique de Gérald Genta',
        iconicReferences: [
          {
            ref: '3700/1A',
            year: 1976,
            description: 'Jumbo original 42mm, acier',
            production: '1976-1990',
            price: 'CHF 210,000-530,000 (vintage)',
            rarity: 5,
            significance: 'Fondateur du sport-luxe'
          },
          {
            ref: '5711/1A',
            year: 2006,
            description: 'Réédition moderne 40mm',
            production: '2006-2021',
            price: 'CHF 160,000-320,000 (marché secondaire)',
            rarity: 5,
            significance: 'Montre la plus désirée au monde'
          },
          {
            ref: '5811/1G',
            year: 2021,
            description: 'Remplaçant du 5711, or gris',
            production: '2021-présent',
            price: 'CHF 85,000 (liste) / CHF 160,000+ (marché)',
            rarity: 5,
            significance: 'Succession controversée'
          },
          {
            ref: '5990/1A',
            year: 2014,
            description: 'Chronographe Travel Time',
            production: '2014-présent',
            price: 'CHF 95,000 (liste) / CHF 190,000+ (marché)',
            rarity: 5,
            significance: 'Complication sport la plus désirée'
          }
        ],
        technicalSpecs: {
          movement: 'Calibre 26-330 S C (automatique)',
          powerReserve: '35-45 heures',
          frequency: '28,800 alternances/heure',
          jewels: '30 rubis',
          waterResistance: '120 mètres',
          finishing: 'Poinçon Patek Philippe'
        },
        marketData: {
          entryPrice: 37000,
          averagePrice: 160000,
          topPrice: 530000,
          waitingTime: '10-15 ans en boutique (liste fermée)',
          investmentPotential: 'Exceptionnel +20%/an',
          liquidityScore: 10
        },
        targetAudience: 'Collectionneur avancé, investisseur, icône de statut',
        competitors: ['Audemars Piguet Royal Oak', 'Vacheron Constantin Overseas'],
        culturalImpact: 'Symbole ultime du statut social, montre la plus désirée du 21e siècle',
        culturalReferences: [
          'Jay-Z - "I got that Patek Philippe that you can\'t afford"',
          'Mark Wahlberg collection : 5 Nautilus différents',
          'Thierry Henry photographié avec Nautilus 5711 pendant Coupe du Monde'
        ]
      },
      {
        id: 'aquanaut',
        name: 'Aquanaut',
        tagline: 'L\'aventurier moderne accessible',
        foundingYear: 1997,
        philosophy: 'Sport-chic jeune, bracelet composite "Tropical", alternative au Nautilus',
        iconicReferences: [
          {
            ref: '5167A',
            year: 2007,
            description: 'Modèle emblématique 40mm',
            production: '2007-présent',
            price: 'CHF 23,000 (liste) / CHF 53,000+ (marché)',
            rarity: 4,
            significance: 'Entrée de gamme sport Patek'
          },
          {
            ref: '5168G',
            year: 2017,
            description: 'Jumbo 42mm or gris',
            production: '2017-présent',
            price: 'CHF 58,000 (liste) / CHF 95,000+ (marché)',
            rarity: 4,
            significance: 'Version luxe de l\'Aquanaut'
          },
          {
            ref: '5968A',
            year: 2018,
            description: 'Chronographe flyback',
            production: '2018-présent',
            price: 'CHF 48,000 (liste) / CHF 106,000+ (marché)',
            rarity: 5,
            significance: 'Première complication Aquanaut'
          }
        ],
        technicalSpecs: {
          movement: 'Calibre 26-330 S C ou 28-520 C (chronographe)',
          powerReserve: '35-55 heures',
          frequency: '28,800 alternances/heure',
          waterResistance: '120 mètres',
          bracelet: 'Composite Tropical (résistant eau salée, UV, transpiration)',
          finishing: 'Poinçon Patek Philippe'
        },
        marketData: {
          entryPrice: 23000,
          averagePrice: 64000,
          topPrice: 265000,
          waitingTime: '3-7 ans',
          investmentPotential: 'Fort +15%/an',
          liquidityScore: 9
        },
        targetAudience: 'Jeune collectionneur (30-45 ans), sportif chic, première montre sport luxe',
        competitors: ['Audemars Piguet Royal Oak Offshore', 'Richard Mille RM'],
        culturalImpact: 'Montre des jeunes entrepreneurs tech, alternative plus accessible au Nautilus'
      },
      {
        id: 'complications',
        name: 'Grandes Complications',
        tagline: 'Le sommet de l\'art horloger',
        foundingYear: 'Variable',
        philosophy: 'Excellence technique absolue, complications multiples, pièces d\'exception',
        iconicReferences: [
          {
            ref: '5320G',
            year: 2017,
            description: 'Quantième perpétuel chronographe',
            production: '2017-présent',
            price: 'CHF 127,000-160,000',
            rarity: 4,
            significance: 'QP accessible en or gris'
          },
          {
            ref: '5303R',
            year: 2019,
            description: 'Répétition minutes tourbillon',
            production: '2019-présent',
            price: 'CHF 585,000-690,000',
            rarity: 5,
            significance: 'Sonnerie + tourbillon'
          },
          {
            ref: '6301P',
            year: 2021,
            description: 'Grande sonnerie jump hour',
            production: '2021-présent',
            price: 'CHF 955,000-1,270,000',
            rarity: 5,
            significance: 'Une des montres les plus complexes'
          },
          {
            ref: '6300G',
            year: 2014,
            description: 'Grandmaster Chime',
            production: '2014-présent (sur commande)',
            price: 'CHF 2,650,000+ (si disponible)',
            rarity: 5,
            significance: 'Montre la plus compliquée de Patek'
          }
        ],
        technicalSpecs: {
          movement: 'Calibres uniques selon complication',
          powerReserve: '38-60 heures',
          complications: '3-20 selon modèle',
          fabricationTime: '800-1500 heures',
          components: '300-1400 pièces',
          finishing: 'Terminaison main absolue'
        },
        marketData: {
          entryPrice: 127000,
          averagePrice: 530000,
          topPrice: 2650000,
          waitingTime: 'Sur invitation uniquement',
          investmentPotential: 'Exceptionnel +25%/an',
          liquidityScore: 7
        },
        targetAudience: 'Grand collectionneur, UHNWI, passionné d\'horlogerie technique',
        competitors: ['Vacheron Constantin Les Cabinotiers', 'A. Lange & Söhne Zeitwerk'],
        culturalImpact: 'Pinnacle de l\'horlogerie mécanique, symbole ultime de maîtrise technique'
      }
    ],

    // Complications expliquées
    complications: [
      {
        id: 'perpetual-calendar',
        name: 'Quantième Perpétuel',
        shortName: 'QP',
        category: 'Calendrier',
        difficulty: 5,
        description: 'Affiche automatiquement la date correcte en tenant compte des mois de 28, 29, 30 et 31 jours, ainsi que des années bissextiles, jusqu\'en 2100.',
        technicalExplanation: 'Mécanisme à roues avec came de 48 mois qui encode le cycle des années bissextiles. Nécessite environ 150 composants supplémentaires.',
        history: 'Inventé au 18e siècle, miniaturisé en montre-bracelet par Patek en 1925',
        patekFirst: '1925 - Première montre-bracelet QP au monde',
        componentsCount: 150,
        adjustmentNeeded: '2100 (année non bissextile séculaire)',
        iconicModels: ['Ref. 3940', 'Ref. 5320G', 'Ref. 5236P'],
        priceImpact: '+CHF 53,000 à CHF 160,000',
        manufacturingTime: '200-300 heures',
        rarity: 'Environ 500 pièces/an toutes marques confondues',
        funFact: 'Si réglé correctement, ne nécessitera aucun ajustement avant l\'an 2100'
      },
      {
        id: 'minute-repeater',
        name: 'Répétition Minutes',
        shortName: 'RM',
        category: 'Sonnerie',
        difficulty: 5,
        description: 'Mécanisme qui sonne les heures, les quarts d\'heure et les minutes sur demande via un poussoir.',
        technicalExplanation: '2-3 marteaux frappent des timbres (ressorts métalliques) accordés. Son grave=heures, double son=quarts, son aigu=minutes.',
        history: 'Inventée fin 17e siècle pour lire l\'heure dans le noir. Patek maître absolu.',
        patekFirst: '1845 - Première répétition minutes Patek',
        componentsCount: 200,
        acousticChallenge: 'Optimiser la résonance dans un boîtier de 40mm',
        iconicModels: ['Ref. 5303R', 'Ref. 6301P', 'Ref. 5078G'],
        priceImpact: '+CHF 212,000 à CHF 530,000',
        manufacturingTime: '400-600 heures (réglage acoustique)',
        rarity: 'Moins de 50 pièces/an chez Patek',
        funFact: 'Le réglage sonore prend jusqu\'à 100 heures à lui seul'
      },
      {
        id: 'tourbillon',
        name: 'Tourbillon',
        shortName: 'TB',
        category: 'Régulation',
        difficulty: 4,
        description: 'Cage rotative contenant l\'échappement et le balancier pour compenser les effets de la gravité sur la précision.',
        technicalExplanation: 'La cage fait 1 tour/minute, moyennant les erreurs de marche dues aux positions verticales.',
        history: 'Inventé par Abraham-Louis Breguet en 1795. Patek l\'utilise avec parcimonie.',
        patekFirst: '1947 - Premier tourbillon-bracelet',
        componentsCount: 72,
        weight: 'Cage : 0.3 grammes (avec balancier)',
        iconicModels: ['Ref. 5303R', 'Ref. 5316/50P'],
        priceImpact: '+CHF 160,000 à CHF 318,000',
        manufacturingTime: '150-250 heures',
        rarity: 'Moins de 100 pièces/an chez Patek',
        funFact: 'Patek ne l\'utilise que dans des grandes complications, jamais seul'
      },
      {
        id: 'split-seconds',
        name: 'Chronographe Rattrapante',
        shortName: 'Split',
        category: 'Chronographe',
        difficulty: 4,
        description: 'Chronographe avec 2 aiguilles trotteuses pour mesurer des temps intermédiaires ou comparer deux durées.',
        technicalExplanation: 'Système de pinces qui bloquent/libèrent la 2e aiguille indépendamment.',
        history: 'Invention 19e siècle. Patek l\'associe souvent au QP.',
        patekFirst: '1923 - Premier chrono rattrapante-bracelet',
        componentsCount: 100,
        mechanicalChallenge: 'Synchronisation parfaite des 2 aiguilles au démarrage',
        iconicModels: ['Ref. 5372P', 'Ref. 5204G', 'Ref. 5370P'],
        priceImpact: '+CHF 85,000 à CHF 212,000',
        manufacturingTime: '180-280 heures',
        rarity: 'Environ 80 pièces/an chez Patek',
        funFact: 'Utilisé historiquement pour chronométrer des courses de chevaux'
      },
      {
        id: 'world-time',
        name: 'Heure Universelle',
        shortName: 'WT',
        category: 'Fuseaux horaires',
        difficulty: 3,
        description: 'Affiche simultanément l\'heure dans les 24 fuseaux horaires mondiaux via un disque rotatif des villes.',
        technicalExplanation: 'Disque 24h synchronisé avec disque des villes. Inventé par Louis Cottier en 1931.',
        history: 'Patek collabore avec Cottier dès 1937. Devient signature Patek.',
        patekFirst: '1937 - Première world time de poche',
        componentsCount: 80,
        cities: '24 villes représentant chaque fuseau',
        iconicModels: ['Ref. 2523', 'Ref. 5231J', 'Ref. 5330G'],
        priceImpact: '+CHF 42,000 à CHF 127,000',
        manufacturingTime: '120-200 heures',
        rarity: 'Environ 300 pièces/an',
        funFact: 'Le Ref. 2523 avec cloisonné est le Patek le plus cher vendu : $11.1M'
      },
      {
        id: 'equation-of-time',
        name: 'Équation du Temps',
        shortName: 'EoT',
        category: 'Astronomique',
        difficulty: 5,
        description: 'Affiche la différence entre le temps solaire vrai (cadran solaire) et le temps civil moyen (montre).',
        technicalExplanation: 'Came en forme de 8 (analemme) qui encode la variation annuelle (-16 à +14 minutes).',
        history: 'Complication astronomique rare. Patek l\'associe souvent au QP.',
        patekFirst: '1930s - Premières montres EoT',
        componentsCount: 50,
        precision: 'Écart encodé au jour près sur l\'année',
        iconicModels: ['Ref. 5208P', 'Ref. 5236P'],
        priceImpact: '+CHF 106,000 à CHF 318,000',
        manufacturingTime: '200-350 heures',
        rarity: 'Moins de 20 pièces/an',
        funFact: 'Complication totalement inutile mais fascinante intellectuellement'
      },
      {
        id: 'grande-sonnerie',
        name: 'Grande Sonnerie',
        shortName: 'GS',
        category: 'Sonnerie',
        difficulty: 5,
        description: 'Sonne automatiquement les heures et les quarts au passage, sans action du porteur. Mode petite sonnerie et silence disponibles.',
        technicalExplanation: 'Triple train de rouages : mouvement, sonnerie des heures, sonnerie des quarts. Le mécanisme le plus complexe en horlogerie.',
        history: 'Inventée au 17e siècle pour les horloges. Rarissime en montre-bracelet.',
        patekFirst: '2014 - Grandmaster Chime 6300 (première GS montre-bracelet Patek)',
        componentsCount: 400,
        energyConsumption: 'Nécessite ressorts supplémentaires puissants',
        iconicModels: ['Ref. 6300G Grandmaster Chime', 'Ref. 6301P'],
        priceImpact: '+CHF 530,000 à CHF 1,590,000',
        manufacturingTime: '800-1200 heures',
        rarity: 'Moins de 5 pièces/an toutes marques',
        funFact: 'La complication la plus prestigieuse de l\'horlogerie, plus rare qu\'un tourbillon'
      }
    ],

    // Données de marché et investissement
    marketInsights: {
      priceEvolution: [
        { year: 2010, nautilus5711: 26500, calatrava: 19000, indexPP: 100 },
        { year: 2015, nautilus5711: 37000, calatrava: 23000, indexPP: 140 },
        { year: 2020, nautilus5711: 85000, calatrava: 30000, indexPP: 220 },
        { year: 2024, nautilus5711: 212000, calatrava: 37000, indexPP: 380 }
      ],
      auctionRecords: [
        {
          model: 'Grandmaster Chime 6300A',
          price: 31000000,
          auction: 'Only Watch 2019',
          buyer: 'Anonyme',
          significance: 'Record absolu montre aux enchères'
        },
        {
          model: 'Henry Graves Supercomplication',
          price: 24000000,
          auction: 'Sotheby\'s 2014',
          buyer: 'Anonyme',
          significance: 'Montre la plus compliquée du 20e siècle'
        },
        {
          model: 'Ref. 2523 World Time (cloisonné)',
          price: 11100000,
          auction: 'Christie\'s 2019',
          buyer: 'Anonyme',
          significance: 'Calatrava vintage le plus cher'
        },
        {
          model: 'Ref. 1518 (acier)',
          price: 11000000,
          auction: 'Phillips 2016',
          buyer: 'Anonyme',
          significance: 'Seulement 4 exemplaires acier connus'
        }
      ],
      investmentTips: [
        'Acier > Or : L\'acier sport surperforme l\'or classique (+300% vs +50% sur 10 ans)',
        'Complications rares : QP, Répétition Minutes, World Time vintage sont des valeurs sûres',
        'Discontinués : Une référence arrêtée prend +50% en 2 ans (ex: 5711)',
        'État : Une montre NOS (New Old Stock) vaut 2-3x une montre portée',
        'Provenance : Papers + box obligatoires, provenance célèbre ajoute 20-50%',
        'Marché suisse : Les prix en CHF sont généralement 5-8% plus favorables qu\'en EUR'
      ],
      waitingLists: [
        { model: 'Nautilus 5711 (arrêté)', wait: 'Liste fermée', reality: 'Impossible' },
        { model: 'Nautilus 5811', wait: '10-15 ans', reality: 'Clients VIP uniquement' },
        { model: 'Aquanaut 5167A', wait: '3-7 ans', reality: 'Réaliste avec historique achat' },
        { model: 'Calatrava 5227', wait: '0-6 mois', reality: 'Accessible' },
        { model: 'Complications sur mesure', wait: '2-5 ans', reality: 'Sur invitation uniquement' }
      ]
    },

    // Processus de fabrication
    manufacturing: {
      headquarters: 'Plan-les-Ouates, Genève, Suisse',
      employees: 2000,
      production: '60,000 montres/an (estimation)',
      manufacturingSteps: [
        {
          step: 1,
          name: 'Design & R&D',
          duration: '2-7 ans',
          description: 'Conception, prototypage, tests de fiabilité sur 10 ans simulés',
          team: '50+ ingénieurs et designers'
        },
        {
          step: 2,
          name: 'Fabrication des composants',
          duration: '3-6 mois',
          description: 'Usinage ultra-précision (microns), tournage, fraising, polissage',
          precision: 'Tolérance : 0.001mm'
        },
        {
          step: 3,
          name: 'Décoration',
          duration: '50-200 heures',
          description: 'Anglage, perlage, Côtes de Genève, polissage miroir, gravure',
          artisans: 'Maîtres décorateurs avec 10+ ans d\'expérience'
        },
        {
          step: 4,
          name: 'Assemblage mouvement',
          duration: '100-800 heures',
          description: 'Assemblage des 130-1366 composants, lubrification, réglage',
          expertise: 'Horlogers niveau 5+ (échelle interne 1-7)'
        },
        {
          step: 5,
          name: 'Emboîtage',
          duration: '20-80 heures',
          description: 'Intégration mouvement dans boîtier, tests étanchéité, pose cadran/aiguilles',
          challenge: 'Zéro poussière, salle blanche classe 1000'
        },
        {
          step: 6,
          name: 'Contrôle qualité Patek Philippe Seal',
          duration: '2-4 semaines',
          description: '23 critères dont précision -3/+2 sec/jour, finitions, étanchéité, réserve de marche',
          rejectRate: '15-20% des montres recalées'
        }
      ],
      materials: [
        { name: 'Or 18K', source: 'Suisse, raffiné en interne', purity: '750‰' },
        { name: 'Platine 950', source: 'Afrique du Sud', purity: '950‰' },
        { name: 'Acier 904L', source: 'Suisse', properties: 'Inoxydable, hypoallergénique' },
        { name: 'Saphir synthétique', source: 'Fabriqué en interne', properties: 'Dureté 9/10 Mohs' },
        { name: 'Rubis synthétiques', source: 'Fabriqué en interne', usage: 'Paliers pour réduire friction' }
      ],
      innovations: [
        {
          year: 2005,
          name: 'Spiral Spiromax',
          description: 'Spiral en silicium, anti-magnétique, précision +30%',
          impact: 'Révolution de la précision'
        },
        {
          year: 2011,
          name: 'GyromaxSi',
          description: 'Balancier en silicium ultra-léger',
          impact: 'Résistance aux chocs +50%'
        },
        {
          year: 2015,
          name: 'Calibre 31-260 PS QL',
          description: 'Micro-rotor périphérique, réserve 50h',
          impact: 'Finesse record pour mouvement automatique'
        }
      ]
    },

    // Patrimoine culturel
    culturalHeritage: {
      museum: {
        name: 'Patek Philippe Museum',
        location: 'Rue des Vieux-Grenadiers 7, Genève',
        founded: 2001,
        collection: '2500+ montres et automates',
        highlights: [
          'Montres Patek historiques depuis 1839',
          'Collection de montres anciennes 1500-1850',
          'Portraits miniatures sur émail',
          'Bibliothèque horlogère 8000 ouvrages'
        ],
        admission: 'CHF 10 (gratuit -18 ans)'
      },
      royalPatrons: [
        { name: 'Reine Victoria', country: 'Royaume-Uni', year: 1851 },
        { name: 'Prince Albert', country: 'Royaume-Uni', year: 1851 },
        { name: 'Reine Elizabeth II', country: 'Royaume-Uni', year: 1953 },
        { name: 'Emperor Hirohito', country: 'Japon', year: 1970 },
        { name: 'King Faisal', country: 'Arabie Saoudite', year: 1960 },
        { name: 'Duke of Windsor', country: 'Royaume-Uni', year: 1935 }
      ],
      celebrities: [
        { name: 'Pablo Picasso', model: 'Calatrava', era: '1960s' },
        { name: 'Eric Clapton', model: 'Ref. 2499', significance: 'Collectionneur majeur' },
        { name: 'Jay-Z', model: 'Grandmaster Chime', value: '$2.5M' },
        { name: 'Drake', model: 'Nautilus 5711 Tiffany', value: '$6.5M' },
        { name: 'John Mayer', collection: '12+ Patek', significance: 'Ambassadeur officieux' },
        { name: 'Brad Pitt', model: 'Nautilus 5711', occasion: 'Tapis rouge régulièrement' }
      ],
      mediaAppearances: [
        { movie: 'Scarface (1983)', character: 'Tony Montana', model: 'Calatrava' },
        { movie: 'Casino (1995)', character: 'Robert De Niro', model: 'Complications' },
        { series: 'Succession', character: 'Kendall Roy', model: 'Nautilus 5711' },
        { series: 'Billions', character: 'Bobby Axelrod', model: 'Nautilus Iced' }
      ]
    },

    // Comparaisons avec concurrents
    competitors: [
      {
        brand: 'Audemars Piguet',
        iconic: 'Royal Oak',
        strengths: 'Design Genta plus sportif, production limitée',
        weakness: 'Moins de complications horlogères',
        priceComparison: 'Similaire (Nautilus vs RO)',
        verdict: 'Rival principal sur le sport-luxe'
      },
      {
        brand: 'Vacheron Constantin',
        iconic: 'Overseas / Patrimony',
        strengths: 'Plus ancienne manufacture (1755), Poinçon de Genève',
        weakness: 'Moins de hype sur marché secondaire',
        priceComparison: '10-20% moins cher',
        verdict: 'Alternative classique et élégante'
      },
      {
        brand: 'A. Lange & Söhne',
        iconic: 'Lange 1 / Zeitwerk',
        strengths: 'Finitions allemandes superlatives, innovation',
        weakness: 'Moins iconique, marché secondaire moins liquide',
        priceComparison: '10-30% moins cher',
        verdict: 'Concurrent technique sérieux'
      },
      {
        brand: 'Rolex',
        iconic: 'Daytona / Submariner',
        strengths: 'Production massive, robustesse, liquidité',
        weakness: 'Moins de prestige manufacture, moins de complications',
        priceComparison: '50-70% moins cher',
        verdict: 'Concurrent sur le sport, pas sur les complications'
      }
    ]
  };

  // ============ HOOKS ============
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrolled / maxScroll) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (KONAMI_CODE[konamiProgress] === e.key) {
        const newProgress = konamiProgress + 1;
        setKonamiProgress(newProgress);
        if (newProgress === KONAMI_CODE.length) {
          setExpertMode(true);
        }
      } else {
        setKonamiProgress(0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiProgress]);

   // ============ HANDLERS ============
  const toggleFavorite = (id: number | string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const toggleCompare = (id: number | string) => {
    if (compareList.includes(id)) {
      setCompareList(prev => prev.filter(c => c !== id));
    } else if (compareList.length < 3) {
      setCompareList(prev => [...prev, id]);
    }
  };

  const filteredCollections = encyclopedicData.collections.filter((c: any) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'sport') return ['nautilus', 'aquanaut'].includes(c.id);
    if (activeFilter === 'classic') return c.id === 'calatrava';
    if (activeFilter === 'complications') return c.id === 'complications';
    return true;
  });

  const filteredMilestones = encyclopedicData.historicalMilestones.filter((m: any) => 
    selectedEra === 'all' || m.era === selectedEra
  );

  // ============ RENDER ============
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      {/* Reste de votre JSX... */}

      {/* Expert Mode Badge */}
      {expertMode && (
        <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-2 rounded-full text-sm font-bold animate-pulse shadow-lg">
          🏆 Mode Expert Débloqué
        </div>
      )}

      {/* HERO SECTION */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-slate-900/50" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 text-center">
          <div className="flex justify-center mb-8">
            <Crown className="w-24 h-24 text-yellow-400 animate-pulse" />
          </div>
          
          <h1 className="text-7xl md:text-9xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-300 to-white">
            Patek Philippe
          </h1>
          
          <p className="text-2xl md:text-3xl text-blue-200 mb-4 italic max-w-4xl mx-auto leading-relaxed">
            "Vous ne possédez jamais complètement une Patek Philippe.<br/>
            <span className="text-yellow-300">Vous en êtes le gardien pour les générations futures."</span>
          </p>
          
          <p className="text-lg text-slate-300 mb-12 max-w-3xl mx-auto">
            Guide encyclopédique complet • 185 ans d'histoire • 60,000+ montres produites • Excellence absolue
          </p>

          {/* Stats Hero */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
            {[
              { label: 'Fondation', value: '1839', icon: Calendar },
              { label: 'Brevets', value: '70+', icon: Award },
              { label: 'Indépendance', value: '100%', icon: Shield },
              { label: 'Croissance/an', value: '+15%', icon: TrendingUp }
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all hover:scale-105">
                <stat.icon className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <div className="text-4xl font-bold text-yellow-400 mb-2">{stat.value}</div>
                <div className="text-sm text-slate-300">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
  onClick={() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })}
  className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all hover:scale-105 shadow-2xl flex items-center gap-3 justify-center"
>
  <BookOpen className="w-6 h-6" />
  Explorer l'Histoire
</button>
<button 
  onClick={() => document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })}
  className="bg-white/10 backdrop-blur-xl px-8 py-4 rounded-full font-bold text-lg border-2 border-white/20 hover:bg-white/20 transition-all hover:scale-105 shadow-2xl flex items-center justify-center gap-3"
>
  <Watch className="w-6 h-6" />
              Voir les Collections
            </button>
          </div>

          <div className="mt-12 animate-bounce">
            <ChevronDown className="w-8 h-8 text-yellow-400 mx-auto" />
          </div>
        </div>
      </header>

      {/* NAVIGATION STICKY */}
      <nav className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 overflow-x-auto">
            <div className="flex gap-2 text-sm font-medium">
              {[
                { id: 'overview', label: 'Vue d\'ensemble', icon: Eye },
                { id: 'timeline', label: 'Histoire', icon: Clock },
                { id: 'collections', label: 'Collections', icon: Watch },
                { id: 'complications', label: 'Complications', icon: Settings },
                { id: 'market', label: 'Marché', icon: TrendingUp },
                { id: 'manufacturing', label: 'Fabrication', icon: Hammer }
              ].map(section => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`px-4 py-2 rounded-full transition-all whitespace-nowrap flex items-center gap-2 ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <section.icon className="w-4 h-4" />
                  {section.label}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all relative">
                <Bookmark className="w-5 h-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* TIMELINE SECTION */}
      <section id="timeline" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-300 to-white">
              185 Ans d'Excellence
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Chaque date est une révolution. Découvrez les moments qui ont façonné l'horlogerie moderne.
            </p>
          </div>

          {/* Era Filter */}
          <div className="flex gap-3 justify-center mb-12 flex-wrap">
            {[
              { id: 'all', label: 'Toutes les Époques', color: 'blue' },
              { id: 'foundation', label: '1839-1851: Fondation', color: 'blue' },
              { id: 'golden', label: '1851-1925: Âge d\'Or', color: 'amber' },
              { id: 'complications', label: '1925-1976: Complications', color: 'purple' },
              { id: 'modern', label: '1976-2024: Modernité', color: 'cyan' }
            ].map(era => (
              <button
                key={era.id}
                onClick={() => setSelectedEra(era.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedEra === era.id
                    ? `bg-${era.color}-600 text-white shadow-lg shadow-${era.color}-500/50`
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {era.label}
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div className="space-y-8">
            {filteredMilestones.map((milestone, index) => (
              <div 
                key={milestone.id}
                className="group relative"
              >
                <div className="absolute left-0 top-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
                
                <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/80 rounded-3xl p-8 border border-slate-700/50 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20">
                  {/* Year Badge */}
                  <div className="absolute -top-6 left-8 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-full font-bold text-2xl shadow-lg">
                    {milestone.year}
                  </div>

                  {/* Rarity Stars */}
                  <div className="absolute top-6 right-6 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < milestone.rarity ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'}`} 
                      />
                    ))}
                  </div>

                  <div className="mt-6">
                    <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">
                      {milestone.title}
                    </h3>
                    
                    <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                      {milestone.description}
                    </p>

                    {/* Details Grid */}
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="text-xs text-slate-400 mb-1">Impact</div>
                        <div className="text-yellow-400 font-bold">{milestone.impact}</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="text-xs text-slate-400 mb-1">Contexte Historique</div>
                        <div className="text-slate-200 text-sm">{milestone.context}</div>
                      </div>
                    </div>

                    {/* Technical Details - Expert Mode */}
                    {expertMode && (
                      <div className="mt-6 pt-6 border-t border-slate-700/50 space-y-3">
                        <div className="flex items-start gap-3">
                          <Microscope className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-xs text-slate-400 mb-1">Détails Techniques</div>
                            <div className="text-slate-300 text-sm">{milestone.technicalDetails}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <BookOpen className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-xs text-slate-400 mb-1">Sources & Témoignages</div>
                            <div className="text-slate-300 text-sm">{milestone.witnesses}</div>
                          </div>
                        </div>
                        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mt-4">
                          <div className="flex items-start gap-3">
                            <Sparkles className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="text-xs text-yellow-400 font-bold mb-1">Anecdote</div>
                              <div className="text-slate-200 text-sm italic">{milestone.funFact}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 mt-6">
                      <button 
                        onClick={() => toggleFavorite(milestone.id)}
                        className={`p-2 rounded-lg transition-all ${
                          favorites.includes(milestone.id)
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-white/5 text-slate-400 hover:bg-white/10'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${favorites.includes(milestone.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2">
                        <Info className="w-4 h-4" />
                        En savoir plus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COLLECTIONS SECTION */}
      <section id="collections" className="py-32 bg-gradient-to-b from-slate-900 to-black relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-300 to-white">
              Collections Iconiques
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Quatre piliers qui définissent l'excellence horlogère. Comparez, explorez, collectionnez.
            </p>

            {/* Filter Buttons */}
            <div className="flex gap-3 justify-center flex-wrap">
              {[
                { id: 'all', label: 'Toutes', icon: Watch },
                { id: 'sport', label: 'Sport Luxe', icon: Zap },
                { id: 'classic', label: 'Classiques', icon: Crown },
                { id: 'complications', label: 'Complications', icon: Settings }
              ].map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                    activeFilter === filter.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <filter.icon className="w-4 h-4" />
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Collections Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {filteredCollections.map((collection) => (
              <div 
                key={collection.id}
                className="group relative bg-gradient-to-br from-slate-800/60 to-slate-900/80 rounded-3xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20"
              >
                {/* Visual Area */}
                <div className="relative h-80 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 group-hover:opacity-100 opacity-0 transition-opacity" />
                  <Watch className="w-48 h-48 text-yellow-400 relative z-10 group-hover:scale-110 transition-transform duration-700" />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold">
                    {collection.foundingYear}
                  </div>
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-xs">
                    {collection.marketData.waitingTime}
                  </div>
                  
                  {/* Action Buttons Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => toggleFavorite(collection.id)}
                      className={`p-3 rounded-full backdrop-blur-xl transition-all ${
                        favorites.includes(collection.id)
                          ? 'bg-red-500/80 text-white'
                          : 'bg-black/50 text-white hover:bg-black/70'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${favorites.includes(collection.id) ? 'fill-current' : ''}`} />
                    </button>
                    <button 
                      onClick={() => toggleCompare(collection.id)}
                      className={`flex-1 rounded-full backdrop-blur-xl font-medium transition-all ${
                        compareList.includes(collection.id)
                          ? 'bg-purple-500/80 text-white'
                          : 'bg-black/50 text-white hover:bg-black/70'
                      }`}
                    >
                      {compareList.includes(collection.id) ? '✓ Ajouté' : 'Comparer'}
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2">{collection.name}</h3>
                      <p className="text-blue-400 italic">{collection.tagline}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-yellow-400">
                        CHF {(collection.marketData.entryPrice / 1000).toFixed(0)}K+
                      </div>
                      <div className="text-xs text-slate-400">Prix d'entrée</div>
                    </div>
                  </div>

                  <p className="text-slate-300 mb-6 leading-relaxed">
                    {collection.philosophy}
                  </p>

                  {/* Key Specs */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 rounded-xl p-3">
                      <div className="text-xs text-slate-400 mb-1">Mouvement</div>
                      <div className="text-sm text-white font-medium">{collection.technicalSpecs.movement}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3">
                      <div className="text-xs text-slate-400 mb-1">Réserve</div>
                      <div className="text-sm text-white font-medium">{collection.technicalSpecs.powerReserve}</div>
                    </div>
                  </div>

                  {/* Iconic References */}
                  <div className="mb-6">
                    <div className="text-sm font-bold text-slate-400 mb-3">Références Iconiques</div>
                    <div className="flex flex-wrap gap-2">
                      {collection.iconicReferences.slice(0, 3).map(ref => (
                        <span 
                          key={ref.ref}
                          className="bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded-full text-xs text-blue-300"
                        >
                          {ref.ref}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Market Data - Expert Mode */}
                  {expertMode && (
                    <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-4 mb-6">
                      <div className="text-sm font-bold text-purple-300 mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Données Marché Expert
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-xs">
                        <div>
                          <div className="text-slate-400">ROI/an</div>
                          <div className="text-green-400 font-bold">{collection.marketData.investmentPotential}</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Liquidité</div>
                          <div className="text-yellow-400 font-bold">{collection.marketData.liquidityScore}/10</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Prix Moyen</div>
                          <div className="text-blue-400 font-bold">CHF {(collection.marketData.averagePrice / 1000).toFixed(0)}K</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 group">
                    Explorer la Collection
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Comparator Panel */}
{compareList.length > 0 && (
  <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/30 rounded-3xl p-8 backdrop-blur-xl">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-2xl font-bold text-white flex items-center gap-3">
        <BarChart3 className="w-6 h-6 text-purple-400" />
        Comparateur ({compareList.length}/3)
      </h3>
      <button 
        onClick={() => setCompareList([])}
        className="text-slate-400 hover:text-white transition-colors"
      >
        <X className="w-6 h-6" />
      </button>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      {compareList.map(id => {
        const collection = encyclopedicData.collections.find(c => c.id === id);
        return (
          <div key={id} className="bg-white/5 rounded-xl p-6">
            <h4 className="text-xl font-bold text-white mb-4">
              {collection?.name || 'Collection non trouvée'}
            </h4>
            {collection && (
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Prix entrée</span>
                  <span className="text-yellow-400 font-bold">
                    CHF {(collection.marketData.entryPrice / 1000).toFixed(0)}K
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Attente</span>
                  <span className="text-slate-200">{collection.marketData.waitingTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">ROI</span>
                  <span className="text-green-400 font-bold">
                    {collection.marketData.investmentPotential}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Liquidité</span>
                  <span className="text-blue-400 font-bold">
                    {collection.marketData.liquidityScore}/10
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
)}

          
      {/* COMPLICATIONS SECTION */}
      <section id="complications" className="py-32 bg-gradient-to-b from-black to-purple-900/30 relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-300 to-white">
              Complications Horlogères
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Les mécanismes les plus sophistiqués de l'horlogerie. Seuls les meilleurs horlogers au monde peuvent les assembler.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {encyclopedicData.complications.map((complication) => (
              <div 
                key={complication.id}
                className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all hover:scale-105"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-xl">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < complication.difficulty ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'}`} 
                      />
                    ))}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{complication.name}</h3>
                <div className="text-xs text-purple-400 font-medium mb-4">{complication.category} • {complication.shortName}</div>
                
                <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                  {complication.description}
                </p>

                {expertMode && (
                  <div className="space-y-3 pt-4 border-t border-slate-700/50">
                    <div className="text-xs">
                      <span className="text-slate-400">Composants: </span>
                      <span className="text-white font-bold">{complication.componentsCount}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-slate-400">Fabrication: </span>
                      <span className="text-white font-bold">{complication.manufacturingTime}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-slate-400">Impact prix: </span>
                      <span className="text-green-400 font-bold">{complication.priceImpact}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-slate-400">Rareté: </span>
                      <span className="text-yellow-400 font-bold">{complication.rarity}</span>
                    </div>
                    
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mt-3">
                      <div className="text-xs text-yellow-400 font-bold mb-1">💡 Le saviez-vous ?</div>
                      <div className="text-xs text-slate-300">{complication.funFact}</div>
                    </div>
                  </div>
                )}

                <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all">
                  Voir les Modèles
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARKET INSIGHTS SECTION */}
      <section id="market" className="py-32 bg-gradient-to-b from-purple-900/30 to-blue-900/30 relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-300 to-white">
              Marché & Investissement
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Données exclusives sur les prix, records d'enchères et stratégies d'investissement.
            </p>
          </div>

          {/* Auction Records */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-400" />
              Records d'Enchères Mondiaux
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {encyclopedicData.marketInsights.auctionRecords.map((record, i) => (
                <div 
                  key={i}
                  className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-2xl p-6 hover:scale-105 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-yellow-500/20 px-3 py-1 rounded-full text-yellow-400 text-xs font-bold">
                      #{i + 1}
                    </div>
                    <div className="text-3xl font-bold text-yellow-400">
                      ${(record.price / 1000000).toFixed(1)}M
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{record.model}</h4>
                  <div className="text-sm text-slate-300 mb-4">{record.auction}</div>
                  <div className="bg-white/5 rounded-lg p-3 text-xs text-slate-400">
                    {record.significance}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price Evolution Chart */}
          <div className="mb-16 bg-gradient-to-br from-slate-800/60 to-slate-900/80 rounded-3xl p-8 border border-slate-700/50">
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <LineChart className="w-8 h-8 text-blue-400" />
              Évolution des Prix (2010-2024)
            </h3>
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {encyclopedicData.marketInsights.priceEvolution.map(data => (
                <div key={data.year} className="bg-white/5 rounded-xl p-4">
                  <div className="text-2xl font-bold text-white mb-2">{data.year}</div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-slate-400">Nautilus 5711: </span>
                      <span className="text-green-400 font-bold">CHF {(data.nautilus5711 / 1000).toFixed(0)}K</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Calatrava: </span>
                      <span className="text-blue-400 font-bold">CHF {(data.calatrava / 1000).toFixed(0)}K</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Index PP: </span>
                      <span className="text-yellow-400 font-bold">{data.indexPP}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
              <div className="text-lg font-bold text-blue-300 mb-2">📊 Analyse</div>
              <p className="text-slate-300 text-sm">
                Le Nautilus 5711 a enregistré une croissance de <span className="text-green-400 font-bold">+700%</span> en 14 ans, 
                tandis que le Calatrava a progressé de <span className="text-blue-400 font-bold">+94%</span>. 
                L'indice Patek Philippe global affiche une performance de <span className="text-yellow-400 font-bold">+280%</span>, 
                surperformant largement l'or (+65%) et le S&P 500 (+210%) sur la même période.
              </p>
            </div>
          </div>

          {/* Investment Tips */}
          <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/30 rounded-3xl p-8">
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Calculator className="w-8 h-8 text-green-400" />
              Conseils d'Investissement Expert
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {encyclopedicData.marketInsights.investmentTips.map((tip, i) => (
                <div key={i} className="flex items-start gap-4 bg-white/5 rounded-xl p-4">
                  <div className="bg-green-500/20 p-2 rounded-lg flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-green-400" />
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MANUFACTURING SECTION */}
      <section id="manufacturing" className="py-32 bg-gradient-to-b from-blue-900/30 to-slate-900 relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-300 to-white">
              L'Art de la Fabrication
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              De la conception à l'assemblage final, découvrez le processus qui rend chaque Patek Philippe unique.
            </p>
          </div>

          {/* Manufacturing Steps */}
          <div className="space-y-6 mb-16">
            {encyclopedicData.manufacturing.manufacturingSteps.map((step) => (
              <div 
                key={step.step}
                className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 rounded-2xl p-8 border border-slate-700/50 hover:border-blue-500/50 transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-white">{step.name}</h3>
                      <div className="bg-blue-500/20 px-4 py-2 rounded-full text-sm font-medium text-blue-300">
                        {step.duration}
                      </div>
                    </div>
                    <p className="text-slate-300 mb-4 leading-relaxed">{step.description}</p>
                    {expertMode && (
                      <div className="bg-white/5 rounded-xl p-4 text-sm">
                        <span className="text-slate-400">Expert: </span>
                        <span className="text-white">{step.team || step.expertise || step.artisans || step.challenge || step.rejectRate}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Key Facts */}
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Users, label: 'Employés', value: encyclopedicData.manufacturing.employees },
              { icon: Watch, label: 'Production/an', value: encyclopedicData.manufacturing.production },
              { icon: Globe, label: 'Site', value: 'Plan-les-Ouates, CH' },
              { icon: Award, label: 'Contrôles', value: '23 critères Patek Seal' }
            ].map((fact, i) => (
              <div key={i} className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-2xl p-6 text-center">
                <fact.icon className="w-10 h-10 text-blue-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">{fact.value}</div>
                <div className="text-sm text-slate-400">{fact.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="max-w-5xl mx-auto px-8 text-center relative z-10">
          <Crown className="w-20 h-20 text-yellow-400 mx-auto mb-8 animate-pulse" />
          <h2 className="text-6xl font-bold text-white mb-6">
            La Référence Absolue Patek Philippe
          </h2>
          <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
            Guide encyclopédique complet • 185 ans d'histoire • Données marché exclusives • Mode Expert
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <BookOpen className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">12</div>
              <div className="text-white/80">Étapes Historiques</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <Watch className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">20+</div>
              <div className="text-white/80">Modèles Analysés</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <TrendingUp className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">CHF 31M</div>
              <div className="text-white/80">Record Mondial</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-purple-600 px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-2xl flex items-center gap-3 justify-center"
            >
              <RotateCcw className="w-6 h-6" />
              Relire depuis le début
            </button>
            <button 
              onClick={() => {
                const favSection = document.getElementById('collections');
                favSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white/10 backdrop-blur-xl text-white px-10 py-5 rounded-full font-bold text-lg border-2 border-white hover:bg-white hover:text-purple-600 transition-all shadow-2xl flex items-center gap-3 justify-center"
            >
              <Bookmark className="w-6 h-6" />
              Comparer les Collections
            </button>
          </div>

          {!expertMode && (
            <div className="mt-12 bg-yellow-500/20 border-2 border-yellow-400/50 rounded-2xl p-6 max-w-2xl mx-auto">
              <p className="text-yellow-300 font-bold mb-2">🎮 Easter Egg Caché</p>
              <p className="text-sm text-white/80">
                Tapez le code Konami pour débloquer le Mode Expert avec données exclusives :<br/>
                <span className="font-mono text-yellow-300">↑ ↑ ↓ ↓ ← → ← → B A</span>
              </p>
            </div>
          )}

          {expertMode && (
            <div className="mt-12 bg-gradient-to-r from-yellow-500/30 to-orange-500/30 border-2 border-yellow-400 rounded-2xl p-6 max-w-2xl mx-auto">
              <p className="text-yellow-300 font-bold mb-2 flex items-center justify-center gap-2">
                <Trophy className="w-6 h-6" />
                Mode Expert Activé !
              </p>
              <p className="text-sm text-white">
                Vous avez accès aux données techniques exclusives, processus de fabrication détaillés et insights marché avancés. Scrollez pour découvrir les secrets de manufacture.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Crown className="w-8 h-8 text-yellow-400" />
                <span className="text-2xl font-bold text-white">Patek Philippe</span>
              </div>
              <p className="text-slate-400 text-sm">
                La référence mondiale en horlogerie de luxe depuis 1839.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Explorez</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="hover:text-white transition-colors cursor-pointer">Collections</li>
                <li className="hover:text-white transition-colors cursor-pointer">Complications</li>
                <li className="hover:text-white transition-colors cursor-pointer">Histoire</li>
                <li className="hover:text-white transition-colors cursor-pointer">Investissement</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Ressources</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="hover:text-white transition-colors cursor-pointer">Guide PDF</li>
                <li className="hover:text-white transition-colors cursor-pointer">Archives</li>
                <li className="hover:text-white transition-colors cursor-pointer">Comparateur</li>
                <li className="hover:text-white transition-colors cursor-pointer">Prix du Marché</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Communauté</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="hover:text-white transition-colors cursor-pointer">Forum Collectionneurs</li>
                <li className="hover:text-white transition-colors cursor-pointer">Newsletter</li>
                <li className="hover:text-white transition-colors cursor-pointer">Événements</li>
                <li className="hover:text-white transition-colors cursor-pointer">Contact Expert</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © 2024 HorloLearn - Référence Mondiale Patek Philippe
            </p>
            <div className="flex gap-4">
              <button className="text-slate-400 hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </button>
              <button className="text-slate-400 hover:text-white transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="text-slate-400 hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-40">
        {favorites.length > 0 && (
          <button className="bg-gradient-to-r from-red-500 to-pink-500 p-4 rounded-full shadow-2xl hover:scale-110 transition-all relative">
            <Heart className="w-6 h-6 text-white fill-current" />
            <span className="absolute -top-2 -right-2 bg-white text-red-500 text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
              {favorites.length}
            </span>
          </button>
        )}
        
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full shadow-2xl hover:scale-110 transition-all"
        >
          <ChevronDown className="w-6 h-6 text-white rotate-180" />
        </button>
      </div>

      {/* Styles additionnels */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
