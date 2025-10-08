"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Question } from "./questions";
import { QUESTION_BANK } from "./questions";

// Fixed colors for choices A-D
const CHOICE_COLORS = ["#FF4C4C", "#4C8CFF", "#4CFF74", "#FFD84C"]; // red, blue, green, yellow
const TEXT_COLOR = "#111"; // black-ish text for readability
const BG = "#ffffff"; // white background

type AnswerRecord = {
  qid: string;
  prompt: string;
  selectedIndex: number | null;
  selectedText: string | null;
  correctIndex: number;
  correctText: string;
  timedOut: boolean;
  isCorrect: boolean;
};

function pickRandom<T>(arr: T[], n: number): T[] {
  const a = [...arr];
  // Fisher-Yates shuffle
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

export default function QuizLongueursHorlogeriePage() {
  const QUESTIONS_PER_RUN = 20;
  const TIME_PER_QUESTION = 12; // seconds

  const [seed, setSeed] = useState<number>(() => Date.now());
  const sessionQuestions = useMemo<Question[]>(() => {
    return pickRandom(QUESTION_BANK, QUESTIONS_PER_RUN);
  }, [seed]);

  const [index, setIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(TIME_PER_QUESTION);
  const [locked, setLocked] = useState(false); // avoid double clicks
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const q = sessionQuestions[index];
  const done = index >= sessionQuestions.length;

  // Timer management
  useEffect(() => {
    // (Re)start timer on question change
    if (done) return;
    setSecondsLeft(TIME_PER_QUESTION);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          // time up, record wrong and auto-advance
          if (timerRef.current) clearInterval(timerRef.current);
          handleAnswer(null, true);
          return TIME_PER_QUESTION;
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, seed]);

  function handleAnswer(choiceIndex: number | null, timedOut = false) {
    if (locked || done) return;
    setLocked(true);

    const selectedText = choiceIndex === null ? null : q.choices[choiceIndex];
    const isCorrect = choiceIndex !== null && choiceIndex === q.correctIndex;

    const rec: AnswerRecord = {
      qid: q.id,
      prompt: q.prompt,
      selectedIndex: choiceIndex,
      selectedText,
      correctIndex: q.correctIndex,
      correctText: q.choices[q.correctIndex],
      timedOut,
      isCorrect: Boolean(isCorrect),
    };
    setAnswers((prev) => [...prev, rec]);

    // Move to next question shortly
    setTimeout(() => {
      setLocked(false);
      setIndex((i) => i + 1);
    }, 450);
  }

  function onSelect(i: number) {
    if (locked) return;
    handleAnswer(i, false);
  }

  function restart() {
    setSeed(Date.now());
    setIndex(0);
    setAnswers([]);
    setLocked(false);
    setSecondsLeft(TIME_PER_QUESTION);
  }

  const correctCount = answers.filter(a => a.isCorrect).length;
  const wrongCount = answers.length - correctCount;

  return (
    <main style={{ background: BG, minHeight: "100vh", color: "#111" }}>
      <section className="max-w-3xl mx-auto px-6 py-10">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Quiz — Conversions (µm ⇄ 1/100 mm ⇄ 1/10 mm ⇄ mm ⇄ cm ⇄ dm ⇄ m)</h1>
          {!done && (
            <div className="text-lg font-semibold" aria-live="polite">⏱ {secondsLeft}s</div>
          )}
        </header>

        {!done ? (
          <>
            <div className="mb-3 text-sm opacity-80">
              Question {index + 1} / {sessionQuestions.length}
            </div>

            <div className="w-full h-2 bg-[#eeeeee] rounded-full mb-6">
              <div
                className="h-2 rounded-full transition-all"
                style={{ width: `${((index) / sessionQuestions.length) * 100}%`, background: "#222" }}
              />
            </div>

            <div className="rounded-xl border border-[#e6e6e6] bg-white shadow-sm p-6 md:p-8 mb-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-6 leading-snug">
                {q.prompt}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {q.choices.map((c, i) => {
                  const bg = CHOICE_COLORS[i % CHOICE_COLORS.length];
                  return (
                    <button
                      key={i}
                      onClick={() => onSelect(i)}
                      disabled={locked}
                      className="text-left rounded-lg px-4 py-4 font-medium shadow-sm focus:outline-none focus:ring-2 transition-transform active:scale-[0.99]"
                      style={{
                        background: bg,
                        color: TEXT_COLOR,
                        border: "1px solid rgba(0,0,0,0.08)",
                      }}
                    >
                      <span className="font-bold mr-1">{String.fromCharCode(65 + i)}.</span> {c}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm opacity-70">Réponds en 12 secondes, sinon la question est comptée fausse.</div>
              <div className="text-sm font-semibold">Bonnes: {correctCount} · Fausses: {wrongCount}</div>
            </div>
          </>
        ) : (
          <div className="rounded-xl border border-[#e6e6e6] bg-white shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4">Résultats</h2>
            <p className="mb-2">✅ Bonnes réponses : <strong>{correctCount}</strong></p>
            <p className="mb-4">❌ Mauvaises réponses : <strong>{wrongCount}</strong></p>

            {answers.some(a => !a.isCorrect) && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-3">Révisions — Tes erreurs</h3>
                <ul className="space-y-3">
                  {answers.filter(a => !a.isCorrect).map((a, idx) => (
                    <li key={idx} className="rounded-lg border border-[#efefef] p-4 bg-[#fafafa]">
                      <div className="font-medium mb-1">{a.prompt}</div>
                      <div className="text-sm">
                        <span className="mr-2">Ta réponse :</span>
                        <span className="font-semibold">{a.timedOut ? "⏳ Temps écoulé (aucune réponse)" : (a.selectedText ?? "—")}</span>
                      </div>
                      <div className="text-sm">
                        <span className="mr-2">Bonne réponse :</span>
                        <span className="font-semibold">{a.correctText}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8">
              <button
                onClick={restart}
                className="px-5 py-3 rounded-lg font-semibold"
                style={{ background: "#111", color: "#fff", border: "1px solid #000" }}
              >
                Rejouer une nouvelle série
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
