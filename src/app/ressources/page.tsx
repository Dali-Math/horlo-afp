export default function RessourcesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">📚 Ressources</h1>
        <p className="text-lg text-gray-700 mb-8">
          Documentation, PDFs, dictionnaires techniques et glossaires pour enrichir vos connaissances en horlogerie.
        </p>

        {/* PDFs et Documentation */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">📄 PDFs et Documentation Technique</h2>

          {/* Carte Planning Formation HORL1S925 */}
          <div className="border rounded-lg p-6 hover:shadow-lg transition bg-white mb-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-100 rounded-lg">
                <svg className="w-6 h-6 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Planning Formation HORL1S925</h3>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p>Planning provisoire - Module de Base (Septembre 2025 - Mai 2026)</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Pratique: 205 périodes (Patrick Rouge)</li>
                    <li>Théorie: 70 périodes (Vincent Guilliou)</li>
                    <li>Micromécanique A/B: 110 périodes</li>
                    <li>Mathématiques: 50 périodes (Mlanie Achram)</li>
                    <li>Dessin technique: 35 périodes (Pascal Wyss)</li>
                    <li>+ Tech Micro & Matériaux</li>
                  </ul>
                  <p className="font-medium text-amber-700">Total: 451 périodes</p>
                </div>
                <a href="/pdfs/250919_HORL1_S925.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium text-sm">
                  Consulter le planning complet →
                </a>
              </div>
            </div>
          </div>

          {/* Liens externes existants */}
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg">Bibliothèque Numérique FHH</h3>
              <p className="text-gray-600">Archives historiques et documentation technique de la Fondation de la Haute Horlogerie</p>
              <a className="text-blue-600 hover:underline" href="https://www.hautehorlogerie.org/" rel="noopener noreferrer" target="_blank">www.hautehorlogerie.org</a>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg">Archive.org - Livres d'horlogerie</h3>
              <p className="text-gray-600">Livres anciens et manuels d'horlogerie numérisés, téléchargeables gratuitement</p>
              <a className="text-blue-600 hover:underline" href="https://archive.org/search.php?query=watchmaking+horology" rel="noopener noreferrer" target="_blank">archive.org/horlogerie</a>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg">WOSTEP - Documentation Technique</h3>
              <p className="text-gray-600">Ressources techniques de la Watchmakers of Switzerland Training and Educational Program</p>
              <a className="text-blue-600 hover:underline" href="https://wostep.ch/" rel="noopener noreferrer" target="_blank">wostep.ch</a>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg">TimeZone Technical Documentation</h3>
              <p className="text-gray-600">Articles techniques détaillés et guides PDF sur les mouvements et complications</p>
              <a className="text-blue-600 hover:underline" href="https://www.timezone.com/" rel="noopener noreferrer" target="_blank">timezone.com</a>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg">Ranfft Watch Movement Database</h3>
              <p className="text-gray-600">Base de données technique complète avec fiches détaillées et schémas de mouvements</p>
              <a className="text-blue-600 hover:underline" href="http://www.ranfft.de/cgi-bin/bidfun-db.cgi?10&amp;ranfft&amp;&amp;2uswk" rel="noopener noreferrer" target="_blank">ranfft.de</a>
            </div>
          </div>
        </section>

        {/* Dictionnaires et Glossaires */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">📖 Dictionnaires et Glossaires</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-lg">Glossaire FH (Fédération Horlogère)</h3>
              <p className="text-gray-600">Terminologie officielle de l'horlogerie suisse (français, anglais, allemand)</p>
              <a className="text-blue-600 hover:underline" href="https://www.fhs.swiss/" rel="noopener noreferrer" target="_blank">fhs.swiss</a>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-lg">Dictionnaire Technique Omega</h3>
              <p className="text-gray-600">Lexique technique complet des termes horlogers</p>
              <a className="text-blue-600 hover:underline" href="https://www.omegawatches.com/" rel="noopener noreferrer" target="_blank">omegawatches.com</a>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-lg">Watch-Wiki</h3>
              <p className="text-gray-600">Encyclopédie collaborative en ligne sur l'horlogerie (multilingue)</p>
              <a className="text-blue-600 hover:underline" href="https://watch-wiki.org/" rel="noopener noreferrer" target="_blank">watch-wiki.org</a>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-lg">Glossaire Technique NAWCC</h3>
              <p className="text-gray-600">National Association of Watch and Clock Collectors - Terminologie anglaise</p>
              <a className="text-blue-600 hover:underline" href="https://nawcc.org/" rel="noopener noreferrer" target="_blank">nawcc.org</a>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-lg">Lexique Pratique d'Horlogerie</h3>
              <p className="text-gray-600">Termes techniques expliqués simplement pour apprentis</p>
              <a className="text-blue-600 hover:underline" href="https://www.hautehorlogerie.org/en/encyclopaedia/lexicon-glossary/" rel="noopener noreferrer" target="_blank">FHH Lexique</a>
            </div>
          </div>
        </section>

        {/* Normes et Standards */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">📐 Normes et Standards</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-lg">Normes NIHS (Normes de l'Industrie Horlogère Suisse)</h3>
              <p className="text-gray-600">Standards techniques officiels de l'horlogerie suisse</p>
              <a className="text-blue-600 hover:underline" href="https://www.nihs.ch/" rel="noopener noreferrer" target="_blank">nihs.ch</a>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-lg">ISO Standards for Horology</h3>
              <p className="text-gray-600">Normes internationales ISO applicables à l'horlogerie</p>
              <a className="text-blue-600 hover:underline" href="https://www.iso.org/" rel="noopener noreferrer" target="_blank">iso.org</a>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-lg">COSC - Documentation Technique</h3>
              <p className="text-gray-600">Contrôle Officiel Suisse des Chronomètres - Critères et normes</p>
              <a className="text-blue-600 hover:underline" href="https://www.cosc.swiss/" rel="noopener noreferrer" target="_blank">cosc.swiss</a>
            </div>
          </div>
        </section>

        {/* Catalogues de Pièces */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🔧 Catalogues de Pièces Détachées</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-semibold text-lg">Cousins UK Parts Catalog</h3>
              <p className="text-gray-600">Catalogue complet de pièces détachées avec références techniques</p>
              <a className="text-blue-600 hover:underline" href="https://www.cousinsuk.com/" rel="noopener noreferrer" target="_blank">cousinsuk.com</a>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-semibold text-lg">Boley Parts Database</h3>
              <p className="text-gray-600">Base de données de pièces détachées et documentation technique</p>
              <a className="text-blue-600 hover:underline" href="https://www.boley.de/" rel="noopener noreferrer" target="_blank">boley.de</a>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-semibold text-lg">Technical Parts Catalogs - ETA</h3>
              <p className="text-gray-600">Catalogues techniques ETA avec nomenclature complète</p>
              <a className="text-blue-600 hover:underline" href="https://www.eta.ch/" rel="noopener noreferrer" target="_blank">eta.ch</a>
            </div>
          </div>
        </section>

        {/* Manuels de Formation */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">📕 Manuels de Formation</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-semibold text-lg">Théorie d'Horlogerie - CPIH</h3>
              <p className="text-gray-600">Manuel de référence du Centre de Formation Professionnelle en Horlogerie</p>
              <a className="text-blue-600 hover:underline" href="https://www.cpih.ch/" rel="noopener noreferrer" target="_blank">cpih.ch</a>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-semibold text-lg">George Daniels - Watchmaking</h3>
              <p className="text-gray-600">Le manuel de référence absolu en horlogerie (consulter les bibliothèques)</p>
              <a className="text-blue-600 hover:underline" href="https://www.georgedaniels.co.uk/" rel="noopener noreferrer" target="_blank">georgedaniels.co.uk</a>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-semibold text-lg">BHI Training Manuals</h3>
              <p className="text-gray-600">British Horological Institute - Manuels de formation certifiés</p>
              <a className="text-blue-600 hover:underline" href="https://bhi.co.uk/" rel="noopener noreferrer" target="_blank">bhi.co.uk</a>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-semibold text-lg">Practical Watch Repairing - Donald de Carle</h3>
              <p className="text-gray-600">Classique incontournable pour apprentis horlogers (disponible en PDF)</p>
              <a className="text-blue-600 hover:underline" href="https://archive.org/details/practicalwatchre00deca" rel="noopener noreferrer" target="_blank">archive.org/practicalwatch</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
