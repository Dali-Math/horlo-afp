"use client";

export default function PodcastsPage() {
  ...
}
{/* 🟥 Nouvelle section : tes podcasts HorloLearn */}
<section className="bg-white rounded-lg shadow-md p-6 mb-10 border border-[#E2B44F]">
  <h2 className="text-2xl font-semibold text-gray-800 mb-6">🎙 Mes podcasts HorloLearn</h2>

  <div className="space-y-8">
    <div className="border-l-4 border-[#E2B44F] pl-4">
      <h3 className="text-xl font-semibold text-gray-900">Dans les Coulisses du Temps</h3>
      <p className="text-gray-600 mb-4">Voyage dans l’atelier, secrets & techniques horlogères.</p>
      <iframe
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/user-555747421/dans_les_coulisses_du_temps/s-Xw2rx3p2LOw"
      ></iframe>
    </div>

    <div className="border-l-4 border-[#E2B44F] pl-4">
      <h3 className="text-xl font-semibold text-gray-900">Dans les Rouages du Temps</h3>
      <p className="text-gray-600 mb-4">Exploration des mécanismes et roues dans la montre.</p>
      <iframe
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/user-555747421/dans_les_rouages_du_temps/s-yk6jMmCWxyx"
      ></iframe>
    </div>

    <div className="border-l-4 border-[#E2B44F] pl-4">
      <h3 className="text-xl font-semibold text-gray-900">Vocabulaire Horloger</h3>
      <p className="text-gray-600 mb-4">Termes techniques expliqués simplement.</p>
      <iframe
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/user-555747421/vocabulaire_horloger"
      ></iframe>
    </div>
  </div>
</section>
