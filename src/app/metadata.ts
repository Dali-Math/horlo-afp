import type { Metadata } from "next";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "HorloLearn – Passion & Découverte Horlogère Suisse",
  description:
    "HorloLearn partage la passion de l'horlogerie suisse à travers des fiches techniques, quiz, vidéos et ressources destinées aux amateurs et curieux du monde horloger.",
  keywords: [
    "horlogerie suisse",
    "ETA 6497",
    "apprentissage horloger",
    "passion horlogerie",
    "culture horlogère",
    "HorloLearn",
  ],
  metadataBase: new URL(SITE.domain),
  openGraph: {
    title: "HorloLearn – Passion & Découverte Horlogère Suisse",
    description:
      "Plateforme indépendante dédiée aux passionnés d'horlogerie suisse. Découvrez les mécanismes, les gestes et les savoir-faire horlogers à travers des ressources pédagogiques accessibles à tous.",
    url: SITE.domain,
    siteName: SITE.name,
    images: [
      {
        url: SITE.logo,
        width: 1200,
        height: 630,
        alt: "HorloLearn – Passion Horlogère Suisse",
      },
    ],
    locale: SITE.locale,
    type: "website",
  },
  alternates: { canonical: SITE.domain },
};
