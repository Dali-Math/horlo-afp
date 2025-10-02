export default function PodcastsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">🎧 Podcasts</h1>
        <p className="text-lg text-gray-700 mb-8">
          Sélection de podcasts horlogers, lecteurs et plateformes pour apprendre et s’inspirer en audio.
        </p>

        {/* Lecteurs et Plateformes */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">▶️ Lecteurs et Plateformes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg">Spotify Podcasts</h3>
              <p className="text-gray-600">Large catalogue de podcasts horlogers, interviews et émissions spécialisées.</p>
              <a href="https://open.spotify.com/search/podcast%20watchmaking" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Rechercher sur Spotify</a>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg">Apple Podcasts</h3>
              <p className="text-gray-600">Sélection internationale de podcasts d’horlogerie.</p>
              <a href="https://podcasts.apple.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Apple Podcasts</a>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg">YouTube (Playlists)</h3>
              <p className="text-gray-600">Interviews, documentaires audio/vidéo et conférences accessibles gratuitement.</p>
              <a href="https://www.youtube.com/results?search_query=watchmaking+podcast" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Rechercher sur YouTube</a>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg">Deezer</h3>
              <p className="text-gray-600">Podcasts francophones et internationaux sur l’horlogerie et l’artisanat.</p>
              <a href="https://www.deezer.com/search/watchmaking%20podcast" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Chercher sur Deezer</a>
            </div>
          </div>
        </section>

        {/* Sélection recommandée */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">⭐ Sélection recommandée</h2>
          <div className="space-y-5">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg">The Grey NATO</h3>
              <p className="text-gray-600">Aventures, montres-outils, interviews et discussions techniques.</p>
              <a href="https://www.thegreynato.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">thegreynato.com</a>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg">Hodinkee Radio</h3>
              <p className="text-gray-600">Interviews avec horlogers, designers et acteurs de l’industrie.</p>
              <a href="https://www.hodinkee.com/podcasts" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">hodinkee.com/podcasts</a>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg">Time 4A Pint</h3>
              <p className="text-gray-600">Histoires de montres et passionnés, focus technique et culture.</p>
              <a href="https://www.time4apint.com/podcast" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">time4apint.com</a>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg">Scottish Watches Podcast</h3>
              <p className="text-gray-600">Actualité, débats et entretiens avec professionnels.</p>
              <a href="https://www.scottishwatches.co.uk/category/podcasts/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">scottishwatches.co.uk</a>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg">WatchGecko</h3>
              <p className="text-gray-600">Culture horlogère et technique, accessible aux débutants.</p>
              <a href="https://www.watchgecko.com/blogs/magazine/tagged/podcast" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">watchgecko.com</a>
            </div>
          </div>
        </section>

        {/* Podcasts francophones */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🇫🇷 Podcasts francophones</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" href="https://podcast.ausha.co/">Ausha (moteur de recherche)</a> – plateforme pour trouver des podcasts francophones.
            </li>
            <li>
              <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" href="https://www.radiofrance.fr/podcasts">Radio France Podcasts</a> – émissions culturelles et scientifiques liées au temps et aux métiers.
            </li>
            <li>
              <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" href="https://www.rts.ch/audio-podcast/">RTS Audio</a> – contenus suisses sur artisanat, histoire et industrie.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
