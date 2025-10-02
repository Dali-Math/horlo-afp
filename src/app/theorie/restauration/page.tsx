export default function RestaurationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section className="bg-gradient-to-r from-indigo-900 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">Restauration Horlogère</h1>
          <p className="text-xl text-indigo-100 max-w-3xl">
            Maîtrisez l'art délicat de la restauration : techniques, outils et savoir-faire pour redonner vie aux garde-temps anciens tout en préservant leur authenticité.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Introduction à la Restauration</h2>
          <div className="prose prose-lg max-w-none text-slate-700">
            <p className="mb-4">
              La restauration horlogère est un art exigeant qui requiert patience, précision et respect du patrimoine. Chaque montre ancienne raconte une histoire qu'il convient de préserver.
            </p>
            <p className="mb-4">
              Des techniques traditionnelles aux méthodes modernes, la restauration nécessite une connaissance approfondie des matériaux, des finitions et des procédés d'époque.
            </p>
            <p>
              Cette section vous guide dans l'apprentissage des fondamentaux de la restauration, du diagnostic initial à la remise en état finale.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-slate-50">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Ressources Pédagogiques</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">🔧 Techniques de restauration</h3>
            <ul className="space-y-3 text-slate-700">
              <li>
                <a className="text-blue-600 hover:underline" href="https://www.nawcc.org/" rel="noopener noreferrer" target="_blank">NAWCC - National Association of Watch and Clock Collectors</a>
              </li>
              <li>
                <a className="text-blue-600 hover:underline" href="https://www.bhi.co.uk/" rel="noopener noreferrer" target="_blank">BHI - British Horological Institute</a>
              </li>
              <li>
                <a className="text-blue-600 hover:underline" href="https://www.fhs.swiss/" rel="noopener noreferrer" target="_blank">FHS - Restauration et conservation</a>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">🔗 Liens utiles</h3>
            <ul className="space-y-3 text-slate-700">
              <li>
                <a className="text-blue-600 hover:underline" href="https://www.horlogerie-suisse.com/fr/" rel="noopener noreferrer" target="_blank">Horlogerie Suisse - Guides de restauration</a>
              </li>
              <li>
                <a className="text-blue-600 hover:underline" href="https://www.watchrepairinfo.com/" rel="noopener noreferrer" target="_blank">Watch Repair Info - Base de données</a>
              </li>
              <li>
                <a className="text-blue-600 hover:underline" href="https://www.ranfft.de/cgi-bin/bidfun-db.cgi" rel="noopener noreferrer" target="_blank">Ranfft - Calibres historiques</a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Tutoriels et Vidéos</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="aspect-video bg-indigo-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-indigo-700 text-4xl">▶️</span>
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Diagnostic d'une montre ancienne</h3>
            <p className="text-slate-600 text-sm mb-4">
              Apprenez à évaluer l'état d'une montre et identifier les interventions nécessaires.
            </p>
            <a className="text-blue-600 hover:underline text-sm" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" rel="noopener noreferrer" target="_blank">Voir la vidéo →</a>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="aspect-video bg-indigo-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-indigo-700 text-4xl">▶️</span>
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Nettoyage et polissage</h3>
            <p className="text-slate-600 text-sm mb-4">
              Techniques professionnelles de nettoyage et de restauration des finitions.
            </p>
            <a className="text-blue-600 hover:underline text-sm" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" rel="noopener noreferrer" target="_blank">Voir la vidéo →</a>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="aspect-video bg-indigo-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-indigo-700 text-4xl">▶️</span>
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Fabrication de pièces de rechange</h3>
            <p className="text-slate-600 text-sm mb-4">
              Comment recréer des composants manquants en respectant l'authenticité.
            </p>
            <a className="text-blue-600 hover:underline text-sm" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" rel="noopener noreferrer" target="_blank">Voir la vidéo →</a>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-indigo-50">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">💬 Besoin d'aide ?</h2>
          <p className="text-slate-700 mb-6">
            Questions sur la restauration de montres anciennes ? Nos experts et la communauté sont là pour vous conseiller.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-indigo-500 pl-4">
              <h3 className="font-bold text-slate-900 mb-2">Forum communautaire</h3>
              <p className="text-slate-600 mb-3">Échangez avec d'autres restaurateurs et partagez vos projets.</p>
              <a className="text-blue-600 hover:underline font-medium" href="/communaute">Accéder au forum →</a>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-bold text-slate-900 mb-2">Contact direct</h3>
              <p className="text-slate-600 mb-3">Besoin de conseils sur un projet de restauration spécifique ?</p>
              <a className="text-blue-600 hover:underline font-medium" href="mailto:contact@horlo-afp.ch">Envoyer un email →</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
