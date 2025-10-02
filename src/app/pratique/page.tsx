export default function Pratique() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Pratique Horlogère</h1>
      <p className="text-lg mb-8">Ressources pour l'apprentissage pratique et les compétences techniques</p>

      {/* Tutoriels Vidéo */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">🎬 Tutoriels Vidéo Pratiques</h2>
        <ul className="space-y-2">
          <li><a href="https://www.youtube.com/@WristwatchRevival" className="text-blue-600 hover:underline" target="_blank">Wristwatch Revival - Restaurations complètes</a></li>
          <li><a href="https://www.youtube.com/@nekkidwatchmaker" className="text-blue-600 hover:underline" target="_blank">Nekkid Watchmaker - Techniques détaillées</a></li>
          <li><a href="https://www.youtube.com/@marshallwatchco" className="text-blue-600 hover:underline" target="_blank">Marshall Watch Co. - Réparations</a></li>
          <li><a href="https://www.youtube.com/@ArthursCraftyLab" className="text-blue-600 hover:underline" target="_blank">Arthur's Crafty Lab - Modifications</a></li>
          <li><a href="https://www.youtube.com/@HayesHorology" className="text-blue-600 hover:underline" target="_blank">Hayes Horology - Cours pratiques</a></li>
        </ul>
      </section>

      {/* Guides PDF */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">📋 Guides Pratiques PDF</h2>
        <ul className="space-y-2">
          <li><a href="https://www.cousinsuk.com/pages/technical-guides" className="text-blue-600 hover:underline" target="_blank">Cousins UK - Guides techniques</a></li>
          <li><a href="https://www.esslinger.com/watch-school/" className="text-blue-600 hover:underline" target="_blank">Esslinger Watch School</a></li>
          <li><a href="https://watchmaking.weebly.com/" className="text-blue-600 hover:underline" target="_blank">Watchmaking Weebly - Ressources</a></li>
          <li><a href="https://www.ofrei.com/page_288.html" className="text-blue-600 hover:underline" target="_blank">Ofrei - Manuels de réparation</a></li>
        </ul>
      </section>

      {/* Outils et Équipement */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">🔨 Guides des Outils</h2>
        <ul className="space-y-2">
          <li><a href="https://www.esslinger.com/watch-repair-tools/" className="text-blue-600 hover:underline" target="_blank">Esslinger - Catalogue d'outils</a></li>
          <li><a href="https://www.cousinsuk.com/category/watch-tools" className="text-blue-600 hover:underline" target="_blank">Cousins UK - Outils horlogers</a></li>
          <li><a href="https://www.bergeon.swiss/en/" className="text-blue-600 hover:underline" target="_blank">Bergeon - Outils professionnels</a></li>
          <li><a href="https://www.horotec.ch/" className="text-blue-600 hover:underline" target="_blank">Horotec - Équipement technique</a></li>
        </ul>
      </section>

      {/* Projets Pratiques */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">🛠️ Projets et Exercices</h2>
        <ul className="space-y-2">
          <li><a href="https://www.reddit.com/r/Watchmaking/wiki/index/" className="text-blue-600 hover:underline" target="_blank">r/Watchmaking Wiki - Guide débutant</a></li>
          <li><a href="https://www.watchrepairtalk.com/" className="text-blue-600 hover:underline" target="_blank">Watch Repair Talk - Forum technique</a></li>
          <li><a href="https://www.nawcc.org/index.php/education/school-of-horology" className="text-blue-600 hover:underline" target="_blank">NAWCC School of Horology</a></li>
        </ul>
      </section>

      {/* Fournisseurs de Pièces */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">⚙️ Fournisseurs de Pièces</h2>
        <ul className="space-y-2">
          <li><a href="https://www.cousinsuk.com/" className="text-blue-600 hover:underline" target="_blank">Cousins UK - Pièces détachées</a></li>
          <li><a href="https://www.esslinger.com/" className="text-blue-600 hover:underline" target="_blank">Esslinger - Fournitures horlogères</a></li>
          <li><a href="https://www.ofrei.com/" className="text-blue-600 hover:underline" target="_blank">Ofrei - Pièces de montres</a></li>
          <li><a href="https://www.julesborel.com/" className="text-blue-600 hover:underline" target="_blank">Jules Borel - Matériel horloger</a></li>
          <li><a href="https://www.ranfft.de/cgi-bin/bidfun-db.cgi" className="text-blue-600 hover:underline" target="_blank">Ranfft - Base de données mouvements</a></li>
        </ul>
      </section>

      {/* Diagrammes et Schémas */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">📐 Diagrammes Techniques</h2>
        <ul className="space-y-2">
          <li><a href="https://www.eta.ch/en/our-products" className="text-blue-600 hover:underline" target="_blank">ETA - Fiches techniques mouvements</a></li>
          <li><a href="https://www.miyotamovement.com/" className="text-blue-600 hover:underline" target="_blank">Miyota - Documentation technique</a></li>
          <li><a href="https://www.sellita.ch/en/" className="text-blue-600 hover:underline" target="_blank">Sellita - Spécifications mouvements</a></li>
        </ul>
      </section>
    </div>
  );
}
