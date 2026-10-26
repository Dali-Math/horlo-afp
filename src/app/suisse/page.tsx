"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import SwissWatchAtlas from "@/components/SwissWatchAtlas";

const documents = [
  {
    index: "01",
    title: "Métiers de l’horlogerie",
    description: "Guide consacré aux métiers horlogers suisses, aux compétences et aux parcours professionnels du secteur.",
    href: "/suisse/metiers-horlogerie",
  },
  {
    index: "02",
    title: "Rapport FHH 2024",
    description: "Document de référence autour des chiffres, tendances et mutations de l’univers horloger suisse.",
    href: "/suisse/rapport-fhh",
  },
] as const;

const resources = [
  { code: "FHH", name: "Fondation de la Haute Horlogerie", description: "Institution internationale dédiée à la culture et à la promotion de l’horlogerie fine.", href: "https://www.hautehorlogerie.org" },
  { code: "FH", name: "Fédération de l’Industrie Horlogère Suisse", description: "Organisation professionnelle représentant l’industrie horlogère suisse.", href: "https://www.fhs.swiss" },
  { code: "AFP", name: "Attestation fédérale de formation professionnelle", description: "Repère officiel sur l’AFP dans le système professionnel suisse.", href: "https://www.orientation.ch/dyn/show/2101" },
  { code: "MIH", name: "Musée International d’Horlogerie", description: "Institution majeure de La Chaux-de-Fonds consacrée à l’histoire de la mesure du temps.", href: "https://www.chaux-de-fonds.ch/musees/mih" },
  { code: "PP", name: "Patek Philippe Museum", description: "Musée genevois consacré à l’histoire de l’horlogerie et aux collections Patek Philippe.", href: "https://www.patekmuseum.com" },
  { code: "CPNE", name: "CIFOM — École d’Horlogerie", description: "Centre d’horlogerie du CPNE, actif dans les métiers de l’horlogerie et de la microtechnique.", href: "https://www.cpne.ch/" },
  { code: "ET", name: "Écoles techniques — Le Locle", description: "Ressource consacrée aux filières techniques dans un territoire historique de l’horlogerie.", href: "https://www.cpnv.ch" },
  { code: "HEPIA", name: "HES-SO Genève — Microtechniques", description: "Haute école spécialisée en ingénierie, microtechniques et domaines connexes.", href: "https://www.hesge.ch/hepia" },
] as const;

const gallery = [
  { src: "/images/Geneva_Clock_Tower_Architectural_Detail_Swiss_Horology.jpg", title: "Genève", caption: "Architecture, métiers d’art et tradition cabinotière." },
  { src: "/images/Vacheron_Constantin_Geneva_Historic_Watchmaking_Factory_Clock_Tower_Quai_de_l_Ile.jpg", title: "Patrimoine", caption: "Le territoire genevois et ses maisons historiques." },
  { src: "/images/Patek_Philippe_Swiss_watch_movement_caliber_mechanism_technical_photo.jpg", title: "Mouvement", caption: "La mécanique comme langage de précision." },
  { src: "/images/Patek_Philippe_Nautilus_Steel_Blue_Dial_Luxury_Watch.jpg", title: "Design", caption: "Une culture industrielle qui dialogue avec la forme." },
  { src: "/images/IWC_Portugieser_Chronograph_Automatic_Blue_Dial_Luxury_Watch.jpg", title: "Complication", caption: "Chronométrie, affichages et maîtrise du mouvement." },
  { src: "/images/Vacheron_Constantin_Diamond_Tourbillon_Luxury_Watch.jpg", title: "Métiers d’art", caption: "Technique, finition et haute horlogerie." },
] as const;

const videos = [
  { id: "feKWzl-yKso", title: "L’Art de l’Horlogerie Suisse" },
  { id: "JIc1kIVpSBo", title: "Fabrication d’une Montre Mécanique" },
] as const;

const quizQuestions = [
  { question: "Quelle ville est considérée comme le berceau de l’horlogerie suisse ?", options: ["Genève", "La Chaux-de-Fonds", "Bienne"], correct: 0 },
  { question: "Quel mécanisme est caractéristique des montres mécaniques suisses ?", options: ["Quartz", "Échappement à ancre suisse", "Moteur électrique"], correct: 1 },
  { question: "Combien de rubis contient généralement un mouvement horloger de qualité ?", options: ["7 rubis", "17 rubis", "25 rubis"], correct: 1 },
  { question: "Quelle est la fréquence standard proposée ici pour un balancier-spiral suisse ?", options: ["18 000 alternances/heure", "28 800 alternances/heure", "36 000 alternances/heure"], correct: 1 },
  { question: "Quel label indique l’origine suisse d’une montre ?", options: ["Swiss Made", "Poinçon de Genève", "COSC"], correct: 0 },
] as const;

export default function SuissePage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <main className="suisse-editorial">
      <section className="suisse-hero" id="ouverture">
        <div className="suisse-wrap suisse-hero-grid">
          <div className="suisse-hero-copy">
            <div className="suisse-flag-banner" aria-label="Drapeau suisse animé">
              <video autoPlay loop muted playsInline preload="metadata">
                <source src="/videos/swiss-flag-banner.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="suisse-kicker">Confédération helvétique · Patrimoine horloger</div>
            <h1>La Suisse<br /><em>horlogère.</em></h1>
            <p className="suisse-hero-lead">Un territoire où l’horlogerie ne se résume pas à une industrie : elle relie villes, vallées, manufactures, musées, métiers, microtechnique et culture de la précision.</p>
            <div className="suisse-hero-stats">
              <div><span>Arc horloger</span><strong>Genève → Bienne</strong></div>
              <div><span>Territoires</span><strong>6 pôles</strong></div>
              <div><span>Ressources</span><strong>8 institutions</strong></div>
            </div>
          </div>

          <figure className="suisse-hero-visual">
            <img src="/images/Geneva_Clock_Tower_Architectural_Detail_Swiss_Horology.jpg" alt="Patrimoine horloger suisse à Genève" />
            <figcaption>
              <div className="suisse-kicker">Territoire · savoir-faire · transmission</div>
              <h2>Quand le pays devient atelier.</h2>
              <p>Des cabinotiers genevois à l’Arc jurassien, les lieux racontent une part essentielle de l’histoire horlogère suisse.</p>
            </figcaption>
          </figure>
        </div>
      </section>

      <nav className="suisse-nav" aria-label="Sommaire Suisse horlogère">
        <div className="suisse-wrap">
          <a href="#documents">01 Documents</a>
          <a href="#territoires">02 Territoires</a>
          <a href="#institutions">03 Institutions</a>
          <a href="#galerie">04 Regards</a>
          <a href="#afp">05 AFP</a>
          <a href="#quiz">06 Quiz</a>
        </div>
      </nav>

      <section className="suisse-chapter" id="documents">
        <div className="suisse-wrap">
          <ChapterHead number="01 / 06" kicker="Documents & guides" title={<>Lire la Suisse<br />horlogère.</>} text="Deux dossiers déjà présents sur HorloLearn deviennent des notices éditoriales simples, faciles à identifier et à consulter." note="Le contenu reste accessible sur ses routes existantes ; seule la présentation de la page principale change." />
          <div className="suisse-documents">
            {documents.map((doc) => (
              <Link href={doc.href} className="suisse-document" key={doc.href}>
                <span className="suisse-index">{doc.index}</span>
                <div><h3>{doc.title}</h3><p>{doc.description}</p></div>
                <span className="suisse-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="suisse-chapter suisse-atlas-chapter" id="territoires">
        <div className="suisse-wrap">
          <div className="suisse-atlas-label"><span>02 / 06</span><div className="suisse-kicker">Territoires horlogers</div></div>
          <div className="suisse-atlas-bridge"><SwissWatchAtlas /></div>
        </div>
      </section>

      <section className="suisse-chapter" id="institutions">
        <div className="suisse-wrap">
          <ChapterHead number="03 / 06" kicker="Institutions & références" title={<>Un réseau de<br />savoir-faire.</>} text="Fédérations, musées, écoles et hautes écoles forment un réseau de ressources qui documente l’horlogerie suisse sous plusieurs angles." note="Les liens externes restent ceux déjà proposés sur la page Suisse actuelle." />
          <div className="suisse-resource-list">
            {resources.map((resource, index) => (
              <a href={resource.href} target="_blank" rel="noopener noreferrer" className="suisse-resource" key={resource.href}>
                <span className="suisse-index">{String(index + 1).padStart(2, "0")}</span>
                <strong className="suisse-resource-code">{resource.code}</strong>
                <div><h3>{resource.name}</h3><p>{resource.description}</p></div>
                <span className="suisse-arrow">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="suisse-chapter" id="galerie">
        <div className="suisse-wrap">
          <ChapterHead number="04 / 06" kicker="Regards sur l’horlogerie suisse" title={<>Le territoire,<br />la matière, le geste.</>} text="Une sélection visuelle issue des images déjà présentes dans HorloLearn, complétée par les deux vidéos de la page Suisse actuelle." note="La galerie devient un récit visuel plutôt qu’une succession de cartes à effets." />
          <div className="suisse-gallery">
            {gallery.map((item, index) => (
              <figure className={`suisse-gallery-item suisse-gallery-item-${index + 1}`} key={item.src}>
                <img src={item.src} alt={item.title} />
                <figcaption><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.caption}</p></div></figcaption>
              </figure>
            ))}
          </div>

          <div className="suisse-video-grid">
            {videos.map((video) => (
              <article className="suisse-video" key={video.id}>
                <div className="suisse-video-frame">
                  {activeVideo === video.id ? (
                    <iframe src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  ) : (
                    <>
                      <img src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`} alt="" />
                      <button onClick={() => setActiveVideo(video.id)} aria-label={`Lire ${video.title}`}>▶</button>
                    </>
                  )}
                </div>
                <h3>{video.title}</h3>
              </article>
            ))}
          </div>

          <div className="suisse-editorial-note">
            <span>Note éditoriale</span>
            <p>L’horlogerie suisse se lit à plusieurs échelles : une pièce, un atelier, une manufacture, une vallée, une ville — puis tout un territoire.</p>
          </div>
        </div>
      </section>

      <section className="suisse-chapter" id="afp">
        <div className="suisse-wrap">
          <ChapterHead number="05 / 06" kicker="Système professionnel suisse" title={<>L’AFP,<br />un repère officiel.</>} text="L’Attestation fédérale de formation professionnelle fait partie du système professionnel suisse. HorloLearn la présente ici comme information de contexte, sans se présenter lui-même comme organisme de formation." note="La ressource officielle renvoie vers orientation.ch." />
          <div className="suisse-afp">
            <div className="suisse-afp-mark">AFP</div>
            <div className="suisse-afp-copy">
              <h3>Attestation fédérale de formation professionnelle</h3>
              <p>L’AFP est une voie professionnelle suisse de deux ans, centrée sur la pratique et reconnue par la Confédération.</p>
              <p>Elle permet d’acquérir des compétences essentielles en environnement professionnel et peut constituer une étape vers un Certificat fédéral de capacité (CFC).</p>
              <a href="https://www.orientation.ch/dyn/show/2101" target="_blank" rel="noopener noreferrer">Consulter orientation.ch ↗</a>
            </div>
          </div>
        </div>
      </section>

      <section className="suisse-chapter" id="quiz">
        <div className="suisse-wrap">
          <ChapterHead number="06 / 06" kicker="Quiz horloger" title={<>Cinq questions<br />sur la Suisse horlogère.</>} text="Le quiz de la page actuelle est conservé, mais dans une interface plus sobre et cohérente avec le reste du dossier." note="Une seule réponse par question, score final sur 5." />
          <SwissQuiz />
        </div>
      </section>

      <section className="suisse-closing">
        <div className="suisse-wrap suisse-closing-grid">
          <div>
            <div className="suisse-kicker">Poursuivre l’exploration</div>
            <h2>Du territoire<br />au mouvement.</h2>
            <p>Retrouvez les autres univers HorloLearn en gardant la même logique éditoriale.</p>
          </div>
          <div className="suisse-closing-links"><Link href="/culture">Culture</Link><Link href="/theorie">Théorie</Link><Link href="/pratique">Pratique</Link></div>
        </div>
      </section>

      <style jsx global>{`
        .suisse-editorial{background:var(--hl-bg);color:var(--hl-ink);min-height:100vh}.suisse-editorial *{box-sizing:border-box}.suisse-wrap{width:min(1420px,calc(100% - 48px));margin:0 auto}.suisse-kicker{color:var(--hl-metal);font:10px/1.25 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.22em;text-transform:uppercase}.suisse-hero{border-bottom:1px solid var(--hl-line)}.suisse-hero-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(430px,.76fr);min-height:78vh}.suisse-hero-copy{padding:64px 72px 76px 0;display:flex;flex-direction:column;justify-content:center}.suisse-flag-banner{width:min(620px,100%);height:150px;margin:0 0 28px;overflow:hidden;border:1px solid color-mix(in srgb,var(--hl-ruby) 72%,var(--hl-line));background:#080b0e}.suisse-flag-banner video{width:100%;height:100%;display:block;object-fit:cover}.suisse-hero h1{margin:24px 0 28px;font-family:Georgia,'Times New Roman',serif;font-size:clamp(64px,8vw,124px);line-height:.84;letter-spacing:-.058em;font-weight:500}.suisse-hero h1 em{font-style:normal;color:var(--hl-metal)}.suisse-hero-lead{max-width:700px;color:var(--hl-muted);font-size:18px;line-height:1.7}.suisse-hero-stats{margin-top:46px;display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--hl-line);border-bottom:1px solid var(--hl-line)}.suisse-hero-stats div{padding:18px 16px 18px 0}.suisse-hero-stats div+div{border-left:1px solid var(--hl-line);padding-left:18px}.suisse-hero-stats span{display:block;color:var(--hl-muted);font:9px monospace;text-transform:uppercase;letter-spacing:.13em}.suisse-hero-stats strong{display:block;margin-top:7px;font-family:Georgia,serif;font-size:22px;font-weight:500}.suisse-hero-visual{position:relative;overflow:hidden;min-height:650px;background:#0b0e11;border-left:1px solid var(--hl-line);margin:0}.suisse-hero-visual img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.7) contrast(1.08) brightness(.7)}.suisse-hero-visual:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,10,12,.1),rgba(8,10,12,.15) 50%,rgba(8,10,12,.88))}.suisse-hero-visual figcaption{position:absolute;z-index:2;left:30px;right:30px;bottom:30px;color:#f3efe7}.suisse-hero-visual figcaption .suisse-kicker{color:#d5b576}.suisse-hero-visual h2{font:500 38px/1 Georgia,serif;margin:10px 0 8px}.suisse-hero-visual p{margin:0;color:#c5beb3;font-size:13px;line-height:1.6;max-width:500px}.suisse-nav{position:sticky;top:64px;z-index:30;background:color-mix(in srgb,var(--hl-bg) 94%,transparent);backdrop-filter:blur(15px);border-bottom:1px solid var(--hl-line)}.suisse-nav .suisse-wrap{display:flex;align-items:center;overflow-x:auto}.suisse-nav a{flex:0 0 auto;padding:15px 18px;border-right:1px solid var(--hl-line);color:var(--hl-muted);font:9px monospace;text-transform:uppercase;letter-spacing:.12em}.suisse-nav a:first-child{border-left:1px solid var(--hl-line)}.suisse-nav a:hover{color:var(--hl-ink);background:var(--hl-surface)}.suisse-chapter{padding:118px 0;border-bottom:1px solid var(--hl-line);scroll-margin-top:120px}.suisse-chapter-head{display:grid;grid-template-columns:120px minmax(0,1.15fr) minmax(280px,.55fr);gap:42px;align-items:start;margin-bottom:58px}.suisse-chapter-no{color:var(--hl-metal);font:11px monospace;letter-spacing:.15em;padding-top:9px}.suisse-chapter-title h2{font-family:Georgia,'Times New Roman',serif;font-size:clamp(50px,6vw,88px);line-height:.9;letter-spacing:-.048em;font-weight:500;margin:0}.suisse-chapter-title p{max-width:740px;color:var(--hl-muted);font-size:16px;line-height:1.7;margin:22px 0 0}.suisse-chapter-note{border-top:1px solid var(--hl-line);padding-top:17px;color:var(--hl-muted);font-size:12px;line-height:1.65}.suisse-documents{border-top:1px solid var(--hl-line)}.suisse-document{display:grid;grid-template-columns:70px minmax(0,1fr) 50px;gap:24px;padding:29px 0;border-bottom:1px solid var(--hl-line);align-items:center;transition:.18s}.suisse-document:hover{background:var(--hl-surface);padding-left:18px;padding-right:18px}.suisse-index{color:var(--hl-metal);font:9px monospace}.suisse-document h3{font:500 31px/1.05 Georgia,serif;margin:0}.suisse-document p{margin:8px 0 0;color:var(--hl-muted);font-size:13px;line-height:1.6}.suisse-arrow{color:var(--hl-metal);font-size:22px;text-align:right}.suisse-atlas-chapter{padding-top:76px}.suisse-atlas-label{display:flex;gap:36px;align-items:center;margin-bottom:24px}.suisse-atlas-label>span{color:var(--hl-metal);font:11px monospace;letter-spacing:.15em}.suisse-atlas-bridge .swiss-atlas{margin:0;padding:0}.suisse-atlas-bridge .swiss-atlas__intro{padding-top:0}.suisse-resource-list{border-top:1px solid var(--hl-line)}.suisse-resource{display:grid;grid-template-columns:55px 90px minmax(0,1fr) 40px;gap:20px;padding:24px 0;border-bottom:1px solid var(--hl-line);align-items:center;transition:.18s}.suisse-resource:hover{background:var(--hl-surface);padding-left:16px;padding-right:16px}.suisse-resource-code{font:600 16px/1 ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--hl-metal)}.suisse-resource h3{font:500 24px/1.1 Georgia,serif;margin:0}.suisse-resource p{margin:6px 0 0;color:var(--hl-muted);font-size:12.5px;line-height:1.55}.suisse-gallery{display:grid;grid-template-columns:1.15fr .85fr;grid-auto-rows:250px;gap:1px;background:var(--hl-line);border:1px solid var(--hl-line)}.suisse-gallery-item{position:relative;overflow:hidden;margin:0;background:#0b0e11}.suisse-gallery-item-1{grid-row:span 2}.suisse-gallery-item-4{grid-column:1 / -1;display:grid;grid-template-columns:1.2fr .8fr}.suisse-gallery-item img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.72) brightness(.78);transition:transform .6s ease,filter .3s ease}.suisse-gallery-item:hover img{transform:scale(1.02);filter:saturate(.9) brightness(.82)}.suisse-gallery-item:after{content:'';position:absolute;inset:0;background:linear-gradient(transparent 45%,rgba(0,0,0,.72))}.suisse-gallery-item figcaption{position:absolute;z-index:2;left:20px;right:20px;bottom:18px;color:#f3efe7;display:flex;gap:15px;align-items:flex-end}.suisse-gallery-item figcaption>span{color:#d5b576;font:9px monospace}.suisse-gallery-item h3{font:500 24px/1 Georgia,serif;margin:0}.suisse-gallery-item p{margin:6px 0 0;color:#c8c2b9;font-size:11px}.suisse-video-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--hl-line);border:1px solid var(--hl-line);margin-top:42px}.suisse-video{background:var(--hl-surface)}.suisse-video-frame{aspect-ratio:16/9;background:#080b0e;position:relative;overflow:hidden}.suisse-video-frame img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.7) brightness(.72)}.suisse-video-frame:after{content:'';position:absolute;inset:0;background:linear-gradient(transparent 40%,rgba(0,0,0,.55));pointer-events:none}.suisse-video-frame button{position:absolute;z-index:2;left:50%;top:50%;transform:translate(-50%,-50%);width:68px;height:68px;border-radius:50%;border:1px solid rgba(230,200,140,.55);background:rgba(8,10,12,.65);color:#e4c78e;cursor:pointer;font-size:24px}.suisse-video-frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0;z-index:3}.suisse-video h3{font:500 22px/1.15 Georgia,serif;margin:0;padding:20px 22px 24px}.suisse-editorial-note{margin-top:42px;border-top:1px solid var(--hl-line);border-bottom:1px solid var(--hl-line);display:grid;grid-template-columns:180px 1fr;gap:30px;padding:26px 0}.suisse-editorial-note span{color:var(--hl-metal);font:9px monospace;text-transform:uppercase;letter-spacing:.13em}.suisse-editorial-note p{font:500 clamp(24px,3vw,40px)/1.16 Georgia,serif;margin:0}.suisse-afp{display:grid;grid-template-columns:220px 1fr;border-top:1px solid var(--hl-line);border-bottom:1px solid var(--hl-line)}.suisse-afp-mark{display:grid;place-items:center;min-height:280px;border-right:1px solid var(--hl-line);font:500 76px/1 Georgia,serif;color:var(--hl-metal);background:var(--hl-surface)}.suisse-afp-copy{padding:34px 38px}.suisse-afp h3{font:500 34px/1.05 Georgia,serif;margin:0 0 20px}.suisse-afp p{color:var(--hl-muted);font-size:14px;line-height:1.75;max-width:840px}.suisse-afp a{display:inline-block;margin-top:14px;color:var(--hl-metal);font:9px monospace;text-transform:uppercase;letter-spacing:.12em}.suisse-quiz{max-width:920px;margin:0 auto;border:1px solid var(--hl-line);background:var(--hl-surface)}.suisse-quiz-intro,.suisse-quiz-complete,.suisse-quiz-question{padding:34px}.suisse-quiz-intro{text-align:center}.suisse-quiz-intro p,.suisse-quiz-complete p{color:var(--hl-muted);line-height:1.6}.suisse-quiz-meta{color:var(--hl-metal)!important;font:9px monospace;text-transform:uppercase;letter-spacing:.13em;margin:12px 0 26px!important}.suisse-quiz button{border:1px solid var(--hl-line);background:transparent;color:var(--hl-ink);padding:12px 16px;cursor:pointer}.suisse-quiz button:hover{border-color:var(--hl-metal);color:var(--hl-metal)}.suisse-quiz-progress{height:2px;background:var(--hl-line);margin:14px 0 30px}.suisse-quiz-progress i{display:block;height:100%;background:var(--hl-metal)}.suisse-quiz-top{display:flex;justify-content:space-between;gap:20px;color:var(--hl-muted);font:9px monospace;text-transform:uppercase;letter-spacing:.1em}.suisse-quiz-question h3{font:500 30px/1.2 Georgia,serif;margin:0 0 26px}.suisse-quiz-options{display:grid;gap:8px}.suisse-quiz-option{width:100%;text-align:left!important;display:flex;gap:14px;align-items:flex-start}.suisse-quiz-option span{color:var(--hl-metal);font-family:monospace}.suisse-quiz-option.correct{border-color:#5f8b69;color:#5f8b69}.suisse-quiz-option.wrong{border-color:#b15a66;color:#b15a66}.suisse-quiz-feedback{margin:22px 0 0;color:var(--hl-muted);font-size:13px}.suisse-quiz-score{font:500 72px/1 Georgia,serif;color:var(--hl-metal);margin:18px 0}.suisse-closing{padding:90px 0 110px}.suisse-closing-grid{display:grid;grid-template-columns:1fr auto;gap:50px;align-items:center;border-top:1px solid var(--hl-line);border-bottom:1px solid var(--hl-line);padding:38px 0}.suisse-closing h2{font:500 clamp(38px,4vw,64px)/.95 Georgia,serif;margin:10px 0 0}.suisse-closing p{color:var(--hl-muted);margin:14px 0 0;max-width:660px;line-height:1.65}.suisse-closing-links{display:flex;gap:8px;flex-wrap:wrap}.suisse-closing-links a{border:1px solid var(--hl-line);padding:12px 15px;font:9px monospace;text-transform:uppercase;letter-spacing:.12em}.suisse-closing-links a:hover{border-color:var(--hl-metal);color:var(--hl-metal)}@media(max-width:1050px){.suisse-hero-grid{grid-template-columns:1fr}.suisse-hero-copy{padding-right:0}.suisse-hero-visual{border-left:0;border-top:1px solid var(--hl-line);min-height:500px}.suisse-chapter-head{grid-template-columns:80px 1fr}.suisse-chapter-note{grid-column:2}.suisse-resource{grid-template-columns:45px 75px 1fr 30px}.suisse-gallery{grid-template-columns:1fr;grid-auto-rows:320px}.suisse-gallery-item-1{grid-row:auto}.suisse-gallery-item-4{grid-column:auto;display:block}.suisse-video-grid{grid-template-columns:1fr}}@media(max-width:720px){.suisse-wrap{width:min(100% - 28px,1420px)}.suisse-hero-copy{padding:42px 0 56px}.suisse-flag-banner{height:112px;margin-bottom:22px}.suisse-hero h1{font-size:clamp(56px,18vw,82px)}.suisse-hero-stats{grid-template-columns:1fr}.suisse-hero-stats div+div{border-left:0;border-top:1px solid var(--hl-line);padding-left:0}.suisse-nav{top:56px}.suisse-chapter{padding:82px 0}.suisse-chapter-head{grid-template-columns:1fr;gap:14px}.suisse-chapter-note{grid-column:1}.suisse-document{grid-template-columns:42px 1fr 30px;gap:12px}.suisse-resource{grid-template-columns:36px 58px 1fr;gap:12px}.suisse-resource .suisse-arrow{display:none}.suisse-gallery{grid-auto-rows:260px}.suisse-editorial-note{grid-template-columns:1fr}.suisse-afp{grid-template-columns:1fr}.suisse-afp-mark{min-height:170px;border-right:0;border-bottom:1px solid var(--hl-line)}.suisse-afp-copy{padding:26px}.suisse-closing-grid{grid-template-columns:1fr}}
      `}</style>
    </main>
  );
}

function ChapterHead({ number, kicker, title, text, note }: { number: string; kicker: string; title: ReactNode; text: string; note: string }) {
  return <header className="suisse-chapter-head"><div className="suisse-chapter-no">{number}</div><div className="suisse-chapter-title"><div className="suisse-kicker">{kicker}</div><h2>{title}</h2><p>{text}</p></div><div className="suisse-chapter-note">{note}</div></header>;
}

function SwissQuiz() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const question = quizQuestions[current];

  const choose = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    const isCorrect = index === question.correct;
    if (isCorrect) setScore((value) => value + 1);
    window.setTimeout(() => {
      if (current + 1 < quizQuestions.length) {
        setCurrent((value) => value + 1);
        setSelected(null);
      } else {
        setCompleted(true);
      }
    }, 1200);
  };

  const reset = () => {
    setStarted(false);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setCompleted(false);
  };

  return (
    <div className="suisse-quiz">
      {!started ? (
        <div className="suisse-quiz-intro"><div className="suisse-kicker">Test rapide</div><h3>Connaissances horlogères suisses</h3><p>Cinq questions issues du quiz déjà présent sur cette page.</p><p className="suisse-quiz-meta">5 questions · 3 choix par question</p><button onClick={() => setStarted(true)}>Démarrer le quiz</button></div>
      ) : completed ? (
        <div className="suisse-quiz-complete"><div className="suisse-kicker">Résultat</div><div className="suisse-quiz-score">{score}/5</div><p>{score === 5 ? "Parfait." : score >= 4 ? "Très bonne connaissance." : score >= 3 ? "De bonnes bases." : "À poursuivre dans les autres ressources HorloLearn."}</p><button onClick={reset}>Recommencer</button></div>
      ) : (
        <div className="suisse-quiz-question"><div className="suisse-quiz-top"><span>Question {current + 1} / {quizQuestions.length}</span><span>Score {score}</span></div><div className="suisse-quiz-progress"><i style={{ width: `${((current + 1) / quizQuestions.length) * 100}%` }} /></div><h3>{question.question}</h3><div className="suisse-quiz-options">{question.options.map((option, index) => { const state = selected === null ? "" : index === question.correct ? " correct" : index === selected ? " wrong" : ""; return <button key={option} disabled={selected !== null} onClick={() => choose(index)} className={`suisse-quiz-option${state}`}><span>{String.fromCharCode(65 + index)}.</span>{option}</button>; })}</div>{selected !== null && <p className="suisse-quiz-feedback">{selected === question.correct ? "Bonne réponse." : `Réponse attendue : ${question.options[question.correct]}`}</p>}</div>
      )}
    </div>
  );
}
