import "./globals.css";
import type { Metadata } from "next";
import { SITE } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // ✅ Ajout du Footer
import ScrollToTop from "@/components/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "HorloLearn – Formation Horlogère Suisse (AFP)",
  description:
    "Apprenez les gestes, mouvements et techniques horlogères suisses. Guides ETA 6497, vidéos, quiz et fiches de formation AFP.",
  keywords: ["horlogerie suisse", "ETA 6497", "formation AFP", "montre mécanique", "HorloLearn"],
  metadataBase: new URL(SITE.domain),
  openGraph: {
    title: "HorloLearn – Formation Horlogère Suisse",
    description: "Découvrez les mouvements suisses et la formation horlogère AFP.",
    url: SITE.domain,
    siteName: SITE.name,
    images: [
      {
        url: SITE.logo,
        width: 1200,
        height: 630,
        alt: "HorloLearn – Formation Horlogère Suisse",
      },
    ],
    locale: SITE.locale,
    type: "website",
  },
  alternates: { canonical: SITE.domain },
  other: {
    "ai:summary":
      "Formation horlogère suisse complète : gestes, démontage, remontage, ETA 6497, AFP.",
    "ai:topic": "Horlogerie suisse, mouvement mécanique, formation AFP, ETA 6497",
    "ai:author": "HorloLearn by Mohamed Ali Mathlouthi",
    "color-scheme": "dark light",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.organization.legalName,
    url: SITE.organization.url,
    logo: SITE.organization.logo,
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: SITE.contactEmail,
        contactType: "customer support",
        availableLanguage: ["fr-CH", "fr", "en"],
      },
    ],
    sameAs: SITE.organization.sameAs,
  };

  return (
    <html lang="fr">
      <body className="bg-[#0a0a0a] text-gray-200">
        <Navbar />
        {children}
        <Footer /> {/* ✅ Footer affiché sur toutes les pages */}
        <ScrollToTop />
        <Analytics />
        <JsonLd data={org} />
      </body>
    </html>
  );
}
