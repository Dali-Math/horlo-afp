// src/app/pratique/demontage/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldAlert,
  RotateCcw,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Sliders,
  Droplet,
  Layers,
  Sparkles,
  Compass,
  Check
} from 'lucide-react';

export interface StepDetail {
  number: number;
  title: string;
  side: 'Ponts (Mouvement)' | 'Cadran (Affichage)' | 'Organe Régulateur';
  screwdriver: { name: string; colorClass: string; diam: string };
  tweezer: string;
  actionProtocol: string[];
  atelierWarning: string;
  remontageTip: string;
  moebiusOil?: string;
}

export const DISASSEMBLY_STEPS: StepDetail[] = [
  {
    number: 1,
    title: 'Mise sur Porte-Mouvement & Désarment du Barillet',
    side: 'Ponts (Mouvement)',
    screwdriver: { name: 'Tournevis Rouge', colorClass: 'bg-red-500 text-white', diam: '1.20 mm' },
    tweezer: 'Brucelles Dumont N° 3 & Cheville de bois taillée',
    actionProtocol: [
      'Positionner le calibre ETA 6497-1 sur un porte-mouvement approprié et serrer la vis de serrage sans forcer.',
      'DÉSARMEMENT OBLIGATOIRE : Tenir fermement la couronne de remontoir entre le pouce et l’index.',
      'Avec une cheville de bois ou une pointe en plastique, écarter délicatement le bec du cliquet de la denture du rochet.',
      'Laisser la couronne tourner doucement et lentement entre les doigts pour détendre complètement le ressort moteur.'
    ],
    atelierWarning: 'DANGER MORTEL POUR LE CALIBRE : Si vous démontez les ponts sans désarmer le ressort, le couple brutal détruira instantanément les pivots des mobiles de rouage et projettera les pièces.',
    remontageTip: 'Lors du remontage, tester l’armage de 2 ou 3 clics pour vérifier que le ressort moteur accroche bien la bonde.',
    moebiusOil: 'Moebius 8200 pour le ressort moteur'
  },
  {
    number: 2,
    title: 'Dépose de la Tige de Remontoir & Couronne',
    side: 'Ponts (Mouvement)',
    screwdriver: { name: 'Tournevis Noir', colorClass: 'bg-slate-900 text-white border border-slate-700', diam: '1.00 mm' },
    tweezer: 'Brucelles Dumont N° 3',
    actionProtocol: [
      'Repérer la vis de tirette située à proximité de la tige de remontoir.',
      'Dévisser la vis de tirette d’exactement 1 tour à 1 tour et demi au maximum.',
      'Tirer doucement sur la tige de remontoir dans l’axe pour la faire glisser hors du mouvement.'
    ],
    atelierWarning: 'PIÈGE CLASSIQUE : Ne JAMAIS dévisser la vis de tirette à fond ! Si elle se détache, la tirette tombe sous la platine et nécessite le démontage complet du côté cadran pour être repositionnée.',
    remontageTip: 'Vérifier la libre translation du pignon coulant sur le carré de la tige lors de la réinsertion.'
  },
  {
    number: 3,
    title: 'Dépose de l’Organe Régulateur (Coq & Balancier-Spiral)',
    side: 'Organe Régulateur',
    screwdriver: { name: 'Tournevis Noir', colorClass: 'bg-slate-900 text-white border border-slate-700', diam: '1.00 mm' },
    tweezer: 'Brucelles Dumont N° 3 (manipulation du coq)',
    actionProtocol: [
      'Dévisser la vis de fixation du Coq (pont de balancier).',
      'Insérer l’embout biseauté des brucelles dans la coche de dégagement du Coq.',
      'Lever délicatement le Coq à la verticale sans jamais toucher au spiral.',
      'Pivoter légèrement le Coq pour dégager la cheville de plateau de la fourchette de l’ancre.',
      'Déposer immédiatement l’ensemble Coq et Balancier sous cloche de protection ou sur un porte-balancier.'
    ],
    atelierWarning: 'ZONE D’EXTRÊME FRAGILITÉ : La moindre torsion sur la lame du spiral Nivarox détruit son isochronisme. Ne déposez jamais le balancier à plat sur l’établi.',
    remontageTip: 'Engager d’abord le pivot inférieur dans la pierre de platine, orienter la cheville dans la fourchette, puis rabattre le Coq horizontalement sans forcer.',
    moebiusOil: 'Moebius 9010 sur les contre-pivots Incabloc'
  },
  {
    number: 4,
    title: 'Dépose de l’Échappement (Pont d’Ancre & Ancre Suisse)',
    side: 'Ponts (Mouvement)',
    screwdriver: { name: 'Tournevis Blanc ou Jaune', colorClass: 'bg-yellow-400 text-slate-900', diam: '0.80 mm' },
    tweezer: 'Brucelles Dumont N° 3 fines',
    actionProtocol: [
      'Dévisser les deux vis de pont d’ancre de manière symétrique.',
      'Lever le pont d’ancre bien perpendiculairement à la platine pour ne pas cisailler le pivot supérieur.',
      'Saisir délicatement le corps de l’ancre au niveau de la tige de fourchette avec les brucelles.',
      'Extraire l’ancre sans frotter les palettes en rubis contre la denture de la roue d’échappement.'
    ],
    atelierWarning: 'ATTENTION AU DARD : Le dard sous la fourchette mesure 0.10 mm de diamètre. Tout choc contre la platine le pliera et bloquera la sécurité anti-renversement.',
    remontageTip: 'Au remontage, vérifier la liberté de pivotement de l’ancre par un souffle léger : elle doit sauter d’une touche à l’autre.',
    moebiusOil: 'Moebius 9415 (graisse thixotrope sur les levées de rubis uniquement)'
  },
  {
    number: 5,
    title: 'Dépose du Rochet & de la Roue de Couronne',
    side: 'Ponts (Mouvement)',
    screwdriver: { name: 'Tournevis Violet / Rouge', colorClass: 'bg-purple-500 text-white', diam: '1.40 à 1.60 mm' },
    tweezer: 'Brucelles Dumont N° 1 ou Laiton',
    actionProtocol: [
      'Dévisser la vis de rochet (vis centrale standard, pas à droite). Retirer le rochet de barillet.',
      'ATTENTION PAS INVERSÉ : La vis de roue de couronne possède un PAS À GAUCHE (signalée par 3 fentes ou gravure).',
      'Pour DÉVISSER la roue de couronne, tourner le tournevis DANS LE SENS DES AIGUILLES D’UNE MONTRE.',
      'Retirer la roue de couronne et sa bague de calage en laiton.'
    ],
    atelierWarning: 'PIÈGE NUMÉRO 1 EN ÉCOLE : Forcer dans le sens habituel pour dévisser la roue de couronne casse net la tête de vis dans le pont de barillet.',
    remontageTip: 'Bien positionner la bague intermédiaire sous la roue de couronne pour éviter le grippage.'
  },
  {
    number: 6,
    title: 'Dépose du Pont de Barillet & Tambour de Barillet',
    side: 'Ponts (Mouvement)',
    screwdriver: { name: 'Tournevis Rouge', colorClass: 'bg-red-500 text-white', diam: '1.20 mm' },
    tweezer: 'Brucelles Dumont N° 1',
    actionProtocol: [
      'Dévisser les deux vis du pont de barillet.',
      'Dégager le pont par ses encoches de levage à l’aide d’un tournevis approprié.',
      'Saisir le tambour de barillet complet avec les brucelles et le sortir de son logement sur la platine.',
      'Inspecter les dentures du tambour pour s’assurer qu’aucune dent n’est faussée.'
    ],
    atelierWarning: 'Veiller à ce que le cliquet et son ressort ne sautent pas hors du pont lors de la manipulation.',
    remontageTip: 'Vérifier l’ébat de hauteur du barillet entre platine et pont (0.05 à 0.08 mm).',
    moebiusOil: 'Moebius HP-1300 sur les portées de l’arbre de barillet'
  },
  {
    number: 7,
    title: 'Dépose du Pont de Rouage',
    side: 'Ponts (Mouvement)',
    screwdriver: { name: 'Tournevis Rouge', colorClass: 'bg-red-500 text-white', diam: '1.20 mm' },
    tweezer: 'Brucelles Dumont N° 3',
    actionProtocol: [
      'Dévisser progressivement et en croix les 3 vis du pont de rouage.',
      'Prendre appui dans les coches de levage pour décoller le pont des pieds de positionnement.',
      'Lever le pont STRICTEMENT verticalement pour accompagner la sortie des pivots de roue des pierres.',
      'Déposer le pont sur un papier d’observation propre.'
    ],
    atelierWarning: 'Ne jamais faire levier d’un seul côté : un pivot de roue coincé dans une pierre se pliera immédiatement.',
    remontageTip: 'Au remontage, guider chaque pivot l’un après l’autre dans sa pierre respective avec une cheville avant de visser.'
  },
  {
    number: 8,
    title: 'Extraction des Mobiles de Rouage',
    side: 'Ponts (Mouvement)',
    screwdriver: { name: 'Aucun (Manipulation manuelle)', colorClass: 'bg-slate-400 text-slate-900', diam: 'Brucelles' },
    tweezer: 'Brucelles Dumont N° 3 fines',
    actionProtocol: [
      '1. Retirer la roue d’échappement à 15 dents en la saisissant par sa serpe.',
      '2. Retirer la roue des secondes (9 heures) en veillant à ne pas plier son long axe.',
      '3. Retirer la roue moyenne en la soulevant par le centre.',
      'Classer les roues dans les compartiments d’une boîte de lavage compartimentée.'
    ],
    atelierWarning: 'Le pivot de roue des secondes est le plus vulnérable de tout le train cinématique (Ø 0.12 mm).',
    remontageTip: 'Vérifier que les ailes de pignons sont exemptes de tout débris ou cambouis séché avant le nettoyage.',
    moebiusOil: 'Moebius 9010 sur pivots de seconde et échappement'
  },
  {
    number: 9,
    title: 'Dépose de la Chaussée & Roue de Centre',
    side: 'Cadran (Affichage)',
    screwdriver: { name: 'Outil aux aiguilles / Presto', colorClass: 'bg-amber-500 text-slate-950', diam: 'Tire-chaussée' },
    tweezer: 'Brucelles Dumont N° 1',
    actionProtocol: [
      'Retourner le mouvement côté cadran sur le porte-mouvement.',
      'Extraire la chaussée (chassée à friction sur l’axe de centre) avec un outil tire-chaussée Presto.',
      'Retourner le mouvement côté ponts et extraire la roue de centre (grande moyenne).',
      'Vérifier la lanterne de la chaussée (cran de friction assurant la mise à l’heure).'
    ],
    atelierWarning: 'Ne jamais tenter d’extraire la roue de centre tant que la chaussée n’a pas été retirée côté cadran !',
    remontageTip: 'Vérifier le gras de chaussée : la mise à l’heure doit offrir une résistance ferme mais onctueuse.',
    moebiusOil: 'Moebius HP-1300 sur les portées centrales'
  },
  {
    number: 10,
    title: 'Démontage de la Minuterie (Côté Cadran)',
    side: 'Cadran (Affichage)',
    screwdriver: { name: 'Tournevis Noir', colorClass: 'bg-slate-900 text-white border border-slate-700', diam: '1.00 mm' },
    tweezer: 'Brucelles Dumont N° 3',
    actionProtocol: [
      'Retirer la rondelle clinquant de roue des heures.',
      'Extraire la roue des heures en la soulevant de son canon.',
      'Dévisser la vis de couvre-minuterie (si présent) et retirer la roue de minuterie.',
      'Inspecter les dentures de renvoi pour détecter toute usure anormale.'
    ],
    atelierWarning: 'Ne pas égarer le clinquant (fine rondelle en cuivre courbée) qui maintient le jeu de la roue des heures.',
    remontageTip: 'Contrôler le bon engrenage avec la chaussée lors de la rotation de la minuterie.',
    moebiusOil: 'Graisse Moebius 9504 ou D5 sur le canon de roue des heures'
  },
  {
    number: 11,
    title: 'Démontage du Mécanisme de Remontoir & Mise à l’Heure',
    side: 'Cadran (Affichage)',
    screwdriver: { name: 'Tournevis Noir / Rouge', colorClass: 'bg-red-500 text-white', diam: '1.20 mm' },
    tweezer: 'Brucelles Dumont N° 3',
    actionProtocol: [
      'Dévisser la vis du ressort de bascule en maintenant le ressort avec le doigt pour éviter qu’il ne saute.',
      'Retirer la bascule et son ressort.',
      'Dévisser la vis de tirette et extraire la tirette.',
      'Extraire le pignon coulant (à dents de loup) et le pignon de remontoir de la gorge de platine.'
    ],
    atelierWarning: 'PROJECTION DE RESSORT : Les ressorts de bascule ont une fâcheuse tendance à sauter à travers l’atelier. Gardez TOUJOURS un doigt posé dessus lors du dévissage.',
    remontageTip: 'Vérifier la netteté des dents de loup du pignon coulant pour garantir un remontage sans accroc.',
    moebiusOil: 'Graisse Moebius 9504 sur la gorge du pignon coulant et les crans de tirette'
  },
  {
    number: 12,
    title: 'Démontage des Antichocs Incabloc pour Nettoyage',
    side: 'Organe Régulateur',
    screwdriver: { name: 'Outil Incabloc / Brucelles N° 5', colorClass: 'bg-amber-500 text-slate-950', diam: 'Pointe 0.05 mm' },
    tweezer: 'Brucelles Dumont N° 5 fines',
    actionProtocol: [
      'Avec la pointe d’une brucelle N° 5, désengager les deux bras du ressort lyre Incabloc de leurs crans de verrouillage.',
      'Faire basculer le ressort lyre comme une charnière sans le tordre.',
      'Retourner la pièce sur du papier de soie pour faire glisser le contre-pivot en rubis et la pierre percée sertie.',
      'Répéter la même opération sur le bloc Incabloc du Coq.'
    ],
    atelierWarning: 'Le ressort lyre Incabloc ne s’enlève pas : il reste articulé dans son logement. Tirer dessus le détruira.',
    remontageTip: 'Après nettoyage, déposer une goutte d’huile Moebius 9010 occupant exactement 2/3 du diamètre du contre-pivot avant de refermer la lyre.',
    moebiusOil: 'Moebius 9010 (la goutte d’or au centre du contre-pivot)'
  }
];

export const ASSEMBLY_STEPS: StepDetail[] = [
  {
    number: 1,
    title: 'Remontage & Huilage des Antichocs Incabloc (Platine & Coq)',
    side: 'Organe Régulateur',
    screwdriver: { name: 'Pique-huile fin N° 30102-1', colorClass: 'bg-cyan-500 text-slate-950 font-bold', diam: 'Pointe 0.15 mm' },
    tweezer: 'Brucelles Dumont N° 5 fines & Papier de soie',
    actionProtocol: [
      'Nettoyer le contre-pivot en rubis plat et la pierre percée sertie à l’essence C / benzine rectifiée.',
      'DÉPÔT DE LA GOUTTE D’OR : Sur la face plane du contre-pivot, déposer une goutte d’huile synthétique Moebius 9010 occupant exactement 2/3 du diamètre du rubis.',
      'Repositionner délicatement la pierre percée par-dessus sans faire éclater le ménisque d’huile.',
      'Replacer le chaton dans le bloc Incabloc de platine et refermer avec douceur les deux branches de la lyre.',
      'Répéter l’opération identique sur le bloc Incabloc du Coq (balancier).'
    ],
    atelierWarning: 'DOSAGE ULTRA-CRITIQUE : Si le volume d’huile dépasse 2/3 du rubis, le ménisque casse et l’huile diffuse sur la platine par capillarité. Le pivot tournera à sec sous 30 jours.',
    remontageTip: 'Contrôler la goutte d’huile par transparence à la loupe 10x : elle doit former un cercle parfait au centre sans bavure.',
    moebiusOil: 'Moebius 9010 (Goutte calibrée aux 2/3 du diamètre du contre-pivot)'
  },
  {
    number: 2,
    title: 'Assemblage du Mécanisme de Remontoir & Graissage',
    side: 'Cadran (Affichage)',
    screwdriver: { name: 'Tournevis Rouge', colorClass: 'bg-red-500 text-white', diam: '1.20 mm' },
    tweezer: 'Brucelles Dumont N° 3',
    actionProtocol: [
      'Graisser la gorge du pignon coulant et le carré de la tige de remontoir avec la graisse thixotrope Moebius 9504.',
      'Positionner le pignon de remontoir et le pignon coulant (dents de loup face à face) dans le dégagement de platine.',
      'Enfiler la tige de remontoir pour aligner et maintenir les pignons.',
      'Installer la tirette côté cadran et engager la vis de tirette côté ponts (serrage modéré, 1 tour).',
      'Placer la bascule dans la gorge du coulant, puis poser le ressort de bascule en le maintenant fermement du doigt pendant le vissage.'
    ],
    atelierWarning: 'MAINTIEN OBLIGATOIRE DU RESSORT : Ne relâchez jamais le ressort de bascule tant que sa vis n’est pas complètement serrée sous peine de projection violente.',
    remontageTip: 'Actionner la tige en va-et-vient (remontage / mise à l’heure) : le passage doit être franc, sec et parfaitement franc.',
    moebiusOil: 'Graisse Moebius 9504 sur la gorge du coulant, les dents de loup et les crans de tirette'
  },
  {
    number: 3,
    title: 'Mise en Place de la Roue de Centre & Chassage de la Chaussée',
    side: 'Cadran (Affichage)',
    screwdriver: { name: 'Presse-chaussée / Outil Presto', colorClass: 'bg-amber-500 text-slate-950 font-bold', diam: 'Poussoir creux' },
    tweezer: 'Brucelles Dumont N° 1 ou N° 3',
    actionProtocol: [
      'Huiler la portée du canon de centre de la platine avec de l’huile épaisse Moebius HP-1300.',
      'Insérer la roue de centre (grande moyenne) par le côté ponts dans son coussinet de platine.',
      'Retourner le mouvement côté cadran en prenant appui SOUS le pivot de la roue de centre avec un faux-axe en laiton ou un tasseau.',
      'Déposer une micro-touche de Moebius HP-1300 sur l’arbre où vient frotter la lanterne de chaussée.',
      'Enfoncer la chaussée bien perpendiculairement jusqu’au déclic caractéristique de retenue.'
    ],
    atelierWarning: 'APPUI OBLIGATOIRE SOUS LE PIVOT : Chasser la chaussée sans soutien inférieur plie immédiatement la planche de roue de centre et brise son pivot.',
    remontageTip: 'Tester le couple de friction (gras de chaussée) en tournant la tige en position mise à l’heure : la rotation doit être douce, ferme et continue.',
    moebiusOil: 'Moebius HP-1300 sur la portée de centre et l’encoche de lanterne de chaussée'
  },
  {
    number: 4,
    title: 'Assemblage de la Minuterie & Clinquant Côté Cadran',
    side: 'Cadran (Affichage)',
    screwdriver: { name: 'Tournevis Noir', colorClass: 'bg-slate-900 text-white border border-slate-700', diam: '1.00 mm' },
    tweezer: 'Brucelles Dumont N° 3',
    actionProtocol: [
      'Déposer une micro-goutte de Moebius HP-1300 sur l’axe fixe de la roue de minuterie.',
      'Poser la roue de minuterie et visser le couvre-minuterie fermement.',
      'Graisser très légèrement le canon extérieur de la chaussée avec de la Moebius 9504.',
      'Enfiler la roue des heures par-dessus le canon de chaussée et engrener avec le pignon de minuterie.',
      'Déposer la rondelle clinquant bombée en cuivre sur la roue des heures pour absorber le jeu axial.'
    ],
    atelierWarning: 'ZÉRO HUILE SUR LES DENTS : Ne jamais huiler la denture de la roue des heures ni celle de la minuterie, seules les portées d’axe doivent être lubrifiées.',
    remontageTip: 'Vérifier la liberté de rotation de la roue des heures et la planéité du clinquant.',
    moebiusOil: 'Moebius HP-1300 sur l’axe de minuterie & Moebius 9504 sur le canon de chaussée'
  },
  {
    number: 5,
    title: 'Pose des Mobiles de Rouage (Train Cinématique)',
    side: 'Ponts (Mouvement)',
    screwdriver: { name: 'Pose manuelle aux brucelles', colorClass: 'bg-slate-400 text-slate-900 font-bold', diam: 'Brucelles fines' },
    tweezer: 'Brucelles Dumont N° 3 fines',
    actionProtocol: [
      'Retourner le calibre côté ponts sur le porte-pièce d’établi.',
      'Poser la roue moyenne en engageant son pignon dans la denture de la roue de centre.',
      'Présenter la roue des secondes (9h) et descendre avec précaution son long pivot à travers le tube central de platine.',
      'Poser la roue d’échappement en engrenant son pignon avec la serpe de la roue des secondes.',
      'S’assurer visuellement que les 3 roues reposent bien à plat dans leurs portées respectives.'
    ],
    atelierWarning: 'AXE DE SECONDE ULTRA-VULNÉRABLE : Le pivot de seconde mesure Ø 0.12 mm. Ne jamais forcer ni poser la roue de travers, la moindre contrainte tord l’axe.',
    remontageTip: 'Contrôler à la loupe que les ailes de pignons ne sont pas coincées sous la denture des roues adjacentes.',
    moebiusOil: 'La lubrification des pierres de rouage s’effectue après la pose et le vissage du pont'
  },
  {
    number: 6,
    title: 'Pose du Pont de Rouage & Guidage des 3 Pivots',
    side: 'Ponts (Mouvement)',
    screwdriver: { name: 'Tournevis Rouge', colorClass: 'bg-red-500 text-white', diam: '1.20 mm' },
    tweezer: 'Brucelles Dumont N° 3 & Cheville de sureau taillée en coin',
    actionProtocol: [
      'Présenter le pont de rouage au-dessus des 3 mobiles sans appuyer.',
      'Avec la cheville de sureau, guider le pivot de la roue moyenne dans son rubis, puis celui de la roue des secondes, et enfin celui de la roue d’échappement.',
      'Le pont doit descendre seul et sans résistance sur ses pieds de positionnement.',
      'Visser progressivement les 3 vis de pont de rouage de manière équilibrée.',
      'CONTRÔLE DU RECUL DE ROUAGE : Effleurer la roue moyenne ; le train de rouage doit tourner avec vélocité et présenter un retour arrière net.'
    ],
    atelierWarning: 'INTERDICTION DE FORCER : Si le pont ne descend pas de lui-même à plat, un pivot est hors de sa pierre. Serrer une vis écraserait net le pivot !',
    remontageTip: 'Le retour arrière (recul franc de la roue d’échappement) prouve l’absence totale de friction et l’alignement parfait des ébats.',
    moebiusOil: 'Déposer la Moebius 9010 dans les creusures des rubis de rouage (1/2 à 2/3 du réservoir)'
  },
  {
    number: 7,
    title: 'Pose du Tambour de Barillet & Pont de Barillet',
    side: 'Ponts (Mouvement)',
    screwdriver: { name: 'Tournevis Rouge', colorClass: 'bg-red-500 text-white', diam: '1.20 mm' },
    tweezer: 'Brucelles Dumont N° 1 ou Laiton',
    actionProtocol: [
      'Lubrifier la portée inférieure de l’arbre de barillet dans la platine avec de la Moebius HP-1300.',
      'Installer le tambour de barillet complet dans son logement.',
      'Poser le pont de barillet en engageant la portée supérieure de l’arbre dans la pierre du pont.',
      'Visser les 2 vis de fixation du pont de barillet.',
      'Vérifier l’ébat de hauteur du barillet (norme NIHS : 0.05 à 0.08 mm) et la liberté d’action du cliquet.'
    ],
    atelierWarning: 'Vérifiez la position du ressort de cliquet avant de rabattre le pont pour ne pas le pincer ou le tordre.',
    remontageTip: 'Vérifier l’engrènement fluide entre la denture du tambour de barillet et le pignon de la roue de centre.',
    moebiusOil: 'Moebius HP-1300 sur les deux portées (supérieure et inférieure) de l’arbre de barillet'
  },
  {
    number: 8,
    title: 'Montage de la Roue de Couronne & Rochet (Attention Pas à Gauche)',
    side: 'Ponts (Mouvement)',
    screwdriver: { name: 'Tournevis Violet / Rouge', colorClass: 'bg-purple-500 text-white', diam: '1.40 à 1.60 mm' },
    tweezer: 'Brucelles Dumont N° 1',
    actionProtocol: [
      'Lubrifier la face inférieure de la bague intermédiaire avec de la Moebius HP-1300.',
      'Poser la bague et la roue de couronne sur le pont de barillet.',
      'ATTENTION SENS INVERSÉ (PAS À GAUCHE) : Visser la vis de roue de couronne EN SENS ANTI-HORAIRE pour la serrer.',
      'Poser le rochet sur le carré de l’arbre de barillet.',
      'Visser la vis de rochet (pas standard à droite) avec le tournevis violet 1.40 mm.',
      'Armer de 2 clics : le train de rouage doit s’emballer immédiatement avec un sifflement régulier.'
    ],
    atelierWarning: 'DANGER CASSE DE VIS : La vis de roue de couronne a un PAS À GAUCHE. Visser dans le sens habituel des aiguilles d’une montre casse instantanément la tête de vis dans le pont !',
    remontageTip: 'Le sifflement du train d’engrenage après 2 clics d’armage confirme que toute la chaîne cinématique est parfaitement libre.',
    moebiusOil: 'Moebius HP-1300 sous la roue de couronne et sur la portée du rochet'
  },
  {
    number: 9,
    title: 'Lubrification Méthodique de l’Établi (Les 25 Points d’Huile)',
    side: 'Ponts (Mouvement)',
    screwdriver: { name: 'Huiliers 4 Godets & Piques-huiles 30102', colorClass: 'bg-cyan-500 text-slate-950 font-bold', diam: 'Piques-huiles 1 & 2' },
    tweezer: 'Brucelles Dumont N° 3 & Loupe d’atelier 10x',
    actionProtocol: [
      'Huiler à la Moebius HP-1300 les pierres de barillet et de roue de centre (haute pression, rotation lente).',
      'Huiler à la Moebius 9010 les pierres de roue moyenne, roue des secondes et roue d’échappement (haute vitesse, faible couple).',
      'Retourner le calibre et huiler les pierres inférieures correspondantes côté platine.',
      'RÈGLE D’OR SUISSE : Le ménisque d’huile doit occuper rigoureusement entre 1/2 et 2/3 de la creusure du rubis.',
      'Essuyer le pique-huile sur une tranche de moelle de sureau propre entre chaque dépose.'
    ],
    atelierWarning: 'INTERDICTION FORMELLE : Ne jamais huiler les ailes des pignons ni la serpe des roues. L’huile attire la poussière et fige le rouage.',
    remontageTip: 'Vérifier la concentricité de chaque ménisque d’huile à la loupe 10x par réflexion lumineuse.',
    moebiusOil: 'Moebius HP-1300 (rouage lent/barillet) & Moebius 9010 (rouage rapide/échappement)'
  },
  {
    number: 10,
    title: 'Pose de l’Ancre Suisse & Lubrification Spécifique des Levées',
    side: 'Ponts (Mouvement)',
    screwdriver: { name: 'Tournevis Jaune ou Blanc', colorClass: 'bg-yellow-400 text-slate-900 font-bold', diam: '0.80 mm' },
    tweezer: 'Brucelles Dumont N° 3 fines',
    actionProtocol: [
      'Prendre l’ancre par la tige de fourchette et engager délicatement le pivot inférieur dans sa pierre de platine.',
      'Poser le pont d’ancre bien perpendiculairement et engager le pivot supérieur dans sa pierre.',
      'Visser les 2 vis de pont d’ancre de manière symétrique et mesurée.',
      'TEST DU SAUT D’ANCRE : Effleurer la fourchette avec un poil de pinceau ; l’ancre doit sauter d’une touche à l’autre par l’action motrice du rouage armé.',
      'LUBRIFICATION DES PALETTES : Déposer une infime trace de graisse thixotrope Moebius 9415 sur le plan d’impulsion de 2 à 3 dents de la roue d’échappement uniquement.'
    ],
    atelierWarning: 'PIVOTS D’ANCRE À SEC : Les pivots d’ancre NE SONT JAMAIS HUILÉS. Tout lubrifiant sur les pivots d’ancre altère la liberté de battement et fait boiter le mouvement.',
    remontageTip: 'Faire osciller l’ancre 5 à 6 fois manuellement pour que la graisse Moebius 9415 se liquéfie à l’impact et tapisse les deux levées de rubis.',
    moebiusOil: 'Moebius 9415 (graisse thixotrope spécifique sur les plans d’impulsion des palettes uniquement)'
  },
  {
    number: 11,
    title: 'Pose de l’Organe Régulateur (Balancier-Spiral & Coq)',
    side: 'Organe Régulateur',
    screwdriver: { name: 'Tournevis Noir', colorClass: 'bg-slate-900 text-white border border-slate-700', diam: '1.00 mm' },
    tweezer: 'Brucelles Dumont N° 3',
    actionProtocol: [
      'Saisir le Coq par la table avec des brucelles fermes sans jamais toucher au spiral Nivarox.',
      'Présenter le balancier verticalement et faire descendre le pivot inférieur dans le bloc Incabloc de platine.',
      'Orienter la cheville de plateau pour qu’elle pénètre au cœur des cornes de la fourchette d’ancre.',
      'Rabattre le Coq à plat sur son plot de positionnement sans aucune contrainte axiale sur le spiral.',
      'Serrer la vis de Coq fermement avec le tournevis noir 1.00 mm.',
      'CONTRÔLE SPONTANÉ DU DÉPART : Le balancier doit démarrer immédiatement avec une amplitude ample et symétrique.'
    ],
    atelierWarning: 'ZONE SUPRÊME DE PRUDENCE : Si le spiral touche la serpe du balancier ou le dessous du pont, la montre avancera de plusieurs heures par jour. Vérifier la planéité des spires.',
    remontageTip: 'Contrôler que la lame du spiral respire librement et de façon parfaitement centrée entre les goupilles de raquette.',
    moebiusOil: 'Contre-pivots Incabloc déjà huilés à l’étape 01'
  },
  {
    number: 12,
    title: 'Remise de la Tige de Remontoir, Armage & Diagnostic Acoustique COSC',
    side: 'Ponts (Mouvement)',
    screwdriver: { name: 'Tournevis Noir & Vibrographe Witschi', colorClass: 'bg-emerald-500 text-slate-950 font-bold', diam: '1.00 mm' },
    tweezer: 'Brucelles Dumont N° 3',
    actionProtocol: [
      'Réinsérer la tige de remontoir dans son canon et resserrer la vis de tirette d’un tour complet.',
      'Procéder à l’armage complet du ressort moteur (environ 28 à 30 tours de couronne).',
      'Déposer le calibre sur le microphone piézoélectrique du vibrographe Witschi Chronoscope.',
      'Vérifier la marche diurne instantanée (tolérance : -4 à +6 s/j selon critères chronométriques).',
      'Vérifier l’angle d’amplitude du balancier (270° à 315° à plat) et l’erreur de repère (beat error < 0.6 ms).',
      'Mesurer sur les 5 positions d’examen : CH, CB, 6H, 9H, 3H.'
    ],
    atelierWarning: 'REPÈRE HORS TOLÉRANCE : Si l’erreur de repère dépasse 0.6 ms, pivoter avec infinie délicatesse le porte-piton mobile avant de toucher à la flèche de raquette.',
    remontageTip: 'Laisser stabiliser le mouvement 20 à 30 minutes avant de porter le jugement définitif pour permettre la dispersion optimale des huiles Moebius.',
    moebiusOil: 'Contrôle final d’absence de projection d’huile sous lumière UV'
  }
];

export default function DemontagePage() {
  const [direction, setDirection] = useState<'disassembly' | 'assembly'>('disassembly');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const steps = direction === 'disassembly' ? DISASSEMBLY_STEPS : ASSEMBLY_STEPS;
  const currentStep = steps[currentStepIndex] || steps[0];

  const handleSwitchDirection = (newDirection: 'disassembly' | 'assembly') => {
    setDirection(newDirection);
    setCurrentStepIndex(0);
  };

  const isDisassembly = direction === 'disassembly';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* --- HERO HEADER --- */}
      <section className="relative pt-12 pb-8 border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/pratique"
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l’Espace Pratique</span>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Wrench className="w-3.5 h-3.5 text-amber-500" />
                <span>🇨🇭 Protocole d’Atelier Officiel • Calibre ETA 6497-1</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {isDisassembly ? (
                  <>
                    Simulateur de Démontage Méthodique <br />
                    <span className="text-amber-500">Ordre Chronologique Strict (1 à 12)</span>
                  </>
                ) : (
                  <>
                    Protocole de Remontage & Lubrification <br />
                    <span className="text-emerald-500">Rigueur Inverse & Huilage Moebius (1 à 12)</span>
                  </>
                )}
              </h1>

              <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                {isDisassembly
                  ? 'Le cheminement d’établi rigoureux enseigné dans les écoles d’horlogerie suisses (AFP & CFC). Maîtrisez l’ordre précis de dépose, le tournevis exact à chaque vis et la sécurisation immédiate du spiral.'
                  : 'La reconstruction méthodique du calibre dans l’ordre rigoureusement inverse. Appliquez les 25 points de lubrification Moebius spécifiques (9010, HP-1300, 9415, 9504), le contrôle des ébats et le diagnostic final au vibrographe COSC.'}
              </p>
            </div>

            {/* Bascule Mode Démontage vs Mode Remontage */}
            <div className="flex p-1.5 rounded-2xl bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex-shrink-0 shadow-lg">
              <button
                type="button"
                onClick={() => handleSwitchDirection('disassembly')}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  isDisassembly
                    ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold scale-105'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>1. Séquence Démontage (1 à 12)</span>
              </button>
              <button
                type="button"
                onClick={() => handleSwitchDirection('assembly')}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  !isDisassembly
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold scale-105'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Droplet className="w-4 h-4" />
                <span>2. Ordre Remontage & Huilage</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- CORPS DU SIMULATEUR --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Bandeau d'état du Mode Actif */}
        <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs ${
          isDisassembly 
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-300' 
            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
        }`}>
          <div className="flex items-center gap-2.5">
            <span className={`w-3 h-3 rounded-full animate-pulse ${isDisassembly ? 'bg-amber-500' : 'bg-emerald-500'}`} />
            <span className="font-bold uppercase tracking-wider">
              {isDisassembly ? 'Mode Actif : Dépose Méthodique du Calibre' : 'Mode Actif : Reconstitution, Huilage des 25 Points & Diagnostic COSC'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>Étape sélectionnée : <strong className="text-slate-900 dark:text-white font-sans">{currentStepIndex + 1} / 12</strong></span>
            <span className="hidden md:inline text-slate-400">•</span>
            <span className="hidden md:inline">Côté : <strong className="text-slate-900 dark:text-white">{currentStep.side}</strong></span>
          </div>
        </div>

        {/* Barre de navigation des 12 étapes */}
        <div className="p-4 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-md flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-1.5 min-w-max">
            {steps.map((s, idx) => (
              <button
                key={s.number}
                type="button"
                onClick={() => setCurrentStepIndex(idx)}
                className={`w-10 h-10 rounded-2xl text-xs font-bold transition-all flex flex-col items-center justify-center ${
                  currentStepIndex === idx
                    ? isDisassembly
                      ? 'bg-amber-500 text-slate-950 scale-105 shadow-md shadow-amber-500/25 font-extrabold'
                      : 'bg-emerald-500 text-slate-950 scale-105 shadow-md shadow-emerald-500/25 font-extrabold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{s.number < 10 ? `0${s.number}` : s.number}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentStepIndex === 0}
              className={`p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-30 border border-transparent ${
                isDisassembly ? 'hover:border-amber-500' : 'hover:border-emerald-500'
              }`}
              title="Étape Précédente"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1))}
              disabled={currentStepIndex === steps.length - 1}
              className={`p-2.5 rounded-xl text-slate-950 disabled:opacity-30 font-bold ${
                isDisassembly ? 'bg-amber-500 hover:bg-amber-400' : 'bg-emerald-500 hover:bg-emerald-400'
              }`}
              title="Étape Suivante"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Fiche Technique d'Étape Active */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Panneau Principal de l'Opération */}
          <div className="lg:col-span-8 p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#0c101b] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-5">
              <div className="flex items-center justify-between gap-2">
                <span className={`text-xs font-mono font-extrabold px-3 py-1 rounded-full text-slate-950 ${
                  isDisassembly ? 'bg-amber-500' : 'bg-emerald-500'
                }`}>
                  {isDisassembly ? 'DÉMONTAGE' : 'REMONTAGE & HUILAGE'} • ÉTAPE {currentStep.number < 10 ? `0${currentStep.number}` : currentStep.number} / 12
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  Côté : {currentStep.side}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {currentStep.title}
              </h2>
            </div>

            {/* Protocole d'intervention */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 dark:text-slate-400">
                Protocole Opératoire à l’Établi :
              </h3>
              <div className="space-y-2.5">
                {currentStep.actionProtocol.map((line, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-start gap-3.5 text-xs sm:text-sm"
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 ${
                      isDisassembly
                        ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                        : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                    }`}>
                      {idx + 1}
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                      {line}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Avertissement & Conseil de Remontage */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs space-y-1.5">
                <div className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                  <span>Alerte Casse & Risque d’Atelier</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {currentStep.atelierWarning}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-1.5">
                <div className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>Consigne de Remontage & Contrôle Qualité</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {currentStep.remontageTip}
                </p>
              </div>
            </div>
          </div>

          {/* Panneau Latéral : Outillage Spécifique Requis pour cette Étape */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
              <div className={`text-xs uppercase font-extrabold tracking-widest flex items-center gap-2 ${
                isDisassembly ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
              }`}>
                <Wrench className="w-4 h-4" />
                <span>Outils Exacts à Préparer</span>
              </div>

              {/* Tournevis Requis */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="text-[10px] uppercase font-bold text-slate-400">Tournevis Recommandé :</div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-xl font-bold text-xs ${currentStep.screwdriver.colorClass}`}>
                    Ø {currentStep.screwdriver.diam}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white text-xs">
                    {currentStep.screwdriver.name}
                  </span>
                </div>
              </div>

              {/* Brucelles Requises */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="text-[10px] uppercase font-bold text-slate-400">Brucelles & Précision :</div>
                <div className="font-bold text-slate-900 dark:text-white text-xs">
                  {currentStep.tweezer}
                </div>
              </div>

              {/* Huilage Associé si présent */}
              {currentStep.moebiusOil && (
                <div className={`p-4 rounded-2xl border space-y-1.5 ${
                  isDisassembly
                    ? 'bg-amber-500/10 border-amber-500/30'
                    : 'bg-cyan-500/10 border-cyan-500/30'
                }`}>
                  <div className={`text-[10px] uppercase font-bold flex items-center gap-1.5 ${
                    isDisassembly
                      ? 'text-amber-700 dark:text-amber-400'
                      : 'text-cyan-700 dark:text-cyan-400'
                  }`}>
                    <Droplet className="w-3.5 h-3.5" />
                    <span>Lubrification & Spécification Moebius :</span>
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white text-xs">
                    {currentStep.moebiusOil}
                  </div>
                </div>
              )}

              {/* Bouton de progression rapide */}
              <button
                type="button"
                onClick={() => setCurrentStepIndex((prev) => (prev + 1) % steps.length)}
                className={`w-full py-3.5 rounded-2xl text-slate-950 font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2 ${
                  isDisassembly
                    ? 'bg-amber-500 hover:bg-amber-400 shadow-amber-500/20'
                    : 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/20'
                }`}
              >
                <span>Valider & Passer à l’Étape Suivante</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
