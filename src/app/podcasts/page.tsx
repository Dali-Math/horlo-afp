"use client";

export default function PodcastsPage() {
  const mesPodcasts = [
    {
      id: "coulisses",
      title: "Dans les Coulisses du Temps",
      description:
        "Voyage dans l’atelier, secrets & techniques horlogères.",
      embedUrl:
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%3Atracks%3A2185373015%3Fsecret_token%3Ds-Xw2rx3p2LOw&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
    },
    {
      id: "rouages",
      title: "Dans les Rouages du Temps",
      description:
        "Exploration des mécanismes et roues dans la montre.",
      embedUrl:
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%3Atracks%3A2185374163%3Fsecret_token%3Ds-yk6jMmCWxyx&color=%23ff5500&auto_play=false&hide_related=false&show_user=true&show_reposts=false&show_teaser=true&visual=true",
    },
    {
      id: "vocabulaire",
      title: "Vocabulaire Horloger",
      description: "Termes techniques expliqués simplement.",
      embedUrl:
        "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/user-555747421/vocabulaire_horloger",
    },
  ];

  return (
    <div className="min-h-screen bg-light-100 dark:bg-dark-900 text-slate-900 dark:text-light-100 transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-gold mb-4 text-center">
          🎧 Podcasts HorloLearn
        </h1>
        <p className="text-lg text-slate-700 dark:text-light-200 mb-10 text-center">
          Sélection exclusive de podcasts horlogers – écoute intégrée, sans téléchargement.
        </p>

        {/* 🎙 Mes podcasts HorloLearn */}
        <section className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-8 border border-gold/40">
          <h2 className="text-2xl font-semibold text-gold mb-6 text-center">
            🎙 Les voix de l’atelier
          </h2>

          <div className="space-y-10">
            {mesPodcasts.map((p) => (
              <div
                key={p.id}
                className="border-l-4 border-gold pl-6 transition-all duration-300 hover:border-gold-light"
              >
                <h3 className="text-xl font-semibold text-slate-900 dark:text-light-100 mb-1">
                  {p.title}
                </h3>
                <p className="text-slate-600 dark:text-light-200 mb-4">
                  {p.description}
                </p>
                <iframe
                  width="100%"
                  height="166"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  className="rounded-lg shadow-md"
                  src={p.embedUrl}
                ></iframe>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="bg-dark-900 text-light-200 py-8 mt-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-light-400">
            © 2025 HorloLearn – Culture & Podcasts Horlogers
          </p>
        </div>
      </footer>
    </div>
  );
}
