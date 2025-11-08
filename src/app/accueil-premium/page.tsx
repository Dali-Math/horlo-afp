// app/[locale]/theorie/complications/page.tsx

import React, { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

// ============================================================================
// METADATA & SEO
// ============================================================================

export const metadata: Metadata = {
  title: "Complications Horlogères Suisses | Guide Complet HorloLearn",
  description: "Encyclopédie des complications horlogères suisses. Chronographe, quantième perpétuel, tourbillon, sonnerie... Histoire, technique et modèles iconiques de la Haute Horlogerie.",
  keywords: "complication horlogère suisse, chronographe, quantième perpétuel, tourbillon, sonnerie, equation temps, montre mécanique, haute horlogerie suisse",
  openGraph: {
    title: "Complications Horlogères Suisses – La Référence",
    description: "Maîtrisez l'univers des complications horlogères suisses",
    images: ["/og/complications-horlogeres.jpg"],
    locale: "fr_CH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Complications Horlogères Suisses | HorloLearn",
    description: "La référence en Haute Horlogerie suisse",
    images: ["/tw/complications.jpg"],
  },
};

// ============================================================================
// TYPES & DATA
// ============================================================================

type Difficulty = 1 | 2 | 3 | 4 | 5;
type Category = "classique" | "haute" | "majeure";

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
  rarity: "courante" | "rare" | " très rare" | "unique";
  priceRange: string;
  complexity: "simple" | "complexe" | "très complexe";
}

interface Manufacturer {
  name: string;
  foundation: number;
  specialties: string[];
  headquarters: string;
}

const complicationsDatabase: Complication[] = [
  {
    id: "quantieme",
    name: "Quantième",
    nameEn: "Date",
    category: "classique",
    difficulty: 2,
    icon: "📅",
    shortDesc: "Affichage de la date",
    description: "La complication la plus répandue. Du simple dateur au quantième perpétuel avec gestion mécanique des années bissextiles.",
    invention: "1915",
    inventor: "Patek Philippe",
    swissManufacturers: ["Patek Philippe", "Rolex", "Omega", "Vacheron Constantin", "Audemars Piguet"],
    iconicModels: [
      { name: "Ref. 3940", year: "1985", manufacturer: "Patek Philippe" },
      { name: "Datejust", year: "1945", manufacturer: "Rolex" },
    ],
    technicalSpecs: ["Ajustement rapide", "Correction à minuit", "Saut instantané"],
    precision: "±30 secondes/mois",
    rarity: "courante",
    priceRange: "5'000 - 150'000 CHF",
    complexity: "simple",
  },
  {
    id: "chronographe",
    name: "Chronographe",
    nameEn: "Chronograph",
    category: "classique",
    difficulty: 3,
    icon: "⏱️",
    shortDesc: "Mesure des temps courts",
    description: "Complication sportive par excellence. Mesure des intervalles de temps avec activation/désactivation.",
    invention: "1862",
    inventor: "Adolphe Nicole",
    swissManufacturers: ["Zenith", "Rolex", "Omega", "TAG Heuer", "Breitling"],
    iconicModels: [
      { name: "El Primero", year: "1969", manufacturer: "Zenith" },
      { name: "Daytona", year: "1963", manufacturer: "Rolex" },
      { name: "Speedmaster", year: "1957", manufacturer: "Omega" },
    ],
    technicalSpecs: ["Roue à colonnes", "Clutch verticale", "Rattrapante", "Flyback"],
    precision: "1/10e à 1/100e de seconde",
    rarity: "courante",
    priceRange: "8'000 - 500'000 CHF",
    complexity: "complexe",
  },
  {
    id: "phases-lune",
    name: "Phases de Lune",
    nameEn: "Moon Phase",
    category: "classique",
    difficulty: 2,
    icon: "🌙",
    shortDesc: "Cycle lunaire astronomique",
    description: "Poésie horlogère. Reproduit le cycle lunaire de 29,5 jours avec une précision remarquable.",
    invention: "1925",
    inventor: "Patek Philippe",
    swissManufacturers: ["Patek Philippe", "Vacheron Constantin", "Jaeger-LeCoultre", "Omega"],
    iconicModels: [
      { name: "Ref. 5226", year: "2022", manufacturer: "Patek Philippe" },
      { name: "Master Ultra Thin Moon", year: "2011", manufacturer: "Jaeger-LeCoultre" },
    ],
    technicalSpecs: ["Roue dentée à 59 dents", "Précision 122 ans", "Affichage Bosché"],
    precision: "1 jour/122 ans",
    rarity: "rare",
    priceRange: "10'000 - 100'000 CHF",
    complexity: "simple",
  },
  {
    id: "tourbillon",
    name: "Tourbillon",
    nameEn: "Tourbillon",
    category: "haute",
    difficulty: 5,
    icon: "🌀",
    shortDesc: "Compensation de gravité",
    description: "Chef-d'œuvre technique. Cage rotative compensant les effets de la gravité sur le balancier.",
    invention: "1801",
    inventor: "Abraham-Louis Breguet",
    swissManufacturers: ["Audemars Piguet", "Patek Philippe", "Vacheron Constantin", "Omega", "TAG Heuer"],
    iconicModels: [
      { name: "Royal Oak Tourbillon", year: "1997", manufacturer: "Audemars Piguet" },
      { name: "Calibre 30I", year: "1947", manufacturer: "Omega" },
    ],
    technicalSpecs: ["Cage 1 tour/min", "Flying Tourbillon", "Multi-axes", "Gyrotourbillon"],
    precision: "Améliore l'isochronisme",
    rarity: "rare",
    priceRange: "50'000 - 2'000'000 CHF",
    complexity: "très complexe",
  },
  {
    id: "calendrier-perpetuel",
    name: "Calendrier Perpétuel",
    nameEn: "Perpetual Calendar",
    category: "haute",
    difficulty: 5,
    icon: "🗓️",
    shortDesc: "Mémoire mécanique 4 ans",
    description: "Intelligence mécanique. Gère automatiquement les mois de 28-31 jours et les années bissextiles jusqu'en 2100.",
    invention: "1884",
    inventor: "Patek Philippe",
    swissManufacturers: ["Patek Philippe", "Vacheron Constantin", "Audemars Piguet", "IWC"],
    iconicModels: [
      { name: "Ref. 5320G", year: "2017", manufacturer: "Patek Philippe" },
      { name: "Portugieser Perpetual", year: "2020", manufacturer: "IWC" },
    ],
    technicalSpecs: ["Mécanisme à 48 mois", "Correction 2100", "Affichage retrograde"],
    precision: "Jusqu'en 2100",
    rarity: " très rare",
    priceRange: "50'000 - 500'000 CHF",
    complexity: "très complexe",
  },
  {
    id: "equation-temps",
    name: "Équation du Temps",
    nameEn: "Equation of Time",
    category: "haute",
    difficulty: 5,
    icon: "☀️",
    shortDesc: "Temps solaire vs moyen",
    description: "Affiche la différence entre le temps solaire vrai et le temps moyen (±16 minutes/an).",
    invention: "1660",
    inventor: "Christiaan Huygens",
    swissManufacturers: ["Vacheron Constantin", "Audemars Piguet", "Breguet"],
    iconicModels: [
      { name: "Traditionnelle Twin Beat", year: "2019", manufacturer: "Vacheron Constantin" },
    ],
    technicalSpecs: ["Came asymétrique", "Équation analemmatique"],
    precision: "±1 seconde/an",
    rarity: " très rare",
    priceRange: "150'000 - 1'000'000 CHF",
    complexity: "très complexe",
  },
  {
    id: "sonnerie",
    name: "Sonnerie",
    nameEn: "Minute Repeater",
    category: "majeure",
    difficulty: 5,
    icon: "🔔",
    shortDesc: "Sonification du temps",
    description: "Complication majeure. Sonne les heures, quarts et minutes à la demande via des marteaux et timbres.",
    invention: "1750",
    inventor: "Breguet",
    swissManufacturers: ["Patek Philippe", "Vacheron Constantin", "Audemars Piguet", "Jaeger-LeCoultre"],
    iconicModels: [
      { name: "Ref. 5078", year: "2020", manufacturer: "Patek Philippe" },
      { name: "Master Grande Tradition", year: "2019", manufacturer: "Jaeger-LeCoultre" },
    ],
    technicalSpecs: ["2-3 timbres", "Marteaux en acier", "Cadence suisse", "Grande sonnerie"],
    precision: "Son harmonieux",
    rarity: "unique",
    priceRange: "300'000 - 3'000'000 CHF",
    complexity: "très complexe",
  },
  {
    id: "reveil",
    name: "Réveil Mécanique",
    nameEn: "Mechanical Alarm",
    category: "haute",
    difficulty: 3,
    icon: "⏰",
    shortDesc: "Alarme mécanique",
    description: "Complication utilitaire. Émet un son mécanique à l'heure programmée.",
    invention: "1947",
    inventor: "Vulcain",
    swissManufacturers: ["Vulcain", "Jaeger-LeCoultre"],
    iconicModels: [
      { name: "Cricket", year: "1947", manufacturer: "Vulcain" },
      { name: "Memovox", year: "1950", manufacturer: "Jaeger-LeCoultre" },
    ],
    technicalSpecs: ["Ressonateur", "Marteau vibrant", "Programmation 12h"],
    precision: "±5 minutes",
    rarity: "rare",
    priceRange: "8'000 - 50'000 CHF",
    complexity: "complexe",
  },
  {
    id: "gmt",
    name: "GMT / Heure Multiple",
    nameEn: "GMT / Dual Time",
    category: "classique",
    difficulty: 2,
    icon: "🌍",
    shortDesc: "2+ fuseaux horaires",
    description: "Affiche 2 ou 3 fuseaux horaires simultanément. Indispensable pour les voyageurs.",
    invention: "1955",
    inventor: "Rolex",
    swissManufacturers: ["Rolex", "Omega", "Breitling", "Patek Philippe"],
    iconicModels: [
      { name: "GMT-Master II", year: "1955", manufacturer: "Rolex" },
      { name: "Seamaster Planet Ocean GMT", year: "2013", manufacturer: "Omega" },
    ],
    technicalSpecs: ["Aiguille GMT 24h", "Lunette tournante", "Heure locale indépendante"],
    precision: "±1 seconde/jour",
    rarity: "courante",
    priceRange: "8'000 - 50'000 CHF",
    complexity: "simple",
  },
  {
    id: "fusee-chainette",
    name: "Fusee & Chainette",
    nameEn: "Constant Force",
    category: "majeure",
    difficulty: 5,
    icon: "⚡",
    shortDesc: "Force constante",
    description: "Système antique garantissant une force constante au balancier. Retour en grâce moderne.",
    invention: "1525",
    inventor: "Horlogers allemands",
    swissManufacturers: ["Breguet", "Zenith", "Romain Gauthier"],
    iconicModels: [
      { name: "Classique Chronométrie 7727", year: "2013", manufacturer: "Breguet" },
    ],
    technicalSpecs: ["Cône fusee", "Chaîne 20cm", "Transmission continue"],
    precision: "+50% de précision",
    rarity: "unique",
    priceRange: "150'000 - 1'500'000 CHF",
    complexity: "très complexe",
  },
  {
    id: "dead-beat",
    name: "Seconde Morte",
    nameEn: "Dead Beat Seconds",
    category: "haute",
    difficulty: 3,
    icon: "🎯",
    shortDesc: "Seconde qui tic",
