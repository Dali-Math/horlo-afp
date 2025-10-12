import { Metadata } from "next";
import PodcastSchema from "@/components/PodcastSchema";
import BreadcrumbsSchema from "@/components/BreadcrumbsSchema";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Podcasts HorloLearn – Formation et culture horlogère`,
  description:
    "Podcasts HorloLearn : discussions, explications et récits sur l'horlogerie suisse, les calibres ETA et la formation AFP.",
};

export default function PodcastsPage() {
  const episode = {
    name: "Les bases du mouvement ETA 6497",
    description:
      "Un épisode audio de 20 minutes qui explore la structure du calibre ETA 6497, ses composants et son importance dans la formation horlogère suisse.",
    audioUrl: "/audios/episode1.mp3",
    imageUrl: "/images/podcast-cover.jpg",
    uploadDate: "2025-10-12",
    duration: "PT20M",
    episodeNumber: 1,
    partOfSeries: {
      name: "HorloLearn Podcast",
      url: "https://www.horlolearn.ch/podcasts",
    },
  };

  return (
    <section className="max-w-3xl mx-auto p-6">
      <BreadcrumbsSchema
        items={[
          { name: "Accueil", slug: "" },
          { name: "Podcasts", slug: "podcasts" },
        ]}
      />

      <h1 className="text-3xl font-bold text-[#E2B44F] mb-4">
        Podcasts HorloLearn 🎧
      </h1>
      <p className="text-gray-300 mb-6">
        Écoutez nos épisodes exclusifs sur la culture horlogère suisse, les
        techniques de démontage, et les secrets des calibres emblématiques.
      </p>

      <div className="bg-[#111] p-4 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-[#E2B44F]">
          {episode.name}
        </h2>
        <p className="text-gray-400 mb-3">{episode.description}</p>
        <audio controls src={episode.audioUrl} className="w-full rounded-lg" />
      </div>

      {/* Injection du JSON-LD IA */}
      <PodcastSchema {...episode} />
    </section>
  );
}
