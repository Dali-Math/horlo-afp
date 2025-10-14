import { MetadataRoute } from "next";
import { toAbsolute } from "@/lib/url";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: toAbsolute("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: toAbsolute("/theorie"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: toAbsolute("/pratique"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: toAbsolute("/quiz"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: toAbsolute("/outils"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: toAbsolute("/ressources"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: toAbsolute("/podcasts"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: toAbsolute("/suisse"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  return staticPages;
}
