'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Building2,
  Compass,
  Award,
  Clock,
  Layers,
  Filter
} from 'lucide-react';

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

  .gold-badge {
    color: #b08d57;
    background: rgba(176, 141, 87, 0.1);
    border: 1px solid rgba(176, 141, 87, 0.25);
  }

  .trinity-card {
    background: linear-gradient(180deg, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.02) 100%);
    border: 1px solid rgba(212,175,55,0.3);
  }
`;

const MANUFACTURES_DATA = [
  {
    "id": "patek-philippe",
    "name": "Patek Philippe",
    "year": "1839",
    "founder": "Antoine Norbert de Patek & Adrien Philippe",
    "location": "Plan-les-Ouates, Genève",
    "region": "geneve",
    "regionLabel": "Genève",
    "category": "Haute Horlogerie & Grandes Complications",
    "group": "Indépendant Familial (Famille Stern)",
    "motto": "« Jamais vous ne possédez complètement une Patek Philippe. Vous en êtes juste le gardien pour les générations futures. »",
    "seal": "Poinçon Patek Philippe (PP Seal)",
    "signatureCaliber": "Calibre 240 (Micro-rotor 22K) & Calibre 89 (33 complications)",
    "iconicModel": "Nautilus 5711, Calatrava 96, Grandmaster Chime 6300",
    "img": "/imgs/Patek_Philippe_Rose_Gold_Grand_Complications_Watch.jpg",
    "altImg": "/imgs/Patek-Philippe-Nautilus-Luxury-Swiss-Watch-Blue-Dial.jpg",
    "desc": "Symbole suprême de l'horlogerie aristocratique genevoise, Patek Philippe allie indépendance capitalistique totale et excellence artisanale. Ses pièces détiennent les records absolus aux enchères mondiales.",
    "keyInnovations": [
      "1845 : Invention du remontage et mise à l'heure sans clé par la couronne (Adrien Philippe)",
      "1868 : Réalisation de la première montre-bracelet pour la comtesse de Hongrie",
      "1989 : Calibre 89, montre de poche mécanique la plus compliquée du XXe siècle (33 complications)",
      "2005 : Première utilisation du silicium avec la roue d'échappement en Silinvar"
    ],
    "isHolyTrinity": true
  },
  {
    "id": "audemars-piguet",
    "name": "Audemars Piguet",
    "year": "1875",
    "founder": "Jules Louis Audemars & Edward Auguste Piguet",
    "location": "Le Brassus, Vallée de Joux (Vaud)",
    "region": "vallee-de-joux",
    "regionLabel": "Vallée de Joux",
    "category": "Haute Horlogerie d'Avant-Garde & Sport-Chic",
    "group": "Indépendant Familial (Familles fondatrices)",
    "motto": "« Pour briser les règles, il faut d'abord les maîtriser. »",
    "seal": "Haute Horlogerie du Brassus",
    "signatureCaliber": "Calibre 2120 (rotor périphérique) & Calibre 4401 (chronographe flyback)",
    "iconicModel": "Royal Oak 1972, Royal Oak Offshore, Code 11.59",
    "img": "/imgs/audemars_piguet_royal_oak_rose_gold_black_dial_luxury_swiss_watch.jpg",
    "altImg": "/imgs/audemars_piguet_royal_oak_skeleton_artistic.jpg",
    "desc": "Doyenne de la Vallée de Joux restée aux mains des familles fondatrices depuis 1875. Pionnière des sonneries, des quantièmes perpétuels et créatrice du segment sport-chic en acier de luxe.",
    "keyInnovations": [
      "1892 : Premier mouvement de montre-bracelet à répétition minutes au monde",
      "1972 : Lancement de la Royal Oak (design Gérald Genta), première montre de sport de luxe en acier",
      "1986 : Première montre-bracelet tourbillon automatique ultra-plate (Calibre 2870)",
      "2019 : Mécanisme ultra-plat de calendrier perpétuel automatique RD#2 (2,89 mm d'épaisseur)"
    ],
    "isHolyTrinity": true
  },
  {
    "id": "vacheron-constantin",
    "name": "Vacheron Constantin",
    "year": "1755",
    "founder": "Jean-Marc Vacheron & François Constantin",
    "location": "Plan-les-Ouates, Genève",
    "region": "geneve",
    "regionLabel": "Genève",
    "category": "Haute Horlogerie Historique & Métiers d'Art",
    "group": "Richemont Luxury Group",
    "motto": "« Faire mieux si possible, ce qui est toujours possible. »",
    "seal": "Poinçon de Genève (100% de la production mécanique)",
    "signatureCaliber": "Calibre 1731 (Répétition minutes ultra-plate) & Calibre 57260 (57 complications)",
    "iconicModel": "Patrimony, Overseas, Historiques 222, Les Cabinotiers",
    "img": "/imgs/Vacheron_Constantin_Tourbillon_Green_Dial_Luxury_Swiss_Watch.jpg",
    "altImg": "/imgs/vacheron_constantin_tourbillon_extraordinary.jpg",
    "desc": "La plus ancienne manufacture horlogère au monde en activité ininterrompue depuis 1755. Référence absolue pour ses Cabinotiers d'art, ses finitions main intégrales et son savoir-faire séculaire.",
    "keyInnovations": [
      "1755 : Jean-Marc Vacheron réalise la première montre avec coq de balancier ajouré",
      "1839 : Georges-Auguste Leschot standardise les pièces avec le pantographe",
      "1955 : Calibre 1003, mouvement mécanique manuel le plus plat du monde (1,64 mm)",
      "2015 : Référence 57260 avec 57 complications, montre la plus compliquée jamais conçue"
    ],
    "isHolyTrinity": true
  },
  {
    "id": "rolex",
    "name": "Rolex",
    "year": "1905",
    "founder": "Hans Wilsdorf",
    "location": "Les Acacias, Genève (Bienne pour les calibres)",
    "region": "geneve",
    "regionLabel": "Genève",
    "category": "Chronométrie de Haute Précision & Robustesse Extrême",
    "group": "Fondation Hans Wilsdorf (Organisation philanthropique)",
    "motto": "« Une couronne pour chaque exploit. »",
    "seal": "Chronomètre Superlatif (-2/+2 sec/jour après emboîtage)",
    "signatureCaliber": "Calibre 3135 / 3235 (Échappement Chronergy) & Calibre 4130 / 4131",
    "iconicModel": "Submariner, Daytona, Datejust, GMT-Master II, Day-Date",
    "img": "/imgs/rolex_submariner_gold_luxury_swiss_watch_product_photo.jpg",
    "altImg": "/imgs/rolex-submariner-date-luxury-watch-professional-studio.jpg",
    "desc": "La manufacture la plus influente et reconnue du monde. Pionnière absolue de l'étanchéité, du remontage automatique et des montres d'exploration extrême portées du sommet de l'Everest aux fosses abyssales.",
    "keyInnovations": [
      "1926 : Boîtier Oyster, premier boîtier de montre-bracelet étanche avec couronne vissée",
      "1931 : Rotor Perpetual, premier mécanisme automatique à rotation continue 360°",
      "1945 : Datejust, première montre automatique affichant la date dans un guichet à saut instantané",
      "1953 : Submariner, première montre de plongée étanche à 100 mètres (330 pieds)"
    ]
  },
  {
    "id": "jaeger-lecoultre",
    "name": "Jaeger-LeCoultre",
    "year": "1833",
    "founder": "Antoine LeCoultre & Edmond Jaeger",
    "location": "Le Sentier, Vallée de Joux (Vaud)",
    "region": "vallee-de-joux",
    "regionLabel": "Vallée de Joux",
    "category": "Haute Horlogerie Intégrée & Métiers Rares",
    "group": "Richemont Luxury Group",
    "motto": "« L'Horloger des Horlogers. »",
    "seal": "Contrôle 1 000 Heures (1 000 Hours Control)",
    "signatureCaliber": "Calibre 101 (plus petit mouvement mécanique au monde, 0,98 g) & Calibre 822",
    "iconicModel": "Reverso (1931), Polaris, Master Ultra Thin, Pendule Atmos",
    "img": "/imgs/jaeger_lecoultre_reverso_blue_dial_luxury_watch.jpg",
    "altImg": "/imgs/Jaeger-LeCoultre-Reverso-Green-Dial-Luxury-Swiss-Watch-Product-Shot.jpg",
    "desc": "Surnommée « La Grande Maison », elle a historiquement fourni des calibres d'exception à Patek Philippe, Audemars Piguet, Vacheron Constantin et Cartier. Elle maîtrise sous un même toit plus de 180 savoir-faire.",
    "keyInnovations": [
      "1844 : Invention du Millionomètre, premier instrument capable de mesurer le micron",
      "1928 : Pendule Atmos, fonctionnant sans intervention humaine grâce aux variations de température",
      "1929 : Calibre 101, plus petit calibre mécanique du monde depuis près d'un siècle",
      "1931 : La Reverso avec boîtier réversible à glissière pour protéger le verre lors du polo"
    ]
  },
  {
    "id": "omega",
    "name": "Omega",
    "year": "1848",
    "founder": "Louis Brandt",
    "location": "Bienne, Berne",
    "region": "arc-jurassien",
    "regionLabel": "Bienne & Arc Jurassien",
    "category": "Chronométrie Spatiale, Marine & Sportive",
    "group": "Swatch Group",
    "motto": "« Omega, le signe de l'excellence. »",
    "seal": "Master Chronometer METAS (15 000 gauss & 0/+5 s/j)",
    "signatureCaliber": "Calibre 321 (Chrono roue à colonnes) & Calibre Co-Axial Master Chronometer 8900",
    "iconicModel": "Speedmaster Professional Moonwatch, Seamaster Diver 300M, Constellation",
    "img": "/imgs/omega_speedmaster_professional_moonwatch_luxury_swiss_watch.jpg",
    "altImg": "/imgs/Omega_Seamaster_Chronograph_Luxury_Watch_White_Background.jpg",
    "desc": "Chronométreur officiel des Jeux Olympiques depuis 1932. Choisi par la NASA en 1965 après les tests les plus rigoureux de l'histoire aérospatiale, équipant Neil Armstrong et Buzz Aldrin sur la Lune en 1969.",
    "keyInnovations": [
      "1894 : Calibre 19 lignes « Omega », donnant son nom définitif à la marque pour sa perfection",
      "1957 : Lancement de la trilogie légendaire : Speedmaster, Seamaster 300 et Railmaster",
      "1969 : Première et unique montre portée sur la Lune par l'équipage d'Apollo 11",
      "1999 : Échappement Co-Axial George Daniels réduisant drastiquement les frottements"
    ]
  },
  {
    "id": "blancpain",
    "name": "Blancpain",
    "year": "1735",
    "founder": "Jehan-Jacques Blancpain",
    "location": "Le Brassus & Paudex, Vaud",
    "region": "vallee-de-joux",
    "regionLabel": "Vallée de Joux",
    "category": "Haute Horlogerie Traditionnelle & Marine",
    "group": "Swatch Group",
    "motto": "« Depuis 1735, il n'y a jamais eu de montre Blancpain à quartz. Et il n'y en aura jamais. »",
    "seal": "Manufacture de Haute Horlogerie du Brassus",
    "signatureCaliber": "Calibre 1315 (3 barillets, 120 heures de réserve de marche) & Calibre 6918B",
    "iconicModel": "Fifty Fathoms (1953), Villeret, Métiers d'Art Shakudō",
    "img": "/imgs/blancpain_fifty_fathoms_luxury_swiss_dive_watch_product_shot.jpg",
    "altImg": "/imgs/blancpain_fifty_fathoms_bathyscaphe_luxury_watch.jpg",
    "desc": "La plus ancienne marque horlogère enregistrée au monde. Créatrice de l'archétype moderne de la montre de plongée et fervente protectrice exclusive de l'art mécanique traditionnel.",
    "keyInnovations": [
      "1735 : Enregistrement de Jehan-Jacques Blancpain au registre officiel des horlogers de Villeret",
      "1926 : Première montre-bracelet automatique au monde (système Léon Hatot)",
      "1953 : Lancement de la Fifty Fathoms avec lunette tournante unidirectionnelle pour les nageurs de combat",
      "1991 : Présentation de la 1735, grande complication regroupant les 6 complications majeures"
    ]
  },
  {
    "id": "iwc-schaffhausen",
    "name": "IWC Schaffhausen",
    "year": "1868",
    "founder": "Florentine Ariosto Jones",
    "location": "Schaffhouse (Suisse Alémanique)",
    "region": "suisse-alemanique",
    "regionLabel": "Schaffhouse (Rhin)",
    "category": "Ingénierie de Haute Précision & Aviation",
    "group": "Richemont Luxury Group",
    "motto": "« Probus Scafusia » (Le savoir-faire de Schaffhouse)",
    "seal": "Certificat Probus Scafusia",
    "signatureCaliber": "Calibre 52000 (remontage Pellaton 7 jours) & Calibre 89000",
    "iconicModel": "Big Pilot, Portugieser, Da Vinci, Aquatimer, Ingenieur",
    "img": "/imgs/IWC_Schaffhausen_Headquarters_Historic_Building_Switzerland.jpg",
    "desc": "Fondée par un ingénieur américain sur le cours d'eau du Rhin afin d'exploiter l'énergie hydroélectrique. Pionnière des montres d'aviateurs avec cage intérieure en fer doux antimagnétique.",
    "keyInnovations": [
      "1884 : Montres de poche à affichage digital mécanique Pallweber (heures et minutes sautantes)",
      "1936 : Première montre d'aviateur spéciale pour pilotes civils et militaires",
      "1950 : Système de remontage automatique bidirectionnel Pellaton à cliquets",
      "1985 : Calendrier perpétuel Da Vinci de Kurt Klaus, réglable uniquement par la couronne"
    ]
  },
  {
    "id": "breguet",
    "name": "Montres Breguet",
    "year": "1775",
    "founder": "Abraham-Louis Breguet",
    "location": "L'Abbaye, Vallée de Joux (Vaud)",
    "region": "vallee-de-joux",
    "regionLabel": "Vallée de Joux",
    "category": "Haute Horlogerie Pure & Inventions Fondatrices",
    "group": "Swatch Group",
    "motto": "« En horlogerie, tout découle de Breguet. »",
    "seal": "Signature secrète Breguet & Guillochage main",
    "signatureCaliber": "Calibre 584Q & Calibre Tourbillon 558",
    "iconicModel": "Classique Tourbillon, Reine de Naples, Type XX Aéronavale",
    "img": "/imgs/luxury_swiss_watch_tourbillon_mechanism_macro.jpg",
    "desc": "Incontournable génie de l'histoire horlogère universelle. Abraham-Louis Breguet a inventé le tourbillon, le spiral à courbe terminale Breguet, l'antichoc pare-chute et la montre à souscription.",
    "keyInnovations": [
      "1780 : Perfectionnement du remontage automatique à masselotte (montres perpétuelles)",
      "1790 : Invention du pare-chute, premier dispositif antichoc élastique pour les pivots de balancier",
      "1795 : Invention du spiral Breguet à courbe terminale surélevée pour le développement concentrique",
      "1801 : Brevet du Tourbillon compensant les erreurs de marche dues à la gravité"
    ]
  },
  {
    "id": "richard-mille",
    "name": "Richard Mille",
    "year": "2001",
    "founder": "Richard Mille & Dominique Guenat",
    "location": "Les Breuleux, Jura",
    "region": "arc-jurassien",
    "regionLabel": "Bienne & Arc Jurassien",
    "category": "Haute Technologie Aérospatiale & Formule 1",
    "group": "Indépendant (Richard Mille & Guenat SA Montres Valgine)",
    "motto": "« Une machine de course au poignet. »",
    "seal": "Conception Zéro Compromis",
    "signatureCaliber": "Calibre RM 27 (Tourbillon Rafael Nadal suspendu par câbles)",
    "iconicModel": "RM 011 Chrono Flyback, RM 027 Tourbillon Nadal, RM UP-01 Ferrari (1,75 mm)",
    "img": "/imgs/richard_mille_carbon_ultra_light.jpg",
    "desc": "Révolution contemporaine de la haute horlogerie technique. Application des composites carbone TPT, des platines en titane grade 5 sablées et d'architectures suspendues résistant à des accélérations supérieures à 12 000 G.",
    "keyInnovations": [
      "2001 : Lancement de la RM 001 avec platine en titane et indicateur de couple de barillet",
      "2010 : RM 027 Nadal pesant moins de 20 grammes avec bracelet, portée en finale de tournoi du Grand Chelem",
      "2013 : Introduction exclusive du carbone composite Carbone TPT et Quartz TPT en horlogerie",
      "2022 : RM UP-01 Ferrari, montre mécanique la plus plate du monde à 1,75 mm d'épaisseur totale"
    ]
  }
];

const CERTIFICATIONS = [
  {
    "name": "Poinçon de Genève",
    "creation": "1886 (Loi cantonale genevoise)",
    "scope": "Mouvements assemblés et réglés dans le canton de Genève",
    "precision": "Contrôle chronométrique sur 7 jours (écart < 1 min/semaine)",
    "finishing": "Exigences extrêmes : anglages polis main, flancs étirés, vis polies miroir, coqs adoucis.",
    "badge": "Label d'État Officiel"
  },
  {
    "name": "Poinçon Patek Philippe",
    "creation": "2009 (Standard interne Patek Philippe)",
    "scope": "La montre complète et emboîtée (habillage, boîte, bracelet, calibre)",
    "precision": "-3 / +2 secondes par 24 heures (plus sévère que le COSC)",
    "finishing": "Finitions main intégrales, garantie de réparabilité de toute pièce produite depuis 1839.",
    "badge": "Standard de Manufacture"
  },
  {
    "name": "Master Chronometer (METAS)",
    "creation": "2015 (Institut Fédéral de Métrologie)",
    "scope": "Montre emboîtée testée en conditions réelles d'utilisation",
    "precision": "0 / +5 secondes par jour sur 8 tests rigoureux",
    "finishing": "Résistance antimagnétique absolue garantie jusqu'à 15 000 gauss.",
    "badge": "Norme Fédérale Suisse"
  },
  {
    "name": "Chronomètre Superlatif (Rolex)",
    "creation": "1951 / Renforcé en 2015",
    "scope": "Montre complète après emboîtage du calibre certifié COSC",
    "precision": "-2 / +2 secondes par jour après emboîtage",
    "finishing": "Tests d'étanchéité, de remontage automatique et de réserve de marche simulée.",
    "badge": "Garantie de Précision"
  },
  {
    "name": "Contrôle 1 000 Heures (Jaeger-LeCoultre)",
    "creation": "1992",
    "scope": "Montre emboîtée soumise à 6 semaines complètes d'épreuves",
    "precision": "Contrôle continu en 6 positions et à températures variables (4°C à 40°C)",
    "finishing": "Résistance aux chocs, aux champs magnétiques et étanchéité cyclique.",
    "badge": "Protocole de Manufacture"
  }
];

const QUIZ_QUESTIONS = [
  {
    "question": "1. Quelle manufacture historique est créditée de la création de la première montre de plongée moderne (la Fifty Fathoms) en 1953 ?",
    "options": [
      "Rolex",
      "Blancpain",
      "Omega",
      "Panerai"
    ],
    "correctAnswer": 1,
    "explanation": "Créée en 1953 par Jean-Jacques Fiechter pour les nageurs de combat français (Bob Maloubier et Claude Riffaud), la Blancpain Fifty Fathoms a défini pour la première fois les standards modernes de la montre de plongée : lunette tournante unidirectionnelle verrouillable, double joint torique d'étanchéité et index luminescents sur fond sombre."
  },
  {
    "question": "2. Pourquoi Jaeger-LeCoultre est-elle historiquement surnommée « La Grande Maison » de la Vallée de Joux ?",
    "options": [
      "Parce qu'elle possède le plus vaste bâtiment résidentiel du canton de Vaud",
      "Parce qu'elle a créé plus de 1 200 calibres et historiquement fourni en ébauches de haute horlogerie Patek Philippe, Audemars Piguet et Vacheron Constantin",
      "Parce qu'elle a été fondée par un membre de la famille royale d'Angleterre",
      "Parce qu'elle fabrique exclusivement des horloges d'édifices municipaux"
    ],
    "correctAnswer": 1,
    "explanation": "Antoine LeCoultre a réuni sous un même toit dès 1833 tous les métiers horlogers auparavant dispersés dans les fermes jurassiennes. Jaeger-LeCoultre a développé plus de 1 200 calibres et déposé plus de 400 brevets, fournissant pendant des décennies les mouvements les plus sophistiqués à la « Sainte Trinité » de l'horlogerie."
  },
  {
    "question": "3. Quelle est la différence majeure du Poinçon Patek Philippe introduit en 2009 par rapport au Poinçon de Genève ?",
    "options": [
      "Il n'autorise que les montres à quartz de très haute fréquence",
      "Il s'applique à la montre terminée et emboîtée (-3/+2 s/jour) et engage la marque à réparer tout garde-temps produit depuis 1839",
      "Il est délivré par le gouvernement français pour l'exportation",
      "Il interdit l'usage de métaux précieux comme le platine"
    ],
    "correctAnswer": 1,
    "explanation": "En 2009, Patek Philippe s'est affranchie du Poinçon de Genève pour instaurer son propre Poinçon. Contrairement aux labels portant uniquement sur le mouvement non emboîté, le Poinçon Patek Philippe contrôle la montre finie (-3/+2 s/jour pour les calibres > 20 mm) et offre une garantie d'entretien et de restauration pour tous les modèles depuis 1839."
  },
  {
    "question": "4. Quel génial designer indépendant suisse a conçu à la fois la Royal Oak d'Audemars Piguet (1972) et la Nautilus de Patek Philippe (1976) ?",
    "options": [
      "Abraham-Louis Breguet",
      "Gérald Genta",
      "Louis Cottier",
      "Max Büsser"
    ],
    "correctAnswer": 1,
    "explanation": "Gérald Genta (1931-2011), surnommé le « Picasso de l'horlogerie », a révolutionné le design horloger mondial. En 1972, il dessine la Royal Oak en s'inspirant d'un casque de scaphandrier, puis en 1976 la Nautilus de Patek Philippe inspirée des hublots de paquebots transatlantiques."
  },
  {
    "question": "5. Quelle entité détient la manufacture Rolex et garantit son indépendance perpétuelle sans actionnaires boursiers ?",
    "options": [
      "Le groupe de luxe LVMH",
      "La Fondation Hans Wilsdorf",
      "Le Conseil d'État de la République et canton de Genève",
      "Le conglomérat Swatch Group"
    ],
    "correctAnswer": 1,
    "explanation": "À la suite du décès de son épouse Florence en 1944, le fondateur Hans Wilsdorf a légué 100% du capital de Rolex à la Fondation Hans Wilsdorf à Genève. Cette fondation privée réinvestit les bénéfices dans la manufacture, soutient l'artisanat et finance de vastes actions caritatives et philanthropiques en Suisse."
  }
];

export default function MonographiesManufactures() {
  const [activeFilter, setActiveFilter] = useState('all');

  // Stepper Quiz state (~280px tall)
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);

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

  const filteredManufactures = MANUFACTURES_DATA.filter((m) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'trinity') return m.isHolyTrinity;
    if (activeFilter === 'geneve') return m.region === 'geneve';
    if (activeFilter === 'vallee-de-joux') return m.region === 'vallee-de-joux';
    if (activeFilter === 'arc-jurassien') return m.region === 'arc-jurassien';
    if (activeFilter === 'suisse-alemanique') return m.region === 'suisse-alemanique';
    return true;
  });

  return (
    <>
      <style>{`${styles}`}</style>

      <div className="min-h-screen bg-neutral-50 dark:bg-[#07090e] text-neutral-900 dark:text-neutral-100 transition-colors">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">

          {/* Top Breadcrumbs */}
          <div className="flex items-center justify-between">
            <Link
              href="/theorie"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← Retour à l&apos;Espace Théorie</span>
            </Link>

            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <Link href="/theorie" className="hover:text-neutral-600 dark:hover:text-neutral-200">Théorie</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#B08D57] font-semibold">Module 15 : Les Grandes Manufactures</span>
            </div>
          </div>

          {/* =================================================================== */}
          {/* HERO VITRINE DES MANUFACTURES */}
          {/* =================================================================== */}
          <section className="hero-vitrine p-8 sm:p-12 lg:p-16 text-white text-center sm:text-left space-y-8 shadow-2xl">
            <div className="max-w-4xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono text-yellow-300">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>Panthéon Helvétique • Haute Horlogerie &amp; Calibres In-House</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
                Monographies des Grandes Manufactures
              </h1>

              <p className="text-base sm:text-lg text-neutral-300 font-sans leading-relaxed max-w-3xl">
                Plongez au cœur des ateliers mythiques de Genève, de la Vallée de Joux et de l&apos;Arc Jurassien. Découvrez les dynasties fondatrices, les calibres légendaires, les sceaux d&apos;excellence et les innovations qui ont bâti la renommée éternelle de l&apos;horlogerie suisse.
              </p>
            </div>

            {/* 4 Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10">
              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-yellow-400">270+</div>
                <div className="text-xs text-neutral-300 font-mono mt-1">Ans d&apos;Activité Continue</div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-yellow-400">100%</div>
                <div className="text-xs text-neutral-300 font-mono mt-1">Maîtrise Verticale</div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-yellow-400">10+</div>
                <div className="text-xs text-neutral-300 font-mono mt-1">Maisons au Panthéon</div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-yellow-400">10 000+</div>
                <div className="text-xs text-neutral-300 font-mono mt-1">Brevets Historiques</div>
              </div>
            </div>
          </section>

          {/* =================================================================== */}
          {/* SECTION : LA SAINTE TRINITÉ (HOLY TRINITY) */}
          {/* =================================================================== */}
          <section className="p-6 sm:p-10 rounded-3xl trinity-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#B08D57] font-bold uppercase tracking-wider">
                  <Award className="w-4 h-4 text-[#B08D57]" />
                  <span>Le Sommet Aristocratique de l&apos;Horlogerie</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
                  La « Sainte Trinité » Horlogère (The Holy Trinity)
                </h2>
              </div>

              <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-[#B08D57]/15 text-[#8A6A3B] dark:text-[#D4B483] font-bold border border-[#B08D57]/30 self-start sm:self-auto">
                Patek Philippe • Audemars Piguet • Vacheron Constantin
              </span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans max-w-4xl">
              Consacrée par les historiens et les grands collectionneurs internationaux, l&apos;expression « Sainte Trinité » désigne les trois maisons suisses qui incarnent sans discontinuer depuis plus de deux siècles le faîte de la virtuosité technique, de la finition manuelle décorative (anglage, Côtes de Genève, guillochage) et de l&apos;aristocratie mécanique.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 space-y-2">
                <div className="text-xs font-mono font-bold text-[#B08D57]">1. Patek Philippe (1839)</div>
                <h3 className="font-serif font-bold text-base">La Noblesse Genevoise</h3>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  Maître absolu des répétitions minutes et des calendriers perpétuels, indépendance totale préservée par la famille Stern.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 space-y-2">
                <div className="text-xs font-mono font-bold text-[#B08D57]">2. Audemars Piguet (1875)</div>
                <h3 className="font-serif font-bold text-base">L&apos;Audace du Brassus</h3>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  Génie des grandes sonneries et inventrice de la montre sport-chic de luxe en acier avec l&apos;iconique Royal Oak.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 space-y-2">
                <div className="text-xs font-mono font-bold text-[#B08D57]">3. Vacheron Constantin (1755)</div>
                <h3 className="font-serif font-bold text-base">La Continuité Séculaire</h3>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  Plus ancienne manufacture en activité ininterrompue au monde (270+ ans), reine des Métiers d&apos;Art et du Poinçon de Genève.
                </p>
              </div>
            </div>
          </section>

          {/* =================================================================== */}
          {/* SÉLECTEUR INTERACTIF DE FILTRAGE DES MANUFACTURES */}
          {/* =================================================================== */}
          <section className="space-y-6" id="monographies">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <span className="text-xs font-mono tracking-widest text-[#B08D57] uppercase font-bold">
                  Catalogue Raisonné
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold mt-1">
                  Les Monographies Détaillées
                </h2>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: 'all', label: 'Toutes (10)' },
                  { id: 'trinity', label: '👑 Sainte Trinité (3)' },
                  { id: 'geneve', label: 'Genève (3)' },
                  { id: 'vallee-de-joux', label: 'Vallée de Joux (4)' },
                  { id: 'arc-jurassien', label: 'Bienne & Jura (2)' },
                  { id: 'suisse-alemanique', label: 'Schaffhouse (1)' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveFilter(tab.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                      activeFilter === tab.id
                        ? 'bg-[#B08D57] text-neutral-950 shadow-sm'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Monographies */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredManufactures.map((m) => (
                <div key={m.id} className="vitrine-card flex flex-col justify-between group">
                  {/* Photo Header */}
                  <div className="relative h-56 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <img
                      src={m.img}
                      alt={m.name}
                      className="w-full h-full object-cover card-img-zoom"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#B08D57] text-neutral-950 shadow-md">
                      Fondée en {m.year}
                    </div>

                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-mono bg-black/75 text-white backdrop-blur-sm border border-white/10">
                      📍 {m.location}
                    </div>

                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-neutral-900/90 text-yellow-300 backdrop-blur-sm border border-yellow-500/20">
                      {m.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-2xl font-serif font-bold group-hover:text-[#B08D57] transition-colors">
                            {m.name}
                          </h3>
                          <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                            Fondateur(s) : <strong className="text-neutral-800 dark:text-neutral-200">{m.founder}</strong>
                          </div>
                        </div>

                        <span className="text-[10px] font-mono px-2 py-0.5 rounded gold-badge flex-shrink-0">
                          {m.group}
                        </span>
                      </div>

                      {/* Motto */}
                      <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border-l-2 border-[#B08D57] text-xs italic text-neutral-600 dark:text-neutral-300">
                        {m.motto}
                      </div>

                      <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
                        {m.desc}
                      </p>

                      {/* Technical Specs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800/60 text-xs font-mono">
                        <div className="p-2.5 rounded-lg bg-neutral-100/60 dark:bg-neutral-800/40">
                          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Sceau d&apos;Excellence</span>
                          <span className="font-semibold text-neutral-800 dark:text-neutral-200 text-[11px]">{m.seal}</span>
                        </div>

                        <div className="p-2.5 rounded-lg bg-neutral-100/60 dark:bg-neutral-800/40">
                          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Calibre Signature</span>
                          <span className="font-semibold text-neutral-800 dark:text-neutral-200 text-[11px] truncate block">{m.signatureCaliber}</span>
                        </div>
                      </div>

                      {/* Key Innovations */}
                      <div className="space-y-1.5 pt-2">
                        <span className="text-[11px] font-mono font-bold text-[#B08D57] uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Innovations &amp; Brevets Majeurs</span>
                        </span>
                        <ul className="space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
                          {m.keyInnovations.map((inno, iIdx) => (
                            <li key={iIdx} className="flex items-start gap-2">
                              <span className="text-[#B08D57] font-bold">•</span>
                              <span className="leading-tight">{inno}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Iconic Models pill */}
                    <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs font-mono flex items-center justify-between text-neutral-500">
                      <span>Modèles Cultes :</span>
                      <strong className="text-neutral-900 dark:text-neutral-100">{m.iconicModel}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =================================================================== */}
          {/* SECTION : COMPARATIF TECHNIQUE DES SCEAUX & POINÇONS */}
          {/* =================================================================== */}
          <section className="space-y-6" id="certifications">
            <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <span className="text-xs font-mono tracking-widest text-[#B08D57] uppercase font-bold">
                Métrologie &amp; Bienfacture
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold mt-1">
                Les Poinçons &amp; Certifications d&apos;État
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-sans mt-1">
                Comment distinguer les standards de bienfacture et de précision chronométrique en Suisse.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CERTIFICATIONS.map((cert, idx) => (
                <div key={idx} className="vitrine-card p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded gold-badge">
                        {cert.badge}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400">
                        {cert.creation}
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-neutral-900 dark:text-neutral-100">
                      {cert.name}
                    </h3>

                    <div className="text-xs font-mono text-[#B08D57] font-semibold">
                      Précision : {cert.precision}
                    </div>

                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      <strong>Périmètre :</strong> {cert.scope}
                    </p>

                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed border-t border-neutral-100 dark:border-neutral-800/80 pt-2">
                      <strong>Critères :</strong> {cert.finishing}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =================================================================== */}
          {/* SECTION : INDÉPENDANCE VS GRANDS GROUPES */}
          {/* =================================================================== */}
          <section className="p-8 sm:p-12 rounded-3xl bg-neutral-900 text-white shadow-2xl space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <span className="text-xs font-mono tracking-widest text-[#B08D57] uppercase font-bold">
                Échiquier Mondial de l&apos;Horlogerie
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold">
                Indépendance Familiale vs Grands Groupes Industriels
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 font-sans">
                La structure capitalistique de l&apos;horlogerie suisse façonne l&apos;innovation, la pérennité et la liberté créative des ateliers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
              <div className="p-6 rounded-2xl bg-neutral-800/80 border border-neutral-700 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-base">
                  🏛️
                </div>
                <h3 className="font-serif font-bold text-base text-yellow-400">Les Piliers Indépendants</h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  <strong>Rolex</strong> (Fondation Hans Wilsdorf), <strong>Patek Philippe</strong> (Famille Stern), <strong>Audemars Piguet</strong> (Familles fondatrices), <strong>Chopard</strong> (Famille Scheufele) et <strong>Richard Mille</strong>.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-800/80 border border-neutral-700 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-base">
                  ⚡
                </div>
                <h3 className="font-serif font-bold text-base text-yellow-400">Richemont Luxury Group</h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Pôle Haute Horlogerie centré sur la Vallée de Joux et Genève : <strong>Vacheron Constantin</strong>, <strong>Jaeger-LeCoultre</strong>, <strong>IWC</strong>, <strong>A. Lange &amp; Söhne</strong>, <strong>Cartier</strong> et <strong>Panerai</strong>.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-800/80 border border-neutral-700 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-base">
                  🇨🇭
                </div>
                <h3 className="font-serif font-bold text-base text-yellow-400">Swatch Group</h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Premier fabricant horloger mondial fondé par Nicolas G. Hayek : <strong>Omega</strong>, <strong>Blancpain</strong>, <strong>Breguet</strong>, <strong>Glashütte Original</strong>, <strong>Longines</strong> et <strong>ETA</strong>.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-800/80 border border-neutral-700 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-base">
                  💎
                </div>
                <h3 className="font-serif font-bold text-base text-yellow-400">LVMH Watch Division</h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Pôle luxe et chronométrie d&apos;avant-garde : <strong>TAG Heuer</strong>, <strong>Hublot</strong>, <strong>Zenith</strong> (calibre El Primero) et <strong>Bulgari Haute Horlogerie</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* =================================================================== */}
          {/* SECTION : COMPACT STEPPER QUIZ EXAMEN SUISSE (~280px tall) */}
          {/* =================================================================== */}
          <section className="space-y-4" id="quiz-section">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#B08D57] uppercase font-bold">
                  Évaluation Théorique
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold mt-0.5">
                  Quiz de Validation : Monographies des Manufactures
                </h2>
              </div>

              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-medium">
                Format Examen Suisse
              </span>
            </div>

            {/* Compact Stepper Card (~280px tall) */}
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
                        ? "Félicitations ! Monographies des Manufactures Validées."
                        : "Bon travail ! Quelques révisions sur les maisons sont recommandées."}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
                      {calculateScore() >= 4
                        ? "Vous maîtrisez l'histoire des maisons fondatrices, la Sainte Trinité, les brevets emblématiques et les poinçons d'État suisses."
                        : "Prenez le temps de revoir les fiches des manufactures et le tableau des certifications avant de poursuivre."}
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
              href="/theorie/histoire-horlogerie-suisse"
              className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← Module 14 : Histoire Horlogère Suisse</span>
            </Link>

            <Link
              href="/fuseaux-horaires"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:opacity-90 transition-opacity shadow-sm"
            >
              <span>Module 16 : Fuseaux Horaires &amp; Heures du Monde Cottier</span>
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
                  <span>Les Manufactures Suisses</span>
                </h4>
                <p className="leading-relaxed text-[11px]">
                  Étude académique des plus prestigieuses manufactures helvétiques. De la tradition séculaire des fermes du Jura aux laboratoires de recherche microtechnique contemporains.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-serif font-bold text-sm text-neutral-900 dark:text-neutral-100">
                  Labels d&apos;État &amp; Poinçons
                </h4>
                <ul className="space-y-1.5 text-[11px]">
                  <li>• Poinçon de Genève (GE)</li>
                  <li>• Poinçon Patek Philippe (PP)</li>
                  <li>• Master Chronometer METAS</li>
                  <li>• Contrôle 1 000 Heures JLC</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-serif font-bold text-sm text-neutral-900 dark:text-neutral-100">
                  Bassins Horlogers
                </h4>
                <ul className="space-y-1.5 text-[11px]">
                  <li>• Genève &amp; Plan-les-Ouates</li>
                  <li>• Vallée de Joux (Le Brassus, Le Sentier)</li>
                  <li>• Bienne &amp; La Chaux-de-Fonds</li>
                  <li>• Schaffhouse (Rhin)</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-serif font-bold text-sm text-neutral-900 dark:text-neutral-100">
                  Corpus Académique
                </h4>
                <p className="leading-relaxed text-[11px]">
                  Module 15 du programme HorloLearn, conforme aux référentiels suisses d&apos;apprentissage AFP et CFC en horlogerie et micromécanique.
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
