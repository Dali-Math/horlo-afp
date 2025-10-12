import { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE.domain}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.domain}/theorie`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE.domain}/pratique`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE.domain}/quiz`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.domain}/outils`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.domain}/ressources`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE.domain}/podcasts`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE.domain}/suisse`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  return staticPages;
}
