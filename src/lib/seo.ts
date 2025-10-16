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
export const educationalOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "HorloLearn",
  "url": "https://www.horlolearn.ch",
  "logo": "https://www.horlolearn.ch/og-image.jpg",
  "description": "Plateforme suisse d’apprentissage horloger moderne et immersif.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "CH"
  },
  "sameAs": [
    "https://github.com/Dali-Math",
    "https://www.youtube.com/@HorloLearn",
    "https://www.linkedin.com/in/..."
  ]
};

export { SITE } from "./site";
