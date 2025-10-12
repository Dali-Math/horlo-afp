"use client";
import { motion } from "framer-motion";

const podcasts = [
  {
    id: 1,
    title: "🎙️ Les bases du mouvement ETA 6497",
    description:
      "Un épisode audio de 20 minutes qui explore la structure du calibre ETA 6497, ses composants et son importance dans la formation horlogère suisse.",
    audioUrl: "/audios/eta6497.mp3",
  },
  {
    id: 2,
    title: "🎧 L'histoire des montres suisses",
    description:
      "Un voyage sonore à travers les grandes maisons horlogères, leurs innovations et leur héritage culturel au cœur de la Suisse.",
    audioUrl: "/audios/histoire-montres.mp3",
  },
  {
    id: 3,
    title: "🪶 Les secrets du réglage de précision",
    description:
      "Un épisode captivant qui dévoile comment les horlogers suisses atteignent la perfection mécanique dans chaque mouvement.",
    audioUrl: "/audios/reglage-precision.mp3",
  },
];

export default function PodcastsPage() {
  return (
    <section className="py-20 px-6 bg-[#0A0A0A] text-white min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#E2B44F] mb-6 flex items-center gap-2">
          🎧 Podcasts HorloLearn
        </h1>
        <p className="text-gray-400 mb-12 max-w-3xl">
          Écoutez nos épisodes exclusifs sur la culture horlogère suisse, les
          techniques de démontage et les secrets des calibres emblématiques.
        </p>

        <div className="space-y-10">
          {podcasts.map((podcast, index) => (
            <motion.div
              key={podcast.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#141414] p-8 rounded-2xl shadow-lg border border-[#E2B44F]/30 hover:border-[#E2B44F]/60 transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold text-[#E2B44F] mb-2">
                {podcast.title}
              </h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                {podcast.description}
              </p>
              <audio
                controls
                preload="metadata"
                className="w-full rounded-lg"
                style={{
                  filter: "invert(1) hue-rotate(180deg)",
                  borderRadius: "12px",
                }}
              >
                <source src={podcast.audioUrl} type="audio/mpeg" />
                Votre navigateur ne supporte pas la lecture audio.
              </audio>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
