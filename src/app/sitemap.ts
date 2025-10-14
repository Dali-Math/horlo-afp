import { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/theorie`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE.url}/pratique`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE.url}/quiz`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/ressources`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/podcasts`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}
