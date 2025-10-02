export default function OutilsPage() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-indigo-900">Outils en ligne</h1>
        <p className="text-xl text-gray-700 mb-8">Outils numériques gratuits pour apprendre et pratiquer l'horlogerie.</p>

        {/* Section Suisse/Francophone prioritaire */}
        <section className="mb-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-6 text-indigo-800">Ressources suisses et francophones</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-emerald-50 rounded-lg flex gap-3">
              <span aria-hidden className="text-emerald-700 text-2xl">🩺</span>
              <div>
                <h3 className="text-xl font-semibold mb-1 text-emerald-900">Base Chronos — Clinique Horlogère</h3>
                <p className="text-gray-700 mb-2">Base de connaissances technique (pannes, diagnostics, procédures) orientée pratique atelier.</p>
                <a className="text-emerald-700 hover:underline" href="https://www.cliniquehorlogere.ch/fr/base-chronos.html" target="_blank" rel="noopener noreferrer">→ Base Chronos (cliniquehorlogere.ch)</a>
              </div>
            </div>
            <div className="p-4 bg-sky-50 rounded-lg flex gap-3">
              <span aria-hidden className="text-sky-700 text-2xl">📚</span>
              <div>
                <h3 className="text-xl font-semibold mb-1 text-sky-900">Banque de données de chronométrie — SSC</h3>
                <p className="text-gray-700 mb-2">Références scientifiques et publications de la Société Suisse de Chronométrie.</p>
                <a className="text-sky-700 hover:underline" href="https://www.ssc.ch/publications/banque-de-donnees-chronometrie" target="_blank" rel="noopener noreferrer">→ SSC – Banque de données</a>
              </div>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg flex gap-3 md:col-span-2">
              <span aria-hidden className="text-indigo-700 text-2xl">🗞️</span>
              <div>
                <h3 className="text-xl font-semibold mb-1 text-indigo-900">Horlogerie-Suisse</h3>
                <p className="text-gray-700 mb-2">Portail francophone: revues, dossiers techniques, annonces et forums de discussion.</p>
                <a className="text-indigo-700 hover:underline" href="https://horlogerie-suisse.com" target="_blank" rel="noopener noreferrer">→ horlogerie-suisse.com</a>
              </div>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg flex gap-3 md:col-span-2">
              <span aria-hidden className="text-amber-700 text-2xl">🏷️</span>
              <div>
                <h3 className="text-xl font-semibold mb-1 text-amber-900">Liste des marques et mouvements</h3>
                <p className="text-gray-700 mb-2">Répertoire francophone des marques, manufactures et calibres associés.</p>
                <a className="text-amber-700 hover:underline" href="https://www.suissemontre.com/marques_et_manufactures/liste_marques.php" target="_blank" rel="noopener noreferrer">→ suissmontre.com – Marques & mouvements</a>
              </div>
            </div>
          </div>
        </section>

        {/* Simulateurs et outils 3D */}
        <section className="mb-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-6 text-indigo-800">Simulateurs et Outils 3D</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-blue-900">TinkerCAD</h3>
              <p className="text-gray-700 mb-2">Modélisation 3D gratuite pour concevoir des pièces d'horlogerie</p>
              <a className="text-blue-600 hover:underline" href="https://www.tinkercad.com/" rel="noopener noreferrer" target="_blank">→ Accéder à TinkerCAD</a>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-blue-900">Blender</h3>
              <p className="text-gray-700 mb-2">Logiciel 3D open source pour modéliser des mouvements horlogers</p>
              <a className="text-blue-600 hover:underline" href="https://www.blender.org/" rel="noopener noreferrer" target="_blank">→ Télécharger Blender</a>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-blue-900">OnShape (éducation gratuite)</h3>
              <p className="text-gray-700 mb-2">CAO en ligne pour étudiants et enseignants</p>
              <a className="text-blue-600 hover:underline" href="https://www.onshape.com/en/education/" rel="noopener noreferrer" target="_blank">→ OnShape Education</a>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-blue-900">FreeCAD</h3>
              <p className="text-gray-700 mb-2">Logiciel de CAO paramétrique open source</p>
              <a className="text-blue-600 hover:underline" href="https://www.freecad.org/" rel="noopener noreferrer" target="_blank">→ Télécharger FreeCAD</a>
            </div>
          </div>
        </section>

        {/* Calculateurs horlogers */}
        <section className="mb-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-6 text-indigo-800">Calculateurs Horlogers</h2>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-green-900">Calculateur de Train d'Engrenages</h3>
              <p className="text-gray-700 mb-2">Calcul des rapports de transmission et des nombres de dents</p>
              <a className="text-green-600 hover:underline" href="https://www.blocklayer.com/gear-ratioeng" rel="noopener noreferrer" target="_blank">→ Gear Ratio Calculator</a>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-green-900">Calculateur de Fréquence de Balancier</h3>
              <p className="text-gray-700 mb-2">Calcul des alternances et de la fréquence horaire</p>
              <a className="text-green-600 hover:underline" href="https://www.watchuseek.com/threads/balance-wheel-frequency-calculator.4968538/" rel="noopener noreferrer" target="_blank">→ Balance Frequency Calculator</a>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-green-900">Omni Calculator - Watch Tools</h3>
              <p className="text-gray-700 mb-2">Collection de calculateurs pour l'horlogerie</p>
              <a className="text-green-600 hover:underline" href="https://www.omnicalculator.com/" rel="noopener noreferrer" target="_blank">→ Omni Calculator</a>
            </div>
          </div>
        </section>

        {/* Outils de Diagnostic */}
        <section className="mb-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-6 text-indigo-800">Outils de Diagnostic</h2>
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-900">WatchTracker (app mobile)</h3>
              <p className="text-gray-700 mb-2">Application pour mesurer la précision de votre montre</p>
              <a className="text-purple-600 hover:underline" href="https://www.youtube.com/watch?v=o_MdpRRWB0k" rel="noopener noreferrer" target="_blank">→ Tutoriel WatchTracker</a>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-900">Kello App</h3>
              <p className="text-gray-700 mb-2">Application gratuite pour tester la précision des montres mécaniques</p>
              <a className="text-purple-600 hover:underline" href="https://kello.app/" rel="noopener noreferrer" target="_blank">→ Kello App</a>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-900">Toolwatch</h3>
              <p className="text-gray-700 mb-2">Mesure de précision de montre en ligne</p>
              <a className="text-purple-600 hover:underline" href="https://www.toolwatch.io/" rel="noopener noreferrer" target="_blank">→ Toolwatch</a>
            </div>
          </div>
        </section>

        {/* Ressources techniques en ligne */}
        <section className="mb-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-6 text-indigo-800">Ressources Techniques en Ligne</h2>
          <div className="space-y-4">
            <div className="p-4 bg-indigo-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-indigo-900">Animations interactives de physique et d’électricité (Université de Nantes)</h3>
              <p className="text-gray-700 mb-2">Modules interactifs: oscilloscope, circuits, ondes, lentilles, thermodynamiques…</p>
              <a className="text-indigo-600 hover:underline" href="https://phyanim.sciences.univ-nantes.fr/" rel="noopener noreferrer" target="_blank">→ Accéder aux animations de l'Université de Nantes</a>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-indigo-900">Ranfft's Watch Database</h3>
              <p className="text-gray-700 mb-2">Base de données complète de calibres horlogers</p>
              <a className="text-indigo-600 hover:underline" href="http://www.ranfft.de/cgi-bin/bidfun-db.cgi?10&ranfft&&2uswk" rel="noopener noreferrer" target="_blank">→ Ranfft Database</a>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-indigo-900">Mikrolisk - Movement Database</h3>
              <p className="text-gray-700 mb-2">Catalogue de mouvements horlogers avec spécifications</p>
              <a className="text-indigo-600 hover:underline" href="http://www.mikrolisk.de/" rel="noopener noreferrer" target="_blank">→ Mikrolisk</a>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-indigo-900">Watch Wiki</h3>
              <p className="text-gray-700 mb-2">Encyclopédie horlogère collaborative</p>
              <a className="text-indigo-600 hover:underline" href="https://www.watch-wiki.org/" rel="noopener noreferrer" target="_blank">→ Watch Wiki</a>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-indigo-900">Horological Meantime</h3>
              <p className="text-gray-700 mb-2">Convertisseur d'alternances et fréquences</p>
              <a className="text-indigo-600 hover:underline" href="https://www.horlogicalmeantime.com/" rel="noopener noreferrer" target="_blank">→ Horological Meantime</a>
            </div>
          </div>
        </section>

        {/* Outils de dessin technique */}
        <section className="mb-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-6 text-indigo-800">Outils de Dessin Technique</h2>
          <div className="space-y-4">
            <div className="p-4 bg-cyan-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-cyan-900">Inkscape</h3>
              <p className="text-gray-700 mb-2">Logiciel de dessin vectoriel gratuit pour plans techniques</p>
              <a className="text-cyan-600 hover:underline" href="https://inkscape.org/" rel="noopener noreferrer" target="_blank">→ Télécharger Inkscape</a>
            </div>
            <div className="p-4 bg-cyan-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-cyan-900">QCAD Community Edition</h3>
              <p className="text-gray-700 mb-2">Logiciel de CAO 2D open source</p>
              <a className="text-cyan-600 hover:underline" href="https://www.qcad.org/" rel="noopener noreferrer" target="_blank">→ QCAD</a>
            </div>
            <div className="p-4 bg-cyan-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-cyan-900">LibreCAD</h3>
              <p className="text-gray-700 mb-2">Application CAO 2D gratuite et open source</p>
              <a className="text-cyan-600 hover:underline" href="https://librecad.org/" rel="noopener noreferrer" target="_blank">→ LibreCAD</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
