import { SITE } from "./site";

export function generateSeoMeta(pathname: string, title: string, description: string) {
  const url = `${SITE.domain}${pathname}`;

  return {
    title: `${title} | ${SITE.name}`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url,
      siteName: SITE.name,
      images: [
        {
          url: `${SITE.domain}${SITE.logo}`,
          width: 1200,
          height: 630,
          alt: SITE.name,
        },
      ],
      locale: SITE.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE.name}`,
      description,
      site: SITE.twitter,
      images: [`${SITE.domain}${SITE.logo}`],
    },
  };
}

export { SITE } from "./site";
