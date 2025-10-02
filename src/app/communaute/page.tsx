export default function CommunautePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">🤝 Communauté</h1>
        <p className="text-lg text-gray-700 mb-8">
          Forums, subreddits et espaces d'entraide pour poser des questions, partager des projets et progresser.
        </p>
        {/* Mon Planning - Accès personnalisé */}
        <section className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-lg shadow-xl p-8 mb-8 border-4 border-yellow-600">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">✨ Mon Planning</h2>
              <p className="text-gray-800 text-lg mb-4">
                Accède à ton planning personnalisé avec Google Auth. Interface ultra-moderne et sécurisée !
              </p>
            </div>
            <a
              href="/communaute/planning"
              className="bg-gray-900 hover:bg-gray-800 text-yellow-400 font-bold py-4 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 text-xl"
            >
              🗓️ Mon Planning Pro
            </a>
          </div>
        </section>
        {/* Forums spécialisés */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">💬 Forums spécialisés</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg">Watchuseek – Forums Techniques</h3>
              <p className="text-gray-600">Sections dédiées à la réparation, identification de mouvements et outillage.</p>
              <a className="text-blue-600 hover:underline" href="https://www.watchuseek.com/forums/watch-repair.11/" target="_blank" rel="noopener noreferrer">watchuseek.com/watch-repair</a>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg">NAWCC Message Board</h3>
              <p className="text-gray-600">Communauté internationale d'horlogers et collectionneurs.</p>
              <a className="text-blue-600 hover:underline" href="https://mb.nawcc.org/" target="_blank" rel="noopener noreferrer">mb.nawcc.org</a>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg">Horlogerie-Suisse (Forum)</h3>
              <p className="text-gray-600">Discussions francophones sur technique, écoles et carrière.</p>
              <a className="text-blue-600 hover:underline" href="https://forum.horlogerie-suisse.com/" target="_blank" rel="noopener noreferrer">forum.horlogerie-suisse.com</a>
            </div>
          </div>
        </section>
        {/* Reddit et communautés sociales */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">📣 Reddit et réseaux</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <a className="text-blue-600 hover:underline" href="https://www.reddit.com/r/WatchHorology/" target="_blank" rel="noopener noreferrer">r/WatchHorology</a> – théorie, histoire, complications.
            </li>
            <li>
              <a className="text-blue-600 hover:underline" href="https://www.reddit.com/r/Watchexchange/" target="_blank" rel="noopener noreferrer">r/Watchexchange</a> – échanges et retours d'expérience (à lire avec prudence).
            </li>
            <li>
              <a className="text-blue-600 hover:underline" href="https://www.reddit.com/r/WatchRepairs/" target="_blank" rel="noopener noreferrer">r/WatchRepairs</a> – dépannage, diagnostics et conseils d'outillage.
            </li>
          </ul>
        </section>
        {/* Entraide et projets */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🧰 Entraide et projets</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-lg">Open Source Watchmaking</h3>
              <p className="text-gray-600">Initiatives, dossiers partagés et pièces open source.</p>
              <a className="text-blue-600 hover:underline" href="https://github.com/topics/watchmaking" target="_blank" rel="noopener noreferrer">GitHub – watchmaking</a>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-lg">Discord/Slack de communautés</h3>
              <p className="text-gray-600">Recherchez "watchmaking" sur Discord/Slack pour entraide en direct.</p>
              <a className="text-blue-600 hover:underline" href="https://discord.com/" target="_blank" rel="noopener noreferrer">discord.com</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
