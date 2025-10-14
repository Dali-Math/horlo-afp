"use client";
import { toAbsolute } from "@/lib/url";
import JsonLd from "./JsonLd";

export default function BreadcrumbsSchema({
  items,
}: {
  items: { name: string; slug: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: toAbsolute(it.slug),
    })),
  };

  return <JsonLd data={data} />;
}
