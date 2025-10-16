import "./globals.css";
import type { Metadata } from "next";
import { SITE } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "HorloLearn – Accompagnement Horloger Suisse (AFP)",
  description:
    "HorloLearn aide les élèves et passionnés à comprendre les gestes, mouvements et techniques horlogères suisses. Guides ETA 6497, vidéos, quiz et fiches pédagogiques AFP.",
  keywords: [
    "horlogerie suisse",
    "ETA 6497",
    "formation AFP",
    "apprentissage horloger",
    "HorloLearn",
  ],
  metadataBase: new URL(SITE.domain),
  openGraph: {
    title: "HorloLearn – Accompagnement Horloger Suisse",
    description:
      "Plateforme d’aide à la formation horlogère : cours, fiches techniques, quiz et ressources ETA 6497.",
    url: SITE.domain,
    siteName: SITE.name,
    images: [
      {
        url: SITE.logo,
        width: 1200,
        height: 630,
        alt: "HorloLearn – Apprentissage Horloger Suisse",
      },
    ],
    locale: SITE.locale,
    type: "website",
  },
  alternates: { canonical: SITE.domain },
  other: {
    "ai:summary":
      "HorloLearn accompagne les étudiants AFP et passionnés d’horlogerie suisse : mouvements, ETA 6497, gestes et théorie.",
    "ai:topic":
      "Horlogerie suisse, mouvement mécanique, apprentissage horloger, ETA 6497",
    "ai:author": "HorloLearn by Mohamed Ali Mathlouthi",
    "color-scheme": "dark light",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const org = {
    "@context": "https://schema.org",
    "@type": ["Organization", "EducationalSupport"],
    "name": "HorloLearn",
    "url": "https://www.horlolearn.ch",
    "logo": "https://www.horlolearn.ch/og-image.jpg",
    "description":
      "HorloLearn est une organisation suisse indépendante dédiée à l’accompagnement et à la vulgarisation de la formation horlogère (AFP et métiers du temps).",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CH",
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "email": "mathlouthi_mohamed82@yahoo.com",
        "contactType": "information",
        "availableLanguage": ["fr-CH", "fr", "en"],
      },
    ],
    "sameAs": [
      "https://github.com/Dali-Math",
      "https://www.youtube.com/@HorloLearn",
      "https://www.linkedin.com/in/...",
    ],
  };

  return (
    <html lang="fr">
      <body className="bg-[#0a0a0a] text-gray-200">
        <Navbar />
        {children}
        <Footer />
        <ScrollToTop />
        <Analytics />
        <JsonLd data={org} />
      </body>
    </html>
  );
}
