"use client";
import { SITE } from "@/lib/seo";
import JsonLd from "./JsonLd";

interface VideoSchemaProps {
  name: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  uploadDate?: string;
}

export default function VideoSchema({
  name,
  description,
  videoUrl,
  thumbnailUrl,
  uploadDate = new Date().toISOString(),
}: VideoSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl: [`${SITE.domain}${thumbnailUrl}`],
    contentUrl: `${SITE.domain}${videoUrl}`,
    uploadDate,
    publisher: {
      "@type": "Organization",
      name: SITE.organization.legalName,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.domain}${SITE.logo}`,
      },
    },
  };

  return <JsonLd data={data} />;
}
