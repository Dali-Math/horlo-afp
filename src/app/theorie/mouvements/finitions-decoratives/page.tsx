'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Sparkles,
  Eye,
  ZoomIn,
  Sliders
} from 'lucide-react';

export default function FinitionsDecorativesPage() {
  const [selectedTechnique, setSelectedTechnique] = useState<string>('anglage');
  const [finishingLevel, setFinishingLevel] = useState<number>(88);
  const [loupe10x, setLoupe10x] = useState<boolean>(false);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const getAnglageState = (val: number) => {
    if (val < 35) {
      return {
        mode: 'raw',
        badge: 'BRUT D’ÉTAMPAGE / FRAISAGE — BAVURE NON ÉLIMINÉE',
        color: 'text-rose-500 border-rose-500/40 bg-rose-500/10',
        title: 'Arête vive à 90° avec bavure métallique résiduelle (Risque d’arrêt)',
        desc: 'Sortie de presse ou d’usinage brut : une lèvre de métal écroui (bavure de 10 à 25 µm) subsiste sur l’arête supérieure et le flanc présente des stries verticales d’arrachement. Cette bavure peut se détacher en fonctionnement et bloquer un pignon.',
        surfaceRa: 'Ra 0.80 µm (Stries brutes)',
        interiorCorner: 'Brut / Écrasé',
        verdict: 'INACCEPTABLE EN HORLOGERIE SOIGNÉE (DANGER DE COPEAU LIBRE)'
      };
    }
    if (val <= 72) {
      return {
        mode: 'cnc',
        badge: 'CHANFREIN MACHINE CNC À 45° — FINITION INDUSTRIELLE',
        color: 'text-amber-500 border-amber-500/40 bg-amber-500/10',
        title: 'Chanfrein plat usiné à la fraise diamant : rayon résiduel dans l’angle',
        desc: 'La fraise rotative coupe un plan incliné strict à 45° qui élimine la bavure. Toutefois, une fraise cylindrique en rotation ne peut physiquement pas usiner un angle rentrant vif : le creux conserve obligatoirement le rayon de l’outil (R = 0.20 mm).',
        surfaceRa: 'Ra 0.12 µm (Facettes fraise)',
        interiorCorner: 'Rayon R = 0.20 mm (Arrondi)',
        verdict: 'PROPRE MÉCANIQUEMENT MAIS SANS ANGLE RENTRANT ARTISANAL'
      };
    }
    return {
      mode: 'hand',
      badge: 'HAUTE HORLOGERIE — ANGLAGE MAIN BERCÉ & ANGLE RENTRANT',
      color: 'text-emerald-500 border-emerald-500/40 bg-emerald-500/10',
      title: 'Anglage bercé poli miroir à la tige de gentiane & arête rentrante vive',
      desc: 'Ouvert à la lime douce, adouci au cabron d’émeri 4/0 puis poli miroir à la cheville de bois de gentiane chargée de pâte diamant (1 µm puis 0.25 µm). Le profil est légèrement bombé (« bercé »), le flanc est étiré au trait et les deux bandeaux se rejoignent en une ligne d’angle rentrant d’une netteté chirurgicale.',
      surfaceRa: 'Ra < 0.01 µm (Poli miroir)',
      interiorCorner: 'Angle rentrant vif (Arête pure)',
      verdict: 'EXCELLENCE ARTISANALE (POINÇON DE GENÈVE / FINITION MAIN)'
    };
  };

  const anglageInfo = getAnglageState(finishingLevel);

  const techniques = [
    {
      id: 'anglage',
      name: 'Anglage & Angle Rentrant',
      subtitle: 'Hand Beveling & Interior Angle',
      icon: '◇',
      description: 'Chanfrein bercé poli miroir sur l’arête des ponts, dressé à la lime et à la tige de gentiane',
      details: {
        outil: 'Lime cabron, papier émeri 4/0, bois de gentiane & pâte diamant 0.25 µm',
        finition: 'Profil légèrement bercé (convexe) poli miroir sans facettes ni ondulations',
        angle: '45° nominal • Largeur régulière de 0.30 à 0.80 mm',
        signature: 'Angle rentrant vif (impossible à réaliser avec une fraise rotative CNC)',
        duree: '2 à 8 heures par pont selon le nombre d’angles rentrants et sortants'
      },
      avantages: ['Élimine toute bavure susceptible de se détacher', 'Empêche l’étalement capillaire des huiles', 'Preuve irréfutable du travail manuel'],
      usages: ['Philippe Dufour (Simplicity)', 'Kari Voutilainen', 'Patek Philippe & Vacheron Constantin']
    },
    {
      id: 'perlage',
      name: 'Perlage',
      subtitle: 'Circular Graining',
      icon: '⚪',
      description: 'Décor de cercles concentriques se chevauchant à 50 % sur la platine et les noyures',
      details: {
        outil: 'Cheville en bois de buis ou cabron abrasif monté sur perceuse sensitive',
        technique: 'Rotation à 1 500–2 500 tr/min, pas de recouvrement strict d’un demi-diamètre',
        effet: 'Surface satinée mate captant les micro-poussières hors des rouages',
        duree: '30 min à 2 h selon le nombre de noyures de la platine',
        zones: 'Platine principale, fond des noyures de barillet et dessous des ponts'
      },
      avantages: ['Masque les traces d’usinage', 'Révèle immédiatement toute poussière à l’inspection', 'Stabilise l’état de surface'],
      usages: ['Patek Philippe', 'Audemars Piguet', 'A. Lange & Söhne']
    },
    {
      id: 'cotes',
      name: 'Côtes de Genève',
      subtitle: 'Geneva Stripes',
      icon: '〰️',
      description: 'Ondes parallèles finement striées sur la face supérieure des ponts rhodiés ou maillechort',
      details: {
        outil: 'Meule de buis ou disque souple abrasif incliné d’un léger angle d’attaque',
        technique: 'Translation rectiligne du chariot sous l’outil en rotation',
        largeur: '0.8 à 2.0 mm par côte avec ligne de séparation franche',
        effet: 'Diffraction soyeuse de la lumière changeant selon l’inclinaison du poignet',
        origine: 'Tradition horlogère genevoise codifiée au XIXe siècle'
      },
      avantages: ['Évite l’éblouissement sous la loupe d’établi', 'Identité visuelle genevoise', 'Contraste sublime avec l’anglage poli miroir'],
      usages: ['Vacheron Constantin', 'Patek Philippe', 'Chopard L.U.C']
    },
    {
      id: 'polinoir',
      name: 'Poli Noir (Spéculaire)',
      subtitle: 'Black Polishing / Specular Polish',
      icon: '⬛',
      description: 'Polissage plan absolu des pièces en acier (cages de tourbillon, coqs, têtes de vis)',
      details: {
        outil: 'Lapidaire en zinc pur parfaitement dressé et enduit de pâte diamantée',
        technique: 'Frottement manuel en « 8 » sans aucune pression déséquilibrée',
        effet: 'La lumière est réfléchie dans une seule direction : la pièce paraît noire d’un côté et blanche éclatante de l’autre',
        difficulte: 'La moindre poussière sur le bloc de zinc oblige à reprendre tout le polissage à zéro',
        duree: '3 à 6 heures pour un seul pont de cage de tourbillon en acier'
      },
      avantages: ['Plus haut degré de finition de l’acier trempé', 'Résistance accrue à l’oxydation', 'Planéité optique au dixième de micron'],
      usages: ['Breguet', 'Greubel Forsey', 'A. Lange & Söhne']
    },
    {
      id: 'guillochage',
      name: 'Guillochage Main',
      subtitle: 'Rose-Engine & Straight-Line Turning',
      icon: '🌀',
      description: 'Gravure au burin sur tour à guillocher manuel à cames (rosaces ou ligne droite)',
      details: {
        machine: 'Tour à guillocher à rosaces ou tour à ligne droite guidé à la main',
        motifs: 'Clous de Paris, grain d’orge, vieux panier, flammé, panier tressé',
        application: 'Cadrans en or ou argent massif, masses oscillantes en platine ou or',
        precision: 'Profondeur de sillon de 0.04 mm régulée uniquement par le toucher de l’artisan',
        temps: '6 à 16 heures par cadran sans droit à l’erreur'
      },
      avantages: ['Antireflet naturel sur le cadran pour une lisibilité parfaite des aiguilles', 'Chaque cadran possède le rythme vivant de la main', 'Patrimoine horloger séculaire'],
      usages: ['Breguet (depuis 1786)', 'Kari Voutilainen', 'Andersen Genève']
    },
    {
      id: 'etirage',
      name: 'Étirage des Flancs & Moulures',
      subtitle: 'Straight-Graining & Polished Sinks',
      icon: '═',
      description: 'Satinage longitudinal au trait des flancs de ponts et polissage sphérique des gouttes de rubis',
      details: {
        types: 'Traits rectilignes parallèles au plan de la platine sur toute la tranche du pont',
        grain: 'Cabron garni de papier émeri grain 600 à 1 200',
        moulures: 'Découvertes (noyures de vis et de pierres) polies miroir au diamant sur cheville de buis',
        effet: 'Contraste mat/miroir entre le flanc vertical étiré et l’anglage à 45° poli',
        methode: 'Dressage rigoureusement perpendiculaire pour ne pas arrondir l’arête inférieure'
      },
      avantages: ['Supprime toutes les stries verticales d’étampage ou d’électroérosion', 'Souligne la finesse architecturale du pont', 'Exigence fondamentale du Poinçon de Genève'],
      usages: ['Audemars Piguet', 'Roger Dubuis', 'Laurent Ferrier']
    }
  ];

  const quizData = [
    {
      question: "Quelle est la fonction technique première du perlage et de l’ébavurage, au-delà de l’esthétique ?",
      options: [
        "Augmenter la masse de la platine",
        "Éliminer toute bavure métallique susceptible de se détacher et rendre les micro-poussières visibles à l’inspection",
        "Modifier le rapport d’engrenage du rouage",
        "Aimantiser les ponts en laiton"
      ],
      correct: 1,
      explanation: "L’anglage et le perlage ont une origine fonctionnelle : éliminer les bavures d’usinage qui pourraient tomber dans les pignons, empêcher la corrosion et faciliter le repérage visuel des poussières."
    },
    {
      question: "Pourquoi un « angle rentrant » vif prouve-t-il qu’un anglage a été terminé à la main ?",
      options: [
        "Parce qu’une fraise rotative cylindrique (CNC) laisse obligatoirement son rayon d’outil au fond de l’intersection",
        "Parce que les machines CNC ne peuvent pas incliner leur tête à 45°",
        "Parce que le laiton ne peut pas être fraisé",
        "Parce que l’angle rentrant est peint au pinceau"
      ],
      correct: 0,
      explanation: "Une fraise en rotation possède un rayon non nul : au creux de deux chanfreins convergents, elle laisse toujours un arrondi. Seul le travail manuel à la lime, au cabron et à la tige de gentiane permet de dessiner une arête rentrante vive."
    },
    {
      question: "Avec quel bois traditionnel l’horloger-angleur réalise-t-il le polissage miroir final à la pâte diamant ?",
      options: [
        "Le chêne vert",
        "La tige de gentiane et le bois de buis (ou fusain)",
        "Le pin maritime",
        "Le bambou verni"
      ],
      correct: 1,
      explanation: "La tige de gentiane séchée offre une structure fibreuse dense mais tendre qui retient la pâte diamantée (0.25 µm) et épouse le profil bercé du chanfrein sans le rayer."
    },
    {
      question: "En quoi consiste le « poli noir » (ou polissage spéculaire) sur un pont de tourbillon en acier ?",
      options: [
        "À appliquer un vernis noir mat sur l’acier",
        "À chauffer l’acier à 300 °C jusqu’au bleuissement",
        "À polir l’acier à plat sur un bloc de zinc enduit de pâte diamant jusqu’à obtenir une réflexion spéculaire pure",
        "À sabler la pièce au corindon"
      ],
      correct: 2,
      explanation: "Sur un bloc de zinc dressé, l’acier atteint une planéité telle que tous les rayons lumineux sont réfléchis dans une direction unique : sous certains angles d’observation, la surface paraît d’un noir profond absolu."
    }
  ];

  const handleQuizAnswer = (questionIndex: number, optionIndex: number) => {
    if (!showResults) {
      setQuizAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex.toString() }));
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quizData.forEach((q, index) => {
      if (parseInt(quizAnswers[index]) === q.correct) correct++;
    });
    return correct;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <section className="relative pt-12 pb-10 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/theorie/mouvements"
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l’Architecture du Mouvement</span>
          </Link>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Critères du Poinçon de Genève • Anglage Main, Poli Noir &amp; Côtes</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Finitions Décoratives &amp; <br />
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-200 dark:via-amber-400 dark:to-amber-500 bg-clip-text text-transparent">
                Anglage Main de Haute Horlogerie
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              Nées de la nécessité technique d’éliminer les bavures d’étampage, de protéger le métal de l’oxydation et de retenir les poussières hors du rouage, les finitions manuelles (anglage bercé à la gentiane, poli noir sur bloc de zinc, perlage et Côtes de Genève) signent l’excellence d’un calibre.
            </p>
          </div>
        </div>
      </section>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <section className="rounded-3xl bg-white dark:bg-[#0b101b] border-2 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>Comparateur Optique sous Binoculaire (x25) • Coupe &amp; Vue de Dessus</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Brut d’Étampage vs Chanfrein CNC 45° vs Anglage Main Bercé (Angle Rentrant)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
                Déplacez le curseur pour comparer l’arête d’un pont sous le microscope d’atelier : voyez pourquoi une fraise CNC laisse toujours un rayon arrondi, tandis que la lime et la tige de gentiane sculptent un angle rentrant vif.
              </p>
            </div>

            <button
              onClick={() => setLoupe10x(!loupe10x)}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all self-start lg:self-auto ${
                loupe10x
                  ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md shadow-sky-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
              }`}
            >
              <ZoomIn className="w-4 h-4" />
              <span>Loupe 10x {loupe10x ? 'ON' : 'OFF'}</span>
            </button>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-6 relative overflow-hidden">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-3">
                <span>COUPE TRANSVERSALE DE L’ARÊTE (x25)</span>
                <span>VUE DE DESSUS : ANGLE RENTRANT (x15)</span>
              </div>

              <div className="overflow-hidden rounded-xl bg-[#060a12]">
                <svg
                  viewBox="0 0 680 340"
                  className="w-full h-auto transition-transform duration-300"
                  style={{
                    transform: loupe10x ? 'scale(1.48)' : 'scale(1)',
                    transformOrigin: '340px 165px'
                  }}
                >
                  <defs>
                    <linearGradient id="mirrorBevel" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#f8fafc" />
                      <stop offset="45%" stopColor="#fde047" />
                      <stop offset="55%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#94a3b8" />
                    </linearGradient>
                  </defs>

                  <line x1="340" y1="15" x2="340" y2="325" stroke="#1e293b" strokeWidth="2" strokeDasharray="5 5" />

                  <g transform="translate(25, 25)">
                    <text x="145" y="20" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">
                      Profil de la Tranche du Pont
                    </text>

                    {anglageInfo.mode === 'raw' && (
                      <g>
                        <path
                          d="M 35 265 L 35 95 L 225 95 L 234 78 L 228 98 L 225 265 Z"
                          fill="#334155"
                          stroke="#f43f5e"
                          strokeWidth="2.5"
                        />
                        <circle cx="230" cy="86" r="18" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />
                        <text x="230" y="58" textAnchor="middle" fill="#fb7185" fontSize="10" fontWeight="bold">
                          Bavure d’étampage (15 µm)
                        </text>
                        <g stroke="#64748b" strokeWidth="1.5">
                          <line x1="220" y1="115" x2="225" y2="250" />
                          <line x1="214" y1="115" x2="218" y2="250" />
                          <line x1="208" y1="115" x2="211" y2="250" />
                        </g>
                        <text x="135" y="290" textAnchor="middle" fill="#fb7185" fontSize="10" fontFamily="monospace">
                          Flanc brut d’arrachement • Arête vive 90°
                        </text>
                      </g>
                    )}

                    {anglageInfo.mode === 'cnc' && (
                      <g>
                        <path
                          d="M 35 265 L 35 95 L 175 95 L 225 145 L 225 265 Z"
                          fill="#334155"
                          stroke="#cbd5e1"
                          strokeWidth="2"
                        />
                        <line x1="175" y1="95" x2="225" y2="145" stroke="#f59e0b" strokeWidth="5" />
                        <text x="215" y="82" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">
                          Plan 45° plat (Fraise CNC)
                        </text>
                        <text x="135" y="290" textAnchor="middle" fill="#fbbf24" fontSize="10" fontFamily="monospace">
                          Micro-stries d’outil • Arêtes latérales cassées
                        </text>
                      </g>
                    )}

                    {anglageInfo.mode === 'hand' && (
                      <g>
                        <path
                          d="M 35 265 L 35 95 L 165 95 Q 208 102 225 152 L 225 265 Z"
                          fill="#334155"
                          stroke="#e2e8f0"
                          strokeWidth="2"
                        />
                        <path
                          d="M 165 95 Q 208 102 225 152"
                          fill="none"
                          stroke="url(#mirrorBevel)"
                          strokeWidth="6"
                          strokeLinecap="round"
                        />
                        <g stroke="#94a3b8" strokeWidth="1" opacity="0.8">
                          <line x1="45" y1="175" x2="222" y2="175" />
                          <line x1="45" y1="195" x2="222" y2="195" />
                          <line x1="45" y1="215" x2="222" y2="215" />
                          <line x1="45" y1="235" x2="222" y2="235" />
                        </g>
                        <text x="205" y="76" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">
                          Anglage bercé poli miroir (Gentiane)
                        </text>
                        <text x="135" y="290" textAnchor="middle" fill="#34d399" fontSize="10" fontFamily="monospace">
                          Flanc étiré au trait horizontal • Reflet spéculaire
                        </text>
                      </g>
                    )}
                  </g>

                  <g transform="translate(365, 25)">
                    <text x="145" y="20" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">
                      Intersection de Deux Courbes (Angle Rentrant)
                    </text>

                    {anglageInfo.mode === 'raw' && (
                      <g>
                        <path
                          d="M 35 60 L 235 60 C 205 110, 165 140, 125 155 C 165 170, 205 200, 235 250 L 35 250 Z"
                          fill="#334155"
                          stroke="#f43f5e"
                          strokeWidth="2.5"
                        />
                        <circle cx="125" cy="155" r="24" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />
                        <text x="145" y="290" textAnchor="middle" fill="#fb7185" fontSize="10" fontFamily="monospace">
                          Aucun chanfrein • Bavures dans le creux
                        </text>
                      </g>
                    )}

                    {anglageInfo.mode === 'cnc' && (
                      <g>
                        <path
                          d="M 35 60 L 235 60 C 205 110, 165 140, 138 148 Q 120 155 138 162 C 165 170, 205 200, 235 250 L 35 250 Z"
                          fill="#334155"
                          stroke="#94a3b8"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M 225 60 C 195 108, 160 135, 136 145 Q 112 155 136 165 C 160 175, 195 202, 225 250"
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="10"
                          strokeLinecap="round"
                        />
                        <circle cx="124" cy="155" r="14" fill="none" stroke="#f43f5e" strokeWidth="2" />
                        <text x="195" y="158" fill="#fbbf24" fontSize="10" fontWeight="bold">
                          Rayon fraise R = 0.20 mm
                        </text>
                        <text x="145" y="290" textAnchor="middle" fill="#fbbf24" fontSize="10" fontFamily="monospace">
                          Creux arrondi par le diamètre de la fraise CNC
                        </text>
                      </g>
                    )}

                    {anglageInfo.mode === 'hand' && (
                      <g>
                        <path
                          d="M 35 60 L 235 60 C 200 112, 162 142, 118 155 C 162 168, 200 198, 235 250 L 35 250 Z"
                          fill="#334155"
                          stroke="#e2e8f0"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M 235 60 C 200 112, 162 142, 118 155 L 92 155 C 145 138, 182 108, 215 60 Z"
                          fill="url(#mirrorBevel)"
                        />
                        <path
                          d="M 235 250 C 200 198, 162 168, 118 155 L 92 155 C 145 172, 182 202, 215 250 Z"
                          fill="url(#mirrorBevel)"
                        />
                        <line x1="92" y1="155" x2="122" y2="155" stroke="#10b981" strokeWidth="3" />
                        <circle cx="105" cy="155" r="22" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" />
                        <text x="195" y="158" fill="#34d399" fontSize="10" fontWeight="bold">
                          Arête Rentrante Vive !
                        </text>
                        <text x="145" y="290" textAnchor="middle" fill="#34d399" fontSize="10" fontFamily="monospace">
                          Intersection franche taillée main à la lime &amp; gentiane
                        </text>
                      </g>
                    )}
                  </g>
                </svg>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold border ${anglageInfo.color}`}>
                <span>{anglageInfo.badge}</span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                {anglageInfo.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {anglageInfo.desc}
              </p>

              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-amber-500" />
                    Degré de Finition de l’Arête :
                  </span>
                  <span className="font-mono text-amber-600 dark:text-amber-400">{finishingLevel} %</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={98}
                  value={finishingLevel}
                  onChange={(e) => setFinishingLevel(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <button
                    onClick={() => setFinishingLevel(15)}
                    className="px-2 py-1.5 rounded-lg text-[11px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30"
                  >
                    1. Brut (Bavure)
                  </button>
                  <button
                    onClick={() => setFinishingLevel(52)}
                    className="px-2 py-1.5 rounded-lg text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                  >
                    2. Chanfrein CNC
                  </button>
                  <button
                    onClick={() => setFinishingLevel(88)}
                    className="px-2 py-1.5 rounded-lg text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                  >
                    3. Anglage Main
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400">RUGOSITÉ DE SURFACE</div>
                  <div className="font-bold text-slate-900 dark:text-white mt-0.5">{anglageInfo.surfaceRa}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400">GÉOMÉTRIE CREUX</div>
                  <div className="font-bold text-slate-900 dark:text-white mt-0.5">{anglageInfo.interiorCorner}</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono font-bold text-amber-800 dark:text-amber-300">
                VERDICT BINOCULAIRE : {anglageInfo.verdict}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-white">
              Les 6 Techniques Maîtresses de Décoration &amp; Finition
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
              Cliquez sur chaque technique pour inspecter les outils d’atelier, la granulométrie des abrasifs et les critères de contrôle.
            </p>
          </div>

          <div className="grid gap-4">
            {techniques.map((tech) => (
              <div key={tech.id}>
                <div
                  onClick={() => setSelectedTechnique(selectedTechnique === tech.id ? '' : tech.id)}
                  className={`bg-white dark:bg-[#0c101b] rounded-2xl border-2 p-6 cursor-pointer transition-all ${
                    selectedTechnique === tech.id
                      ? 'border-amber-500 shadow-lg'
                      : 'border-slate-200 dark:border-slate-800 hover:border-amber-500/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{tech.icon}</span>
                      <div>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                          {tech.name}
                        </h3>
                        <p className="text-xs font-mono text-amber-600 dark:text-amber-400 font-bold">
                          {tech.subtitle}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                          {tech.description}
                        </p>
                      </div>
                    </div>
                    {selectedTechnique === tech.id && (
                      <CheckCircle2 className="w-6 h-6 text-amber-500 flex-shrink-0 ml-4" />
                    )}
                  </div>
                </div>

                {selectedTechnique === tech.id && (
                  <div className="mt-3 bg-slate-100/80 dark:bg-slate-900/80 rounded-2xl p-6 border-l-4 border-amber-500 space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      {Object.entries(tech.details).map(([key, value]) => (
                        <div
                          key={key}
                          className="bg-white dark:bg-[#0c101b] p-4 rounded-xl border border-slate-200 dark:border-slate-800"
                        >
                          <p className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase mb-1">
                            {key}
                          </p>
                          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">{value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-[#0c101b] p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                          ✓ Bénéfices Techniques &amp; Optiques
                        </h4>
                        <ul className="space-y-1.5">
                          {tech.avantages.map((av, idx) => (
                            <li key={idx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                              <span className="text-emerald-500">•</span>
                              <span>{av}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white dark:bg-[#0c101b] p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
                          ⭐ Références d’Exécution
                        </h4>
                        <ul className="space-y-1.5">
                          {tech.usages.map((usage, idx) => (
                            <li key={idx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                              <span className="text-amber-500">•</span>
                              <span>{usage}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-white">
            Quiz : Contrôle Qualité des Finitions Horlogères
          </h2>

          <div className="bg-white dark:bg-[#0c101b] rounded-3xl shadow-xl p-6 sm:p-8 border-2 border-slate-200 dark:border-slate-800 space-y-6">
            {quizData.map((q, qIndex) => (
              <div key={qIndex} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3">
                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  {qIndex + 1}. {q.question}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((option, oIndex) => {
                    const isSelected = quizAnswers[qIndex] === oIndex.toString();
                    const isCorrect = oIndex === q.correct;
                    const showAnswer = showResults && isSelected;

                    return (
                      <button
                        key={oIndex}
                        onClick={() => handleQuizAnswer(qIndex, oIndex)}
                        disabled={showResults}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all ${
                          showAnswer && isCorrect
                            ? 'border-emerald-500 bg-emerald-500/15 font-bold text-emerald-700 dark:text-emerald-300'
                            : showAnswer && !isCorrect
                            ? 'border-rose-500 bg-rose-500/15 font-bold text-rose-700 dark:text-rose-300'
                            : isSelected
                            ? 'border-amber-500 bg-amber-500/15 font-bold text-amber-800 dark:text-amber-300'
                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-500'
                        }`}
                      >
                        <span>{option}</span>
                      </button>
                    );
                  })}
                </div>
                {showResults && quizAnswers[qIndex] !== undefined && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-800 dark:text-amber-300">
                    <strong>Explication :</strong> {q.explanation}
                  </div>
                )}
              </div>
            ))}

            {Object.keys(quizAnswers).length === quizData.length && !showResults && (
              <button
                onClick={() => setShowResults(true)}
                className="w-full bg-amber-500 text-slate-950 font-extrabold py-3.5 px-6 rounded-xl hover:bg-amber-400 transition-colors text-sm"
              >
                Vérifier mes Réponses ({Object.keys(quizAnswers).length}/{quizData.length})
              </button>
            )}

            {showResults && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center font-bold text-sm text-emerald-700 dark:text-emerald-300">
                Score obtenu : {calculateScore()} / {quizData.length}
              </div>
            )}
          </div>
        </section>
      </article>
    </div>
  );
}
