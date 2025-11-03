import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler } from 'lucide-react';
import { Question, QUESTION_BANK } from '../../data/questions';

const CHOICE_COLORS = ["#FFD84C", "#E2B44F", "#f5cc66", "#b8941f"];
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

const QuizConversions: React.FC = () => {
  const QUESTIONS_PER_RUN = 20;
  const TIME_PER_QUESTION = 20;

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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center px-4 py-10 transition-colors duration-500">
      <motion.section
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-10 border border-yellow-400/20"
      >
        {!done ? (
          <>
            {/* En-tête */}
            <header className="flex items-center justify-between mb-8 border-b border-slate-200 dark:border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <Ruler className="text-yellow-400" size={36} />
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  Quiz — <span className="text-yellow-400">Conversions</span>
                </h1>
              </div>
              <div className="text-yellow-400 font-semibold text-xl">
                ⏱ {secondsLeft}s
              </div>
            </header>

            {/* Barre de progression */}
            <p className="text-base text-slate-600 dark:text-slate-200 mb-4">
              Question {index + 1} / {sessionQuestions.length}
            </p>
            <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full mb-8 overflow-hidden">
              <motion.div
                className="h-3 bg-yellow-400"
                initial={{ width: 0 }}
                animate={{
                  width: `${(index / sessionQuestions.length) * 100}%`,
                }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Question */}
            <h2 className="text-3xl font-semibold mb-8 text-center text-slate-900 dark:text-slate-100">
              {q.prompt}
            </h2>

            {/* Choix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {q.choices.map((c, i) => (
                <motion.button
                  key={i}
                  onClick={() => onSelect(i)}
                  disabled={locked}
                  className="rounded-xl px-6 py-5 font-semibold shadow-sm transition-transform active:scale-[0.98] text-lg border border-slate-200 dark:border-white/10 hover:scale-105"
                  style={{
                    background: CHOICE_COLORS[i % CHOICE_COLORS.length],
                    color: TEXT_COLOR,
                  }}
                  whileHover={{ scale: locked ? 1 : 1.05 }}
                  whileTap={{ scale: locked ? 1 : 0.95 }}
                >
                  <span className="mr-1 font-bold">
                    {String.fromCharCode(65 + i)}.
                  </span>{" "}
                  {c}
                </motion.button>
              ))}
            </div>

            <div className="flex items-center justify-between text-base text-slate-700 dark:text-slate-200">
              <p>⏳ 20 secondes par question.</p>
              <p>
                ✅ {correctCount} · ❌ {wrongCount}
              </p>
            </div>
          </>
        ) : (
          <div>
            <h2 className="text-4xl font-bold text-center text-yellow-400 mb-2">
              Résultats du Quiz
            </h2>
            <div className="text-center mb-8">
              <p className="text-green-600 dark:text-green-400 font-semibold">
                ✅ Bonnes réponses : {correctCount}
              </p>
              <p className="text-red-600 dark:text-red-400 font-semibold">
                ❌ Mauvaises réponses : {wrongCount}
              </p>
            </div>

            <div className="text-left">
              <h3 className="text-2xl font-semibold mb-4 text-yellow-400">
                Révisions
              </h3>
              <ul className="space-y-4">
                {answers.map((a, idx) => (
                  <li
                    key={idx}
                    className="rounded-xl border border-slate-200 dark:border-white/10 p-4 bg-slate-50 dark:bg-slate-700 transition-colors"
                  >
                    <p className="font-medium text-slate-900 dark:text-slate-100 mb-2">
                      {a.prompt}
                    </p>

                    <div
                      className={`p-2 rounded-md mb-1 ${
                        a.isCorrect
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                      }`}
                    >
                      Ta réponse :{" "}
                      {a.timedOut ? "⏳ Temps écoulé" : a.selectedText ?? "—"}
                    </div>

                    {!a.isCorrect && (
                      <div className="p-2 rounded-md bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                        Bonne réponse : {a.correctText}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center mt-10">
              <motion.button
                onClick={restart}
                className="px-8 py-4 rounded-lg font-semibold bg-yellow-400 text-slate-900 hover:bg-yellow-300 transition text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🔁 Rejouer une nouvelle série
              </motion.button>
            </div>
          </div>
        )}
      </motion.section>
    </main>
  );
};

export default QuizConversions;