'use client'

import { useEffect, useState } from 'react'

export default function MateriauxHorlogersSuisse() {
  const [htmlContent, setHtmlContent] = useState('')

  useEffect(() => {
    async function loadHTML() {
      try {
        const res = await fetch('/materiaux-horlogers-suisse.html')
        const data = await res.text()

        const parser = new DOMParser()
        const doc = parser.parseFromString(data, 'text/html')

        // Injecte tous les <style> et <link> de ton HTML original dans <head>
        doc.querySelectorAll('style, link[rel="stylesheet"]').forEach(tag => {
          const clone = tag.cloneNode(true)
          document.head.appendChild(clone)
        })

        // Exécute les scripts éventuels
        doc.querySelectorAll('script').forEach(script => {
          const newScript = document.createElement('script')
          if (script.src) newScript.src = script.src
          else newScript.textContent = script.textContent
          document.body.appendChild(newScript)
        })

        // Charge le contenu principal
        setHtmlContent(doc.body.innerHTML)
      } catch (err) {
        console.error('Erreur lors du chargement HTML :', err)
      }
    }

    loadHTML()
  }, [])

  if (!htmlContent) {
    return (
      <div style={{ color: 'white', textAlign: 'center', marginTop: '100px' }}>
        Chargement...
      </div>
    )
  }

  return (
    <div>
      {/* === PATCH STYLE VISUEL HORLOLEARN === */}
      <style>{`
        html, body, #__next, [data-nextjs-scroll-focus-boundary] {
          background: linear-gradient(135deg, #4A0E19 0%, #25060C 100%) !important;
          color: #F8F8F8 !important;
          font-family: 'Inter', sans-serif !important;
          overflow-x: hidden !important;
        }

        .hero, .materials-section, .innovation-section, .ecosystem-section,
        .formation-section, .companies-section, .future-section, .global-section, .contact-section {
          background: transparent !important;
          color: #F5F5F5 !important;
        }

        h1, h2, h3, h4, h5, h6, p, span, li, a {
          color: #FFFFFF !important;
        }

        .material-card, .innovation-card, .highlight-box, .districts-details,
        .career-path, .company-card, .trend-card, .feature, .footer {
          background: rgba(255,255,255,0.05) !important;
          border-color: rgba(255,255,255,0.2) !important;
        }

        .navbar {
          background: rgba(0,0,0,0.6) !important;
          border-bottom: 1px solid rgba(255,255,255,0.15) !important;
          backdrop-filter: blur(20px) !important;
        }
        .nav-link {
          color: #F5F5F5 !important;
        }
        .nav-link:hover {
          color: #FFD700 !important;
        }

        .section-title, .material-card h3, .innovation-card h3 {
          color: #FFD700 !important;
        }

        .btn-primary {
          background: linear-gradient(135deg, #DC143C, #9C102A) !important;
          color: white !important;
        }
        .btn-secondary {
          border-color: #FFD700 !important;
          color: #FFD700 !important;
        }

        .footer {
          background: rgba(0,0,0,0.9) !important;
          color: #EAEAEA !important;
        }

        .benefit-item, .feature, .highlight-list li::before {
          color: #FFD700 !important;
        }

        [class*="bg-white"], [class*="bg-gray"], body.bg-white {
          background: transparent !important;
        }

        img {
          max-width: 100%;
          height: auto;
        }

        .btn, button {
          cursor: pointer;
        }
      `}</style>

      {/* === Contenu HTML importé depuis /public === */}
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  )
}
