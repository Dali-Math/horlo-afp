// app/layout.tsx
import "./globals.css";
import "./guide-complet-fixes.css";
import "./guide-complet-final-fixes.css";
import type { Metadata, Viewport } from "next";
import { SITE } from "@/lib/seo";
import dynamic from "next/dynamic";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import JsonLd from "@/components/JsonLd";
import ThemeProvider from "@/components/ThemeProvider";
import ClientLayout from "@/components/ClientLayout";
import GuideCompletRuntimeFixes from "@/components/GuideCompletRuntimeFixes";
import "swiper/css";

const ScrollToTop = dynamic(() => import("@/components/ScrollToTop"), { ssr: false });

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-editorial",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf7f1" },
    { media: "(prefers-color-scheme: dark)", color: "#090b0e" },
  ],
};

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
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "HorloLearn",
  },
  other: {
    "ai:summary":
      "HorloLearn partage la culture et les savoir-faire de l'horlogerie suisse, à travers des ressources accessibles aux passionnés et curieux.",
    "ai:topic":
      "Horlogerie suisse, mécanique de précision, culture horlogère, ETA 6497",
    "ai:author": "Équipe HorloLearn",
    "color-scheme": "light dark",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HorloLearn",
    url: "https://www.horlolearn.ch",
    logo: "https://www.horlolearn.ch/og-image.jpg",
    description:
      "HorloLearn est une organisation suisse indépendante dédiée aux passionnés d'horlogerie. Elle propose des fiches techniques, quiz, vidéos et ressources pour découvrir et comprendre les savoir-faire horlogers, sans offrir de formation officielle.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "CH",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "contact.horlogeries@gmail.com",
        contactType: "information",
        availableLanguage: ["fr-CH", "fr", "en"],
      },
    ],
    sameAs: [
      "https://github.com/Dali-Math",
      "https://www.youtube.com/@HorloLearn",
      "https://www.linkedin.com/in/...",
    ],
  };

  const siteSearch = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://www.horlolearn.ch",
    name: "HorloLearn",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.horlolearn.ch/recherche?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable} bg-hl text-[var(--hl-ink)]`}>
        <ThemeProvider>
          <ClientLayout>
            <main className="relative min-h-screen overflow-visible">{children}</main>
          </ClientLayout>
          <GuideCompletRuntimeFixes />
          <ScrollToTop />
          <Analytics />
          <JsonLd data={org} />
          <JsonLd data={siteSearch} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js');
                  });
                }
              `,
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
