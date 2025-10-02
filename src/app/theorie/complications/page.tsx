export default function ComplicationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-900 to-amber-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">Les Complications Horlogères</h1>
          <p className="text-xl text-amber-100 max-w-3xl">
            Explorez les fonctions avancées qui enrichissent les montres mécaniques : chronographe, quantième, répétition minutes, et bien plus.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Introduction aux Complications</h2>
          <div className="prose prose-lg max-w-none text-slate-700">
            <p className="mb-4">
              En horlogerie, une complication désigne toute fonction qui dépasse la simple indication des heures, minutes et secondes. Ces mécanismes supplémentaires représentent le sommet de l'art horloger et de l'ingénierie de précision.
            </p>
            <p className="mb-4">
              Des complications simples comme la date aux grandes complications telles que le tourbillon, le chronographe perpétuel ou la répétition minutes, chaque mécanisme répond à un besoin spécifique et démontre le savoir-faire du maître horloger.
            </p>
            <p>
              La compréhension et la maîtrise des complications sont essentielles pour tout horloger professionnel, car elles représentent à la fois un défi technique et une source d'inspiration constante.
            </p>
          </div>
        </div>
      </section>

      {/* Ressources pédagogiques */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-slate-50">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Ressources Pédagogiques</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">📚 Documentation technique</h3>
            <ul className="space-y-3 text-slate-700">
              <li>
                <a href="https://www.hautehorlogerie.org/fr/encyclopedie/lexique-de-lhorlogerie/s/complications-5157/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  FHH - Encyclopédie des complications
                </a>
              </li>
              <li>
                <a href="https://www.patek.com/fr/company/savoir-faire" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Patek Philippe - Savoir-faire des grandes complications
                </a>
              </li>
              <li>
                <a href="https://www.vacheron-constantin.com/fr/home.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Vacheron Constantin - Les métiers d'art
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">🔗 Liens utiles</h3>
            <ul className="space-y-3 text-slate-700">
              <li>
                <a href="https://www.hodinkee.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Hodinkee - Actualités et analyses de complications
                </a>
              </li>
              <li>
                <a href="https://www.ablogtowatch.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  aBlogtoWatch - Revues techniques approfondies
                </a>
              </li>
              <li>
                <a href="https://quilletparis.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Quillet Paris - Formation aux complications
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Tutoriels et Vidéos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Tutoriels et Vidéos</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="aspect-video bg-amber-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-amber-700 text-4xl">▶️</span>
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Le chronographe expliqué</h3>
            <p className="text-slate-600 text-sm mb-4">
              Comprendre le mécanisme du chronographe, de la colonne à roues au chronographe vertical moderne.
            </p>
            <a href="https://www.youtube.com/watch?v=qvRUm7RC_zg" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
              Voir la vidéo →
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="aspect-video bg-amber-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-amber-700 text-4xl">▶️</span>
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Le calendrier perpétuel</h3>
            <p className="text-slate-600 text-sm mb-4">
              Découverte du calendrier perpétuel, capable de gérer automatiquement les mois courts et les années bissextiles.
            </p>
            <a href="https://www.youtube.com/watch?v=vIJoZUUl4mQ" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
              Voir la vidéo →
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="aspect-video bg-amber-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-amber-700 text-4xl">▶️</span>
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Le tourbillon démystifié</h3>
            <p className="text-slate-600 text-sm mb-4">
              Analyse technique du tourbillon, invention d'Abraham-Louis Breguet pour améliorer la précision.
            </p>
            <a href="https://www.youtube.com/watch?v=nF1qISqm15s" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
              Voir la vidéo →
            </a>
          </div>
        </div>
      </section>

      {/* Section Aide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-amber-50">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">💬 Besoin d'aide ?</h2>
          <p className="text-slate-700 mb-6">
            Vous avez des questions sur les complications horlogères ? Notre communauté d'experts est là pour vous accompagner.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-amber-500 pl-4">
              <h3 className="font-bold text-slate-900 mb-2">Forum communautaire</h3>
              <p className="text-slate-600 mb-3">Discutez des complications les plus complexes avec d'autres passionnés et professionnels.</p>
              <a href="/communaute" className="text-blue-600 hover:underline font-medium">
                Accéder au forum →
              </a>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-bold text-slate-900 mb-2">Contact direct</h3>
              <p className="text-slate-600 mb-3">Besoin de conseils sur une complication spécifique ? Contactez nos experts.</p>
              <a href="mailto:contact@horlo-afp.ch" className="text-blue-600 hover:underline font-medium">
                Envoyer un email →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
