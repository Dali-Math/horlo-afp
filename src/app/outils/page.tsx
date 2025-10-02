export default function OutilsPage() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-indigo-900">Outils en ligne</h1>
        <p className="text-xl text-gray-700 mb-8">Outils numériques gratuits pour apprendre et pratiquer l'horlogerie.</p>

        {/* Simulateurs et outils 3D */}
        <section className="mb-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-6 text-indigo-800">Simulateurs et Outils 3D</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-blue-900">TinkerCAD</h3>
              <p className="text-gray-700 mb-2">Modélisation 3D gratuite pour concevoir des pièces d'horlogerie</p>
              <a href="https://www.tinkercad.com/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">→ Accéder à TinkerCAD</a>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-blue-900">Blender</h3>
              <p className="text-gray-700 mb-2">Logiciel 3D open source pour modéliser des mouvements horlogers</p>
              <a href="https://www.blender.org/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">→ Télécharger Blender</a>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-blue-900">OnShape (éducation gratuite)</h3>
              <p className="text-gray-700 mb-2">CAO en ligne pour étudiants et enseignants</p>
              <a href="https://www.onshape.com/en/education/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">→ OnShape Education</a>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-blue-900">FreeCAD</h3>
              <p className="text-gray-700 mb-2">Logiciel de CAO paramétrique open source</p>
              <a href="https://www.freecad.org/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">→ Télécharger FreeCAD</a>
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
              <a href="https://www.blocklayer.com/gear-ratioeng" className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">→ Gear Ratio Calculator</a>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-green-900">Calculateur de Fréquence de Balancier</h3>
              <p className="text-gray-700 mb-2">Calcul des alternances et de la fréquence horaire</p>
              <a href="https://www.watchuseek.com/threads/balance-wheel-frequency-calculator.4968538/" className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">→ Balance Frequency Calculator</a>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-green-900">Omni Calculator - Watch Tools</h3>
              <p className="text-gray-700 mb-2">Collection de calculateurs pour l'horlogerie</p>
              <a href="https://www.omnicalculator.com/" className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">→ Omni Calculator</a>
            </div>
          </div>
        </section>

        {/* Outils de diagnostic */}
        <section className="mb-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-6 text-indigo-800">Outils de Diagnostic</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-900">WatchTracker (app mobile)</h3>
              <p className="text-gray-700 mb-2">Application pour mesurer la précision de votre montre</p>
              <a href="https://www.youtube.com/watch?v=o_MdpRRWB0k" className="text-purple-600 hover:underline" target="_blank" rel="noopener noreferrer">→ Tutoriel WatchTracker</a>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-900">Kello App</h3>
              <p className="text-gray-700 mb-2">Application gratuite pour tester la précision des montres mécaniques</p>
              <a href="https://kello.app/" className="text-purple-600 hover:underline" target="_blank" rel="noopener noreferrer">→ Kello App</a>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-900">Toolwatch</h3>
              <p className="text-gray-700 mb-2">Mesure de précision de montre en ligne</p>
              <a href="https://www.toolwatch.io/" className="text-purple-600 hover:underline" target="_blank" rel="noopener noreferrer">→ Toolwatch</a>
            </div>
          </div>
        </section>

        {/* Applications mobiles gratuites */}
        <section className="mb-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-6 text-indigo-800">Applications Mobiles Gratuites</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-amber-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-amber-900">Watch Tuner</h3>
              <p className="text-gray-700 mb-2">Application Android/iOS pour régler les montres mécaniques</p>
              <a href="https://play.google.com/store/apps/details?id=com.kaibader.tuner" className="text-amber-600 hover:underline" target="_blank" rel="noopener noreferrer">→ Watch Tuner Android</a>
            </div>

            <div className="p-4 bg-amber-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-amber-900">Horology Toolbox</h3>
              <p className="text-gray-700 mb-2">Boîte à outils complète pour horlogers</p>
              <a href="https://apps.apple.com/app/horology-toolbox/id1543689712" className="text-amber-600 hover:underline" target="_blank" rel="noopener noreferrer">→ Horology Toolbox iOS</a>
            </div>
          </div>
        </section>

        {/* Ressources techniques en ligne */}
        <section className="mb-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-6 text-indigo-800">Ressources Techniques en Ligne</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-indigo-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-indigo-900">Ranfft's Watch Database</h3>
              <p className="text-gray-700 mb-2">Base de données complète de calibres horlogers</p>
              <a href="http://www.ranfft.de/cgi-bin/bidfun-db.cgi?10&ranfft&&2uswk" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">→ Ranfft Database</a>
            </div>

            <div className="p-4 bg-indigo-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-indigo-900">Mikrolisk - Movement Database</h3>
              <p className="text-gray-700 mb-2">Catalogue de mouvements horlogers avec spécifications</p>
              <a href="http://www.mikrolisk.de/" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">→ Mikrolisk</a>
            </div>

            <div className="p-4 bg-indigo-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-indigo-900">Watch Wiki</h3>
              <p className="text-gray-700 mb-2">Encyclopédie horlogère collaborative</p>
              <a href="https://www.watch-wiki.org/" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">→ Watch Wiki</a>
            </div>

            <div className="p-4 bg-indigo-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-indigo-900">Horological Meantime</h3>
              <p className="text-gray-700 mb-2">Convertisseur d'alternances et fréquences</p>
              <a href="https://www.horlogicalmeantime.com/" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">→ Horological Meantime</a>
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
              <a href="https://inkscape.org/" className="text-cyan-600 hover:underline" target="_blank" rel="noopener noreferrer">→ Télécharger Inkscape</a>
            </div>

            <div className="p-4 bg-cyan-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-cyan-900">QCAD Community Edition</h3>
              <p className="text-gray-700 mb-2">Logiciel de CAO 2D open source</p>
              <a href="https://www.qcad.org/" className="text-cyan-600 hover:underline" target="_blank" rel="noopener noreferrer">→ QCAD</a>
            </div>

            <div className="p-4 bg-cyan-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-cyan-900">LibreCAD</h3>
              <p className="text-gray-700 mb-2">Application CAO 2D gratuite et open source</p>
              <a href="https://librecad.org/" className="text-cyan-600 hover:underline" target="_blank" rel="noopener noreferrer">→ LibreCAD</a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
