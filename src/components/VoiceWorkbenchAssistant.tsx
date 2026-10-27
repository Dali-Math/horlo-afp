"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  X,
  ChevronRight,
  Compass,
  ShieldAlert,
  CheckCircle2,
  Search,
  Wrench,
  Droplets,
  Gauge,
  HelpCircle,
  RotateCcw
} from "lucide-react";
import { useRouter } from "next/navigation";

export interface KnowledgeItem {
  id: string;
  keywords: string[];
  title: string;
  category: "huilage" | "serrage" | "metrologie" | "usinage" | "diagnostic" | "finition" | "navigation";
  answer: string;
  speechText: string;
  nihsStandard?: string;
  actionUrl?: string;
  badge?: string;
}

export const WORKBENCH_KNOWLEDGE: KnowledgeItem[] = [
  // =========================================================================
  // 1. HUILAGE & LUBRIFICATION MOEBIUS CERTIFIÉE (NORMES SUISSES NIHS)
  // =========================================================================
  {
    id: "barillet",
    keywords: [
      "barillet", "barrilet", "barile", "ressort", "tambour", "bride", "glissante",
      "arbre", "bonde", "moteur", "8217", "8200", "hp1300", "hp-1300", "automatique"
    ],
    title: "Lubrification du Barillet & Ressort Moteur",
    category: "huilage",
    badge: "Barillet • Moebius 8217 / HP-1300 / 8200",
    answer: "1. Paroi du tambour (bride glissante montre automatique) : Moebius 8217 (graisse graphitée spéciale freinage, film très mince et régulier). 2. Portées et pivots de l'arbre de barillet : Moebius HP-1300 (fortes pressions, vitesses lentes). 3. Lame de ressort manuel : Moebius 8200. RÈGLE D'OR : Ne jamais surcharger en graisse sous peine de faire chuter l'amplitude !",
    speechText: "Pour le barillet : graisse graphitée Moebius 8217 sur les parois du tambour pour la bride glissante, et huile Moebius HP-1300 sur les pivots de l'arbre de barillet.",
    nihsStandard: "Norme NIHS 95-20 • Moebius 8217 & HP-1300"
  },
  {
    id: "palettes_ancre",
    keywords: [
      "palette", "palettes", "levee", "levée", "levees", "levées", "ancre", "impulsion",
      "repos", "echappement", "échappement", "9415", "941", "fourchette", "dard"
    ],
    title: "Lubrification des Palettes d'Ancre Suisse",
    category: "huilage",
    badge: "Échappement • Moebius 9415",
    answer: "Huile thixotrope Moebius 9415 (ou 941 pour hautes fréquences 36'000 A/h). Déposer une micro-goutte sur le plan d'impulsion d'une dent de la roue d'échappement toutes les 3 dents (soit 5 dents huilées sur 15). RÈGLE D'OR ABSOLUE : Les pivots de l'ancre, le dard et les cornes de la fourchette restent STRICTEMENT SECS !",
    speechText: "Pour les palettes d'ancre : huile Moebius 9415. Déposer une micro-goutte sur le plan d'impulsion toutes les 3 dents de la roue d'échappement. Les pivots de l'ancre restent strictement secs.",
    nihsStandard: "Norme NIHS 95-15 • Huile thixotrope Moebius 9415"
  },
  {
    id: "antichocs_balancier",
    keywords: [
      "balancier", "incabloc", "antichoc", "kif", "novodiac", "contre-pivot", "pierre",
      "chaton", "choc", "lyre", "9010", "goutte"
    ],
    title: "Lubrification des Antichocs Balancier (Incabloc)",
    category: "huilage",
    badge: "Organe Réglant • Moebius 9010",
    answer: "Huile synthétique Moebius 9010. Déposer la goutte au centre exact du contre-pivot démonté et nettoyé au One-Dip. La goutte d'huile doit occuper entre 1/2 et 2/3 du diamètre de la pierre (Ø ~0.60 mm). Aucun débordement sur la chatonnière pour éviter la dispersion capillaire !",
    speechText: "Pour les antichocs Incabloc du balancier : Moebius 9010. Déposer la goutte au centre du contre-pivot pour couvrir la moitié aux deux tiers du diamètre.",
    nihsStandard: "Norme NIHS 95-10 • Moebius 9010 Synt-A-Lube"
  },
  {
    id: "rouage",
    keywords: [
      "rouage", "roues", "mobile", "moyenne", "seconde", "centre", "grande roue",
      "pignon", "creusure", "pierre de rouage", "pivot"
    ],
    title: "Lubrification de la Chaîne de Rouage",
    category: "huilage",
    badge: "Rouage • HP-1300 & 9010",
    answer: "1. Roue de centre & Roue moyenne (vitesses lentes, fortes pressions) : Moebius HP-1300. 2. Roue des secondes & Roue d'échappement (vitesses rapides, faibles couples) : Moebius 9010. Remplir 1/3 de la creusure de pierre.",
    speechText: "Pour le rouage : Moebius HP-1300 pour la roue de centre et moyenne. Moebius 9010 pour la roue des secondes et d'échappement. Remplir un tiers de la creusure de pierre.",
    nihsStandard: "Norme NIHS 95-12 • Moebius HP-1300 / 9010"
  },
  {
    id: "remontoir_mise_a_l_heure",
    keywords: [
      "remontoir", "tirette", "coulant", "pignon coulant", "pignon de remontoir",
      "bascule", "renvoi", "minuterie", "chaussee", "chaussée", "mise a l'heure",
      "tige", "9504", "9501"
    ],
    title: "Mécanisme de Remontoir & Minuterie",
    category: "huilage",
    badge: "Remontoir • Moebius 9504",
    answer: "Graisse synthétique Moebius 9504 (haute pression, couleur bleue) ou Moebius 9501. À appliquer sur : gorge du pignon coulant, bec de bascule, plot de tirette, contact chaussée/roue des heures et dentures de renvoi.",
    speechText: "Pour le mécanisme de remontoir : graisse synthétique Moebius 9504 sur la gorge du pignon coulant, le bec de bascule et le plot de tirette.",
    nihsStandard: "Norme NIHS 95-30 • Graisse Moebius 9504"
  },
  {
    id: "automatique_inverseurs",
    keywords: [
      "automatique", "inverseur", "inverseurs", "roue d'inversion", "rotor", "masse",
      "roulement", "billes", "cliquet", "lubeta", "v105"
    ],
    title: "Système de Remontage Automatique & Inverseurs",
    category: "huilage",
    badge: "Auto • Lubeta V105 / 9010 / HP-1300",
    answer: "1. Roues d'inversion (inverseurs) : Lubeta V105 par immersion de 1 minute puis séchage complet (ou Moebius 9010 très fluide). JAMAIS de graisse 9504 sur les cliquets internes sous peine de blocage ! 2. Roulement à billes de la masse : une micro-goutte de HP-1300 sur une bille.",
    speechText: "Pour les inverseurs automatiques : immersion au Lubeta V105 ou Moebius 9010. Jamais de graisse épaisse sur les cliquets internes.",
    nihsStandard: "Spécification ETA / Moebius Lubeta V105"
  },
  {
    id: "epilamage_fixodrop",
    keywords: [
      "epilamage", "épilamage", "fixodrop", "epilame", "etalement", "tension superficielle",
      "traitement", "roue echappement"
    ],
    title: "Épilamage (Moebius Fixodrop ES/BS)",
    category: "huilage",
    badge: "Traitement • Fixodrop",
    answer: "L'épilame modifie l'énergie de surface du métal pour empêcher la goutte d'huile de s'étaler par capillarité. Pièces obligatoires à épilamer : Roue d'échappement, ancre suisse (palettes), contre-pivots d'antichocs et roue des secondes.",
    speechText: "L'épilamage au Fixodrop est obligatoire sur la roue d'échappement, les palettes d'ancre et les contre-pivots pour empêcher la goutte d'huile de s'étaler.",
    nihsStandard: "Norme NIHS 95-01 • Moebius Fixodrop ES/BS"
  },
  {
    id: "chronographe_huilage",
    keywords: [
      "chronographe", "chrono", "came", "colonne", "roue a colonnes", "marteau",
      "pignon oscillant", "embrayage", "remise a zero"
    ],
    title: "Lubrification du Mécanisme Chronographe",
    category: "huilage",
    badge: "Chrono • Moebius 9504 & HP-1300",
    answer: "1. Friction métal/métal des marteaux et cames : Graisse Moebius 9504. 2. Colonnes de la roue à colonnes : trace légère de 9504. 3. Pivots de mobile chrono : Moebius HP-1300. 4. Embrayage vertical (calibre Rolex 4130 / Breitling B01) : AUCUNE huile sur les disques de friction !",
    speechText: "Pour le chronographe : graisse Moebius 9504 sur les plans de contact des cames, marteaux et colonnes. Aucune huile sur les disques d'embrayage vertical.",
    nihsStandard: "Norme NIHS 95-40 • Moebius 9504"
  },

  // =========================================================================
  // 2. COUPLES DE SERRAGE & VISSERIE HORLOGÈRE (cNm)
  // =========================================================================
  {
    id: "couple_masse_oscillante",
    keywords: [
      "couple", "serrage", "masse", "vis", "rotor", "vis de masse", "cnm", "tournevis",
      "dynamometrique", "eta 2824"
    ],
    title: "Couple de Serrage : Vis de Masse Oscillante",
    category: "serrage",
    badge: "Couple • 2.0 à 2.5 cNm",
    answer: "Vis de masse oscillante (ETA 2824-2 / 2892 / 7750) : Couple recommandé de 2.0 à 2.5 cNm (centi-Newton-mètre). Utiliser impérativement un tournevis dynamométrique horloger pour éviter le dévissage sous les accélérations du poignet.",
    speechText: "Le couple de serrage de la vis de masse oscillante sur calibre ETA est de 2.0 à 2.5 centi-Newton-mètres.",
    nihsStandard: "Norme NIHS 06-02 • 2.0 - 2.5 cNm"
  },
  {
    id: "couple_rochet_couronne",
    keywords: [
      "rochet", "couronne", "vis de rochet", "vis de couronne", "pas a gauche", "3 traits",
      "trois traits", "sens inverse", "sens horaire"
    ],
    title: "Couples & Filetages : Rochet & Roue de Couronne",
    category: "serrage",
    badge: "Couple • 2.2 à 2.5 cNm (Pas à Gauche)",
    answer: "1. Vis de rochet : 2.5 cNm (pas à droite standard). 2. Vis de roue de couronne : 2.2 à 2.5 cNm — ATTENTION RÈGLE D'OR : Filetage à pas à gauche (dévisser dans le sens horaire) signalé par 3 traits gravés sur la tête de vis !",
    speechText: "La vis de roue de couronne se serre à 2.2 cNm avec un pas à gauche reconnaissable à ses 3 traits. La vis de rochet se serre à 2.5 cNm.",
    nihsStandard: "Norme NIHS 06-02 • Pas à gauche 3 traits"
  },
  {
    id: "couple_ponts_coq",
    keywords: [
      "coq", "pont", "ponts", "barillet vis", "vis de pont", "vis de coq", "pont d'ancre",
      "pont de rouage"
    ],
    title: "Couples de Serrage : Ponts & Coq",
    category: "serrage",
    badge: "Couple • 1.2 à 1.8 cNm",
    answer: "1. Vis de pont de barillet et de rouage : 1.5 à 1.8 cNm. 2. Vis de coq (balancier) : 1.5 cNm. 3. Micro-vis de pont d'ancre : 1.2 cNm. 4. Brides d'emboîtage de boîte : 1.8 à 2.0 cNm. 5. Vis de cadran : 0.8 à 1.0 cNm.",
    speechText: "Pour les vis de ponts de barillet et rouage : 1.5 à 1.8 cNm. Vis de coq : 1.5 cNm. Pont d'ancre : 1.2 cNm.",
    nihsStandard: "Norme NIHS 06-02 • 1.2 - 1.8 cNm"
  },

  // =========================================================================
  // 3. MÉTROLOGIE WITSCHI & CONTRÔLE OFFICIEL COSC (ISO 3159)
  // =========================================================================
  {
    id: "beat_error_repere",
    keywords: [
      "witschi", "repere", "repère", "beat", "error", "beat error", "ms", "milliseconde",
      "porte-piton", "point mort", "deux lignes"
    ],
    title: "Tolérance d'Erreur de Repère (Beat Error)",
    category: "metrologie",
    badge: "Witschi • Repère ≤ 0.4 ms",
    answer: "Erreur de repère optimale : < 0.2 ms. Tolérance maximale admise en haute horlogerie : ≤ 0.4 ms (seuil critique SAV : 0.6 ms). Pour corriger : faire pivoter avec précaution le porte-piton mobile (pas la raquette !) pour centrer la cheville au point mort de l'ancre.",
    speechText: "L'erreur de repère Witschi doit être inférieure à 0.4 milliseconde, idéalement sous 0.2 ms. Elle se règle en déplaçant le porte-piton mobile.",
    nihsStandard: "Norme ISO 3159 • Repère ≤ 0.4 ms",
    actionUrl: "/pratique/laboratoire"
  },
  {
    id: "amplitude_witschi",
    keywords: [
      "amplitude", "degres", "degré", "angle", "trop basse", "trop haute", "rebutement",
      "rebondissement", "cheville", "faible", "270", "300"
    ],
    title: "Plages d'Amplitude Horlogère Conformes",
    category: "metrologie",
    badge: "Witschi • Amplitude 270°-315°",
    answer: "1. Positions horizontales (Cadran Haut CH / Cadran Bas CB) : 270° à 315° à pleine charge. 2. Positions verticales (6H, 9H, 3H) : 240° à 275°. Alerte > 325° : Rebutement (la cheville cogne contre le dos de la fourchette). Alerte < 220° : Huile gommée ou ressort moteur affaibli.",
    speechText: "L'amplitude normale est de 270 à 315 degrés à plat, et de 240 à 275 degrés aux positions verticales.",
    nihsStandard: "Norme ISO 3159 COSC • Amplitude 270°-315°",
    actionUrl: "/pratique/laboratoire"
  },
  {
    id: "angle_de_levee",
    keywords: [
      "angle de levee", "angle de levée", "levee", "levée", "lift", "lift angle", "50", "52",
      "49", "unitash", "2824", "7750"
    ],
    title: "Angles de Levée des Calibres Standards",
    category: "metrologie",
    badge: "Calibres • Angles de Levée",
    answer: "1. ETA 2824-2 / 2836-2 / 2892-A2 : 50°. 2. ETA Valjoux 7750 / 7751 : 52°. 3. ETA Unitas 6497-1 / 6498-1 : 49° (ou 44° selon version ancienne). 4. Rolex 3135 : 52° • Rolex 3235 : 55°. 5. Seiko NH35 : 53°.",
    speechText: "L'angle de levée est de 50 degrés pour le calibre ETA 2824, 52 degrés pour le Valjoux 7750, et 49 degrés pour l'Unitas 6497.",
    nihsStandard: "Fiches Techniques Officielles Fabricants Suisses"
  },
  {
    id: "cosc_iso_3159",
    keywords: [
      "cosc", "iso 3159", "chronometre", "chronomètre", "precision", "précision", "marche",
      "ecart", "tolerance", "temperatures", "positions"
    ],
    title: "Norme Officielle COSC (ISO 3159)",
    category: "metrologie",
    badge: "COSC • -4 à +6 s/jour",
    answer: "Critères officiels du Contrôle Officiel Suisse des Chronomètres : Marche diurne moyenne de -4 à +6 secondes par jour. Épreuve de 15 jours consécutifs dans 5 positions (CH, CB, 6H, 9H, 3H) et 3 températures (8°C, 23°C, 38°C). Variation thermique max : 0.6 s/j/°C.",
    speechText: "La tolérance COSC est de moins 4 à plus 6 secondes par jour sur 15 jours de test dans 5 positions et 3 températures.",
    nihsStandard: "Norme Internationale ISO 3159"
  },

  // =========================================================================
  // 4. DIAGNOSTIC D'ATELIER & DÉPANNAGE MÉCANIQUE
  // =========================================================================
  {
    id: "diag_avance_enorme",
    keywords: [
      "avance", "avance beaucoup", "1 heure", "2 heures", "spiral colle", "spiral collé",
      "magnetise", "magnétisé", "aimante", "aimant", "magnetisme", "demagnetiseur"
    ],
    title: "Diagnostic : Montre qui Avance de 1h ou 2h par Jour",
    category: "diagnostic",
    badge: "Diagnostic • Spiral Magnétisé",
    answer: "1. Cause majeure (90% des cas) : Spiral magnétisé ! Les spires collent ensemble par force magnétique, raccourcissant la longueur active. Solution : passer le calibre sur démagnétiseur Bergeon. 2. Cause n°2 : Goutte d'huile projetée sur le spiral. Nettoyer au One-Dip dans un godet.",
    speechText: "Une montre qui avance d'une à deux heures par jour a un spiral magnétisé ou deux spires collées par de l'huile. Utilisez un démagnétiseur horloger.",
    nihsStandard: "Dépannage d'Établi Suisse"
  },
  {
    id: "diag_arret_position",
    keywords: [
      "arret", "arrêt", "bloque", "bloquée", "cadran haut", "cadran bas", "une position",
      "s'arrete", "s'arrête", "pivot casse", "pivot tordu"
    ],
    title: "Diagnostic : Montre qui s'Arrête dans une Seule Position",
    category: "diagnostic",
    badge: "Diagnostic • Pivot de Balancier",
    answer: "1. Si arrêt en Cadran Bas mais marche en Cadran Haut : Pivot inférieur de balancier faussé, émoussé ou cassé. 2. Contre-pivot d'antichoc sec ou encrassé : nettoyer et re-huiler au 9010. 3. Frottement d'aiguille : trotteuse qui frotte le verre ou aiguille des minutes qui touche le cadran.",
    speechText: "Si la montre s'arrête dans une seule position, inspectez le pivot de balancier sous binoculaire, vérifiez l'huile du contre-pivot et le jeu des aiguilles.",
    nihsStandard: "Contrôle d'Atelier NIHS"
  },
  {
    id: "diag_reserve_marche",
    keywords: [
      "reserve de marche", "réserve de marche", "autonomie", "s'arrete vite", "durée",
      "patine", "glisse"
    ],
    title: "Diagnostic : Réserve de Marche Insuffisante (< 30h)",
    category: "diagnostic",
    badge: "Diagnostic • Bride & Ressort",
    answer: "1. Montre automatique : Graisse Moebius 8217 dégradée sur la paroi du barillet, provoquant un glissement prématuré de la bride traînante. 2. Ressort moteur affaissé ou fatigué (remplacer par un Nivaflex neuf). 3. Pertes par frottement dans le rouage dues à une huile gommée.",
    speechText: "Une réserve de marche trop courte vient le plus souvent d'une bride glissante qui patine trop tôt dans le barillet ou d'un ressort moteur fatigué.",
    nihsStandard: "Diagnostic Barillet NIHS"
  },

  // =========================================================================
  // 5. MICROMÉCANIQUE, AVANT-TROUS & OUTILS D'ATELIER
  // =========================================================================
  {
    id: "foret_avant_trou_s090",
    keywords: [
      "avant-trou", "avant trou", "foret", "taraud", "s0.90", "0.90", "tige", "tige de remontoir",
      "diametre foret", "percage", "perçage", "taraudage"
    ],
    title: "Avant-Trou & Foret pour Tige de Remontoir S 0.90",
    category: "usinage",
    badge: "Usinage • Foret Ø 0.68 mm",
    answer: "Pour filetage NIHS S 0.90 (tige standard ETA 2824-2, pas P = 0.225 mm) : Foret avant-trou de Ø 0.68 mm (Formule d'atelier : Ø = D − P = 0.90 − 0.225 ≈ 0.68 mm). Utiliser impérativement de l'huile de coupe soufrée sur acier 316L.",
    speechText: "Pour un filetage S 0.90 de tige de remontoir, le foret avant-trou est de zéro virgule 68 millimètres.",
    nihsStandard: "Norme NIHS 06-02 / ISO 1501 • Foret Ø 0.68 mm"
  },
  {
    id: "foret_formule_generale",
    keywords: [
      "formule", "avant-trou formule", "calcul foret", "calcul taraudage", "pas", "diametre nominal"
    ],
    title: "Formule Générale d'Avant-Trou de Taraudage Horloger",
    category: "usinage",
    badge: "Règle NIHS • Ø = D - P",
    answer: "Formule universelle suisse : Diamètre du foret avant-trou = Diamètre Nominal (D) moins le Pas (P). Exemples : S 0.90 -> 0.68 mm • S 1.20 (P=0.25) -> 0.95 mm • S 1.40 (P=0.30) -> 1.10 mm.",
    speechText: "La formule de l'avant-trou horloger est : diamètre nominal moins le pas du filetage.",
    nihsStandard: "Norme NIHS 06-02"
  },
  {
    id: "ebats_horlogers",
    keywords: [
      "ebat", "ébat", "ebats", "ébats", "jeu axial", "jeu radial", "jauge", "balancier ebat",
      "ancre ebat"
    ],
    title: "Tolérances des Ébats Horlogers (Jeux Mécaniques)",
    category: "usinage",
    badge: "Métrologie • Ébats Horlogers",
    answer: "1. Ébat axial du balancier : 0.010 à 0.015 mm (contrôle à la jauge aux ébats). 2. Ébat axial de l'ancre : 0.015 à 0.025 mm. 3. Ébat du rouage : 0.020 à 0.040 mm. Un ébat nul bloque la rotation ; un ébat excessif désaxe les engrenages.",
    speechText: "L'ébat axial du balancier doit être compris entre 10 et 15 microns. L'ébat de l'ancre entre 15 et 25 microns.",
    nihsStandard: "Norme Horlogère Suisse NIHS"
  },
  {
    id: "desarmage_barillet",
    keywords: [
      "desarmer", "désarmer", "desarmage", "désarmage", "ressort detendre", "securite demontage",
      "cliquet barillet"
    ],
    title: "Sécurité d'Atelier : Désarmage du Barillet",
    category: "diagnostic",
    badge: "Sécurité Atelier • Règle n°1",
    answer: "RÈGLE D'OR N°1 AVANT TOUT DÉMONTAGE : Toujours désarmer le ressort moteur ! Maintenir la couronne avec un cabron ou les doigts, soulever délicatement le cliquet à la cheville de bois ou brucelle, et laisser glisser la couronne entre ses doigts avec contrôle.",
    speechText: "Règle de sécurité numéro un : toujours désarmer le ressort moteur avant toute intervention sur le rouage ou l'échappement.",
    nihsStandard: "Règle Fondamentale d'Établi"
  },

  // =========================================================================
  // 6. FINITIONS HAUTE HORLOGERIE & POINÇON DE GENÈVE
  // =========================================================================
  {
    id: "anglage_gentiane",
    keywords: [
      "anglage", "angle rentrant", "gentiane", "bois de gentiane", "cabron", "chanfrein",
      "poinçon de geneve", "lime d'anglage"
    ],
    title: "Anglage Main & Angle Rentrant Vif",
    category: "finition",
    badge: "Haute Horlogerie • Anglage Main",
    answer: "L'anglage main se taille à la lime d'acier, s'adoucit au cabron d'émeri 4/0 puis se polit miroir à la cheville de bois de gentiane séchée chargée de pâte diamantée 0.25 µm. L'angle rentrant vif est la signature irréfutable du travail manuel (impossible sur machine CNC).",
    speechText: "L'anglage main de haute horlogerie est poli miroir à la tige de gentiane. L'angle rentrant vif ne peut être exécuté que par la main de l'artisan.",
    nihsStandard: "Règlement Poinçon de Genève",
    actionUrl: "/theorie/mouvements/finitions-decoratives"
  },
  {
    id: "poli_noir_speculaire",
    keywords: [
      "poli noir", "poli speculaire", "poli spéculaire", "poli bloque", "poli bloqué",
      "zinc", "bloc de zinc", "tourbillon"
    ],
    title: "Poli Noir (Polissage Spéculaire sur Zinc)",
    category: "finition",
    badge: "Finition Acier • Poli Noir",
    answer: "Le poli noir offre une planéité optique absolue sur l'acier trempé (cages de tourbillon, têtes de vis). Exécuté sur un bloc de zinc pur parfaitement dressé avec pâte diamantée par mouvements en « 8 ». La lumière n'est réfléchie que dans un seul axe : la pièce paraît noire sous tous les autres angles.",
    speechText: "Le poli noir est obtenu sur plaque de zinc au diamant. Il renvoie la lumière dans une seule direction et paraît noir sous tous les autres angles.",
    nihsStandard: "Critères de Haute Horlogerie Suisse",
    actionUrl: "/theorie/mouvements/finitions-decoratives"
  },
  {
    id: "cotes_de_geneve_perlage",
    keywords: [
      "cotes de geneve", "côtes de genève", "perlage", "bouchonnage", "50%", "vagues",
      "platine perlage"
    ],
    title: "Côtes de Genève & Perlage Circulaire",
    category: "finition",
    badge: "Décoration • Côtes & Perlage",
    answer: "1. Côtes de Genève : Ondes parallèles dressées au buis ou à la meule cloche avec inclinaison d'attaque de 15°. 2. Perlage : Cercles concentriques satinés superposés à 50% de recouvrement strict pour capturer les micro-poussières et supprimer toute bavure résiduelle.",
    speechText: "Les Côtes de Genève sont inclinées à 15 degrés. Le perlage circulaire se chevauche à 50% pour piéger les poussières.",
    nihsStandard: "Tradition Horlogère Suisse",
    actionUrl: "/theorie/mouvements/finitions-decoratives"
  },

  // =========================================================================
  // 7. NAVIGATION DIRECTE VERS LES ATELIERS & SIMULATEURS
  // =========================================================================
  {
    id: "nav_laboratoire",
    keywords: ["laboratoire", "labo", "banc", "witschi simulateur", "chronometrie", "test"],
    title: "Grand Laboratoire Horloger Witschi",
    category: "navigation",
    badge: "Simulateur • Laboratoire",
    answer: "Ouverture du Grand Laboratoire Horloger (11 bancs d'essais métrologiques, Witschi interactif et oscillogrammes).",
    speechText: "J'ouvre le Grand Laboratoire Horloger.",
    actionUrl: "/pratique/laboratoire"
  },
  {
    id: "nav_loupe_macro",
    keywords: ["loupe", "inspection", "defaut", "défaut", "microscope", "macro", "zoom"],
    title: "Atelier Loupe Macro 20x (Défauts Réels)",
    category: "navigation",
    badge: "Atelier • Loupe 20x",
    answer: "Ouverture de l'Atelier d'Inspection Macro 20x : examinez des pierres fêlées, bavures de ponts et excès d'huile sur de vraies photos d'établi.",
    speechText: "J'ouvre l'Atelier d'Inspection à la Loupe Macro 20x.",
    actionUrl: "/pratique/inspection-loupe"
  },
  {
    id: "nav_defi_chrono",
    keywords: ["defi", "défi", "duel", "chrono", "battre", "multijoueur", "score"],
    title: "Mode Duel & Défi Chronométré",
    category: "navigation",
    badge: "Jeu Horloger • Défi",
    answer: "Lancement du Mode Duel : testez vos réflexes d'artisan horloger en temps limité et partagez votre score.",
    speechText: "Lancement du Défi Chronométré d'Atelier.",
    actionUrl: "/pratique/defi-chronometre"
  },
  {
    id: "nav_bâti_platine",
    keywords: ["platine", "bati", "bâti", "architecture", "coq pont", "eta 6497"],
    title: "Architecture : Platine & Ponts (ETA 6497-1)",
    category: "navigation",
    badge: "Théorie • Bâti",
    answer: "Ouverture de la vue éclatée CAO vectorielle du calibre d'école suisse ETA 6497-1 Unitas.",
    speechText: "J'ouvre le module de la platine et des ponts.",
    actionUrl: "/theorie/mouvements/platine-ponts"
  }
];

// Dictionnaire de normalisation phonétique et tolérance aux fautes de frappe / ASR
const PHONETIC_SYNONYMS: { [key: string]: string } = {
  barrilet: "barillet",
  barile: "barillet",
  barrilete: "barillet",
  bariet: "barillet",
  ressort: "ressort barillet",
  tambour: "tambour barillet",
  utelise: "utilise",
  uteliser: "utiliser",
  utulise: "utilise",
  wichi: "witschi",
  witshi: "witschi",
  wishi: "witschi",
  palete: "palette",
  paletes: "palettes",
  echapement: "echappement",
  echapment: "echappement",
  huille: "huile",
  huiller: "huiler",
  graisse: "huile",
  visse: "vis",
  visses: "vis",
  incablock: "incabloc",
  antikoc: "antichoc",
  kiff: "kif",
  rotor: "masse",
  demagnetiser: "demagnetiseur",
  magnetise: "magnetisme"
};

export function cleanAndNormalize(text: string): string {
  const basic = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, " ")
    .trim();

  return basic
    .split(/\s+/)
    .map((word) => PHONETIC_SYNONYMS[word] || word)
    .join(" ");
}

export function searchWorkbenchKnowledge(query: string): KnowledgeItem | null {
  if (!query || query.trim().length === 0) return null;

  const normalized = cleanAndNormalize(query);
  const words = normalized.split(/\s+/).filter((w) => w.length > 2);

  let bestMatch: KnowledgeItem | null = null;
  let highestScore = 0;

  for (const item of WORKBENCH_KNOWLEDGE) {
    let score = 0;

    // 1. Tag direct match (+6 points par tag exact)
    for (const kw of item.keywords) {
      const cleanKw = cleanAndNormalize(kw);
      if (normalized.includes(cleanKw)) {
        score += 6;
      }
    }

    // 2. Individual words intersection (+3 points par mot)
    for (const w of words) {
      for (const kw of item.keywords) {
        const cleanKw = cleanAndNormalize(kw);
        if (cleanKw === w) {
          score += 4;
        } else if (cleanKw.includes(w) || w.includes(cleanKw)) {
          score += 2;
        }
      }
    }

    // 3. Category Boost
    const isOilQuery =
      normalized.includes("huile") ||
      normalized.includes("huiler") ||
      normalized.includes("lubrif") ||
      normalized.includes("graisse");
    if (isOilQuery && item.category === "huilage") score += 4;

    const isTorqueQuery =
      normalized.includes("couple") ||
      normalized.includes("serrer") ||
      normalized.includes("serrage") ||
      normalized.includes("vis") ||
      normalized.includes("cnm");
    if (isTorqueQuery && item.category === "serrage") score += 4;

    const isWitschiQuery =
      normalized.includes("witschi") ||
      normalized.includes("repere") ||
      normalized.includes("amplitude") ||
      normalized.includes("cosc") ||
      normalized.includes("marche");
    if (isWitschiQuery && item.category === "metrologie") score += 4;

    const isDiagQuery =
      normalized.includes("avance") ||
      normalized.includes("arret") ||
      normalized.includes("bloque") ||
      normalized.includes("panne") ||
      normalized.includes("probleme");
    if (isDiagQuery && item.category === "diagnostic") score += 4;

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  // Minimum threshold to prevent nonsensical matches
  return highestScore >= 3 ? bestMatch : null;
}

export default function VoiceWorkbenchAssistant() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [textSearch, setTextSearch] = useState("");
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [activeItem, setActiveItem] = useState<KnowledgeItem | null>(null);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const recognitionRef = useRef<any>(null);

  // Initialize Web Speech API
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        setSpeechSupported(true);
        const recognition = new SpeechRecognition();
        // fr-FR is widely supported on Chrome & Edge mobile/desktop
        recognition.lang = "fr-FR";
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          const text = event.results[0][0].transcript;
          setTranscript(text);
          processQuery(text);
        };

        recognition.onerror = (event: any) => {
          console.warn("[Voice Assistant] Recognition error:", event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleListening = () => {
    if (!speechSupported) {
      setIsOpen(true);
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setIsOpen(true);
      setTranscript("Écoute en cours... Parlez clairement à l'établi.");
      try {
        recognitionRef.current?.start();
      } catch (e) {
        console.warn("Speech recognition already active:", e);
      }
    }
  };

  const speakText = (text: string) => {
    if (!voiceEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    utterance.rate = 1.05;
    window.speechSynthesis.speak(utterance);
  };

  const processQuery = (query: string) => {
    const match = searchWorkbenchKnowledge(query);

    if (match) {
      setActiveItem(match);
      speakText(match.speechText);
      if (match.actionUrl) {
        setTimeout(() => {
          router.push(match.actionUrl!);
          setIsOpen(false);
        }, 1400);
      }
    } else {
      const fallback: KnowledgeItem = {
        id: "fallback",
        keywords: [],
        title: "Recherche d'Établi HorloLearn",
        category: "huilage",
        badge: "Assistance Vocale Établi",
        answer: `Consigne reçue : « ${query} ». Posez votre question naturellement, par exemple : « Quelle huile pour le barillet ? », « Quelle huile pour les palettes ? », « Couple de serrage vis de masse », « Tolérance Witschi », ou « Foret tige S 0.90 ».`,
        speechText:
          "Question non reconnue. Vous pouvez demander par exemple quelle huile pour le barillet ou quel couple pour la vis de masse.",
        nihsStandard: "Base de Connaissance Établi HorloLearn"
      };
      setActiveItem(fallback);
      speakText(fallback.speechText);
    }
  };

  const handleChipClick = (item: KnowledgeItem) => {
    setActiveItem(item);
    setTranscript(`« ${item.title} »`);
    speakText(item.speechText);
    if (item.actionUrl) {
      router.push(item.actionUrl);
      setIsOpen(false);
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textSearch.trim().length > 0) {
      setTranscript(`« ${textSearch} »`);
      processQuery(textSearch);
      setTextSearch("");
    }
  };

  // Filter knowledge items for quick chips
  const filteredChips =
    activeFilter === "all"
      ? WORKBENCH_KNOWLEDGE
      : WORKBENCH_KNOWLEDGE.filter((it) => it.category === activeFilter);

  return (
    <>
      {/* Floating Workbench Mic Button (Bottom-Left) */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={toggleListening}
          className={`relative group w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 backdrop-blur-md border-2 ${
            isListening
              ? "bg-rose-600 text-white border-rose-400 ring-4 ring-rose-500/40 animate-pulse scale-105"
              : "bg-slate-900/95 dark:bg-[#0c121e]/95 text-amber-400 border-amber-500/60 hover:border-amber-300 hover:scale-110 shadow-amber-950/30"
          }`}
          aria-label="Mode Établi Mains Prises (Assistant Vocal)"
          title="Mode Établi Mains Prises (Vocal)"
        >
          {isListening ? (
            <Mic className="w-5 h-5 text-white animate-bounce" />
          ) : (
            <Mic className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
          )}

          {/* Active emerald dot */}
          <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>

          {/* Tooltip */}
          <span className="absolute left-full ml-3 px-3 py-1.5 rounded-xl bg-slate-900/95 dark:bg-black/95 border border-amber-500/40 text-slate-200 text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl backdrop-blur-md">
            🎙️ Assistant Vocal Établi (Mains Prises)
          </span>
        </button>
      </div>

      {/* Voice Assistant Modal Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="max-w-xl w-full bg-slate-900 dark:bg-[#080C14] border border-amber-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl text-slate-200 font-mono text-xs space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-300 max-h-[92vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    Assistant d&apos;Établi Mains Prises
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                      IA Vocale &amp; NIHS
                    </span>
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Posez vos questions à haute voix sans lâcher vos brucelles
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  className={`p-2 rounded-xl border transition-colors ${
                    voiceEnabled
                      ? "bg-amber-500/15 border-amber-500/40 text-amber-300"
                      : "bg-slate-800 border-slate-700 text-slate-400"
                  }`}
                  title={voiceEnabled ? "Synthèse vocale active" : "Synthèse vocale coupée"}
                >
                  {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    if (isListening) recognitionRef.current?.stop();
                    if (typeof window !== "undefined") window.speechSynthesis.cancel();
                  }}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mic Pulse Center */}
            <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
              <button
                onClick={toggleListening}
                className={`p-5 rounded-full transition-all duration-300 ${
                  isListening
                    ? "bg-rose-500 text-white ring-8 ring-rose-500/30 scale-110"
                    : "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 hover:scale-105"
                }`}
              >
                {isListening ? <Mic className="w-6 h-6 animate-pulse" /> : <Mic className="w-6 h-6" />}
              </button>

              <div className="space-y-1">
                <div className="text-white font-bold text-xs">
                  {isListening ? "Je vous écoute à l'établi..." : "Touchez le micro pour parler"}
                </div>
                <div className="text-[11px] text-amber-400/90 italic max-w-sm mx-auto">
                  {transcript || "« Quelle huile pour le barillet ? »"}
                </div>
              </div>
            </div>

            {/* Text Search Alternative (for noisy workshops or no mic) */}
            <form onSubmit={handleTextSubmit} className="relative">
              <input
                type="text"
                value={textSearch}
                onChange={(e) => setTextSearch(e.target.value)}
                placeholder="Ou tapez : ex. huile barillet, couple vis masse, repere witschi..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-20 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold text-[11px] hover:bg-amber-400 transition-colors"
              >
                Chercher
              </button>
            </form>

            {/* Active Answer Card */}
            {activeItem && (
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-amber-500/50 space-y-2 animate-fadeIn shadow-xl">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    {activeItem.title}
                  </span>
                  {activeItem.nihsStandard && (
                    <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {activeItem.nihsStandard}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  {activeItem.answer}
                </p>
                {activeItem.actionUrl && (
                  <button
                    onClick={() => {
                      router.push(activeItem.actionUrl!);
                      setIsOpen(false);
                    }}
                    className="inline-flex items-center gap-1.5 text-[11px] text-amber-400 hover:text-amber-300 hover:underline pt-1 font-bold"
                  >
                    <span>Ouvrir l&apos;atelier dédié directement</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

            {/* Category Filter Pills */}
            <div className="flex gap-1 overflow-x-auto pb-1 text-[10px]">
              {[
                { id: "all", label: "Tous" },
                { id: "huilage", label: "💧 Huilage" },
                { id: "serrage", label: "🔩 Serrages (cNm)" },
                { id: "metrologie", label: "⏱️ Witschi & COSC" },
                { id: "diagnostic", label: "🔍 Dépannage" },
                { id: "usinage", label: "⚙️ Avant-Trous" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap font-bold ${
                    activeFilter === tab.id
                      ? "bg-amber-500 text-slate-950 shadow-sm"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Quick Suggestions Chips */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                Fiches d&apos;Établi Rapides ({filteredChips.length} disponibles) :
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                {filteredChips.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleChipClick(item)}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/50 text-[11px] text-slate-300 hover:text-amber-300 transition-all text-left flex items-center gap-1"
                  >
                    <span>{item.badge || item.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
