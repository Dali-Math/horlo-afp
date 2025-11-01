'use client'

import { useEffect, useState } from 'react'

export default function MateriauxHorlogersSuisse() {
  const [htmlContent, setHtmlContent] = useState('')

  useEffect(() => {
    fetch('/materiaux-horlogers-suisse.html')
      .then((res) => res.text())
      .then((data) => setHtmlContent(data))
      .catch((err) => console.error('Erreur de chargement du HTML :', err))
  }, [])

  if (!htmlContent) {
    return <div style={{ color: 'white', textAlign: 'center', marginTop: '100px' }}>Chargement...</div>
  }

  return (
    <div>
      <style>{`
        html, body {
          background-color: #1A1A1A !important;
          color: #F5F5F5 !important;
          font-family: 'Open Sans', sans-serif !important;
          text-align: center;
          overflow-x: hidden;
        }
        section, .hero, .header, .footer {
          margin: 0 auto !important;
          max-width: 100vw !important;
        }
        .hero-content, .section {
          text-align: center !important;
          justify-content: center !important;
          align-items: center !important;
        }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  )
}
