export default function EvenementsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">🗓️ Événements</h1>
        <p className="text-lg text-gray-700 mb-8">
          Agenda, ateliers gratuits, journées portes ouvertes et salons pour découvrir et pratiquer l’horlogerie.
        </p>

        {/* Agenda et Calendriers */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">📅 Agenda et calendriers</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <a className="text-blue-600 hover:underline" href="https://www.fh-pressroom.ch/fr/agenda" target="_blank" rel="noopener noreferrer">Fédération Horlogère – Agenda</a> – événements et salons en Suisse.
            </li>
            <li>
              <a className="text-blue-600 hover:underline" href="https://www.hautehorlogerie.org/fr/actualites/" target="_blank" rel="noopener noreferrer">FHH – Actualités et événements</a> – conférences et expositions.
            </li>
            <li>
              <a className="text-blue-600 hover:underline" href="https://www.bhi.co.uk/horology-events/" target="_blank" rel="noopener noreferrer">BHI – Horology Events</a> – rencontres et salons (UK).
            </li>
          </ul>
        </section>

        {/* Ateliers gratuits et portes ouvertes */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🛠️ Ateliers gratuits et portes ouvertes</h2>
          <div className="space-y-3">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-lg">Journées des Métiers – Écoles d’horlogerie</h3>
              <p className="text-gray-600">Découverte des formations, ateliers d’initiation et visites.</p>
              <a className="text-blue-600 hover:underline" href="https://www.orientation.ch/" target="_blank" rel="noopener noreferrer">orientation.ch</a>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-lg">Musées – démonstrations et ateliers</h3>
              <p className="text-gray-600">Ex: MIH, MHL – activités pédagogiques régulières.</p>
              <a className="text-blue-600 hover:underline" href="https://www.mih.ch/" target="_blank" rel="noopener noreferrer">mih.ch</a>
            </div>
          </div>
        </section>

        {/* Salons et foires */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🏟️ Salons et foires</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg">Watches and Wonders (Genève)</h3>
              <p className="text-gray-600">Grand rendez‑vous annuel de l’horlogerie.</p>
              <a className="text-blue-600 hover:underline" href="https://www.watchesandwonders.com/" target="_blank" rel="noopener noreferrer">watchesandwonders.com</a>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg">Dubai Watch Week</h3>
              <p className="text-gray-600">Événements éducatifs, masterclasses et conférences ouvertes.</p>
              <a className="text-blue-600 hover:underline" href="https://www.dubaiwatchweek.com/" target="_blank" rel="noopener noreferrer">dubaiwatchweek.com</a>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg">MunichTime / ViennaTime</h3>
              <p className="text-gray-600">Foires régionales dédiées aux nouveautés et rencontres.</p>
              <a className="text-blue-600 hover:underline" href="https://www.munichtime.de/" target="_blank" rel="noopener noreferrer">munichtime.de</a>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg">Salon Belles Montres (Paris)</h3>
              <p className="text-gray-600">Expositions, conférences et ateliers pour passionnés.</p>
              <a className="text-blue-600 hover:underline" href="https://www.carrefourhorloger.com/" target="_blank" rel="noopener noreferrer">carrefourhorloger.com</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
