export default function MouvementsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">Les Mouvements Horlogers</h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Découvrez les mécanismes qui animent les montres, des calibres mécaniques traditionnels aux mouvements à quartz modernes.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Introduction aux Mouvements</h2>
          <div className="prose prose-lg max-w-none text-slate-700">
            <p className="mb-4">
              Le mouvement horloger, ou calibre, est le cœur battant de toute montre. Il s'agit du mécanisme qui transforme l'énergie en un mouvement régulier des aiguilles pour indiquer l'heure avec précision.
            </p>
            <p className="mb-4">
              Il existe trois grandes catégories de mouvements : mécaniques à remontage manuel, mécaniques à remontage automatique, et à quartz. Chacun possède ses caractéristiques, avantages et applications spécifiques dans l'horlogerie moderne.
            </p>
            <p>
              La maîtrise des mouvements horlogers est essentielle pour tout horloger en formation, qu'il s'agisse de comprendre leur fonctionnement, de les entretenir ou de les réparer.
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
                <a href="https://www.hautehorlogerie.org/fr/encyclopedie/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Fondation de la Haute Horlogerie - Encyclopédie des mouvements
                </a>
              </li>
              <li>
                <a href="https://www.eta.ch/fr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  ETA SA - Calibres et mouvements standards
                </a>
              </li>
              <li>
                <a href="https://www.nihs.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  NIHS - Normes techniques horlogères suisses
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">🔗 Liens utiles</h3>
            <ul className="space-y-3 text-slate-700">
              <li>
                <a href="https://www.watchtime.ch/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  WatchTime - Actualités et technique horlogère
                </a>
              </li>
              <li>
                <a href="https://monochrome-watches.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Monochrome - Analyses détaillées de mouvements
                </a>
              </li>
              <li>
                <a href="https://www.revolution.watch/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Revolution - Magazine spécialisé en horlogerie
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
            <div className="aspect-video bg-slate-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-slate-500 text-4xl">▶️</span>
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Fonctionnement d'un mouvement mécanique</h3>
            <p className="text-slate-600 text-sm mb-4">
              Découvrez les principes fondamentaux du mouvement mécanique à remontage manuel, du barillet à l'échappement.
            </p>
            <a href="https://www.youtube.com/watch?v=508-rmdY4jQ" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
              Voir la vidéo →
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="aspect-video bg-slate-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-slate-500 text-4xl">▶️</span>
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Le remontage automatique expliqué</h3>
            <p className="text-slate-600 text-sm mb-4">
              Comprendre le système de masse oscillante et le mécanisme de remontage automatique des montres mécaniques.
            </p>
            <a href="https://www.youtube.com/watch?v=rg8Y-1lj2qo" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
              Voir la vidéo →
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="aspect-video bg-slate-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-slate-500 text-4xl">▶️</span>
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Mouvements à quartz vs mécaniques</h3>
            <p className="text-slate-600 text-sm mb-4">
              Comparaison technique et pratique entre les mouvements à quartz et les mouvements mécaniques traditionnels.
            </p>
            <a href="https://www.youtube.com/watch?v=_2By2ane2I4" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
              Voir la vidéo →
            </a>
          </div>
        </div>
      </section>

      {/* Section Aide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-blue-50">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">💬 Besoin d'aide ?</h2>
          <p className="text-slate-700 mb-6">
            Vous avez des questions sur les mouvements horlogers ? Notre communauté d'horlogers et d'experts est là pour vous aider.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-bold text-slate-900 mb-2">Forum communautaire</h3>
              <p className="text-slate-600 mb-3">Posez vos questions techniques et partagez vos expériences avec d'autres apprenants.</p>
              <a href="/communaute" className="text-blue-600 hover:underline font-medium">
                Accéder au forum →
              </a>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-bold text-slate-900 mb-2">Contact direct</h3>
              <p className="text-slate-600 mb-3">Besoin d'un conseil personnalisé ? Contactez nos formateurs horlogers professionnels.</p>
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
