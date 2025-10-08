"use client";

export default function PodcastsPage() {
  const mesPodcasts = [
    {
      id: "coulisses",
      title: "Dans les Coulisses du Temps",
      description: "Voyage dans l’atelier, secrets & techniques horlogères.",
      embedUrl: "https://soundcloud.com/user-555747421/dans_les_rouages_du_temps/s-yk6jMmCWxyx?si=3e3121745a85429b8e29f67931b60682&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    },
    {
      id: "rouages",
      title: "Dans les Rouages du Temps",
      description: "Exploration des mécanismes et roues dans la montre.",
      embedUrl: "https://soundcloud.com/user-555747421#:~:text=https%3A//soundcloud.com/user%2D555747421/dans_les_coulisses_du_temps/s%2DXw2rx3p2LOw%3Fsi%3D6352afb3a5ab431b83d4517f0dd3c1e1%26utm_source%3Dclipboard%26utm_medium%3Dtext%26utm_campaign%3Dsocial_sharing",
    },
    {
      id: "vocabulaire",
      title: "Vocabulaire Horloger",
      description: "Termes techniques expliqués simplement.",
      embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/user-555747421/vocabulaire_horloger",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">🎧 Podcasts</h1>
        <p className="text-lg text-gray-700 mb-8">
          Sélection de podcasts horlogers, écoute intégrée sans téléchargement.
        </p>

        {/* 🎙 Section : tes podcasts HorloLearn */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-10 border border-[#E2B44F]">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            🎙 Mes podcasts HorloLearn
          </h2>

          <div className="space-y-8">
            {mesPodcasts.map((p) => (
              <div key={p.id} className="border-l-4 border-[#E2B44F] pl-4">
                <h3 className="text-xl font-semibold text-gray-900">{p.title}</h3>
                <p className="text-gray-600 mb-4">{p.description}</p>
                <iframe
                  width="100%"
                  height="166"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={p.embedUrl}
                ></iframe>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
