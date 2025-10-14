import "./globals.css";
import type { Metadata } from "next";
import { SITE } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  keywords: SITE.keywords,
  authors: [{ name: SITE.author }],
  metadataBase: new URL(SITE.url),
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    images: [
      {
        url: SITE.image,
        width: 1200,
        height: 630,
        alt: SITE.title,
      },
    ],
    locale: SITE.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitter.site,
    creator: SITE.twitter.creator,
    title: SITE.title,
    description: SITE.description,
    images: [SITE.image],
  },
  alternates: {
    canonical: SITE.url,
  },
  other: {
    "ai:summary": SITE.description,
    "ai:topic": SITE.keywords.join(", "),
    "ai:author": SITE.author,
    "color-scheme": "dark light",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.organization.name,
    legalName: SITE.organization.legalName,
    url: SITE.organization.url,
    logo: SITE.organization.logo,
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: SITE.organization.contactEmail,
        contactType: "customer support",
        availableLanguage: ["fr-CH", "fr", "en"],
      },
    ],
    sameAs: SITE.organization.sameAs,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang={SITE.locale.split('-')[0]} className="dark">
      <head>
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className="bg-[#0a0a0a] text-gray-200">
        <Navbar />
        {children}
        <Footer />
        <ScrollToTop />
        <Analytics />
        <JsonLd data={organizationSchema} />
      </body>
    </html>
  );
}
