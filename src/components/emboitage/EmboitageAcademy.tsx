'use client';

/**
 * HorloLearn — Académie Pratique · Posages, Emboîtages & Aiguillage d'Atelier
 * Module complet pour passionnés et artisans horlogers suisses :
 *   · Parcours guidé des 13 gestes fondamentaux (schémas à points chauds, loupe 10x, progression)
 *   · 3 simulateurs d'établi (coupe de tige, chasse poussière 45°, gardes NIHS 91-10)
 *   · Quiz de 15 questions d'atelier avec note helvétique (1.0 à 6.0)
 *   · Grille de contrôle officiel des compétences d'atelier avec critère éliminatoire
 *   · Fiches mémo réversibles + lexique des produits d'établi
 * Éthique & identité : Transmission d'artisan horloger authentique, normes suisses officielles (NIHS, ISO, ETA).
 */

import { useCallback, useEffect, useState } from 'react';
import {
  BadgeCheck,
  Award,
  Wrench,
  ClipboardCheck,
  FlaskConical,
  GraduationCap,
  Layers,
  Compass,
  Ruler,
  ZoomIn,
} from 'lucide-react';
import { STEPS_DATA, type StepData } from '@/lib/emboitage/data';
import { CaseAssemblySVG } from '@/lib/emboitage/schemas-b';
import Parcours from './Parcours';
import Simulateurs from './Simulateurs';
import Quiz from './Quiz';
import Examen from './Examen';
import Fiches from './Fiches';
import LoupeModal, { type LoupeState } from './LoupeModal';

type Tab = 'parcours' | 'simulateurs' | 'quiz' | 'examen' | 'fiches';

interface Progress {
  steps: number[];
  quizBest: number | null;
  examBest: number | null;
}

const EMPTY_PROGRESS: Progress = { steps: [], quizBest: null, examBest: null };
const STORAGE_KEY = 'hl-emboitage-progress-v2';

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'parcours', label: 'Parcours des 13 gestes', icon: <Compass className="w-3.5 h-3.5" /> },
  { id: 'simulateurs', label: 'Simulateurs d\'établi', icon: <Ruler className="w-3.5 h-3.5" /> },
  { id: 'quiz', label: 'Quiz d\'atelier', icon: <GraduationCap className="w-3.5 h-3.5" /> },
  { id: 'examen', label: 'Grille de maîtrise', icon: <ClipboardCheck className="w-3.5 h-3.5" /> },
  { id: 'fiches', label: 'Fiches & Produits', icon: <Layers className="w-3.5 h-3.5" /> },
];

export default function EmboitageAcademy() {
  const [tab, setTab] = useState<Tab>('parcours');
  const [activeStep, setActiveStep] = useState(1);
  const [progress, setProgress] = useState<Progress>(EMPTY_PROGRESS);
  const [hydrated, setHydrated] = useState(false);
  const [loupe, setLoupe] = useState<LoupeState>({
    isOpen: false,
    stepId: 0,
    title: '',
    standard: '',
    schemaType: 'case_assembly',
    zoomLevel: 1,
  });

  // Restauration de la progression
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<Progress>;
        setProgress({
          steps: Array.isArray(parsed.steps) ? parsed.steps : [],
          quizBest: typeof parsed.quizBest === 'number' ? parsed.quizBest : null,
          examBest: typeof parsed.examBest === 'number' ? parsed.examBest : null,
        });
      }
    } catch {
      // stockage indisponible
    }
    setHydrated(true);
  }, []);

  // Sauvegarde
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignorer
    }
  }, [progress, hydrated]);

  const toggleValidated = useCallback((id: number) => {
    setProgress((p) => ({
      ...p,
      steps: p.steps.includes(id) ? p.steps.filter((x) => x !== id) : [...p.steps, id].sort((a, b) => a - b),
    }));
  }, []);

  const setQuizBest = useCallback((note: number) => {
    setProgress((p) => ({ ...p, quizBest: p.quizBest === null || note > p.quizBest ? note : p.quizBest }));
  }, []);

  const setExamBest = useCallback((note: number) => {
    setProgress((p) => ({ ...p, examBest: p.examBest === null || note > p.examBest ? note : p.examBest }));
  }, []);

  const openLoupe = useCallback((step: StepData) => {
    setLoupe({
      isOpen: true,
      stepId: step.id,
      title: step.title,
      standard: step.standard,
      schemaType: step.schemaType,
      zoomLevel: 1,
    });
  }, []);

  const openHeroLoupe = useCallback(() => {
    setLoupe({
      isOpen: true,
      stepId: 0,
      title: "Coupe transversale complète d'emboîtage",
      standard: 'NIHS 92-20 & ISO 22810',
      schemaType: 'case_assembly',
      zoomLevel: 1,
    });
  }, []);

  const closeLoupe = useCallback(() => {
    setLoupe((p) => ({ ...p, isOpen: false }));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-cream dark:bg-[#070b14] text-ink dark:text-slate-100 transition-colors">
      {/* ==================== EN-TÊTE D'ATELIER FLOTTANT ==================== */}
      <header className="sticky top-16 sm:top-20 z-40 bg-cream/95 dark:bg-[#0d1526]/95 backdrop-blur-md border border-cream-border dark:border-slate-800 max-w-7xl mx-auto w-[calc(100%-1.5rem)] sm:w-[calc(100%-2.5rem)] rounded-2xl shadow-sm mt-3 sm:mt-5 transition-all">
        <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] uppercase font-label font-bold px-2 py-0.5 rounded bg-bronze/10 dark:bg-amber-400/10 text-bronze-dark dark:text-amber-400 border border-bronze/25 dark:border-amber-400/25 flex items-center gap-1.5">
                  <Wrench className="w-3 h-3 text-bronze dark:text-amber-400" />
                  Pratique d'Atelier Horloger Suisse
                </span>
                <span className="hidden md:inline text-[11px] font-label text-ink-soft dark:text-slate-400">
                  NIHS 91-10 · NIHS 92-20 · ISO 22810 · ETA 2824-2
                </span>
              </div>
              <h1 className="font-display text-sm sm:text-base text-ink dark:text-slate-100 font-bold leading-tight truncate mt-0.5">
                Posages, Emboîtages &amp; Aiguillage
                <span className="hidden sm:inline text-xs text-ink-soft dark:text-slate-400 font-body font-normal">
                  {' '}· la méthode rigoureuse d'établi
                </span>
              </h1>
            </div>
          </div>

          {/* Onglets (desktop) */}
          <nav className="hidden lg:flex items-center gap-1 font-label text-xs" aria-label="Sections du module">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
                  tab === t.id
                    ? 'bg-bronze text-white shadow-sm'
                    : 'text-ink-soft dark:text-slate-400 hover:text-bronze-dark dark:hover:text-amber-400 hover:bg-cream-card dark:hover:bg-slate-800'
                }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Onglets (mobile) */}
        <nav className="lg:hidden flex items-center gap-1 overflow-x-auto px-3 pb-2 pt-1 font-label text-xs" aria-label="Sections du module">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-2.5 py-1.5 rounded-lg font-bold whitespace-nowrap transition flex items-center gap-1.5 border text-[11px] ${
                tab === t.id
                  ? 'bg-bronze text-white border-bronze'
                  : 'bg-cream-card dark:bg-slate-800 text-ink-soft dark:text-slate-300 border-cream-border dark:border-slate-700'
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </nav>
      </header>

      {/* ==================== HERO ==================== */}
      <section className="border-b border-cream-border dark:border-slate-800 bg-gradient-to-b from-cream-card dark:from-[#0b1120] via-cream dark:via-[#070b14] to-cream dark:to-[#070b14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-label font-medium bg-bronze/10 dark:bg-amber-400/10 text-bronze-dark dark:text-amber-400 border border-bronze/30 dark:border-amber-400/30">
                <Award className="w-3.5 h-3.5 text-bronze dark:text-amber-400" />
                Méthodologie &amp; Savoir d'Établi Suisse
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.8rem] leading-[1.12] text-ink dark:text-slate-100">
                L'art de l'emboîtage :
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-bronze-light via-bronze to-bronze-dark dark:from-amber-300 dark:via-amber-400 dark:to-amber-500">
                  trente heures d'atelier, un seul geste
                </span>
              </h2>

              <p className="text-[15px] sm:text-base text-ink-soft dark:text-slate-300 leading-relaxed max-w-2xl">
                L'emboîtage est l'étape sacrée où des dizaines d'heures de réglage chronométrique se
                concrétisent. Une poussière sous la glace, un centième de trop sur la tige, un appui maladroit sur
                un rubis ou un frottement d'aiguille anéantissent la montre. Ce cours complet d'atelier détaille
                les 13 gestes indispensables — de la dépose du module automatique au contrôle final à la potence.
              </p>

              <div className="pt-1 flex flex-wrap gap-2.5 text-xs font-label text-ink-soft dark:text-slate-400">
                {[
                  ['13', 'gestes d\'établi'],
                  ['3', 'simulateurs interactifs'],
                  ['15', 'questions d\'atelier'],
                  ['10', 'critères suisses · 30 pts'],
                ].map(([n, l]) => (
                  <span
                    key={l}
                    className="px-3 py-1.5 rounded-lg bg-cream-card dark:bg-slate-900 border border-cream-border dark:border-slate-800 flex items-center gap-2"
                  >
                    <strong className="text-bronze-dark dark:text-amber-400 font-label text-sm">{n}</strong> {l}
                  </span>
                ))}
              </div>

              {/* Progression globale */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-label text-ink-soft dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <BadgeCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  {progress.steps.length}/{STEPS_DATA.length} gestes maîtrisés
                </span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-bronze dark:text-amber-400" />
                  Quiz : {progress.quizBest !== null ? `${progress.quizBest.toFixed(1)}/6` : '—'}
                </span>
                <span className="flex items-center gap-1.5">
                  <ClipboardCheck className="w-4 h-4 text-bronze dark:text-amber-400" />
                  Maîtrise : {progress.examBest !== null ? `${progress.examBest.toFixed(1)}/6` : '—'}
                </span>
              </div>
            </div>

            {/* Coupe technique + loupe */}
            <div className="lg:col-span-5 bg-cream-card dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-cream-border dark:border-slate-800 shadow-md">
              <div className="flex items-center justify-between pb-3 border-b border-cream-border dark:border-slate-800 mb-3">
                <span className="font-label text-xs font-bold text-ink-soft dark:text-slate-400 flex items-center gap-1.5">
                  <FlaskConical className="w-4 h-4 text-bronze dark:text-amber-400" />
                  COUPE TECHNIQUE D'EMBOÎTAGE
                </span>
                <button
                  onClick={openHeroLoupe}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-bronze/10 dark:bg-amber-400/10 text-bronze-dark dark:text-amber-400 hover:bg-bronze hover:text-white border border-bronze/25 dark:border-amber-400/30 text-xs font-label font-bold transition"
                  title="Examiner à la loupe d'atelier 10x"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Loupe 10x</span>
                </button>
              </div>

              <button
                onClick={openHeroLoupe}
                className="block w-full overflow-hidden rounded-xl bg-cream-tile dark:bg-slate-800/80 border border-cream-border dark:border-slate-700 p-1 cursor-zoom-in hover:ring-2 hover:ring-bronze/40 transition"
                aria-label="Agrandir la coupe technique"
              >
                <CaseAssemblySVG />
              </button>

              <p className="text-[11px] text-center text-ink-soft dark:text-slate-400 mt-2 font-label">
                Coupe transversale : glace saphir, joint Hytrel, cercle, brides, tube &amp; couronne.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CONTENU DES ONGLETS ==================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {tab === 'parcours' && (
          <Parcours
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            validated={progress.steps}
            toggleValidated={toggleValidated}
            openLoupe={openLoupe}
          />
        )}
        {tab === 'simulateurs' && <Simulateurs openLoupe={openLoupe} />}
        {tab === 'quiz' && <Quiz best={progress.quizBest} onScore={setQuizBest} />}
        {tab === 'examen' && <Examen best={progress.examBest} onScore={setExamBest} />}
        {tab === 'fiches' && <Fiches />}
      </main>

      {/* ==================== LOUPE D'INSPECTION 10x (PORTAL) ==================== */}
      <LoupeModal loupe={loupe} setLoupe={setLoupe} onClose={closeLoupe} />
    </div>
  );
}
