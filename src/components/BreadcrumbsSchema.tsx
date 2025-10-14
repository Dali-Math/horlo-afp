import React from "react";
import JsonLd from "./JsonLd";
import { SITE } from "@/lib/seo";

const toAbsolute = (slug: string) =>
  new URL(slug.startsWith("/") ? slug : `/${slug}`, SITE.url).toString();

type Crumb = { name: string; slug: string };

export default function BreadcrumbsSchema({
  items,
  currentTitle,
  currentPath
}: {
  items: Crumb[];
  currentTitle: string;
  currentPath: string; // ex: "/pratique" ou "/theorie/mouvements"
}) {
  const list = items.map((it, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: it.name,
    item: toAbsolute(it.slug),
  }));

  list.push({
    "@type": "ListItem",
    position: list.length + 1,
    name: currentTitle,
    item: toAbsolute(currentPath),
  });

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: list,
  };

  return <JsonLd data={data} />;
}
