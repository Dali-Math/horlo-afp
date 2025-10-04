export default function RessourcesPage() {
  return (
    <div
      className="min-h-screen text-white"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #020617 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-12">
        {/* Titre principal */}
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 text-amber-400">📚 Ressources Horlogères</h1>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto">
            Une sélection de ressources techniques, manuels et normes pour les apprentis et passionnés d’horlogerie suisse.
          </p>
        </div>

        {/* PDFs et Documentation */}
        <section className="bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 shadow-lg hover:shadow-amber-500/20 transition">
          <h2 className="text-3xl font-semibold text-amber-300 mb-6">📄 PDFs et Documentation Technique</h2>
          <div className="space-y-6">
            {[
              {
                titre: "Bibliothèque Numérique FHH",
                desc: "Archives historiques et documentation technique de la Fondation de la Haute Horlogerie",
                lien: "https://www.hautehorlogerie.org/",
                url: "www.hautehorlogerie.org",
              },
              {
                titre: "Archive.org - Livres d'horlogerie",
                desc: "Livres anciens et manuels d’horlogerie numérisés, téléchargeables gratuitement",
                lien: "https://archive.org/search.php?query=horlogerie",
                url: "archive.org/horlogerie",
              },
              {
                titre: "WOSTEP - Documentation Technique",
                desc: "Ressources techniques de la Watchmakers of Switzerland Training and Educational Program",
                lien: "https://wostep.ch/",
                url: "wostep.ch",
              },
              {
                titre: "Ranfft Watch Movement Database",
                desc: "Base de données technique complète avec fiches détaillées et schémas de mouvements",
                lien: "http://www.ranfft.de/cgi-bin/bidfun-db.cgi?10=",
                url: "ranfft.de",
              },
            ].map((item, idx) => (
              <div key={idx} className="border-l-4 border-amber-500 pl-6 hover:pl-7 transition-all">
                <h3 className="font-semibold text-lg text-white">{item.titre}</h3>
                <p className="text-slate-300 mb-1">{item.desc}</p>
                <a
                  href={item.lien}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 underline decoration-dotted"
                >
                  {item.url}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Dictionnaires */}
        <section className="bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 shadow-lg hover:shadow-emerald-400/20 transition">
          <h2 className="text-3xl font-semibold text-emerald-300 mb-6">📖 Dictionnaires et Glossaires</h2>
          <div className="space-y-6">
            {[
              {
                titre: "Glossaire FH (Fédération Horlogère)",
                desc: "Terminologie officielle de l’horlogerie suisse (FR, EN, DE).",
                lien: "https://www.fhs.swiss/",
                url: "fhs.swiss",
              },
              {
                titre: "Watch-Wiki",
                desc: "Encyclopédie collaborative en ligne sur l’horlogerie (multilingue).",
                lien: "https://watch-wiki.org/",
                url: "watch-wiki.org",
              },
              {
                titre: "Lexique Pratique d’Horlogerie (FHH)",
                desc: "Termes techniques expliqués simplement pour apprentis.",
                lien: "https://www.hautehorlogerie.org/en/encyclopaedia/lexicon-glossary/",
                url: "FHH Lexique",
              },
            ].map((item, idx) => (
              <div key={idx} className="border-l-4 border-emerald-400 pl-6 hover:pl-7 transition-all">
                <h3 className="font-semibold text-lg text-white">{item.titre}</h3>
                <p className="text-slate-300 mb-1">{item.desc}</p>
                <a
                  href={item.lien}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 underline decoration-dotted"
                >
                  {item.url}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Manuels de formation */}
        <section className="bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 shadow-lg hover:shadow-rose-400/20 transition">
          <h2 className="text-3xl font-semibold text-rose-300 mb-6">📕 Manuels de Formation</h2>
          <div className="space-y-6">
            {[
              {
                titre: "Théorie d’Horlogerie – CPIH",
                desc: "Manuel de référence du Centre de Formation Professionnelle en Horlogerie.",
                lien: "https://www.cpih.ch/",
                url: "cpih.ch",
              },
              {
                titre: "George Daniels – Watchmaking",
                desc: "Le manuel de référence absolu (consultable dans les bibliothèques).",
                lien: "https://www.georgedaniels.co.uk/",
                url: "georgedaniels.co.uk",
              },
              {
                titre: "Practical Watch Repairing – Donald de Carle",
                desc: "Classique incontournable pour apprentis horlogers (PDF sur Archive.org).",
                lien: "https://archive.org/details/practicalwatchre0000deca",
                url: "archive.org/practicalwatch",
              },
            ].map((item, idx) => (
              <div key={idx} className="border-l-4 border-rose-400 pl-6 hover:pl-7 transition-all">
                <h3 className="font-semibold text-lg text-white">{item.titre}</h3>
                <p className="text-slate-300 mb-1">{item.desc}</p>
                <a
                  href={item.lien}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-400 hover:text-rose-300 underline decoration-dotted"
                >
                  {item.url}
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
