"use client";

import React, { useState } from "react";
import Link from "next/link";

interface QuizOption {
  text: string;
  correct: boolean;
}

interface QuizQuestion {
  title: string;
  desc: string;
  hint: string;
  options: QuizOption[];
  feedbackGood: string;
  feedbackBad: string;
}

const QUIZ_DATA: QuizQuestion[] = [
  {
    title: "Cas 1 : Le balancier et son spiral",
    desc: "Observez attentivement cette vue de profil sous la loupe 10x. Le mouvement avance anormalement (+45 min/j). Que remarquez-vous ?",
    hint: "Indice : Observez la hauteur des spires extérieures par rapport à la face inférieure du pont de balancier (coq).",
    options: [
      { text: "Le spiral forme un cône et frotte sous le coq", correct: true },
      { text: "La palette de sortie de l'ancre est ébréchée", correct: false },
      { text: "Une vis de serge de balancier est mal serrée", correct: false },
      { text: "La roue d'échappement manque d'huile Moebius 9415", correct: false }
    ],
    feedbackGood: "Excellente analyse : le défaut provient de la perte de planéité du spiral qui vient toucher le coq, réduisant la longueur active de la lame.",
    feedbackBad: "Ce n'est pas cela. Reprenez l'observation de la planéité du spiral et de son dégagement vertical sous le coq."
  },
  {
    title: "Cas 2 : Le blocage du rouage",
    desc: "Après avoir serré les vis du pont de rouage, les mobiles refusent de tourner sous la pression du rochet. Quelle en est la cause ?",
    hint: "Indice : Ne jamais forcer sur une vis de pont sans avoir contrôlé le battement libre de chaque axe.",
    options: [
      { text: "La chaîne cinématique est inversée", correct: false },
      { text: "Un pivot de mobile est écrasé hors de son rubis", correct: true },
      { text: "L'huile 9010 est trop visqueuse pour le calibre", correct: false },
      { text: "Le ressort de tirette est trop bandé", correct: false }
    ],
    feedbackGood: "Parfait réflexe : le pont a été bridé alors qu'un pivot supérieur butait sur la table plane du rubis.",
    feedbackBad: "Incorrect. C'est l'erreur classique du débutant : un pivot décalé a été cisaillé lors du serrage de la vis de pont."
  },
  {
    title: "Cas 3 : La vis de rochet récalcitrante",
    desc: "Vous devez démonter le rochet d'un mouvement mécanique. La vis porte 3 traits radiaux sur sa tête. Que signifie ce marquage officiel ?",
    hint: "Indice : Observez le sens des fentes selon la norme horlogère suisse pour les filetages inversés.",
    options: [
      { text: "C'est une vis à pas à gauche : desserrage dans le sens horaire ↻", correct: true },
      { text: "C'est un traitement thermique spécial nécessitant de chauffer à 100°C", correct: false },
      { text: "C'est une vis scellée au frein-filet Loctite indémontable", correct: false },
      { text: "Elle indique simplement le numéro de lot de manufacture", correct: false }
    ],
    feedbackGood: "Exactement ! Les 3 traits indiquent formellement un pas à gauche. Tenter de la dévisser en sens anti-horaire la casse net.",
    feedbackBad: "Attention ! Les 3 traits désignent impérativement un filetage inversé à pas à gauche (desserrage horaire)."
  }
];

interface CaseData {
  id: string;
  num: string;
  category: string;
  title: string;
  badImg: string;
  goodImg: string;
  badCaption: string;
  goodCaption: string;
  symptome: string;
  cause: string;
  geste: string;
  tool: string;
}

const CASES: CaseData[] = [
  {
    id: "c1",
    num: "01",
    category: "Barillet & Énergie",
    title: "Le ressort de barillet qui saute à l'insertion",
    badImg: "/images/depannage/cas-01-error.jpg",
    goodImg: "/images/depannage/cas-01-good.jpg",
    badCaption: "⚠️ Éjection incontrôlée : Spire vrillée et feuillard hors plan",
    goodCaption: "✅ Bon geste : remonte-ressort adapté, maintien sous protection et bride engagée.",
    symptome: "Le ressort échappe violemment des doigts ou des brucelles, claque, se vrille en hélice ou raye le tambour de barillet.",
    cause: "Tentative d'enroulement manuel sans outil adapté. La tension élastique exponentielle libère un couple de torsion incontrôlé.",
    geste: "Toujours utiliser un <strong>remonte-ressort (estrapade Bergeon 2729)</strong> de calibre adéquat sous film protecteur Mylar. Redressement délicat à la pince plate à mors polis doux.",
    tool: "Outil : Estrapade Bergeon • Lubrifiant : Moebius 8217 (3 touches à 120°)"
  },
  {
    id: "c2",
    num: "02",
    category: "Rouage & Ébats",
    title: "Le pont de rouage forcé & le pivot écrasé",
    badImg: "/images/depannage/cas-02-error.jpg",
    goodImg: "/images/depannage/cas-02-good.jpg",
    badCaption: "⚠️ Forçage de pont : Pivot écrasé hors du trou de rubis",
    goodCaption: "✅ Bon geste : le pont descend sans forcer, chaque pivot est centré et l'ébat est vérifié.",
    symptome: "Après serrage des vis de pont, le rouage refuse de tourner. Au démontage, le pivot supérieur de la roue moyenne ou de seconde est tordu à 45° ou rompu.",
    cause: "Le pivot n'était pas engagé dans la creusure du rubis. Serrer la vis applique une pression axiale destructrice sur un acier trempé de 0.08 mm de diamètre.",
    geste: "<strong>Ne jamais forcer sur une vis de pont.</strong> Palper doucement chaque mobile à la brucelle douce en laiton ou buis : on doit voir et sentir le mobile flotter librement de haut en bas.",
    tool: "Contrôle : Brucelle buis / laiton • Huilage : Moebius 9010 (1/2 de creusure)"
  },
  {
    id: "c3",
    num: "03",
    category: "Échappement & Sécurité",
    title: "L'ancre rebelle & le dard frottant sur le plateau",
    badImg: "/images/depannage/cas-03-error.jpg",
    goodImg: "/images/depannage/cas-03-good.jpg",
    badCaption: "⚠️ Sécurité faussée : Le dard frotte contre le petit plateau",
    goodCaption: "✅ Bon geste : garde au dard calibrée, passage libre de la cheville et ébats symétriques.",
    symptome: "Le balancier s'arrête net sans cause apparente, avance de façon erratique ou produit un son de tic-tac dissymétrique au vibrographe.",
    cause: "Le dard est faussé ou la cheville de plateau vient buter contre l'encoche de l'ancre. L'ébattement de sécurité n'est plus garanti.",
    geste: "Contrôler la <strong>garde au dard</strong> sous binoculaire 10x : au repos, l'ancre poussée vers la touche ne doit jamais toucher le petit plateau sans dégagement par la cheville.",
    tool: "Contrôle : Loupe 10x & Witschi • Lubrification : Moebius 9415 (levées uniquement)"
  },
  {
    id: "c4",
    num: "04",
    category: "Organe Réglant",
    title: "Le spiral en cône ou les spires collées",
    badImg: "/images/depannage/cas-04-error.jpg",
    goodImg: "/images/depannage/cas-04-good.jpg",
    badCaption: "⚠️ Perte de planéité : Spires collées ou frottant sous le coq",
    goodCaption: "✅ Bon geste : spiral parfaitement plan, spires concentriques et dégagement sous coq.",
    symptome: "Le balancier bat avec une amplitude ridicule (< 160°) ou avance de 2 heures par jour. Les spires semblent emmêlées ou frottent le coq.",
    cause: "Mauvaise manipulation avec la brucelle lors de la pose du coq, projection d'huile lors du huilage du contre-pivot, ou magnétisme intense.",
    geste: "Dégraisser au <strong>bain One-Dip</strong> si les spires sont grasses, puis passer au <strong>démagnétiseur d'établi</strong>. Règle absolue : le spiral doit rester rigoureusement sec.",
    tool: "Outils : Brucelles n°5 Dumont • Bain One-Dip • Démagnétiseur Elma"
  },
  {
    id: "c5",
    num: "05",
    category: "Remontoir & Minuterie",
    title: "Le coulant déboîté & la vis de rochet cisaillée",
    badImg: "/images/depannage/cas-05-error.jpg",
    goodImg: "/images/depannage/cas-05-good.jpg",
    badCaption: "⚠️ Vis de tirette trop desserrée : Ergot échappé de la gorge du coulant",
    goodCaption: "✅ Bon geste : vis repérée, déblocage mesuré et coulant maintenu dans son logement.",
    symptome: "La couronne tourne dans le vide sans enclencher la mise à l'heure, ou la vis de couronne casse net au ras du pont lors d'une tentative de démontage.",
    cause: "1) Vis de tirette trop desserrée lors du retrait de tige. 2) Ignorance du pas à gauche : forcer dans le sens anti-horaire sur une vis à filetage inversé.",
    geste: "Toute vis horlogère portant <strong>3 traits sur sa tête se dévisse dans le sens horaire ↻</strong>. Ne desserrer la vis de tirette que d'un tour et demi maximum.",
    tool: "Sens : Pas à gauche (3 traits) • Lubrification : Moebius 9504 / Klüber P125"
  },
  {
    id: "c6",
    num: "06",
    category: "Aiguillage & Friction",
    title: "La chaussée lâche & le lanternage délicat",
    badImg: "/images/depannage/cas-06-error.jpg",
    goodImg: "/images/depannage/cas-06-good.jpg",
    badCaption: "⚠️ Chaussée mal positionnée : Friction altérée et risque d'écrasement",
    goodCaption: "✅ Bon geste : pige de calibrage cylindrique insérée et lanternage équilibré.",
    symptome: "Le rouage tourne parfaitement mais les aiguilles s'arrêtent au passage de la date à minuit. À la couronne, la mise à l'heure tourne trop facilement, sans résistance.",
    cause: "Perte de friction de la chaussée sur la tige de roue de centre. Lanterner directement sans pige intérieure écrase le tube de façon ovale et fêle le métal.",
    geste: "Insérer impérativement une <strong>pige de calibrage cylindrique</strong> dans l'alésage avant d'utiliser la <strong>pince à lanterner Bergeon 6827</strong>. Couple visé : 15 à 25 cNm avec Moebius HP-1300.",
    tool: "Outil : Pince à lanterner Bergeon 6827 • Lubrifiant : Moebius HP-1300"
  }
];

export default function DepannageErreursPage() {
  const [views, setViews] = useState<Record<string, "bad" | "good">>({
    c1: "bad",
    c2: "bad",
    c3: "bad",
    c4: "bad",
    c5: "bad",
    c6: "bad"
  });

  // Quiz state
  const [currentQ, setCurrentQ] = useState<number>(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const setCaseView = (caseId: string, view: "bad" | "good") => {
    setViews((prev) => ({ ...prev, [caseId]: view }));
  };

  const handleValidateQuiz = () => {
    if (selectedOpt === null) {
      setFeedback({
        isCorrect: false,
        text: "Sélectionnez une réponse avant de valider."
      });
      return;
    }

    const currentQuestion = QUIZ_DATA[currentQ];
    const isCorrect = currentQuestion.options[selectedOpt].correct;

    if (isCorrect) {
      setFeedback({
        isCorrect: true,
        text: currentQuestion.feedbackGood
      });
      setTimeout(() => {
        setCurrentQ((prev) => (prev + 1) % QUIZ_DATA.length);
        setSelectedOpt(null);
        setShowHint(false);
        setFeedback(null);
      }, 2800);
    } else {
      setFeedback({
        isCorrect: false,
        text: currentQuestion.feedbackBad
      });
    }
  };

  const q = QUIZ_DATA[currentQ];

  return (
    <div className="depannage-page-root">
      <style dangerouslySetInnerHTML={{ __html: `
:root {
  --paper: #f6f1e8;
  --paper-2: #fbf8f2;
  --ink: #171717;
  --muted: #6c675e;
  --line: #ded6c9;
  --gold: #a9864d;
  --gold-dark: #826535;
  --dark: #0c0f11;
  --ruby: #8c2b3d;
  --green: #3f6e51;
  --bad-red: #b91c1c;
  --good-green: #15803d;
}

html.dark {
  --paper: #090d13;
  --paper-2: #121822;
  --ink: #f1f5f9;
  --muted: #94a3b8;
  --line: #222d3d;
  --gold: #c59b27;
  --gold-dark: #e4be53;
  --dark: #06080b;
  --ruby: #e11d48;
  --green: #10b981;
}

.depannage-page-root {
  background: var(--paper);
  color: var(--ink);
  font-family: Inter, -apple-system, sans-serif;
  min-height: 100vh;
  padding-top: 88px;
  transition: background-color 0.25s ease, color 0.25s ease;
}

.container {
  width: min(1480px, calc(100% - 40px));
  margin: 0 auto;
}

/* BREADCRUMB */
.depannage-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-family: ui-monospace, 'JetBrains Mono', monospace;
  color: var(--muted);
  padding: 16px 0;
  border-bottom: 1px solid var(--line);
}
.depannage-breadcrumb a {
  color: var(--muted);
  transition: color 0.2s;
}
.depannage-breadcrumb a:hover {
  color: var(--gold);
}
.depannage-breadcrumb .sep {
  opacity: 0.5;
}
.depannage-breadcrumb .current {
  color: var(--gold);
  font-weight: 600;
}

/* HERO */
.hero {
  min-height: 520px;
  position: relative;
  overflow: hidden;
  background: #0c0f11;
  color: white;
  display: flex;
  align-items: center;
}
.hero-photo {
  position: absolute;
  inset: 0;
  background-image: url('/images/depannage/hero.jpg');
  background-size: cover;
  background-position: center right;
}
.hero-photo::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(9,11,13,0.98) 0%, rgba(9,11,13,0.92) 40%, rgba(9,11,13,0.50) 65%, rgba(9,11,13,0.05) 100%);
}
.hero-content {
  position: relative;
  z-index: 2;
  padding: 64px 0;
  max-width: 720px;
}
.eyebrow {
  display: flex;
  align-items: center;
  gap: 14px;
  font: 700 10px ui-monospace, 'JetBrains Mono', monospace;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #d6cec0;
}
.eyebrow::after {
  content: "";
  width: 70px;
  height: 1px;
  background: var(--gold);
}
.hero h1 {
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 500;
  font-size: clamp(40px, 5.5vw, 76px);
  line-height: 0.95;
  letter-spacing: -0.04em;
  margin: 20px 0 18px;
}
.hero-lead {
  font-size: 17px;
  line-height: 1.55;
  max-width: 680px;
  color: #f3eee6;
  margin-bottom: 8px;
}
.hero-copy {
  font-size: 15px;
  line-height: 1.65;
  max-width: 640px;
  color: #c8c2b9;
}
.hero-btn {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  margin-top: 26px;
  background: var(--gold);
  color: white;
  padding: 13px 24px;
  border: 1px solid #b89a62;
  font-family: Georgia, serif;
  font-size: 15px;
  transition: transform 0.2s, background-color 0.2s;
  cursor: pointer;
}
.hero-btn:hover {
  background: var(--gold-dark);
  transform: translateY(-1px);
}

/* PILLARS */
.pillars {
  background: var(--paper-2);
  border-bottom: 1px solid var(--line);
  padding: 24px 0;
}
.pillar-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
.pillar {
  display: grid;
  grid-template-columns: 86px 1fr;
  gap: 14px;
  align-items: center;
  border: 1px solid var(--line);
  background: var(--paper);
  padding: 10px 14px 10px 10px;
  min-height: 106px;
  transition: all 0.2s ease;
  text-decoration: none;
  color: inherit;
}
.pillar:hover {
  border-color: var(--gold);
  transform: translateY(-2px);
}
.pillar img {
  width: 82px;
  height: 82px;
  object-fit: cover;
  border-radius: 50%;
  filter: saturate(0.85) contrast(1.05);
}
.pillar h3 {
  margin: 0 0 4px;
  font-size: 18px;
  font-family: Georgia, serif;
  font-weight: 500;
  color: var(--ink);
}
.pillar p {
  margin: 0;
  color: var(--muted);
  font-size: 12.5px;
  line-height: 1.45;
}
.arrow {
  display: block;
  color: var(--gold);
  font-size: 18px;
  margin-top: 4px;
}

/* SECTION */
.section {
  padding: 56px 0 24px;
}
.section-kicker {
  display: flex;
  align-items: center;
  gap: 14px;
  color: var(--muted);
  font: 700 10px ui-monospace, 'JetBrains Mono', monospace;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
.section-kicker::before {
  content: "";
  width: 36px;
  height: 1px;
  background: var(--gold);
}
.section-title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 30px;
  margin: 12px 0 28px;
}
.section-title-row h2 {
  font-family: Georgia, serif;
  font-size: clamp(32px, 3.8vw, 56px);
  line-height: 1.02;
  margin: 0;
  letter-spacing: -0.04em;
}
.section-note {
  max-width: 300px;
  font: italic 13px/1.55 Georgia, serif;
  color: var(--muted);
  padding-left: 36px;
  position: relative;
}
.section-note::before {
  content: "";
  position: absolute;
  left: 0;
  top: 10px;
  width: 26px;
  height: 1px;
  background: var(--gold);
}

/* CASES GRID (6 CASES) */
.case-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.case {
  background: var(--paper-2);
  border: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  min-width: 0;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.case:hover {
  border-color: var(--gold);
  box-shadow: 0 8px 24px -10px rgba(0,0,0,0.12);
}
.case-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border-bottom: 1px solid var(--line);
  background: var(--paper);
}
.case-head-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.case-no {
  font: 500 18px Georgia, serif;
  color: var(--gold);
  padding-right: 10px;
  border-right: 1px solid var(--line);
}
.case-cat {
  font: 700 9px ui-monospace, 'JetBrains Mono', monospace;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

/* Toggle Erreur vs Bon geste */
.view-toggle {
  display: inline-flex;
  background: var(--paper-2);
  border: 1px solid var(--line);
  border-radius: 4px;
  padding: 2px;
}
.vt-btn {
  background: transparent;
  border: 0;
  color: var(--muted);
  font-size: 11px;
  font-family: ui-monospace, 'JetBrains Mono', monospace;
  padding: 4px 9px;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.2s;
}
.vt-btn.active.bad {
  background: rgba(185, 28, 28, 0.15);
  color: var(--bad-red);
  font-weight: 700;
}
.vt-btn.active.good {
  background: rgba(21, 128, 61, 0.15);
  color: var(--good-green);
  font-weight: 700;
}

/* Image Container */
.case-image {
  height: 280px;
  background: #0d1117;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.case-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* DEDICATED STATUS BAR UNDER IMAGE (NO OVERLAP WITH PHOTO TEXT) */
.case-status-bar {
  padding: 8px 14px;
  font-size: 11px;
  line-height: 1.4;
  font-family: ui-monospace, 'JetBrains Mono', monospace;
  border-bottom: 1px solid var(--line);
  display: flex;
  align-items: center;
  gap: 8px;
}
.case-status-bar.bad {
  background: #240707;
  color: #fef2f2;
  border-color: rgba(185, 28, 28, 0.35);
}
.case-status-bar.good {
  background: #071610;
  color: #ecfdf5;
  border-color: rgba(21, 128, 61, 0.35);
}

/* Body */
.case-body {
  padding: 20px 18px 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.case-body h3 {
  font-family: Georgia, serif;
  font-weight: 500;
  font-size: 22px;
  line-height: 1.15;
  margin: 0 0 16px;
  letter-spacing: -0.02em;
  color: var(--ink);
}
.fact {
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 10px;
  margin-top: 14px;
}
.fact-icon {
  color: var(--gold);
  font-size: 16px;
  line-height: 1.3;
}
.fact strong {
  display: block;
  font: 500 13px Georgia, serif;
  margin-bottom: 3px;
  color: var(--ink);
}
.fact p {
  margin: 0;
  color: var(--muted);
  font: 13px/1.55 Inter, sans-serif;
}
.fact.rescue {
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid var(--line);
}
.fact.rescue strong {
  color: var(--good-green);
}
.tool-tag {
  margin-top: 16px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-family: ui-monospace, 'JetBrains Mono', monospace;
  color: var(--muted);
  background: var(--paper);
  border: 1px solid var(--line);
  padding: 6px 10px;
  border-radius: 4px;
}

/* QUIZ / TEST D'ATELIER */
.quiz {
  padding: 40px 0 70px;
}
.quiz-box {
  border: 1px solid var(--line);
  background: var(--paper-2);
  display: grid;
  grid-template-columns: 1.15fr 0.95fr 0.9fr;
  gap: 0;
  min-height: 330px;
}
.quiz-copy {
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.quiz-copy h2 {
  font-family: Georgia, serif;
  font-size: 34px;
  line-height: 1.05;
  margin: 14px 0 12px;
  letter-spacing: -0.03em;
}
.quiz-copy p {
  font: 15px/1.55 Georgia, serif;
  color: var(--muted);
  max-width: 440px;
}
.quiz-btn {
  margin-top: 18px;
  background: var(--gold);
  color: white;
  border: 0;
  padding: 12px 20px;
  font-family: Georgia, serif;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
  align-self: flex-start;
}
.quiz-btn:hover {
  background: var(--gold-dark);
}
.quiz-photo {
  min-height: 330px;
  overflow: hidden;
  background: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid var(--line);
  border-right: 1px solid var(--line);
}
.quiz-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.quiz-options {
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.progress {
  display: flex;
  align-items: center;
  gap: 14px;
  color: var(--muted);
  font-size: 12px;
  font-family: ui-monospace, 'JetBrains Mono', monospace;
  margin-bottom: 20px;
}
.progress-line {
  height: 2px;
  background: var(--line);
  flex: 1;
  position: relative;
}
.progress-line::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: var(--progress-width, 33%);
  height: 2px;
  background: var(--gold);
  transition: width 0.3s;
}
.option {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 10px 0;
  font: 14px Georgia, serif;
  color: var(--ink);
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 4px;
  transition: background-color 0.15s;
}
.option:hover {
  background: rgba(169, 134, 77, 0.08);
}
.option input {
  appearance: none;
  width: 18px;
  height: 18px;
  border: 1px solid var(--muted);
  border-radius: 50%;
  position: relative;
  outline: none;
  cursor: pointer;
  flex-shrink: 0;
}
.option input:checked {
  border-color: var(--gold);
}
.option input:checked::after {
  content: "";
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  background: var(--gold);
}
.validate {
  margin-top: 18px;
  background: #c9ae79;
  color: white;
  border: 0;
  padding: 12px 26px;
  font-family: Georgia, serif;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.validate:hover {
  background: var(--gold);
}
.result {
  min-height: 22px;
  margin-top: 14px;
  font-size: 13px;
  line-height: 1.45;
  font-family: Inter, sans-serif;
}

/* RESPONSIVE */
@media (max-width: 1200px) {
  .case-grid { grid-template-columns: repeat(2, 1fr); }
  .pillar-grid { grid-template-columns: repeat(2, 1fr); }
  .quiz-box { grid-template-columns: 1fr 1fr; }
  .quiz-options { grid-column: 1 / -1; border-left: 0; border-top: 1px solid var(--line); }
}
@media (max-width: 768px) {
  .depannage-page-root { padding-top: 76px; }
  .case-grid { grid-template-columns: 1fr; }
  .pillar-grid { grid-template-columns: 1fr; }
  .quiz-box { grid-template-columns: 1fr; }
  .quiz-photo { border-left: 0; border-right: 0; border-top: 1px solid var(--line); }
  .section-title-row { flex-direction: column; align-items: flex-start; }
  .section-note { padding-left: 0; max-width: none; }
  .section-note::before { display: none; }
}
` }} />

      {/* FIL D'ARIANE PROPRE (PAS DE DOUBLE EN-TÊTE) */}
      <div className="container">
        <div className="depannage-breadcrumb">
          <Link href="/">HorloLearn</Link>
          <span className="sep">/</span>
          <Link href="/pratique">Pratique &amp; Atelier</Link>
          <span className="sep">/</span>
          <span className="current">Dépannage &amp; Erreurs courantes d'établi</span>
        </div>
      </div>

      {/* ==================== HERO ==================== */}
      <div className="hero">
        <div className="hero-photo"></div>
        <div className="container">
          <div className="hero-content">
            <div className="eyebrow">Atelier d'horlogerie · Guide de survie</div>
            <h1>Dépannage &amp;<br /><span style={{ color: "var(--gold)" }}>Erreurs courantes</span></h1>
            <p className="hero-lead">
              Les apprentis font tous les mêmes erreurs au début : ressort qui saute, pivot tordu au serrage du pont, dard qui frotte ou vis de rochet cisaillée.
            </p>
            <p className="hero-copy">
              Ce module pratique est pensé pour vous éviter la casse, vous apprendre à repérer l’anomalie au premier coup d’œil sous binoculaire et vous donner immédiatement le geste technique certifié par les normes suisses.
            </p>
            <a href="#cases" className="hero-btn">Explorer les 6 cas d'atelier ↓</a>
          </div>
        </div>
      </div>

      {/* ==================== 4 PILIERS ==================== */}
      <section className="pillars">
        <div className="container">
          <div className="pillar-grid">
            <a href="#case1" className="pillar">
              <img src="/images/depannage/cas-01-good.jpg" alt="Barillet et ressort moteur" />
              <div>
                <h3>1. Barillet &amp; énergie</h3>
                <p>Ressort moteur, tambour et couvercle : maîtrise des forces vives et des enroulements.</p>
                <span className="arrow">→</span>
              </div>
            </a>
            <a href="#case2" className="pillar">
              <img src="/images/depannage/cas-02-good.jpg" alt="Rouage et pivot" />
              <div>
                <h3>2. Rouage &amp; ébats</h3>
                <p>Mobiles de grande moyenne, moyenne et seconde : alignement vertical et jeu axial.</p>
                <span className="arrow">→</span>
              </div>
            </a>
            <a href="#case3" className="pillar">
              <img src="/images/depannage/cas-03-good.jpg" alt="Ancre et échappement" />
              <div>
                <h3>3. Échappement &amp; réglage</h3>
                <p>Ancre suisse, dard, petit plateau et spiral : les micro-détails de la précision.</p>
                <span className="arrow">→</span>
              </div>
            </a>
            <a href="#case5" className="pillar">
              <img src="/images/depannage/cas-05-good.jpg" alt="Remontoir et tigerie" />
              <div>
                <h3>4. Remontoir &amp; friction</h3>
                <p>Tirette, coulant, vis de rochet à pas à gauche et lanterne de chaussée.</p>
                <span className="arrow">→</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 6 CAS ==================== */}
      <section className="section" id="cases">
        <div className="container">
          <div className="section-kicker">Diagnostic sous loupe</div>
          <div className="section-title-row">
            <h2>Les 6 erreurs critiques d'établi</h2>
            <div className="section-note">
              Chaque fiche détaille l'erreur courante, l'origine cinématique et le geste technique certifié par les normes d'atelier.
            </div>
          </div>

          <div className="case-grid">
            {CASES.map((c) => {
              const isBad = views[c.id] === "bad";
              return (
                <article key={c.id} className="case" id={`case${c.num.replace(/^0+/, "")}`}>
                  <div className="case-head">
                    <div className="case-head-left">
                      <span className="case-no">{c.num}</span>
                      <span className="case-cat">{c.category}</span>
                    </div>
                    <div className="view-toggle">
                      <button
                        className={`vt-btn ${isBad ? "active bad" : ""}`}
                        onClick={() => setCaseView(c.id, "bad")}
                      >
                        ❌ Erreur
                      </button>
                      <button
                        className={`vt-btn ${!isBad ? "active good" : ""}`}
                        onClick={() => setCaseView(c.id, "good")}
                      >
                        ✅ Bon geste
                      </button>
                    </div>
                  </div>

                  {/* Photo pure sans texte ou boîte qui superpose */}
                  <div className="case-image">
                    <img
                      src={isBad ? c.badImg : c.goodImg}
                      alt={isBad ? c.title : c.goodCaption}
                    />
                  </div>

                  {/* Barre de statut dédiée, propre et nette sous la photo */}
                  <div className={`case-status-bar ${isBad ? "bad" : "good"}`}>
                    <span>{isBad ? c.badCaption : c.goodCaption}</span>
                  </div>

                  <div className="case-body">
                    <h3>{c.title}</h3>
                    <div className="fact">
                      <div className="fact-icon">⚡</div>
                      <div>
                        <strong>Symptôme d'établi</strong>
                        <p>{c.symptome}</p>
                      </div>
                    </div>
                    <div className="fact">
                      <div className="fact-icon">⚙</div>
                      <div>
                        <strong>Cause mécanique</strong>
                        <p>{c.cause}</p>
                      </div>
                    </div>
                    <div className="fact rescue">
                      <div className="fact-icon">✓</div>
                      <div>
                        <strong>Geste d'atelier &amp; Règle d'or</strong>
                        <p dangerouslySetInnerHTML={{ __html: c.geste }} />
                      </div>
                    </div>
                    <div className="tool-tag">{c.tool}</div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== TEST D'ATELIER (QUIZ 3 COLONNES) ==================== */}
      <section className="quiz" id="test-etabli">
        <div className="container">
          <div className="quiz-box">
            {/* Col 1 : Explications et boutons */}
            <div className="quiz-copy">
              <div>
                <div className="section-kicker">Diagnostic sous binoculaire</div>
                <h2>{q.title}</h2>
                <p>{q.desc}</p>
              </div>

              <div>
                {!showHint ? (
                  <button className="quiz-btn" onClick={() => setShowHint(true)}>
                    Afficher l’indice d'artisan →
                  </button>
                ) : (
                  <div id="hint" className="result" style={{ color: "var(--gold)" }}>
                    {q.hint}
                  </div>
                )}
              </div>
            </div>

            {/* Col 2 : Photo d'inspection HD */}
            <div className="quiz-photo">
              <img src="/images/depannage/quiz.jpg" alt="Vue macro de l'anomalie d'établi" />
            </div>

            {/* Col 3 : Options de réponse et validation */}
            <div className="quiz-options">
              <div className="progress">
                <span>Question {currentQ + 1} / {QUIZ_DATA.length}</span>
                <div
                  className="progress-line"
                  style={{
                    ["--progress-width" as any]: `${((currentQ + 1) / QUIZ_DATA.length) * 100}%`
                  }}
                ></div>
              </div>

              <div id="optionsContainer">
                {q.options.map((opt, idx) => (
                  <label key={idx} className="option" onClick={() => setSelectedOpt(idx)}>
                    <input
                      type="radio"
                      name="quiz_opt"
                      checked={selectedOpt === idx}
                      onChange={() => setSelectedOpt(idx)}
                    />
                    <span>{opt.text}</span>
                  </label>
                ))}
              </div>

              <button className="validate" onClick={handleValidateQuiz}>
                Valider le diagnostic
              </button>

              {feedback && (
                <div
                  className="result"
                  style={{
                    color: feedback.isCorrect ? "var(--good-green)" : "var(--bad-red)"
                  }}
                >
                  {feedback.text}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
