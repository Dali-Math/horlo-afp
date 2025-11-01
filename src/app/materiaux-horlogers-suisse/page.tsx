'use client'

import { useEffect, useState } from 'react'

export default function MateriauxHorlogersSuisse() {
  const [htmlContent, setHtmlContent] = useState('')

  useEffect(() => {
    // Charger dynamiquement le HTML
    fetch('/materiaux-horlogers-suisse.html')
      .then(res => res.text())
      .then(data => {
        // Extraire le CSS interne et l'injecter dans <head>
        const parser = new DOMParser()
        const doc = parser.parseFromString(data, 'text/html')
        const styleTags = doc.querySelectorAll('style, link[rel="stylesheet"]')

        styleTags.forEach(tag => {
          document.head.appendChild(tag)
        })

        // Garder uniquement le corps pour le rendu
        setHtmlContent(doc.body.innerHTML)
      })
      .catch(err => console.error('Erreur de chargement du HTML :', err))
  }, [])

  if (!htmlContent) {
    return <div style={{ color: 'white', textAlign: 'center', marginTop: '100px' }}>Chargement...</div>
  }

  return (
    <div
      style={{
        width: '100%',
        overflowX: 'hidden',
        backgroundColor: '#1a1a1a',
      }}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}
