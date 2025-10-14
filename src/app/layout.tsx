import "./globals.css";
import { ReactNode } from "react";
import Link from "next/link";
import { SITE } from "@/lib/seo";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  openGraph: {
    type: "website",
    url: SITE.url,
    title: SITE.title,
    description: SITE.description,
    siteName: SITE.name,
    images: [
      {
        url: SITE.image,
        width: 1200,
        height: 630,
        alt: "HorloLearn - Formation horlogère suisse",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitter.site,
    creator: SITE.twitter.creator,
    title: SITE.title,
    description: SITE.description,
    images: [SITE.image],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;700&display=swap"
          as="style"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "HorloLearn",
              url: "https://www.horlolearn.ch",
              logo: "https://www.horlolearn.ch/og-image.svg",
              sameAs: [
                "https://www.linkedin.com/company/horlolearn/",
                "https://www.youtube.com/@horlolearn",
              ],
            }),
          }}
        />
      </head>

      <body className="bg-[#0b0c10] text-light-100 font-inter">
        <header className="border-b border-white/10 bg-[#1c1e26]/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
          <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
            <Link
              href="/"
              className="text-gold font-bebas text-3xl tracking-wide hover:text-[#f7d870]"
            >
              HorloLearn
            </Link>
            <div className="flex gap-6 text-light-200 text-sm uppercase">
              <Link href="/theorie" className="hover:text-gold">
                Théorie
              </Link>
              <Link href="/pratique" className="hover:text-gold">
                Pratique
              </Link>
              <Link href="/quiz" className="hover:text-gold">
                Quiz
              </Link>
              <Link href="/ressources" className="hover:text-gold">
                Ressources
              </Link>
              <Link href="/podcasts" className="hover:text-gold">
                Podcasts
              </Link>
            </div>
          </nav>
        </header>

        <main className="pt-24">{children}</main>

        <footer className="border-t border-white/10 mt-12 py-6 text-center text-light-200 text-sm">
          © 2025 HorloLearn · Design Atelier Horloger · Tous droits réservés
        </footer>
      </body>
    </html>
  );
}
