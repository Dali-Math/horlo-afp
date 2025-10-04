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
                <a href="https://www.proprofs.com/quiz-school/topic/watches" target="_blank" className="block bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium">
                  ProProfs - Quiz Horlogerie
                </a>
                <a href="https://quizlet.com/search?query=horology" target="_blank" className="block bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium">
                  Quizlet - Flashcards
                </a>
                <a href="https://www.sporcle.com/games/category/watches" target="_blank" className="block bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium">
                  Sporcle - Quiz Montres
                </a>
              </div>
            </div>
          </div>
          {/* Quiz Interactifs */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border border-slate-200">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-500 text-white rounded-full p-3 mr-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Quiz Interactifs</h2>
              </div>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                Apprenez en vous amusant avec des quiz collaboratifs
              </p>
              <div className="space-y-3">
                <a href="https://kahoot.com/" target="_blank" className="block bg-green-50 hover:bg-green-100 text-green-700 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium">
                  Kahoot! - Quiz collaboratifs
                </a>
                <a href="https://quizizz.com/" target="_blank" className="block bg-green-50 hover:bg-green-100 text-green-700 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium">
                  Quizizz - Tests interactifs
                </a>
                <a href="https://www.mentimeter.com/" target="_blank" className="block bg-green-50 hover:bg-green-100 text-green-700 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium">
                  Mentimeter - Sondages
                </a>
              </div>
            </div>
          </div>
          {/* Flashcards */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border border-slate-200">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-purple-500 text-white rounded-full p-3 mr-4">
                  <span className="text-2xl">🎴</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Mémorisation</h2>
              </div>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                Renforcez vos acquis avec des cartes mémoires
              </p>
              <div className="space-y-3">
                <a href="https://www.anki.com/" target="_blank" className="block bg-purple-50 hover:bg-purple-100 text-purple-700 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium">
                  Anki - Répétition espacée
                </a>
                <a href="https://quizlet.com/" target="_blank" className="block bg-purple-50 hover:bg-purple-100 text-purple-700 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium">
                  Quizlet - Cartes mémoires
                </a>
                <a href="https://www.brainscape.com/" target="_blank" className="block bg-purple-50 hover:bg-purple-100 text-purple-700 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium">
                  Brainscape - Adaptatif
                </a>
              </div>
            </div>
          </div>
          {/* Certifications */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border border-slate-200">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-amber-500 text-white rounded-full p-3 mr-4">
                  <span className="text-2xl">🎓</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Certifications</h2>
              </div>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                Préparez-vous aux examens professionnels
              </p>
              <div className="space-y-3">
                <a href="https://www.awci.com/education/" target="_blank" className="block bg-amber-50 hover:bg-amber-100 text-amber-700 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium">
                  AWCI - Institut Américain
                </a>
                <a href="https://www.britishhorological.org/education" target="_blank" className="block bg-amber-50 hover:bg-amber-100 text-amber-700 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium">
                  BHI - Institut Britannique
                </a>
                <a href="https://www.wostep.ch/" target="_blank" className="block bg-amber-50 hover:bg-amber-100 text-amber-700 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium">
                  WOSTEP - Formation Suisse
                </a>
              </div>
            </div>
          </div>
          {/* Tests Spécialisés */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border border-slate-200">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-red-500 text-white rounded-full p-3 mr-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Tests Avancés</h2>
              </div>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                Approfondissez avec des formations spécialisées
              </p>
              <div className="space-y-3">
                <a href="https://www.coursera.org/" target="_blank" className="block bg-red-50 hover:bg-red-100 text-red-700 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium">
                  Coursera - Cours certifiés
                </a>
                <a href="https://www.edx.org/" target="_blank" className="block bg-red-50 hover:bg-red-100 text-red-700 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium">
                  edX - Formations
                </a>
                <a href="https://www.futurelearn.com/" target="_blank" className="block bg-red-50 hover:bg-red-100 text-red-700 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium">
                  FutureLearn - En ligne
                </a>
              </div>
            </div>
          </div>
          {/* Jeux Éducatifs */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border border-slate-200">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-500 text-white rounded-full p-3 mr-4">
                  <span className="text-2xl">🎮</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Jeux Éducatifs</h2>
              </div>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                Apprenez en jouant avec des activités ludiques
              </p>
              <div className="space-y-3">
                <a href="/quiz/yesno-game" className="block bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-700 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium border border-indigo-200">
                  🎯 Quiz Vrai/Faux - Horlogerie
                </a>
                <a href="https://www.purposegames.com/" target="_blank" className="block bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium">
                  Purpose Games - Personnalisés
                </a>
                <a href="https://www.educaplay.com/" target="_blank" className="block bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium">
                  Educaplay - Interactifs
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto border border-slate-200">
            <h3 className="text-3xl font-bold text-slate-800 mb-4">
              Prêt à tester vos connaissances ?
            </h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Explorez nos ressources et mesurez votre progression dans l'univers fascinant de l'horlogerie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg">
                Commencer un quiz
              </button>
              <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-lg font-medium transition-all duration-200 border border-slate-300">
                Explorer les ressources
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
