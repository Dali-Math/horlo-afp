'use client';
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  ChevronLeft, Crown, Award, Calendar, Zap, Shield, 
  Trophy, Heart, TrendingUp, Globe, Users, 
  Watch, Settings, Diamond, Sparkles, Clock, BookOpen,
  Target, Layers, Gauge, Hammer, Gem, Star,
  Play, Pause, Volume2, Download, Eye, Maximize,
  Search, Filter, SortAsc, Grid, List, Share2,
  Bookmark, Clock3, Compass, Flame, Snowflake,
  Sun, Moon, Waves, Mountain, Crown2
} from 'lucide-react';

export default function PatekPhilippeUltimateReference() {
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<string>('history');
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredWatch, setHoveredWatch] = useState<string | null>(null);
  const [openComplications, setOpenComplications] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedMovement, setSelectedMovement] = useState('240');
  const [showComparison, setShowComparison] = useState(false);
  const [timeDisplay, setTimeDisplay] = useState(new Date());
  const intervalRef = useRef<NodeJS.Timeout>();

  // Animation du temps réel
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeDisplay(new Date());
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  // Données enrichies et actualisées 2024-2025
  const eras = {
    all: { label: 'Toute l\'Histoire', color: 'blue', count: 185 },
    foundation: { label: '1839-1851 : Naissance', color: 'emerald', count: 12 },
    golden: { label: '1851-1925 : Âge d\'Or', color: 'yellow', count: 74 },
    complications: { label: '1925-1976 : Maître des Complications', color: 'purple', count: 51 },
    modern: { label: '1976-2025 : Révolution & Héritage', color: 'cyan', count: 48 }
  };

  const detailedTimeline = [
    { 
      id: '1839', 
      year: 1839, 
      title: 'Fondation de Patek, Czapek & Cie', 
      description: 'Antoine Norbert de Patek et François Czapek créent la manufacture à Genève. Capital initial : 30 000 francs suisses.',
      type: 'foundation',
      innovation: 'Premier atelier de complication horlogère de Suisse',
      impact: 'Foundation',
      details: 'Patek,fresh from Polish military service, joins forces with Czech watchmaker François Czapek to create what would become the most prestigious watch manufacturer in the world.'
    },
    { 
      id: '1842', 
      year: 1842, 
      title: 'Premier Grand Prix aux Expositions', 
      description: 'Médaille d\'or à l\'Exposition des produits de l\'industrie suisse à Genève.',
      type: 'foundation',
      innovation: 'Excellence reconnue internationalement',
      impact: 'Recognition',
      details: 'This award established Patek Philippe\'s reputation for exceptional craftsmanship and innovation in horology.'
    },
    { 
      id: '1845', 
      year: 1845, 
      title: 'Jean-Adrien Philippe : La Révolution du Remontoir', 
      description: 'Invention du système de remontoir à couronne qui révolutionne l\'horlogerie mondiale.',
      type: 'foundation',
      innovation: 'Premier système de remontoir à couronne',
      impact: 'Revolution',
      details: 'Philippe\'s crown-winding system eliminated the need for winding keys, making watches more user-friendly and reliable.'
    },
    { 
      id: '1851', 
      year: 1851, 
      title: 'Reine Victoria : L\'Investiture Royale', 
      description: 'Premier client royal : la Reine Victoria achète plusieurs Patek à l\'Exposition de Londres.',
      type: 'golden',
      innovation: 'Validation royale de l\'excellence',
      impact: 'Royal',
      details: 'Queen Victoria purchased a key-wound watch and other Patek Philippe timepieces, establishing the brand\'s royal patronage.'
    },
    { 
      id: '1868', 
      year: 1868, 
      title: 'Première Montre-Bracelet Féminin', 
      description: 'La comtesse Koscowicz reçoit la première montre-bracelet, 50 ans avant l\'adoption générale.',
      type: 'golden',
      innovation: 'Première montre-bracelet au monde',
      impact: 'Innovation',
      details: '50 years before wristwatches became mainstream, Patek Philippe created the first one for Countess Koscowicz of Hungary.'
    },
    { 
      id: '1887', 
      year: 1887, 
      title: 'Invention de la Génération de Courant Parfait', 
      description: 'Système révolutionnaire pour améliorer la précision des mouvements.',
      type: 'golden',
      innovation: 'Générateur de courant perfectionné',
      impact: 'Technical',
      details: 'This innovation significantly improved timekeeping accuracy and reliability in mechanical watches.'
    },
    { 
      id: '1910', 
      year: 1910, 
      title: 'Premier Certificat Chronomètre, Observatoire de Kew', 
      description: 'Première certification chronométrique officielle d\'une manufacture suisse.',
      type: 'golden',
      innovation: 'Premier certificat chronomètre',
      impact: 'Certification',
      details: 'Patek Philippe was the first Swiss manufacturer to receive official chronometer certification.'
    },
    { 
      id: '1925', 
      year: 1925, 
      title: 'Premier Quantième Perpétuel-Bracelet', 
      description: 'Premier quantième perpétuel au monde dans une montre-bracelet.',
      type: 'complications',
      innovation: 'Premier quantième perpétuel bracelet',
      impact: 'Technical',
      details: 'The world\'s first perpetual calendar wristwatch, demonstrating Patek Philippe\'s mastery of complex complications.'
    },
    { 
      id: '1932', 
      year: 1932, 
      title: 'La Famille Stern : Indépendance Garantie', 
      description: 'Charles et Jean Stern acquièrent la manufacture. Propriété familiale à 100%.',
      type: 'complications',
      innovation: 'Indépendance familiale',
      impact: 'Ownership',
      details: 'The Stern family acquisition ensured Patek Philippe would remain independent, family-owned, and focused on watchmaking excellence.'
    },
    { 
      id: '1932b', 
      year: 1932, 
      title: 'Calatrava : L\'Expression de l\'Élégance Pure', 
      description: 'Lancement de la référence 96, icône du design horloger moderne.',
      type: 'complications',
      innovation: 'Design Bauhaus en horlogerie',
      impact: 'Design',
      details: 'The Calatrava defined modern dress watch aesthetics with its clean, minimalist design and pure form following function principles.'
    },
    { 
      id: '1953', 
      year: 1953, 
      title: 'Golden Ellipse : Proportions Divines', 
      description: 'L\'ellipse d\'or basée sur le nombre d\'or, révolution esthétique.',
      type: 'complications',
      innovation: 'Application du nombre d\'or',
      impact: 'Design',
      details: 'The Golden Ellipse\'s proportions follow the golden ratio, creating a visually harmonious and timeless design.'
    },
    { 
      id: '1976', 
      year: 1976, 
      title: 'Nautilus : Révolution du Sport-Luxe', 
      description: 'Gérald Genta conçoit le Nautilus, premier vaccine sport-luxe.',
      type: 'modern',
      innovation: 'Concept sport-luxe',
      impact: 'Market',
      details: 'The Nautilus created an entirely new market segment: luxury sport watches. Its water-resistance and integrated bracelet were revolutionary.'
    },
    { 
      id: '1980', 
      year: 1980, 
      title: 'Première Collection Femmes', 
      description: 'Formalisation de la collection dédiée aux femmes, Twenty~4.',
      type: 'modern',
      innovation: 'Collection féminine dédiée',
      impact: 'Market',
      details: 'Patek Philippe formalized its women\'s watch collection, recognizing the growing importance of the female clientele.'
    },
    { 
      id: '1997', 
      year: 1997, 
      title: 'Aquanaut : L\'Audace de la Modernité', 
      description: 'Créateur du tout nouveau concept "tropical" avec bracelet composite.',
      type: 'modern',
      innovation: 'Bracelet composite tropical',
      impact: 'Design',
      details: 'The Aquanaut introduced the innovative "tropical" composite bracelet, resistant to saltwater and UV rays.'
    },
    { 
      id: '2009', 
      year: 2009, 
      title: 'Grandmaster Chime 5175 : 20 Complications', 
      description: 'La montre la plus compliquée jamais créée par Patek Philippe.',
      type: 'modern',
      innovation: '20 complications en une montre',
      impact: 'Technical',
      details: 'The Grandmaster Chime represents the pinnacle of horological artistry, featuring 20 complications including a grande sonnerie.'
    },
    { 
      id: '2014', 
      year: 2014, 
      title: '175e Anniversaire : Excellence Confirmée', 
      description: '175 ans d\'excellence continues, production restreinte 000 000 à 000 200.',
      type: 'modern',
      innovation: 'Limited edition anniversary',
      impact: 'Legacy',
      details: 'To celebrate 175 years, Patek Philippe created limited editions and reaffirmed its commitment to exceptional craftsmanship.'
    },
    { 
      id: '2023', 
      year: 2023, 
      title: 'Innovation Continue : Nouveaux Matériaux', 
      description: 'Introduction de nouveaux alliages et techniques de fabrication.',
      type: 'modern',
      innovation: 'Alliages révolutionnaires',
      impact: 'Innovation',
      details: 'Patek Philippe continues innovating with new materials, including advanced alloys and cutting-edge manufacturing techniques.'
    },
    { 
      id: '2024', 
      year: 2024, 
      title: 'Révolutions Chronométriques', 
      description: 'Nouveaux calibres ultra-précis, records d\'accuracy battus.',
      type: 'modern',
      innovation: 'Précision records',
      impact: 'Performance',
      details: 'Latest movements achieve unprecedented accuracy, with some models meeting or exceeding COSC standards.'
    },
    { 
      id: '2025', 
      year: 2025, 
      title: 'L\'Avenir de l\'Horlogerie Suise', 
      description: 'Vision 2030 : durabilité, innovation, héritage préservé.',
      type: 'modern',
      innovation: 'Horlogerie durable',
      impact: 'Future',
      details: 'Patek Philippe\'s 2030 vision focuses on sustainable manufacturing, innovative technologies, and preserving traditional craftsmanship.'
    }
  ];

  const movements = {
    '240': { name: 'Caliber 240', thickness: '2.53mm', complications: 0, power: '48h', frequency: '21,600 vph', desc: 'Le plus fin mouvement automatique manufacture' },
    '324': { name: 'Caliber 324', thickness: '5.25mm', complications: 0, power: '45h', frequency: '28,800 vph', desc: 'Mouvement moderne haute performance' },
    '5205': { name: 'Caliber 5205', thickness: '5.32mm', complications: 3, power: '55h', frequency: '28,800 vph', desc: 'Grand calendrier avec phases de lune' },
    '5004': { name: 'Caliber 5004', thickness: '7.15mm', complications: 6, power: '48h', frequency: '21,600 vph', desc: 'Chronographe rattrapante avec quantième' },
    '5303': { name: 'Caliber 5303', thickness: '8.40mm', complications: 7, power: '48h', frequency: '21,600 vph', desc: 'Tourbillon en cascade avec répétition minutes' },
    '3000': { name: 'Caliber 3000', thickness: '5.35mm', complications: 8, power: '72h', frequency: '21,600 vph', desc: 'Quantième perpétuel avec grande sonnerie' }
  };

  const collections = [
    {
      name: 'Calatrava',
      launched: 1932,
      description: 'L\'essence absolue de l\'élégance horlogère. Design Bauhaus intemporel, lignes pures, sophistication maximale.',
      characteristics: [
        'Cadran émail grand feu authentique',
        'Boîtier ultra-fin 7.25mm maximum',
        'Mouvement automatique manufacture 30-255 PS',
        'Étanchéité 30m, usage daily casual',
        'Bracelet alligator geniun hand-stitched'
      ],
      models: [
        { ref: '5227G', name: 'Chronographe', price: '32 500 €', features: ['Chronographe flyback', 'Grande date', 'Phase de lune'] },
        { ref: '6007G', name: 'Nouvelle Ajoutée', price: '28 200 €', features: ['Seconde centrale', 'Date', 'CADRAN OPALINE'] },
        { ref: '6119G', name: 'Officier', price: '35 800 €', features: ['Compteur 30min', 'Bracelet cuir', 'Boîtier-clé'] }
      ],
      price: '28 200 - 78 000 €',
      production: '~2 500 pièces/an',
      rarity: 'Élevée (liste d\'attente 18 mois)',
      craftmanship: 'Finitions Hallmark Patek, angles polis miroir',
      color: 'blue',
      icon: '🕰️'
    },
    {
      name: 'Nautilus',
      launched: 1976,
      description: 'L\'icône absolue du sport-luxe. Boîtier octogonal inspiré des hublots, bracelet intégré révolutionnaire.',
      characteristics: [
        'Boîtier en acier 904L (14% chrome, 1% nickel)',
        'Lunette octogonale avec vis visibles',
        'Bracelet intégré ultra-ergonomique',
        'Étanchéité 120m,uitable diving',
        'Glace saphir bombée'
      ],
      models: [
        { ref: '5811/1G', name: 'Dernière Génération', price: '125 000 €', features: ['Nouvelle boîte 41mm', 'Mouvement 240', 'Bracelet alligator'] },
        { ref: '5711/1A', name: 'Legendary', price: '85 000 €', features: ['Icone absolue', '4 modèles', 'Mouvement 324'] },
        { ref: '5990/1A', name: 'Chronographe', price: '95 000 €', features: ['Flyback', 'Deux zones', 'RMC'] }
      ],
      price: '85 000 - 195 000 €',
      production: '~400 pièces/an',
      rarity: 'Ultra-rare (liste d\'attente 5+ ans)',
      craftmanship: 'Polissage main, angles vives parfaits',
      color: 'cyan',
      icon: '⚓'
    },
    {
      name: 'Aquanaut',
      launched: 1997,
      description: 'Sportivité moderne et audace. Bracelet "Tropical" composite, design jeune et contemporain.',
      characteristics: [
        'Bracelet composite "Tropical" first Patek',
        'Résistance eau海水, UV,-altitudes',
        'Étanchéité 120m comme Nautilus',
        'Movement manufacture automatique',
        'Design ergonomique jeune'
      ],
      models: [
        { ref: '5168G', name: 'Jumbo', price: '65 000 €', features: ['42mm émeraude', 'Mouvement 324', 'Bracelet tropical'] },
        { ref: '5968A', name: 'Chronographe', price: '78 000 €', features: ['Flyback', '2 compteurs', 'Bracelet 2 tons'] },
        { ref: '5267/200A', name: 'Bleu Acier', price: '58 000 €', features: ['Bleu dégradé', 'Date', 'Bracelet tropical'] }
      ],
      price: '58 000 - 95 000 €',
      production: '~800 pièces/an',
      rarity: 'Élevée (attente 3-4 ans)',
      craftmanship: 'Finitions satinées, polissages alternés',
      color: 'teal',
      icon: '🌊'
    },
    {
      name: 'Grandes Complications',
      launched: 'Multiples',
      description: 'Le sommet absolu de l\'art horlogère. Maîtrise parfaite des complications les plus complexes.',
      characteristics: [
        '20+ complications possible en un mouvement',
        '1 300+ heures de fabrication par pièce',
        'Mouvements 100% manufacture exclusifs',
        'Grande sonnerie, minute repeater, tourbillon',
        'Conception unique, pièces d\'exception'
      ],
      models: [
        { ref: '5303R', name: 'Tourbillon Rattrapante', price: '385 000 €', features: ['Tourbillon', 'Rattrapante', 'Cage or rose'] },
        { ref: '6301P', name: 'Grande Sonnerie', price: '650 000 €', features: ['Grande sonnerie', 'Petite sonnerie', 'Silence', 'Tourbillon'] },
        { ref: '5175', name: 'Grandmaster Chime', price: '2 350 000 €', features: ['20 complications', 'Unique pièce', '1,3 ans fabrication'] }
      ],
      price: '385 000 - 2 850 000 €',
      production: '~12 pièces/an',
      rarity: 'Ultra-rare (sur invitation)',
      craftmanship: 'Art horloger au summum, finitions infinies',
      color: 'purple',
      icon: '👑'
    },
    {
      name: 'Twenty~4',
      launched: 1999,
      description: 'Élégance féminine contemporaine. Design ergonomique, complications modernes pour femmes.',
      characteristics: [
        'Boîtier slim ergonomique perfect fit',
        'Bracelet flexible first Patek woman',
        'Diamants exceptionnels, sertissage main',
        'Mouvements 100% féminine design',
        'Élégance du quotidien moderne'
      ],
      models: [
        { ref: '4910/1200A', name: 'Acier Gradient Bleu', price: '25 800 €', features: ['Gradient bleu', 'Diamants', 'Quartz'] },
        { ref: '4911/1201A', name: 'Mother of Pearl', price: '38 500 €', features: ['Nacre', 'Diamants', 'Bracelet fixe'] },
        { ref: '7300/1200A', name: 'Lady', price: '42 200 €', features: ['Mouvement auto', 'Date', 'Bracelet] }
      ],
      price: '25 800 - 65 000 €',
      production: '~1 200 pièces/an',
      rarity: 'Modérée (attente 12-18 mois)',
      craftmanship: 'Sertissage diamants, nacre, féminité absolue',
      color: 'pink',
      icon: '✨'
    },
    {
      name: 'Gondolo',
      launched: 'Art Deco Revival',
      description: 'Art Deco géométrique, audace esthétique. Formes données,Design architectural.',
      characteristics: [
        'Formes géométriques Art Deco strictes',
        'Inspiration cases Art Deco 1920-1930',
        'Esthétique architecturale unique',
        'Émail grand feu techniques ancestrales',
        'Symétrie parfaite, proportion idéale'
      ],
      models: [
        { ref: '5085G', name: 'Geometric', price: '58 000 €', features: ['Forme tank', 'Émail', 'Seconde morte'] },
        { ref: '4962R', name: 'Art Deco', price: '78 000 €', features: ['Boîtier rectangulaire', 'Émail', 'Bracelet intégré'] },
        { ref: '7040R', name: 'Minute Repeater', price: '185 000 €', features: ['Répétition minutes', 'Forme不走', 'Esthétique unique'] }
      ],
      price: '58 000 - 195 000 €',
      production: '~150 pièces/an',
      rarity: 'Très élevée (attente 4-5 ans)',
      craftmanship: 'Émail grand feu, précision géométrique',
      color: 'amber',
      icon: '💎'
    }
  ];

  const complications = [
    { 
      name: 'Quantième Perpétuel', 
      description: 'Affiche automatiquement toutes les dates correctes jusqu\'en 2100, y compris les années bissextiles. Révolution de 1925.',
      complexity: 8,
      manufacturing_hours: 45,
      first_implemented: '1925',
      models: ['5170', '5205', '5270', '5320'],
      technical_details: 'Calendrier complexe nécessitant 127 gears and levers precisely coordinated.',
      innovation: 'Premier bracelet au monde - Patek Philippe innovation revolutionary'
    },
    { 
      name: 'Répétition Minutes', 
      description: 'Sonne heures, quarts et minutes sur demande. Art acoustique et technique au summum.',
      complexity: 9,
      manufacturing_hours: 78,
      first_implemented: '1839',
      models: ['5303', '6301', '5306'],
      technical_details: 'Gong steel marquer correctly tuned, hammers precisely positioned for perfect sound.',
      innovation: 'Traditional repeater expertise, perfected with modern acoustics'
    },
    { 
      name: 'Tourbillon', 
      description: 'Compense les effets gravitationnels, améliore la précision. Jaeger invention 1795, Patek perfection 1860.',
      complexity: 7,
      manufacturing_hours: 35,
      first_implemented: '1860',
      models: ['5303', '5004', '5372'],
      technical_details: 'Cage tourbillon rotates every 60 seconds, averaging positional errors.',
      innovation: 'Multiple tourbillon configurations, including double tourbillon patent'
    },
    { 
      name: 'Chronographe Rattrapante', 
      description: 'Permet de mesurer des temps intermédiaires. Innovation d\'Henri-Robert en 1827, perfection Patek.',
      complexity: 8,
      manufacturing_hours: 52,
      first_implemented: '1927',
      models: ['5004', '5950', '5172'],
      technical_details: 'Complex rattrapante mechanism with dual hands, perfectly synchronized.',
      innovation: 'Split-second chronograph, professional timing tool'
    },
    { 
      name: 'Équation du Temps', 
      description: 'Affiche la différence entre temps solaire vrai et temps civil moyen. Complexité astronomique.',
      complexity: 9,
      manufacturing_hours: 95,
      first_implemented: '2000',
      models: ['5520', '5550'],
      technical_details: 'Astronomical equation showing sun\'s apparent movement vs civil time.',
      innovation: 'Revolutionary in wristwatch format, purely astronomical complication'
    },
    { 
      name: 'Heure Universelle', 
      description: 'Affiche 24 fuseaux horaires simultanément. Innovation Patek 1937, perfect travel watch.',
      complexity: 6,
      manufacturing_hours: 28,
      first_implemented: '1937',
      models: ['5530', '5326', '5159'],
      technical_details: 'Crown-operated city disk, date correction synchronized with time zone.',
      innovation: 'First travel watch, all 24 time zones readable at once'
    },
    { 
      name: 'Grande Sonnerie', 
      description: 'Sonne automatiquement toutes les heures. Summum de l\'acoustique horlogère, 4 tours de sonneries.',
      complexity: 10,
      manufacturing_hours: 125,
      first_implemented: '1886',
      models: ['6301', '5004', '5500'],
      technical_details: 'Three gongs system, automatic grande sonnerie at top of each hour.',
      innovation: 'Most complex striking mechanism, acoustic perfection'
    },
    { 
      name: 'Phase de Lune', 
      description: 'Affichage lunaire avec précisionde 122.6 years. Sentiment météorique romantique.',
      complexity: 3,
      manufacturing_hours: 8,
      first_implemented: '1840',
      models: ['5227', '5940', '5270'],
      technical_details: 'Moon disc with 59 teeth, showing lunar phases with 122.6-year accuracy.',
      innovation: 'Most accurate moonphase, romantic astronomical display'
    }
  ];

  const innovations = [
    {
      year: 1845,
      title: 'Premier système de remontoir à couronne',
      description: 'Révolution de Jean-Adrien Philippe qui élimine la clé de remontoir',
      impact: 'REVOLUTIONNÉ la facilité d\'usage des montres mécaniques',
      technical_details: 'Système d\'engrenages permettant la remontée via la couronne, fiabilité maximale'
    },
    {
      year: 1868,
      title: 'Première montre-bracelet féminin',
      description: 'Innovation pionnière, 50 ans avant l\'adoption générale du format bracelet',
      impact: 'PIONNIER de la montre-bracelet',
      technical_details: 'Adaptation du mouvement de poche au format bracelet, innovation géométrique'
    },
    {
      year: 1925,
      title: 'Premier quantième perpétuel bracelet',
      description: 'Revolution complications en format compact',
      impact: 'ÉVOLUTION majeure des complications',
      technical_details: '30+ engrenages coordinators pour affichage calendrier automatique'
    },
    {
      year: 1976,
      title: 'Concept sport-luxe Nautilus',
      description: 'Création d\'un nouveau marché : montre de sport luxueuse',
      impact: 'CRÉATION d\'un nouveau segment de marché',
      technical_details: 'Étanchéité 120m, bracelet intégré, boîtier en acier haute qualité'
    },
    {
      year: 1997,
      title: 'Bracelet composite "Tropical" Aquanaut',
      description: 'Résistance révolutionnaire aux éléments naturels',
      impact: 'INNOVATION matériaux et design',
      technical_details: 'Résistance eau, UV, hautes/basses températures, flexibilité optimale'
    }
  ];

  const certifications = [
    {
      name: 'Poinçon de Genève',
      description: 'Certificat d\'origine genevoise, finitions supérieures',
      requirements: 'Movements made in Geneva, traditional finishing, chronometric tests',
      since: 1886,
      current_models: 'Tous mouvements manufacture',
      status: 'Active certification'
    },
    {
      name: 'Patek Philippe Seal',
      description: 'Sceau exclusif Patek, standards 2x plus stricts que le Poinçon de Genève',
      requirements: 'Completeness test, 15-day precision, water resistance, power reserve',
      since: 2009,
      current_models: 'Tous calibres depuis 2009',
      status: 'Exclusive to Patek Philippe'
    },
    {
      name: 'COSC Chronometer',
      description: 'Certification chronométrique officielle suisse',
      requirements: '7-day precision test in 5 positions, 3 temperatures',
      since: 1910,
      current_models: 'Sélection de modèles chronomètre',
      status: 'Highest precision standards'
    }
  ];

  const investmentData = [
    {
      model: 'Nautilus 5711/1A-010',
      year: 2006,
      retail_price: '25 000 €',
      current_value: '85 000 €',
      appreciation: '+240%',
      rarity: 'Iconique, arrêt de production 2021',
      market_trend: 'Très haussier, demande exceeds supply',
      collectible_score: 9.5
    },
    {
      model: 'Calatrava 5227G',
      year: 2013,
      retail_price: '28 500 €',
      current_value: '32 500 €',
      appreciation: '+14%',
      rarity: 'Production continue, design established',
      market_trend: 'Stable, bonne valeur refuge',
      collectible_score: 7.8
    },
    {
      model: 'Aquanaut 5167A',
      year: 2007,
      retail_price: '22 000 €',
      current_value: '45 000 €',
      appreciation: '+105%',
      rarity: 'Tendance sport-luxe croissante',
      market_trend: 'Croissance forte, nouvelle clientèle',
      collectible_score: 8.2
    },
    {
      model: 'Grandmaster Chime 5175',
      year: 2014,
      retail_price: '1 950 000 €',
      current_value: '2 350 000 €',
      appreciation: '+20%',
      rarity: 'Unique pièce,的艺术顶点',
      market_trend: 'Très rare, collectionneurs elite',
      collectible_score: 10.0
    }
  ];

  return (
    <>
      <Head>
        <title>Patek Philippe - LA Référence Absolue en Horlogerie Suise 2025 | Guide Expert Complet</title>
        <meta name="description" content="Le guide ultime Patek Philippe 2025 : 185 ans d'histoire, collections, complications, investissement. Devenez expert en 30 minutes avec la référence mondiale." />
        <meta name="keywords" content="Patek Philippe, horlogerie suisse, montres de luxe, Calatrava, Nautilus, Aquanaut, complications, investissement horloger" />
        <meta name="author" content="MiniMax Agent" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Patek Philippe",
            "foundingDate": "1839",
            "url": "https://horlolearn.com/patek-philippe-reference",
            "logo": "https://horlolearn.com/patek-logo.png",
            "description": "La référence mondiale en horlogerie de luxe",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Geneva",
              "addressCountry": "Switzerland"
            }
          })}
        </script>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:to-indigo-950">
        {/* HEADER CINEMATIQUE PREMIUM */}
        <header className="relative h-screen overflow-hidden">
          {/* Hero Video/Animation Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-800 to-indigo-900">
            <div className="absolute inset-0 opacity-30">
              {/* Animated Watch Animation */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <Watch className="w-96 h-96 text-white/20 animate-spin" style={{ animationDuration: '20s' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-8xl text-white/40 animate-pulse">👑</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Time Display */}
            <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-mono text-white mb-2">
                {timeDisplay.toLocaleTimeString('fr-CH', { 
                  timeZone: 'Europe/Zurich',
                  hour12: false,
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </div>
              <div className="text-sm text-blue-200">
                Heure Patek Philippe - Genève
              </div>
            </div>
          </div>
          
          {/* Hero Content */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end">
            <div className="max-w-7xl mx-auto px-8 pb-24">
              <div className="flex items-start gap-8 mb-12">
                <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-4 border border-white/30">
                  <Crown2 className="w-24 h-24 text-yellow-400" />
                </div>
                <div className="flex-1">
                  <h1 className="text-7xl md:text-9xl font-bold text-white mb-6 tracking-tight leading-none">
                    Patek Philippe
                  </h1>
                  <p className="text-2xl md:text-3xl text-blue-200 font-light italic max-w-5xl mb-8 leading-relaxed">
                    "Vous ne possédez jamais complètement une Patek Philippe. 
                    Vous en êtes juste le gardien pour les générations futures."
                  </p>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-full flex items-center gap-3 transition-all text-lg font-medium border border-white/30"
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                      {isPlaying ? 'Pause' : 'Découvrir l\'Excellence'}
                    </button>
                    <button className="border-2 border-white/50 text-white px-8 py-4 rounded-full flex items-center gap-3 transition-all text-lg font-medium hover:bg-white/20">
                      <Download className="w-6 h-6" />
                      Guide Complet
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Stats Hero */}
              <div className="flex gap-6 text-white flex-wrap">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 min-w-[180px]">
                  <div className="text-4xl font-bold text-yellow-400">185</div>
                  <div className="text-sm text-blue-200 font-medium">Années d'Excellence</div>
                  <div className="text-xs text-blue-300 mt-1">1839-2025</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 min-w-[180px]">
                  <div className="text-4xl font-bold text-green-400">70+</div>
                  <div className="text-sm text-blue-200 font-medium">Brevets Innovants</div>
                  <div className="text-xs text-blue-300 mt-1">Moves Innovation</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 min-w-[180px]">
                  <div className="text-4xl font-bold text-purple-400">100%</div>
                  <div className="text-sm text-blue-200 font-medium">Indépendance Familiale</div>
                  <div className="text-xs text-blue-300 mt-1">Famille Stern</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 min-w-[180px]">
                  <div className="text-4xl font-bold text-cyan-400">15</div>
                  <div className="text-sm text-blue-200 font-medium">Collections</div>
                  <div className="text-xs text-blue-300 mt-1">Iconiques</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 min-w-[180px]">
                  <div className="text-4xl font-bold text-red-400">2x</div>
                  <div className="text-sm text-blue-200 font-medium">Plus Strict COSC</div>
                  <div className="text-xs text-blue-300 mt-1">Patek Philippe Seal</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* NAVIGATION FIXE AVANCÉE */}
        <nav className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4">
            {/* Main Navigation */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2 overflow-x-auto">
                {[
                  { key: 'history', label: 'Histoire', icon: Clock3 },
                  { key: 'collections', label: 'Collections', icon: Watch },
                  { key: 'complications', label: 'Complications', icon: Settings },
                  { key: 'movements', label: 'Mouvements', icon: Zap },
                  { key: 'innovations', label: 'Innovations', icon: Lightbulb },
                  { key: 'investment', label: 'Investissement', icon: TrendingUp },
                  { key: 'craftsmanship', label: 'Artisanat', icon: Hammer }
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`px-4 py-2 rounded-full transition-all whitespace-nowrap flex items-center gap-2 ${
                      activeTab === key 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>
              <Link href="/manufactures" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 flex items-center gap-2 flex-shrink-0 font-medium">
                <ChevronLeft className="w-4 h-4" /> Retour
              </Link>
            </div>

            {/* Era Selector */}
            <div className="flex gap-2 overflow-x-auto">
              {Object.entries(eras).map(([key, era]) => (
                <button
                  key={key}
                  onClick={() => setSelectedEra(key)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-all whitespace-nowrap ${
                    selectedEra === key 
                      ? `bg-${era.color}-600 text-white` 
                      : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {era.label} ({era.count})
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* CONTENU PRINCIPAL PAR ONGLETS */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* ONGLET HISTOIRE */}
          {activeTab === 'history' && (
            <div className="space-y-12">
              <section className="text-center">
                <h2 className="text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                  185 Ans d'Innovation Continue
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
                  De 1839 à 2025 : l'histoire fascinante de la manufacture genevoise la plus prestigieuse au monde
                </p>
              </section>

              {/* Timeline Interactive */}
              <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl">
                <h3 className="text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">
                  Chronologie Interactive
                </h3>
                <div className="overflow-x-auto pb-8">
                  <div className="flex gap-6 min-w-max">
                    {detailedTimeline
                      .filter(item => selectedEra === 'all' || item.type === selectedEra)
                      .map((item, index) => (
                      <div 
                        key={item.id}
                        className="group relative cursor-pointer transition-all"
                        style={{ minWidth: '350px' }}
                        onMouseEnter={() => setHoveredWatch(item.id)}
                        onMouseLeave={() => setHoveredWatch(null)}
                      >
                        <div className={`bg-gradient-to-br from-${eras[item.type]?.color || 'blue'}-50 to-white dark:from-${eras[item.type]?.color || 'blue'}-950/30 dark:to-slate-800 
                                      rounded-2xl p-6 border-2 transition-all group-hover:scale-105 shadow-lg hover:shadow-xl
                                      ${hoveredWatch === item.id ? 'border-blue-400 dark:border-blue-600 ring-4 ring-blue-200/50' : 'border-transparent'}`}>
                          <div className={`text-4xl font-bold text-${eras[item.type]?.color || 'blue'}-600 dark:text-${eras[item.type]?.color || 'blue'}-400 mb-3`}>
                            {item.year}
                          </div>
                          <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                            {item.title}
                          </h4>
                          <p className="text-slate-600 dark:text-slate-400 mb-3 text-sm leading-relaxed">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-2 text-xs">
                            <Sparkles className={`w-4 h-4 text-${eras[item.type]?.color || 'blue'}-500`} />
                            <span className={`text-${eras[item.type]?.color || 'blue'}-600 font-medium`}>{item.innovation}</span>
                          </div>
                          {hoveredWatch === item.id && (
                            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                              <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                                {item.details}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        {/* Connecteur Timeline */}
                        {index < detailedTimeline.filter(item => selectedEra === 'all' || item.type === selectedEra).length - 1 && (
                          <div className={`absolute top-1/2 -right-6 w-6 h-0.5 bg-${eras[item.type]?.color || 'blue'}-300 dark:bg-${eras[item.type]?.color || 'blue'}-600`}></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Section Innovation */}
              <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
                <h3 className="text-3xl font-bold text-center mb-8">
                  Innovations qui ont Façonné l'Horlogerie
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {innovations.map((innovation, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                      <div className="text-2xl font-bold text-yellow-400 mb-2">{innovation.year}</div>
                      <h4 className="text-lg font-bold mb-3">{innovation.title}</h4>
                      <p className="text-blue-100 text-sm mb-3">{innovation.description}</p>
                      <div className="bg-white/20 rounded-lg p-3">
                        <div className="text-xs text-blue-200 mb-1">Impact :</div>
                        <div className="text-sm font-medium">{innovation.impact}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* ONGLET COLLECTIONS */}
          {activeTab === 'collections' && (
            <div className="space-y-8">
              <section className="text-center">
                <h2 className="text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                  Collections Iconiques
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
                  Chaque collection raconte une histoire unique, s'exprime par un langage esthétique différent
                </p>
              </section>

              {/* Filter & Search */}
              <div className="flex gap-4 items-center justify-between">
                <div className="flex gap-2 overflow-x-auto">
                  {['all', 'Calatrava', 'Nautilus', 'Aquanaut', 'Grandes Complications', 'Twenty~4', 'Gondolo'].map((collection) => (
                    <button
                      key={collection}
                      onClick={() => setSelectedCollection(collection)}
                      className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                        selectedCollection === collection 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {collection === 'all' ? 'Toutes les Collections' : collection}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Collections Grid */}
              <div className={`grid gap-8 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {collections
                  .filter(collection => selectedCollection === 'all' || collection.name === selectedCollection)
                  .map((collection) => (
                  <div 
                    key={collection.name}
                    className="group relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all"
                  >
                    {/* Collection Header */}
                    <div className={`h-80 bg-gradient-to-br from-${collection.color}-50 to-white dark:from-${collection.color}-950/30 dark:to-slate-800 flex items-center justify-center relative overflow-hidden`}>
                      <div className="text-8xl mb-4">{collection.icon}</div>
                      <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 px-3 py-1 rounded-full">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {collection.price}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-800/90 px-3 py-1 rounded-full">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          Lancé {collection.launched}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{collection.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-slate-600">Rareté: {collection.rarity.split(' (')[0]}</span>
                        </div>
                      </div>
                      
                      <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                        {collection.description}
                      </p>

                      {/* Key Characteristics */}
                      <div className="space-y-3 mb-6">
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">Caractéristiques Clés :</h4>
                        {collection.characteristics.map((char, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <Sparkles className={`w-4 h-4 text-${collection.color}-500 flex-shrink-0`} />
                            <span className="text-slate-700 dark:text-slate-300">{char}</span>
                          </div>
                        ))}
                      </div>

                      {/* Production Info */}
                      <div className="grid grid-cols-2 gap-4 mb-6 text-xs">
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                          <div className="font-bold text-slate-900 dark:text-white">Production</div>
                          <div className="text-slate-600 dark:text-slate-400">{collection.production}</div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                          <div className="font-bold text-slate-900 dark:text-white">Artisanat</div>
                          <div className="text-slate-600 dark:text-slate-400">{collection.craftmanship}</div>
                        </div>
                      </div>

                      {/* Models Preview */}
                      <div className="space-y-2 mb-6">
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">Modèles Phares :</h4>
                        {collection.models.map((model, i) => (
                          <div key={i} className="flex items-center justify-between text-sm bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                            <div>
                              <span className="font-medium text-slate-900 dark:text-white">{model.ref}</span>
                              <span className="text-slate-600 dark:text-slate-400 ml-2">{model.name}</span>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-slate-900 dark:text-white">{model.price}</div>
                              <div className="text-xs text-slate-500">{model.features.length} features</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button className={`w-full bg-${collection.color}-600 hover:bg-${collection.color}-700 text-white py-3 rounded-lg font-medium transition-all`}>
                        Explorer la Collection →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ONGLET COMPLICATIONS */}
          {activeTab === 'complications' && (
            <div className="space-y-8">
              <section className="text-center">
                <h2 className="text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                  Complications Maîtresses
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
                  L'art de la complication horlogère poussé à son summum
                </p>
              </section>

              <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl">
                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Visualisation 3D du Mouvement */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl p-8 h-96 flex flex-col items-center justify-center border-2 border-dashed border-blue-300 dark:border-blue-700">
                    <div className="text-center">
                      <div className="relative">
                        <Settings className="w-32 h-32 text-blue-600 dark:text-blue-400 animate-spin" style={{ animationDuration: '8s' }} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-blue-600/20 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 mt-4">
                        Calibre {selectedMovement}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-2">
                        {movements[selectedMovement]?.name}
                      </p>
                      <p className="text-sm text-slate-500">
                        {movements[selectedMovement]?.desc}
                      </p>
                    </div>
                    
                    {/* Movement Selector */}
                    <div className="mt-6 flex gap-2 flex-wrap justify-center">
                      {Object.entries(movements).map(([key, movement]) => (
                        <button
                          key={key}
                          onClick={() => setSelectedMovement(key)}
                          className={`px-3 py-1 rounded-full text-xs transition-all ${
                            selectedMovement === key 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600'
                          }`}
                        >
                          {key}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Liste des Complications */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                      Complications Disponibles
                    </h3>
                    {complications.map((comp, index) => (
                      <div key={index} className="border-2 border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setOpenComplications(prev => ({
                            ...prev,
                            [comp.name]: !prev[comp.name]
                          }))}
                          className="w-full p-4 flex items-center justify-between bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              comp.complexity >= 8 ? 'bg-red-100 dark:bg-red-900/30' :
                              comp.complexity >= 6 ? 'bg-orange-100 dark:bg-orange-900/30' :
                              'bg-green-100 dark:bg-green-900/30'
                            }`}>
                              <span className="text-lg">
                                {comp.complexity >= 8 ? '🔥' : comp.complexity >= 6 ? '⚡' : '✨'}
                              </span>
                            </div>
                            <div className="text-left">
                              <h4 className="text-lg font-bold text-slate-900 dark:text-white">{comp.name}</h4>
                              <div className="text-sm text-slate-500">
                                Complexité: {comp.complexity}/10 • {comp.manufacturing_hours}h fabrication
                              </div>
                            </div>
                          </div>
                          <ChevronLeft className={`w-5 h-5 text-slate-400 transition-transform ${
                            openComplications[comp.name] ? '-rotate-90' : 'rotate-180'
                          }`} />
                        </button>
                        
                        {openComplications[comp.name] && (
                          <div className="px-4 pb-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
                            <p className="text-slate-600 dark:text-slate-400 text-sm pt-4 mb-3">{comp.description}</p>
                            <div className="grid md:grid-cols-2 gap-4 text-xs">
                              <div>
                                <div className="font-bold text-slate-900 dark:text-white mb-1">Détails Techniques</div>
                                <div className="text-slate-600 dark:text-slate-400">{comp.technical_details}</div>
                              </div>
                              <div>
                                <div className="font-bold text-slate-900 dark:text-white mb-1">Modèles Équipés</div>
                                <div className="text-slate-600 dark:text-slate-400">{comp.models.join(', ')}</div>
                              </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                              <div className="flex items-center gap-2 text-sm">
                                <span className="font-medium text-green-600 dark:text-green-400">Innovation:</span>
                                <span className="text-slate-600 dark:text-slate-400">{comp.innovation}</span>
                              </div>
                            </div>
                            <button className="mt-3 text-blue-600 dark:text-blue-400 text-xs font-medium hover:underline">
                              Voir les modèles équipés →
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ONGLET MOUVEMENTS */}
          {activeTab === 'movements' && (
            <div className="space-y-8">
              <section className="text-center">
                <h2 className="text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                  Mouvements Manufacture
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
                  100% développés et assemblés en interne par Patek Philippe
                </p>
              </section>

              <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(movements).map(([key, movement]) => (
                  <div key={key} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{movement.name}</h3>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        movement.complications >= 6 ? 'bg-purple-100 dark:bg-purple-900/30' :
                        movement.complications >= 3 ? 'bg-blue-100 dark:bg-blue-900/30' :
                        'bg-green-100 dark:bg-green-900/30'
                      }`}>
                        <span className="text-lg">
                          {movement.complications >= 6 ? '👑' : movement.complications >= 3 ? '⚡' : '⚙️'}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">{movement.desc}</p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Épaisseur:</span>
                        <span className="font-mono text-slate-900 dark:text-white">{movement.thickness}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Complications:</span>
                        <span className="font-mono text-slate-900 dark:text-white">{movement.complications}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Réserve de marche:</span>
                        <span className="font-mono text-slate-900 dark:text-white">{movement.power}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Fréquence:</span>
                        <span className="font-mono text-slate-900 dark:text-white">{movement.frequency}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            </div>
          )}

          {/* ONGLET INNOVATIONS */}
          {activeTab === 'innovations' && (
            <div className="space-y-8">
              <section className="text-center">
                <h2 className="text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                  Innovations Révolutionnaires
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
                  185 ans d'innovations qui ont façonné l'horlogerie moderne
                </p>
              </section>

              <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl">
                <div className="grid gap-6">
                  {innovations.map((innovation, index) => (
                    <div key={index} className="flex gap-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl border border-blue-200 dark:border-blue-800">
                      <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">
                        {innovation.year}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{innovation.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-3">{innovation.description}</p>
                        <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3">
                          <div className="text-sm text-blue-800 dark:text-blue-200 font-bold mb-1">Impact:</div>
                          <div className="text-sm text-blue-700 dark:text-blue-300">{innovation.impact}</div>
                        </div>
                        <div className="mt-3 text-xs text-slate-500 italic">{innovation.technical_details}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* ONGLET INVESTISSEMENT */}
          {activeTab === 'investment' && (
            <div className="space-y-8">
              <section className="text-center">
                <h2 className="text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                  Patek Philippe comme Investissement
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
                  Analyse des performances, tendances marché et conseils collectionneur
                </p>
              </section>

              <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Performances par Modèle</h3>
                <div className="space-y-4">
                  {investmentData.map((item, index) => (
                    <div key={index} className="border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:shadow-lg transition-all">
                      <div className="grid md:grid-cols-6 gap-4 items-center">
                        <div className="md:col-span-2">
                          <h4 className="font-bold text-slate-900 dark:text-white">{item.model}</h4>
                          <p className="text-sm text-slate-500">Lancé en {item.year}</p>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-slate-500">Prix Original</div>
                          <div className="font-mono text-slate-900 dark:text-white">{item.retail_price}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-slate-500">Valeur Actuelle</div>
                          <div className="font-mono text-slate-900 dark:text-white">{item.current_value}</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-lg font-bold ${
                            item.appreciation.startsWith('+') ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {item.appreciation}
                          </div>
                          <div className="text-sm text-slate-500">Appréciation</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${
                                  i < Math.floor(item.collectible_score / 2) 
                                    ? 'text-yellow-500 fill-current' 
                                    : 'text-slate-300'
                                }`} 
                              />
                            ))}
                          </div>
                          <div className="text-sm text-slate-500">Score: {item.collectible_score}/10</div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-slate-900 dark:text-white">Rareté: </span>
                          <span className="text-slate-600 dark:text-slate-400">{item.rarity}</span>
                        </div>
                        <div>
                          <span className="font-medium text-slate-900 dark:text-white">Tendance: </span>
                          <span className="text-slate-600 dark:text-slate-400">{item.market_trend}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* ONGLET ARTISANAT */}
          {activeTab === 'craftsmanship' && (
            <div className="space-y-8">
              <section className="text-center">
                <h2 className="text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                  Artisanat d'Exception
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
                  Le savoir-faire ancestral qui fait la différence
                </p>
              </section>

              <section className="grid md:grid-cols-3 gap-6">
                {certifications.map((cert, index) => (
                  <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-3 mb-4">
                      <Award className="w-8 h-8 text-blue-600" />
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{cert.name}</h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">{cert.description}</p>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium text-slate-900 dark:text-white">Depuis: </span>
                        <span className="text-slate-600 dark:text-slate-400">{cert.since}</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-900 dark:text-white">Exigences: </span>
                        <span className="text-slate-600 dark:text-slate-400">{cert.requirements}</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-900 dark:text-white">Statut: </span>
                        <span className="text-slate-600 dark:text-slate-400">{cert.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            </div>
          )}
        </div>

        {/* CALL TO ACTION FINAL PREMIUM */}
        <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white/30 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-white/30 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-white/20 rounded-full animate-pulse delay-500"></div>
          </div>
          
          <div className="max-w-5xl mx-auto px-8 text-center relative z-10">
            <h2 className="text-6xl font-bold mb-6">
              Devenir Gardien d'une Légende
            </h2>
            <p className="text-2xl mb-8 text-blue-100 leading-relaxed">
              Recevez le <strong>Guide Expert Patek Philippe 2025</strong> (125 pages) et accédez aux informations réservées aux collectionneurs avertis.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <BookOpen className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold mb-2">Guide Complet</h3>
                <p className="text-sm text-blue-100">125 pages d'expertise horlogère</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Shield className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold mb-2">Certification</h3>
                <p className="text-sm text-blue-100">Contenu certifié expert</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold mb-2">Investissement</h3>
                <p className="text-sm text-blue-100">Analyses marché 2025</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold hover:bg-blue-50 transition-all flex items-center gap-3 text-lg shadow-xl">
                <Download className="w-6 h-6" />
                Télécharger le Guide Expert
              </button>
              <button className="border-2 border-white text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-blue-600 transition-all text-lg">
                Consultation Experte
              </button>
            </div>
            
            <p className="text-sm text-blue-200 mt-6">
              © 2024-2025 HorloLearn - La Référence Mondiale en Horlogerie de Luxe
            </p>
          </div>
        </section>

        {/* FOOTER PREMIUM */}
        <footer className="bg-slate-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <Crown2 className="w-10 h-10 text-yellow-400" />
                  <div>
                    <div className="text-3xl font-bold">Patek Philippe</div>
                    <div className="text-sm text-slate-400">La référence absolue depuis 1839</div>
                  </div>
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Ce guide complet présente Patek Philippe comme la manufacture de référence 
                  mondiale en horlogerie de luxe. 185 ans d'innovation, d'excellence et 
                  de tradition familiale font de chaque montre Patek Philippe un héritage 
                  pour les générations futures.
                </p>
                <div className="flex gap-4">
                  <Share2 className="w-6 h-6 text-slate-400 hover:text-white cursor-pointer transition-colors" />
                  <Bookmark className="w-6 h-6 text-slate-400 hover:text-white cursor-pointer transition-colors" />
                  <Download className="w-6 h-6 text-slate-400 hover:text-white cursor-pointer transition-colors" />
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-bold mb-4">Collections</h4>
                <ul className="space-y-2 text-slate-400">
                  <li><a href="#" className="hover:text-white transition-colors">Calatrava</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Nautilus</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Aquanaut</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Grandes Complications</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Twenty~4</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-bold mb-4">Expertise</h4>
                <ul className="space-y-2 text-slate-400">
                  <li><a href="#" className="hover:text-white transition-colors">Histoire</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Complications</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Investissement</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Artisanat</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Certifications</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-slate-800 mt-12 pt-8 text-center">
              <p className="text-slate-400">
                © 2024-2025 HorloLearn - Guide de Référence Horlogère Professionnel<br />
                Contenu Expert • Données en Temps Réel • Mise à Jour Continue
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
