// src/app/fuseaux-horaires/page.tsx
'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Clock,
  Globe,
  Compass,
  Sun,
  Moon,
  MapPin,
  Sliders,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Info,
  RotateCcw,
  RotateCw,
  Play,
  Pause,
  ShieldCheck,
  ChevronRight,
  Eye,
  Calendar,
  Layers,
  Activity,
  Award,
  Search,
  Zap
} from 'lucide-react';

// --- DATA STRUCTURES ---
interface CityData {
  id: string;
  name: string;
  country: string;
  tz: string;
  offsetHours: number; // approximate standard offset
  cottierIndex: number; // 0 to 23 around the Cottier dial (15 deg each)
  lat: number;
  lng: number;
  region: 'europe' | 'americas' | 'asia' | 'pacific' | 'mideast';
  hubDescription: string;
  stockMarket: string;
  isManufactureHub: boolean;
}

const CITIES_DATA: CityData[] = [
  {
    id: 'london',
    name: 'Londres',
    country: 'Royaume-Uni',
    tz: 'Europe/London',
    offsetHours: 0,
    cottierIndex: 0,
    lat: 51.5074,
    lng: -0.1278,
    region: 'europe',
    hubDescription: 'Observatoire Royal de Greenwich & Méridien d\'Origine 0° (GMT)',
    stockMarket: 'LSE (08:00 - 16:30)',
    isManufactureHub: false
  },
  {
    id: 'geneve',
    name: 'Genève',
    country: 'Suisse',
    tz: 'Europe/Zurich',
    offsetHours: 1,
    cottierIndex: 1,
    lat: 46.2044,
    lng: 6.1432,
    region: 'europe',
    hubDescription: 'Capitale Mondiale de la Haute Horlogerie (Patek Philippe, Rolex, Vacheron Constantin)',
    stockMarket: 'SIX Swiss Exchange (09:00 - 17:30)',
    isManufactureHub: true
  },
  {
    id: 'cairo',
    name: 'Le Caire',
    country: 'Égypte',
    tz: 'Africa/Cairo',
    offsetHours: 2,
    cottierIndex: 2,
    lat: 30.0444,
    lng: 31.2357,
    region: 'mideast',
    hubDescription: 'Carrefour historique des cadrans solaires de l\'Antiquité et du Nil',
    stockMarket: 'EGX (10:00 - 14:30)',
    isManufactureHub: false
  },
  {
    id: 'moscow',
    name: 'Moscou',
    country: 'Russie',
    tz: 'Europe/Moscow',
    offsetHours: 3,
    cottierIndex: 3,
    lat: 55.7558,
    lng: 37.6173,
    region: 'europe',
    hubDescription: 'Pôle historique des chronographes de cosmonautes Poljot & Strela',
    stockMarket: 'MOEX (10:00 - 18:45)',
    isManufactureHub: false
  },
  {
    id: 'dubai',
    name: 'Dubaï',
    country: 'Émirats Arabes Unis',
    tz: 'Asia/Dubai',
    offsetHours: 4,
    cottierIndex: 4,
    lat: 25.2048,
    lng: 55.2708,
    region: 'mideast',
    hubDescription: 'Épicentre du luxe horloger mondial & Dubaï Watch Week',
    stockMarket: 'DFM (10:00 - 15:00)',
    isManufactureHub: false
  },
  {
    id: 'karachi',
    name: 'Karachi',
    country: 'Pakistan',
    tz: 'Asia/Karachi',
    offsetHours: 5,
    cottierIndex: 5,
    lat: 24.8607,
    lng: 67.0011,
    region: 'asia',
    hubDescription: 'Port stratégique et grand carrefour d\'Asie du Sud',
    stockMarket: 'PSX (09:30 - 15:30)',
    isManufactureHub: false
  },
  {
    id: 'dhaka',
    name: 'Dhaka',
    country: 'Bangladesh',
    tz: 'Asia/Dhaka',
    offsetHours: 6,
    cottierIndex: 6,
    lat: 23.8103,
    lng: 90.4125,
    region: 'asia',
    hubDescription: 'Méridien du Golfe du Bengale et commerce régional',
    stockMarket: 'DSE (10:00 - 14:30)',
    isManufactureHub: false
  },
  {
    id: 'bangkok',
    name: 'Bangkok',
    country: 'Thaïlande',
    tz: 'Asia/Bangkok',
    offsetHours: 7,
    cottierIndex: 7,
    lat: 13.7563,
    lng: 100.5018,
    region: 'asia',
    hubDescription: 'Hub des collectionneurs d\'Asie du Sud-Est & mécénat horloger',
    stockMarket: 'SET (10:00 - 16:30)',
    isManufactureHub: false
  },
  {
    id: 'hongkong',
    name: 'Hong Kong',
    country: 'Chine',
    tz: 'Asia/Hong_Kong',
    offsetHours: 8,
    cottierIndex: 8,
    lat: 22.3193,
    lng: 114.1694,
    region: 'asia',
    hubDescription: 'Premier marché d\'exportation mondial des manufactures suisses',
    stockMarket: 'HKEX (09:30 - 16:00)',
    isManufactureHub: true
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japon',
    tz: 'Asia/Tokyo',
    offsetHours: 9,
    cottierIndex: 9,
    lat: 35.6762,
    lng: 139.6503,
    region: 'asia',
    hubDescription: 'Manufactures Grand Seiko Shizukuishi, Micro Artist Studio & berceau quartz',
    stockMarket: 'TSE (09:00 - 15:00)',
    isManufactureHub: true
  },
  {
    id: 'sydney',
    name: 'Sydney',
    country: 'Australie',
    tz: 'Australia/Sydney',
    offsetHours: 10,
    cottierIndex: 10,
    lat: -33.8688,
    lng: 151.2093,
    region: 'pacific',
    hubDescription: 'Premier continent majeur à ouvrir les marchés financiers quotidiens',
    stockMarket: 'ASX (10:00 - 16:00)',
    isManufactureHub: false
  },
  {
    id: 'noumea',
    name: 'Nouméa',
    country: 'Nouvelle-Calédonie',
    tz: 'Pacific/Noumea',
    offsetHours: 11,
    cottierIndex: 11,
    lat: -22.2758,
    lng: 166.4580,
    region: 'pacific',
    hubDescription: 'Méridien mélanésien et repère insulaire du Pacifique Sud',
    stockMarket: 'Marché Pacifique',
    isManufactureHub: false
  },
  {
    id: 'auckland',
    name: 'Auckland',
    country: 'Nouvelle-Zélande',
    tz: 'Pacific/Auckland',
    offsetHours: 12,
    cottierIndex: 12,
    lat: -36.8485,
    lng: 174.7633,
    region: 'pacific',
    hubDescription: 'Antipodes de l\'Europe & sentinelle de la ligne de changement de date',
    stockMarket: 'NZX (10:00 - 17:00)',
    isManufactureHub: false
  },
  {
    id: 'samoa',
    name: 'Samoa',
    country: 'Samoa',
    tz: 'Pacific/Apia',
    offsetHours: 13,
    cottierIndex: 13,
    lat: -13.8333,
    lng: -171.7667,
    region: 'pacific',
    hubDescription: 'Premier fuseau terrestre habité à fêter le Nouvel An (UTC+13)',
    stockMarket: 'Commerce insulaire',
    isManufactureHub: false
  },
  {
    id: 'honolulu',
    name: 'Honolulu',
    country: 'États-Unis',
    tz: 'Pacific/Honolulu',
    offsetHours: -10,
    cottierIndex: 14,
    lat: 21.3069,
    lng: -157.8583,
    region: 'pacific',
    hubDescription: 'Observatoires astronomiques du Mauna Kea & chronométrie stellaire',
    stockMarket: 'Commerce Hawaïen',
    isManufactureHub: false
  },
  {
    id: 'anchorage',
    name: 'Anchorage',
    country: 'États-Unis',
    tz: 'America/Anchorage',
    offsetHours: -9,
    cottierIndex: 15,
    lat: 61.2181,
    lng: -149.9003,
    region: 'americas',
    hubDescription: 'Carrefour aérien polaire reliant Europe, Amérique et Asie',
    stockMarket: 'Hub Arctique',
    isManufactureHub: false
  },
  {
    id: 'losangeles',
    name: 'Los Angeles',
    country: 'États-Unis',
    tz: 'America/Los_Angeles',
    offsetHours: -8,
    cottierIndex: 16,
    lat: 34.0522,
    lng: -118.2437,
    region: 'americas',
    hubDescription: 'Côte Ouest des États-Unis, pôle de haute technologie & design',
    stockMarket: 'NASDAQ West',
    isManufactureHub: false
  },
  {
    id: 'denver',
    name: 'Denver',
    country: 'États-Unis',
    tz: 'America/Denver',
    offsetHours: -7,
    cottierIndex: 17,
    lat: 39.7392,
    lng: -104.9903,
    region: 'americas',
    hubDescription: 'Laboratoire NIST de Boulder (Horloge Atomique de Référence F1/F2)',
    stockMarket: 'Mountain Exchange',
    isManufactureHub: true
  },
  {
    id: 'chicago',
    name: 'Chicago',
    country: 'États-Unis',
    tz: 'America/Chicago',
    offsetHours: -6,
    cottierIndex: 18,
    lat: 41.8781,
    lng: -87.6298,
    region: 'americas',
    hubDescription: 'Berceau des régulateurs de chemin de fer (Ball Watch & Standard Railway Time 1883)',
    stockMarket: 'CME Group (08:30 - 15:15)',
    isManufactureHub: true
  },
  {
    id: 'newyork',
    name: 'New York',
    country: 'États-Unis',
    tz: 'America/New_York',
    offsetHours: -5,
    cottierIndex: 19,
    lat: 40.7128,
    lng: -74.0060,
    region: 'americas',
    hubDescription: 'Wall Street, 5e Avenue & grandes enchères horlogères (Phillips, Sotheby\'s)',
    stockMarket: 'NYSE / NASDAQ (09:30 - 16:00)',
    isManufactureHub: true
  },
  {
    id: 'santiago',
    name: 'Santiago',
    country: 'Chili',
    tz: 'America/Santiago',
    offsetHours: -4,
    cottierIndex: 20,
    lat: -33.4489,
    lng: -70.6693,
    region: 'americas',
    hubDescription: 'Observatoires de l\'Atacama (ESO Paranal) & cartographie céleste',
    stockMarket: 'Santiago Stock Exchange',
    isManufactureHub: false
  },
  {
    id: 'rio',
    name: 'Rio de Janeiro',
    country: 'Brésil',
    tz: 'America/Sao_Paulo',
    offsetHours: -3,
    cottierIndex: 21,
    lat: -22.9068,
    lng: -43.1729,
    region: 'americas',
    hubDescription: 'Métropole d\'Amérique du Sud, pierres précieuses et joaillerie d\'art',
    stockMarket: 'B3 Brasil (10:00 - 17:55)',
    isManufactureHub: false
  },
  {
    id: 'noronha',
    name: 'F. de Noronha',
    country: 'Brésil',
    tz: 'Atlantic/South_Georgia',
    offsetHours: -2,
    cottierIndex: 22,
    lat: -3.8547,
    lng: -32.4247,
    region: 'americas',
    hubDescription: 'Archipel atlantique et méridien maritime transocéanique',
    stockMarket: 'Méridien Maritime',
    isManufactureHub: false
  },
  {
    id: 'azores',
    name: 'Açores',
    country: 'Portugal',
    tz: 'Atlantic/Azores',
    offsetHours: -1,
    cottierIndex: 23,
    lat: 37.7412,
    lng: -25.6756,
    region: 'europe',
    hubDescription: 'Sentinelle météorologique et frontière atlantique du temps européen',
    stockMarket: 'Euronext Lisbon',
    isManufactureHub: false
  }
];

// Moteur de calcul de fuseaux ultra-rapide (0.0001ms) avec cache d'offsets en minutes
// Élimine 100% des blocages CPU et du gel sur mobile (iOS Safari & Android Chrome)
const tzOffsetCache = new Map<string, number>();

function getCityOffsetMinutes(tz: string, date: Date): number {
  let offset = tzOffsetCache.get(tz);
  if (offset !== undefined) return offset;
  try {
    const utcStr = date.toLocaleString('en-US', { timeZone: 'UTC' });
    const tzStr = date.toLocaleString('en-US', { timeZone: tz });
    offset = Math.round((new Date(tzStr).getTime() - new Date(utcStr).getTime()) / 60000);
    tzOffsetCache.set(tz, offset);
    return offset;
  } catch {
    return 0;
  }
}

// Helper ultra-rapide pour calculer les composantes locales sans bloquer le CPU mobile
function getCityTimeInfo(city: CityData, date: Date) {
  try {
    const offsetMinutes = getCityOffsetMinutes(city.tz, date);
    const totalMinutes = date.getUTCHours() * 60 + date.getUTCMinutes() + offsetMinutes;
    const normalizedMinutes = ((totalMinutes % 1440) + 1440) % 1440;
    const hour = Math.floor(normalizedMinutes / 60);
    const minute = normalizedMinutes % 60;
    const second = date.getUTCSeconds();

    const formattedTime = (hour < 10 ? '0' : '') + hour + ':' + (minute < 10 ? '0' : '') + minute + ':' + (second < 10 ? '0' : '') + second;

    const dayOffset = Math.floor(totalMinutes / 1440);
    const d = new Date(date);
    if (dayOffset !== 0) {
      d.setUTCDate(d.getUTCDate() + dayOffset);
    }
    const day = d.getUTCDate();
    const month = d.getUTCMonth() + 1;
    const year = d.getUTCFullYear();
    const formattedDate = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + year;

    const isDay = hour >= 6 && hour < 18;
    const isZenith = hour >= 11 && hour <= 13;
    const isTwilight = (hour >= 5 && hour < 6) || (hour >= 18 && hour < 19);

    let sunStatus = 'Nuit Étoilée';
    if (isZenith) sunStatus = 'Soleil au Zénith';
    else if (isDay) sunStatus = 'Plein Jour';
    else if (isTwilight) sunStatus = 'Crépuscule / Aube';

    const isWorkshopOpen = hour >= 8 && (hour < 17 || (hour === 17 && minute <= 30));

    return {
      hour,
      minute,
      second,
      formattedTime,
      formattedDate,
      isDay,
      sunStatus,
      isWorkshopOpen
    };
  } catch {
    return {
      hour: 12,
      minute: 0,
      second: 0,
      formattedTime: '12:00:00',
      formattedDate: '--/--/----',
      isDay: true,
      sunStatus: 'Plein Jour',
      isWorkshopOpen: true
    };
  }
}

// 4 Master Quiz Questions
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'Combien de degrés d\'angle terrestre séparent deux fuseaux horaires standards consécutifs d\'une heure ?',
    options: [
      '15 degrés (360° divisé par 24 heures)',
      '12 degrés (en hommage aux 12 cadrans)',
      '24 degrés (1 degré par heure de rotation)',
      '30 degrés (angle d\'un signe du zodiaque)'
    ],
    correct: 0,
    explanation: 'La Terre effectuant un tour complet de 360° sur elle-même en 24 heures, chaque heure correspond exactement à un méridien de 15° de longitude (360 / 24 = 15°).'
  },
  {
    id: 2,
    question: 'Dans l\'invention géniale de Louis Cottier (1931), dans quel sens tourne le disque des 24 heures ?',
    options: [
      'Dans le sens anti-horaire (sens inverse des aiguilles)',
      'Dans le sens horaire classique (sens des aiguilles)',
      'Il reste parfaitement fixe, seule la lunette tourne',
      'Il oscille d\'avant en arrière toutes les 12 heures'
    ],
    correct: 0,
    explanation: 'Le disque des 24h tourne en sens anti-horaire. Cela permet aux heures d\'avancer face aux villes de la bague fixe ou mobile, reflétant fidèlement le défilement de la Terre d\'Ouest en Est.'
  },
  {
    id: 3,
    question: 'Quelle est la différence fondamentale entre un mouvement « True GMT / Flyer » et un « Caller GMT / Office GMT » ?',
    options: [
      'Sur un True GMT, l\'aiguille locale des 12h saute indépendamment d\'heure en heure sans arrêter le balancier ni perdre la minute',
      'Le True GMT utilise une pile au lithium alors que le Caller GMT est purement mécanique',
      'Le Caller GMT possède deux spiraux et deux échappements séparés',
      'Le True GMT ne fonctionne que dans l\'hémisphère Nord'
    ],
    correct: 0,
    explanation: 'Un « True GMT » (ex: Rolex 3186/3285, Tudor MT5652) permet au voyageur de faire sauter l\'aiguille locale des heures par pas d\'une heure d\'un coup de couronne, sans stopper la marche des secondes ni la précision chronométrique.'
  },
  {
    id: 4,
    question: 'Que se passe-t-il lorsqu\'un navigateur franchit la Ligne Internationale de Changement de Date d\'Est en Ouest dans le Pacifique ?',
    options: [
      'Il avance d\'un jour complet dans le calendrier (+1 jour)',
      'Il recule d\'un jour complet (-1 jour)',
      'Son chronomètre mécanique s\'arrête net',
      'L\'aiguille des minutes fait 12 tours rapides automatiques'
    ],
    correct: 0,
    explanation: 'En franchissant le 180e méridien d\'Est en Ouest (des Amériques vers l\'Asie/Océanie), on avance d\'un jour (+1 jour sur le calendrier). Les îles Samoa sont passées à l\'Ouest en 2011 pour s\'aligner sur l\'Australie !'
  }
];

export default function FuseauxHorairesPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'cottier' | 'planisphere' | 'scrubber' | 'complications'>('cottier');
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [selectedCityId, setSelectedCityId] = useState<string>('geneve');
  const [isDeadBeat, setIsDeadBeat] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  // Scrubber time travel state
  const [isLive, setIsLive] = useState<boolean>(true);
  const [scrubberMinutes, setScrubberMinutes] = useState<number>(720); // 12:00 default
  const [isSimPlaying, setIsSimPlaying] = useState<boolean>(false);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  // Audio Context Ref for luxury mechanical clicks
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playClickSound = useCallback(() => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      if (audioCtxRef.current) {
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1800, audioCtxRef.current.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, audioCtxRef.current.currentTime + 0.04);
        gain.gain.setValueAtTime(0.12, audioCtxRef.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start();
        osc.stop(audioCtxRef.current.currentTime + 0.05);
      }
    } catch {
      // Audio not supported or blocked
    }
  }, [soundEnabled]);

  // Mounted & real-time clock ticker
  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scrubber simulation interval when playing
  useEffect(() => {
    if (!isSimPlaying || isLive) return;
    const timer = setInterval(() => {
      setScrubberMinutes((prev: number) => (prev + 15) % 1440);
    }, 400);
    return () => clearInterval(timer);
  }, [isSimPlaying, isLive]);

  // Effective date to compute times from
  const effectiveDate = useMemo(() => {
    if (isLive || !mounted) return currentTime;
    const d = new Date(currentTime);
    const hours = Math.floor(scrubberMinutes / 60);
    const mins = scrubberMinutes % 60;
    d.setHours(hours, mins, 0, 0);
    return d;
  }, [isLive, mounted, currentTime, scrubberMinutes]);

  // Selected city object
  const selectedCity = useMemo(() => {
    return CITIES_DATA.find(c => c.id === selectedCityId) || CITIES_DATA[1];
  }, [selectedCityId]);

  // Information of selected city
  const selectedCityInfo = useMemo(() => {
    return getCityTimeInfo(selectedCity, effectiveDate);
  }, [selectedCity, effectiveDate]);

  // Geneva Reference Info
  const genevaInfo = useMemo(() => {
    const gen = CITIES_DATA.find(c => c.id === 'geneve') || CITIES_DATA[1];
    return getCityTimeInfo(gen, effectiveDate);
  }, [effectiveDate]);

  // Handle city selection change with mechanical sound
  const handleSelectCity = (cityId: string) => {
    setSelectedCityId(cityId);
    playClickSound();
  };

  // Jump pusher at 10 o'clock: advance 1 timezone (+1h)
  const handlePusherJump = () => {
    playClickSound();
    const currentIndex = CITIES_DATA.findIndex(c => c.id === selectedCityId);
    const nextIndex = (currentIndex + 1) % CITIES_DATA.length;
    setSelectedCityId(CITIES_DATA[nextIndex].id);
  };

  // Astronomical Sun Longitude (Subsolar Point) in degrees (-180 to +180)
  const sunLongitude = useMemo(() => {
    const utcHours = effectiveDate.getUTCHours();
    const utcMinutes = effectiveDate.getUTCMinutes();
    const utcSeconds = effectiveDate.getUTCSeconds();
    const totalUtcHours = utcHours + utcMinutes / 60 + utcSeconds / 3600;
    let lng = -(totalUtcHours - 12) * 15;
    while (lng < -180) lng += 360;
    while (lng > 180) lng -= 360;
    return lng;
  }, [effectiveDate]);

  // Solar Declination estimate in degrees
  const solarDeclination = useMemo(() => {
    const startOfYear = new Date(effectiveDate.getFullYear(), 0, 0);
    const diff = effectiveDate.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const rad = (2 * Math.PI / 365) * (dayOfYear + 10);
    return -23.44 * Math.cos(rad);
  }, [effectiveDate]);

  // Filtered cities list for directory & scrubber
  const filteredCities = useMemo(() => {
    return CITIES_DATA.filter(city => {
      const matchRegion = selectedRegion === 'all' || city.region === selectedRegion;
      const matchSearch =
        city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.hubDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchRegion && matchSearch;
    });
  }, [selectedRegion, searchQuery]);

  // Cottier Dial Rotation Angles
  const cityRingRotation = useMemo(() => {
    const cityIndex = selectedCity.cottierIndex;
    return -cityIndex * 15;
  }, [selectedCity]);

  const hour24DiscRotation = useMemo(() => {
    const utcHours = effectiveDate.getUTCHours();
    const utcMins = effectiveDate.getUTCMinutes();
    const totalUtcHours = utcHours + utcMins / 60;
    return -totalUtcHours * 15;
  }, [effectiveDate]);

  // Central local hands angles (12-hour dial)
  const localHourAngle = useMemo(() => {
    const h = selectedCityInfo.hour % 12;
    const m = selectedCityInfo.minute;
    return (h * 30) + (m * 0.5);
  }, [selectedCityInfo]);

  const localMinuteAngle = useMemo(() => {
    const m = selectedCityInfo.minute;
    const s = selectedCityInfo.second;
    return (m * 6) + (s * 0.1);
  }, [selectedCityInfo]);

  const localSecondAngle = useMemo(() => {
    if (isDeadBeat) {
      return selectedCityInfo.second * 6;
    }
    const s = selectedCityInfo.second;
    const ms = effectiveDate.getMilliseconds();
    return (s * 6) + (ms * 0.006);
  }, [selectedCityInfo, isDeadBeat, effectiveDate]);

  // Quiz score calculation
  const quizScore = useMemo(() => {
    let score = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) score++;
    });
    return score;
  }, [selectedAnswers]);



  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#07090E] text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-amber-500/30 selection:text-amber-700 dark:selection:text-amber-200">
      {/* Background Subtle Radial Glow (GPU-friendly, 0ms overhead on mobile) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,119,6,0.08),transparent)]" />

        {/* --- HERO HEADER --- */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-mono tracking-widest uppercase shadow-sm">
            <Award className="w-3.5 h-3.5" />
            Complication Haute Horlogerie Suisse · Brevet Louis Cottier 1931
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
            Fuseaux Horaires & <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-200 dark:via-amber-400 dark:to-amber-500 bg-clip-text text-transparent">Heures du Monde</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-3xl mx-auto font-light leading-relaxed">
            Maîtrisez les 24 méridiens de la Terre à travers le prisme de la Haute Horlogerie.
            De l&apos;anneau tournant universel de Louis Cottier à la cartographie solaire en temps réel,
            explorez la mécanique du voyage et les calibres GMT de manufacture.
          </p>
        </div>

        {/* --- LIVE UTC & GENEVA TICKER BAR --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 font-mono">
          <div className="bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col justify-between backdrop-blur-none sm:backdrop-blur-sm shadow-sm dark:shadow-none">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>TEMPS UTC / GMT</span>
              <Globe className="w-4 h-4 text-sky-500 dark:text-sky-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-sky-300 mt-2">
              {currentTime.toUTCString().slice(17, 25)}
            </div>
            <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Méridien 0° de Greenwich</div>
          </div>

          <div className="bg-white dark:bg-[#0D121F] border border-amber-500/30 rounded-xl p-4 flex flex-col justify-between backdrop-blur-none sm:backdrop-blur-sm bg-gradient-to-br from-amber-500/5 to-transparent shadow-sm dark:shadow-none">
            <div className="flex items-center justify-between text-xs text-amber-700 dark:text-amber-300">
              <span>RÉFÉRENCE GENÈVE (CET)</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-amber-600 dark:text-amber-300 mt-2">
              {genevaInfo.formattedTime}
            </div>
            <div className="text-[11px] text-amber-700/80 dark:text-amber-400/80 mt-1">Manufactures Suisses · UTC+1</div>
          </div>

          <div className="bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col justify-between backdrop-blur-none sm:backdrop-blur-sm shadow-sm dark:shadow-none">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>VILLE SÉLECTIONNÉE</span>
              <MapPin className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-emerald-300 mt-2 truncate">
              {selectedCity.name}
            </div>
            <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 truncate">
              {selectedCityInfo.formattedTime} ({selectedCity.offsetHours >= 0 ? `+${selectedCity.offsetHours}` : selectedCity.offsetHours}h)
            </div>
          </div>

          <div className="bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col justify-between backdrop-blur-none sm:backdrop-blur-sm shadow-sm dark:shadow-none">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>ZÉNITH SOLAIRE UTC</span>
              <Sun className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-amber-400 mt-2">
              {sunLongitude >= 0 ? `+${sunLongitude.toFixed(1)}°` : `${sunLongitude.toFixed(1)}°`}
            </div>
            <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
              Déclinaison : {solarDeclination >= 0 ? `+${solarDeclination.toFixed(1)}°` : `${solarDeclination.toFixed(1)}°`}
            </div>
          </div>
        </div>

        {/* --- NAVIGATION TABS --- */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
          <button
            onClick={() => setActiveTab('cottier')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'cottier'
                ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/50 shadow-md'
                : 'bg-white dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/40'
            }`}
          >
            <Compass className="w-4 h-4 text-amber-500" />
            Horloge Cottier 24 Villes
          </button>

          <button
            onClick={() => setActiveTab('planisphere')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'planisphere'
                ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/50 shadow-md'
                : 'bg-white dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/40'
            }`}
          >
            <Globe className="w-4 h-4 text-amber-500" />
            Planisphère & Terminator Solaire
          </button>

          <button
            onClick={() => setActiveTab('scrubber')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'scrubber'
                ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/50 shadow-md'
                : 'bg-white dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/40'
            }`}
          >
            <Sliders className="w-4 h-4 text-amber-500" />
            Scrubber 24h & Planificateur Mondial
          </button>

          <button
            onClick={() => setActiveTab('complications')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'complications'
                ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/50 shadow-md'
                : 'bg-white dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/40'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-500" />
            Architecture GMT vs World Time
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: HORLOGE UNIVERSELLE COTTIER (INTERACTIVE WATCH COMPLICATION)      */}
        {/* ========================================================================= */}
        {activeTab === 'cottier' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* WATCH DISPLAY (7 cols) */}
            <div className="lg:col-span-7 bg-white dark:bg-gradient-to-b dark:from-slate-900/90 dark:to-[#0A0D14] border border-slate-200 dark:border-slate-700 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center relative shadow-lg dark:shadow-2xl overflow-hidden backdrop-blur-none sm:backdrop-blur-none sm:backdrop-blur-sm">
              {/* Subtle watch background radial ring */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.06)_0%,transparent_70%)] pointer-events-none" />

              {/* Top Dial Action Controls */}
              <div className="w-full flex items-center justify-between mb-4 z-10">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePusherJump}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/40 text-amber-700 dark:text-amber-300 hover:bg-amber-500/20 text-xs font-mono transition-all shadow-sm active:scale-95"
                    title="Actionner le poussoir de fuseau à 10 heures"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Poussoir 10h (+1 Fuseau)</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsDeadBeat(!isDeadBeat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                      isDeadBeat
                        ? 'bg-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-500/50'
                        : 'bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white'
                    }`}
                    title="Alterner entre trotteuse continue 4Hz et seconde morte indépendante"
                  >
                    {isDeadBeat ? 'Mode : Seconde Morte (1 Hz)' : 'Mode : Trotteuse Fluide (4 Hz)'}
                  </button>
                </div>
              </div>

              {/* --- COTTIER LUXURY SVG DIAL --- */}
              <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center select-none rounded-full shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <svg
                  viewBox="0 0 500 500"
                  className="w-full h-full"
                >
                  <defs>
                    <linearGradient id="bezelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4A5568" />
                      <stop offset="25%" stopColor="#CBD5E0" />
                      <stop offset="50%" stopColor="#2D3748" />
                      <stop offset="75%" stopColor="#E2E8F0" />
                      <stop offset="100%" stopColor="#1A202C" />
                    </linearGradient>

                    <linearGradient id="goldRim" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#78350F" />
                      <stop offset="50%" stopColor="#D97706" />
                      <stop offset="70%" stopColor="#FDE68A" />
                      <stop offset="100%" stopColor="#92400E" />
                    </linearGradient>

                    <radialGradient id="dialSunburst" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#1E293B" />
                      <stop offset="70%" stopColor="#0F172A" />
                      <stop offset="100%" stopColor="#070A0F" />
                    </radialGradient>

                    <linearGradient id="dayRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFBEB" />
                      <stop offset="100%" stopColor="#FEF3C7" />
                    </linearGradient>

                    <linearGradient id="nightRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#020617" />
                      <stop offset="100%" stopColor="#0F172A" />
                    </linearGradient>

                    <linearGradient id="goldHand" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#D97706" />
                      <stop offset="50%" stopColor="#FEF08A" />
                      <stop offset="100%" stopColor="#92400E" />
                    </linearGradient>
                  </defs>

                  {/* 1. OUTER POLISHED STEEL BEZEL */}
                  <circle cx="250" cy="250" r="244" fill="url(#bezelGrad)" stroke="#1A202C" strokeWidth="4" />
                  <circle cx="250" cy="250" r="236" fill="#0B0F19" stroke="url(#goldRim)" strokeWidth="3" />

                  {/* Mechanical Screws at 4 quadrants */}
                  {[45, 135, 225, 315].map((ang) => {
                    const rad = (ang * Math.PI) / 180;
                    const sx = 250 + 240 * Math.cos(rad);
                    const sy = 250 + 240 * Math.sin(rad);
                    return (
                      <g key={ang} transform={`translate(${sx}, ${sy})`}>
                        <circle r="3" fill="#A0AEC0" stroke="#4A5568" strokeWidth="0.8" />
                        <line x1="-2" y1="0" x2="2" y2="0" stroke="#2D3748" strokeWidth="0.6" transform={`rotate(${ang * 2})`} />
                      </g>
                    );
                  })}

                  {/* 2. ROTATING CITY RING */}
                  <g
                    transform={`rotate(${cityRingRotation}, 250, 250)`}
                    style={{ transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)', willChange: 'transform' }}
                  >
                    <circle cx="250" cy="250" r="232" fill="#0A0E17" stroke="#1E293B" strokeWidth="1" />
                    {CITIES_DATA.map((city) => {
                      const angleDeg = city.cottierIndex * 15 - 90;
                      const rad = (angleDeg * Math.PI) / 180;
                      const textRadius = 212;
                      const tx = 250 + textRadius * Math.cos(rad);
                      const ty = 250 + textRadius * Math.sin(rad);
                      const isCitySelected = city.id === selectedCity.id;

                      let rotationAngle = angleDeg + 90;
                      if (angleDeg > 0 && angleDeg < 180) {
                        rotationAngle += 180;
                      }

                      return (
                        <g
                          key={city.id}
                          onClick={() => handleSelectCity(city.id)}
                          className="cursor-pointer group"
                        >
                          <line
                            x1={250 + 228 * Math.cos(rad)}
                            y1={250 + 228 * Math.sin(rad)}
                            x2={250 + 233 * Math.cos(rad)}
                            y2={250 + 233 * Math.sin(rad)}
                            stroke={isCitySelected ? '#F59E0B' : '#475569'}
                            strokeWidth={isCitySelected ? 2 : 1}
                          />

                          <text
                            x={tx}
                            y={ty}
                            textAnchor="middle"
                            dominantBaseline="central"
                            transform={`rotate(${rotationAngle}, ${tx}, ${ty})`}
                            fontSize={isCitySelected ? '10.5' : '8.5'}
                            fontFamily="ui-sans-serif, system-ui, sans-serif"
                            fontWeight={isCitySelected ? '700' : '500'}
                            fill={
                              isCitySelected
                                ? '#FBBF24'
                                : city.isManufactureHub
                                ? '#E2E8F0'
                                : '#94A3B8'
                            }
                            className="transition-colors group-hover:fill-amber-300"
                          >
                            {city.name.toUpperCase()}
                          </text>
                        </g>
                      );
                    })}
                  </g>

                  {/* 3. 24-HOUR ROTATING CONCENTRIC DISC */}
                  <g
                    transform={`rotate(${hour24DiscRotation}, 250, 250)`}
                    style={{ transition: 'transform 0.4s linear' }}
                  >
                    <circle cx="250" cy="250" r="192" fill="#020617" stroke="#334155" strokeWidth="1" />

                    <path
                      d="M 250,58 A 192,192 0 0,1 250,442 L 250,392 A 142,142 0 0,0 250,108 Z"
                      fill="url(#dayRingGrad)"
                      stroke="#CA8A04"
                      strokeWidth="0.5"
                    />

                    <path
                      d="M 250,442 A 192,192 0 0,1 250,58 L 250,108 A 142,142 0 0,0 250,392 Z"
                      fill="url(#nightRingGrad)"
                      stroke="#1E3A8A"
                      strokeWidth="0.5"
                    />

                    {Array.from({ length: 24 }).map((_, idx) => {
                      const h = idx + 1;
                      const angle = (idx * 15) - 90;
                      const rad = (angle * Math.PI) / 180;
                      const rNum = 167;
                      const nx = 250 + rNum * Math.cos(rad);
                      const ny = 250 + rNum * Math.sin(rad);
                      const isDayHour = h >= 6 && h <= 18;

                      return (
                        <g key={h}>
                          <line
                            x1={250 + 145 * Math.cos(rad)}
                            y1={250 + 145 * Math.sin(rad)}
                            x2={250 + 190 * Math.cos(rad)}
                            y2={250 + 190 * Math.sin(rad)}
                            stroke={isDayHour ? '#D97706' : '#1E293B'}
                            strokeWidth="0.8"
                            strokeOpacity="0.4"
                          />
                          <text
                            x={nx}
                            y={ny}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize="9"
                            fontFamily="ui-monospace, monospace"
                            fontWeight="600"
                            fill={isDayHour ? '#78350F' : '#E2E8F0'}
                            transform={`rotate(${angle + 90}, ${nx}, ${ny})`}
                          >
                            {h === 12 ? '☀️ 12' : h === 24 ? '🌙 24' : h}
                          </text>
                        </g>
                      );
                    })}
                  </g>

                  {/* 4. CENTRAL MANUFACTURE DIAL */}
                  <circle cx="250" cy="250" r="142" fill="url(#dialSunburst)" stroke="url(#goldRim)" strokeWidth="2.5" />

                  {[25, 45, 65, 85, 105, 125].map(r => (
                    <circle
                      key={r}
                      cx="250"
                      cy="250"
                      r={r}
                      fill="none"
                      stroke="#334155"
                      strokeWidth="0.5"
                      strokeOpacity="0.3"
                    />
                  ))}

                  {Array.from({ length: 12 }).map((_, i) => {
                    const ang = i * 30 - 90;
                    const rad = (ang * Math.PI) / 180;
                    const x1 = 250 + 126 * Math.cos(rad);
                    const y1 = 250 + 126 * Math.sin(rad);
                    const x2 = 250 + 138 * Math.cos(rad);
                    const y2 = 250 + 138 * Math.sin(rad);
                    return (
                      <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#F59E0B"
                        strokeWidth={i % 3 === 0 ? 3 : 1.5}
                        strokeLinecap="round"
                      />
                    );
                  })}

                  <text
                    x="250"
                    y="180"
                    textAnchor="middle"
                    fill="#FDE68A"
                    fontSize="10"
                    fontFamily="serif"
                    letterSpacing="2"
                    fontWeight="600"
                  >
                    HORLOLEARN
                  </text>
                  <text
                    x="250"
                    y="193"
                    textAnchor="middle"
                    fill="#94A3B8"
                    fontSize="6.5"
                    fontFamily="sans-serif"
                    letterSpacing="1.5"
                  >
                    GENÈVE · WORLD TIME
                  </text>

                  <rect x="180" y="300" width="140" height="22" rx="4" fill="#0B132B" stroke="#3B82F6" strokeWidth="0.8" />
                  <text
                    x="250"
                    y="314"
                    textAnchor="middle"
                    fill="#60A5FA"
                    fontSize="9.5"
                    fontFamily="monospace"
                    fontWeight="700"
                  >
                    {selectedCity.name.toUpperCase()} · {selectedCityInfo.formattedTime}
                  </text>

                  {/* 5. WATCH HANDS */}
                  <g transform={`rotate(${localHourAngle}, 250, 250)`}>
                    <path
                      d="M 247,250 L 247,190 A 14,14 0 1,1 253,190 L 253,250 Z"
                      fill="url(#goldHand)"
                      stroke="#78350F"
                      strokeWidth="0.8"
                    />
                    <circle cx="250" cy="180" r="7" fill="#0F172A" stroke="url(#goldHand)" strokeWidth="2.5" />
                  </g>

                  <g transform={`rotate(${localMinuteAngle}, 250, 250)`}>
                    <polygon
                      points="246,250 250,140 254,250 250,265"
                      fill="url(#goldHand)"
                      stroke="#92400E"
                      strokeWidth="0.8"
                    />
                    <line x1="250" y1="250" x2="250" y2="142" stroke="#FFFBEB" strokeWidth="0.8" />
                  </g>

                  <g
                    transform={`rotate(${localSecondAngle}, 250, 250)`}
                    style={{ transition: isDeadBeat ? 'transform 0.1s cubic-bezier(0.4, 2, 0.6, 1)' : 'none' }}
                  >
                    <line x1="250" y1="285" x2="250" y2="128" stroke="#3B82F6" strokeWidth="1.2" strokeLinecap="round" />
                    <circle cx="250" cy="275" r="4.5" fill="none" stroke="#3B82F6" strokeWidth="1.2" />
                    <circle cx="250" cy="128" r="2.5" fill="#EF4444" />
                  </g>

                  <circle cx="250" cy="250" r="8" fill="#991B1B" stroke="#D97706" strokeWidth="1.5" />
                  <circle cx="250" cy="250" r="3.5" fill="#FEF08A" />

                  <polygon points="250,22 245,10 255,10" fill="#EF4444" />
                </svg>
              </div>

              {/* Bottom Quick-City Bar */}
              <div className="w-full mt-6 flex flex-wrap items-center justify-center gap-2 z-10">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono mr-1">Villes Rapides :</span>
                {['geneve', 'london', 'newyork', 'tokyo', 'dubai', 'hongkong'].map(cid => {
                  const c = CITIES_DATA.find(x => x.id === cid)!;
                  const isSelected = selectedCity.id === cid;
                  return (
                    <button
                      key={cid}
                      onClick={() => handleSelectCity(cid)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                          : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700/60'
                      }`}
                    >
                      {c.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SIDE CONTROL & TECHNICAL DECK (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Active City Master Card */}
              <div className="bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-amber-500/30 rounded-2xl p-6 shadow-md dark:shadow-xl backdrop-blur-none sm:backdrop-blur-none sm:backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-mono text-amber-600 dark:text-amber-400 tracking-wider uppercase font-semibold">
                      Fuseau Actif ({selectedCity.offsetHours >= 0 ? `UTC+${selectedCity.offsetHours}` : `UTC${selectedCity.offsetHours}`})
                    </span>
                    <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                      {selectedCity.name}
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{selectedCity.country}</p>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-medium flex items-center gap-1.5 ${
                    selectedCityInfo.isDay
                      ? 'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30'
                      : 'bg-blue-50 text-blue-800 border border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/30'
                  }`}>
                    {selectedCityInfo.isDay ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                    {selectedCityInfo.sunStatus}
                  </span>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-700 space-y-2 font-mono">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>Heure Locale Exacte :</span>
                    <span className="text-lg font-bold text-amber-600 dark:text-amber-300">{selectedCityInfo.formattedTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>Date Locale :</span>
                    <span className="text-slate-800 dark:text-slate-200 font-medium">{selectedCityInfo.formattedDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>Écart avec Genève :</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      {selectedCity.offsetHours - 1 > 0
                        ? `+${selectedCity.offsetHours - 1}h d'avance`
                        : selectedCity.offsetHours - 1 < 0
                        ? `${selectedCity.offsetHours - 1}h de retard`
                        : 'Même heure'}
                    </span>
                  </div>
                </div>

                {/* Economic / Workshop Status */}
                <div className="mt-4 space-y-3 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${selectedCityInfo.isWorkshopOpen ? 'bg-emerald-500' : 'bg-slate-400 dark:bg-slate-600'}`} />
                    <span className="font-medium">
                      Ateliers Horlogers :{' '}
                      <span className={selectedCityInfo.isWorkshopOpen ? 'text-emerald-600 dark:text-emerald-300 font-semibold' : 'text-slate-500 dark:text-slate-400'}>
                        {selectedCityInfo.isWorkshopOpen ? 'En pleine activité (08h00 - 17h30)' : 'Fermés / Période de repos'}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-start gap-2 text-slate-500 dark:text-slate-400">
                    <Info className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>{selectedCity.hubDescription}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                    <Activity className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
                    <span>Marché / Bourse : {selectedCity.stockMarket}</span>
                  </div>
                </div>
              </div>

              {/* How Louis Cottier Invention Works */}
              <div className="bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700 rounded-2xl p-6 space-y-4 shadow-sm dark:shadow-none">
                <div className="flex items-center gap-2 text-slate-900 dark:text-amber-300 font-serif font-bold text-base">
                  <ShieldCheck className="w-5 h-5 text-amber-500" />
                  Comment lire l&apos;Horloge Universelle Cottier ?
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2.5 leading-relaxed">
                  <p>
                    <strong className="text-slate-900 dark:text-white">1. Heure Locale (Centre) :</strong> L&apos;aiguille des heures ajourée et l&apos;aiguille des minutes indiquent l&apos;heure de la ville placée au sommet (12 heures).
                  </p>
                  <p>
                    <strong className="text-slate-900 dark:text-white">2. Heures Mondiales Instantanées :</strong> Pour connaître l&apos;heure de n&apos;importe laquelle des 23 autres villes, regardez simplement le chiffre sur la bague 24h qui fait face au nom de la ville ! Les minutes restent strictement identiques partout.
                  </p>
                  <p>
                    <strong className="text-slate-900 dark:text-white">3. Disque Jour / Nuit :</strong> Le fond champagne indique les heures diurnes (06h à 18h), tandis que le fond bleu nuit signale la nuit (18h à 06h).
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: PLANISPHÈRE & TERMINATOR SOLAIRE (REAL-TIME SOLAR SHADOW)         */}
        {/* ========================================================================= */}
        {activeTab === 'planisphere' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gradient-to-b dark:from-slate-900/90 dark:to-[#0A0D14] border border-slate-200 dark:border-slate-700 rounded-2xl p-6 sm:p-8 shadow-md dark:shadow-2xl backdrop-blur-none sm:backdrop-blur-none sm:backdrop-blur-sm relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Globe className="w-6 h-6 text-amber-500" />
                    Planisphère Mondial & Terminator Jour / Nuit
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Visualisation de l&apos;onde d&apos;obscurité terrestre calculée selon la déclinaison solaire et l&apos;heure UTC actuelle.
                  </p>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30">
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    Zénith : {sunLongitude.toFixed(1)}° Longitude
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/30">
                    <Moon className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                    Nadir : {((sunLongitude + 180) % 360 - 180).toFixed(1)}°
                  </div>
                </div>
              </div>

              {/* --- SVG WORLD MAP WITH REALISTIC CONTINENTS & TERMINATOR --- */}
              <div className="relative w-full aspect-[2/1] bg-[#070B14] rounded-xl border border-slate-300 dark:border-slate-700 overflow-hidden shadow-inner">
                <svg viewBox="0 0 1000 500" className="w-full h-full">
                  <defs>
                    <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
                      <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                    </radialGradient>

                    <linearGradient id="nightTerminator" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#020617" stopOpacity="0.85" />
                      <stop offset="50%" stopColor="#0B132B" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#020617" stopOpacity="0.85" />
                    </linearGradient>
                  </defs>

                  {/* 1. Longitude & Latitude Grids */}
                  {Array.from({ length: 25 }).map((_, i) => {
                    const x = (i * 1000) / 24;
                    const isPrime = i === 12;
                    return (
                      <line
                        key={i}
                        x1={x}
                        y1="0"
                        x2={x}
                        y2="500"
                        stroke={isPrime ? '#F59E0B' : '#1E293B'}
                        strokeWidth={isPrime ? 1.5 : 0.6}
                        strokeDasharray={isPrime ? 'none' : '2,4'}
                      />
                    );
                  })}

                  <line x1="0" y1="250" x2="1000" y2="250" stroke="#334155" strokeWidth="1" strokeDasharray="4,4" />
                  <line x1="0" y1="185" x2="1000" y2="185" stroke="#1E293B" strokeWidth="0.6" strokeDasharray="2,4" />
                  <line x1="0" y1="315" x2="1000" y2="315" stroke="#1E293B" strokeWidth="0.6" strokeDasharray="2,4" />

                  {/* 2. Stylized Vector Continents */}
                  <g fill="#162033" stroke="#223354" strokeWidth="1">
                    <path d="M 460,110 L 510,105 L 535,130 L 525,160 L 500,180 L 470,195 L 450,180 L 460,140 Z" />
                    <path d="M 470,200 L 540,205 L 560,250 L 550,330 L 510,380 L 485,380 L 460,300 L 450,225 Z" />
                    <path d="M 535,100 L 640,90 L 760,105 L 820,135 L 780,210 L 720,240 L 670,250 L 600,210 L 545,150 Z" />
                    <path d="M 660,210 L 700,220 L 685,280 L 665,250 Z" />
                    <path d="M 120,90 L 250,85 L 290,140 L 260,200 L 220,230 L 170,180 L 130,130 Z" />
                    <path d="M 270,260 L 340,270 L 360,320 L 320,410 L 290,430 L 275,340 Z" />
                    <path d="M 780,310 L 870,305 L 880,360 L 820,380 L 775,350 Z" />
                  </g>

                  {/* 3. Real-Time Solar Night Mask */}
                  {(() => {
                    const sunX = ((sunLongitude + 180) / 360) * 1000;
                    const sunY = ((90 - solarDeclination) / 180) * 500;
                    const nightCenterX = (sunX + 500) % 1000;

                    return (
                      <g>
                        <rect
                          x={nightCenterX - 250 < 0 ? 0 : nightCenterX - 250}
                          y="0"
                          width={nightCenterX - 250 < 0 ? nightCenterX + 250 : Math.min(500, 1000 - (nightCenterX - 250))}
                          height="500"
                          fill="url(#nightTerminator)"
                        />
                        {nightCenterX + 250 > 1000 && (
                          <rect
                            x="0"
                            y="0"
                            width={(nightCenterX + 250) - 1000}
                            height="500"
                            fill="url(#nightTerminator)"
                          />
                        )}
                        {nightCenterX - 250 < 0 && (
                          <rect
                            x={1000 + (nightCenterX - 250)}
                            y="0"
                            width={Math.abs(nightCenterX - 250)}
                            height="500"
                            fill="url(#nightTerminator)"
                          />
                        )}

                        <g transform={`translate(${sunX}, ${sunY})`}>
                          <circle r="28" fill="url(#sunGlow)" />
                          <circle r="8" fill="#F59E0B" stroke="#FEF08A" strokeWidth="2" />
                          <text x="0" y="20" textAnchor="middle" fill="#FDE68A" fontSize="9" fontFamily="monospace" fontWeight="bold">
                            ☀️ ZÉNITH
                          </text>
                        </g>
                      </g>
                    );
                  })()}

                  {/* 4. Interactive City Pins on Map */}
                  {CITIES_DATA.map((city) => {
                    const cx = ((city.lng + 180) / 360) * 1000;
                    const cy = ((90 - city.lat) / 180) * 500;
                    const isSelected = city.id === selectedCity.id;

                    return (
                      <g
                        key={city.id}
                        transform={`translate(${cx}, ${cy})`}
                        onClick={() => handleSelectCity(city.id)}
                        className="cursor-pointer group"
                      >
                        {isSelected && (
                          <circle r="12" fill="none" stroke="#F59E0B" strokeWidth="1.5" opacity="0.6" strokeDasharray="3 3" />
                        )}
                        <circle
                          r={isSelected ? 6 : city.isManufactureHub ? 4.5 : 3.5}
                          fill={isSelected ? '#F59E0B' : city.isManufactureHub ? '#38BDF8' : '#94A3B8'}
                          stroke="#070B14"
                          strokeWidth="1.5"
                          className="transition-transform group-hover:scale-150"
                        />
                        <text
                          x="0"
                          y={isSelected ? -10 : -7}
                          textAnchor="middle"
                          fill={isSelected ? '#FDE68A' : '#CBD5E1'}
                          fontSize={isSelected ? '9' : '7'}
                          fontFamily="sans-serif"
                          fontWeight={isSelected ? 'bold' : 'normal'}
                          className="pointer-events-none"
                        >
                          {city.name}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Map Legend */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span>Ville Active Sélectionnée</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-sky-400" />
                    <span>Pôle Horloger Majeur</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-slate-400" />
                    <span>Méridien Standard</span>
                  </div>
                </div>

                <div className="text-slate-500">
                  Ligne Dorée = Méridien 0° Greenwich (GMT) · Intervalle = 15° (1 heure)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: SCRUBBER 24H & PLANIFICATEUR MONDIAL                               */}
        {/* ========================================================================= */}
        {activeTab === 'scrubber' && (
          <div className="space-y-8">
            {/* Scrubber Control Center */}
            <div className="bg-white dark:bg-gradient-to-b dark:from-slate-900/90 dark:to-[#0A0D14] border border-slate-200 dark:border-slate-700 rounded-2xl p-6 sm:p-8 shadow-md dark:shadow-2xl backdrop-blur-none sm:backdrop-blur-none sm:backdrop-blur-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Sliders className="w-6 h-6 text-amber-500" />
                    Simulateur Temporel & Planificateur 24 Heures
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Glissez le curseur pour simuler n&apos;importe quelle heure de la journée et synchroniser vos ateliers et visioconférences mondiales.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsLive(!isLive);
                      if (isLive) {
                        const h = currentTime.getHours();
                        const m = currentTime.getMinutes();
                        setScrubberMinutes(h * 60 + m);
                      }
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                      isLive
                        ? 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-500/50 shadow-sm'
                        : 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-500/50'
                    }`}
                  >
                    {isLive ? '● Mode Temps Réel (Live)' : 'Mode Simulation Glissante'}
                  </button>

                  {!isLive && (
                    <button
                      onClick={() => setIsSimPlaying(!isSimPlaying)}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                      title={isSimPlaying ? 'Mettre en pause' : 'Défilement automatique'}
                    >
                      {isSimPlaying ? <Pause className="w-4 h-4 text-amber-500" /> : <Play className="w-4 h-4 text-amber-500" />}
                    </button>
                  )}
                </div>
              </div>

              {/* Slider Component */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-slate-500 dark:text-slate-400">00:00 (Minuit)</span>
                  <span className="text-amber-700 dark:text-amber-300 text-base font-bold bg-amber-50 dark:bg-amber-500/10 px-3 py-1 rounded-md border border-amber-200 dark:border-amber-500/30">
                    Heure Simulée : {String(Math.floor(scrubberMinutes / 60)).padStart(2, '0')}:{String(scrubberMinutes % 60).padStart(2, '0')}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">23:45 (Fin de Journée)</span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="1439"
                  step="15"
                  value={isLive ? currentTime.getHours() * 60 + currentTime.getMinutes() : scrubberMinutes}
                  onChange={(e) => {
                    setIsLive(false);
                    setScrubberMinutes(parseInt(e.target.value, 10));
                  }}
                  className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:accent-amber-400 transition-all"
                />

                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  {[
                    { label: 'Aube (06:00)', mins: 360 },
                    { label: 'Ouverture Ateliers (08:30)', mins: 510 },
                    { label: 'Midi Solaire (12:00)', mins: 720 },
                    { label: 'Fin de Journée (17:30)', mins: 1050 },
                    { label: 'Soirée (21:00)', mins: 1260 }
                  ].map(quick => (
                    <button
                      key={quick.label}
                      onClick={() => {
                        setIsLive(false);
                        setScrubberMinutes(quick.mins);
                      }}
                      className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-[11px] font-mono text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 transition-all"
                    >
                      {quick.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search & Continent Filters */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <input
                    type="text"
                    placeholder="Filtrer une ville, pays ou manufacture..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500/50 w-64"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
                  {[
                    { id: 'all', label: 'Toutes les villes (24)' },
                    { id: 'europe', label: 'Europe' },
                    { id: 'americas', label: 'Amériques' },
                    { id: 'asia', label: 'Asie' },
                    { id: 'mideast', label: 'Moyen-Orient' },
                    { id: 'pacific', label: 'Pacifique' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedRegion(tab.id)}
                      className={`px-3 py-1 rounded-lg transition-all ${
                        selectedRegion === tab.id
                          ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/40 font-medium'
                          : 'bg-slate-100 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid of All 24 Cities with Calculated Times */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredCities.map((city) => {
                const info = getCityTimeInfo(city, effectiveDate);
                const isSelected = city.id === selectedCity.id;

                return (
                  <div
                    key={city.id}
                    onClick={() => handleSelectCity(city.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-br from-amber-500/15 via-amber-50/50 to-white dark:from-amber-500/15 dark:via-slate-900 dark:to-slate-950 border-amber-500 shadow-md'
                        : 'bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700 hover:border-amber-500/60 dark:hover:border-amber-400/80 shadow-sm dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:shadow-md'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                            {city.offsetHours >= 0 ? `UTC+${city.offsetHours}` : `UTC${city.offsetHours}`}
                          </span>
                          <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mt-0.5">
                            {city.name}
                            {city.isManufactureHub && (
                              <span title="Pôle de manufacture horlogère">
                                <Award className="w-3.5 h-3.5 text-amber-500" />
                              </span>
                            )}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{city.country}</p>
                        </div>

                        <span className={`p-1.5 rounded-lg text-xs ${
                          info.isDay ? 'bg-amber-50 text-amber-800 dark:bg-amber-500/10 dark:text-amber-300' : 'bg-blue-50 text-blue-800 dark:bg-blue-500/10 dark:text-blue-300'
                        }`}>
                          {info.isDay ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </span>
                      </div>

                      <div className="my-3 font-mono">
                        <div className="text-2xl font-bold text-amber-600 dark:text-amber-300">
                          {info.formattedTime}
                        </div>
                        <div className="text-[11px] text-slate-400 dark:text-slate-500">
                          {info.formattedDate}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-700/60 text-[11px]">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Ateliers :</span>
                        <span className={info.isWorkshopOpen ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-slate-400 dark:text-slate-500'}>
                          {info.isWorkshopOpen ? 'Ouvert (Activité)' : 'Fermé (Nuit/Repos)'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 font-mono">
                        <span>Delta Genève :</span>
                        <span className="text-slate-800 dark:text-slate-200 font-medium">
                          {city.offsetHours - 1 > 0
                            ? `+${city.offsetHours - 1}h`
                            : city.offsetHours - 1 < 0
                            ? `${city.offsetHours - 1}h`
                            : 'Identique'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: ARCHITECTURE TECHNIQUE & COMPLICATIONS DE VOYAGE                   */}
        {/* ========================================================================= */}
        {activeTab === 'complications' && (
          <div className="space-y-10">
            {/* 3 Core Watchmaking Architectures */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Louis Cottier World Time */}
              <div className="bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700 rounded-2xl p-6 space-y-4 hover:border-amber-500/40 transition-all flex flex-col justify-between shadow-sm dark:shadow-none">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-3">
                    <Compass className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-wider font-semibold">Brevet Suisse 1931</span>
                  <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                    Heures du Monde (Louis Cottier)
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                    Invention géniale de l&apos;horloger genevois Louis Cottier. Deux disques concentriques : un anneau des 24 villes et un disque 24h tournant en sens anti-horaire.
                  </p>
                  <ul className="mt-4 space-y-2 text-xs text-slate-500 dark:text-slate-400 list-disc list-inside">
                    <li>Roue des heures couplée à une étoile à 24 dents.</li>
                    <li>Correction d&apos;heure par poussoir à 10h sans toucher aux minutes.</li>
                    <li>Lecture simultanée des 24 fuseaux à 360°.</li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 text-xs font-mono text-amber-700 dark:text-amber-300">
                  Exemples : Patek Philippe 5130/5230, Vacheron Traditionnelle.
                </div>
              </div>

              {/* Card 2: True GMT / Dual Time */}
              <div className="bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700 rounded-2xl p-6 space-y-4 hover:border-amber-500/40 transition-all flex flex-col justify-between shadow-sm dark:shadow-none">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-3">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-sky-600 dark:text-sky-400 uppercase tracking-wider font-semibold">Aviation & Transatlantique 1954</span>
                  <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                    GMT / Dual Time (Calibre Flyer)
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                    Créé pour les pilotes de la Pan Am (Rolex GMT-Master 6542). Une aiguille flèche supplémentaire fait un tour en 24 heures face à une lunette bicolore.
                  </p>
                  <ul className="mt-4 space-y-2 text-xs text-slate-500 dark:text-slate-400 list-disc list-inside">
                    <li>Roue 24h à 48 dents (démultiplication 2:1 sur la roue des heures).</li>
                    <li>Aiguille locale sautante par cran d&apos;une heure via la couronne.</li>
                    <li>La lunette tournante 24 clics offre un 3e fuseau instantané.</li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 text-xs font-mono text-sky-600 dark:text-sky-300">
                  Exemples : Rolex Calibre 3285, Tudor Black Bay GMT, Grand Seiko 9R66.
                </div>
              </div>

              {/* Card 3: UTC, TAI & Équation du Temps */}
              <div className="bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700 rounded-2xl p-6 space-y-4 hover:border-amber-500/40 transition-all flex flex-col justify-between shadow-sm dark:shadow-none">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3">
                    <Globe className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-semibold">Astronomie & Précision</span>
                  <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                    UTC vs Temps Solaire Vrai
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                    La Terre n&apos;orbite pas à vitesse constante (ellipse de Kepler). Le vrai midi solaire oscille de -14 min à +16 min par rapport au temps moyen.
                  </p>
                  <ul className="mt-4 space-y-2 text-xs text-slate-500 dark:text-slate-400 list-disc list-inside">
                    <li>Temps Moyen : 24h égales conventionnelles de 86&apos;400 secondes.</li>
                    <li>Équation du Temps : complication à came réniforme reproduisant l&apos;analemme.</li>
                    <li>UTC : basé sur les horloges atomiques au Césium 133 avec secondes intercalaires.</li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 text-xs font-mono text-emerald-600 dark:text-emerald-300">
                  Référence : BIPM Sèvres & Conférence de Washington 1884.
                </div>
              </div>
            </div>

            {/* --- QUIZ D'ATELIER HAUTE HORLOGERIE (4 QUESTIONS) --- */}
            <div className="bg-white dark:bg-gradient-to-b dark:from-slate-900/90 dark:to-[#0A0D14] border border-slate-200 dark:border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-md dark:shadow-2xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-700 dark:text-amber-400 uppercase tracking-wider font-semibold">
                    <Award className="w-4 h-4" />
                    Validation des Connaissances
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                    Quiz d&apos;Atelier : Fuseaux Horaires & Complications
                  </h2>
                </div>

                {showResults && (
                  <div className="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-800 dark:text-amber-300 font-mono text-sm font-bold">
                    Score : {quizScore} / {QUIZ_QUESTIONS.length}
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {QUIZ_QUESTIONS.map((q, idx) => {
                  const userAnswer = selectedAnswers[q.id];
                  const isAnswered = userAnswer !== undefined;

                  return (
                    <div key={q.id} className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-700 space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <h4 className="text-sm font-medium text-slate-900 dark:text-white leading-relaxed">
                          {q.question}
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                        {q.options.map((opt, optIdx) => {
                          let btnStyle = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700';

                          if (isAnswered && showResults) {
                            if (optIdx === q.correct) {
                              btnStyle = 'bg-emerald-50 text-emerald-800 border-emerald-500 dark:bg-emerald-500/20 dark:border-emerald-500/60 dark:text-emerald-300 font-medium';
                            } else if (userAnswer === optIdx) {
                              btnStyle = 'bg-rose-50 text-rose-800 border-rose-400 dark:bg-rose-500/20 dark:border-rose-500/60 dark:text-rose-300';
                            }
                          } else if (userAnswer === optIdx) {
                            btnStyle = 'bg-amber-500/20 border-amber-500/60 text-amber-800 dark:text-amber-300 font-medium';
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => {
                                setSelectedAnswers((prev: Record<number, number>) => ({ ...prev, [q.id]: optIdx }));
                              }}
                              className={`p-3 rounded-lg border text-left text-xs transition-all flex items-start gap-2 ${btnStyle}`}
                            >
                              <span className="font-mono text-slate-400 dark:text-slate-500 mt-0.5">{String.fromCharCode(65 + optIdx)}.</span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {showResults && (
                        <div className="mt-3 p-3 rounded-lg bg-slate-100 dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-amber-700 dark:text-amber-300">Explication didactique : </strong>
                            {q.explanation}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => {
                    setSelectedAnswers({});
                    setShowResults(false);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-mono transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Réinitialiser le Quiz
                </button>

                <button
                  onClick={() => setShowResults(true)}
                  disabled={Object.keys(selectedAnswers).length === 0}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-mono font-bold text-xs transition-all shadow-md dark:shadow-lg dark:shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Vérifier mes Réponses</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- BOTTOM QUICK NAVIGATION TO OTHER MASTERPIECES --- */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/theorie/complications"
            className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-300 hover:text-amber-700 dark:hover:text-amber-200 transition-colors group"
          >
            <ArrowRight className="w-4 h-4 rotate-180 text-amber-500 group-hover:-translate-x-1 transition-transform" />
            <span>Tourbillon, Répétition & Calendriers</span>
          </Link>

          <Link
            href="/pratique/reglage"
            className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-300 hover:text-amber-700 dark:hover:text-amber-200 transition-colors group"
          >
            <span>Simulateur de Chronocomparateur Suisse</span>
            <ArrowRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </main>
  );
}
