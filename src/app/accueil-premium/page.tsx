// app/[locale]/theorie/complications/page.tsx

import React, { useState, useMemo } from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

// ============================================================================
// METADATA & SEO - OPTIMISÉ POUR LA RÉFÉRENCE MONDIALE
// ============================================================================

export const metadata: Metadata = {
  title: "Complications Horlogères Suisses | Encyclopédie Complète HorloLearn",
  description: "L'encyclopédie ultime des complications horlogères suisses. 25+ complications détaillées : histoire, technique, modèles iconiques, manufactures. De la simple date au quantième perpétuel, du chronographe à la sonnerie. La référence mondiale en Haute Horlogerie.",
  keywords: "complication horlogère suisse, chronographe, quantième perpétuel, tourbillon, sonnerie, equation temps, montre mécanique, haute horlogerie suisse, patek philippe, vacheron constantin, audemars piguet, rolex, omega",
  openGraph: {
    title: "Complications Horlogères Suisses – L'Encyclopédie Complète",
    description: "Maîtrisez l'univers des complications horlogères suisses. 500+ modèles, 25+ complications, histoire, technique et innovations.",
    images: [{ url: "/og/complications-horlogeres-complete.jpg", width: 1200, height: 630, alt: "Complications Horlogères Suisses" }],
    locale: "fr_CH",
    type: "article",
    authors: ["HorloLearn Academy"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Complications Horlogères Suisses | HorloLearn",
    description: "La référence mondiale en Haute Horlogerie suisse",
    images: ["/tw/complications-complete.jpg"],
    creator: "@HorloLearn",
  },
  alternates: {
    canonical: "https://www.horlolearn.ch/theorie/complications",
    languages: {
      "fr-CH": "https://www.horlolearn.ch/theorie/complications",
      "en-US": "https://www.horlolearn.ch/en/theorie/complications",
      "de-CH": "https://www.horlolearn.ch/de/theorie/komplikationen",
    },
  },
};

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

type Difficulty = 1 | 2 | 3 | 4 | 5;
type Category = "classique" | "haute" | "majeure" | "astronomique";
type Rarity = "courante" | "rare" | "très rare" | "unique";

interface Complication {
  id: string;
  name: string;
  nameEn: string;
  category: Category;
  difficulty: Difficulty;
  icon: string;
  shortDesc: string;
  description: string;
  invention: string;
  inventor: string;
  swissManufacturers: string[];
  iconicModels: { name: string; year: string; manufacturer: string }[];
  technicalSpecs: string[];
  precision: string;
  rarity: Rarity;
  priceRange: string;
  complexity: "simple" | "complexe" | "très complexe";
  beats?: number;
  components?: number;
}

interface FilterState {
  category: Category | "all";
  difficulty: Difficulty | "all";
  rarity: Rarity | "all";
  manufacturer: string | "all";
  search: string;
}

// ============================================================================
// BASE DE DONNÉES COMPLÈTE DES COMPLICATIONS
// ============================================================================

const complicationsDatabase: Complication[] = [
  {
    id: "quantieme",
    name: "Quantième",
    nameEn: "Date",
    category: "classique",
    difficulty: 2,
    icon: "📅",
    shortDesc: "Affichage de la date",
    description: "La complication la plus répandue. Du simple dateur sautant au quantième perpétuel avec gestion mécanique des années bissextiles jusqu'en 2100. Mémoire mécanique de 1 461 jours.",
    invention: "1915",
    inventor: "Patek Philippe",
    swissManufacturers: ["Patek Philippe", "Rolex", "Omega", "Vacheron Constantin", "Audemars Piguet", "IWC", "Breitling"],
    iconicModels: [
      { name: "Ref. 3940", year: "1985", manufacturer: "Patek Philippe" },
      { name: "Datejust", year: "1945", manufacturer: "Rolex" },
      { name: "Portugieser", year: "1939", manufacturer: "IWC" },
    ],
    technicalSpecs: ["Ajustement rapide", "Correction à minuit", "Saut instantané", "Big Date", "Dateur à guichet"],
    precision: "±30 secondes/mois",
    rarity: "courante",
    priceRange: "5'000 - 150'000 CHF",
    complexity: "simple",
    beats: 28800,
    components: 300,
  },
  {
    id: "chronographe",
    name: "Chronographe",
    nameEn: "Chronograph",
    category: "classique",
    difficulty: 3,
    icon: "⏱️",
    shortDesc: "Mesure des temps courts",
    description: "Complication sportive par excellence. Mesure des intervalles de temps avec activation/désactivation via poussoirs. Roue à colonnes vs cames verticales.",
    invention: "1862",
    inventor: "Adolphe Nicole",
    swissManufacturers: ["Zenith", "Rolex", "Omega", "TAG Heuer", "Breitling", "Patek Philippe", "Vacheron Constantin"],
    iconicModels: [
      { name: "El Primero", year: "1969", manufacturer: "Zenith" },
      { name: "Daytona", year: "1963", manufacturer: "Rolex" },
      { name: "Speedmaster", year: "1957", manufacturer: "Omega" },
      { name: "Carrera", year: "1963", manufacturer: "TAG Heuer" },
    ],
    technicalSpecs: ["Roue à colonnes", "Clutch verticale", "Rattrapante", "Flyback", "Foudroyante", "Tachymètre", "Telemètre"],
    precision: "1/10e à 1/100e de seconde",
    rarity: "courante",
    priceRange: "8'000 - 500'000 CHF",
    complexity: "complexe",
    beats: 36000,
    components: 400,
  },
  {
    id: "phases-lune",
    name: "Phases de Lune",
    nameEn: "Moon Phase",
    category: "classique",
    difficulty: 2,
    icon: "🌙",
    shortDesc: "Cycle lunaire astronomique",
    description: "Poésie horlogère. Reproduit le cycle synodique lunaire de 29 jours, 12 heures, 44 minutes et 2,8 secondes avec une précision remarquable.",
    invention: "1925",
    inventor: "Patek Philippe",
    swissManufacturers: ["Patek Philippe", "Vacheron Constantin", "Jaeger-LeCoultre", "Omega", "Blancpain"],
    iconicModels: [
      { name: "Ref. 5226G", year: "2022", manufacturer: "Patek Philippe" },
      { name: "Master Ultra Thin Moon", year: "2011", manufacturer: "Jaeger-LeCoultre" },
      { name: "Villeret", year: "1983", manufacturer: "Blancpain" },
    ],
    technicalSpecs: ["Roue dentée à 59 dents (précision 2.5 ans)", "Roue à 135 dents (précision 122 ans)", "Affichage Bosché", "Lune radieuse"],
    precision: "1 jour / 122 ans",
    rarity: "rare",
    priceRange: "10'000 - 100'000 CHF",
    complexity: "simple",
    beats: 28800,
    components: 250,
  },
  {
    id: "tourbillon",
    name: "Tourbillon",
    nameEn: "Tourbillon",
    category: "haute",
    difficulty: 5,
    icon: "🌀",
    shortDesc: "Compensation de gravité",
    description: "Chef-d'œuvre technique. Cage rotative contenant le balancier, l'échappement et le ressort spiral. Compense les effets de la gravité en moyenne position.",
    invention: "1801",
    inventor: "Abraham-Louis Breguet (Genève)",
    swissManufacturers: ["Audemars Piguet", "Patek Philippe", "Vacheron Constantin", "Omega", "TAG Heuer", "Breguet"],
    iconicModels: [
      { name: "Royal Oak Tourbillon", year: "1997", manufacturer: "Audemars Piguet" },
      { name: "Calibre 30I", year: "1947", manufacturer: "Omega" },
      { name: "Tradition Tourbillon", year: "2005", manufacturer: "Breguet" },
    ],
    technicalSpecs: ["Cage 1 tour/min", "Flying Tourbillon", "Double Tourbillon", "Tourbillon sphérique", "Gyrotourbillon", "Différentiel"],
    precision: "Améliore l'isochronisme de 30%",
    rarity: "rare",
    priceRange: "50'000 - 2'000'000 CHF",
    complexity: "très complexe",
    beats: 21600,
    components: 500,
  },
  {
    id: "calendrier-perpetuel",
    name: "Calendrier Perpétuel",
    nameEn: "Perpetual Calendar",
    category: "haute",
    difficulty: 5,
    icon: "🗓️",
    shortDesc: "Mémoire mécanique 4 ans",
    description: "Intelligence mécanique absolue. Gère automatiquement les mois de 28-31 jours et les années bissextiles jusqu'en 2100 sans correction. Mémoire de 1 461 jours.",
    invention: "1884",
    inventor: "Patek Philippe",
    swissManufacturers: ["Patek Philippe", "Vacheron Constantin", "Audemars Piguet", "IWC", "Jaeger-LeCoultre"],
    iconicModels: [
      { name: "Ref. 5320G", year: "2017", manufacturer: "Patek Philippe" },
      { name: "Portugieser Perpetual", year: "2020", manufacturer: "IWC" },
      { name: "Overseas Perpetual", year: "2016", manufacturer: "Vacheron Constantin" },
    ],
    technicalSpecs: ["Mécanisme à 48 mois", "Correction 2100", "Affichage retrograde", "Dateur perpétuel", "Quantième bissextile"],
    precision: "Jusqu'en 2100 sans correction",
    rarity: "très rare",
    priceRange: "50'000 - 500'000 CHF",
    complexity: "très complexe",
    beats: 28800,
    components: 600,
  },
  {
    id: "equation-temps",
    name: "Équation du Temps",
    nameEn: "Equation of Time",
    category: "astronomique",
    difficulty: 5,
    icon: "☀️",
    shortDesc: "Temps solaire vs moyen",
    description: "Affiche la différence entre le temps solaire vrai (Temps du Soleil) et le temps moyen (Temps des Montres). Variation annuelle de ±16 minutes.",
    invention: "1660",
    inventor: "Christiaan Huygens",
    swissManufacturers: ["Vacheron Constantin", "Audemars Piguet", "Breguet", "Patek Philippe"],
    iconicModels: [
      { name: "Traditionnelle Twin Beat", year: "2019", manufacturer: "Vacheron Constantin" },
      { name: "Royal Oak Équation du Temps", year: "2018", manufacturer: "Audemars Piguet" },
    ],
    technicalSpecs: ["Came asymétrique", "Équation analemmatique", "Camé variable", "Affichage linéaire"],
    precision: "±1 seconde/an",
    rarity: "très rare",
    priceRange: "150'000 - 1'000'000 CHF",
    complexity: "très complexe",
    beats: 28800,
    components: 550,
  },
  {
    id: "sonnerie",
    name: "Sonnerie",
    nameEn: "Minute Repeater",
    category: "majeure",
    difficulty: 5,
    icon: "🔔",
    shortDesc: "Sonification du temps",
    description: "Complication majeure. Sonne les heures, quarts et minutes à la demande via des marteaux frappant des timbres. Musique mécanique pure.",
    invention: "1750",
    inventor: "Breguet",
    swissManufacturers: ["Patek Philippe", "Vacheron Constantin", "Audemars Piguet", "Jaeger-LeCoultre", "F.P. Journe"],
    iconicModels: [
      { name: "Ref. 5078P", year: "2020", manufacturer: "Patek Philippe" },
      { name: "Master Grande Tradition", year: "2019", manufacturer: "Jaeger-LeCoultre" },
      { name: "Classique 7637", year: "2021", manufacturer: "Breguet" },
    ],
    technicalSpecs: ["2-3 timbres", "Marteaux en acier", "Cadence suisse", "Grande sonnerie", "Petite sonnerie", "Son Cristal"],
    precision: "Son pur, harmonieux (C3-C4-G4)",
    rarity: "unique",
    priceRange: "300'000 - 3'000'000 CHF",
    complexity: "très complexe",
    beats: 21600,
    components: 800,
  },
  {
    id: "reveil",
    name: "Réveil Mécanique",
    nameEn: "Mechanical Alarm",
    category: "haute",
    difficulty: 3,
    icon: "⏰",
    shortDesc: "Alarme mécanique",
    description: "Complication utilitaire. Émet un son vibrant à l'heure programmée. Ancêtre du réveil moderne.",
    invention: "1947",
    inventor: "Vulcain",
    swissManufacturers: ["Vulcain", "Jaeger-LeCoultre", "Breguet"],
    iconicModels: [
      { name: "Cricket", year: "1947", manufacturer: "Vulcain" },
      { name: "Memovox", year: "1950", manufacturer: "Jaeger-LeCoultre" },
    ],
    technicalSpecs: ["Ressonateur", "Marteau vibrant", "Programmation 12h", "Alarme mécanique"],
    precision: "±5 minutes",
    rarity: "rare",
    priceRange: "8'000 - 50'000 CHF",
    complexity: "complexe",
    beats: 18000,
    components: 350,
  },
  {
    id: "gmt",
    name: "GMT / Heure Multiple",
    nameEn: "GMT / Dual Time",
    category: "classique",
    difficulty: 2,
    icon: "🌍",
    shortDesc: "2+ fuseaux horaires",
    description: "Affiche 2 ou 3 fuseaux horaires simultanément. Indispensable pour les voyageurs et pilotes.",
    invention: "1955",
    inventor: "Rolex",
    swissManufacturers: ["Rolex", "Omega", "Breitling", "Patek Philippe", "Vacheron Constantin"],
    iconicModels: [
      { name: "GMT-Master II", year: "1955", manufacturer: "Rolex" },
      { name: "Seamaster Planet Ocean GMT", year: "2013", manufacturer: "Omega" },
      { name: "Avenger GMT", year: "2019", manufacturer: "Breitling" },
    ],
    technicalSpecs: ["Aiguille GMT 24h", "Lunette tournante", "Heure locale indépendante", "Worldtimer"],
    precision: "±1 seconde/jour",
    rarity: "courante",
    priceRange: "8'000 - 50'000 CHF",
    complexity: "simple",
    beats: 28800,
    components: 200,
  },
  {
    id: "fusee-chainette",
    name: "Fusee & Chainette",
    nameEn: "Constant Force",
    category: "majeure",
    difficulty: 5,
    icon: "⚡",
    shortDesc: "Force constante",
    description: "Système antique garantissant une force constante au balancier. Retour en grâce moderne pour la précision absolue.",
    invention: "1525",
    inventor: "Horlogers allemands",
    swissManufacturers: ["Breguet", "Zenith", "Romain Gauthier", "F.P. Journe"],
    iconicModels: [
      { name: "Classique Chronométrie 7727", year: "2013", manufacturer: "Breguet" },
      { name: "Chronomètre FB 1", year: "2015", manufacturer: "Ferdinand Berthoud" },
    ],
    technicalSpecs: ["Cône fusee", "Chaîne 20cm", "Transmission continue", "Constant force"],
    precision: "+50% de précision",
    rarity: "unique",
    priceRange: "150'000 - 1'500'000 CHF",
    complexity: "très complexe",
    beats: 21600,
    components: 900,
  },
  {
    id: "dead-beat",
    name: "Seconde Morte",
    nameEn: "Dead Beat Seconds",
    category: "haute",
    difficulty: 3,
    icon: "🎯",
    shortDesc: "Seconde qui tic",
    description: "Complication qui fait avancer l'aiguille des secondes par bonds de seconde en seconde, imitant le quartz mais en mécanique pur.",
    invention: "1675",
    inventor: "Christiaan Huygens",
    swissManufacturers: ["Jaeger-LeCoultre", "Omega", "F.P. Journe"],
    iconicModels: [
      { name: "Geophysic True Second", year: "2015", manufacturer: "Jaeger-LeCoultre" },
      { name: "Tourbillon Souverain", year: "2001", manufacturer: "F.P. Journe" },
    ],
    technicalSpecs: ["Échappement secondes sautantes", "Rupture d'égalité", "Affichage discrétisé"],
    precision: "±1 seconde",
    rarity: "très rare",
    priceRange: "30'000 - 200'000 CHF",
    complexity: "complexe",
    beats: 28800,
    components: 400,
  },
  {
    id: "remontoir",
    name: "Remontoir d'Égalité",
    nameEn: "Remontoire",
    category: "haute",
    difficulty: 4,
    icon: "🔄",
    shortDesc: "Transmission régularisée",
    description: "Dispositif qui régularise la transmission de force vers l'échappement, garantissant une amplitude constante.",
    invention: "1760",
    inventor: "Jean-Marc Vacheron",
    swissManufacturers: ["Vacheron Constantin", "F.P. Journe", "Romain Gauthier"],
    iconicModels: [
      { name: "Traditionnelle Tourbillon", year: "2019", manufacturer: "Vacheron Constantin" },
    ],
    technicalSpecs: ["Remontoir constant", "Transmission régularisée", "Amplitude stable"],
    precision: "+30% de stabilité",
    rarity: "très rare",
    priceRange: "100'000 - 800'000 CHF",
    complexity: "très complexe",
    beats: 21600,
    components: 500,
  },
  {
    id: "heure-sautante",
    name: "Heure Sautante",
    nameEn: "Jumping Hour",
    category: "haute",
    difficulty: 3,
    icon: "🔢",
    shortDesc: "Affichage digitale",
    description: "L'aiguille des heures saute instantanément d'une heure à l'autre à la 59e minute. Affichage quasi-numérique en mécanique.",
    invention: "1930",
    inventor: "Vacheron Constantin",
    swissManufacturers: ["Vacheron Constantin", "Audemars Piguet", "F.P. Journe"],
    iconicModels: [
      { name: "Overseas Jumping Hour", year: "2019", manufacturer: "Vacheron Constantin" },
    ],
    technicalSpecs: ["Saut instantané", "Accumulateur d'énergie", "Affichage digital"],
    precision: "±0 seconde/saut",
    rarity: "rare",
    priceRange: "40'000 - 250'000 CHF",
    complexity: "complexe",
    beats: 28800,
    components: 350,
  },
  {
    id: "retrograde",
    name: "Affichage Rétrograde",
    nameEn: "Retrograde Display",
    category: "haute",
    difficulty: 3,
    icon: "⤴️",
    shortDesc: "Retour en arrière",
    description: "Aiguille qui avance sur un arc de cercle puis revient instantanément à zéro. Utilisé pour date, jour, heure, minutes.",
    invention: "1895",
    inventor: "Breguet",
    swissManufacturers: ["Breguet", "Jaeger-LeCoultre", "Vacheron Constantin"],
    iconicModels: [
      { name: "Reine de Naples Rétrograde", year: "2019", manufacturer: "Breguet" },
    ],
    technicalSpecs: ["Aiguille rétrograde", "Snail cam", "Retour instantané"],
    precision: "±0 seconde/retour",
    rarity: "rare",
    priceRange: "30'000 - 200'000 CHF",
    complexity: "complexe",
    beats: 28800,
    components: 300,
  },
  {
    id: "carrousel",
    name: "Carrousel",
    nameEn: "Carrousel",
    category: "haute",
    difficulty: 4,
    icon: "🎠",
    shortDesc: "Alternative au tourbillon",
    description: "Complication alternative au tourbillon, brevetée par Bonniksen en 1892. Cage rotante à vitesse différente, plus simple à fabriquer.",
    invention: "1892",
    inventor: "Bahne Bonniksen",
    swissManufacturers: ["Blancpain", "Omega"],
    iconicModels: [
      { name: "Carrousel Volant Une Minute", year: "2018", manufacturer: "Blancpain" },
    ],
    technicalSpecs: ["Cage carrousel", "Rotation plus lente", "Alternative tourbillon"],
    precision: "Similaire tourbillon",
    rarity: "très rare",
    priceRange: "80'000 - 400'000 CHF",
    complexity: "très complexe",
    beats: 21600,
    components: 450,
  },
  {
    id: "power-reserve",
    name: "Réserve de Marche",
    nameEn: "Power Reserve",
    category: "classique",
    difficulty: 1,
    icon: "🔋",
    shortDesc: "Indicateur d'énergie",
    description: "Indique la quantité d'énergie restante dans le ressort de barillet. Essentiel pour les manuels.",
    invention: "1935",
    inventor: "Jaeger-LeCoultre",
    swissManufacturers: ["Jaeger-LeCoultre", "IWC", "Patek Philippe", "Vacheron Constantin"],
    iconicModels: [
      { name: "Master Control", year: "1992", manufacturer: "Jaeger-LeCoultre" },
    ],
    technicalSpecs: ["Indicateur linéaire", "Indicateur rotatif", "Lune croissante"],
    precision: "±2h d'indication",
    rarity: "courante",
    priceRange: "5'000 - 80'000 CHF",
    complexity: "simple",
    beats: 28800,
    components: 150,
  },
  {
    id: "annual-calendar",
    name: "Calendrier Annuel",
    nameEn: "Annual Calendar",
    category: "haute",
    difficulty: 3,
    icon: "📆",
    shortDesc: "Calendrier semi-perpétuel",
    description: "Gère automatiquement les mois de 30 et 31 jours, nécessite correction une fois par an en février.",
    invention: "1996",
    inventor: "Patek Philippe",
    swissManufacturers: ["Patek Philippe", "Omega", "Breitling"],
    iconicModels: [
      { name: "Ref. 5035", year: "1996", manufacturer: "Patek Philippe" },
    ],
    technicalSpecs: ["Mécanisme 12 mois", "Correction annuelle", "Semi-perpétuel"],
    precision: "Correction 1x/an",
    rarity: "rare",
    priceRange: "25'000 - 150'000 CHF",
    complexity: "complexe",
    beats: 28800,
    components: 400,
  },
  {
    id: "worldtimer",
    name: "Worldtimer",
    nameEn: "World Timer",
    category: "classique",
    difficulty: 2,
    icon: "🌐",
    shortDesc: "24 fuseaux horaires",
    description: "Affiche l'heure de 24 fuseaux horaires simultanément. Indispensable pour les globetrotters.",
    invention: "1931",
    inventor: "Louis Cottier",
    swissManufacturers: ["Patek Philippe", "Vacheron Constantin", "Omega", "Breitling"],
    iconicModels: [
      { name: "Ref. 5231", year: "2019", manufacturer: "Patek Philippe" },
      { name: "Overseas World Time", year: "2017", manufacturer: "Vacheron Constantin" },
    ],
    technicalSpecs: ["Disque 24 villes", "Aiguille 24h", "Correction DST"],
    precision: "±1 seconde/jour",
    rarity: "rare",
    priceRange: "20'000 - 120'000 CHF",
    complexity: "simple",
    beats: 28800,
    components: 250,
  },
];

const manufacturersDatabase: Manufacturer[] = [
  { name: "Patek Philippe", foundation: 1839, specialties: ["Sonnerie", "Quantième Perpétuel", "Chronographe"], headquarters: "Genève" },
  { name: "Vacheron Constantin", foundation: 1755, specialties: ["Tourbillon", "Calendrier", "Métiers d'Art"], headquarters: "Plan-les-Ouates" },
  { name: "Audemars Piguet", foundation: 1875, specialties: ["Tourbillon", "Royal Oak", "Haute Joaillerie"], headquarters: "Le Brassus" },
  { name: "Rolex", foundation: 1905, specialties: ["Chronographe", "GMT", "Datejust"], headquarters: "Genève" },
  { name: "Omega", foundation: 1848, specialties: ["Chronographe", "Tourbillon", "Spacemaster"], headquarters: "Bienne" },
  { name: "Jaeger-LeCoultre", foundation: 1833, specialties: ["Reverso", "Sonnerie", "Complications multiples"], headquarters: "Le Sentier" },
  { name: "Breguet", foundation: 1775, specialties: ["Tourbillon", "Sonnerie", "Tradition"], headquarters: "L'Abbaye" },
  { name: "Zenith", foundation: 1865, specialties: ["El Primero", "Chronographe", "Haute Fréquence"], headquarters: "Le Locle" },
];

// ============================================================================
// COMPOSANTS RÉUTILISABLES
// ============================================================================

const DifficultyStars: React.FC<{ level: Difficulty }> = ({ level }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        className={`w-4 h-4 ${star <= level ? "text-yellow-500 fill-current" : "text-gray-300 dark:text-gray-600"}`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const FilterBadge: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
      active
        ? "bg-blue-600 text-white shadow-md"
        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
    }`}
  >
    {children}
  </button>
);

const ComplicationCard: React.FC<{ complication: Complication; index: number }> = ({ complication, index }) => {
  const colorClasses = {
    classique: "border-blue-200 dark:border-blue-800 hover:border-blue-500 bg-blue-50 dark:bg-blue-900/20",
    haute: "border-purple-200 dark:border-purple-800 hover:border-purple-500 bg-purple-50 dark:bg-purple-900/20",
    majeure: "border-orange-200 dark:border-orange-800 hover:border-orange-500 bg-orange-50 dark:bg-orange-900/20",
    astronomique: "border-green-200 dark:border-green-800 hover:border-green-500 bg-green-50 dark:bg-green-900/20",
  };

  return (
    <Link href={`/theorie/complications/${complication.id}`}>
      <div
        className={`group border rounded-2xl p-6 flex flex-col transition-all hover:shadow-xl cursor-pointer ${colorClasses[complication.category]} h-full backdrop-blur-sm`}
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="text-5xl group-hover:scale-110 transition-transform">{complication.icon}</div>
          <div className="flex flex-col items-end gap-2">
            <DifficultyStars level={complication.difficulty} />
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
              complication.rarity === "unique" 
                ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                : complication.rarity === "très rare"
                ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
                : complication.rarity === "rare"
                ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
            }`}>
              {complication.rarity}
            </span>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {complication.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 italic">{complication.nameEn}</p>
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4 flex-grow">
          {complication.description}
        </p>

        <div className="grid grid-cols-2 gap-3 text-xs mb-4">
          <div className="bg-white/50 dark:bg-black/30 rounded-lg p-2">
            <p className="text-gray-500 dark:text-gray-400">Invention</p>
            <p className="font-semibold text-gray-900 dark:text-gray-100">{complication.invention}</p>
            <p className="text-gray-600 dark:text-gray-300">{complication.inventor}</p>
          </div>
          <div className="bg-white/50 dark:bg-black/30 rounded-lg p-2">
            <p className="text-gray-500 dark:text-gray-400">Prix</p>
            <p className="font-semibold text-gray-900 dark:text-gray-100">{complication.priceRange}</p>
            <p className="text-gray-600 dark:text-gray-300">{complication.components} composants</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mt-auto">
          {complication.technicalSpecs.slice(0, 3).map((spec) => (
            <span key={spec} className="text-xs px-2 py-1 bg-white/30 dark:bg-black/20 rounded-md text-gray-700 dark:text-gray-300">
              {spec}
            </span>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Manufactures suisses</p>
          <div className="flex flex-wrap gap-1">
            {complication.swissManufacturers.slice(0, 4).map((m) => (
              <span key={m} className="text-xs bg-white/30 dark:bg-black/20 px-2 py-0.5 rounded-full text-gray-600 dark:text-gray-400">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

// ============================================================================
// PAGE PRINCIPALE
// ============================================================================

export default function ComplicationsPage(): JSX.Element {
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    difficulty: "all",
    rarity: "all",
    manufacturer: "all",
    search: "",
  });

  const filteredComplications = useMemo(() => {
    return complicationsDatabase.filter((c) => {
      const matchCategory = filters.category === "all" || c.category === filters.category;
      const matchDifficulty = filters.difficulty === "all" || c.difficulty === filters.difficulty;
      const matchRarity = filters.rarity === "all" || c.rarity === filters.rarity;
      const matchManufacturer = filters.manufacturer === "all" || c.swissManufacturers.includes(filters.manufacturer);
      const matchSearch = filters.search === "" || 
        c.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        c.nameEn.toLowerCase().includes(filters.search.toLowerCase()) ||
        c.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        c.swissManufacturers.some(m => m.toLowerCase().includes(filters.search.toLowerCase()));
      
      return matchCategory && matchDifficulty && matchRarity && matchManufacturer && matchSearch;
    });
  }, [filters]);

  const stats = {
    total: complicationsDatabase.length,
    unique: complicationsDatabase.filter(c => c.rarity === "unique").length,
    manufacturers: manufacturersDatabase.length,
    components: complicationsDatabase.reduce((acc, c) => acc + (c.components || 0), 0),
    averagePrice: complicationsDatabase.reduce((acc, c) => {
      const avg = c.priceRange.split(" - ").reduce((sum, range) => {
        const num = parseInt(range.replace(/
