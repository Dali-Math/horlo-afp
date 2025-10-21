'use client';

import './globals.css';
import { metadata } from './metadata';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { Analytics } from '@vercel/analytics/react';
import JsonLd from '@/components/JsonLd';
import ThemeProvider from '@/components/ThemeProvider';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'HorloLearn',
    url: 'https://www.horlolearn.ch',
    logo: 'https://www.horlolearn.ch/og-image.jpg',
    description:
      "HorloLearn est une organisation suisse indépendante dédiée aux passionnés d'horlogerie. Elle propose des fiches techniques, quiz, vidéos et ressources pour découvrir et comprendre les savoir-faire horlogers, sans offrir de formation officielle.",
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CH',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        email: 'contact.horlogeries@gmail.com',
        contactType: 'information',
        availableLanguage: ['fr-CH', 'fr', 'en'],
      },
    ],
    sameAs: [
      'https://github.com/Dali-Math',
      'https://www.youtube.com/@HorloLearn',
      'https://www.linkedin.com/in/...',
    ],
  };

  const siteSearch = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://www.horlolearn.ch',
    name: 'HorloLearn',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.horlolearn.ch/recherche?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="bg-light-100 text-slate-900 dark:bg-dark-900 dark:text-light-100 transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AnimatePresence mode="wait" initial={false}>
            {/* ✅ Navbar et Footer gérés UNIQUEMENT ici */}
            <Navbar />
            <main key={pathname}>{children}</main>
            <Footer />

            {/* ✅ Utilitaires globaux */}
            <ScrollToTop />
            <Analytics />

            {/* ✅ Données structurées pour SEO */}
            <JsonLd data={org} />
            <JsonLd data={siteSearch} />
          </AnimatePresence>
        </ThemeProvider>
      </body>
    </html>
  );
}
