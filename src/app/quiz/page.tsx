"use client";

export default function Quiz() {
  return (
    <main className="min-h-screen bg-light-100 dark:bg-dark-900 text-slate-900 dark:text-light-100 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header Section */}
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gold mb-4">
            Quiz & Tests Horlogerie
          </h1>
          <p className="text-xl text-slate-700 dark:text-light-200 max-w-2xl mx-auto leading-relaxed">
            Testez vos connaissances et progressez dans l’art de l’horlogerie suisse
          </p>
        </header>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Plateformes de Quiz */}
          <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gold/20 hover:border-gold/50 transition-all hover:shadow-gold/10 p-6 hover:scale-[1.03]">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 text-white rounded-full p-3 mr-4">
                🎯
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-light-100">
                Plateformes Quiz
              </h2>
            </div>
            <p className="text-slate-600 dark:text-light-300 mb-6 text-sm">
              Évaluez vos connaissances sur des plateformes reconnues.
            </p>
            <div className="space-y-3">
              <a
                href="https://www.proprofs.com/quiz-school/topic/watches"
                target="_blank"
                className="block bg-blue-50 dark:bg-dark-700 hover:bg-blue-100 dark:hover:bg-dark-600 text-blue-700 dark:text-blue-300 px-4 py-3 rounded-lg text-sm font-medium transition-all"
              >
                ProProfs – Quiz Horlogerie
              </a>
              <a
                href="https://quizlet.com/search?query=horology"
                target="_blank"
                className="block bg-blue-50 dark:bg-dark-700 hover:bg-blue-100 dark:hover:bg-dark-600 text-blue-700 dark:text-blue-300 px-4 py-3 rounded-lg text-sm font-medium transition-all"
              >
                Quizlet – Flashcards
              </a>
              <a
                href="https://www.sporcle.com/games/category/watches"
                target="_blank"
                className="block bg-blue-50 dark:bg-dark-700 hover:bg-blue-100 dark:hover:bg-dark-600 text-blue-700 dark:text-blue-300 px-4 py-3 rounded-lg text-sm font-medium transition-all"
              >
                Sporcle – Quiz Montres
              </a>
            </div>
          </div>

          {/* Tests de Connaissances */}
          <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gold/20 hover:border-gold/50 transition-all hover:shadow-gold/10 p-6 hover:scale-[1.03]">
            <div className="flex items-center mb-4">
              <div className="bg-emerald-600 text-white rounded-full p-3 mr-4">
                📝
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-light-100">
                Tests de Connaissances
              </h2>
            </div>
            <p className="text-slate-600 dark:text-light-300 mb-6 text-sm">
              Tests thématiques pour évaluer votre niveau.
            </p>
            <div className="space-y-3">
              <a
                href="/quiz-certification"
                className="block bg-emerald-50 dark:bg-dark-700 hover:bg-emerald-100 dark:hover:bg-dark-600 text-emerald-700 dark:text-emerald-300 px-4 py-3 rounded-lg text-sm font-medium transition-all"
              >
                Quiz Certification CFC
              </a>
              <a
                href="/quiz-longueurs-horlogerie"
                className="block bg-emerald-50 dark:bg-dark-700 hover:bg-emerald-100 dark:hover:bg-dark-600 text-emerald-700 dark:text-emerald-300 px-4 py-3 rounded-lg text-sm font-medium transition-all"
              >
                Quiz Longueurs Horlogerie
              </a>
            </div>
          </div>

          {/* Mémorisation */}
          <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gold/20 hover:border-gold/50 transition-all hover:shadow-gold/10 p-6 hover:scale-[1.03]">
            <div className="flex items-center mb-4">
              <div className="bg-purple-600 text-white rounded-full p-3 mr-4">
                🎴
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-light-100">
                Mémorisation
              </h2>
            </div>
            <p className="text-slate-600 dark:text-light-300 mb-6 text-sm">
              Cartes mémoire et techniques d’apprentissage.
            </p>
            <div className="space-y-3">
              <a
                href="https://quizlet.com/latest/horology-4"
                target="_blank"
                className="block bg-purple-50 dark:bg-dark-700 hover:bg-purple-100 dark:hover:bg-dark-600 text-purple-700 dark:text-purple-300 px-4 py-3 rounded-lg text-sm font-medium transition-all"
              >
                Quizlet – Cartes mémoires
              </a>
              <a
                href="/quiz/mouvement-6497"
                className="block text-center bg-white dark:bg-dark-900 border border-gold/40 rounded-xl p-4 text-gold font-semibold hover:bg-gold/10 transition-all"
              >
                Mouvement 6497 – Cartes mémoire horlogères
              </a>
            </div>
          </div>

          {/* Jeux Éducatifs */}
          <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gold/20 hover:border-gold/50 transition-all hover:shadow-gold/10 p-6 hover:scale-[1.03]">
            <div className="flex items-center mb-4">
              <div className="bg-amber-500 text-white rounded-full p-3 mr-4">
                🎮
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-light-100">
                Jeux Éducatifs
              </h2>
            </div>
            <p className="text-slate-600 dark:text-light-300 mb-6 text-sm">
              Apprenez en vous amusant avec des jeux interactifs.
            </p>
            <div className="space-y-3">
              <a
                href="/quiz/yesno-game"
                className="block bg-amber-50 dark:bg-dark-700 hover:bg-amber-100 dark:hover:bg-dark-600 text-amber-700 dark:text-amber-300 px-4 py-3 rounded-lg text-sm font-medium transition-all"
              >
                Yes/No Game – Horlogerie
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-slate-600 dark:text-light-300">
          © 2025 HorloLearn — Quiz & Formation Horlogère Suisse 🇨🇭
        </footer>
      </div>
    </main>
  );
}
