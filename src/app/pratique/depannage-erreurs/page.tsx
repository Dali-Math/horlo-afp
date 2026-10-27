"use client";

import React, { useState, useEffect } from "react";
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

export default function DepannageErreursPage() {
  const [isDark, setIsDark] = useState<boolean>(false);
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

  useEffect(() => {
    const saved = localStorage.getItem("horlo_theme");
    if (saved === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("horlo_theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("horlo_theme", "dark");
      setIsDark(true);
    }
  };

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
    <>
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

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }

.depannage-page-root {
  background: var(--paper);
  color: var(--ink);
  font-family: Inter, -apple-system, sans-serif;
  min-height: 100vh;
  transition: background-color 0.25s ease, color 0.25s ease;
}

body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: Inter, -apple-system, sans-serif;
  transition: background-color 0.25s ease, color 0.25s ease;
}
a { color: inherit; text-decoration: none; }
button { font: inherit; cursor: pointer; }
.container { width: min(1480px, calc(100% - 40px)); margin: 0 auto; }

/* HEADER */
header {
  height: 72px;
  background: var(--paper-2);
  border-bottom: 1px solid var(--line);
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(14px);
}
.header-inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}
.logo {
  display: flex;
  align-items: baseline;
  gap: 14px;
  white-space: nowrap;
}
.logo strong {
  font: 500 32px Georgia, 'Times New Roman', serif;
  letter-spacing: -0.03em;
}
.logo span {
  color: var(--muted);
  font-size: 13px;
  padding-left: 14px;
  border-left: 1px solid var(--line);
  font-family: Inter, sans-serif;
}
nav { display: flex; gap: 32px; font-size: 13px; font-weight: 500; }
nav a { padding: 26px 0 22px; position: relative; color: var(--muted); transition: color 0.2s; }
nav a:hover, nav a.active { color: var(--ink); }
nav a.active::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 16px;
  height: 2px;
  background: var(--gold);
}
.actions { display: flex; align-items: center; gap: 14px; font-size: 14px; }
.theme-btn {
  background: var(--paper);
  border: 1px solid var(--line);
  color: var(--ink);
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}
.theme-btn:hover {
  border-color: var(--gold);
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
  background: linear-gradient(90deg, rgba(9,11,13,0.98) 0%, rgba(9,11,13,0.94) 34%, rgba(9,11,13,0.60) 60%, rgba(9,11,13,0.12) 100%);
}
.hero-content {
  position: relative;
  z-index: 2;
  padding: 70px 0 64px;
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
h1, h2, h3, h4 {
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 500;
}
h1 {
  font-size: clamp(48px, 6.5vw, 92px);
  line-height: 0.92;
  letter-spacing: -0.05em;
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
}
.hero-btn:hover {
  background: var(--gold-dark);
  transform: translateY(-1px);
}
.hero-quote {
  position: absolute;
  right: 48px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  font: italic 19px/1.6 Georgia, serif;
  color: #f2ece2;
}
.hero-quote::after {
  content: "";
  display: block;
  width: 34px;
  height: 1px;
  background: var(--gold);
  margin-top: 12px;
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
  font-size: 19px;
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
  font-size: 20px;
  margin-top: 5px;
}

/* SECTION TITLE */
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
  font-size: clamp(38px, 4.2vw, 64px);
  line-height: 1.02;
  margin: 0;
  letter-spacing: -0.04em;
}
.section-note {
  max-width: 260px;
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
  background: var(--paper);
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
  padding: 3px 8px;
  border-radius: 3px;
  transition: all 0.2s;
}
.vt-btn.active.bad {
  background: rgba(185, 28, 28, 0.12);
  color: var(--bad-red);
  font-weight: 600;
}
.vt-btn.active.good {
  background: rgba(21, 128, 61, 0.12);
  color: var(--good-green);
  font-weight: 600;
}

/* Image / SVG Container */
.case-image {
  height: 290px;
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
.case-svg {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.case-image .caption-badge {
  position: absolute;
  bottom: 10px;
  left: 12px;
  right: 12px;
  background: rgba(13, 17, 23, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-family: ui-monospace, 'JetBrains Mono', monospace;
  backdrop-filter: blur(4px);
}

.case-image .caption-badge.good {
  background: rgba(7, 22, 16, 0.88);
  border-color: rgba(21, 128, 61, 0.34);
  color: #ecfdf5;
}
.case-image .caption-badge.bad {
  background: rgba(36, 7, 7, 0.88);
  border-color: rgba(185, 28, 28, 0.30);
  color: #fef2f2;
}
.case-good-view,
.case-bad-photo-view {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #0d1117;
}
.case-good-view > img,
.case-bad-photo-view > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.case-good-view > img {
  filter: saturate(0.94) contrast(1.05) brightness(1.02);
}
.case-bad-photo-view > img {
  filter: saturate(0.84) contrast(1.05) brightness(0.92);
}
.case-good-view::after,
.case-bad-photo-view::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.case-good-view::after {
  background: linear-gradient(180deg, rgba(3,8,12,0.08) 0%, rgba(3,8,12,0.24) 45%, rgba(3,8,12,0.46) 100%);
}
.case-bad-photo-view::after {
  background: linear-gradient(180deg, rgba(22,4,4,0.10) 0%, rgba(22,4,4,0.28) 45%, rgba(22,4,4,0.58) 100%);
}
.case-good-meta,
.case-bad-meta {
  position: absolute;
  top: 10px;
  left: 12px;
  right: 12px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  z-index: 2;
}
.case-good-tag,
.case-good-note,
.case-bad-tag,
.case-bad-note {
  background: rgba(255,255,255,0.92);
  color: #0f172a;
  border: 1px solid rgba(255,255,255,0.66);
  border-radius: 4px;
  padding: 6px 9px;
  font-size: 10px;
  line-height: 1.35;
  font-family: ui-monospace, 'JetBrains Mono', monospace;
  box-shadow: 0 4px 18px rgba(0,0,0,0.18);
}
.case-good-tag { color: var(--good-green); font-weight: 700; white-space: nowrap; }
.case-bad-tag { color: var(--bad-red); font-weight: 700; white-space: nowrap; }
.case-good-note,
.case-bad-note { max-width: 70%; }
.case-good-focus,
.case-bad-focus {
  position: absolute;
  border-radius: 10px;
  z-index: 2;
  pointer-events: none;
}
.case-good-focus {
  border: 2px solid rgba(16, 185, 129, 0.95);
  box-shadow: 0 0 0 2px rgba(255,255,255,0.18), 0 0 24px rgba(16,185,129,0.28);
}
.case-bad-focus {
  border: 2px solid rgba(239, 68, 68, 0.95);
  box-shadow: 0 0 0 2px rgba(255,255,255,0.12), 0 0 24px rgba(239,68,68,0.22);
}
.focus-c1 { left: 31%; top: 17%; width: 36%; height: 47%; }
.focus-c2 { left: 41%; top: 15%; width: 18%; height: 58%; }
.focus-c3 { left: 47%; top: 24%; width: 27%; height: 31%; }
.focus-c4 { left: 30%; top: 16%; width: 40%; height: 43%; }
.focus-c5 { left: 50%; top: 24%; width: 22%; height: 24%; }
.focus-c6 { left: 40%; top: 26%; width: 24%; height: 30%; }
@media(max-width: 720px) {
  .case-good-meta,
  .case-bad-meta { flex-direction: column; align-items: flex-start; }
  .case-good-note,
  .case-bad-note { max-width: 100%; }
}

/* Body */
.case-
.depannage-page-root {
  background: var(--paper);
  color: var(--ink);
  font-family: Inter, -apple-system, sans-serif;
  min-height: 100vh;
  transition: background-color 0.25s ease, color 0.25s ease;
}

body {
  padding: 20px 18px 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.case-body h3 {
  font-size: 24px;
  line-height: 1.1;
  margin: 0 0 18px;
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
  padding: 5px 10px;
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
}
.quiz-copy h2 {
  font-size: 38px;
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
}
.quiz-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.quiz-options {
  padding: 32px 28px;
  border-left: 1px solid var(--line);
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
  width: 33%;
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

/* FOOTER */
footer {
  padding: 36px 0 56px;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 12px;
  background: var(--paper-2);
}
footer .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

/* RESPONSIVE */
@media (max-width: 1200px) {
  .case-grid { grid-template-columns: repeat(2, 1fr); }
  .pillar-grid { grid-template-columns: repeat(2, 1fr); }
  .quiz-box { grid-template-columns: 1fr 1fr; }
  .quiz-options { grid-column: 1 / -1; border-left: 0; border-top: 1px solid var(--line); }
}
@media (max-width: 768px) {
  nav { display: none; }
  .hero-quote { display: none; }
  .case-grid { grid-template-columns: 1fr; }
  .pillar-grid { grid-template-columns: 1fr; }
  .quiz-box { grid-template-columns: 1fr; }
  .section-title-row { flex-direction: column; align-items: flex-start; }
  .section-note { padding-left: 0; max-width: none; }
  .section-note::before { display: none; }
  footer .container { flex-direction: column; text-align: center; }
}
` }} />

      <div className="depannage-page-root">
      {/* HEADER */}
      <header>
        <div className="container header-inner">
          <Link href="/" className="logo">
            <strong>HorloLearn</strong>
            <span>Dépannage &amp; Erreurs courantes d'établi</span>
          </Link>

          <nav>
            <Link href="/theorie">Théorie</Link>
            <Link href="/pratique" className="active">Pratique &amp; Atelier</Link>
            <Link href="/quiz">Quiz &amp; Défis</Link>
            <Link href="/outils">Outils &amp; Fiches</Link>
          </nav>

          <div className="actions">
            <button className="theme-btn" onClick={toggleTheme}>
              <span id="themeIcon">{isDark ? "🌙" : "☀️"}</span>
              <span id="themeLabel">{isDark ? "Mode Nuit" : "Mode Clair"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
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
        <div className="hero-quote">
          « Dans l'artisanat horloger, un pivot ne casse pas par fatalité<br />mais par précipitation. Le bon geste ne s'improvise jamais. »
        </div>
      </div>

      {/* 4 PILIERS */}
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

      {/* SECTION 6 CAS */}
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

            {/* CAS 01 */}
            <article className="case" id="case1">
              <div className="case-head">
                <div className="case-head-left">
                  <span className="case-no">01</span>
                  <span className="case-cat">Barillet &amp; Énergie</span>
                </div>
                <div className="view-toggle">
                  <button
                    className={`vt-btn ${views.c1 === "bad" ? "active bad" : ""}`}
                    onClick={() => setCaseView("c1", "bad")}
                  >
                    ❌ Erreur
                  </button>
                  <button
                    className={`vt-btn ${views.c1 === "good" ? "active good" : ""}`}
                    onClick={() => setCaseView("c1", "good")}
                  >
                    ✅ Bon geste
                  </button>
                </div>
              </div>

              <div className="case-image">
                {views.c1 === "bad" ? (
                  <div id="img-c1-bad" style={{ width: "100%", height: "100%" }}>
                    <img src="/images/depannage/cas-01-error.jpg" alt="Ressort de barillet éjecté" />
                    <div className="caption-badge">⚠️ Éjection incontrôlée : Spire vrillée et feuillard hors plan</div>
                  </div>
                ) : (
                  <div id="img-c1-good" className="case-svg case-good-view">
                    <img src="/images/depannage/cas-01-good.jpg" alt="Bon geste pour l'insertion du ressort de barillet" />
                    <div className="case-good-meta">
                      <div className="case-good-tag">BON GESTE · VISUEL</div>
                      <div className="case-good-note">Insertion guidée du ressort avec maintien maîtrisé et contrôle du sens d'enroulement.</div>
                    </div>
                    <div className="case-good-focus focus-c1"></div>
                    <div className="caption-badge good">✅ Bon geste : remonte-ressort adapté, maintien sous protection et bride correctement engagée.</div>
                  </div>
                )}
              </div>

              <div className="case-body">
                <h3>Le ressort de barillet qui saute à l'insertion</h3>
                <div className="fact">
                  <div className="fact-icon">⚡</div>
                  <div>
                    <strong>Symptôme d'établi</strong>
                    <p>Le ressort échappe violemment des doigts ou des brucelles, claque, se vrille en hélice ou raye le tambour de barillet.</p>
                  </div>
                </div>
                <div className="fact">
                  <div className="fact-icon">⚙</div>
                  <div>
                    <strong>Cause mécanique</strong>
                    <p>Tentative d'enroulement manuel sans outil adapté. La tension élastique exponentielle libère un couple de torsion incontrôlé.</p>
                  </div>
                </div>
                <div className="fact rescue">
                  <div className="fact-icon">✓</div>
                  <div>
                    <strong>Geste d'atelier &amp; Règle d'or</strong>
                    <p>Toujours utiliser un <strong>remonte-ressort (estrapade Bergeon 2729)</strong> de calibre adéquat sous film protecteur Mylar. Redressement délicat à la pince plate à mors polis doux.</p>
                  </div>
                </div>
                <div className="tool-tag">Outil : Estrapade Bergeon • Lubrifiant : Moebius 8217 (3 touches à 120°)</div>
              </div>
            </article>

            {/* CAS 02 */}
            <article className="case" id="case2">
              <div className="case-head">
                <div className="case-head-left">
                  <span className="case-no">02</span>
                  <span className="case-cat">Rouage &amp; Ébats</span>
                </div>
                <div className="view-toggle">
                  <button
                    className={`vt-btn ${views.c2 === "bad" ? "active bad" : ""}`}
                    onClick={() => setCaseView("c2", "bad")}
                  >
                    ❌ Erreur
                  </button>
                  <button
                    className={`vt-btn ${views.c2 === "good" ? "active good" : ""}`}
                    onClick={() => setCaseView("c2", "good")}
                  >
                    ✅ Bon geste
                  </button>
                </div>
              </div>

              <div className="case-image">
                {views.c2 === "bad" ? (
                  <div id="img-c2-bad" style={{ width: "100%", height: "100%" }}>
                    <img src="/images/depannage/cas-02-error.jpg" alt="Pivot tordu sous le pont" />
                    <div className="caption-badge">⚠️ Forçage de pont : Pivot écrasé hors du trou de rubis</div>
                  </div>
                ) : (
                  <div id="img-c2-good" className="case-svg case-good-view">
                    <img src="/images/depannage/cas-02-good.jpg" alt="Bon geste pour poser un pont de rouage sans écraser les pivots" />
                    <div className="case-good-meta">
                      <div className="case-good-tag">BON GESTE · VISUEL</div>
                      <div className="case-good-note">Tous les pivots sont présentés à la verticale avant la descente libre du pont.</div>
                    </div>
                    <div className="case-good-focus focus-c2"></div>
                    <div className="caption-badge good">✅ Bon geste : le pont descend sans forcer, chaque pivot est centré et l'ébat est vérifié.</div>
                  </div>
                )}
              </div>

              <div className="case-body">
                <h3>Le pont de rouage forcé &amp; le pivot écrasé</h3>
                <div className="fact">
                  <div className="fact-icon">⚡</div>
                  <div>
                    <strong>Symptôme d'établi</strong>
                    <p>Après serrage des vis de pont, le rouage refuse de tourner. Au démontage, le pivot supérieur de la roue moyenne ou de seconde est tordu à 45° ou rompu.</p>
                  </div>
                </div>
                <div className="fact">
                  <div className="fact-icon">⚙</div>
                  <div>
                    <strong>Cause mécanique</strong>
                    <p>Le pivot n'était pas engagé dans la creusure du rubis. Serrer la vis applique une pression axiale destructrice sur un acier trempé de 0.08 mm de diamètre.</p>
                  </div>
                </div>
                <div className="fact rescue">
                  <div className="fact-icon">✓</div>
                  <div>
                    <strong>Geste d'atelier &amp; Règle d'or</strong>
                    <p><strong>Ne jamais forcer sur une vis de pont.</strong> Palper doucement chaque mobile à la brucelle douce en laiton ou buis : on doit voir et sentir le mobile flotter librement de haut en bas.</p>
                  </div>
                </div>
                <div className="tool-tag">Contrôle : Brucelle buis / laiton • Huilage : Moebius 9010 (1/2 de creusure)</div>
              </div>
            </article>

            {/* CAS 03 */}
            <article className="case" id="case3">
              <div className="case-head">
                <div className="case-head-left">
                  <span className="case-no">03</span>
                  <span className="case-cat">Échappement &amp; Sécurité</span>
                </div>
                <div className="view-toggle">
                  <button
                    className={`vt-btn ${views.c3 === "bad" ? "active bad" : ""}`}
                    onClick={() => setCaseView("c3", "bad")}
                  >
                    ❌ Erreur
                  </button>
                  <button
                    className={`vt-btn ${views.c3 === "good" ? "active good" : ""}`}
                    onClick={() => setCaseView("c3", "good")}
                  >
                    ✅ Bon geste
                  </button>
                </div>
              </div>

              <div className="case-image">
                {views.c3 === "bad" ? (
                  <div id="img-c3-bad" style={{ width: "100%", height: "100%" }}>
                    <img src="/images/depannage/cas-03-error.jpg" alt="Dard et fourchette d'ancre" />
                    <div className="caption-badge">⚠️ Sécurité faussée : Le dard frotte contre le petit plateau</div>
                  </div>
                ) : (
                  <div id="img-c3-good" className="case-svg case-good-view">
                    <img src="/images/depannage/cas-03-good.jpg" alt="Bon geste pour contrôler l'ancre et le dard" />
                    <div className="case-good-meta">
                      <div className="case-good-tag">BON GESTE · VISUEL</div>
                      <div className="case-good-note">Passage libre de la cheville, garde au dard régulière et contrôle sous fort grossissement.</div>
                    </div>
                    <div className="case-good-focus focus-c3"></div>
                    <div className="caption-badge good">✅ Bon geste : ancre correctement réglée avec sécurité et dégagement conformes.</div>
                  </div>
                )}
              </div>

              <div className="case-body">
                <h3>L'ancre rebelle &amp; le dard frottant sur le plateau</h3>
                <div className="fact">
                  <div className="fact-icon">⚡</div>
                  <div>
                    <strong>Symptôme d'établi</strong>
                    <p>Le balancier s'arrête net sans cause apparente, avance de façon erratique ou produit un son de tic-tac complètement dissymétrique au vibrographe.</p>
                  </div>
                </div>
                <div className="fact">
                  <div className="fact-icon">⚙</div>
                  <div>
                    <strong>Cause mécanique</strong>
                    <p>Le dard est faussé ou la cheville de plateau vient buter contre l'encoche de l'ancre. L'ébattement de sécurité n'est plus garanti.</p>
                  </div>
                </div>
                <div className="fact rescue">
                  <div className="fact-icon">✓</div>
                  <div>
                    <strong>Geste d'atelier &amp; Règle d'or</strong>
                    <p>Contrôler la <strong>garde au dard</strong> sous binoculaire 10x : au repos, l'ancre poussée vers la touche ne doit jamais toucher le petit plateau sans dégagement par la cheville.</p>
                  </div>
                </div>
                <div className="tool-tag">Contrôle : Loupe 10x &amp; Witschi • Lubrification : Moebius 9415 (levées uniquement)</div>
              </div>
            </article>

            {/* CAS 04 */}
            <article className="case" id="case4">
              <div className="case-head">
                <div className="case-head-left">
                  <span className="case-no">04</span>
                  <span className="case-cat">Organe Réglant</span>
                </div>
                <div className="view-toggle">
                  <button
                    className={`vt-btn ${views.c4 === "bad" ? "active bad" : ""}`}
                    onClick={() => setCaseView("c4", "bad")}
                  >
                    ❌ Erreur
                  </button>
                  <button
                    className={`vt-btn ${views.c4 === "good" ? "active good" : ""}`}
                    onClick={() => setCaseView("c4", "good")}
                  >
                    ✅ Bon geste
                  </button>
                </div>
              </div>

              <div className="case-image">
                {views.c4 === "bad" ? (
                  <div id="img-c4-bad" style={{ width: "100%", height: "100%" }}>
                    <img src="/images/depannage/cas-04-error.jpg" alt="Spiral en cône et coq" />
                    <div className="caption-badge">⚠️ Perte de planéité : Spires collées ou frottant sous le coq</div>
                  </div>
                ) : (
                  <div id="img-c4-good" className="case-svg case-good-view">
                    <img src="/images/depannage/cas-04-good.jpg" alt="Bon geste pour contrôler un balancier spiral" />
                    <div className="case-good-meta">
                      <div className="case-good-tag">BON GESTE · VISUEL</div>
                      <div className="case-good-note">Spiral plat, concentrique, propre et bien dégagé du coq et de la raquette.</div>
                    </div>
                    <div className="case-good-focus focus-c4"></div>
                    <div className="caption-badge good">✅ Bon geste : contrôle de la planéité, démagnétisation si besoin et spiral parfaitement libre.</div>
                  </div>
                )}
              </div>

              <div className="case-body">
                <h3>Le spiral en cône ou les spires collées</h3>
                <div className="fact">
                  <div className="fact-icon">⚡</div>
                  <div>
                    <strong>Symptôme d'établi</strong>
                    <p>Le balancier bat avec une amplitude ridicule (&lt; 160°) ou avance de 2 heures par jour. Les spires semblent emmêlées ou frottent le coq.</p>
                  </div>
                </div>
                <div className="fact">
                  <div className="fact-icon">⚙</div>
                  <div>
                    <strong>Cause mécanique</strong>
                    <p>Mauvaise manipulation avec la brucelle lors de la pose du coq, projection d'huile lors du lubrification du contre-pivot, ou magnétisme intense.</p>
                  </div>
                </div>
                <div className="fact rescue">
                  <div className="fact-icon">✓</div>
                  <div>
                    <strong>Geste d'atelier &amp; Règle d'or</strong>
                    <p>Dégraisser au <strong>bain One-Dip</strong> si les spires sont grasses, puis passer au <strong>démagnétiseur d'établi</strong>. Règle absolue : le spiral doit rester rigoureusement sec.</p>
                  </div>
                </div>
                <div className="tool-tag">Outils : Brucelles n°5 Dumont • Bain One-Dip • Démagnétiseur Elma</div>
              </div>
            </article>

            {/* CAS 05 */}
            <article className="case" id="case5">
              <div className="case-head">
                <div className="case-head-left">
                  <span className="case-no">05</span>
                  <span className="case-cat">Remontoir &amp; Minuterie</span>
                </div>
                <div className="view-toggle">
                  <button
                    className={`vt-btn ${views.c5 === "bad" ? "active bad" : ""}`}
                    onClick={() => setCaseView("c5", "bad")}
                  >
                    ❌ Erreur
                  </button>
                  <button
                    className={`vt-btn ${views.c5 === "good" ? "active good" : ""}`}
                    onClick={() => setCaseView("c5", "good")}
                  >
                    ✅ Bon geste
                  </button>
                </div>
              </div>

              <div className="case-image">
                {views.c5 === "bad" ? (
                  <div id="img-c5-bad" className="case-svg case-bad-photo-view">
                    <img src="/images/depannage/cas-05-error.jpg" alt="Erreur sur le remontoir et la tirette" />
                    <div className="case-bad-meta">
                      <div className="case-bad-tag">ERREUR · VISUEL</div>
                      <div className="case-bad-note">Repère du défaut : desserrage excessif, sens de dévissage erroné ou organe sorti de son logement.</div>
                    </div>
                    <div className="case-bad-focus focus-c5"></div>
                    <div className="caption-badge bad">❌ Erreur illustrée : intervention mal repérée sur le remontoir, avec risque de coulant déboîté ou de vis cisaillée.</div>
                  </div>
                ) : (
                  <div id="img-c5-good" className="case-svg case-good-view">
                    <img src="/images/depannage/cas-05-good.jpg" alt="Bon geste pour intervenir sur le remontoir et le coulant" />
                    <div className="case-good-meta">
                      <div className="case-good-tag">BON GESTE · VISUEL</div>
                      <div className="case-good-note">Desserrage limité, maintien de la tirette et extraction de tige sans effort parasite.</div>
                    </div>
                    <div className="case-good-focus focus-c5"></div>
                    <div className="caption-badge good">✅ Bon geste : vis repérée, déblocage mesuré et coulant maintenu dans son logement.</div>
                  </div>
                )}
              </div>

              <div className="case-body">
                <h3>Le coulant déboîté &amp; la vis de rochet cisaillée</h3>
                <div className="fact">
                  <div className="fact-icon">⚡</div>
                  <div>
                    <strong>Symptôme d'établi</strong>
                    <p>La couronne tourne dans le vide sans enclencher la mise à l'heure, ou la vis de couronne casse net au ras du pont lors d'une tentative de démontage.</p>
                  </div>
                </div>
                <div className="fact">
                  <div className="fact-icon">⚙</div>
                  <div>
                    <strong>Cause mécanique</strong>
                    <p>1) Vis de tirette trop desserrée lors du retrait de tige. 2) Ignorance du pas à gauche : forcer dans le sens anti-horaire sur une vis à filetage inversé.</p>
                  </div>
                </div>
                <div className="fact rescue">
                  <div className="fact-icon">✓</div>
                  <div>
                    <strong>Geste d'atelier &amp; Règle d'or</strong>
                    <p>Toute vis horlogère portant <strong>3 traits sur sa tête se dévisse dans le sens horaire ↻</strong>. Ne desserrer la vis de tirette que d'un tour et demi maximum.</p>
                  </div>
                </div>
                <div className="tool-tag">Sens : Pas à gauche (3 traits) • Lubrification : Moebius 9504 / Klüber P125</div>
              </div>
            </article>

            {/* CAS 06 */}
            <article className="case" id="case6">
              <div className="case-head">
                <div className="case-head-left">
                  <span className="case-no">06</span>
                  <span className="case-cat">Aiguillage &amp; Friction</span>
                </div>
                <div className="view-toggle">
                  <button
                    className={`vt-btn ${views.c6 === "bad" ? "active bad" : ""}`}
                    onClick={() => setCaseView("c6", "bad")}
                  >
                    ❌ Erreur
                  </button>
                  <button
                    className={`vt-btn ${views.c6 === "good" ? "active good" : ""}`}
                    onClick={() => setCaseView("c6", "good")}
                  >
                    ✅ Bon geste
                  </button>
                </div>
              </div>

              <div className="case-image">
                {views.c6 === "bad" ? (
                  <div id="img-c6-bad" className="case-svg case-bad-photo-view">
                    <img src="/images/depannage/cas-06-error.jpg" alt="Erreur de lanternage et de friction sur la chaussée" />
                    <div className="case-bad-meta">
                      <div className="case-bad-tag">ERREUR · VISUEL</div>
                      <div className="case-bad-note">Repère du défaut : appui mal réparti et lanternage sans soutien interne, avec écrasement possible.</div>
                    </div>
                    <div className="case-bad-focus focus-c6"></div>
                    <div className="caption-badge bad">❌ Erreur illustrée : chaussée ou tube pris de travers, friction altérée et risque d'ovalisation.</div>
                  </div>
                ) : (
                  <div id="img-c6-good" className="case-svg case-good-view">
                    <img src="/images/depannage/cas-06-good.jpg" alt="Bon geste pour le lanternage et la pose de chaussée" />
                    <div className="case-good-meta">
                      <div className="case-good-tag">BON GESTE · VISUEL</div>
                      <div className="case-good-note">Axe soutenu par pige de calibrage avant lanternage pour éviter toute ovalisation.</div>
                    </div>
                    <div className="case-good-focus focus-c6"></div>
                    <div className="caption-badge good">✅ Bon geste : chaussée calibrée, friction contrôlée et pose régulière sans déformation.</div>
                  </div>
                )}
              </div>

              <div className="case-body">
                <h3>La chaussée lâche &amp; le lanternage délicat</h3>
                <div className="fact">
                  <div className="fact-icon">⚡</div>
                  <div>
                    <strong>Symptôme d'établi</strong>
                    <p>Le rouage tourne parfaitement mais les aiguilles s'arrêtent au passage de la date à minuit. À la couronne, la mise à l'heure tourne trop facilement, sans résistance.</p>
                  </div>
                </div>
                <div className="fact">
                  <div className="fact-icon">⚙</div>
                  <div>
                    <strong>Cause mécanique</strong>
                    <p>Perte de friction de la chaussée sur la tige de roue de centre. Lanterner directement sans pige intérieure écrase le tube de façon ovale et fêle le métal.</p>
                  </div>
                </div>
                <div className="fact rescue">
                  <div className="fact-icon">✓</div>
                  <div>
                    <strong>Geste d'atelier &amp; Règle d'or</strong>
                    <p>Insérer impérativement une <strong>pige de calibrage cylindrique</strong> dans l'alésage avant d'utiliser la <strong>pince à lanterner Bergeon 6827</strong>. Couple visé : 15 à 25 cNm avec Moebius HP-1300.</p>
                  </div>
                </div>
                <div className="tool-tag">Outil : Pince à lanterner Bergeon 6827 • Lubrifiant : Moebius HP-1300</div>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* TEST D'ATELIER (QUIZ 3 COLONNES) */}
      <section className="quiz" id="test-etabli">
        <div className="container">
          <div className="quiz-box">
            {/* Col 1 : Explications et boutons */}
            <div className="quiz-copy">
              <div className="section-kicker">Diagnostic sous binoculaire</div>
              <h2>{q.title}</h2>
              <p>{q.desc}</p>

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

      {/* FOOTER */}
      <footer>
        <div className="container">
          <span>HorloLearn · Savoir d’établi horloger indépendant</span>
          <span>Normes suisses officielles NIHS &amp; ISO 3159 (COSC) — Lubrifiants certifiés Moebius</span>
        </div>
      </footer>
      </div>
    </>
  );
}
