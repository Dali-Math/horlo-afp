export default function HistoirePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section className="bg-gradient-to-r from-indigo-900 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">Histoire de l'Horlogerie</h1>
          <p className="text-xl text-indigo-100 max-w-3xl">
            Voyagez à travers les siècles et découvrez l'évolution fascinante de l'art horloger, des cadrans solaires aux montres connectées.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Introduction à l'Histoire</h2>
          <div className="prose prose-lg max-w-none text-slate-700">
            <p className="mb-4">
              L'histoire de l'horlogerie est une épopée humaine extraordinaire, marquée par des innovations techniques et artistiques qui ont révolutionné notre rapport au temps.
            </p>
            <p className="mb-4">
              Des premières horloges mécaniques du XIVe siècle aux montres de précision suisses, chaque époque a apporté son lot d'inventions et de perfectionnements.
            </p>
            <p>
              Comprendre cette histoire permet de mieux apprécier le savoir-faire actuel et de s'inspirer des grands maîtres horlogers du passé.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-slate-50">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Ressources Pédagogiques</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">📚 Documentation historique</h3>
            <ul className="space-y-3 text-slate-700">
              <li><a href="https://www.musee-suisse.ch/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Musée International d'Horlogerie</a></li>
              <li><a href="https://www.fhs.swiss/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Fédération Horlogère Suisse - Archives</a></li>
              <li><a href="https://www.worldtempus.com/fr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">WorldTempus - Histoire et patrimoine</a></li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">🔗 Liens utiles</h3>
            <ul className="space-y-3 text-slate-700">
              <li><a href="https://www.histoire-horlogerie.ch/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Histoire de l'horlogerie suisse</a></li>
              <li><a href="https://www.mih.ch/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">MIH La Chaux-de-Fonds</a></li>
              <li><a href="https://www.fhs.swiss/fr/histoire.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">FHS - Chronologie historique</a></li>
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
            <h3 className="font-bold text-slate-900 mb-2">L'horlogerie au Moyen Âge</h3>
            <p className="text-slate-600 text-sm mb-4">
              Découverte des premières horloges mécaniques et leur impact sur la société médiévale.
            </p>
            <a href="https://www.youtube.com/watch?v=EULs6HKMVPM" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">Voir la vidéo →</a>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="aspect-video bg-indigo-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-indigo-700 text-4xl">▶️</span>
            </div>
            <h3 className="font-bold text-slate-900 mb-2">L'âge d'or de l'horlogerie suisse</h3>
            <p className="text-slate-600 text-sm mb-4">
              Comment la Suisse est devenue la capitale mondiale de l'horlogerie de luxe.
            </p>
            <a href="https://www.youtube.com/watch?v=V6E5lk7i9Bg" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">Voir la vidéo →</a>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="aspect-video bg-indigo-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-indigo-700 text-4xl">▶️</span>
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Les grands horlogers de l'histoire</h3>
            <p className="text-slate-600 text-sm mb-4">
              Portraits des maîtres horlogers qui ont révolutionné l'art du temps.
            </p>
            <a href="https://www.youtube.com/watch?v=6t3pDZhAYqE" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">Voir la vidéo →</a>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-indigo-50">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">💬 Besoin d'aide ?</h2>
          <p className="text-slate-700 mb-6">
            Questions sur l'histoire de l'horlogerie ? Notre communauté d'experts et de passionnés est là pour vous.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-indigo-500 pl-4">
              <h3 className="font-bold text-slate-900 mb-2">Forum communautaire</h3>
              <p className="text-slate-600 mb-3">Partagez votre passion pour l'histoire horlogère avec d'autres enthousiastes.</p>
              <a href="/communaute" className="text-blue-600 hover:underline font-medium">Accéder au forum →</a>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-bold text-slate-900 mb-2">Contact direct</h3>
              <p className="text-slate-600 mb-3">Besoin d'informations spécifiques ? Contactez nos historiens horlogers.</p>
              <a href="mailto:contact@horlo-afp.ch" className="text-blue-600 hover:underline font-medium">Envoyer un email →</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
