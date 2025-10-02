export default function Theorie() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Théorie Horlogère</h1>
      <p className="text-lg mb-8">Ressources complètes pour l'apprentissage théorique de l'horlogerie</p>

      {/* Cours PDF */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">📚 Cours PDF Gratuits</h2>
        <ul className="space-y-2">
          <li><a href="https://www.hautehorlogerie.org/fr/encyclopedie/" className="text-blue-600 hover:underline" target="_blank">Encyclopédie de la Haute Horlogerie - FHH</a></li>
          <li><a href="https://www.federation-horlogerie.ch/fr/formation" className="text-blue-600 hover:underline" target="_blank">Manuels de Formation FH</a></li>
          <li><a href="https://archive.org/search?query=horology" className="text-blue-600 hover:underline" target="_blank">Archives Horlogères - Internet Archive</a></li>
          <li><a href="https://www.britishhorological.org/resources" className="text-blue-600 hover:underline" target="_blank">British Horological Institute - Ressources</a></li>
          <li><a href="https://www.nawcc.org/" className="text-blue-600 hover:underline" target="_blank">NAWCC - National Association of Watch and Clock Collectors</a></li>
        </ul>
      </section>

      {/* Vidéos */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">🎥 Playlists Vidéos YouTube</h2>
        <ul className="space-y-2">
          <li><a href="https://www.youtube.com/@Watchfinder" className="text-blue-600 hover:underline" target="_blank">Watchfinder & Co. - Histoire et technique</a></li>
          <li><a href="https://www.youtube.com/@JustWatchesTV" className="text-blue-600 hover:underline" target="_blank">Just Watches - Explications détaillées</a></li>
          <li><a href="https://www.youtube.com/@TheUrbanGentry" className="text-blue-600 hover:underline" target="_blank">The Urban Gentry - Culture horlogère</a></li>
          <li><a href="https://www.youtube.com/@WristwatchRevival" className="text-blue-600 hover:underline" target="_blank">Wristwatch Revival - Restauration</a></li>
          <li><a href="https://www.youtube.com/@AFHSdotorg" className="text-blue-600 hover:underline" target="_blank">AFHS - American Federation of Horology</a></li>
          <li><a href="https://www.youtube.com/@TheWatchmakers" className="text-blue-600 hover:underline" target="_blank">The Watchmakers - Tutoriels professionnels</a></li>
        </ul>
      </section>

      {/* Quiz */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">✅ Quiz et Tests en Ligne</h2>
        <ul className="space-y-2">
          <li><a href="https://www.proprofs.com/quiz-school/topic/watches" className="text-blue-600 hover:underline" target="_blank">ProProfs - Quiz Horlogerie</a></li>
          <li><a href="https://quizlet.com/search?query=horology" className="text-blue-600 hover:underline" target="_blank">Quizlet - Flashcards Horlogerie</a></li>
          <li><a href="https://www.jetpunk.com/tags/watches" className="text-blue-600 hover:underline" target="_blank">JetPunk - Quiz Montres</a></li>
          <li><a href="https://kahoot.com/" className="text-blue-600 hover:underline" target="_blank">Kahoot! - Quiz Interactifs (chercher "watches")</a></li>
        </ul>
      </section>

      {/* Modèles 3D */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">🔧 Modèles 3D Interactifs</h2>
        <ul className="space-y-2">
          <li><a href="https://sketchfab.com/search?q=watch+movement&type=models" className="text-blue-600 hover:underline" target="_blank">Sketchfab - Mouvements de montres 3D</a></li>
          <li><a href="https://www.thingiverse.com/search?q=watch+movement" className="text-blue-600 hover:underline" target="_blank">Thingiverse - Modèles 3D à imprimer</a></li>
          <li><a href="https://animagraffs.com/" className="text-blue-600 hover:underline" target="_blank">Animagraffs - Animations techniques</a></li>
          <li><a href="https://ciechanow.ski/mechanical-watch/" className="text-blue-600 hover:underline" target="_blank">Bartosz Ciechanowski - Montre Mécanique Interactive</a></li>
        </ul>
      </section>

      {/* Dictionnaires */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">📖 Dictionnaires et Glossaires</h2>
        <ul className="space-y-2">
          <li><a href="https://www.hautehorlogerie.org/fr/encyclopedie/lexique-de-lhorlogerie/" className="text-blue-600 hover:underline" target="_blank">Lexique FHH - Fondation de la Haute Horlogerie</a></li>
          <li><a href="https://www.chrono24.com/magazine/glossary/" className="text-blue-600 hover:underline" target="_blank">Chrono24 - Glossaire Horloger</a></li>
          <li><a href="https://www.federation-horlogerie.ch/fr/glossaire" className="text-blue-600 hover:underline" target="_blank">FH - Glossaire Technique</a></li>
          <li><a href="https://monochrome-watches.com/watch-glossary/" className="text-blue-600 hover:underline" target="_blank">Monochrome - Dictionnaire Complet</a></li>
        </ul>
      </section>

      {/* Podcasts */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">🎙️ Podcasts Horlogerie</h2>
        <ul className="space-y-2">
          <li><a href="https://www.watchtime.com/podcasts/" className="text-blue-600 hover:underline" target="_blank">WatchTime Podcast</a></li>
          <li><a href="https://open.spotify.com/show/5C5cLZXqJ8YqZqZqZqZqZq" className="text-blue-600 hover:underline" target="_blank">The Grey NATO - Spotify</a></li>
          <li><a href="https://www.houdinki.com/podcasts" className="text-blue-600 hover:underline" target="_blank">Hodinkee Radio</a></li>
          <li><a href="https://podcasts.apple.com/us/podcast/talking-watches/" className="text-blue-600 hover:underline" target="_blank">Talking Watches - Apple Podcasts</a></li>
        </ul>
      </section>

      {/* Forums */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">💬 Forums et Communautés</h2>
        <ul className="space-y-2">
          <li><a href="https://www.watchuseek.com/" className="text-blue-600 hover:underline" target="_blank">WatchUSeek - Plus grand forum horloger</a></li>
          <li><a href="https://www.reddit.com/r/Watches/" className="text-blue-600 hover:underline" target="_blank">r/Watches - Communauté Reddit</a></li>
          <li><a href="https://www.reddit.com/r/Watchmaking/" className="text-blue-600 hover:underline" target="_blank">r/Watchmaking - Horlogerie pratique</a></li>
          <li><a href="https://www.timezone.com/" className="text-blue-600 hover:underline" target="_blank">TimeZone - Forum international</a></li>
          <li><a href="https://forums.watchprosite.com/" className="text-blue-600 hover:underline" target="_blank">WatchProSite Forums</a></li>
        </ul>
      </section>

      {/* Outils */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">🛠️ Outils en Ligne</h2>
        <ul className="space-y-2">
          <li><a href="https://www.watchville.com/" className="text-blue-600 hover:underline" target="_blank">Watchville - Agrégateur d'actualités</a></li>
          <li><a href="https://www.chrono24.com/" className="text-blue-600 hover:underline" target="_blank">Chrono24 - Marketplace et prix de référence</a></li>
          <li><a href="https://www.fratellowatches.com/" className="text-blue-600 hover:underline" target="_blank">Fratello Watches - Magazine en ligne</a></li>
          <li><a href="https://wristscan.com/" className="text-blue-600 hover:underline" target="_blank">WristScan - Identification de montres par photo</a></li>
        </ul>
      </section>
    </div>
  );
}
