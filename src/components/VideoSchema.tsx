"use client";
import { SITE } from "@/lib/seo";
import { toAbsolute } from "@/lib/url";
import JsonLd from "./JsonLd";

interface VideoSchemaProps {
  name: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string | string[];
  uploadDate?: string;
  embedUrl?: string;
  duration?: string;
}

export default function VideoSchema({
  name,
  description,
  videoUrl,
  thumbnailUrl,
  uploadDate,
  embedUrl,
  duration,
}: VideoSchemaProps) {
  // thumbnailUrl peut être string ou string[] → on normalise en tableau
  const thumbs = (Array.isArray(thumbnailUrl) ? thumbnailUrl : [thumbnailUrl])
    .filter(Boolean) as string[];

  const data = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl: thumbs.map((t) => toAbsolute(t)),
    uploadDate: uploadDate ?? new Date().toISOString(),
    // URLs absolues pour les médias
    contentUrl: toAbsolute(videoUrl),
    embedUrl: embedUrl ? toAbsolute(embedUrl) : undefined,
    duration,
    // Publisher cohérent avec le reste du site
    publisher: {
      "@type": "Organization",
      name: SITE.organization.legalName,
      url: SITE.url,
      logo: toAbsolute(SITE.image),
    },
  };

  return <JsonLd data={data} />;
}
