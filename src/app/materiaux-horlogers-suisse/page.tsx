'use client'

import { useEffect, useState } from 'react'

export default function MateriauxHorlogersSuisse() {
  const [htmlContent, setHtmlContent] = useState('')

  useEffect(() => {
    // Charger dynamiquement le HTML depuis /public
    fetch('/materiaux-horlogers-suisse.html')
      .then((res) => res.text())
      .then((data) => setHtmlContent(data))
      .catch((err) => console.error('Erreur de chargement du HTML :', err))

    // Défilement fluide
    setTimeout(() => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          e.preventDefault()
          const href = (anchor as HTMLAnchorElement).getAttribute('href')
          if (!href) return
          const target = document.querySelector(href)
          if (target) {
            const offsetTop = (target as HTMLElement).offsetTop - 70
            window.scrollTo({ top: offsetTop, behavior: 'smooth' })
          }
        })
      })
    }, 500)
  }, [])

  if (!htmlContent) {
    return <div style={{ color: 'white', textAlign: 'center', marginTop: '100px' }}>Chargement...</div>
  }

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  )
}
