"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Question } from "./questions";
import { QUESTION_BANK } from "./questions";
import { motion } from "framer-motion";
import { Ruler } from "lucide-react";

const CHOICE_COLORS = ["#FF4C4C", "#4C8CFF", "#4CFF74", "#FFD84C"];
const TEXT_COLOR = "#111";
const BG = "#fdfdfd";

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
  const TIME_PER_QUESTION = 12;

  const [seed, setSeed] = useState<number>(() => Date.now());
  const sessionQuestions = useMemo<Question[]>(() => pickRandom(QUESTION_BANK, QUESTIONS_PER_RUN), [seed]);
  const [index, setIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(TIME_PER_QUESTION);
  const [locked, setLocked] = useState(false);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const q = sessionQuestions[index];
  const done = index >= sessionQuestions.length;

  useEffect(() => {
    if (done) return;
    setSecondsLeft(TIME_PER_QUESTION);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
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
    }, 600);
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
    <main className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4 py-10">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8"
      >
        {!done ? (
          <>
            <header className="flex items-center justify-between mb-6 border-b pb-3">
              <div className="flex items-center gap-3">
                <Ruler className="text-[#E2B44F]" size={28} />
                <h1 className="text-2xl font-bold text-[#111]">
                  Quiz — <span className="text-[#E2B44F]">Conversions</span>
                </h1>
              </div>
              <div className="text-[#E2B44F] font-semibold text-lg">
                ⏱ {secondsLeft}s
              </div>
            </header>

            <p className="text-sm text-gray-600 mb-3">
              Question {index + 1} / {sessionQuestions.length}
            </p>

            <div className="w-full h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
              <motion.div
                className="h-2 bg-[#E2B44F]"
                initial={{ width: 0 }}
                animate={{ width: `${(index / sessionQuestions.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <h2 className="text-xl md:text-2xl font-semibold mb-6 leading-snug text-center text-[#111]">
              {q.prompt}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {q.choices.map((c, i) => (
                <button
                  key={i}
                  onClick={() => onSelect(i)}
                  disabled={locked}
                  className="rounded-lg px-4 py-4 font-semibold shadow-sm transition-transform active:scale-[0.98]"
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

            <div className="flex items-center justify-between text-sm text-gray-600">
              <p>Réponds en 12 secondes, sinon la question est comptée fausse.</p>
              <p>✅ {correctCount} · ❌ {wrongCount}</p>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#E2B44F] mb-4">
              Résultats du Quiz
            </h2>
            <p className="mb-4 text-gray-700 text-lg">
              ✅ Bonnes réponses : <strong>{correctCount}</strong><br />
              ❌ Mauvaises réponses : <strong>{wrongCount}</strong>
            </p>

            {answers.some(a => !a.isCorrect) && (
              <div className="mt-6 text-left">
                <h3 className="text-xl font-semibold mb-3 text-[#E2B44F]">Révisions</h3>
                <ul className="space-y-3">
                  {answers.filter(a => !a.isCorrect).map((a, idx) => (
                    <li key={idx} className="rounded-lg border p-4 bg-[#fafafa]">
                      <p className="font-medium mb-1 text-[#111]">{a.prompt}</p>
                      <p className="text-sm">
                        <span className="font-semibold text-red-500">Ta réponse :</span>{" "}
                        {a.timedOut ? "⏳ Temps écoulé" : a.selectedText}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold text-green-600">Bonne réponse :</span>{" "}
                        {a.correctText}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={restart}
              className="mt-8 px-6 py-3 rounded-lg font-semibold bg-[#E2B44F] text-black hover:bg-[#f5cc66] transition"
            >
              🔁 Rejouer une nouvelle série
            </button>
          </div>
        )}
      </motion.section>
    </main>
  );
}
