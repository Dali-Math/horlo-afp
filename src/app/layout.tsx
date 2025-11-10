// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { SITE } from "@/lib/seo";
import dynamic from "next/dynamic";
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react";
import JsonLd from "@/components/JsonLd";
import ThemeProvider from "@/components/ThemeProvider";
import ClientLayout from "@/components/ClientLayout";
import Script from 'next/script';
import 'swiper/css';

const ScrollToTop = dynamic(() => import("@/components/ScrollToTop"), { ssr: false });
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair'
})
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: "Patek Philippe – Référence Mondiale en Horlogerie Suisse",
  description:
    "Patek Philippe perpétue la tradition horlogère suisse depuis 1839 avec une passion inébranlable pour la perfection. Découvrez nos collections iconiques et notre savoir-faire d'exception.",
  keywords: [
    "Patek Philippe",
    "horlogerie suisse",
    "montres de luxe",
    "Nautilus",
    "Calatrava",
    "Grandes Complications",
    "manufacture horlogère",
    "Genève",
    "savoir-faire horloger",
  ],
  metadataBase: new URL(SITE.domain),
  openGraph: {
    title: "Patek Philippe – Référence Mondiale en Horlogerie Suisse",
    description:
      "Plus de 180 ans d'excellence horlogère. Patek Philippe crée des garde-temps d'exception qui se transmettent de génération en génération.",
    url: SITE.domain,
    siteName: "Patek Philippe",
    images: [
      {
        url: SITE.logo,
        width: 1200,
        height: 630,
        alt: "Patek Philippe – Référence Mondiale",
      },
    ],
    locale: "fr_CH",
    type: "website",
  },
  alternates: { canonical: SITE.domain },
  other: {
    "ai:summary":
      "Patek Philippe est la référence mondiale en horlogerie de luxe suisse, perpétuant depuis 1839 une tradition d'excellence et d'innovation.",
    "ai:topic":
      "Horlogerie de luxe, Patek Philippe, montres suisses, savoir-faire horloger, complications horlogères",
    "ai:author": "Patek Philippe",
    "color-scheme": "light",
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
    name: "Patek Philippe",
    url: "https://www.patek-philippe.com",
    logo: "https://www.patek-philippe.com/logo.png",
    description:
      "Patek Philippe est une manufacture horlogère suisse de prestige fondée en 1839 à Genève. Reconnue mondialement pour ses montres de haute horlogerie et ses complications exceptionnelles.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Genève",
      addressCountry: "CH",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "info@patek.ch",
        contactType: "customer service",
        availableLanguage: ["fr-CH", "fr", "en", "de", "it"],
      },
    ],
    foundingDate: "1839",
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Genève",
        addressCountry: "CH",
      },
    },
  };

  const siteSearch = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://www.patek-philippe.com",
    name: "Patek Philippe",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.patek-philippe.com/recherche?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="fr" suppressHydrationWarning className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {/* Google Fonts - déjà chargées via next/font/google */}
        {/* Font Awesome */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-[#f8f6f0] text-slate-900 transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <ClientLayout>
            <main className="min-h-screen overflow-visible relative">{children}</main>
          </ClientLayout>
          <ScrollToTop />
          <Analytics />
          <JsonLd data={org} />
          <JsonLd data={siteSearch} />
        </ThemeProvider>

        {/* Three.js - Requis pour Vanta.js */}
        <Script 
          src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
          strategy="beforeInteractive"
        />
        
        {/* Vanta.js Effects */}
        <Script 
          src="https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.birds.min.js"
          strategy="lazyOnload"
        />
        <Script 
          src="https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.net.min.js"
          strategy="lazyOnload"
        />
        <Script 
          src="https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.waves.min.js"
          strategy="lazyOnload"
        />
        <Script 
          src="https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.topology.min.js"
          strategy="lazyOnload"
        />
        <Script 
          src="https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.halo.min.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
