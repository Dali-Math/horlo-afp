export default function Quiz() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-700 to-blue-700 bg-clip-text text-transparent mb-4">
            Quiz & Tests Horlogerie
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Testez vos connaissances et progressez dans l'art de l'horlogerie
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Plateformes de Quiz */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border border-slate-200">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-500 text-white rounded-full p-3 mr-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Plateformes Quiz</h2>
              </div>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                Évaluez vos connaissances sur des plateformes reconnues
              </p>
              <div className="space-y-3">
                <a
                  href="https://www.proprofs.com/quiz-school/topic/watches"
                  target="_blank"
                  className="block bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  ProProfs - Quiz Horlogerie
                </a>
                <a
                  href="https://quizlet.com/search?query=horology"
                  target="_blank"
                  className="block bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  Quizlet - Flashcards
                </a>
                <a
                  href="https://www.sporcle.com/games/category/watches"
                  target="_blank"
                  className="block bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  Sporcle - Quiz Montres
                </a>
              </div>
            </div>
          </div>

          {/* Tests de Connaissances */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border border-slate-200">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-emerald-500 text-white rounded-full p-3 mr-4">
                  <span className="text-2xl">📝</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Tests de Connaissances</h2>
              </div>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                Tests thématiques pour évaluer votre niveau
              </p>
              <div className="space-y-3">
                <a
                  href="/quiz-certification"
                  className="block bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  Quiz Certification CFC
                </a>
                <a
                  href="/quiz-longueurs-horlogerie"
                  className="block bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  Quiz Longueurs Horlogerie
                </a>
              </div>
            </div>
          </div>

          {/* Mémorisation */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border border-slate-200">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-purple-500 text-white rounded-full p-3 mr-4">
                  <span className="text-2xl">🎴</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Mémorisation</h2>
              </div>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                Cartes mémoire et techniques d'apprentissage
              </p>
              <div className="space-y-3">
                <a
                  href="https://quizlet.com/latest/horology-4"
                  target="_blank"
                  className="block bg-purple-50 hover:bg-purple-100 text-purple-700 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  Quizlet – Cartes mémoires
                </a>
                <a
                  href="/quiz/mouvement-6497"
                  className="block text-center bg-white border border-[#E2B44F] rounded-xl p-4 text-[#E2B44F] font-semibold hover:bg-[#fff9e6] transition-all"
                >
                  Mouvement 6497 – Cartes mémoire horlogères
                </a>
              </div>
            </div>
          </div>

          {/* Jeux Éducatifs */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border border-slate-200">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-amber-500 text-white rounded-full p-3 mr-4">
                  <span className="text-2xl">🎮</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Jeux Éducatifs</h2>
              </div>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                Apprendre en s'amusant avec des jeux interactifs
              </p>
              <div className="space-y-3">
                <a
                  href="/quiz/yesno-game"
                  className="block bg-amber-50 hover:bg-amber-100 text-amber-700 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  Yes/No Game - Horlogerie
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
