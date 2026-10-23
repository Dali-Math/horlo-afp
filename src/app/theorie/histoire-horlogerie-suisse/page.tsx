'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  MapPin,
  ChevronRight
} from 'lucide-react';

// =====================================================================
// STYLES CSS VITRINE SUISSE HAUTE HORLOGERIE
// =====================================================================
const styles = `
  :root {
    --bg-primary: #fafbfc;
    --bg-secondary: #ffffff;
    --bg-tertiary: #f8f9fa;
    --bg-dark: #0f1117;
    --text-primary: #111827;
    --text-secondary: #4b5563;
    --text-muted: #6b7280;
    --border-color: #e5e7eb;
    --shadow-light: rgba(0,0,0,0.04);
    --shadow-medium: rgba(0,0,0,0.08);
    --shadow-strong: rgba(0,0,0,0.15);
    --gold-primary: #d4af37;
    --gold-secondary: #c59b27;
    --gold-tertiary: #dfba53;
    --gradient-gold: linear-gradient(135deg, #d4af37 0%, #ffd700 50%, #dfba53 100%);
    --gradient-luxury: linear-gradient(135deg, #111827 0%, #1f2937 50%, #374151 100%);
  }

  .dark {
    --bg-primary: #07090e;
    --bg-secondary: #0f1422;
    --bg-tertiary: #161c2e;
    --bg-dark: #07090e;
    --text-primary: #f9fafb;
    --text-secondary: #d1d5db;
    --text-muted: #9ca3af;
    --border-color: #1f293d;
    --shadow-light: rgba(0,0,0,0.3);
    --shadow-medium: rgba(0,0,0,0.5);
    --shadow-strong: rgba(0,0,0,0.7);
  }

  .hero-vitrine {
    background: var(--gradient-luxury);
    position: relative;
    overflow: hidden;
    border-radius: 24px;
  }

  .hero-vitrine::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 20% 30%, rgba(212,175,55,0.2) 0%, transparent 60%);
    pointer-events: none;
  }

  .vitrine-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 20px;
    overflow: hidden;
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .vitrine-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 40px var(--shadow-medium);
    border-color: rgba(212,175,55,0.45);
  }

  .card-img-zoom {
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .vitrine-card:hover .card-img-zoom {
    transform: scale(1.06);
  }

  .timeline-badge {
    background: linear-gradient(135deg, #d4af37 0%, #ffd700 100%);
    color: #111827;
    font-weight: 800;
  }

  .gold-badge {
    color: #b08d57;
    background: rgba(176, 141, 87, 0.1);
    border: 1px solid rgba(176, 141, 87, 0.25);
  }
`;

// =====================================================================
// DONNÉES HISTORIQUES HAUTE HORLOGERIE SUISSE (TOUTES LES PHOTOS RESTAURÉES)
// =====================================================================

const timelineData = [
  {
    year: "1541",
    title: "Jean Calvin & la Naissance de l'Horlogerie Genevoise",
    desc: "En bannissant le port d'objets ornementaux et de bijoux superflus, Jean Calvin oblige les maîtres orfèvres et joailliers genevois à se reconvertir dans l'art de l'horlogerie, considérée comme un instrument d'utilité morale et scientifique. En 1601, Genève crée la première corporation horlogère au monde.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/geneva_luxury_watchmaking_craftsman_at_work.jpg",
    canton: "Genève",
    impact: "Acte Fondateur"
  },
  {
    year: "1685",
    title: "La Révocation de l'Édit de Nantes & l'Arc Jurassien",
    desc: "L'afflux massif de réfugiés huguenots français fuyant les persécutions religieuses apporte capitaux, savoir-faire horloger de pointe et réseaux commerciaux internationaux, essaimant dans les vallées jurassiennes neuchâteloises et vaudoises.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/la_chaux_de_fonds_swiss_watchmaking_cityscape_unesco_heritage.jpg",
    canton: "Arc Jurassien",
    impact: "Expansion Révolutionnaire"
  },
  {
    year: "1740",
    title: "La Vallée de Joux : Le Berceau Mondial des Grandes Complications",
    desc: "Isolés durant les longs et rudes mois d'hiver, les paysans combiers transforment leurs fermes en ateliers sous les combles baignés de lumière. Ils développent une virtuosité inégalée dans la miniaturisation des répétitions minutes, chronographes et calendriers perpétuels.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/Vallee_de_Joux_Swiss_Alps_Landscape_Lake_Forest.jpg",
    canton: "Vaud",
    impact: "Sanctuaire des Complications"
  },
  {
    year: "1801",
    title: "Abraham-Louis Breguet et l'Invention du Tourbillon",
    desc: "Le génie neuchâtelois Abraham-Louis Breguet dépose le brevet du régulateur à Tourbillon le 7 messidor an IX. En plaçant l'ensemble balancier-spiral-échappement dans une cage mobile effectuant un tour par minute, il neutralise les effets néfastes de la gravité terrestre.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/luxury_swiss_watch_tourbillon_mechanism_macro.jpg",
    canton: "Neuchâtel / Paris",
    impact: "Chef-d'œuvre de Physique"
  },
  {
    year: "1848",
    title: "L'Industrialisation Horlogère et l'Épopée Omega",
    desc: "Louis Brandt fonde à La Chaux-de-Fonds l'atelier précurseur d'Omega. Avec l'adoption précoce de pièces interchangeables et de calibres industrialisés standardisés de haute précision, la Suisse surpasse définitivement la production britannique.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/Omega_Seamaster_Chronograph_Luxury_Watch_White_Background.jpg",
    canton: "Bienne / Neuchâtel",
    impact: "Industrialisation Précise"
  },
  {
    year: "1886",
    title: "Le Poinçon de Genève & l'Apogée Réglementaire",
    desc: "Création légale par le Grand Conseil genevois du Poinçon de Genève, label officiel d'État certifiant l'origine, la bienfacture, la précision chronométrique et les finitions manuelles d'excellence des garde-temps conçus sur le territoire cantonal.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/Biel-Bienne-Switzerland-Cite-du-Temps-Omega-Swatch-Headquarters.jpg",
    canton: "Genève",
    impact: "Label d'État Suprême"
  }
];

const regions = [
  {
    name: "Genève",
    canton: "Genève (GE)",
    desc: "Capitale historique de la haute horlogerie et de la joaillerie, Genève abrite les sièges mythiques de Patek Philippe, Vacheron Constantin et Rolex, ainsi que le prestigieux Poinçon de Genève.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/geneva_luxury_watchmaking_craftsman_at_work.jpg",
    specialty: "Haute Joaillerie & Poinçon de Genève",
    elevation: "375 m"
  },
  {
    name: "Vallée de Joux",
    canton: "Vaud (VD)",
    desc: "Nichée à 1 000 mètres d'altitude, cette vallée sauvage est le sanctuaire absolu des grandes complications mécaniques : sonneries, tourbillons et calendriers astronomiques signés Audemars Piguet, Jaeger-LeCoultre et Breguet.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/Vallee_de_Joux_Audemars_Piguet_Museum_Swiss_Alps_Landscape.jpg",
    specialty: "Grandes Complications & Tourbillons",
    elevation: "1 000 m"
  },
  {
    name: "Neuchâtel",
    canton: "Neuchâtel (NE)",
    desc: "Berceau de la chronométrie de marine, de la recherche scientifique et de l'innovation microtechnique. Historiquement célèbre pour les concours de précision de son Observatoire cantonal.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/Neuchatel_Switzerland_historic_city_lake_architecture_watchmaking_clock_tower.jpg",
    specialty: "Chronométrie Marine & Observatoire",
    elevation: "487 m"
  },
  {
    name: "Bienne (Biel)",
    canton: "Berne (BE)",
    desc: "Capitale industrielle bilingue du temps. Cité de production colossale abritant le siège mondial de Swatch Group, les manufactures Omega et les ateliers de fabrication des calibres Rolex.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/Bienne_Switzerland_Old_Town_Square_Watchmaking_City.jpg",
    specialty: "Production Industrielle & Métrologie",
    elevation: "434 m"
  },
  {
    name: "La Chaux-de-Fonds & Le Locle",
    canton: "Neuchâtel (NE)",
    desc: "Villes jumelles inscrites au Patrimoine Mondial de l'UNESCO pour leur urbanisme horloger unique, bâti en damier avec de hautes fenêtres orientées pour optimiser l'ensoleillement des établis.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/la_chaux_de_fonds_swiss_watchmaking_cityscape_unesco_heritage.jpg",
    specialty: "Urbanisme Horloger UNESCO",
    elevation: "991 m"
  },
  {
    name: "Schaffhouse (Schaffhausen)",
    canton: "Schaffhouse (SH)",
    desc: "Cité rhénane incarnant l'alliance magistrale entre l'esprit d'ingénierie américain apporté par F.A. Jones et la rigueur artisanale suisse, créant le style iconique d'IWC.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/Schaffhausen_Switzerland_Fronwagplatz_city_square.jpg",
    specialty: "Ingénierie & Montres d'Aviation",
    elevation: "403 m"
  }
];

const manufactures = [
  {
    name: "Patek Philippe",
    year: "1839",
    location: "Plan-les-Ouates, Genève",
    desc: "Doyenne indépendante et familiale de la haute horlogerie genevoise. Synonyme de perfection mécanique intemporelle, détentrice de records absolus d'enchères avec ses Calibres 89 et Henry Graves.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/Patek_Philippe_Rose_Gold_Grand_Complications_Watch.jpg",
    seal: "Poinçon Patek Philippe"
  },
  {
    name: "Audemars Piguet",
    year: "1875",
    location: "Le Brassus, Vallée de Joux",
    desc: "Toujours entre les mains des familles fondatrices au Brassus. Créatrice de la légendaire Royal Oak en 1972 et pionnière continue dans les squelettes d'art et mécanismes diaphane.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/audemars_piguet_royal_oak_rose_gold_black_dial_luxury_swiss_watch.jpg",
    seal: "Haute Horlogerie du Brassus"
  },
  {
    name: "Vacheron Constantin",
    year: "1755",
    location: "Plan-les-Ouates, Genève",
    desc: "La plus ancienne manufacture horlogère au monde en activité ininterrompue depuis plus de 270 ans. Devise éternelle : 'Faire mieux si possible, ce qui est toujours possible'.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/Vacheron_Constantin_Tourbillon_Green_Dial_Luxury_Swiss_Watch.jpg",
    seal: "Poinçon de Genève"
  },
  {
    name: "Jaeger-LeCoultre",
    year: "1833",
    location: "Le Sentier, Vallée de Joux",
    desc: "Surnommée 'La Grande Maison' de la Vallée de Joux, ayant créé plus de 1 200 calibres et 400 brevets, dont la mythique Reverso réversible et les pendules Atmos à mouvement quasi perpétuel.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/jaeger_lecoultre_reverso_blue_dial_luxury_watch.jpg",
    seal: "Contrôle 1 000 Heures"
  },
  {
    name: "Omega",
    year: "1848",
    location: "Bienne, Berne",
    desc: "Pionnière de la précision chronométrique certifiée Master Chronometer (METAS). Choisie par la NASA en 1965, la Speedmaster est la première et seule montre portée sur la Lune en 1969.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/Omega_Seamaster_Chronograph_Luxury_Watch_White_Background.jpg",
    seal: "Master Chronometer METAS"
  },
  {
    name: "Rolex",
    year: "1905",
    location: "Les Acacias, Genève",
    desc: "Icône universelle de la robustesse et de la fiabilité. Inventrice du premier boîtier véritablement étanche au monde en 1926 (Oyster) et du premier rotor automatique à 360° en 1931 (Perpetual).",
    img: "/theorie/histoire-horlogerie-suisse/imgs/rolex_submariner_gold_luxury_swiss_watch_product_photo.jpg",
    seal: "Chronomètre Superlatif"
  },
  {
    name: "IWC Schaffhausen",
    year: "1868",
    location: "Schaffhouse",
    desc: "Fondée par l'ingénieur bostonien Florentine Ariosto Jones sur les rives du Rhin, réputée pour ses montres d'aviateurs robustes et ses calendriers perpétuels synchronisés d'une rare élégance.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/IWC_Schaffhausen_Headquarters_Historic_Building_Switzerland.jpg",
    seal: "Probus Scafusia"
  },
  {
    name: "Blancpain",
    year: "1735",
    location: "Le Brassus / Paudex",
    desc: "La plus ancienne marque horlogère enregistrée au monde. Créatrice en 1953 de la Fifty Fathoms, première montre de plongée militaire moderne dotée d'une lunette tournante unidirectionnelle.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/blancpain_fifty_fathoms_luxury_swiss_dive_watch_product_shot.jpg",
    seal: "Haute Horlogerie Traditionnelle"
  }
];

const premiumBrands = [
  {
    name: "Bulgari Haute Horlogerie",
    specialty: "Records Mondiaux d'Extra-Plat (Octo Finissimo)",
    desc: "Manufacture établie à Neuchâtel et au Sentier, réputée pour ses exploits techniques de miniaturisation battant 9 records mondiaux d'extra-plat consécutifs en tourbillon, répétition minutes et chronographe automatique.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/Biel-Bienne-Switzerland-Cite-du-Temps-Omega-Swatch-Headquarters.jpg"
  },
  {
    name: "Richard Mille",
    specialty: "Haute Technologie Aérospatiale & Formule 1",
    desc: "Ateliers situés aux Breuleux dans le Jura suisse, pionniers dans l'utilisation du carbone TPT, du graphène et des alliages titane-aluminium pour créer des garde-temps ultra-légers résistant à des chocs de plus de 10 000 G.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/geneva_luxury_watchmaking_craftsman_at_work.jpg"
  },
  {
    name: "Ulysse Nardin",
    specialty: "Chronométrie Marine & Révolution Silicium (Freak)",
    desc: "Manufacture du Locle fondée en 1846, légendaire fournisseur de plus de 50 marines nationales en chronomètres de bord. En 2001, elle révolutionne l'horlogerie mondiale en introduisant le premier échappement en silicium sur la Freak.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/Vallee_de_Joux_Swiss_Alps_Landscape_Lake_Forest.jpg"
  }
];

const mechanisms = [
  {
    name: "Régulateur à Tourbillon",
    complexity: "Suprême (4 étoiles)",
    desc: "Cage mobile effectuant une révolution complète par minute pour annuler l'écart de marche gravitationnel en position verticale. Véritable sommet de la virtuosité horlogère suisse.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/luxury_swiss_watch_tourbillon_mechanism_macro.jpg"
  },
  {
    name: "Tourbillon Carrousel",
    complexity: "Exceptionnelle (5 étoiles)",
    desc: "Système dynamique complexe où le train d'engrenage et la plateforme réglante tournent de manière autonome via deux chaînes cinématiques indépendantes.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/luxury_swiss_watch_tourbillon_carrousel_macro_mechanism.jpg"
  },
  {
    name: "Grande Complication",
    complexity: "Maximale (Chef-d'œuvre)",
    desc: "Association magistrale d'au moins trois complications reines : répétition minutes à timbres cathédrale, chronographe à rattrapante et calendrier perpétuel avec phases de lune.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/luxury_swiss_watch_tourbillon_complication_macro.jpg"
  },
  {
    name: "Mouvement & Rotor Automatique",
    complexity: "Haute Précision Industrielle",
    desc: "Système de remontage bidirectionnel sur roulement à billes synthétique avec masse oscillante en or massif ou tungstène, convertissant les mouvements du poignet en énergie motrice.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/patek-philippe-swiss-luxury-watch-movement-gears-close-up.jpeg"
  },
  {
    name: "Chronographe à Rattrapante",
    complexity: "Haute Horlogerie Chronométrique",
    desc: "Mécanisme doté d'une seconde aiguille trotteuse capable de s'arrêter pour mesurer un temps intermédiaire puis de 'rattraper' instantanément la trotteuse principale.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/luxury_swiss_watch_tourbillon_complication_macro_mechanism.jpg"
  },
  {
    name: "Calendrier Perpétuel Squelette",
    complexity: "Maîtrise Temporelle Absolue",
    desc: "Mécanisme astronomique calculant mécaniquement la durée variable des mois (28, 30, 31 jours) et les années bissextiles sans correction manuelle jusqu'en 2100.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/luxury_swiss_watch_tourbillon_mechanism_render_macro_photograph.jpg"
  }
];

const heritageWatches = [
  {
    name: "Patek Philippe Henry Graves Supercomplication",
    year: "1933",
    value: "24 000 000 $ USD",
    desc: "Montre de poche mécanique la plus complexe jamais réalisée à la main sans assistance informatique : 24 complications, carte du ciel de New York et carillon de Westminster.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/vintage_gold_pocket_watch_historical_timepiece_wooden_table.jpg"
  },
  {
    name: "Rolex 'Bao Dai' Triple Calendar Moonphase 6062",
    year: "1952",
    value: "5 060 000 $ USD",
    desc: "Pièce unique commandée par le dernier empereur du Vietnam à Genève. Boîtier en or jaune 18 carats avec cadran noir laqué et index sertis de cinq diamants taille brillant.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/vintage_swiss_heritage_pocket_watch_gold_chain.jpg"
  },
  {
    name: "Patek Philippe Chronographe Acier Réf. 130",
    year: "1927",
    value: "4 987 000 $ USD",
    desc: "L'un des rarissimes chronographes monopoussoirs d'avant-guerre en acier inoxydable préservé dans un état de conservation parfait, véritable graal des collectionneurs mondiaux.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/vintage_swiss_hirt_chronometer_gold_pocket_watch_historical.jpg"
  },
  {
    name: "A. Lange & Söhne Pour le Mérite Tourbillon",
    year: "1994",
    value: "1 250 000 $ USD",
    desc: "Montre-bracelet d'exception intégrant une transmission fusée-chaîne miniature et un tourbillon pour garantir une force motrice constante et une précision parfaite.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/luxury_swiss_watch_tourbillon_carrousel_macro_mechanism.jpg"
  },
  {
    name: "Breguet Marie-Antoinette N° 160",
    year: "1827",
    value: "Estimée > 30 000 000 $ USD",
    desc: "Commandée en 1783 pour la reine Marie-Antoinette sans limite de temps ni de budget. Elle renfermait toutes les complications connues de l'époque sous un cadran en cristal de roche.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/luxury_swiss_watch_tourbillon_mechanism_macro.jpg"
  },
  {
    name: "Patek Philippe Chronomètre Henry Graves",
    year: "1928",
    value: "2 800 000 $ USD",
    desc: "Chronomètre de poche en platine certifié par l'Observatoire de Genève, affichant une régularité de marche stupéfiante inférieure à 0,2 seconde par jour.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/luxury_swiss_watch_tourbillon_complication_macro.jpg"
  }
];

const innovations = [
  {
    title: "Première Montre de Plongée Moderne (Fifty Fathoms)",
    brand: "Blancpain",
    year: "1953",
    desc: "Conçue pour les nageurs de combat, créant les critères universels de la montre de plongée : lunette tournante verrouillable, double joint torique et aiguilles luminescentes.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/blancpain_fifty_fathoms_luxury_swiss_dive_watch_product_shot.jpg",
    impact: "Standard Militaire Mondial"
  },
  {
    title: "Premier Calibre Quartz Suisse (Projet Beta 21)",
    brand: "Centre Électronique Horloger (CEH)",
    year: "1969",
    desc: "Développé collectivement à Neuchâtel par 20 manufactures suisses pour rivaliser avec la montée en puissance de l'électronique asiatique et affirmer la recherche suisse.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/Vallee_de_Joux_Swiss_Alps_Landscape_Lake_Forest.jpg",
    impact: "Prouesse Technologique"
  },
  {
    title: "Régulateur à Tourbillon Portatif",
    brand: "Abraham-Louis Breguet",
    year: "1801",
    desc: "Compensation active de la gravité terrestre par rotation continue de l'échappement, inventé et breveté par Breguet, devenu la signature suprême de la Haute Horlogerie.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/luxury_swiss_watch_tourbillon_mechanism_macro.jpg",
    impact: "Fondateur & Éternel"
  },
  {
    title: "Silicium dans l'Échappement & Spiraux Spiromax",
    brand: "Patek Philippe & CSEM",
    year: "2005",
    desc: "L'application du silicium monocristallin insensible au magnétisme, inoxydable et sans besoin de lubrification huileuse, révolutionnant la fiabilité et la chronométrie moderne.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/Patek_Philippe_luxury_Swiss_watch_elegant_design_product_photography.jpg",
    impact: "Révolution Matériaux"
  },
  {
    title: "Première Montre-Bracelet de Haute Joaillerie",
    brand: "Patek Philippe",
    year: "1868",
    desc: "Créée pour la comtesse Koscowicz de Hongrie, transformant la montre de poche masculine en un bijou d'exception porté au poignet, inaugurant l'ère moderne de la montre-bracelet.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/vintage_gold_pocket_watch_historical_timepiece_wooden_table.jpg",
    impact: "Révolution des Usages"
  },
  {
    title: "Mécanismes Diaphane & Haute Architecture Squelette",
    brand: "Audemars Piguet",
    year: "2000",
    desc: "Ajourage virtuose des platines et des ponts réduits à l'extrême limite structurelle, transformant le calibre mécanique en une sculpture tridimensionnelle en apesanteur.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/audemars_piguet_royal_oak_skeleton_artistic.jpg",
    impact: "Art Architectural Pur"
  }
];

const territories = [
  {
    region: "Vallée de Joux",
    coords: "46.6° N, 6.2° E",
    altitude: "1 000 m",
    desc: "Écrin montagnard sauvage de l'excellence horlogère helvétique, alliant rigueur climatique et perfection technique des complications majeures.",
    image: "/theorie/histoire-horlogerie-suisse/imgs/vallee_de_joux_swiss_jura_lakes_landscape.jpg",
    expertise: "Tourbillons, Répétitions Minutes, Calendriers Perpétuels"
  },
  {
    region: "Neuchâtel",
    coords: "47.0° N, 6.9° E",
    altitude: "487 m",
    desc: "Bordant son lac historique, Neuchâtel est la terre sacrée des chronomètres de marine, de l'astronomie de précision et des instituts de recherche microtechnique.",
    image: "/theorie/histoire-horlogerie-suisse/imgs/neuchatel-switzerland-city-lake-view-historic-watchmaking-region.jpg",
    expertise: "Chronomètres d'Observatoire, Silicium, Plongée"
  },
  {
    region: "Genève",
    coords: "46.2° N, 6.1° E",
    altitude: "375 m",
    desc: "Cité internationale de la haute horlogerie et de la joaillerie, abritant les plus célèbres ateliers de maîtres artisans graveurs et émailleurs.",
    image: "/theorie/histoire-horlogerie-suisse/imgs/geneva_luxury_watchmaking_craftsman_at_work.jpg",
    expertise: "Poinçon de Genève, Émaillage Grand Feu, Sertissage"
  },
  {
    region: "La Chaux-de-Fonds",
    coords: "47.1° N, 6.8° E",
    altitude: "991 m",
    desc: "Capitale mondiale de la production horlogère au XIXe siècle, classée UNESCO pour son architecture unique au service de la lumière des horlogers.",
    image: "/theorie/histoire-horlogerie-suisse/imgs/la_chaux_de_fonds_swiss_watchmaking_cityscape_unesco_heritage.jpg",
    expertise: "Manufactures Intégrées, Échappements, Boîtes d'Art"
  }
];

const collections = [
  {
    name: "Patek Philippe Grand Complication",
    price: "À partir de 250 000 CHF",
    desc: "Apogée de l'art mécanique genevois, associant répétition minutes, calendrier perpétuel instantané et tourbillon dans un boîtier d'or rose ou de platine poli main.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/patek_philippe_grand_complications_rose_gold.jpg",
    uniqueness: "Pièces Rares de Collection"
  },
  {
    name: "Patek Philippe Diamond Haute Joaillerie",
    price: "À partir de 500 000 CHF",
    desc: "Fusion magistrale entre haute horlogerie mécanique et art joaillier de précision, pavée des plus purs diamants certifiés Top Wesselton.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/patek_philippe_diamond_jewelry_luxury.jpg",
    uniqueness: "Haute Joaillerie Helvétique"
  },
  {
    name: "Vacheron Constantin Tourbillon Extraordinaire",
    price: "À partir de 200 000 CHF",
    desc: "Calibre manufacture doté de la croix de Malte emblématique, affichant des finitions anglage main et Côtes de Genève d'une pureté absolue.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/vacheron_constantin_tourbillon_extraordinary.jpg",
    uniqueness: "Poinçon de Genève Certifié"
  },
  {
    name: "Audemars Piguet Royal Oak Squelette",
    price: "À partir de 150 000 CHF",
    desc: "Boîtier octogonal iconique en or rose avec vis hexagonales en or blanc, révélant un mouvement ajouré d'une rare virtuosité tridimensionnelle.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/audemars_piguet_royal_oak_skeleton_artistic.jpg",
    uniqueness: "Design Iconique Majeur"
  },
  {
    name: "Richard Mille Carbone & Titane Ultra Léger",
    price: "À partir de 800 000 CHF",
    desc: "L'horlogerie de l'extrême inspirée des monocoques de Formule 1 : boîtier en carbone TPT et platine en titane grade 5 sablé sous vide.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/richard_mille_carbon_ultra_light.jpg",
    uniqueness: "Performance Ultra-Légère"
  },
  {
    name: "Patek Philippe Émail Grand Feu Miniature",
    price: "À partir de 180 000 CHF",
    desc: "Cadrans uniques peints à la main par les derniers maîtres émailleurs suisses et cuits à plus de 800°C dans des fours traditionnels.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/patek_philippe_enamel_art_dial.jpg",
    uniqueness: "Art Rare en Voie de Disparition"
  }
];

const masterGallery = [
  {
    title: "L'Atelier des Maîtres Horlogers",
    category: "Savoir-Faire Artisanal",
    desc: "Établis en bois massif, loupes d'horloger et silence studieux où s'opère la magie de l'anglage et du réglage micrométrique.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/swiss_luxury_watchmaking_atelier_craftsmen_watches.jpg"
  },
  {
    title: "L'Outillage de Haute Précision",
    category: "Métrologie & Outillage",
    desc: "Brucelles en laiton anti-magnétique, tournevis dynamométriques et huiliers miniatures indispensables au travail au 1/100e de millimètre.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/swiss_watchmaking_precision_tools_elegant_layout.jpg"
  },
  {
    title: "Omega Speedmaster Moonwatch",
    category: "Légende Spatiale (1969)",
    desc: "La seule montre qualifiée par la NASA pour toutes les missions spatiales habitées, portée lors du premier pas sur la Lune le 21 juillet 1969.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/omega_speedmaster_professional_moonwatch_luxury_swiss_watch.jpg"
  },
  {
    title: "Patek Philippe Nautilus Réf. 5711",
    category: "Icône Sport-Chic (1976)",
    desc: "Dessinée par Gérald Genta avec sa lunette octogonale adoucie inspirée d'un hublot de transatlantique et son cadran bleu strié.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/Patek-Philippe-Nautilus-Luxury-Swiss-Watch-Blue-Dial.jpg"
  },
  {
    title: "Jaeger-LeCoultre Reverso Tribute",
    category: "Art Déco & Réversibilité (1931)",
    desc: "Boîtier réversible breveté pour protéger le cadran des chocs lors des matches de polo des officiers britanniques en Inde.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/Jaeger-LeCoultre-Reverso-Green-Dial-Luxury-Swiss-Watch-Product-Shot.jpg"
  },
  {
    title: "Chronomètre de Poche Longines Or 18K",
    category: "Patrimoine du XIXe Siècle",
    desc: "Témoin de l'apogée de Saint-Imier, orné de gravures guillochées à la main et d'un échappement à ancre suisse de haute précision.",
    img: "/theorie/histoire-horlogerie-suisse/imgs/vintage_swiss_longines_gold_pocket_watch.jpg"
  }
];

// =====================================================================
// QUESTIONS DE QUIZ FORMAT EXAMEN OFFICIEL SUISSE
// =====================================================================

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "1. Quel événement survenu à Genève en 1541 est reconnu comme le point de départ de l'horlogerie suisse ?",
    options: [
      "La création du premier chronomètre de marine par l'Observatoire de Genève",
      "L'Édit somptuaire de Jean Calvin interdisant les bijoux, obligeant les orfèvres à se reconvertir dans la montre",
      "La découverte fortuite de gisements de quartz dans les Alpes valaisannes",
      "Le rachat des ateliers genevois par la couronne d'Angleterre"
    ],
    correctAnswer: 1,
    explanation: "En 1541, le réformateur Jean Calvin bannit les bijoux et ornements ostentatoires à Genève. Privés de débouchés, les orfèvres et émailleurs genevois unissent leur talent aux réfugiés huguenots français pour fabriquer des montres, considérées comme des objets scientifiques et d'utilité morale. En 1601 naît la première corporation horlogère au monde."
  },
  {
    question: "2. Qu'appelle-t-on le système de « l'établissage » initié par Daniel Jeanrichard dans les montagnes neuchâteloises ?",
    options: [
      "L'obligation pour chaque apprenti d'acheter son propre établi d'ébénisterie",
      "Une organisation décentralisée où les paysans des fermes isolées fabriquent chacun une pièce spécifique en hiver avant assemblage central",
      "Une taxe douanière sur les montres exportées vers la France",
      "Une méthode de polissage des pivots au tour à pivoter"
    ],
    correctAnswer: 1,
    explanation: "L'établissage est la grande innovation productive jurassienne. Durant les rudes mois d'hiver où la terre était gelée, Daniel Jeanrichard forma les familles paysannes à fabriquer à domicile un composant précis (rouages, ressorts, ponts, boîtes). L'établisseur centralisait ensuite les pièces au printemps pour l'assemblage et la vente, créant une puissance de production inégalée."
  },
  {
    question: "3. Quelle invention majeure Abraham-Louis Breguet a-t-il brevetée en 1801 pour neutraliser les effets de la pesanteur terrestre ?",
    options: [
      "Le ressort moteur en alliage Nivaflex inoxydable",
      "Le Tourbillon, enfermant l'échappement et le balancier dans une cage tournante effectuant 1 tour par minute",
      "Le rotor automatique monté sur roulement à billes céramique",
      "Le système antichoc Incabloc à ressort lyre"
    ],
    correctAnswer: 1,
    explanation: "Déposé le 7 messidor an IX (1801), le brevet du Tourbillon d'Abraham-Louis Breguet place les organes réglants (balancier, spiral, ancre) dans une cage mobile effectuant un tour par minute. Cela brasse continuellement les positions verticales et compense par rotation continue les perturbations provoquées par la gravité terrestre sur les montres de poche."
  },
  {
    question: "4. Quelle démonstration d'envergure internationale a prouvé l'étanchéité absolue du boîtier Oyster de Rolex en 1927 ?",
    options: [
      "La descente au fond de la fosse des Mariannes avec le professeur Piccard",
      "La traversée de la Manche à la nage au cou de la nageuse britannique Mercedes Gleitze pendant plus de 10 heures",
      "Une exposition sous cloche à vide lors de la foire de Bâle",
      "Un voyage au pôle Nord avec l'explorateur Roald Amundsen"
    ],
    correctAnswer: 1,
    explanation: "Le 7 octobre 1927, la jeune nageuse britannique Mercedes Gleitze traverse la Manche à la nage avec une Rolex Oyster au cou. Après plus de 10 heures passées dans les eaux glaciales, la montre ressortit dans un état de marche et d'étanchéité irréprochables, prouvant au monde entier l'efficacité révolutionnaire du boîtier étanche et de la couronne vissée."
  },
  {
    question: "5. Pourquoi les villes du Locle et de La Chaux-de-Fonds ont-elles été inscrites au Patrimoine Mondial de l'UNESCO en 2009 ?",
    options: [
      "Pour la pureté exceptionnelle de l'air alpin propice au séchage des vernis",
      "Pour leur urbanisme horloger unique au monde, conçu au XIXe siècle pour apporter un ensoleillement maximal aux ateliers sous les toits",
      "Car elles abritent les plus grandes mines d'argent et d'or de Suisse",
      "En hommage au centenaire de la fondation de l'École d'Horlogerie"
    ],
    correctAnswer: 1,
    explanation: "L'UNESCO a consacré l'urbanisme horloger exceptionnel du Locle et de La Chaux-de-Fonds. Reconstruites après des incendies, les rues rectilignes et les façades ont été spécialement pensées pour baigner de lumière naturelle les ateliers d'horlogers situés sous les toits et aux derniers étages des bâtiments."
  }
];

export default function HistoireHorlogerieSuisse() {
  // Quiz state (Compact Stepper ~280px tall)
  const [currentQuizIdx, setCurrentQuizIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const handleSelectQuizAnswer = (optIdx: number) => {
    if (userAnswers[currentQuizIdx] !== undefined) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuizIdx]: optIdx
    }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setCurrentQuizIdx(0);
    setQuizFinished(false);
  };

  return (
    <>
      <style>{styles}</style>

      <div className="min-h-screen bg-neutral-50 dark:bg-[#07090e] text-neutral-900 dark:text-neutral-100 transition-colors">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">

          {/* Top Breadcrumb */}
          <div className="flex items-center justify-between">
            <Link
              href="/theorie"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← Retour à l&apos;Espace Théorie</span>
            </Link>

            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span>Théorie</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#B08D57] font-semibold">Histoire Horlogère Suisse</span>
            </div>
          </div>

          {/* =================================================================== */}
          {/* HERO VITRINE SUISSE */}
          {/* =================================================================== */}
          <section className="hero-vitrine p-8 sm:p-12 lg:p-16 text-white text-center sm:text-left space-y-8 shadow-2xl">
            <div className="max-w-4xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono text-yellow-300">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>500 Ans d&apos;Excellence Helvétique & Haute Précision</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
                L&apos;Histoire de l&apos;Horlogerie Suisse
              </h1>

              <p className="text-base sm:text-lg text-neutral-300 font-sans leading-relaxed max-w-3xl">
                Un voyage d&apos;exception à travers 5 siècles d&apos;ingéniosité, de rigueur montagnarde et de passion pour la bienfacture absolue. Découvrez les manufactures mythiques, les terroirs jurassiens et les chefs-d&apos;œuvre mécaniques qui ont fait de la Suisse le maître incontesté du temps mondial.
              </p>
            </div>

            {/* 4 Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10">
              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-yellow-400">500+</div>
                <div className="text-xs text-neutral-300 font-mono mt-1">Années de Tradition</div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-yellow-400">50+</div>
                <div className="text-xs text-neutral-300 font-mono mt-1">Manufactures Mythiques</div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-yellow-400">6</div>
                <div className="text-xs text-neutral-300 font-mono mt-1">Régions Horlogères</div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-yellow-400">∞</div>
                <div className="text-xs text-neutral-300 font-mono mt-1">Passion & Perfection</div>
              </div>
            </div>
          </section>

          {/* =================================================================== */}
          {/* SECTION 1 : CHRONOLOGIE DE L'EXCELLENCE */}
          {/* =================================================================== */}
          <section className="space-y-8" id="timeline">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <span className="text-xs font-mono tracking-widest text-[#B08D57] uppercase font-bold">
                  Frise Chronologique
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold mt-1">
                  Chronologie de l&apos;Excellence Horlogère
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-md font-sans">
                De la Réforme calviniste de 1541 aux labels d&apos;État les plus stricts de la planète.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {timelineData.map((item, index) => (
                <div key={index} className="vitrine-card flex flex-col justify-between group">
                  <div className="relative h-48 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover card-img-zoom"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-mono font-bold timeline-badge shadow-md">
                      {item.year}
                    </div>
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-mono bg-black/60 text-white backdrop-blur-sm">
                      {item.canton}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="text-[11px] font-mono font-bold text-[#B08D57] uppercase tracking-wider">
                        {item.impact}
                      </div>
                      <h3 className="text-base font-serif font-bold group-hover:text-[#B08D57] transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =================================================================== */}
          {/* SECTION 2 : TERRITOIRES DE L'HORLOGERIE */}
          {/* =================================================================== */}
          <section className="space-y-8" id="regions">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <span className="text-xs font-mono tracking-widest text-[#B08D57] uppercase font-bold">
                  Géographie & Terroirs
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold mt-1">
                  Les Territoires de l&apos;Horlogerie Suisse
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-md font-sans">
                L&apos;Arc Jurassien, Genève et les cantons alémaniques : cartographie des savoir-faire d&apos;exception.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regions.map((region, index) => (
                <div key={index} className="vitrine-card flex flex-col justify-between group">
                  <div className="relative h-48 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <img
                      src={region.img}
                      alt={region.name}
                      className="w-full h-full object-cover card-img-zoom"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-mono font-bold bg-neutral-900/80 text-white backdrop-blur-sm border border-white/20">
                      📍 {region.canton}
                    </div>
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono bg-black/60 text-yellow-300 backdrop-blur-sm">
                      Alt. {region.elevation}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <h3 className="text-lg font-serif font-bold group-hover:text-[#B08D57] transition-colors">
                        {region.name}
                      </h3>
                      <div className="text-xs font-mono text-[#B08D57] font-semibold">
                        ⚙️ Spécialité : {region.specialty}
                      </div>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {region.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =================================================================== */}
          {/* SECTION 3 : LES MANUFACTURES LÉGENDAIRES */}
          {/* =================================================================== */}
          <section className="space-y-8" id="manufactures">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <span className="text-xs font-mono tracking-widest text-[#B08D57] uppercase font-bold">
                  Maisons Historiques
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold mt-1">
                  Les Manufactures Légendaires
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-md font-sans">
                Les maisons mythiques qui ont forgé les plus grands chefs-d&apos;œuvre mécaniques du monde.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {manufactures.map((manufacture, index) => (
                <div key={index} className="vitrine-card p-5 flex flex-col sm:flex-row gap-5 items-center group">
                  <div className="w-full sm:w-40 h-40 flex-shrink-0 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800 relative">
                    <img
                      src={manufacture.img}
                      alt={manufacture.name}
                      className="w-full h-full object-cover card-img-zoom"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#B08D57] text-black">
                      {manufacture.year}
                    </div>
                  </div>

                  <div className="flex-1 space-y-2 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-lg font-serif font-bold group-hover:text-[#B08D57] transition-colors">
                        {manufacture.name}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full gold-badge self-center sm:self-auto">
                        {manufacture.seal}
                      </span>
                    </div>

                    <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 flex items-center justify-center sm:justify-start gap-1">
                      <MapPin className="w-3 h-3 text-[#B08D57]" />
                      <span>{manufacture.location}</span>
                    </div>

                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {manufacture.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =================================================================== */}
          {/* SECTION 4 : MARQUES PREMIUM D'EXCEPTION */}
          {/* =================================================================== */}
          <section className="space-y-8" id="premium">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <span className="text-xs font-mono tracking-widest text-[#B08D57] uppercase font-bold">
                  Haute Créativité
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold mt-1">
                  Marques Premium d&apos;Exception
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-md font-sans">
                L&apos;avant-garde helvétique : records d&apos;extra-plat, carbone aérospatial et chronométrie silicium.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {premiumBrands.map((brand, index) => (
                <div key={index} className="vitrine-card flex flex-col justify-between group">
                  <div className="relative h-48 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <img
                      src={brand.img}
                      alt={brand.name}
                      className="w-full h-full object-cover card-img-zoom"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-mono font-bold bg-neutral-900/80 text-white backdrop-blur-sm border border-white/20">
                      ★ {brand.name}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <h3 className="text-base font-serif font-bold group-hover:text-[#B08D57] transition-colors">
                        {brand.name}
                      </h3>
                      <div className="text-xs font-mono text-[#B08D57] font-semibold">
                        ⚡ {brand.specialty}
                      </div>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {brand.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =================================================================== */}
          {/* SECTION 5 : MÉCANISMES D'EXCEPTION */}
          {/* =================================================================== */}
          <section className="space-y-8" id="mechanisms">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <span className="text-xs font-mono tracking-widest text-[#B08D57] uppercase font-bold">
                  Micro-Mécanique & Haute Complication
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold mt-1">
                  Mécanismes d&apos;Exception
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-md font-sans">
                Photographies macroscopiques des calibres et des complications reines de l&apos;horlogerie helvétique.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mechanisms.map((mech, index) => (
                <div key={index} className="vitrine-card flex flex-col justify-between group">
                  <div className="relative h-52 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <img
                      src={mech.img}
                      alt={mech.name}
                      className="w-full h-full object-cover card-img-zoom"
                      loading="lazy"
                    />
                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-black/75 text-yellow-300 backdrop-blur-sm border border-yellow-500/30">
                      {mech.complexity}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                    <h3 className="text-base font-serif font-bold group-hover:text-[#B08D57] transition-colors">
                      {mech.name}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {mech.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =================================================================== */}
          {/* SECTION 6 : MONTRES HÉRITAGE */}
          {/* =================================================================== */}
          <section className="space-y-8" id="heritage">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <span className="text-xs font-mono tracking-widest text-[#B08D57] uppercase font-bold">
                  Trésors Historiques & Enchères Records
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold mt-1">
                  Montres Héritage d&apos;Exception
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-md font-sans">
                Les garde-temps les plus précieux et vénérés de l&apos;histoire de l&apos;humanité.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {heritageWatches.map((watch, index) => (
                <div key={index} className="vitrine-card flex flex-col justify-between group">
                  <div className="relative h-52 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <img
                      src={watch.img}
                      alt={watch.name}
                      className="w-full h-full object-cover card-img-zoom"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded text-xs font-mono font-bold bg-neutral-900/80 text-white backdrop-blur-sm">
                      {watch.year}
                    </div>
                    <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#B08D57] text-neutral-950 shadow-md">
                      {watch.value}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                    <h3 className="text-base font-serif font-bold group-hover:text-[#B08D57] transition-colors leading-snug">
                      {watch.name}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {watch.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =================================================================== */}
          {/* SECTION 7 : INNOVATIONS RÉVOLUTIONNAIRES */}
          {/* =================================================================== */}
          <section className="space-y-8" id="innovations">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <span className="text-xs font-mono tracking-widest text-[#B08D57] uppercase font-bold">
                  Ruptures Technologiques
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold mt-1">
                  Innovations Révolutionnaires
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-md font-sans">
                Les jalons d&apos;ingénierie qui ont redéfini la chronométrie et l&apos;usage mondial du temps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {innovations.map((inno, index) => (
                <div key={index} className="vitrine-card flex flex-col justify-between group">
                  <div className="relative h-48 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <img
                      src={inno.img}
                      alt={inno.title}
                      className="w-full h-full object-cover card-img-zoom"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#B08D57] text-black">
                      {inno.brand} ({inno.year})
                    </div>
                    <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded text-[10px] font-mono bg-black/70 text-white backdrop-blur-sm">
                      {inno.impact}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                    <h3 className="text-base font-serif font-bold group-hover:text-[#B08D57] transition-colors leading-snug">
                      {inno.title}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {inno.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =================================================================== */}
          {/* SECTION 8 : TERRITOIRES & ATELIERS D'ART */}
          {/* =================================================================== */}
          <section className="space-y-8" id="territories">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <span className="text-xs font-mono tracking-widest text-[#B08D57] uppercase font-bold">
                  Ateliers des Cimes
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold mt-1">
                  Territoires & Ateliers d&apos;Exception
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-md font-sans">
                Coordonnées GPS et altitudes des foyers suisses de bienfacture horlogère.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {territories.map((ter, index) => (
                <div key={index} className="vitrine-card p-5 flex flex-col sm:flex-row gap-5 items-center group">
                  <div className="w-full sm:w-44 h-44 flex-shrink-0 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800 relative">
                    <img
                      src={ter.image}
                      alt={ter.region}
                      className="w-full h-full object-cover card-img-zoom"
                      loading="lazy"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono bg-black/70 text-yellow-300">
                      Alt. {ter.altitude}
                    </div>
                  </div>

                  <div className="flex-1 space-y-2 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-lg font-serif font-bold group-hover:text-[#B08D57] transition-colors">
                        {ter.region}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                        🌐 {ter.coords}
                      </span>
                    </div>

                    <div className="text-xs font-mono text-[#B08D57] font-semibold">
                      Spécialité : {ter.expertise}
                    </div>

                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {ter.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =================================================================== */}
          {/* SECTION 9 : COLLECTIONS D'EXCEPTION */}
          {/* =================================================================== */}
          <section className="space-y-8" id="collections">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <span className="text-xs font-mono tracking-widest text-[#B08D57] uppercase font-bold">
                  Haute Haute Horlogerie
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold mt-1">
                  Collections d&apos;Exception
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-md font-sans">
                Les pièces les plus exclusives produites par les maîtres horlogers suisses : prix, unicité et virtuosité.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collections.map((col, index) => (
                <div key={index} className="vitrine-card flex flex-col justify-between group">
                  <div className="relative h-56 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <img
                      src={col.img}
                      alt={col.name}
                      className="w-full h-full object-cover card-img-zoom"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#B08D57] text-neutral-950 shadow-md">
                      {col.price}
                    </div>
                    <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded text-[10px] font-mono bg-black/70 text-yellow-300 backdrop-blur-sm">
                      {col.uniqueness}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                    <h3 className="text-base font-serif font-bold group-hover:text-[#B08D57] transition-colors leading-snug">
                      {col.name}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {col.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =================================================================== */}
          {/* SECTION 10 : GALERIE DES MAÎTRES & OUTILS DE HAUTE PRÉCISION */}
          {/* =================================================================== */}
          <section className="space-y-8" id="master-gallery">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <span className="text-xs font-mono tracking-widest text-[#B08D57] uppercase font-bold">
                  Artisanat & Métrologie
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold mt-1">
                  Galerie des Maîtres & Outils de Haute Précision
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-md font-sans">
                Au cœur des ateliers suisses : les gestes séculaires, l&apos;outillage d&apos;art et les pièces d&apos;anthologie.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {masterGallery.map((item, index) => (
                <div key={index} className="vitrine-card flex flex-col justify-between group">
                  <div className="relative h-56 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover card-img-zoom"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-neutral-900/85 text-[#B08D57] backdrop-blur-sm border border-[#B08D57]/30">
                      {item.category}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                    <h3 className="text-base font-serif font-bold group-hover:text-[#B08D57] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =================================================================== */}
          {/* SECTION 11 : CARACTÉRISTIQUES & PILIERS DU LABEL SWISS MADE */}
          {/* =================================================================== */}
          <section className="p-8 sm:p-12 rounded-3xl bg-neutral-900 text-white shadow-2xl space-y-8" id="premium-features">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-mono tracking-widest text-[#B08D57] uppercase font-bold">
                Le Standard Mondial Ultime
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold">
                Les 4 Piliers Fondamentaux du Swiss Made
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 font-sans">
                Encadré par l&apos;Ordonnance fédérale suisse réglant l&apos;utilisation du nom « Suisse » pour les montres.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
              <div className="p-6 rounded-2xl bg-neutral-800/80 border border-neutral-700 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#B08D57]/20 text-[#B08D57] flex items-center justify-center font-bold">
                  🏆
                </div>
                <h3 className="font-serif font-bold text-base text-yellow-400">Précision Absolue</h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Chronomètres certifiés par le COSC (-4/+6 sec/jour) et par METAS (Master Chronometer 0/+5 sec/jour sous 15 000 gauss).
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-800/80 border border-neutral-700 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#B08D57]/20 text-[#B08D57] flex items-center justify-center font-bold">
                  💎
                </div>
                <h3 className="font-serif font-bold text-base text-yellow-400">Matériaux Nobles</h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Or 18 carats (750‰), Platine 950, Titane grade 5, Glaces saphir inrayables traitées antireflet et céramiques haute technologie.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-800/80 border border-neutral-700 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#B08D57]/20 text-[#B08D57] flex items-center justify-center font-bold">
                  ⚙️
                </div>
                <h3 className="font-serif font-bold text-base text-yellow-400">Bienfacture & Finitions</h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Anglages manuels polis au bois de sureau, Côtes de Genève circulaires, perlage minutieux des platines et vis bleuies au feu.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-800/80 border border-neutral-700 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#B08D57]/20 text-[#B08D57] flex items-center justify-center font-bold">
                  🛡️
                </div>
                <h3 className="font-serif font-bold text-base text-yellow-400">Héritage Perpétuel</h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Garantie de réparabilité et de réfection de pièces pour les montres anciennes, transmises de génération en génération.
                </p>
              </div>
            </div>
          </section>

          {/* =================================================================== */}
          {/* SECTION 12 : COMPACT STEPPER QUIZ (~280px tall) */}
          {/* =================================================================== */}
          <section className="space-y-4" id="quiz-section">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#B08D57] uppercase font-bold">
                  Évaluation Théorique
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold mt-0.5">
                  Quiz de Validation : Histoire Horlogère Suisse
                </h2>
              </div>

              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-medium">
                Format Examen Suisse
              </span>
            </div>

            {/* Compact Quiz Card (height ~280px) */}
            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm min-h-[260px] flex flex-col justify-between">
              {!quizFinished ? (
                <div className="space-y-4">
                  {/* Stepper Header Pills */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-neutral-500 dark:text-neutral-400">
                      Question {currentQuizIdx + 1} sur {QUIZ_QUESTIONS.length}
                    </span>

                    {/* Step pills 1 to 5 */}
                    <div className="flex items-center gap-1.5">
                      {QUIZ_QUESTIONS.map((_, idx) => {
                        const isAnswered = userAnswers[idx] !== undefined;
                        const isCurrent = currentQuizIdx === idx;
                        const isCorrect = userAnswers[idx] === QUIZ_QUESTIONS[idx].correctAnswer;

                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setCurrentQuizIdx(idx)}
                            className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center ${
                              isCurrent
                                ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 ring-2 ring-[#B08D57]'
                                : isAnswered
                                ? isCorrect
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-rose-500 text-white'
                                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                            }`}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Question Text */}
                  <h3 className="text-sm sm:text-base font-serif font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                    {QUIZ_QUESTIONS[currentQuizIdx].question}
                  </h3>

                  {/* Options Grid (Compact 2x2 on sm) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {QUIZ_QUESTIONS[currentQuizIdx].options.map((option, optIdx) => {
                      const isSelected = userAnswers[currentQuizIdx] === optIdx;
                      const hasAnswered = userAnswers[currentQuizIdx] !== undefined;
                      const isCorrect = optIdx === QUIZ_QUESTIONS[currentQuizIdx].correctAnswer;

                      let btnStyle = 'bg-neutral-50 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:border-neutral-400 dark:hover:border-neutral-600';

                      if (hasAnswered) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-400 font-semibold';
                        } else if (isSelected) {
                          btnStyle = 'bg-rose-500/10 border-rose-500 text-rose-700 dark:text-rose-400';
                        } else {
                          btnStyle = 'opacity-40 border-transparent text-neutral-400';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          disabled={hasAnswered}
                          onClick={() => handleSelectQuizAnswer(optIdx)}
                          className={`w-full text-left p-2.5 rounded-xl border text-xs leading-relaxed transition-all cursor-pointer flex items-start gap-2 ${btnStyle}`}
                        >
                          <span className="w-5 h-5 rounded-md bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-mono text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="flex-1">{option}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation feedback */}
                  {userAnswers[currentQuizIdx] !== undefined && (
                    <div className="p-3 rounded-xl bg-[#B08D57]/10 border border-[#B08D57]/20 text-xs text-neutral-700 dark:text-neutral-300 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#B08D57] flex-shrink-0 mt-0.5" />
                      <p className="leading-relaxed">
                        <strong className="text-neutral-900 dark:text-neutral-100 font-semibold">Explication : </strong>
                        {QUIZ_QUESTIONS[currentQuizIdx].explanation}
                      </p>
                    </div>
                  )}

                  {/* Stepper Controls */}
                  <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800">
                    <button
                      type="button"
                      disabled={currentQuizIdx === 0}
                      onClick={() => setCurrentQuizIdx((prev) => prev - 1)}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      ← Précédent
                    </button>

                    <div className="flex items-center gap-2">
                      {currentQuizIdx < QUIZ_QUESTIONS.length - 1 ? (
                        <button
                          type="button"
                          onClick={() => setCurrentQuizIdx((prev) => prev + 1)}
                          className="px-4 py-1.5 rounded-lg text-xs font-mono font-semibold bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:opacity-90 transition-all cursor-pointer"
                        >
                          Suivant →
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setQuizFinished(true)}
                          className="px-4 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#B08D57] text-neutral-950 hover:bg-[#9c7b48] transition-all shadow-sm cursor-pointer"
                        >
                          Voir le Bilan Final ✓
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Result View */
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] mx-auto flex items-center justify-center font-serif text-2xl font-bold">
                    {calculateScore()} / {QUIZ_QUESTIONS.length}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-serif font-bold text-neutral-900 dark:text-neutral-100">
                      {calculateScore() >= 4
                        ? "Félicitations ! Histoire Horlogère Suisse Validée."
                        : "Bon travail ! Quelques révisions historiques conseillées."}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
                      {calculateScore() >= 4
                        ? "Vous maîtrisez les grandes époques fondatrices, l'impact de Calvin, l'établissage jurassien, le Tourbillon de Breguet et l'urbanisme UNESCO."
                        : "Prenez le temps de relire la frise chronologique et les innovations révolutionnaires avant de poursuivre."}
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentQuizIdx(0);
                        setQuizFinished(false);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                    >
                      Revoir mes réponses
                    </button>

                    <button
                      type="button"
                      onClick={resetQuiz}
                      className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-[#B08D57] text-neutral-950 hover:bg-[#9c7b48] transition-all cursor-pointer shadow-sm"
                    >
                      Recommencer le quiz
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* =================================================================== */}
          {/* NAVIGATION INTER-MODULES */}
          {/* =================================================================== */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-neutral-200 dark:border-neutral-800">
            <Link
              href="/theorie"
              className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← Sommaire Général de la Théorie</span>
            </Link>

            <Link
              href="/theorie/introduction-montre-mecanique"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:opacity-90 transition-opacity shadow-sm"
            >
              <span>Module 01 : Introduction à la Montre Mécanique</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* =================================================================== */}
          {/* GRAND FOOTER HAUTE HORLOGERIE */}
          {/* =================================================================== */}
          <footer className="mt-16 pt-12 pb-8 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-sm text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                  <span>🇨🇭</span>
                  <span>Haute Horlogerie Suisse</span>
                </h4>
                <p className="leading-relaxed text-[11px]">
                  La référence absolue et mondiale de l&apos;art mécanique et de la haute précision depuis plus de 500 ans de transmission artisanale continue.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-serif font-bold text-sm text-neutral-900 dark:text-neutral-100">
                  Valeurs Fondamentales
                </h4>
                <ul className="space-y-1.5 text-[11px]">
                  <li>• Précision Chronométrique COSC & METAS</li>
                  <li>• Bienfacture & Anglage Manuel</li>
                  <li>• Tradition Séculaire Jurassienne</li>
                  <li>• Innovation Continue en Matériaux Rares</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-serif font-bold text-sm text-neutral-900 dark:text-neutral-100">
                  Grandes Manufactures
                </h4>
                <ul className="space-y-1.5 text-[11px]">
                  <li>• Patek Philippe (Genève)</li>
                  <li>• Audemars Piguet (Le Brassus)</li>
                  <li>• Vacheron Constantin (Genève)</li>
                  <li>• Jaeger-LeCoultre (Le Sentier)</li>
                  <li>• Omega (Bienne) & Rolex (Genève)</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-serif font-bold text-sm text-neutral-900 dark:text-neutral-100">
                  Savoir-Faire Mondial
                </h4>
                <p className="leading-relaxed text-[11px]">
                  Classé au patrimoine immatériel de l&apos;UNESCO, l&apos;art horloger suisse et la mécanique d&apos;art incarnent l&apos;apogée de l&apos;ingénierie et de l&apos;élégance perpétuelle.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 text-center font-mono text-[10px] text-neutral-400">
              © HorloLearn — Espace Théorie Horlogère Suisse • Tous droits réservés
            </div>
          </footer>

        </main>
      </div>
    </>
  );
}
