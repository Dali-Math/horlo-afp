import "./globals.css";
import type { Metadata } from "next";
import { SITE } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";
import JsonLd from "@/components/JsonLd";
import ThemeProvider from "@/components/ThemeProvider";

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
  other: {
    "ai:summary":
      "HorloLearn partage la culture et les savoir-faire de l'horlogerie suisse, à travers des ressources accessibles aux passionnés et curieux.",
    "ai:topic":
      "Horlogerie suisse, mécanique de précision, culture horlogère, ETA 6497",
    "ai:author": "Équipe HorloLearn",
    "color-scheme": "dark light",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "HorloLearn",
    "url": "https://www.horlolearn.ch",
    "logo": "https://www.horlolearn.ch/og-image.jpg",
    "description":
      "HorloLearn est une organisation suisse indépendante dédiée aux passionnés d'horlogerie. Elle propose des fiches techniques, quiz, vidéos et ressources pour découvrir et comprendre les savoir-faire horlogers, sans offrir de formation officielle.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CH",
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "email": "contact.horlogeries@gmail.com",
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

  const siteSearch = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://www.horlolearn.ch",
    "name": "HorloLearn",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.horlolearn.ch/recherche?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="bg-white text-slate-900 dark:bg-[#0a0a0a] dark:text-gray-200 transition-colors duration-300">
        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark" 
          enableSystem
          disableTransitionOnChange={false}
        >
          <Navbar />
          {children}
          <Footer />
          <ScrollToTop />
          <Analytics />
          <JsonLd data={org} />
          <JsonLd data={siteSearch} />
        </ThemeProvider>
      </body>
    </html>
  );
}
