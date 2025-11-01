'use client'

import { useEffect, useState } from 'react'

export default function MateriauxHorlogersSuisse() {
  const [htmlContent, setHtmlContent] = useState('')

  useEffect(() => {
    async function loadHTML() {
      try {
        // Charger ton fichier HTML depuis /public/
        const res = await fetch('/materiaux-horlogers-suisse.html')
        const data = await res.text()

        // Parser le HTML pour extraire le <body> et les styles
        const parser = new DOMParser()
        const doc = parser.parseFromString(data, 'text/html')

        // Injecter les <style> et <link rel="stylesheet"> dans le <head>
        doc.querySelectorAll('style, link[rel="stylesheet"]').forEach(tag => {
          const clone = tag.cloneNode(true)
          document.head.appendChild(clone)
        })

        // Injecter les scripts JS présents dans la page HTML
        doc.querySelectorAll('script').forEach(script => {
          const newScript = document.createElement('script')
          if (script.src) {
            newScript.src = script.src
          } else {
            newScript.textContent = script.textContent
          }
          document.body.appendChild(newScript)
        })

        // Mettre à jour le contenu principal
        setHtmlContent(doc.body.innerHTML)
      } catch (err) {
        console.error('Erreur lors du chargement de la page HTML :', err)
      }
    }

    loadHTML()
  }, [])

  if (!htmlContent) {
    return (
      <div
        style={{
          color: 'white',
          textAlign: 'center',
          marginTop: '100px',
          fontFamily: 'sans-serif',
        }}
      >
        Chargement...
      </div>
    )
  }

  return (
    <div>
      {/* Forcer le style d’arrière-plan et la couleur du texte */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Open+Sans:wght@400;500;600;700&display=swap');
        
        html, body, #__next, [data-nextjs-scroll-focus-boundary] {
          background: radial-gradient(ellipse at center, #7B1F34 0%, #521522 100%) !important;
          color: #F5F5F5 !important;
          min-height: 100vh;
          overflow-x: hidden;
          font-family: 'Open Sans', sans-serif !important;
        }

        h1, h2, h3, h4, h5, h6, p, span, li, a {
          color: #ffffff !important;
        }

        .hero, .section, .footer, .header {
          margin: 0 auto !important;
          max-width: 100vw !important;
          text-align: center !important;
        }

        .container, .hero-content {
          justify-content: center !important;
          align-items: center !important;
          text-align: center !important;
        }

        img {
          max-width: 100%;
          height: auto;
        }

        .btn, button {
          cursor: pointer;
        }
      `}</style>

      {/* Contenu HTML injecté depuis /public */}
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  )
}
