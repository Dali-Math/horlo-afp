"use client";
import { SITE } from "@/lib/seo";
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
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: `${SITE.domain}${image}`,
    author: authors,
    publisher: {
      "@type": "Organization",
      name: SITE.organization.legalName,
      logo: { "@type": "ImageObject", url: `${SITE.domain}${SITE.image}` },
    },
    mainEntityOfPage: `${SITE.domain}/${slug}`,
    datePublished,
    dateModified,
  };

  return <JsonLd data={data} />;
}
