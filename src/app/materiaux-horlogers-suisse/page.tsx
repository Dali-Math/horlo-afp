'use client'

import { useEffect } from 'react'

export default function MateriauxHorlogersSuisse() {
  useEffect(() => {
    // Défilement fluide
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

    // Animation des stats
    const statNumbers = document.querySelectorAll('.stat-number')
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target') || '0')
      let current = 0
      const increment = target / 50
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        ;(stat as HTMLElement).textContent = Math.floor(current).toString()
      }, 30)
    })

    // Tabs
    const tabContainers = document.querySelectorAll('.tabs')
    tabContainers.forEach(container => {
      const tabs = container.querySelectorAll('.tab')
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.remove('active'))
          tab.classList.add('active')
        })
      })
    })
  }, [])

  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Open+Sans:wght@400;500;600;700&display=swap');
        * {margin:0;padding:0;box-sizing:border-box;}
        :root {
          --red-primary:#E1263A;--red-bordeaux:#7B1F34;--red-bordeaux-dark:#521522;
          --red-button:#E6004C;--red-dark:#A11A29;--white:#FFFFFF;
          --gray-dark:#343A40;--gray-light:#E0E0E0;--black:#1A1A1A;
        }
        body {font-family:'Open Sans',sans-serif;line-height:1.6;color:var(--gray-dark);background:var(--white);}
        .header{background:var(--black);position:fixed;top:0;left:0;right:0;z-index:1000;height:70px;}
        .header-content{max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;padding:0 30px;height:100%;}
        .logo{display:flex;align-items:center;gap:12px;text-decoration:none;}
        .logo-icon{width:32px;height:32px;background:var(--red-primary);position:relative;border-radius:4px;display:flex;align-items:center;justify-content:center;}
        .logo-icon::before,.logo-icon::after{content:'';position:absolute;background:var(--white);width:20px;height:3px;border-radius:2px;}
        .logo-icon::after{transform:rotate(90deg);}
        .logo-text{color:var(--white);font-family:'Playfair Display',serif;font-weight:600;font-size:1.1rem;}
        .nav{display:flex;gap:40px;list-style:none;}
        .nav-link{color:var(--white);text-decoration:none;font-weight:500;padding:8px 0;position:relative;transition:.3s;}
        .nav-link:hover,.nav-link.active{color:var(--red-primary);}
        .nav-link:hover::after,.nav-link.active::after{content:'';position:absolute;bottom:-2px;left:0;width:100%;height:2px;background:var(--red-primary);}
        section{padding:100px 0;}
        .hero{background:radial-gradient(ellipse at center,var(--red-bordeaux) 0%,var(--red-bordeaux-dark) 100%);min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;color:var(--white);padding-top:70px;}
        .hero-content{max-width:1000px;padding:0 30px;}
        .hero-title{font-family:'Playfair Display',serif;font-size:4rem;font-weight:700;margin-bottom:1rem;color:#F0F0F0;}
        .hero-subtitle{font-family:'Playfair Display',serif;font-size:2.5rem;font-weight:400;margin-bottom:2rem;color:#F0F0F0;}
        .hero-description{font-size:1.2rem;margin-bottom:4rem;color:#F0F0F0;max-width:800px;margin:0 auto;line-height:1.7;}
        .stats{display:grid;grid-template-columns:repeat(3,1fr);gap:30px;margin:4rem auto;max-width:900px;}
        .stat-card{background:rgba(123,31,52,0.5);backdrop-filter:blur(10px);padding:40px 30px;border-radius:16px;text-align:center;border:1px solid rgba(255,255,255,0.2);}
        .stat-number{font-family:'Playfair Display',serif;font-size:3.5rem;font-weight:700;margin-bottom:8px;color:#F0F0F0;}
        .stat-label{font-size:1rem;font-weight:500;color:#F0F0F0;}
        .hero-buttons{display:flex;gap:20px;justify-content:center;flex-wrap:wrap;margin-top:4rem;}
        .btn{padding:15px 30px;border-radius:8px;text-decoration:none;font-weight:600;font-size:1rem;transition:.3s;display:inline-flex;align-items:center;gap:8px;}
        .btn-primary{background:var(--red-button);color:var(--white);}
        .btn-primary:hover{background:#C2003D;transform:scale(1.05);}
        .btn-secondary{background:transparent;color:var(--white);border:2px solid var(--red-button);}
        .btn-secondary:hover{background:var(--red-button);transform:scale(1.05);}
        .section-title{font-family:'Playfair Display',serif;font-size:3rem;color:var(--red-primary);text-align:center;margin-bottom:1rem;font-weight:700;}
        .section-subtitle{text-align:center;font-size:1.3rem;color:var(--gray-dark);margin-bottom:4rem;max-width:600px;margin-left:auto;margin-right:auto;}
        .footer{background:var(--black);color:var(--white);padding:60px 0 20px;}
        .footer-content{max-width:1200px;margin:0 auto;padding:0 30px;}
        .footer-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:40px;margin-bottom:40px;}
        .footer-section h4{color:var(--red-primary);margin-bottom:20px;font-family:'Playfair Display',serif;font-size:1.3rem;}
        .footer-section a{color:var(--white);text-decoration:none;display:block;margin-bottom:10px;opacity:0.8;}
        .footer-section a:hover{opacity:1;}
        .footer-bottom{text-align:center;padding-top:30px;border-top:1px solid rgba(255,255,255,0.1);opacity:0.7;}
        @media(max-width:768px){.hero-title{font-size:2.5rem;}.hero-subtitle{font-size:1.8rem;}.stats{grid-template-columns:1fr;}}
      `}</style>

      <div
        dangerouslySetInnerHTML={{
          __html: `
          ${document.body.innerHTML ?? ''}
          `,
        }}
      />
    </div>
  )
}
