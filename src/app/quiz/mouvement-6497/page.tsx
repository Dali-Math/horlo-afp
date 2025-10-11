import MemoryGame from "./MemoryGame";

export default function Mouvement6497Page() {
  return (
    <div className="min-h-screen bg-[#fdfaf5]">
      {/* En-tête */}
      <header className="bg-white border-b border-[#E2B44F] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <a
            href="/quiz"
            className="inline-flex items-center text-[#E2B44F] hover:text-[#d4a03f] transition-colors mb-4"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Retour aux quiz
          </a>
          <h1 className="text-4xl font-bold text-slate-800">
            🕰️ Mouvement 6497 – Jeu de Mémoire
          </h1>
          <p className="mt-2 text-slate-600">
            Retrouvez toutes les paires de pièces du mouvement mécanique Unitas 6497 avant la fin du temps !
          </p>
        </div>
      </header>

      {/* Jeu de mémoire */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <MemoryGame />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E2B44F] mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-slate-600">
          <p>
            💡 Astuce : Retrouvez toutes les paires identiques en moins de 2 minutes pour gagner !
          </p>
        </div>
      </footer>
    </div>
  );
}
