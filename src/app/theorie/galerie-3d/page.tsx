export default function Galerie3DPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section className="bg-gradient-to-r from-indigo-900 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">Galerie 3D</h1>
          <p className="text-xl text-indigo-100 max-w-3xl">
            Explorez l'horlogerie en trois dimensions : visualisez, décortiquez et comprenez les mécanismes horlogers grâce à des modèles 3D interactifs et immersifs.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Introduction à la Galerie 3D</h2>
          <div className="prose prose-lg max-w-none text-slate-700">
            <p className="mb-4">
              La visualisation 3D révolutionne l'apprentissage de l'horlogerie en permettant d'observer les mécanismes sous tous les angles et de comprendre leur fonctionnement de manière intuitive.
            </p>
            <p className="mb-4">
              Notre galerie propose des modèles interactifs de mouvements, complications et composants horlogers, accessibles à tous les niveaux d'expertise.
            </p>
            <p>
              Que vous soyez débutant ou horloger confirmé, ces outils visuels enrichiront votre compréhension des subtilités mécaniques.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-slate-50">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Ressources Pédagogiques</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">📐 Modèles 3D interactifs</h3>
            <ul className="space-y-3 text-slate-700">
              <li>
                <a className="text-blue-600 hover:underline" href="https://sketchfab.com/search?q=watch+movement&type=models" rel="noopener noreferrer" target="_blank">Sketchfab - Mouvements horlogers 3D</a>
              </li>
              <li>
                <a className="text-blue-600 hover:underline" href="https://www.thingiverse.com/search?q=watch+mechanism" rel="noopener noreferrer" target="_blank">Thingiverse - Mécanismes horlogers</a>
              </li>
              <li>
                <a className="text-blue-600 hover:underline" href="https://grabcad.com/library?softwares=step-slash-iges&query=watch" rel="noopener noreferrer" target="_blank">GrabCAD - Bibliothèque CAO horlogère</a>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">🔗 Liens utiles</h3>
            <ul className="space-y-3 text-slate-700">
              <li>
                <a className="text-blue-600 hover:underline" href="https://www.youtube.com/results?search_query=3d+watch+movement+animation" rel="noopener noreferrer" target="_blank">Animations 3D de mouvements</a>
              </li>
              <li>
                <a className="text-blue-600 hover:underline" href="https://www.cgtrader.com/3d-models/industrial/machine/watch" rel="noopener noreferrer" target="_blank">CGTrader - Modèles horlogers premium</a>
              </li>
              <li>
                <a className="text-blue-600 hover:underline" href="https://www.turbosquid.com/Search/3D-Models/watch-mechanism" rel="noopener noreferrer" target="_blank">TurboSquid - Mécanismes détaillés</a>
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
            <h3 className="font-bold text-slate-900 mb-2">Modéliser un mouvement en 3D</h3>
            <p className="text-slate-600 text-sm mb-4">
              Apprenez les bases de la modélisation 3D appliquée aux mécanismes horlogers.
            </p>
            <a className="text-blue-600 hover:underline text-sm" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" rel="noopener noreferrer" target="_blank">Voir la vidéo →</a>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="aspect-video bg-indigo-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-indigo-700 text-4xl">▶️</span>
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Visualisation interactive avec Blender</h3>
            <p className="text-slate-600 text-sm mb-4">
              Créez des animations de mouvements horlogers avec Blender.
            </p>
            <a className="text-blue-600 hover:underline text-sm" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" rel="noopener noreferrer" target="_blank">Voir la vidéo →</a>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="aspect-video bg-indigo-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-indigo-700 text-4xl">▶️</span>
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Impression 3D de composants horlogers</h3>
            <p className="text-slate-600 text-sm mb-4">
              De la conception 3D à l'impression : réalisez vos propres pièces.
            </p>
            <a className="text-blue-600 hover:underline text-sm" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" rel="noopener noreferrer" target="_blank">Voir la vidéo →</a>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-indigo-50">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">💬 Besoin d'aide ?</h2>
          <p className="text-slate-700 mb-6">
            Questions sur la modélisation 3D ou la visualisation de mécanismes ? Notre communauté est là pour vous guider.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-indigo-500 pl-4">
              <h3 className="font-bold text-slate-900 mb-2">Forum communautaire</h3>
              <p className="text-slate-600 mb-3">Partagez vos créations 3D et découvrez celles des autres membres.</p>
              <a className="text-blue-600 hover:underline font-medium" href="/communaute">Accéder au forum →</a>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-bold text-slate-900 mb-2">Contact direct</h3>
              <p className="text-slate-600 mb-3">Besoin de conseils techniques sur la modélisation ? Contactez nos experts.</p>
              <a className="text-blue-600 hover:underline font-medium" href="mailto:contact@horlo-afp.ch">Envoyer un email →</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
