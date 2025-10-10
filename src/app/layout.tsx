import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import Navbar from '@/components/Navbar'
import ScrollToTop from '@/components/ScrollToTop'

export const metadata = {
  title: 'Horlo-AFP',
  description: 'Apprentissage et pratique horlogère en ligne',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        {children}
        <Analytics />
        <ScrollToTop />
      </body>
    </html>
  )
}
