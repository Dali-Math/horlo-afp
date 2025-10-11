export default function Mouvement6497Page() {
  // Liste des pièces du mouvement 6497
  const pieces = [
    { nom: "Barillet", image: "/images/quiz/6497/barillet.png" },
    { nom: "Rochet", image: "/images/quiz/6497/rochet.png" },
    { nom: "Cliquet", image: "/images/quiz/6497/cliquet.png" },
    { nom: "Roue de centre", image: "/images/quiz/6497/roue-centre.png" },
    { nom: "Roue moyenne", image: "/images/quiz/6497/roue-moyenne.png" },
    { nom: "Roue de seconde", image: "/images/quiz/6497/roue-seconde.png" },
    { nom: "Roue d'échappement", image: "/images/quiz/6497/roue-echappement.png" },
    { nom: "Ancre", image: "/images/quiz/6497/ancre.png" },
    { nom: "Balancier", image: "/images/quiz/6497/balancier.png" },
    { nom: "Spiral", image: "/images/quiz/6497/spiral.png" },
    { nom: "Pont de barillet", image: "/images/quiz/6497/pont-barillet.png" },
    { nom: "Pont de finissage", image: "/images/quiz/6497/pont-finissage.png" },
  ];

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
            🕰️ Mouvement 6497 – Cartes mémoire
          </h1>
          <p className="mt-2 text-slate-600">
            Mémorisez les pièces emblématiques du mouvement mécanique Unitas 6497
          </p>
        </div>
      </header>

      {/* Grille des cartes */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pieces.map((piece, index) => (
            <div
              key={index}
              className="bg-white border border-[#E2B44F] rounded-xl p-6 text-center shadow-md hover:scale-105 transition-all duration-300"
              style={{
                boxShadow: '0 4px 6px rgba(0,0,0,0.1), 0 0 15px rgba(226,180,79,0.4)'
              }}
            >
              <div className="flex items-center justify-center h-32 mb-4">
                <img
                  src={piece.image}
                  alt={piece.nom}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3 className="text-slate-800 font-semibold text-lg">
                {piece.nom}
              </h3>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E2B44F] mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-slate-600">
          <p>
            💡 <strong>Astuce :</strong> Cliquez sur chaque carte pour mémoriser
            visuellement les composants du mouvement 6497.
          </p>
        </div>
      </footer>
    </div>
  );
}
