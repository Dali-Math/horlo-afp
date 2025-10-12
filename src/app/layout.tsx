import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import Navbar from '@/components/Navbar'
import ScrollToTop from '@/components/ScrollToTop'

export const metadata = {
  title: 'HorloLearn – Horlogerie suisse moderne et immersive',
  description:
    "HorloLearn est une plateforme dédiée à la culture horlogère suisse. Découvrez la théorie, la pratique et l’histoire de l’horlogerie à travers des ressources accessibles, interactives et inspirantes.",
  keywords: [
    'horlogerie suisse',
    'formation horlogère',
    'culture horlogère',
    'apprentissage montre suisse',
    'pratique horlogère',
    'HorloLearn',
  ],
  openGraph: {
    title: 'HorloLearn – Horlogerie suisse moderne et immersive',
    description:
      "Explorez la culture horlogère suisse : théorie, pratique, métiers et innovations. Une plateforme immersive pour passionnés et apprentis horlogers.",
    url: 'https://horlolearn.ch',
    siteName: 'HorloLearn',
    locale: 'fr_CH',
    type: 'website',
    images: [
      {
        url: '/images/horlolearn-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'HorloLearn – Horlogerie suisse moderne et immersive',
      },
    ],
  },
  themeColor: '#E2B44F', // Doré principal
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <meta name="theme-color" content="#E2B44F" />
        <meta
          name="color-scheme"
          content="dark light"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="bg-[#0a0a0a] text-gray-100">
        <Navbar />
        {children}
        <Analytics />
        <ScrollToTop />
      </body>
    </html>
  )
}
