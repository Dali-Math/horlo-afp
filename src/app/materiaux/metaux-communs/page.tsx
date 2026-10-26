'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type LegacyMaterial = {
  name: string;
  period: string;
  technical: string;
  uses: string[];
};

const LEGACY_MATERIALS: LegacyMaterial[] = [
  { name: 'Acier inoxydable', period: 'XXe siècle', technical: '316L (acier chirurgical), résistance à la corrosion supérieure, polissage miroir ou brossage satiné', uses: ['Boîtiers & bracelets', 'Couronnes vissées', 'Boucles déployantes', 'Masses oscillantes'] },
  { name: 'Or', period: 'XVIe siècle', technical: 'Or 18K (75% or pur), alliages jaune, rose ou blanc, poids spécifique élevé', uses: ['Boîtiers de prestige', 'Aiguilles et index', 'Ponts décorés', 'Bracelets de luxe'] },
  { name: 'Laiton', period: 'XVIIIe siècle', technical: 'Alliage Cu/Zn, excellente usinabilité, traitement rhodiage ou galvanoplastie', uses: ['Platines & ponts', 'Roues de minuterie', 'Ébauches décoratives', 'Compteurs et modules'] },
  { name: 'Titane', period: 'XXe siècle', technical: 'Grade 2 ou Grade 5, densité 4.5 g/cm³, biocompatible, traitement PVD possible', uses: ['Boîtiers techniques', 'Bracelets légers', 'Vis spéciales', 'Platines allégées'] },
  { name: 'Céramique', period: 'XXIe siècle', technical: 'Zircone (ZrO2), dureté 1200–1400 HV, frittage haute température, forte résistance aux rayures', uses: ['Lunettes', 'Boîtiers haut de gamme', 'Composants décoratifs'] },
  { name: 'Silicium', period: 'XXIe siècle', technical: 'Monocristallin, procédé DRIE, élasticité élevée, insensible aux champs magnétiques', uses: ['Spiraux', 'Ancres', 'Roues d’échappement'] },
  { name: 'Rubis synthétique', period: 'XVIIIe siècle', technical: 'Corindon synthétique (Al2O3), dureté 9 Mohs, faible coefficient de friction', uses: ['Pierres de pivot', 'Balancier', 'Ancre'] },
  { name: 'Bois', period: 'Contemporain', technical: 'Bois nobles tels qu’ébène ou palissandre, stabilisés et traités contre l’humidité', uses: ['Cadrans exclusifs', 'Éléments décoratifs', 'Maquettes pédagogiques'] },
  { name: 'Platine', period: 'XIXe siècle', technical: 'Pt 950 (95% platine pur), densité 21.5 g/cm³, hypoallergénique, éclat gris argenté', uses: ['Boîtiers de haute horlogerie', 'Masses oscillantes', 'Éditions limitées'] },
  { name: 'Saphir', period: 'XXe siècle', technical: 'Corindon synthétique transparent, dureté 9 Mohs, traitements anti-reflet possibles', uses: ['Glaces', 'Fonds transparents', 'Composants de précision'] },
  { name: 'Carbone', period: 'XXIe siècle', technical: 'NTPT ou forged carbon, densité faible et rigidité élevée', uses: ['Boîtiers sportifs', 'Cadrans techniques', 'Composants allégés'] },
  { name: 'Bronze', period: 'Contemporain', technical: 'Alliage Cu/Sn, oxydation naturelle contrôlée et patine évolutive', uses: ['Boîtiers', 'Lunettes plongeuses', 'Éditions spéciales'] },
];

export default function MetauxCommunsPage() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const iframeObserverRef = useRef<MutationObserver | null>(null);
  const themeObserverRef = useRef<MutationObserver | null>(null);
  const [frameHeight, setFrameHeight] = useState(1600);

  const syncFrame = () => {
    const frame = frameRef.current;
    const doc = frame?.contentDocument;
    if (!frame || !doc) return;

    const applyTheme = () => {
      const parentStyles = window.getComputedStyle(document.documentElement);
      const root = doc.documentElement;
      const value = (name: string, fallback: string) => parentStyles.getPropertyValue(name).trim() || fallback;

      root.style.setProperty('--horlo-bg', value('--hl-bg', '#f3efe7'));
      root.style.setProperty('--horlo-bg-soft', value('--hl-bg-soft', '#ebe5da'));
      root.style.setProperty('--horlo-surface', value('--hl-surface', '#faf7f1'));
      root.style.setProperty('--horlo-surface-strong', value('--hl-surface-strong', '#ffffff'));
      root.style.setProperty('--horlo-ink', value('--hl-ink', '#171717'));
      root.style.setProperty('--horlo-muted', value('--hl-muted', '#6f6a61'));
      root.style.setProperty('--horlo-line', value('--hl-line', '#d7d0c4'));
      root.style.setProperty('--horlo-line-strong', value('--hl-line-strong', '#bdb3a4'));
      root.style.setProperty('--horlo-metal', value('--hl-metal', '#9c7a43'));
      root.style.setProperty('--horlo-metal-soft', value('--hl-metal-soft', '#c5a66f'));
      root.style.setProperty('--horlo-accent-ink', document.documentElement.classList.contains('dark') ? '#0b0e11' : '#ffffff');
    };

    let style = doc.getElementById('horlolearn-integration-style') as HTMLStyleElement | null;
    if (!style) {
      style = doc.createElement('style');
      style.id = 'horlolearn-integration-style';
      style.textContent = `
        :root {
          --swiss-red: var(--horlo-metal) !important;
          --gray-50: var(--horlo-bg-soft) !important;
          --gray-100: var(--horlo-surface) !important;
          --gray-200: var(--horlo-line) !important;
          --gray-300: var(--horlo-line-strong) !important;
          --gray-400: var(--horlo-muted) !important;
          --gray-500: var(--horlo-muted) !important;
          --gray-600: var(--horlo-muted) !important;
          --gray-700: var(--horlo-ink) !important;
          --gray-800: var(--horlo-ink) !important;
          --gray-900: var(--horlo-surface-strong) !important;
        }

        .navbar,
        .contact-section,
        .footer {
          display: none !important;
        }

        html, body {
          overflow: hidden !important;
          background: var(--horlo-bg) !important;
          color: var(--horlo-ink) !important;
        }

        body { padding-top: 0 !important; }

        .hero {
          min-height: 760px !important;
          height: 760px !important;
          max-height: 760px !important;
          background: #0b0e11 !important;
        }

        .hero-background {
          height: 100% !important;
          background:
            radial-gradient(circle at 72% 30%, rgba(194,163,109,.20), transparent 34%),
            linear-gradient(135deg, #090b0e 0%, #11161b 52%, #171b21 100%) !important;
        }

        .hero-overlay {
          height: 100% !important;
          background: linear-gradient(135deg, rgba(0,0,0,.12), rgba(0,0,0,.46)) !important;
        }

        .hero-content {
          position: relative !important;
          z-index: 2 !important;
          opacity: 1 !important;
          transform: none !important;
          animation: none !important;
          margin: 0 auto !important;
        }

        .hero-badge,
        .stat-item {
          border-radius: 2px !important;
          border-color: rgba(220,193,142,.25) !important;
          background: rgba(255,255,255,.055) !important;
        }

        .title-main,
        .stat-number {
          color: #f1ede5 !important;
          -webkit-text-fill-color: #f1ede5 !important;
          background: none !important;
        }

        .title-sub,
        .hero-description,
        .stat-label { color: #c9c2b8 !important; }

        .btn { border-radius: 2px !important; }
        .btn-primary {
          background: var(--horlo-metal) !important;
          color: var(--horlo-accent-ink) !important;
        }
        .btn-secondary {
          color: #dcc18e !important;
          border-color: #c2a36d !important;
        }
        .btn-secondary:hover {
          background: #c2a36d !important;
          color: #0b0e11 !important;
        }

        .executive-summary,
        .timeline-section,
        .materials-section,
        .innovation-section,
        .ecosystem-section,
        .formation-section,
        .companies-section,
        .future-section {
          background: var(--horlo-bg) !important;
          color: var(--horlo-ink) !important;
        }

        .executive-summary:nth-of-type(even),
        .ecosystem-section,
        .companies-section,
        .future-section {
          background: var(--horlo-bg-soft) !important;
        }

        .section-title,
        .highlight-box h3,
        .card-content h3,
        .district-info h3,
        .school-card h3,
        .career-path h3,
        .company-card h3,
        .trend-item h3,
        .material-header h3,
        .district-specialties h4,
        .district-companies h4,
        .material-applications h4,
        .material-showcase h4 {
          color: var(--horlo-metal) !important;
        }

        .section-divider {
          background: var(--horlo-metal) !important;
          height: 1px !important;
          border-radius: 0 !important;
        }

        .section-description,
        p,
        .lead,
        li,
        .property-label,
        .property-value {
          color: var(--horlo-muted) !important;
        }

        .highlight-box,
        .timeline-details,
        .material-card,
        .innovation-card,
        .districts-details,
        .school-card,
        .career-path,
        .company-card,
        .trend-details,
        .trend-card,
        .feature,
        .benefit-item,
        .innovation-item,
        .info-card {
          background: var(--horlo-surface) !important;
          color: var(--horlo-ink) !important;
          border-color: var(--horlo-line) !important;
          border-radius: 2px !important;
          box-shadow: none !important;
        }

        .highlight-box { border-left-color: var(--horlo-metal) !important; }
        .innovation-item { border-left-color: var(--horlo-metal) !important; }

        .tab-btn,
        .district-tabs .tab-btn,
        .trend-tabs .tab-btn,
        .timeline-tabs .tab-btn,
        .materials-tabs .tab-btn {
          background: var(--horlo-surface) !important;
          color: var(--horlo-ink) !important;
          border: 1px solid var(--horlo-line) !important;
          border-radius: 2px !important;
          box-shadow: none !important;
        }

        .tab-btn.active,
        .district-tabs .tab-btn.active,
        .trend-tabs .tab-btn.active,
        .timeline-tabs .tab-btn.active,
        .materials-tabs .tab-btn.active {
          background: var(--horlo-metal) !important;
          color: var(--horlo-accent-ink) !important;
          border-color: var(--horlo-metal) !important;
        }

        .company-tag,
        .specialty,
        .step-number,
        .swiss-badge {
          background: var(--horlo-metal) !important;
          color: var(--horlo-accent-ink) !important;
          border-radius: 2px !important;
        }

        .trend-item { display: none !important; }
        .trend-item.active { display: block !important; }
        .district-info { display: none !important; }
        .district-info.active { display: block !important; }

        .map-overlay {
          background: linear-gradient(transparent, rgba(9,11,14,.88)) !important;
        }

        .scroll-indicator { bottom: 28px !important; }

        @media (max-width: 768px) {
          .hero {
            min-height: 660px !important;
            height: 660px !important;
            max-height: 660px !important;
          }
          .hero-content { padding: 1.25rem !important; }
        }
      `;
      doc.head.appendChild(style);
    }

    applyTheme();

    const bindTabs = () => {
      doc.querySelectorAll<HTMLButtonElement>('.district-tabs .tab-btn').forEach((button) => {
        if (button.dataset.horlolearnBound === '1') return;
        button.dataset.horlolearnBound = '1';
        button.addEventListener('click', () => {
          const id = button.dataset.district;
          if (!id) return;
          doc.querySelectorAll('.district-tabs .tab-btn').forEach((item) => item.classList.remove('active'));
          doc.querySelectorAll('.district-info').forEach((item) => item.classList.remove('active'));
          button.classList.add('active');
          doc.getElementById(id)?.classList.add('active');
          window.setTimeout(updateHeight, 20);
        });
      });

      doc.querySelectorAll<HTMLButtonElement>('.trend-tabs .tab-btn').forEach((button) => {
        if (button.dataset.horlolearnBound === '1') return;
        button.dataset.horlolearnBound = '1';
        button.addEventListener('click', () => {
          const id = button.dataset.trend;
          if (!id) return;
          doc.querySelectorAll('.trend-tabs .tab-btn').forEach((item) => item.classList.remove('active'));
          doc.querySelectorAll('.trend-item').forEach((item) => item.classList.remove('active'));
          button.classList.add('active');
          doc.getElementById(id)?.classList.add('active');
          window.setTimeout(updateHeight, 20);
        });
      });
    };

    const hideMiniMaxBranding = () => {
      const elements = Array.from(doc.querySelectorAll<HTMLElement>('body *'));
      for (const element of elements) {
        const text = element.textContent?.trim() ?? '';
        if (!text.includes('Created by MiniMax Agent')) continue;
        let candidate: HTMLElement | null = element;
        for (let i = 0; i < 5 && candidate; i += 1) {
          if (doc.defaultView?.getComputedStyle(candidate).position === 'fixed') {
            candidate.style.setProperty('display', 'none', 'important');
            break;
          }
          candidate = candidate.parentElement;
        }
      }
    };

    const updateHeight = () => {
      const bodyHeight = doc.body?.scrollHeight ?? 0;
      const rootHeight = doc.documentElement?.scrollHeight ?? 0;
      const nextHeight = Math.max(bodyHeight, rootHeight, 1200);
      setFrameHeight(nextHeight + 8);
    };

    bindTabs();
    hideMiniMaxBranding();
    updateHeight();

    resizeObserverRef.current?.disconnect();
    if (typeof ResizeObserver !== 'undefined' && doc.body) {
      resizeObserverRef.current = new ResizeObserver(updateHeight);
      resizeObserverRef.current.observe(doc.body);
    }

    iframeObserverRef.current?.disconnect();
    iframeObserverRef.current = new MutationObserver(() => {
      bindTabs();
      hideMiniMaxBranding();
      updateHeight();
    });
    iframeObserverRef.current.observe(doc.body, { childList: true, subtree: true });

    themeObserverRef.current?.disconnect();
    themeObserverRef.current = new MutationObserver(applyTheme);
    themeObserverRef.current.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    doc.querySelectorAll('img').forEach((image) => {
      if (!image.complete) image.addEventListener('load', updateHeight, { once: true });
    });

    window.setTimeout(updateHeight, 150);
    window.setTimeout(updateHeight, 500);
    window.setTimeout(updateHeight, 1200);
  };

  useEffect(() => {
    return () => {
      resizeObserverRef.current?.disconnect();
      iframeObserverRef.current?.disconnect();
      themeObserverRef.current?.disconnect();
    };
  }, []);

  return (
    <main className="materials-report-shell">
      <div className="materials-report-topbar">
        <div className="materials-report-wrap">
          <Link href="/materiaux" className="materials-report-back">
            <span aria-hidden="true">←</span>
            <span>Retour aux matériaux</span>
          </Link>
          <div className="materials-report-meta">Rapport complet · Matériaux horlogers suisses</div>
        </div>
      </div>

      <iframe
        ref={frameRef}
        src="/materiaux-horlogers-suisse.html"
        title="Excellence et innovation dans les matériaux horlogers suisses"
        className="materials-report-frame"
        style={{ height: `${frameHeight}px` }}
        onLoad={syncFrame}
      />

      <section className="legacy-materials">
        <div className="materials-report-wrap legacy-materials-inner">
          <header className="legacy-head">
            <div className="legacy-index">HORLOLEARN · RÉPERTOIRE TECHNIQUE</div>
            <h2>Les matériaux,<br /><em>du composant à l’usage.</em></h2>
            <p>Cette section reprend le contenu technique de l’ancienne page HorloLearn et remplace le formulaire Newsletter et le footer Minimax.</p>
          </header>

          <div className="legacy-list">
            {LEGACY_MATERIALS.map((material, index) => (
              <article className="legacy-row" key={material.name}>
                <span className="legacy-no">{String(index + 1).padStart(2, '0')}</span>
                <div className="legacy-name"><h3>{material.name}</h3><span>{material.period}</span></div>
                <p>{material.technical}</p>
                <div className="legacy-uses">{material.uses.map((use) => <span key={use}>{use}</span>)}</div>
              </article>
            ))}
          </div>

          <div className="legacy-closing">
            <div><span>Approfondir</span><strong>Comparatifs, PDF et cartes flash.</strong></div>
            <Link href="/materiaux/guide-complet">Ouvrir le guide complet →</Link>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .materials-report-shell{min-height:100vh;background:var(--hl-bg);color:var(--hl-ink)}
        .materials-report-topbar{position:relative;z-index:2;border-top:1px solid var(--hl-line);border-bottom:1px solid var(--hl-line);background:var(--hl-bg)}
        .materials-report-wrap{width:min(1400px,calc(100% - 40px));margin:0 auto}
        .materials-report-topbar .materials-report-wrap{min-height:62px;display:flex;align-items:center;justify-content:space-between;gap:24px}
        .materials-report-back{display:inline-flex;align-items:center;gap:10px;color:var(--hl-ink);font-size:13px;font-weight:600;text-decoration:none}
        .materials-report-back span:first-child{color:var(--hl-metal);font-size:18px}.materials-report-back:hover{color:var(--hl-metal)}
        .materials-report-meta{color:var(--hl-muted);font:9px/1.3 ui-monospace,SFMono-Regular,Menlo,monospace;text-transform:uppercase;letter-spacing:.12em;text-align:right}
        .materials-report-frame{display:block;width:100%;min-height:1200px;border:0;background:var(--hl-bg)}
        .legacy-materials{background:var(--hl-bg);border-top:1px solid var(--hl-line);padding:110px 0 120px}
        .legacy-head{display:grid;grid-template-columns:170px minmax(0,1fr) minmax(280px,.55fr);gap:38px;align-items:start;margin-bottom:54px}
        .legacy-index{color:var(--hl-metal);font:9px/1.45 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.14em;padding-top:10px}
        .legacy-head h2{margin:0;font:500 clamp(48px,5.4vw,82px)/.9 Georgia,'Times New Roman',serif;letter-spacing:-.045em}.legacy-head h2 em{font-style:normal;color:var(--hl-metal)}
        .legacy-head p{margin:0;padding-top:16px;border-top:1px solid var(--hl-line);color:var(--hl-muted);font-size:13px;line-height:1.7}
        .legacy-list{border-top:1px solid var(--hl-line)}
        .legacy-row{display:grid;grid-template-columns:55px minmax(180px,.7fr) minmax(260px,1.15fr) minmax(260px,1fr);gap:24px;align-items:center;padding:24px 0;border-bottom:1px solid var(--hl-line)}
        .legacy-no{color:var(--hl-metal);font:9px monospace}.legacy-name h3{margin:0;font:500 24px/1.05 Georgia,serif}.legacy-name span{display:block;margin-top:6px;color:var(--hl-muted);font:8px monospace;text-transform:uppercase;letter-spacing:.11em}
        .legacy-row p{margin:0;color:var(--hl-muted);font-size:12.5px;line-height:1.65}.legacy-uses{display:flex;flex-wrap:wrap;gap:6px}.legacy-uses span{border:1px solid var(--hl-line);padding:6px 8px;color:var(--hl-muted);font-size:10px;line-height:1.2}
        .legacy-closing{margin-top:54px;padding:28px 0;border-top:1px solid var(--hl-line);border-bottom:1px solid var(--hl-line);display:flex;justify-content:space-between;align-items:center;gap:30px}.legacy-closing span{display:block;color:var(--hl-metal);font:9px monospace;text-transform:uppercase;letter-spacing:.12em}.legacy-closing strong{display:block;margin-top:7px;font:500 27px Georgia,serif}.legacy-closing a{color:var(--hl-metal);font:9px monospace;text-transform:uppercase;letter-spacing:.12em}
        @media(max-width:960px){.legacy-head{grid-template-columns:1fr}.legacy-row{grid-template-columns:45px 1fr}.legacy-row p,.legacy-uses{grid-column:2}.legacy-closing{align-items:flex-start;flex-direction:column}}
        @media(max-width:720px){.materials-report-wrap{width:min(100% - 28px,1400px)}.materials-report-topbar .materials-report-wrap{min-height:54px}.materials-report-meta{display:none}.legacy-materials{padding:80px 0}.legacy-row{gap:12px}.legacy-name h3{font-size:21px}}
      `}</style>
    </main>
  );
}
