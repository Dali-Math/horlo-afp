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
          {/* Liens externes */}
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg">Bibliothèque Numérique FHH</h3>
              <p className="text-gray-600">Archives historiques et documentation technique de la Fondation de la Haute Horlogerie</p>
              <a className="text-blue-600 hover:underline" href="https://www.hautehorlogerie.org/" target="_blank" rel="noopener noreferrer">www.hautehorlogerie.org</a>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg">Archive.org - Livres d'horlogerie</h3>
              <p className="text-gray-600">Livres anciens et manuels d'horlogerie numérisés, téléchargeables gratuitement</p>
              <a className="text-blue-600 hover:underline" href="https://archive.org/search.php?query=horlogerie" target="_blank" rel="noopener noreferrer">archive.org/horlogerie</a>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg">WOSTEP - Documentation Technique</h3>
              <p className="text-gray-600">Ressources techniques de la Watchmakers of Switzerland Training and Educational Program</p>
              <a className="text-blue-600 hover:underline" href="https://wostep.ch/" target="_blank" rel="noopener noreferrer">wostep.ch</a>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg">TimeZone Technical Documentation</h3>
              <p className="text-gray-600">Articles techniques détaillés et guides PDF sur les mouvements et complications</p>
              <a className="text-blue-600 hover:underline" href="https://www.timezone.com/" target="_blank" rel="noopener noreferrer">timezone.com</a>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg">Ranfft Watch Movement Database</h3>
              <p className="text-gray-600">Base de données technique complète avec fiches détaillées et schémas de mouvements</p>
              <a className="text-blue-600 hover:underline" href="http://www.ranfft.de/cgi-bin/bidfun-db.cgi?10=" target="_blank" rel="noopener noreferrer">ranfft.de</a>
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
              <a className="text-blue-600 hover:underline" href="https://www.fhs.swiss/" target="_blank" rel="noopener noreferrer">fhs.swiss</a>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-lg">Dictionnaire Technique Omega</h3>
              <p className="text-gray-600">Lexique technique complet des termes horlogers</p>
              <a className="text-blue-600 hover:underline" href="https://www.omegawatches.com/" target="_blank" rel="noopener noreferrer">omegawatches.com</a>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-lg">Watch-Wiki</h3>
              <p className="text-gray-600">Encyclopédie collaborative en ligne sur l'horlogerie (multilingue)</p>
              <a className="text-blue-600 hover:underline" href="https://watch-wiki.org/" target="_blank" rel="noopener noreferrer">watch-wiki.org</a>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-lg">Glossaire Technique NAWCC</h3>
              <p className="text-gray-600">National Association of Watch and Clock Collectors - Terminologie anglaise</p>
              <a className="text-blue-600 hover:underline" href="https://nawcc.org/" target="_blank" rel="noopener noreferrer">nawcc.org</a>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-lg">Lexique Pratique d'Horlogerie</h3>
              <p className="text-gray-600">Termes techniques expliqués simplement pour apprentis</p>
              <a className="text-blue-600 hover:underline" href="https://www.hautehorlogerie.org/en/encyclopaedia/lexicon-glossary/" target="_blank" rel="noopener noreferrer">FHH Lexique</a>
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
              <a className="text-blue-600 hover:underline" href="https://www.nihs.ch/" target="_blank" rel="noopener noreferrer">nihs.ch</a>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-lg">ISO Standards for Horology</h3>
              <p className="text-gray-600">Normes internationales ISO applicables à l'horlogerie</p>
              <a className="text-blue-600 hover:underline" href="https://www.iso.org/" target="_blank" rel="noopener noreferrer">iso.org</a>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-lg">COSC - Documentation Technique</h3>
              <p className="text-gray-600">Contrôle Officiel Suisse des Chronomètres - Critères et normes</p>
              <a className="text-blue-600 hover:underline" href="https://www.cosc.swiss/" target="_blank" rel="noopener noreferrer">cosc.swiss</a>
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
              <a className="text-blue-600 hover:underline" href="https://www.cousinsuk.com/" target="_blank" rel="noopener noreferrer">cousinsuk.com</a>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-semibold text-lg">Boley Parts Database</h3>
              <p className="text-gray-600">Base de données de pièces détachées et documentation technique</p>
              <a className="text-blue-600 hover:underline" href="https://www.boley.de/" target="_blank" rel="noopener noreferrer">boley.de</a>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-semibold text-lg">Technical Parts Catalogs - ETA</h3>
              <p className="text-gray-600">Catalogues techniques ETA avec nomenclature complète</p>
              <a className="text-blue-600 hover:underline" href="https://www.eta.ch/" target="_blank" rel="noopener noreferrer">eta.ch</a>
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
              <a className="text-blue-600 hover:underline" href="https://www.cpih.ch/" target="_blank" rel="noopener noreferrer">cpih.ch</a>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-semibold text-lg">George Daniels - Watchmaking</h3>
              <p className="text-gray-600">Le manuel de référence absolu en horlogerie (consulter les bibliothèques)</p>
              <a className="text-blue-600 hover:underline" href="https://www.georgedaniels.co.uk/" target="_blank" rel="noopener noreferrer">georgedaniels.co.uk</a>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-semibold text-lg">BHI Training Manuals</h3>
              <p className="text-gray-600">British Horological Institute - Manuels de formation certifiés</p>
              <a className="text-blue-600 hover:underline" href="https://bhi.co.uk/" target="_blank" rel="noopener noreferrer">bhi.co.uk</a>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-semibold text-lg">Practical Watch Repairing - Donald de Carle</h3>
              <p className="text-gray-600">Classique incontournable pour apprentis horlogers (disponible en PDF)</p>
              <a className="text-blue-600 hover:underline" href="https://archive.org/details/practicalwatchre0000deca" target="_blank" rel="noopener noreferrer">archive.org/practicalwatch</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
