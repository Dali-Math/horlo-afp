import './globals.css'
import { Analytics } from '@vercel/analytics/react'

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
        {children}
        <Analytics />
      </body>
    </html>
  )
}
