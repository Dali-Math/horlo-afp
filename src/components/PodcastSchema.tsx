import React from "react";
import JsonLd from "./JsonLd";
import { SITE } from "@/lib/seo";

const toAbsolute = (p?: string) =>
  !p ? undefined : p.startsWith("http") ? p : new URL(p.startsWith("/") ? p : `/${p}`, SITE.url).toString();

export default function PodcastSchema({
  name,
  description,
  audioUrl,
  imageUrl,
  uploadDate,
  duration,
  episodeNumber
}: {
  name: string;
  description: string;
  audioUrl: string;   // doit répondre en 200 OK
  imageUrl?: string;
  uploadDate: string; // "YYYY-MM-DD"
  duration?: string;  // "PT12M30S"
  episodeNumber?: number;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name,
    description,
    datePublished: uploadDate,
    image: toAbsolute(imageUrl) ?? toAbsolute("/og-image.svg"),
    episodeNumber,
    partOfSeries: {
      "@type": "PodcastSeries",
      name: "HorloLearn Podcasts",
      url: `${SITE.url}/podcasts`,
    },
    publisher: {
      "@type": "Organization",
      name: "HorloLearn",
      url: SITE.url,
      logo: toAbsolute("/og-image.svg"),
    },
    associatedMedia: {
      "@type": "AudioObject",
      contentUrl: toAbsolute(audioUrl),
      embedUrl: toAbsolute(audioUrl),
      uploadDate,
      duration,
    },
  };

  return <JsonLd data={data} />;
}
