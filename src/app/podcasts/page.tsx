"use client";

export default function PodcastsPage() {
  const mesPodcasts = [
    {
      id: "coulisses",
      title: "Dans les Coulisses du Temps",
      description: "Voyage dans l’atelier, secrets & techniques horlogères.",
      embedUrl: "https://on.soundcloud.com/gEvB2FdF22vuUCqDw3",
    },
    {
      id: "rouages",
      title: "Dans les Rouages du Temps",
      description: "Exploration des mécanismes et roues dans la montre.",
      embedUrl: "https://on.soundcloud.com/ZUqJOXPPB0brVuEK9Z",
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
