"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  Compass,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Activity,
  Award,
  Sparkles,
  MapPin,
  Search,
  SlidersHorizontal,
  X,
  Crown,
  Building2,
  Landmark,
  ArrowRight,
  ArrowLeft
} from "lucide-react";

interface Horloger {
  id: string;
  nom: string;
  anneeFondation: string;
  periode: string; // "xviii", "xix", "xx"
  periodeLabel: string;
  ville: string;
  canton: string;
  bio: string;
  innovationMajeure: string;
  impactAtelier: string;
  citation?: string;
  imageUrl: string;
}

const HORLOGERS_DATA: Horloger[] = [
  {
    id: "breguet",
    nom: "Abraham-Louis Breguet",
    anneeFondation: "1775",
    periode: "xviii",
    periodeLabel: "XVIIIe Siècle",
    ville: "Neuchâtel / Paris",
    canton: "Neuchâtel",
    bio: "Considéré universellement comme le plus grand génie de l'histoire horlogère. Né à Neuchâtel, il révolutionne la technique et l'esthétique classique : inventeur du Tourbillon (brevet 1801), du ressort spiral à courbe terminale Breguet, du système antichoc Pare-Chute (1790) et de la première montre-bracelet de l'histoire pour la reine de Naples (1810).",
    innovationMajeure: "Le Tourbillon (1801) & la Courbe terminale du Spiral Breguet",
    impactAtelier: "Les équations de Phillips et la courbe Breguet restent la référence absolue de l'isochronisme en haute horlogerie.",
    citation: "« J'ai réussi à compenser par le mouvement circulaire de la cage les anomalies provenant des positions diverses du centre de gravité. »",
    imageUrl: "/images/horlogers/breguet.jpg"
  },
  {
    id: "perrelet",
    nom: "Abraham-Louis Perrelet",
    anneeFondation: "1770",
    periode: "xviii",
    periodeLabel: "XVIIIe Siècle",
    ville: "Le Locle",
    canton: "Neuchâtel",
    bio: "Maître horloger émérite du Locle, Perrelet invente en 1770 la montre à secousses automatique. En intégrant une masse oscillante intérieure munie de butées élastiques, la montre s'arme toute seule au rythme de la marche du porteur. Il est également l'inventeur du podomètre moderne.",
    innovationMajeure: "La Montre à Remontage Automatique à Secousses (1770)",
    impactAtelier: "Père fondateur du principe du rotor automatique à 360° qui équipe aujourd'hui plus de 80% des montres mécaniques mondiales.",
    citation: "« Une montre perpétuelle qui puise sa force dans les simples mouvements du corps humain. »",
    imageUrl: "/images/horlogers/perrelet.jpg"
  },
  {
    id: "lecoultre",
    nom: "Antoine LeCoultre",
    anneeFondation: "1833",
    periode: "xix",
    periodeLabel: "XIXe Siècle",
    ville: "Le Sentier, Vallée de Joux",
    canton: "Vaud",
    bio: "Artisan autodidacte visionnaire de la Vallée de Joux, il fonde la manufacture qui deviendra Jaeger-LeCoultre. En 1844, il invente le « Millionomètre », le premier instrument de mesure mécanique au monde capable d'évaluer le micromètre (millième de millimètre), propulsant l'horlogerie dans l'ère de l'interchangeabilité absolue.",
    innovationMajeure: "Le Millionomètre (1844) & le Système de Remontoir à Bascule (1847)",
    impactAtelier: "A permis la standardisation microscopique des pignons et a fait de la Vallée de Joux la Mecque des calibres compliqués.",
    citation: "« La précision ne se devine pas, elle se mesure au millième de millimètre. »",
    imageUrl: "/images/horlogers/lecoultre.jpg"
  },
  {
    id: "patek",
    nom: "Antoni Patek & Adrien Philippe",
    anneeFondation: "1839",
    periode: "xix",
    periodeLabel: "XIXe Siècle",
    ville: "Genève",
    canton: "Genève",
    bio: "Rencontre historique entre l'aristocrate polonais Antoni Patek et l'ingénieux horloger français Adrien Philippe, inventeur en 1842 du système de remontoir et de mise à l'heure au pendant sans clé. Fournisseurs des cours royales (Reine Victoria) et dépositaires d'une tradition ininterrompue de très haute complication.",
    innovationMajeure: "Remontoir et Mise à l'Heure par la Couronne (sans clé) & Balancier Gyromax",
    impactAtelier: "Suppression définitive des clés de montre ; création des montres à répétition minutes et quantième perpétuel les plus réputées au monde.",
    citation: "« Jamais vous ne posséderez complètement une Patek Philippe, vous en êtes juste le gardien pour les générations futures. »",
    imageUrl: "/images/horlogers/patek.jpg"
  },
  {
    id: "tissot",
    nom: "Charles-Félicien & Charles-Émile Tissot",
    anneeFondation: "1853",
    periode: "xix",
    periodeLabel: "XIXe Siècle",
    ville: "Le Locle",
    canton: "Neuchâtel",
    bio: "Père et fils créent au Locle un comptoir d'établissage audacieux qui s'impose rapidement comme pionnier de l'exportation mondiale. Tissot conçoit en 1853 la toute première montre de poche de série à double fuseau horaire, puis conquiert la cour des Tsars de Russie avant d'innover avec la première montre amagnétique en 1930.",
    innovationMajeure: "Première Montre de Poche à Deux Fuseaux Horaires (1853) & Antimagnétisme (1930)",
    impactAtelier: "Démocratisation industrielle du savoir-faire suisse et mise au point de chaînes d'assemblage de haute précision.",
    citation: "« De notre atelier du Locle jusqu'aux confins du monde, porter le temps suisse avec fierté. »",
    imageUrl: "/images/horlogers/tissot.jpg"
  },
  {
    id: "heuer",
    nom: "Charles-Édouard Heuer",
    anneeFondation: "1860",
    periode: "xix",
    periodeLabel: "XIXe Siècle",
    ville: "Saint-Imier",
    canton: "Berne (Jura bernois)",
    bio: "Pionnier incontournable du chronométrage sportif et de la vitesse mécanique. En 1887, il brevète le fameux « pignon oscillant », une pièce maîtresse qui simplifie radicalement l'embrayage du chronographe et qui est toujours utilisée par les calibres contemporains majeurs (ETA 7750).",
    innovationMajeure: "Brevet du Pignon Oscillant (1887) & Chronographe de Bord Mikrograph au 1/100e",
    impactAtelier: "Architecture d'embrayage direct du chronographe moderne, omniprésente dans tous les ateliers de rhabillage.",
    citation: "« La maîtrise de la fraction de seconde sépare l'ordinaire de la légende. »",
    imageUrl: "/images/horlogers/heuer.jpg"
  },
  {
    id: "favre-jacot",
    nom: "Georges Favre-Jacot",
    anneeFondation: "1865",
    periode: "xix",
    periodeLabel: "XIXe Siècle",
    ville: "Le Locle",
    canton: "Neuchâtel",
    bio: "À seulement 22 ans, ce jeune entrepreneur génial révolutionne à jamais l'horlogerie mondiale en créant la première « manufacture intégrée » sous verrières au Locle (la manufacture Zenith). En regroupant tous les métiers de l'ébauche sous un seul toit, il rationalise la production et remporte plus de 2'330 prix d'observatoire de chronométrie.",
    innovationMajeure: "Concept de Manufacture Horlogère Intégrée & Calibre El Primero 36'000 A/h",
    impactAtelier: "Remplacement de l'artisanat dispersé par l'unité de production industrielle moderne, modèle repris dans le monde entier.",
    citation: "« Rassembler sous un même ciel de verre tous les talents pour atteindre le zénith de la précision. »",
    imageUrl: "/images/horlogers/favre-jacot.jpg"
  },
  {
    id: "audemars",
    nom: "Jules-Louis Audemars & Edward-Auguste Piguet",
    anneeFondation: "1875",
    periode: "xix",
    periodeLabel: "XIXe Siècle",
    ville: "Le Brassus, Vallée de Joux",
    canton: "Vaud",
    bio: "Deux amis d'enfance unissent leur génie au Brassus pour concevoir les garde-temps les plus compliqués de l'époque (répétitions minutes, chronographes à rattrapante, calendriers perpétuels). En 1972, Audemars Piguet crée avec Gérald Genta la Royal Oak, inventant le concept de montre de sport de luxe en acier.",
    innovationMajeure: "Montres de Haute Complication Ultra-Plates & Naissance de la Royal Oak (1972)",
    impactAtelier: "Excellence de l'anglage manuel des ponts et finitions haute horlogerie au sommet de la hiérarchie suisse.",
    citation: "« Pour briser les règles, il faut d'abord les maîtriser à la perfection. »",
    imageUrl: "/images/horlogers/audemars-piguet.png"
  },
  {
    id: "breitling",
    nom: "Léon Breitling",
    anneeFondation: "1884",
    periode: "xix",
    periodeLabel: "XIXe Siècle",
    ville: "Saint-Imier",
    canton: "Berne (Jura bernois)",
    bio: "Spécialiste exclusif des chronographes et des instruments scientifiques de bord. La manufacture invente le premier poussoir indépendant à 2h (1915), puis le second poussoir de remise à zéro en 1934, fixant définitivement la commande moderne du chronographe avant de créer la légendaire Navitimer à règle à calcul circulaire en 1952.",
    innovationMajeure: "Création des Deux Poussoirs Indépendants de Chronographe (1915 / 1934)",
    impactAtelier: "Standardisation ergonomique universelle des boîtes et des commandes de chronographe à deux poussoirs.",
    citation: "« Les instruments des pionniers qui ont conquis le ciel et les océans. »",
    imageUrl: "/images/horlogers/breitling.jpg"
  },
  {
    id: "wilsdorf",
    nom: "Hans Wilsdorf",
    anneeFondation: "1905",
    periode: "xx",
    periodeLabel: "XXe Siècle",
    ville: "Bienne / Genève",
    canton: "Genève / Berne",
    bio: "Fondateur visionnaire de Rolex et de Tudor. Il pressent dès 1905 l'avènement inéluctable de la montre-bracelet et dépose en 1926 le brevet de la boîte Oyster étanche (avec couronne vissée), prouvée par la traversée de la Manche de Mercedes Gleitze en 1927. En 1931, il met au point le rotor Perpetual à rotation bidirectionnelle 360°.",
    innovationMajeure: "Boîtier Oyster Étanche (1926) & Rotor Automatique Perpetual 360° (1931)",
    impactAtelier: "Généralisation des joints toriques, couronnes vissées hermétiques et normes de chronométrie moderne Superlative Chronometer.",
    citation: "« Une montre doit résister aux éléments et accompagner l'homme dans toutes ses conquêtes extrêmes. »",
    imageUrl: "/images/horlogers/wilsdorf.jpg"
  }
];

interface TimelineMilestone {
  year: string;
  century: string;
  title: string;
  location: string;
  keyActors: string;
  summary: string;
  technicalImpact: string;
  quote?: string;
}

const HISTORIC_TIMELINE_DATA: TimelineMilestone[] = [
  {
    year: "1541",
    century: "xvi",
    title: "L'Édit Somptuaire de Calvin & la Naissance de l'Horlogerie",
    location: "Genève",
    keyActors: "Jean Calvin & les Maîtres Orfèvres Genevois",
    summary: "À Genève, le réformateur Jean Calvin bannit strictement le port de bijoux et parures ostentatoires. Privés de débouchés, les orfèvres et joailliers genevois convertissent leur savoir-faire de précision dans la fabrication de montres, considérées comme des objets scientifiques et d'utilité morale. En 1601 est fondée la première Corporation des Horlogers de Genève.",
    technicalImpact: "L'orfèvrerie et la gravure sur métaux précieux fusionnent pour donner naissance à la micro-mécanique d'art helvétique.",
    quote: "« La montre n'est point une parure coupable, mais un instrument probe qui rappelle à l'homme la fuite inexorable de ses heures terrestres. »"
  },
  {
    year: "1675",
    century: "xvii",
    title: "L'Invention du Ressort Spiral par Christian Huygens",
    location: "La Haye / Paris (Adopté immédiatement en Suisse)",
    keyActors: "Christian Huygens & Isaac Thuret",
    summary: "Avant 1675, le balancier oscillait librement sans force de rappel élastique (système foliot), engendrant des écarts de marche colossaux de 30 à 60 minutes par jour. Huygens invente le ressort spiral réglant : le balancier devient un oscillateur harmonique isochrone d'une régularité stupéfiante.",
    technicalImpact: "La précision passe d'une heure à quelques secondes par jour, rendant enfin possible l'apparition de l'aiguille des minutes et des secondes sur les cadrans.",
    quote: "« Le ressort spiral donne une âme propre et un battement harmonieux à la matière inerte. »"
  },
  {
    year: "1705",
    century: "xviii",
    title: "Daniel Jeanrichard & l'Établissage dans l'Arc Jurassien",
    location: "La Sagne / Le Locle / La Chaux-de-Fonds",
    keyActors: "Daniel Jeanrichard (1665-1741)",
    summary: "Durant les longs hivers glaciaux où la terre est gelée, Jeanrichard forme les familles montagnardes à fabriquer chacune un composant spécifique à la ferme (rouages, ressorts, ponts, boîtes). Ce mode d'organisation décentralisé et agile s'appelle « l'Établissage ». L'établisseur centralise les pièces au printemps pour l'assemblage et la vente.",
    technicalImpact: "Naissance de la formidable puissance industrielle de l'Arc Jurassien qui deviendra le premier producteur de montres au monde.",
    quote: "« Que chaque foyer de nos montagnes devienne un atelier de très haute précision. »"
  },
  {
    year: "1770",
    century: "xviii",
    title: "Abraham-Louis Perrelet & la Montre Automatique",
    location: "Le Locle (Montagnes Neuchâteloises)",
    keyActors: "Abraham-Louis Perrelet",
    summary: "Maître horloger au Locle, Perrelet crée la première montre de poche automatique à secousses. Équipée d'un poids oscillant intérieur monté sur ressorts d'amortissement, la montre s'arme toute seule lors de la marche de son propriétaire.",
    technicalImpact: "Ancêtre direct de la masse oscillante automatique moderne à 360° qui motorise l'horlogerie contemporaine.",
    quote: "« Une montre perpétuelle qui se remonte elle-même par le simple mouvement du corps en marchant. »"
  },
  {
    year: "1801",
    century: "xix",
    title: "Le Brevet Impérial du Tourbillon (7 Messidor an IX)",
    location: "Neuchâtel / Paris",
    keyActors: "Abraham-Louis Breguet",
    summary: "Breguet dépose le brevet d'un mécanisme révolutionnaire enfermant le balancier, le spiral et l'échappement dans une cage mobile tournant à 1 tour/minute. Cette giration continue brasse les positions verticales et neutralise les altérations de marche dues à la gravité terrestre.",
    technicalImpact: "Le Tourbillon devient le symbole suprême de la virtuosité technique et de la noblesse chronométrique suisse.",
    quote: "« J'ai réussi à compenser par le mouvement circulaire de la cage les anomalies provenant des positions diverses du centre de gravité. »"
  },
  {
    year: "1865",
    century: "xix",
    title: "Georges Favre-Jacot Fonde la Première Manufacture Moderne",
    location: "Le Locle",
    keyActors: "Georges Favre-Jacot (Zenith)",
    summary: "À 22 ans, Favre-Jacot rompt avec l'artisanat dispersé en bâtissant de vastes ateliers illuminés de verrières au Locle. Il regroupe sous un même toit tous les corps de métiers de l'ébauche, standardise l'outillage et invente la manufacture moderne.",
    technicalImpact: "Interchangeabilité industrielle absolue des composants et suprématie dans les concours d'observatoire chronométrique.",
    quote: "« Rassembler tous les métiers du temps sous le soleil du Locle pour atteindre l'absolu de la précision. »"
  },
  {
    year: "1926",
    century: "xx",
    title: "L'Oyster de Rolex & la Victoire de l'Étanchéité",
    location: "Bienne / Genève",
    keyActors: "Hans Wilsdorf & Mercedes Gleitze",
    summary: "Rolex brevète la boîte Oyster, premier boîtier monobloc étanche à l'eau et à la poussière grâce à son fond et sa couronne vissés hermétiques. Le 7 octobre 1927, Mercedes Gleitze traverse la Manche à la nage avec la montre au cou : après plus de 10 heures d'immersion dans l'eau glacée, la montre fonctionne parfaitement.",
    technicalImpact: "Naissance de la montre-bracelet sportive moderne et généralisation des standards d'étanchéité sous-marine.",
    quote: "« Après plus de 10 heures d'immersion dans l'eau glaciale de la Manche, la montre conservait une précision parfaite. »"
  },
  {
    year: "1969",
    century: "xx",
    title: "L'Année Mythique : El Primero & la Déferlante du Quartz",
    location: "Le Locle / Tokyo",
    keyActors: "Zenith Manufacture, Charles Vermot & Seiko",
    summary: "Le 10 janvier 1969, Zenith présente El Primero, premier chronographe automatique au monde battant à la haute fréquence de 36'000 A/h (mesure au 1/10e de seconde). Mais fin 1969, la montre à quartz japonaise déclenche la crise la plus dévastatrice de l'histoire horlogère suisse (les effectifs passent de 90'000 à 30'000 artisans).",
    technicalImpact: "L'horloger Charles Vermot sauve héroïquement le patrimoine en cachant clandestinement les étampes et plans du mouvement El Primero dans les greniers de la manufacture pour empêcher leur destruction.",
    quote: "« On ne détruit pas le travail de toute une vie et le génie des anciens. »"
  },
  {
    year: "1983",
    century: "xx",
    title: "La Renaissance Héroïque Suisse & la Révolution Swatch",
    location: "Bienne / Neuchâtel",
    keyActors: "Nicolas G. Hayek & Ernst Thomke",
    summary: "Nicolas G. Hayek lance la Swatch (montre en plastique suisse ultra-précise composée de seulement 51 pièces soudées aux ultrasons). Le succès commercial planétaire foudroyant de la Swatch génère les capitaux nécessaires pour sauver, regrouper (Swatch Group) et relancer les joyaux mécaniques historiques (Omega, Blancpain, Breguet).",
    technicalImpact: "Résurrection mondiale de la passion pour la haute horlogerie mécanique traditionnelle suisse.",
    quote: "« La Suisse ne vend pas seulement un instrument pour lire l'heure, elle vend une part d'éternité et d'émotion humaine. »"
  },
  {
    year: "XXIe Siècle",
    century: "xxi",
    title: "L'Ère du Silicium & la Haute Horlogerie du Futur",
    location: "CSEM Neuchâtel / Genève / Vallée de Joux",
    keyActors: "CSEM, Patek Philippe, Rolex, Breguet, Ulysse Nardin",
    summary: "L'introduction du Silicium monocristallin (DRIE) dans les spiraux et roues d'échappement élimine le besoin de lubrification sur les palettes et rend les calibres totalement insensibles aux champs magnétiques des smartphones et ordinateurs.",
    technicalImpact: "Précision chronométrique supérieure, réserves de marche de 70h à 14 jours, et consécration du label Swiss Made au sommet du luxe mondial.",
    quote: "« L'alliance suprême entre la patience séculaire de l'établi et la physique quantique des semi-conducteurs. »"
  }
];

interface CradleRegion {
  name: string;
  canton: string;
  title: string;
  description: string;
  iconicBrands: string[];
  unescoBadge?: string;
}

const CRADLES_DATA: CradleRegion[] = [
  {
    name: "Genève & les Cabinotiers",
    canton: "Genève",
    title: "Le Berceau Historique & la Haute Joaillerie",
    description: "Dès le XVIe siècle sous Calvin, Genève devient le foyer des maîtres cabinotiers qui travaillaient dans les « cabinets » sous les toits pour capter la lumière limpide du nord. C'est la capitale du Poinçon de Genève (loi cantonale de 1886 certifiant la perfection des finitions manuelles).",
    iconicBrands: ["Patek Philippe", "Vacheron Constantin", "Rolex", "Chopard", "F.P. Journe"]
  },
  {
    name: "La Chaux-de-Fonds & Le Locle",
    canton: "Neuchâtel",
    title: "L'Urbanisme Horloger (Patrimoine Mondial UNESCO)",
    description: "Villes jumelles d'altitude entièrement conçues au XIXe siècle pour et par l'horlogerie après de gigantesques incendies. Les rues rectilignes et les façades ont été calculées pour apporter un ensoleillement maximal aux ateliers familiaux d'horlogers.",
    iconicBrands: ["Zenith", "Tissot", "Ulysse Nardin", "Girard-Perregaux", "TAG Heuer"],
    unescoBadge: "Inscrit à l'UNESCO en 2009"
  },
  {
    name: "La Vallée de Joux",
    canton: "Vaud",
    title: "Le Sanctuaire des Grandes Complications",
    description: "Nichée à 1'000 mètres d'altitude, cette vallée austère et magique est le sanctuaire mondial des complications reines : répétitions minutes, tourbillons, calendriers perpétuels et chronographes à rattrapante. L'anglage manuel y atteint des sommets inégalés.",
    iconicBrands: ["Audemars Piguet", "Jaeger-LeCoultre", "Breguet", "Blancpain", "Philippe Dufour"]
  },
  {
    name: "Bienne & le Jura Bernois",
    canton: "Berne",
    title: "La Métropole Industrielle & la Haute Précision",
    description: "Bienne est la plus grande ville horlogère bilingue au monde. Elle abrite les sièges mondiaux de Rolex (manufacture des mouvements), d'Omega et de la holding Swatch Group, combinant gigantisme technologique et certification METAS.",
    iconicBrands: ["Rolex (Bienne)", "Omega", "Longines (Saint-Imier)", "Breitling", "Swatch Group"]
  }
];

interface OldestManufacture {
  brand: string;
  foundationYear: string;
  founder: string;
  city: string;
  recordBadge: string;
}

const OLDEST_MANUFACTURES: OldestManufacture[] = [
  {
    brand: "Blancpain",
    foundationYear: "1735",
    founder: "Jehan-Jacques Blancpain",
    city: "Villeret (Jura bernois)",
    recordBadge: "Plus ancienne marque horlogère enregistrée au monde"
  },
  {
    brand: "Vacheron Constantin",
    foundationYear: "1755",
    founder: "Jean-Marc Vacheron",
    city: "Genève",
    recordBadge: "Plus ancienne manufacture en activité ininterrompue depuis sa fondation"
  },
  {
    brand: "Breguet",
    foundationYear: "1775",
    founder: "Abraham-Louis Breguet",
    city: "Paris / Vallée de Joux",
    recordBadge: "Père spirituel de la haute horlogerie et inventeur du Tourbillon"
  },
  {
    brand: "Patek Philippe",
    foundationYear: "1839",
    founder: "Antoni Patek & Adrien Philippe",
    city: "Genève",
    recordBadge: "Référence universelle absolue des grandes complications de collection"
  }
];

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "1. Quel événement historique majeur survenu à Genève en 1541 est considéré comme le point de départ de l'horlogerie suisse ?",
    options: [
      "La création du premier chronomètre de marine par l'Observatoire de Genève",
      "L'Édit somptuaire de Jean Calvin interdisant le port de bijoux, contraignant les orfèvres à se reconvertir dans la montre",
      "La découverte de gisements de quartz dans le canton du Valais",
      "Le rachat des manufactures genevoises par la couronne d'Angleterre"
    ],
    correctAnswer: 1,
    explanation: "En 1541, le réformateur protestant Jean Calvin bannit les bijoux et ornements ostentatoires à Genève. Privés de leur gagne-pain, les maîtres orfèvres et émailleurs genevois unissent leur talent aux réfugiés huguenots français et mettent leur immense savoir-faire au service de la montre, considérée comme un objet utile et moral. En 1601 naît la première corporation horlogère au monde."
  },
  {
    question: "2. Qu'appelle-t-on le système de « l'établissage » structuré par Daniel Jeanrichard dans les montagnes neuchâteloises au début du XVIIIe siècle ?",
    options: [
      "L'obligation légale pour chaque apprenti d'acheter son propre établi d'ébénisterie",
      "Une organisation décentralisée où les familles paysannes fabriquent chacune à domicile un composant précis durant l'hiver avant assemblage central",
      "Une taxe douanière imposée sur les montres exportées vers la France",
      "Une technique de trempe des aciers dans l'huile de lin"
    ],
    correctAnswer: 1,
    explanation: "L'établissage est la grande innovation sociale et logistique jurassienne. Durant les rudes mois d'hiver où la terre était gelée, Daniel Jeanrichard forma les paysans des fermes isolées à fabriquer un composant spécifique (roues, ressorts, ponts, boîtes). L'établisseur centralisait ensuite les pièces au printemps pour le finissage et la commercialisation, créant une puissance de production inégalée."
  },
  {
    question: "3. Quelle invention majeure Abraham-Louis Breguet a-t-il brevetée en 1801 pour neutraliser les effets néfastes de la pesanteur ?",
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
    explanation: "Le 7 octobre 1927, la jeune nageuse britannique Mercedes Gleitze traverse la Manche à la nage avec une Rolex Oyster au cou. Après plus de 10 heures d'immersion dans les eaux glaciales, la montre ressortit intacte avec une précision chronométrique parfaite, prouvant au monde entier l'efficacité révolutionnaire du boîtier étanche et de la couronne vissée."
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

export default function HistoireHorlogerieSuissePage() {
  const [activeCentury, setActiveCentury] = useState<string>("all");
  const [selectedHorloger, setSelectedHorloger] = useState<Horloger | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Quiz State
  const [currentQuizIdx, setCurrentQuizIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Filter horlogers
  const filteredHorlogers = useMemo(() => {
    return HORLOGERS_DATA.filter((h) => {
      const matchEra = activeCentury === "all" || h.periode === activeCentury;
      const matchQuery =
        searchQuery.trim() === "" ||
        h.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.ville.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.innovationMajeure.toLowerCase().includes(searchQuery.toLowerCase());
      return matchEra && matchQuery;
    });
  }, [activeCentury, searchQuery]);

  // Quiz handlers
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
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

        {/* =================================================================== */}
        {/* HERO HEADER */}
        {/* =================================================================== */}
        <section className="space-y-4 text-center sm:text-left border-b border-neutral-200 dark:border-neutral-800 pb-8">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#B08D57]/15 text-[#8A6A3B] dark:text-[#D4B483] border border-[#B08D57]/30">
              🇨🇭 Patrimoine Mondial UNESCO
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-neutral-200/80 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300">
              Module 14 — Histoire &amp; Patrimoine
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-neutral-200/80 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300">
              SEFRI · Convention Patronale CPIH
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-neutral-200/80 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300">
              Label Swiss Made
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
              La Grande Épopée de l&apos;Horlogerie Suisse
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              Une vitrine muséale d&apos;exception célébrant cinq siècles de génie, d&apos;ingéniosité montagnarde et de persévérance helvétique : des orfèvres calvinistes de 1541 aux manufactures intégrées de l&apos;Arc Jurassien et à la haute horlogerie contemporaine.
            </p>
          </div>

          {/* Key Heritage Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center space-y-0.5">
              <span className="text-2xl font-serif font-bold text-[#8A6A3B] dark:text-[#D4B483]">1541</span>
              <span className="text-[11px] font-mono text-neutral-500 block uppercase">Naissance à Genève</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center space-y-0.5">
              <span className="text-2xl font-serif font-bold text-[#8A6A3B] dark:text-[#D4B483]">2009</span>
              <span className="text-[11px] font-mono text-neutral-500 block uppercase">Patrimoine UNESCO</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center space-y-0.5">
              <span className="text-2xl font-serif font-bold text-[#8A6A3B] dark:text-[#D4B483]">N°1</span>
              <span className="text-[11px] font-mono text-neutral-500 block uppercase">Exportateur Mondial</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center space-y-0.5">
              <span className="text-2xl font-serif font-bold text-[#8A6A3B] dark:text-[#D4B483]">500+</span>
              <span className="text-[11px] font-mono text-neutral-500 block uppercase">Ans de Savoir-Faire</span>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 1: LA VITRINE DES PÈRES FONDATEURS & MAÎTRES HORLOGERS */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B08D57]">
                Galerie des Maîtres d&apos;Établi
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold">
                Les Pères Fondateurs de l&apos;Horlogerie Helvétique
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-500">
              Portraits historiques authentiques &amp; innovations majeures
            </span>
          </div>

          {/* Filter Bar & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: "all", label: "Tous les Maîtres" },
                { id: "xviii", label: "XVIIIe (Pionniers)" },
                { id: "xix", label: "XIXe (Manufactures)" },
                { id: "xx", label: "XXe (Ère Moderne)" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCentury(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                    activeCentury === tab.id
                      ? "bg-[#B08D57] text-neutral-950 font-bold shadow-sm"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher par nom, ville, brevet..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg text-xs font-mono bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 w-full sm:w-64 focus:outline-none focus:border-[#B08D57]"
              />
            </div>
          </div>

          {/* Horlogers Photo Showcase Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredHorlogers.map((horloger) => (
              <div
                key={horloger.id}
                onClick={() => setSelectedHorloger(horloger)}
                className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm hover:border-[#B08D57]/60 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Portrait Container */}
                  <div className="relative w-full h-56 bg-neutral-100 dark:bg-neutral-950 overflow-hidden border-b border-neutral-100 dark:border-neutral-800">
                    <img
                      src={horloger.imageUrl}
                      alt={horloger.nom}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-80" />

                    <div className="absolute bottom-3 left-3 right-3 text-white space-y-0.5">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#D4B483] font-bold">
                        {horloger.periodeLabel} · Fondé en {horloger.anneeFondation}
                      </div>
                      <h3 className="font-serif font-bold text-lg text-white leading-tight">
                        {horloger.nom}
                      </h3>
                      <div className="flex items-center gap-1 text-[11px] font-mono text-neutral-300">
                        <MapPin className="w-3 h-3 text-[#B08D57]" />
                        <span>{horloger.ville}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-3">
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                      {horloger.bio}
                    </p>

                    <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800 text-[11px] font-mono space-y-0.5">
                      <strong className="text-neutral-900 dark:text-neutral-100 block">
                        Innovation Majeure :
                      </strong>
                      <span className="text-[#8A6A3B] dark:text-[#D4B483] font-semibold">
                        {horloger.innovationMajeure}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-1 flex items-center justify-between text-[11px] font-mono text-neutral-400 border-t border-neutral-100 dark:border-neutral-800/80">
                  <span>En savoir plus</span>
                  <ChevronRight className="w-4 h-4 text-[#B08D57] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================================== */}
        {/* HORLOGER DETAIL MODAL POPUP */}
        {/* =================================================================== */}
        {selectedHorloger && (
          <div
            className="fixed inset-0 z-50 bg-neutral-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setSelectedHorloger(null)}
          >
            <div
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#B08D57]/40 shrink-0">
                    <img
                      src={selectedHorloger.imageUrl}
                      alt={selectedHorloger.nom}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#8A6A3B] dark:text-[#D4B483] font-bold uppercase block">
                      {selectedHorloger.periodeLabel} · {selectedHorloger.canton}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-neutral-950 dark:text-neutral-50">
                      {selectedHorloger.nom}
                    </h3>
                    <div className="text-xs font-mono text-neutral-500 mt-0.5">
                      Fondation : {selectedHorloger.anneeFondation} · {selectedHorloger.ville}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedHorloger(null)}
                  className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                <p>{selectedHorloger.bio}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1">
                  <strong className="text-neutral-400 uppercase text-[10px] block">Brevet &amp; Invention Clé</strong>
                  <span className="text-neutral-900 dark:text-neutral-100 font-bold block">
                    {selectedHorloger.innovationMajeure}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1">
                  <strong className="text-neutral-400 uppercase text-[10px] block">Héritage Technique sur l&apos;Établi</strong>
                  <span className="text-[#8A6A3B] dark:text-[#D4B483] font-bold block">
                    {selectedHorloger.impactAtelier}
                  </span>
                </div>
              </div>

              {selectedHorloger.citation && (
                <div className="p-4 rounded-xl bg-[#B08D57]/5 border-l-4 border-[#B08D57] text-xs italic text-neutral-700 dark:text-neutral-300 font-serif">
                  {selectedHorloger.citation}
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedHorloger(null)}
                  className="px-5 py-2 rounded-xl text-xs font-mono font-bold bg-[#B08D57] text-neutral-950 hover:bg-[#9c7b48] transition-colors cursor-pointer"
                >
                  Fermer la fiche
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* SECTION 2: LA GRANDE FRISE CHRONOLOGIQUE MUSÉALE (1541 - AUJOURD'HUI) */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B08D57]">
                Chronologie Vivante
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold">
                L&apos;Épopée Helvétique du Temps : Cinq Siècles de Jalons Majeurs
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-500">
              10 Événements Fondateurs
            </span>
          </div>

          {/* Timeline Connector Container */}
          <div className="relative pl-6 sm:pl-8 border-l-2 border-[#B08D57]/40 space-y-8 my-4">
            {HISTORIC_TIMELINE_DATA.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Gold Milestone Pill on Vertical Line */}
                <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-[#B08D57] border-4 border-neutral-50 dark:border-neutral-950 shadow-md flex items-center justify-center text-[10px] text-neutral-950 font-bold" />

                {/* Milestone Card */}
                <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4 hover:border-[#B08D57]/60 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-[#8A6A3B] dark:text-[#D4B483]">
                      {item.year}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                      <MapPin className="w-3.5 h-3.5 text-[#B08D57]" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-neutral-950 dark:text-neutral-50">
                      {item.title}
                    </h3>
                    <div className="text-xs font-mono text-neutral-500">
                      Figures clés : {item.keyActors}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {item.summary}
                  </p>

                  <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800 text-xs font-mono space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#8A6A3B] dark:text-[#D4B483] flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5" />
                      <span>Héritage Technique sur l&apos;Établi Moderne :</span>
                    </span>
                    <p className="text-neutral-800 dark:text-neutral-200 font-medium">
                      {item.technicalImpact}
                    </p>
                  </div>

                  {item.quote && (
                    <div className="pt-2 text-xs italic text-neutral-500 font-serif border-t border-neutral-100 dark:border-neutral-800">
                      {item.quote}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 3: LES 4 BERCEAUX HORLOGERS & URBANISME UNESCO */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B08D57]">
              Géographie Horlogère Helvétique
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold">
              L&apos;Arc Jurassien : Les 4 Berceaux de la Haute Précision
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CRADLES_DATA.map((cradle, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-[#B08D57]/15 text-[#8A6A3B] dark:text-[#D4B483]">
                      Canton de {cradle.canton}
                    </span>
                    {cradle.unescoBadge && (
                      <span className="px-2.5 py-1 rounded text-[11px] font-mono font-bold bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                        {cradle.unescoBadge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-lg text-neutral-950 dark:text-neutral-50">
                      {cradle.name}
                    </h3>
                    <div className="text-xs font-mono text-[#8A6A3B] dark:text-[#D4B483] mt-0.5">
                      {cradle.title}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {cradle.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 space-y-1.5">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block">
                    Manufactures Emblématiques :
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cradle.iconicBrands.map((brand, bIdx) => (
                      <span
                        key={bIdx}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 4: LES DOYENNES DE L'ART HORLOGER SUISSE */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B08D57]">
              Patrimoine Ininterrompu
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold">
              Les Doyennes de l&apos;Art Horloger Suisse
            </h2>
            <p className="text-xs text-neutral-500">
              Des manufactures pluriséculaires perpétuant sans discontinuer les plus hauts gestes d&apos;art
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {OLDEST_MANUFACTURES.map((mfg, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm text-center flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="text-2xl font-serif font-bold text-[#8A6A3B] dark:text-[#D4B483]">
                    {mfg.foundationYear}
                  </div>
                  <h3 className="font-serif font-bold text-base text-neutral-950 dark:text-neutral-50">
                    {mfg.brand}
                  </h3>
                  <div className="text-[11px] font-mono text-neutral-500">
                    {mfg.city}
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800 text-[10px] font-mono text-neutral-600 dark:text-neutral-400">
                  {mfg.recordBadge}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 5: COMPACT STEPPER QUIZ (SWISS EXAM FORMAT) */}
        {/* =================================================================== */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B08D57]">
                Évaluation Certifiée
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold">
                Quiz de Validation Historique (Format Examen Suisse)
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-500">
              5 Questions · Réponse unique
            </span>
          </div>

          {/* Compact Stepper Container */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 sm:p-6 shadow-sm">
            {!quizFinished ? (
              <div className="space-y-5">
                {/* Stepper Header with Pills & Score */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center gap-1.5">
                    {QUIZ_QUESTIONS.map((_, qIdx) => {
                      const isCurrent = currentQuizIdx === qIdx;
                      const isAnswered = userAnswers[qIdx] !== undefined;
                      const isCorrect = userAnswers[qIdx] === QUIZ_QUESTIONS[qIdx].correctAnswer;

                      let pillStyle = "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 border-neutral-200 dark:border-neutral-700";
                      if (isAnswered) {
                        pillStyle = isCorrect
                          ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 font-bold"
                          : "bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30 font-bold";
                      } else if (isCurrent) {
                        pillStyle = "bg-[#B08D57] text-neutral-950 font-bold border-[#B08D57]";
                      }

                      return (
                        <button
                          key={qIdx}
                          type="button"
                          onClick={() => setCurrentQuizIdx(qIdx)}
                          className={`w-7 h-7 rounded-lg text-xs font-mono border transition-all cursor-pointer flex items-center justify-center ${pillStyle}`}
                        >
                          {qIdx + 1}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md font-mono font-bold text-xs bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] border border-[#B08D57]/20">
                      Question {currentQuizIdx + 1} / {QUIZ_QUESTIONS.length}
                    </span>
                    <span className="text-xs font-mono text-neutral-500 font-semibold">
                      Score : {calculateScore()} / {Object.keys(userAnswers).length}
                    </span>
                  </div>
                </div>

                {/* Question Title */}
                <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-100 leading-snug">
                  {QUIZ_QUESTIONS[currentQuizIdx].question}
                </h3>

                {/* Options Grid (2x2) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {QUIZ_QUESTIONS[currentQuizIdx].options.map((opt, optIdx) => {
                    const selected = userAnswers[currentQuizIdx];
                    const isSelected = selected === optIdx;
                    const isAnswered = selected !== undefined;
                    const isOptionCorrect = optIdx === QUIZ_QUESTIONS[currentQuizIdx].correctAnswer;

                    let btnStyle = "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-50/60 dark:bg-neutral-900/40 text-neutral-700 dark:text-neutral-300";

                    if (isAnswered) {
                      if (isOptionCorrect) {
                        btnStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-semibold";
                      } else if (isSelected) {
                        btnStyle = "border-rose-500 bg-rose-500/10 text-rose-800 dark:text-rose-300 font-semibold";
                      } else {
                        btnStyle = "opacity-50 border-neutral-200 dark:border-neutral-800";
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectQuizAnswer(optIdx)}
                        className={`p-3.5 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between gap-2 ${btnStyle}`}
                      >
                        <span className="leading-snug">{opt}</span>
                        {isAnswered && isOptionCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Box */}
                {userAnswers[currentQuizIdx] !== undefined && (
                  <div className={`p-3.5 rounded-xl text-xs leading-relaxed border ${
                    userAnswers[currentQuizIdx] === QUIZ_QUESTIONS[currentQuizIdx].correctAnswer
                      ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200"
                      : "bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-900/40 text-rose-900 dark:text-rose-200"
                  }`}>
                    <span className="font-bold block mb-0.5">
                      {userAnswers[currentQuizIdx] === QUIZ_QUESTIONS[currentQuizIdx].correctAnswer
                        ? "✓ Réponse exacte !"
                        : "✗ Explication historique :"}
                    </span>
                    {QUIZ_QUESTIONS[currentQuizIdx].explanation}
                  </div>
                )}

                {/* Stepper Controls */}
                <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800">
                  <button
                    type="button"
                    disabled={currentQuizIdx === 0}
                    onClick={() => setCurrentQuizIdx(prev => prev - 1)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    ← Précédent
                  </button>

                  <div className="flex items-center gap-2">
                    {currentQuizIdx < QUIZ_QUESTIONS.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentQuizIdx(prev => prev + 1)}
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
              /* Summary / Result View */
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] mx-auto flex items-center justify-center font-serif text-2xl font-bold">
                  {calculateScore()} / {QUIZ_QUESTIONS.length}
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-serif font-bold text-neutral-900 dark:text-neutral-100">
                    {calculateScore() >= 4
                      ? "Félicitations ! Histoire de l'Horlogerie Suisse Validée."
                      : "Bon travail ! Quelques révisions historiques conseillées."}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
                    {calculateScore() >= 4
                      ? "Vous maîtrisez les grandes époques fondatrices, l'impact de Calvin, l'établissage jurassien, le Tourbillon de Breguet et l'urbanisme UNESCO."
                      : "Prenez le temps de relire la frise chronologique et les fiches des maîtres horlogers avant de poursuivre."}
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
        {/* BOTTOM NAVIGATION BAR */}
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

      </main>
    </div>
  );
}
