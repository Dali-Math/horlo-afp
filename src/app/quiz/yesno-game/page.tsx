'use client';
import { useEffect, useRef, useState } from 'react';
import { questions, Question } from './questions';

type GameState = 'welcome' | 'playing' | 'gameOver';
interface GameStats {
  correctAnswers: number;
  totalQuestions: number;
  wrongAnswers: number;
}

export default function YesNoGame() {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [playerName, setPlayerName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState<GameStats>({
    correctAnswers: 0,
    totalQuestions: 0,
    wrongAnswers: 0,
  });
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [lastAnswer, setLastAnswer] = useState<{
    correct: boolean;
    explanation: string;
  } | null>(null);

  // TIMER state
  const [timeLeft, setTimeLeft] = useState(20);
  const [timeUp, setTimeUp] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startTimer = () => {
    clearTimer();
    setTimeLeft(20);
    setTimeUp(false);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          setTimeUp(true);
          // Auto-fault when time reaches 0
          handleAnswer(false, true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Shuffle questions at game start
  const shuffleQuestions = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  };

  const startGame = () => {
    if (playerName.trim() === '') return;
    shuffleQuestions();
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setScore({ correctAnswers: 0, totalQuestions: 0, wrongAnswers: 0 });
    setShowExplanation(false);
    setLastAnswer(null);
    startTimer();
  };

  const proceedAfterAnswer = () => {
    // Move to next question or end game after showing explanation
    setTimeout(() => {
      if (score.wrongAnswers >= 3) {
        setGameState('gameOver');
        setShowExplanation(false);
        return;
      }
      if (currentQuestionIndex < shuffledQuestions.length - 1) {
        setCurrentQuestionIndex((idx) => idx + 1);
        setShowExplanation(false);
        setLastAnswer(null);
        startTimer(); // reset timer for next question
      } else {
        setGameState('gameOver');
        setShowExplanation(false);
      }
    }, 2500);
  };

  const handleAnswer = (answer: boolean, fromTimeout: boolean = false) => {
    // Prevent multiple answers while explanation is showing
    if (showExplanation) return;

    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;

    const newStats = {
      ...score,
      totalQuestions: score.totalQuestions + 1,
      correctAnswers: isCorrect ? score.correctAnswers + 1 : score.correctAnswers,
      wrongAnswers: isCorrect ? score.wrongAnswers : score.wrongAnswers + 1,
    };

    setScore(newStats);
    setLastAnswer({
      correct: isCorrect,
      explanation: fromTimeout ? 'Temps écoulé !' : currentQuestion.explanation,
    });
    setShowExplanation(true);

    // stop timer upon answer or timeout
    clearTimer();

    // GameOver if 3 wrong answers
    if (newStats.wrongAnswers >= 3) {
      setTimeout(() => {
        setGameState('gameOver');
        setShowExplanation(false);
      }, 3000);
      return;
    }

    // Next question after 2.5 seconds
    proceedAfterAnswer();
  };

  const resetGame = () => {
    setGameState('welcome');
    setPlayerName('');
    setCurrentQuestionIndex(0);
    setScore({ correctAnswers: 0, totalQuestions: 0, wrongAnswers: 0 });
    setShowExplanation(false);
    setLastAnswer(null);
    setTimeLeft(20);
    setTimeUp(false);
    clearTimer();
  };

  // Start or reset timer when question index changes while playing
  useEffect(() => {
    if (gameState === 'playing') {
      startTimer();
    } else {
      clearTimer();
    }
    return () => clearTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {gameState === 'welcome' && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center border border-indigo-200">
            <div className="mb-6">
              <div className="text-6xl mb-4">🎯</div>
              <h1 className="text-4xl font-bold text-indigo-900 mb-2">Quiz Vrai/Faux Horlogerie</h1>
              <p className="text-lg text-slate-600 mb-6">Testez vos connaissances en horlogerie !</p>
              <div className="bg-indigo-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-indigo-800 mb-2">📋 Règles du jeu :</h3>
                <ul className="text-sm text-indigo-700 space-y-1">
                  <li>• Répondez par VRAI ou FAUX aux questions</li>
                  <li>• Vous avez droit à 3 erreurs maximum</li>
                  <li>• Score affiché en temps réel</li>
                  <li>• Explication après chaque réponse</li>
                  <li>• 20 secondes par question</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="playerName">
                  Entrez votre pseudo :
                </label>
                <input
                  id="playerName"
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && startGame()}
                  className="w-full px-4 py-3 border-2 border-indigo-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none text-center text-lg"
                  placeholder="Mon pseudo..."
                  maxLength={20}
                />
              </div>
              <button
                onClick={startGame}
                disabled={playerName.trim() === ''}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg"
              >
                🚀 Commencer le quiz
              </button>
            </div>
          </div>
        )}

        {gameState === 'playing' && currentQuestion && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-indigo-200">
            <div className="mb-6 text-center">
              <div className="flex justify-between items-center mb-4">
                <div className="text-lg font-medium text-slate-600">👤 {playerName}</div>
                <div className="text-lg font-medium text-slate-600">Question {currentQuestionIndex + 1}/{shuffledQuestions.length}</div>
              </div>

              <div className="flex justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-green-600 font-bold">✅ {score.correctAnswers}</span>
                  <span className="text-slate-500">Correct</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-red-600 font-bold">❌ {score.wrongAnswers}</span>
                  <span className="text-slate-500">Faux</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-600 font-bold">⚠️ {3 - score.wrongAnswers}</span>
                  <span className="text-slate-500">Chances</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={timeLeft <= 5 ? 'text-red-600 font-bold' : 'text-blue-600 font-bold'}>⏱️ {timeLeft}s</span>
                  <span className="text-slate-500">Temps</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="bg-slate-50 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-slate-800 leading-relaxed">{currentQuestion.question}</h2>
              </div>

              {!showExplanation && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => handleAnswer(true)}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-6 px-8 rounded-xl text-2xl transition-all duration-200 transform hover:scale-105 shadow-lg active:scale-95"
                  >
                    ✅ VRAI
                  </button>
                  <button
                    onClick={() => handleAnswer(false)}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-6 px-8 rounded-xl text-2xl transition-all duration-200 transform hover:scale-105 shadow-lg active:scale-95"
                  >
                    ❌ FAUX
                  </button>
                </div>
              )}
            </div>

            {showExplanation && lastAnswer && (
              <div className={`${lastAnswer.correct ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'} border-2 rounded-lg p-6`}>
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-2xl">{lastAnswer.correct ? '✅' : '❌'}</span>
                  <span className="font-bold text-lg">{lastAnswer.correct ? 'Bonne réponse !' : 'Fausse réponse'}</span>
                </div>
                <p className="leading-relaxed">{lastAnswer.explanation}</p>
                {timeUp && (
                  <p className="mt-2 text-sm text-slate-500">Temps écoulé !</p>
                )}
              </div>
            )}
          </div>
        )}

        {gameState === 'gameOver' && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center border border-indigo-200">
            <div className="mb-6">
              <div className="text-6xl mb-4">{score.wrongAnswers >= 3 ? '💥' : '🎉'}</div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">{score.wrongAnswers >= 3 ? 'Game Over !' : 'Quiz terminé !'}</h2>
              <p className="text-lg text-slate-600 mb-6">Bien joué {playerName} !</p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">📊 Vos résultats</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-green-600">{score.correctAnswers}</div>
                  <div className="text-sm text-slate-600">Bonnes</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-red-600">{score.wrongAnswers}</div>
                  <div className="text-sm text-slate-600">Fausses</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-blue-600">{Math.round((score.correctAnswers / score.totalQuestions) * 100) || 0}%</div>
                  <div className="text-sm text-slate-600">Précision</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={resetGame}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                🔄 Rejouer
              </button>
              <a
                href="/quiz"
                className="block w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-4 px-8 rounded-lg text-lg transition-all duration-200 border border-slate-300"
              >
                ← Retour aux quiz
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
