'use client';

import Link from 'next/link';

const CASES = [
  {
    id: '01',
    category: 'Barillet & énergie',
    title: 'Le ressort de barillet qui saute',
    image: '/images/quiz/6497/barillet.png',
    error: 'Ressort non contenu, mauvaise prise ou sortie trop libre du tambour.',
    good: 'Maintenir la zone protégée, utiliser un outil adapté et contrôler le sens d’enroulement avant toute remise en place.',
    symptom: 'Le ressort se détend brutalement, sort du tambour ou se déforme.',
  },
  {
    id: '02',
    category: 'Rouage & ébats',
    title: 'Le pont de rouage refuse de descendre',
    image: '/images/quiz/6497/pont-roues.png',
    error: 'Serrer les vis alors qu’un pivot n’est pas engagé dans son rubis.',
    good: 'Poser le pont sans contrainte, centrer chaque pivot puis vérifier la liberté des mobiles avant serrage.',
    symptom: 'Le pont reste légèrement haut ou le train se bloque dès le serrage.',
  },
  {
    id: '03',
    category: 'Échappement & sécurité',
    title: 'L’ancre rebelle',
    image: '/images/quiz/6497/ancre.png',
    error: 'Corriger au hasard une palette ou forcer la fourchette sans observer les sécurités.',
    good: 'Contrôler les dégagements, le passage de la cheville, le dard et la symétrie des deux alternances.',
    symptom: 'Tic-tac irrégulier, arrêt net ou comportement asymétrique.',
  },
  {
    id: '04',
    category: 'Balancier & spiral',
    title: 'Le spiral en cône ou touchant le coq',
    image: '/images/quiz/6497/spiral.png',
    error: 'Retoucher immédiatement le spiral sans exclure magnétisme, pollution ou simple contact parasite.',
    good: 'Observer de face et de profil, vérifier planéité et concentricité, puis démagnétiser si nécessaire.',
    symptom: 'Amplitude faible, spires rapprochées ou frottement contre le coq / la raquette.',
  },
  {
    id: '05',
    category: 'Remontoir & mise à l’heure',
    title: 'La tige sort mal ou le coulant se déboîte',
    image: '/images/quiz/6497/pignon-coulant.png',
    error: 'Desserrer excessivement ou tirer sur la tige alors que la tirette n’est pas correctement libérée.',
    good: 'Identifier précisément l’organe de déverrouillage, maintenir la tirette et extraire la tige sans effort parasite.',
    symptom: 'La tige résiste, le remontoir se désorganise ou le pignon coulant quitte son logement.',
  },
  {
    id: '06',
    category: 'Aiguillage & friction',
    title: 'La chaussée est trop libre ou trop serrée',
    image: '/images/quiz/6497/mobile-de-centre.png',
    error: 'Modifier la friction sans soutien correct de la pièce ou appliquer un effort mal réparti.',
    good: 'Soutenir l’axe, intervenir progressivement et contrôler la friction après chaque correction.',
    symptom: 'Aiguilles qui glissent, mise à l’heure trop dure ou friction irrégulière.',
  },
];

export default function DepannagePage() {
  return (
    <main className="depannage-page">
      <style jsx global>{`
        .depannage-page {
          min-height: 100vh;
          background: var(--hl-bg, #f3efe7);
          color: var(--hl-ink, #171717);
        }
        .depannage-shell {
          width: min(1380px, calc(100% - 32px));
          margin: 0 auto;
        }
        .depannage-topbar {
          padding: 22px 0;
          border-bottom: 1px solid var(--hl-line, #d7d0c4);
        }
        .depannage-back {
          color: var(--hl-muted, #6f6a61);
          font-size: 13px;
        }
        .depannage-hero {
          padding: 82px 0 64px;
          border-bottom: 1px solid var(--hl-line, #d7d0c4);
        }
        .depannage-kicker {
          color: var(--hl-metal, #9c7a43);
          text-transform: uppercase;
          letter-spacing: .18em;
          font: 700 10px/1.2 ui-monospace, SFMono-Regular, Menlo, monospace;
          margin-bottom: 18px;
        }
        .depannage-title {
          margin: 0 0 24px;
          font-family: var(--font-editorial), 'Playfair Display', Georgia, serif;
          font-size: clamp(58px, 7vw, 112px);
          line-height: .87;
          letter-spacing: -.052em;
          font-weight: 500;
        }
        .depannage-title span { color: var(--hl-metal, #9c7a43); }
        .depannage-intro {
          max-width: 850px;
          color: var(--hl-muted, #6f6a61);
          font-size: 17px;
          line-height: 1.7;
        }
        .depannage-warning {
          margin-top: 28px;
          max-width: 900px;
          border: 1px solid var(--hl-line-strong, #bdb3a4);
          background: var(--hl-surface, #faf7f1);
          padding: 16px 18px;
          font-size: 13px;
          line-height: 1.6;
        }
        .depannage-grid {
          padding: 54px 0 90px;
          display: grid;
          gap: 24px;
        }
        .depannage-case {
          border: 1px solid var(--hl-line, #d7d0c4);
          background: var(--hl-surface, #faf7f1);
        }
        .depannage-case-head {
          padding: 22px 24px 18px;
          display: grid;
          grid-template-columns: 64px 1fr;
          gap: 18px;
          border-bottom: 1px solid var(--hl-line, #d7d0c4);
        }
        .depannage-num {
          color: var(--hl-metal, #9c7a43);
          font: 700 10px ui-monospace, SFMono-Regular, Menlo, monospace;
          letter-spacing: .14em;
          padding-top: 7px;
        }
        .depannage-category {
          color: var(--hl-metal, #9c7a43);
          font-size: 11px;
          letter-spacing: .12em;
          text-transform: uppercase;
          margin-bottom: 7px;
        }
        .depannage-case h2 {
          margin: 0;
          font: 500 clamp(28px, 3vw, 44px)/1.03 var(--font-editorial), 'Playfair Display', Georgia, serif;
          letter-spacing: -.035em;
        }
        .depannage-symptom {
          padding: 16px 24px;
          color: var(--hl-muted, #6f6a61);
          border-bottom: 1px solid var(--hl-line, #d7d0c4);
          font-size: 13px;
          line-height: 1.6;
        }
        .depannage-compare {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .depannage-state {
          min-width: 0;
          padding: 20px;
        }
        .depannage-state + .depannage-state {
          border-left: 1px solid var(--hl-line, #d7d0c4);
        }
        .depannage-state-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          font: 700 10px ui-monospace, SFMono-Regular, Menlo, monospace;
          letter-spacing: .13em;
          text-transform: uppercase;
        }
        .depannage-error .depannage-state-label { color: #b4232e; }
        .depannage-good .depannage-state-label { color: #2f714b; }
        .depannage-visual {
          position: relative;
          height: 320px;
          overflow: hidden;
          background: #0c0f12;
          border: 1px solid var(--hl-line, #d7d0c4);
        }
        .depannage-visual img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: contain;
          padding: 28px;
          background: radial-gradient(circle at 50% 45%, #272d32 0, #14181c 52%, #090b0d 100%);
        }
        .depannage-error .depannage-visual::after,
        .depannage-good .depannage-visual::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .depannage-error .depannage-visual::after {
          border: 3px solid rgba(180, 35, 46, .72);
          box-shadow: inset 0 -95px 80px rgba(105, 15, 24, .22);
        }
        .depannage-good .depannage-visual::after {
          border: 3px solid rgba(47, 113, 75, .72);
          box-shadow: inset 0 -95px 80px rgba(16, 74, 45, .18);
        }
        .depannage-focus {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 110px;
          height: 110px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          z-index: 2;
        }
        .depannage-error .depannage-focus {
          border: 2px solid #ef5964;
          box-shadow: 0 0 0 8px rgba(180, 35, 46, .12);
        }
        .depannage-good .depannage-focus {
          border: 2px solid #56b97c;
          box-shadow: 0 0 0 8px rgba(47, 113, 75, .12);
        }
        .depannage-state p {
          margin: 15px 2px 2px;
          color: var(--hl-muted, #6f6a61);
          line-height: 1.65;
          font-size: 13px;
        }
        .depannage-footer-note {
          padding: 30px 0 60px;
          color: var(--hl-muted, #6f6a61);
          font-size: 12px;
          border-top: 1px solid var(--hl-line, #d7d0c4);
        }
        html.dark .depannage-error .depannage-state-label { color: #ff7a86; }
        html.dark .depannage-good .depannage-state-label { color: #72d69a; }
        @media (max-width: 800px) {
          .depannage-hero { padding: 56px 0 46px; }
          .depannage-title { font-size: clamp(54px, 15vw, 78px); }
          .depannage-compare { grid-template-columns: 1fr; }
          .depannage-state + .depannage-state {
            border-left: 0;
            border-top: 1px solid var(--hl-line, #d7d0c4);
          }
          .depannage-visual { height: 290px; }
        }
      `}</style>

      <div className="depannage-topbar">
        <div className="depannage-shell">
          <Link href="/pratique" className="depannage-back">← Retour à Pratique</Link>
        </div>
      </div>

      <section className="depannage-hero">
        <div className="depannage-shell">
          <div className="depannage-kicker">Guide d’établi · Diagnostic visuel</div>
          <h1 className="depannage-title">Dépannage &<br /><span>Erreurs courantes.</span></h1>
          <p className="depannage-intro">
            Identifier le problème avant de toucher au mouvement. Chaque fiche oppose clairement le mauvais réflexe au bon geste, avec un visuel de la pièce concernée pour faciliter la compréhension à l’établi.
          </p>
          <div className="depannage-warning">
            <strong>Repères pédagogiques :</strong> les procédures, jeux, lubrifiants et réglages exacts dépendent du calibre. Toujours confirmer avec la documentation technique du mouvement concerné.
          </div>
        </div>
      </section>

      <section className="depannage-shell depannage-grid">
        {CASES.map((item) => (
          <article className="depannage-case" key={item.id}>
            <div className="depannage-case-head">
              <div className="depannage-num">CAS {item.id}</div>
              <div>
                <div className="depannage-category">{item.category}</div>
                <h2>{item.title}</h2>
              </div>
            </div>
            <div className="depannage-symptom"><strong>Symptôme :</strong> {item.symptom}</div>

            <div className="depannage-compare">
              <div className="depannage-state depannage-error">
                <div className="depannage-state-label">✕ Erreur à éviter</div>
                <div className="depannage-visual">
                  <img src={item.image} alt={`${item.title} — erreur à éviter`} />
                  <span className="depannage-focus" aria-hidden="true" />
                </div>
                <p>{item.error}</p>
              </div>

              <div className="depannage-state depannage-good">
                <div className="depannage-state-label">✓ Bon geste</div>
                <div className="depannage-visual">
                  <img src={item.image} alt={`${item.title} — bon geste`} />
                  <span className="depannage-focus" aria-hidden="true" />
                </div>
                <p>{item.good}</p>
              </div>
            </div>
          </article>
        ))}
      </section>

      <div className="depannage-footer-note">
        <div className="depannage-shell">HorloLearn · Guide indépendant de culture et pratique horlogère.</div>
      </div>
    </main>
  );
}
