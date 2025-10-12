"use client";
import JsonLd from "./JsonLd";
import { SITE } from "@/lib/seo";

interface PodcastSchemaProps {
  name: string;             // Titre de l'épisode ou de la série
  description: string;      // Résumé du contenu audio
  audioUrl: string;         // Lien du fichier audio (ex: /audios/episode1.mp3)
  imageUrl: string;         // Illustration de couverture
  uploadDate?: string;      // Date de publication
  duration?: string;        // Format ISO 8601 : "PT20M" = 20 minutes
  episodeNumber?: number;   // Numéro d'épisode (optionnel)
  partOfSeries?: {          // Si appartient à une série globale
    name: string;
    url: string;
  };
}

export default function PodcastSchema({
  name,
  description,
  audioUrl,
  imageUrl,
  uploadDate = new Date().toISOString(),
  duration = "PT20M",
  episodeNumber,
  partOfSeries,
}: PodcastSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name,
    description,
    url: `${SITE.domain}${audioUrl}`,
    image: `${SITE.domain}${imageUrl}`,
    datePublished: uploadDate,
    duration,
    episodeNumber,
    partOfSeries: partOfSeries && {
      "@type": "PodcastSeries",
      name: partOfSeries.name,
      url: partOfSeries.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.organization.legalName,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.domain}${SITE.logo}`,
      },
    },
    author: {
      "@type": "Person",
      name: "HorloLearn",
    },
  };

  return <JsonLd data={data} />;
}
