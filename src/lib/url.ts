import { SITE } from "@/lib/seo";

export const toAbsolute = (path?: string) => {
  if (!path) return undefined as unknown as string;
  if (path.startsWith("http")) return path;
  const p = path.startsWith("/") ? path : `/${path}`;
  return new URL(p, SITE.url).toString();
};
