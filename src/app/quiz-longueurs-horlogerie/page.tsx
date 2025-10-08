"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Question } from "./questions";
import { QUESTION_BANK } from "./questions";
import { motion } from "framer-motion";
import { Ruler } from "lucide-react";

const CHOICE_COLORS = ["#FF4C4C", "#4C8CFF", "#4CFF74", "#FFD84C"];
const TEXT_COLOR = "#111";

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
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

export default function QuizLongueursHorlogeriePage() {
  const QUESTIONS_PER_RUN = 20;
  const TIME_PER_QUESTION = 20; // ⏱ 20 s

  const [seed, setSeed] = useState<number>(() => Date.now());
  const sessionQuestions = useMemo<Question[]>(
    () => pickRandom(QUESTION_BANK, QUESTIONS_PER_RUN),
    [seed]
  );

  const [index, setIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(TIME_PER_QUESTION);
  const [locked, setLocked] = useState(false);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const q = sessionQuestions[index];
  const done = index >= sessionQuestions.length;

  // Timer par question
  useEffect(() => {
    if (done) return;
    setSecondsLeft(TIME_PER_QUESTION);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleAnswer(null, true); // temps écoulé → faux + auto-next
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

    setTimeout(() => {
      setLocked(false);
      setIndex((i) => i + 1);
    }, 500);
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

  const correctCount = answers.filter((a) => a.isCorrect).length;
  const wrongCount = answers.length - correctCount;

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-10">
      <motion.section
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl p-10"
      >
        {!done ? (
          <>
            {/* Header */}
            <header className="flex items-center justify-between mb-8 border-b pb-4">
              <div className="flex items-center gap-3">
                <Ruler className="text-[#E2B44F]" size={36} />
                <h1 className="text-3xl font-bold text-[#111]">
                  Quiz — <span className="text-[#E2B44F]">Conversions</span>
                </h1>
              </div>
              <div className="text-[#E2B44F] font-semibold text-xl">
                ⏱ {secondsLeft}s
              </div>
            </header>

            {/* Progress */}
            <p className="text-base text-gray-600 mb-4">
              Question {index + 1} / {sessionQuestions.length}
            </p>
            <div className="w-full h-3 bg-gray-200 rounded-full mb-8 overflow-hidden">
              <motion.div
                className="h-3 bg-[#E2B44F]"
                initial={{ width: 0 }}
                animate={{
                  width: `${(index / sessionQuestions.length) * 100}%`,
                }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Question */}
            <h2 className="text-3xl font-semibold mb-8 text-center text-[#111]">
              {q.prompt}
            </h2>

            {/* Choices */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {q.choices.map((c, i) => (
                <button
                  key={i}
                  onClick={() => onSelect(i)}
                  disabled={locked}
                  className="rounded-xl px-6 py-5 font-semibold shadow-sm transition-transform active:scale-[0.98] text-lg"
                  style={{
                    background: CHOICE_COLORS[i % CHOICE_COLORS.length],
                    color: TEXT_COLOR,
                  }}
                >
                  <span className="mr-1 font-bold">
                    {String.fromCharCode(65 + i)}.
                  </span>{" "}
                  {c}
                </button>
              ))}
            </div>

            {/* Live score */}
            <div className="flex items-center justify-between text-base text-gray-600">
              <p>Réponds en 20 secondes, sinon la question est comptée fausse.</p>
              <p>
                ✅ {correctCount} · ❌ {wrongCount}
              </p>
            </div>
          </>
        ) : (
          // =======================
          //  RESULTATS
          // =======================
          <div>
            <h2 className="text-4xl font-bold text-center text-[#E2B44F] mb-2">
              Résultats du Quiz
            </h2>
            <div className="text-center mb-8">
              <p className="text-green-600 font-semibold">
                ✅ Bonnes réponses : {correctCount}
              </p>
              <p className="text-red-600 font-semibold">
                ❌ Mauvaises réponses : {wrongCount}
              </p>
            </div>

            {/* On n’affiche QUE les mauvaises réponses avec la bonne solution */}
            {answers.some((a) => !a.isCorrect) && (
              <div className="text-left">
                <h3 className="text-2xl font-semibold mb-4 text-[#E2B44F]">
                  Révisions
                </h3>
                <ul className="space-y-4">
                  {answers
                    .filter((a) => !a.isCorrect)
                    .map((a, idx) => (
                      <li
                        key={idx}
                        className="rounded-xl border border-[#eee] p-4 bg-[#fafafa]"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium text-[#111]">{a.prompt}</p>
                          <span className="text-sm px-2 py-1 rounded-md bg-red-100 text-red-700">
                            ❌ Mauvaise réponse
                          </span>
                        </div>

                        <p className="text-sm mb-1">
                          <span className="font-semibold text-red-600">
                            Ta réponse :
                          </span>{" "}
                          {a.timedOut
                            ? "⏳ Temps écoulé (aucune réponse)"
                            : a.selectedText ?? "—"}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold text-green-700">
                            Bonne réponse :
                          </span>{" "}
                          {a.correctText}
                        </p>
                      </li>
                    ))}
                </ul>
              </div>
            )}

            <div className="text-center mt-10">
              <button
                onClick={restart}
                className="px-8 py-4 rounded-lg font-semibold bg-[#E2B44F] text-black hover:bg-[#f5cc66] transition text-lg"
              >
                🔁 Rejouer une nouvelle série
              </button>
            </div>
          </div>
        )}
      </motion.section>
    </main>
  );
}
