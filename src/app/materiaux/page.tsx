'use client';

import { useState } from 'react';
import Link from 'next/link';

type Material = {
  id: string;
  name: string;
  category: 'Classiques' | 'Innovation' | 'Décoratif';
  image: string;
  description: string;
  uses: string;
};

const MATERIALS: Material[] = [
  { id: '01', name: 'Acier inoxydable', category: 'Classiques', image: '/images/materiaux/acier.jpg', description: 'Le matériau le plus utilisé pour les boîtiers et bracelets modernes. Résistant à la corrosion, robuste et adapté aux finitions polies ou brossées.', uses: 'Boîtiers · bracelets · couronnes · boucles' },
  { id: '02', name: 'Or', category: 'Classiques', image: '/images/materiaux/or.jpg', description: 'Métal précieux emblématique de l’horlogerie de prestige, travaillé en alliages jaune, rose ou blanc.', uses: 'Boîtiers · aiguilles · index · bracelets' },
  { id: '03', name: 'Laiton', category: 'Classiques', image: '/images/materiaux/laiton.jpg', description: 'Alliage de cuivre et zinc, très présent dans les platines, ponts et roues grâce à son excellente usinabilité.', uses: 'Platines · ponts · roues · ébauches' },
  { id: '04', name: 'Titane', category: 'Innovation', image: '/images/materiaux/titane.jpg', description: 'Matériau technique léger et résistant, apprécié dans les montres sportives et professionnelles.', uses: 'Boîtiers · bracelets · vis · platines' },
  { id: '05', name: 'Céramique', category: 'Innovation', image: '/images/materiaux/ceramique.jpg', description: 'Matériau très dur et résistant à l’usure, utilisé pour les lunettes, boîtiers et éléments décoratifs contemporains.', uses: 'Lunettes · boîtiers · composants décoratifs' },
  { id: '06', name: 'Silicium', category: 'Innovation', image: '/images/materiaux/silicium.jpg', description: 'Matériau issu de la microtechnologie, précis et amagnétique, utilisé dans certains composants d’échappement.', uses: 'Spiraux · ancres · roues d’échappement' },
  { id: '07', name: 'Rubis synthétique', category: 'Classiques', image: '/images/materiaux/rubis.jpg', description: 'Corindon synthétique utilisé comme palier antifriction pour réduire l’usure des pivots et améliorer la longévité du mouvement.', uses: 'Pierres de pivot · ancre · balancier' },
  { id: '08', name: 'Bois', category: 'Décoratif', image: '/images/materiaux/bois.jpg', description: 'Matériau rare en horlogerie, principalement employé pour certains cadrans ou éléments décoratifs.', uses: 'Cadrans · inserts · décor' },
  { id: '09', name: 'Platine', category: 'Classiques', image: '/images/materiaux/platine.jpg', description: 'Métal précieux dense et rare, réservé à certaines pièces de haute horlogerie.', uses: 'Boîtiers · masses oscillantes · éditions spéciales' },
  { id: '10', name: 'Saphir', category: 'Innovation', image: '/images/materiaux/saphir.jpg', description: 'Corindon synthétique transparent à forte dureté, utilisé pour les glaces et fonds transparents.', uses: 'Glaces · fonds · composants transparents' },
  { id: '11', name: 'Carbone', category: 'Innovation', image: '/images/materiaux/carbone.jpg', description: 'Composite léger et rigide dont l’aspect dépend du procédé de fabrication.', uses: 'Boîtiers · cadrans · composants allégés' },
  { id: '12', name: 'Bronze', category: 'Décoratif', image: '/images/materiaux/bronze.jpg', description: 'Alliage cuivre-étain qui développe une patine propre à chaque pièce au fil du temps.', uses: 'Boîtiers · lunettes · éditions spéciales' },
];

export default function MateriauxPage() {
  const [activeId, setActiveId] = useState('01');
  const active = MATERIALS.find((material) => material.id === activeId) ?? MATERIALS[0];

  return (
    <main className="materials-editorial">
      <section className="materials-hero">
        <div className="materials-wrap materials-hero-grid">
          <div className="materials-hero-copy">
            <div className="materials-kicker">HorloLearn · Matières & microtechnique</div>
            <h1>La matière<br /><em>devient précision.</em></h1>
            <p className="materials-hero-lead">Avant le mouvement, il y a la matière. Métaux, alliages, céramiques, cristaux et composites déterminent le poids, la résistance, la finition et parfois le comportement mécanique d’une montre.</p>
            <div className="materials-hero-note"><span>Cabinet de matières</span><p>Une entrée éditoriale vers les matériaux déjà documentés dans HorloLearn, avec accès direct aux dossiers techniques existants.</p></div>
          </div>

          <figure className="materials-hero-visual">
            <img src="/images/Patek_Philippe_Swiss_watch_movement_caliber_mechanism_technical_photo.jpg" alt="Mouvement horloger suisse" />
            <figcaption><div className="materials-kicker">Matière · fonction · finition</div><strong>Ce que l’œil voit.<br />Ce que le mouvement exige.</strong><p>Acier, laiton, rubis, silicium, saphir : chaque matériau répond à une contrainte différente.</p></figcaption>
          </figure>
        </div>
      </section>

      <section className="materials-section">
        <div className="materials-wrap">
          <header className="materials-head">
            <div className="materials-head-no">01 / INDEX</div>
            <div><div className="materials-kicker">Cabinet de matières</div><h2>Douze matières.<br />Douze usages.</h2><p>Cliquez sur une matière : la photographie, la description et les applications changent sans quitter la page.</p></div>
            <aside>Pas de grille de cartes. Chaque matériau est traité comme une pièce de catalogue technique.</aside>
          </header>

          <div className="materials-lab">
            <div className="materials-index">
              {MATERIALS.map((material) => (
                <button key={material.id} className={`materials-row${material.id === active.id ? ' active' : ''}`} onClick={() => setActiveId(material.id)} aria-pressed={material.id === active.id}>
                  <span>{material.id}</span><strong>{material.name}</strong><em>{material.category}</em><b>↗</b>
                </button>
              ))}
            </div>

            <div className="materials-viewer">
              <img key={active.image} src={active.image} alt={active.name} />
              <div className="materials-viewer-panel">
                <div className="materials-viewer-meta">{active.id} · {active.category}</div>
                <h3>{active.name}</h3>
                <p>{active.description}</p>
                <div className="materials-viewer-uses"><span>Applications horlogères</span><strong>{active.uses}</strong></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="materials-section">
        <div className="materials-wrap">
          <header className="materials-head">
            <div className="materials-head-no">02 / DOSSIERS</div>
            <div><div className="materials-kicker">Approfondir</div><h2>Deux dossiers.<br />Deux profondeurs.</h2><p>Les deux accès principaux restent présents, mais deviennent de vraies publications HorloLearn.</p></div>
            <aside>Navigation et contenu conservés.</aside>
          </header>

          <div className="materials-publications">
            <Link href="/materiaux/metaux-communs" className="materials-publication"><small>DOSSIER 01</small><h3>Métaux en horlogerie suisse</h3><p>Collection détaillée des matériaux, de leurs usages, catégories et repères techniques.</p><b>→</b></Link>
            <Link href="/materiaux/guide-complet" className="materials-publication"><small>DOSSIER 02</small><h3>Guide complet des matériaux horlogers</h3><p>Métaux de précision, matériaux précieux, innovations, comparatifs, PDF et cartes flash.</p><b>→</b></Link>
          </div>
        </div>
      </section>

      <section className="materials-method">
        <div className="materials-wrap materials-method-grid">
          <div className="materials-method-statement">Choisir un matériau, c’est arbitrer entre <em>fonction, résistance, masse et finition.</em></div>
          <div className="materials-method-lines">
            <div><span>01</span><section><strong>Fonction mécanique</strong><p>La pièce n’impose pas les mêmes contraintes selon qu’elle est structurelle, décorative, mobile ou en contact avec un pivot.</p></section></div>
            <div><span>02</span><section><strong>Usinabilité</strong><p>Le comportement à l’usinage influence la géométrie possible, la finition et le coût de fabrication.</p></section></div>
            <div><span>03</span><section><strong>Résistance & vieillissement</strong><p>Corrosion, rayure, choc, magnétisme ou patine font partie du choix de matière.</p></section></div>
            <div><span>04</span><section><strong>Expression visuelle</strong><p>Poli, satiné, mat, transparent ou patiné : la matière participe directement à l’identité de la montre.</p></section></div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .materials-editorial{background:var(--hl-bg);color:var(--hl-ink);min-height:100vh}.materials-editorial *{box-sizing:border-box}.materials-wrap{width:min(1440px,calc(100% - 48px));margin:0 auto}.materials-kicker{color:var(--hl-metal);font:10px/1.25 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.2em;text-transform:uppercase}.materials-hero{border-bottom:1px solid var(--hl-line)}.materials-hero-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(520px,.92fr);min-height:80vh}.materials-hero-copy{padding:90px 80px 78px 0;display:flex;flex-direction:column;justify-content:center}.materials-hero h1{margin:22px 0 26px;font:500 clamp(64px,7vw,118px)/.84 Georgia,'Times New Roman',serif;letter-spacing:-.058em}.materials-hero h1 em{font-style:normal;color:var(--hl-metal)}.materials-hero-lead{max-width:730px;color:var(--hl-muted);font-size:18px;line-height:1.72}.materials-hero-note{margin-top:44px;display:grid;grid-template-columns:150px 1fr;gap:26px;border-top:1px solid var(--hl-line);padding-top:20px}.materials-hero-note span{font:9px monospace;letter-spacing:.12em;text-transform:uppercase;color:var(--hl-metal)}.materials-hero-note p{margin:0;color:var(--hl-muted);font-size:13px;line-height:1.65}.materials-hero-visual{position:relative;overflow:hidden;background:#080a0d;border-left:1px solid var(--hl-line);min-height:700px;margin:0}.materials-hero-visual img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.72) brightness(.72)}.materials-hero-visual:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.08) 42%,rgba(0,0,0,.85))}.materials-hero-visual figcaption{position:absolute;z-index:2;left:30px;bottom:28px;color:#f3efe7}.materials-hero-visual figcaption .materials-kicker{color:#d5b576}.materials-hero-visual figcaption strong{display:block;margin-top:8px;font:500 38px/1 Georgia,serif}.materials-hero-visual figcaption p{max-width:430px;color:#c6c0b7;font-size:12px;line-height:1.55;margin:9px 0 0}.materials-section{padding:116px 0;border-bottom:1px solid var(--hl-line)}.materials-head{display:grid;grid-template-columns:110px minmax(0,1fr) minmax(260px,.55fr);gap:42px;margin-bottom:52px}.materials-head-no{color:var(--hl-metal);font:10px monospace;padding-top:10px}.materials-head h2{font:500 clamp(48px,5.7vw,84px)/.9 Georgia,serif;letter-spacing:-.045em;margin:0}.materials-head p{margin:20px 0 0;color:var(--hl-muted);font-size:15px;line-height:1.7;max-width:760px}.materials-head aside{border-top:1px solid var(--hl-line);padding-top:16px;color:var(--hl-muted);font-size:12px;line-height:1.6}.materials-lab{display:grid;grid-template-columns:minmax(0,.82fr) minmax(520px,1.18fr);min-height:720px;border-top:1px solid var(--hl-line);border-bottom:1px solid var(--hl-line)}.materials-index{border-right:1px solid var(--hl-line)}.materials-row{width:100%;display:grid;grid-template-columns:50px 1fr 110px 28px;align-items:center;gap:14px;padding:18px 18px 18px 0;background:transparent;border:0;border-bottom:1px solid var(--hl-line);cursor:pointer;text-align:left;color:var(--hl-muted);transition:.18s}.materials-row:hover,.materials-row.active{background:var(--hl-surface);color:var(--hl-ink);padding-left:12px}.materials-row.active{box-shadow:inset 2px 0 0 var(--hl-metal)}.materials-row span{font:9px monospace;color:var(--hl-metal)}.materials-row strong{font:500 19px Georgia,serif}.materials-row em{font:8px monospace;letter-spacing:.1em;text-transform:uppercase;font-style:normal}.materials-row b{color:var(--hl-metal);font-weight:400}.materials-viewer{position:sticky;top:20px;min-height:720px;background:#07090c;color:#f2ede5;overflow:hidden}.materials-viewer>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(.76) brightness(.54);animation:materialsFade .28s ease}.materials-viewer:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(5,7,9,.05),rgba(5,7,9,.22) 45%,rgba(5,7,9,.88))}.materials-viewer-panel{position:absolute;z-index:2;right:42px;bottom:42px;width:min(480px,calc(100% - 84px))}.materials-viewer-meta{color:#d5b576;font:9px monospace;letter-spacing:.13em;text-transform:uppercase}.materials-viewer h3{font:500 clamp(46px,5vw,76px)/.9 Georgia,serif;letter-spacing:-.045em;margin:14px 0 18px}.materials-viewer p{color:#c7c0b6;font-size:14px;line-height:1.7;margin:0}.materials-viewer-uses{margin-top:26px;border-top:1px solid rgba(255,255,255,.18);padding-top:16px}.materials-viewer-uses span{display:block;color:#8f979e;font:8px monospace;letter-spacing:.13em;text-transform:uppercase;margin-bottom:7px}.materials-viewer-uses strong{font:500 18px/1.35 Georgia,serif}.materials-publications{border-top:1px solid var(--hl-line)}.materials-publication{display:grid;grid-template-columns:90px 1fr 1fr 48px;gap:28px;align-items:center;padding:32px 0;border-bottom:1px solid var(--hl-line);transition:.18s}.materials-publication:hover{background:var(--hl-surface);padding-left:18px;padding-right:18px}.materials-publication small{font:9px monospace;color:var(--hl-metal)}.materials-publication h3{font:500 30px/1 Georgia,serif;margin:0}.materials-publication p{margin:0;color:var(--hl-muted);font-size:13px;line-height:1.6}.materials-publication b{font-size:24px;color:var(--hl-metal);font-weight:400}.materials-method{padding:116px 0}.materials-method-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start}.materials-method-statement{font:500 clamp(38px,4.4vw,68px)/1 Georgia,serif;letter-spacing:-.04em}.materials-method-statement em{font-style:normal;color:var(--hl-metal)}.materials-method-lines{border-top:1px solid var(--hl-line)}.materials-method-lines>div{display:grid;grid-template-columns:50px 1fr;gap:20px;padding:22px 0;border-bottom:1px solid var(--hl-line)}.materials-method-lines span{font:9px monospace;color:var(--hl-metal)}.materials-method-lines section{padding:0;border:0}.materials-method-lines strong{display:block;font:500 21px Georgia,serif}.materials-method-lines p{margin:6px 0 0;color:var(--hl-muted);font-size:12px;line-height:1.6}@keyframes materialsFade{from{opacity:.2;transform:scale(1.015)}to{opacity:1;transform:scale(1)}}@media(max-width:1050px){.materials-hero-grid,.materials-lab,.materials-method-grid{grid-template-columns:1fr}.materials-hero-copy{padding-right:0}.materials-hero-visual{border-left:0;border-top:1px solid var(--hl-line);min-height:520px}.materials-head{grid-template-columns:70px 1fr}.materials-head aside{grid-column:2}.materials-index{border-right:0}.materials-viewer{position:relative;top:auto;min-height:620px}.materials-publication{grid-template-columns:60px 1fr 40px}.materials-publication p{grid-column:2}}@media(max-width:700px){.materials-wrap{width:min(100% - 28px,1440px)}.materials-hero-copy{padding:68px 0 54px}.materials-hero h1{font-size:clamp(58px,18vw,82px)}.materials-hero-note{grid-template-columns:1fr}.materials-section,.materials-method{padding:82px 0}.materials-head{grid-template-columns:1fr;gap:14px}.materials-head aside{grid-column:1}.materials-row{grid-template-columns:36px 1fr 24px}.materials-row em{display:none}.materials-viewer{min-height:520px}.materials-viewer-panel{left:22px;right:22px;bottom:24px;width:auto}.materials-publication{grid-template-columns:42px 1fr 26px;gap:12px}.materials-publication p{grid-column:2}}
      `}</style>
    </main>
  );
}
