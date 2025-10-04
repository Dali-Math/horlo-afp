"use client";

import Image from "next/image";
import Link from "next/link";
import HeaderSection from "./HeaderSection";
import TimelineHorlogerie from "./TimelineHorlogerie";

export default function CulturePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-black text-neutral-100">
      {/* HeaderSection Component */}
      <HeaderSection />

      {/* TimelineHorlogerie Component */}
      <TimelineHorlogerie />

      {/* Section: Histoire */}
      <section id="histoire" className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-5 gap-10 items-start">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold">📜 Histoire de l'horlogerie</h2>
            <p className="mt-3 text-neutral-300">
              Des cadrans solaires aux mouvements automatiques: jalons techniques, pionniers et styles.
            </p>
            <ul className="mt-6 space-y-4">
              <li className="border-l-2 border-amber-400 pl-4">
                <h3 className="font-semibold">Encyclopédie FHH</h3>
                <p className="text-sm text-neutral-300">Chronologies, biographies et techniques majeures.</p>
                <a href="https://www.hautehorlogerie.org/en/encyclopaedia/" target="_blank" rel="noreferrer" className="text-amber-300 hover:underline">
                  hautehorlogerie.org/encyclopaedia
                </a>
              </li>
              <li className="border-l-2 border-amber-400 pl-4">
                <h3 className="font-semibold">British Museum – Horology</h3>
                <p className="text-sm text-neutral-300">Collections historiques et articles éducatifs.</p>
                <a href="https://www.britishmuseum.org/collection/galleries/horology" target="_blank" rel="noreferrer" className="text-amber-300 hover:underline">
                  britishmuseum.org/horology
                </a>
              </li>
              <li className="border-l-2 border-amber-400 pl-4">
                <h3 className="font-semibold">Watch‑Wiki</h3>
                <p className="text-sm text-neutral-300">Histoire de marques, calibres et artisans.</p>
                <a href="https://watch-wiki.org/" target="_blank" rel="noreferrer" className="text-amber-300 hover:underline">
                  watch-wiki.org
                </a>
              </li>
            </ul>
          </div>

          {/* Interactive timeline */}
          <div className="md:col-span-3">
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-6">
              <h3 className="font-semibold mb-3">Lignes du temps</h3>
              <div className="relative overflow-x-auto" id="lignes-du-temps">
                <ol className="flex min-w-[720px] gap-8">
                  {[
                    { date: "XVIe", label: "Échappement à verge" },
                    { date: "1761", label: "Chronomètre de marine" },
                    { date: "1868", label: "Première montre-bracelet" },
                    { date: "1923", label: "Remontage automatique" },
                    { date: "1969", label: "Quartz Astron" },
                    { date: "1983", label: "Swatch" },
                    { date: "2020s", label: "Micro‑rotors, silicium" },
                  ].map((e, i) => (
                    <li key={i} className="group">
                      <div className="h-12 w-12 grid place-items-center rounded-full bg-amber-400/20 text-amber-200 ring-1 ring-amber-400/40 group-hover:bg-amber-400/25 transition">
                        {e.date}
                      </div>
                      <p className="mt-2 text-sm text-neutral-300 group-hover:text-white">{e.label}</p>
                    </li>
                  ))}
                </ol>
              </div>
              <p className="mt-3 text-xs text-neutral-400">Faites glisser horizontalement pour parcourir.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Musées */}
      <section id="musees" className="container mx-auto px-4 pb-4">
        <h2 className="text-3xl font-bold">🖼️ Musées</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "MIH – La Chaux‑de‑Fonds", desc: "Collection mondiale dédiée au temps et à l'horlogerie.", href: "https://www.mih.ch/", img: "/musees/mih.jpg" },
            { title: "Musée Patek Philippe – Genève", desc: "Pièces historiques, automates et grandes complications.", href: "https://www.patek.com/en/company/museum", img: "/musees/patek.jpg" },
            { title: "Château des Monts – Le Locle", desc: "Patrimoine jurassien et expositions temporaires.", href: "https://www.mhl-monts.ch/", img: "/musees/monts.jpg" },
            { title: "Arts et Métiers – Paris", desc: "Instruments scientifiques, régulateurs et pendules.", href: "https://www.arts-et-metiers.net/", img: "/musees/aem.jpg" },
          ].map((m, i) => (
            <a key={i} href={m.href} target="_blank" rel="noreferrer" className="group relative overflow-hidden rounded-xl ring-1 ring-white/10 bg-white/5 hover:bg-white/10 transition block">
              <div className="aspect-[16/10] relative">
                <Image src={m.img} alt={m.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold tracking-wide">{m.title}</h3>
                <p className="text-sm text-neutral-300">{m.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Section: Films et vidéos */}
      <section id="videos" className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold">🎬 Documentaires et vidéos</h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="https://www.youtube.com/results?search_query=documentaire+horlogerie" target="_blank" rel="noreferrer" className="text-sky-300 hover:underline">
                  YouTube – Documentaires horlogers
                </a>
                <span className="text-neutral-400"> — Sélections gratuites.</span>
              </li>
              <li>
                <a href="https://www.arte.tv/fr/search/?q=horlogerie" target="_blank" rel="noreferrer" className="text-sky-300 hover:underline">
                  Arte – Horlogerie
                </a>
                <span className="text-neutral-400"> — Programmes culturels et historiques.</span>
              </li>
              <li>
                <a href="https://www.rts.ch/play/tv/recherche?query=horlogerie" target="_blank" rel="noreferrer" className="text-sky-300 hover:underline">
                  RTS – Horlogerie
                </a>
                <span className="text-neutral-400"> — Reportages suisses sur les métiers.</span>
              </li>
            </ul>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                { id: "breguet", title: "L'art du guillochage", thumb: "/videos/guilloche.jpg" },
                { id: "tourbillon", title: "Comprendre le tourbillon", thumb: "/videos/tourbillon.jpg" },
              ].map((v) => (
                <div key={v.id} className="relative overflow-hidden rounded-xl ring-1 ring-white/10 bg-white/5">
                  <Image src={v.thumb} alt={v.title} width={800} height={450} className="w-full h-auto object-cover" />
                  <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                    <p className="font-medium">{v.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="lg:col-span-1">
            <div className="sticky top-6 rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="font-semibold">Lexique rapide</h3>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex gap-2">
                  <dt className="text-amber-300">Échappement</dt>
                  <dd className="text-neutral-300">Organe qui régule les oscillations et distribue l'énergie.</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-amber-300">Tourbillon</dt>
                  <dd className="text-neutral-300">Cage tournante compensant les écarts de gravité.</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-amber-300">Complication</dt>
                  <dd className="text-neutral-300">Fonction additionnelle au-delà des heures/minutes/secondes.</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      {/* Call to action */}
      <section className="container mx-auto px-4 pb-24">
        <div className="rounded-2xl bg-gradient-to-r from-amber-500/20 to-fuchsia-500/20 ring-1 ring-white/10 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Poursuivre l'exploration</h3>
            <p className="text-neutral-300 mt-2">Découvrez la théorie, les outils et la pratique de l'horlogerie moderne.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/theorie" className="px-4 py-2 rounded-md bg-amber-500 text-black font-semibold hover:brightness-110">
              Théorie
            </Link>
            <Link href="/outils" className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/15 ring-1 ring-white/15">
              Outils
            </Link>
            <Link href="/pratique" className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/15 ring-1 ring-white/15">
              Pratique
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
