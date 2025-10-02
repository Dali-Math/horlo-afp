export default function CulturePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">🏛️ Culture</h1>
        <p className="text-lg text-gray-700 mb-8">
          Histoire de l’horlogerie, musées, documentaires et ressources culturelles pour comprendre les arts et métiers du temps.
        </p>

        {/* Histoire de l’horlogerie */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">📜 Histoire de l’horlogerie</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="font-semibold text-lg">Encyclopédie FHH</h3>
              <p className="text-gray-600">Chronologies, biographies et techniques horlogères majeures.</p>
              <a className="text-blue-600 hover:underline" href="https://www.hautehorlogerie.org/en/encyclopaedia/" target="_blank" rel="noopener noreferrer">hautehorlogerie.org/encyclopaedia</a>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="font-semibold text-lg">British Museum - Horology</h3>
              <p className="text-gray-600">Collections historiques d’horlogerie et articles éducatifs.</p>
              <a className="text-blue-600 hover:underline" href="https://www.britishmuseum.org/collection/galleries/horology" target="_blank" rel="noopener noreferrer">britishmuseum.org/horology</a>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="font-semibold text-lg">Watch Wiki</h3>
              <p className="text-gray-600">Histoire de marques, calibres et artisans.</p>
              <a className="text-blue-600 hover:underline" href="https://watch-wiki.org/" target="_blank" rel="noopener noreferrer">watch-wiki.org</a>
            </div>
          </div>
        </section>

        {/* Musées */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🖼️ Musées</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg">MIH - Musée International d’Horlogerie (La Chaux‑de‑Fonds)</h3>
              <p className="text-gray-600">Collection mondiale dédiée au temps et à l’horlogerie.</p>
              <a className="text-blue-600 hover:underline" href="https://www.mih.ch/" target="_blank" rel="noopener noreferrer">mih.ch</a>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg">Musée Patek Philippe (Genève)</h3>
              <p className="text-gray-600">Pièces historiques, automates et montres compliquées.</p>
              <a className="text-blue-600 hover:underline" href="https://www.patek.com/en/company/patek-philippe-museum" target="_blank" rel="noopener noreferrer">patek.com/museum</a>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg">Musée d’Horlogerie du Locle - Château des Monts</h3>
              <p className="text-gray-600">Patrimoine horloger jurassien et expositions temporaires.</p>
              <a className="text-blue-600 hover:underline" href="https://www.mhl-monts.ch/" target="_blank" rel="noopener noreferrer">mhl-monts.ch</a>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg">Musée des Arts et Métiers (Paris)</h3>
              <p className="text-gray-600">Instruments scientifiques, régulateurs et pendules.</p>
              <a className="text-blue-600 hover:underline" href="https://www.arts-et-metiers.net/" target="_blank" rel="noopener noreferrer">arts-et-metiers.net</a>
            </div>
          </div>
        </section>

        {/* Documentaires et vidéos */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🎬 Documentaires et vidéos</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <a className="text-blue-600 hover:underline" href="https://www.youtube.com/results?search_query=horlogerie+documentaire" target="_blank" rel="noopener noreferrer">YouTube – Documentaires horlogers</a> – sélections gratuites.
            </li>
            <li>
              <a className="text-blue-600 hover:underline" href="https://www.arte.tv/fr/search/?q=horlogerie" target="_blank" rel="noopener noreferrer">Arte – Horlogerie</a> – programmes culturels et historiques.
            </li>
            <li>
              <a className="text-blue-600 hover:underline" href="https://www.rts.ch/play/tv/recherche?query=horlogerie" target="_blank" rel="noopener noreferrer">RTS – Horlogerie</a> – reportages suisses sur les métiers.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
