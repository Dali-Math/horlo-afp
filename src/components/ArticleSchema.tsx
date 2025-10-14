"use client";
import { SITE } from "@/lib/seo";
import { toAbsolute } from "@/lib/url";
import JsonLd from "./JsonLd";

interface ArticleSchemaProps {
  title: string;
  description: string;
  slug: string;
  image?: string;
  authors?: { name: string }[];
  datePublished?: string;
  dateModified?: string;
}

export default function ArticleSchema({
  title,
  description,
  slug,
  image = SITE.image,
  authors = [{ name: "HorloLearn" }],
  datePublished = new Date().toISOString(),
  dateModified = new Date().toISOString(),
}: ArticleSchemaProps) {
  const imageAbs = toAbsolute(image || SITE.image);

  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: imageAbs,
    author: authors,
    publisher: {
      "@type": "Organization",
      name: "HorloLearn",
      logo: toAbsolute(SITE.image),
    },
    mainEntityOfPage: toAbsolute(slug),
    datePublished,
    dateModified,
  };

  return <JsonLd data={data} />;
}
