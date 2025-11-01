'use client'

import { useEffect, useRef } from 'react'
import Head from 'next/head'

export default function Page() {
  // Refs pour animations / parallax
  const heroRef = useRef<HTMLDivElement | null>(null)
  const countersRef = useRef<NodeListOf<Element> | null>(null)
  const revealRef = useRef<NodeListOf<Element> | null>(null)

  useEffect(() => {
    // ------- Navigation par onglets -------
    const tabBtns = document.querySelectorAll<HTMLButtonElement>('.mh-tab-btn')
    const sections = document.querySelectorAll<HTMLElement>('.mh-section[data-tab]')

    const activateTab = (tab: string) => {
      tabBtns.forEach((b) => {
        const isActive = b.dataset.tab === tab
        b.classList.toggle('mh-tab-active', isActive)
        b.setAttribute('aria-selected', String(isActive))
        b.tabIndex = isActive ? 0 : -1
      })
      sections.forEach((s) => {
        const show = s.dataset.tab === tab
        s.style.display = show ? 'block' : 'none'
        s.setAttribute('aria-hidden', String(!show))
      })
    }

    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.dataset.tab) activateTab(btn.dataset.tab)
      })
      btn.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && btn.dataset.tab) {
          e.preventDefault()
          activateTab(btn.dataset.tab)
        }
      })
    })

    // Activer l’onglet par défaut
    const defaultTab = document.querySelector<HTMLButtonElement>('.mh-tab-btn[data-default="true"]')
    activateTab(defaultTab?.dataset.tab || 'histoire')

    // ------- Compteurs animés -------
    countersRef.current = document.querySelectorAll('.mh-counter')
    const animateCounter = (el: HTMLElement) => {
      const target = Number(el.getAttribute('data-target') || '0')
      const duration = 1200
      const start = performance.now()
      const from = 0

      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration)
        const value = Math.floor(from + (target - from) * (1 - Math.pow(1 - p, 3))) // easeOutCubic
        el.textContent = value.toLocaleString('fr-CH')
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    // Lancer les compteurs au scroll (une seule fois)
    let countersPlayed = false
    const onCountersInView = () => {
      if (countersPlayed) return
      const anyVisible = Array.from(countersRef.current || []).some((el) => {
        const r = el.getBoundingClientRect()
        return r.top < window.innerHeight - 80
      })
      if (anyVisible) {
        countersPlayed = true
        ;(countersRef.current || []).forEach((el) => animateCounter(el as HTMLElement))
        window.removeEventListener('scroll', onCountersInView)
      }
    }
    window.addEventListener('scroll', onCountersInView, { passive: true })
    onCountersInView()

    // ------- Scroll reveal -------
    revealRef.current = document.querySelectorAll('.mh-reveal')
    const onReveal = () => {
      ;(revealRef.current || []).forEach((el) => {
        const r = (el as HTMLElement).getBoundingClientRect()
        if (r.top < window.innerHeight - 80) (el as HTMLElement).classList.add('mh-reveal-in')
      })
    }
    window.addEventListener('scroll', onReveal, { passive: true })
    onReveal()

    // ------- Parallaxe simple sur le hero -------
    const onScrollParallax = () => {
      if (!heroRef.current) return
      const y = window.scrollY
      heroRef.current.style.setProperty('--mh-parallax', `${Math.min(40, y * 0.15)}px`)
      heroRef.current.style.backgroundPosition = `center calc(50% + var(--mh-parallax))`
      const overlay = heroRef.current.querySelector<HTMLElement>('.mh-hero-overlay')
      if (overlay) overlay.style.opacity = String(Math.min(1, 0.25 + y / 1200))
    }
    window.addEventListener('scroll', onScrollParallax, { passive: true })
    onScrollParallax()

    // Nettoyage
    return () => {
      window.removeEventListener('scroll', onReveal)
      window.removeEventListener('scroll', onScrollParallax)
      window.removeEventListener('scroll', onCountersInView)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Matériaux Horlogers Suisses — Excellence & Innovation</title>
        <meta name="description" content="Histoire, matériaux, entreprises, formation et innovation — la référence sur les matériaux horlogers suisses." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Google Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* HERO */}
      <header ref={heroRef} className="mh-hero">
        <div className="mh-hero-overlay" />
        <div className="mh-container mh-hero-inner">
          <p className="mh-eyebrow">Horlogerie Suisse</p>
          <h1 className="mh-hero-title mh-reveal">
            Matériaux Horlogers Suisses
          </h1>
          <p className="mh-hero-sub mh-reveal">
            Excellence, précision et innovations — du XVI<sup>e</sup> siècle au XXI<sup>e</sup>.
          </p>

          <div className="mh-counters">
            <div className="mh-counter-card mh-reveal">
              <div className="mh-counter" data-target="500"></div>
              <p>ans d’histoire</p>
            </div>
            <div className="mh-counter-card mh-reveal">
              <div className="mh-counter" data-target="60"></div>
              <p>alliages & matériaux</p>
            </div>
            <div className="mh-counter-card mh-reveal">
              <div className="mh-counter" data-target="8"></div>
              <p>images thématiques</p>
            </div>
          </div>

          <nav className="mh-tabs" role="tablist" aria-label="Sections des matériaux">
            <button className="mh-tab-btn" data-tab="histoire" data-default="true" role="tab" aria-controls="tab-histoire">Histoire</button>
            <button className="mh-tab-btn" data-tab="materiaux" role="tab" aria-controls="tab-materiaux">Matériaux</button>
            <button className="mh-tab-btn" data-tab="entreprises" role="tab" aria-controls="tab-entreprises">Entreprises</button>
            <button className="mh-tab-btn" data-tab="formation" role="tab" aria-controls="tab-formation">Formation</button>
            <button className="mh-tab-btn" data-tab="innovation" role="tab" aria-controls="tab-innovation">Innovation</button>
          </nav>
        </div>
      </header>

      {/* CONTENU */}
      <main className="mh-main">
        {/* HISTOIRE */}
        <section id="tab-histoire" className="mh-section" data-tab="histoire" aria-hidden="true">
          <div className="mh-container">
            <div className="mh-grid-2">
              <div className="mh-card mh-reveal">
                <h2 className="mh-h2">Chronologie & Héritage</h2>
                <p>
                  De l’orfèvrerie genevoise du XVI<sup>e</sup> siècle aux super-alliages modernes, la Suisse a bâti un savoir-faire unique mêlant artisanat et science des matériaux.
                </p>
                <ul className="mh-list">
                  <li><b>XVI-XVII<sup>e</sup></b> — Or, argent, naissance de la maîtrise de Genève.</li>
                  <li><b>XVIII-XIX<sup>e</sup></b> — Laiton, aciers; Invar & Elinvar (Guillaume).</li>
                  <li><b>XX<sup>e</sup></b> — Standardisation; 316L, Nivarox, Glucydur.</li>
                  <li><b>XXI<sup>e</sup></b> — Titane, céramique, silicium, composites carbone.</li>
                </ul>
              </div>
              <figure className="mh-card mh-reveal">
                <img className="mh-image" src="/images/materiaux/chronologie_historique.png" alt="Chronologie historique des matériaux horlogers suisses" />
                <figcaption className="mh-legend">Timeline — XVI<sup>e</sup> → XXI<sup>e</sup></figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* MATERIAUX */}
        <section id="tab-materiaux" className="mh-section" data-tab="materiaux" aria-hidden="true">
          <div className="mh-container">
            <div className="mh-grid-2">
              <figure className="mh-card mh-reveal">
                <img className="mh-image" src="/images/materiaux/materials_dashboard.png" alt="Tableau des matériaux: précieux, aciers, alliages" />
                <figcaption className="mh-legend">Métaux précieux, aciers, alliages de précision</figcaption>
              </figure>
              <div className="mh-card mh-reveal">
                <h2 className="mh-h2">Socle traditionnel</h2>
                <ul className="mh-list">
                  <li><b>Or 18k</b> (2N/3N/4N/5N, rhodiage or gris) — boîtiers, rotors.</li>
                  <li><b>Platine 950</b> — densité, poli exigeant, séries d’exception.</li>
                  <li><b>Acier 316L</b> — corrosion, finitions (poli/satin/brossé).</li>
                  <li><b>904L</b> — résistance accrue, éclat spécifique.</li>
                  <li><b>Nivarox</b> (spiral), <b>Glucydur</b> (balancier) — cœur chronométrique.</li>
                </ul>
              </div>
            </div>

            <div className="mh-grid-2">
              <div className="mh-card mh-reveal">
                <h3 className="mh-h3">Matériaux high-tech</h3>
                <ul className="mh-list">
                  <li><b>Céramique (ZrO₂)</b> — quasi inrayable, couleurs stables.</li>
                  <li><b>Titane (Grade 2/5)</b> — léger, hypoallergénique.</li>
                  <li><b>Carbone forgé / TPT</b> — rigidité, motif unique.</li>
                  <li><b>Silicium / Silinvar®</b> — amagnétique, précision nanométrique.</li>
                  <li><b>Super-alliages</b> — BMG, Ceratanium®, composites hybrides.</li>
                </ul>
              </div>
              <figure className="mh-card mh-reveal">
                <img className="mh-image" src="/images/materiaux/materiaux_hightech_horlogerie.png" alt="Matériaux high-tech: céramique, titane, silicium, carbone" />
                <figcaption className="mh-legend">Céramique, titane, silicium, carbone</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ENTREPRISES */}
        <section id="tab-entreprises" className="mh-section" data-tab="entreprises" aria-hidden="true">
          <div className="mh-container">
            <div className="mh-grid-2">
              <figure className="mh-card mh-reveal">
                <img className="mh-image" src="/images/materiaux/entreprises_horlogeres_leaders.png" alt="Entreprises leaders de l’horlogerie suisse" />
                <figcaption className="mh-legend">Patek Philippe, Rolex, Audemars Piguet, OMEGA…</figcaption>
              </figure>
              <div className="mh-card mh-reveal">
                <h2 className="mh-h2">Leadership & R&D</h2>
                <ul className="mh-list">
                  <li><b>Patek Philippe</b> — Advanced Research, Spiromax®, Oscillomax®.</li>
                  <li><b>Rolex</b> — Cerachrom, Oystersteel (famille 904L), Everose.</li>
                  <li><b>AP</b> — Carbone forgé, céramiques polychromes.</li>
                  <li><b>OMEGA</b> — Si14, Master Chronometer (METAS).</li>
                  <li><b>ETA / Nivarox-FAR</b> — Nivachron™, Powermatic 80.</li>
                </ul>
              </div>
            </div>

            <div className="mh-grid-2">
              <div className="mh-card mh-reveal">
                <h3 className="mh-h3">Districts & filière</h3>
                <ul className="mh-list">
                  <li><b>Genève</b> — haute horlogerie, finitions, Poinçon de Genève.</li>
                  <li><b>Vallée de Joux</b> — grandes complications.</li>
                  <li><b>Le Locle / La Chaux-de-Fonds</b> — mouvements & sous-traitance.</li>
                  <li><b>Bienne / Granges</b> — groupes & composants majeurs.</li>
                </ul>
              </div>
              <figure className="mh-card mh-reveal">
                <img className="mh-image" src="/images/materiaux/districts_horlogers_suisse.png" alt="Carte des districts horlogers suisses" />
                <figcaption className="mh-legend">Arc jurassien — cluster industriel</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* FORMATION */}
        <section id="tab-formation" className="mh-section" data-tab="formation" aria-hidden="true">
          <div className="mh-container">
            <div className="mh-grid-2">
              <figure className="mh-card mh-reveal">
                <img className="mh-image" src="/images/materiaux/formation_horlogere_suisse.png" alt="Formation horlogère en Suisse" />
                <figcaption className="mh-legend">CFPT, ETVJ, CPNE, WOSTEP…</figcaption>
              </figure>
              <div className="mh-card mh-reveal">
                <h2 className="mh-h2">Transmission & excellence</h2>
                <ul className="mh-list">
                  <li><b>Système dual</b> — école + atelier (CFC, brevets).</li>
                  <li><b>Formations continues</b> — chronographes, polissage, normes.</li>
                  <li><b>Ateliers artisanaux</b> — anglage, côtes de Genève, perlage.</li>
                </ul>
                <figure className="mh-figure-tight">
                  <img className="mh-image" src="/images/materiaux/atelier_artisanal_traditionnel.png" alt="Atelier artisanal traditionnel" />
                  <figcaption className="mh-legend">Savoir-faire d’atelier</figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* INNOVATION */}
        <section id="tab-innovation" className="mh-section" data-tab="innovation" aria-hidden="true">
          <div className="mh-container">
            <div className="mh-grid-2">
              <div className="mh-card mh-reveal">
                <h2 className="mh-h2">Tendances & futur</h2>
                <ul className="mh-list">
                  <li><b>Matériaux intelligents</b> — amagnétiques, légers, stables.</li>
                  <li><b>Miniaturisation</b> — SiP, empilement 3D, efficience énergétique.</li>
                  <li><b>Durabilité</b> — filières responsables, recyclage métaux précieux.</li>
                  <li><b>Hybrides</b> — mécanique + capteurs (santé, performance).</li>
                </ul>
              </div>
              <figure className="mh-card mh-reveal">
                <img className="mh-image" src="/images/materiaux/innovation_horlogerie_futur.png" alt="Innovation horlogère: vision d’avenir" />
                <figcaption className="mh-legend">Innovation & positionnement mondial</figcaption>
              </figure>
            </div>
          </div>
        </section>
      </main>

      {/* PIED DE PAGE */}
      <footer className="mh-footer">
        <div className="mh-container mh-footer-inner">
          <p>Page autonome — Matériaux Horlogers Suisses</p>
          <p>Design : rouge suisse <span className="mh-dot" /> blanc — typographies Playfair Display & Inter</p>
        </div>
      </footer>

      {/* STYLES */}
      <style jsx global>{`
        :root {
          --mh-red: #DC143C;
          --mh-white: #ffffff;
          --mh-gray-50: #f9fafb;
          --mh-gray-200: #e5e7eb;
          --mh-gray-800: #1f2937;
          --mh-shadow: 0 8px 30px rgba(220, 20, 60, 0.15);
        }

        html, body {
          margin: 0;
          padding: 0;
          scroll-behavior: smooth;
          background: var(--mh-white);
        }

        .mh-container {
          width: min(1200px, 92%);
          margin: 0 auto;
        }

        /* HERO */
        .mh-hero {
          position: relative;
          background: url('/images/materiaux/materials_dashboard.png') center/cover no-repeat fixed;
          background-position: center calc(50% + var(--mh-parallax, 0px));
          color: var(--mh-white);
          padding: 120px 0 80px;
          isolation: isolate;
        }
        .mh-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.55));
          z-index: 0;
          transition: opacity .3s ease;
        }
        .mh-hero-inner {
          position: relative;
          z-index: 1;
          text-align: center;
        }
        .mh-eyebrow {
          display: inline-block;
          letter-spacing: .12em;
          text-transform: uppercase;
          font: 600 12px/1 Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(255,255,255,.12);
          backdrop-filter: blur(6px);
        }
        .mh-hero-title {
          margin: 18px 0 10px;
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 900;
          font-size: clamp(32px, 6vw, 56px);
          line-height: 1.05;
          text-shadow: 0 6px 30px rgba(0,0,0,.35);
        }
        .mh-hero-sub {
          margin: 0 auto 28px;
          max-width: 820px;
          font: 400 18px/1.6 Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          opacity: .95;
        }

        .mh-counters {
          margin: 26px auto 28px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          max-width: 860px;
        }
        .mh-counter-card {
          background: rgba(255,255,255,.12);
          border: 1px solid rgba(255,255,255,.22);
          box-shadow: 0 4px 20px rgba(0,0,0,.18);
          padding: 18px 16px;
          border-radius: 16px;
          backdrop-filter: blur(6px);
        }
        .mh-counter {
          font: 800 clamp(26px, 5vw, 40px)/1.1 'Playfair Display', Georgia, serif;
          letter-spacing: .02em;
        }
        .mh-counter-card p {
          margin: 6px 0 0;
          font: 500 13px/1.4 Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          opacity: .95;
        }

        /* Onglets */
        .mh-tabs {
          margin: 26px auto 0;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
        }
        .mh-tab-btn {
          appearance: none;
          border: 1px solid rgba(255,255,255,.35);
          background: rgba(255,255,255,.08);
          color: var(--mh-white);
          font: 600 14px/1 Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          padding: 10px 14px;
          border-radius: 999px;
          cursor: pointer;
          transition: all .2s ease;
          outline: none;
        }
        .mh-tab-btn:hover { transform: translateY(-1px); }
        .mh-tab-active,
        .mh-tab-btn[aria-selected="true"] {
          background: var(--mh-red);
          border-color: var(--mh-red);
          box-shadow: 0 10px 26px rgba(220, 20, 60, .35);
        }

        /* Sections */
        .mh-main { background: var(--mh-white); }
        .mh-section { padding: 64px 0; }
        .mh-h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 800;
          font-size: clamp(24px, 4.4vw, 34px);
          margin: 0 0 10px;
          color: #111;
        }
        .mh-h3 {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 700;
          font-size: clamp(18px, 3.4vw, 22px);
          margin: 0 0 10px;
          color: #111;
        }

        .mh-grid-2 {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .mh-card {
          background: var(--mh-gray-50);
          border: 1px solid var(--mh-gray-200);
          border-radius: 16px;
          box-shadow: var(--mh-shadow);
          padding: 18px;
        }

        .mh-list {
          margin: 0;
          padding-left: 18px;
          font: 400 16px/1.7 Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          color: #222;
        }
        .mh-list li { margin: 6px 0; }

        .mh-image {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 12px;
        }
        .mh-figure-tight { margin: 14px 0 0; }
        .mh-legend {
          margin: 8px 2px 0;
          font: 500 12px/1.3 Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          color: #555;
        }

        /* Reveal */
        .mh-reveal { opacity: 0; transform: translateY(10px); transition: opacity .5s ease, transform .5s ease; }
        .mh-reveal-in { opacity: 1; transform: translateY(0); }

        /* Footer */
        .mh-footer {
          background: #111;
          color: var(--mh-white);
          padding: 36px 0;
          margin-top: 10px;
        }
        .mh-footer-inner {
          text-align: center;
          font: 400 14px/1.7 Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          opacity: .95;
        }
        .mh-dot {
          display: inline-block;
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--mh-red);
          vertical-align: middle;
          margin: 0 6px;
          box-shadow: 0 0 0 3px rgba(220,20,60,.15);
        }

        /* Responsive */
        @media (max-width: 900px) {
          .mh-counters { grid-template-columns: 1fr; gap: 10px; }
          .mh-grid-2 { grid-template-columns: 1fr; }
          .mh-hero { padding: 96px 0 60px; }
        }
      `}</style>
    </>
  )
}
