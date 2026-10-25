'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, Gauge, Gem, Wrench, Watch, Globe2, Layers3 } from 'lucide-react';

const gateways = [
  {
    index: '01',
    title: 'Comprendre la mécanique',
    text: 'Du barillet au balancier-spiral : les organes, les forces et la cinématique qui donnent vie à une montre mécanique.',
    href: '/theorie',
    meta: 'Théorie · mécanismes · normes',
    icon: BookOpen,
  },
  {
    index: '02',
    title: 'Observer le geste',
    text: 'Démontage, remontage, huilage, contrôle et diagnostic : une approche d’établi pour mieux lire le mouvement.',
    href: '/pratique',
    meta: 'Pratique · ETA 6497 · atelier',
    icon: Wrench,
  },
  {
    index: '03',
    title: 'Mesurer & vérifier',
    text: 'Simulateurs, calculateurs et outils interactifs pour explorer les phénomènes de précision horlogère.',
    href: '/outils',
    meta: 'Outils · métrologie · simulation',
    icon: Gauge,
  },
  {
    index: '04',
    title: 'Découvrir la Suisse horlogère',
    text: 'Territoires, manufactures, patrimoine et culture : replacer la technique dans son histoire et son paysage.',
    href: '/suisse',
    meta: 'Patrimoine · manufactures · culture',
    icon: Globe2,
  },
];

const selected = [
  {
    number: 'I',
    title: 'L’échappement suisse',
    text: 'Ancre, levées, tirage, sécurité, lubrification et diagnostic vibrographique dans une lecture d’atelier.',
    href: '/pratique/echappement',
    note: 'NIHS · ISO 3159 · Moebius 9415',
  },
  {
    number: 'II',
    title: 'ETA / Unitas 6497',
    text: 'Un calibre pédagogique emblématique pour comprendre l’ordre du démontage, le rouage et les organes réglants.',
    href: '/pratique/demontage',
    note: 'Démontage · remontage · observation',
  },
  {
    number: 'III',
    title: 'Lecture de plan horloger',
    text: 'Cartouche, lignes, vues, cotation et tolérances pour apprendre à lire une documentation technique avec précision.',
    href: '/theorie/lecture-de-plan',
    note: 'ISO · cartouche · tolérances',
  },
];

const figures = [
  ['17+', 'dossiers théoriques'],
  ['ETA 6497', 'calibre de référence'],
  ['NIHS / ISO', 'repères techniques'],
  ['Libre', 'accès aux ressources'],
];

export default function HomePage() {
  return (
    <div className="hl-page">
      <section className="border-b border-hl">
        <div className="hl-container grid min-h-[72vh] items-center gap-12 py-16 lg:grid-cols-[1.08fr_.92fr] lg:py-24">
          <div className="max-w-4xl">
            <div className="hl-kicker">HorloLearn · Passion & découverte</div>
            <h1 className="hl-editorial-title mt-6 max-w-4xl text-[clamp(3.5rem,8vw,7.5rem)] text-[var(--hl-ink)]">
              Lire le temps.
              <span className="block text-hl-metal">Comprendre le mouvement.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-hl-muted sm:text-lg">
              Une bibliothèque collaborative consacrée à la culture horlogère suisse : mécanique, gestes d’atelier,
              matériaux, plans, histoire et outils interactifs réunis dans un même espace.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/theorie"
                className="inline-flex items-center gap-3 border border-[var(--hl-ink)] bg-[var(--hl-ink)] px-5 py-3 text-xs font-medium uppercase tracking-[0.12em] text-[var(--hl-bg)] transition hover:opacity-85"
              >
                Explorer la bibliothèque
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pratique"
                className="inline-flex items-center gap-3 border border-hl px-5 py-3 text-xs font-medium uppercase tracking-[0.12em] text-[var(--hl-ink)] transition hover:border-[var(--hl-metal)] hover:text-hl-metal"
              >
                Voir l’atelier
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="aspect-square border border-hl bg-[var(--hl-surface)] p-6 sm:p-10">
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-start justify-between border-b border-hl pb-5">
                  <div>
                    <div className="hl-kicker">Planche 09</div>
                    <div className="mt-2 font-serif text-2xl">Organe réglant</div>
                  </div>
                  <Watch className="h-6 w-6 text-hl-metal" />
                </div>

                <div className="relative mx-auto flex aspect-square w-[76%] items-center justify-center">
                  <div className="absolute inset-[8%] rounded-full border border-[var(--hl-line-strong)]" />
                  <div className="absolute inset-[21%] rounded-full border border-[var(--hl-line)]" />
                  <div className="absolute h-[58%] w-px bg-[var(--hl-line-strong)]" />
                  <div className="absolute w-[58%] h-px bg-[var(--hl-line-strong)]" />
                  <div className="h-5 w-5 rounded-full border border-[var(--hl-metal)] bg-[var(--hl-bg)]" />
                  <div className="absolute left-[5%] top-1/2 h-px w-[28%] -translate-y-1/2 bg-[var(--hl-metal)]" />
                  <div className="absolute right-[7%] top-[22%] h-2.5 w-2.5 rounded-full bg-[var(--hl-ruby)]" />
                </div>

                <div className="grid grid-cols-2 gap-x-5 gap-y-3 border-t border-hl pt-5 font-mono text-[10px] uppercase tracking-[0.11em] text-hl-muted">
                  <div className="flex justify-between gap-3"><span>Levée</span><strong className="text-hl-metal">50°–52°</strong></div>
                  <div className="flex justify-between gap-3"><span>Tirage</span><strong className="text-hl-metal">12°–15°</strong></div>
                  <div className="flex justify-between gap-3"><span>Repère</span><strong className="text-hl-metal">&lt; 0.6 ms</strong></div>
                  <div className="flex justify-between gap-3"><span>Lubrifiant</span><strong className="text-hl-metal">9415</strong></div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 hidden border border-hl bg-[var(--hl-bg)] px-4 py-3 font-mono text-[9px] uppercase tracking-[0.15em] text-hl-muted sm:block">
              Documentation interactive
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-hl bg-[var(--hl-surface)]">
        <div className="hl-container grid grid-cols-2 divide-x divide-y divide-[var(--hl-line)] sm:grid-cols-4 sm:divide-y-0">
          {figures.map(([value, label]) => (
            <div key={label} className="px-4 py-7 text-center sm:px-6 sm:py-8">
              <div className="font-serif text-2xl text-[var(--hl-ink)] sm:text-3xl">{value}</div>
              <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.15em] text-hl-muted">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="hl-container py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="hl-kicker">Bibliothèque</div>
            <h2 className="hl-editorial-title mt-5 text-5xl sm:text-6xl">Quatre portes d’entrée.</h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-hl-muted">
              Choisissez une approche. La technique, le geste, la mesure et la culture se croisent ensuite naturellement.
            </p>
          </div>

          <div className="border-t border-hl">
            {gateways.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group grid gap-6 border-b border-hl py-8 transition lg:grid-cols-[70px_1fr_160px] lg:items-center"
                >
                  <div className="font-mono text-[11px] text-hl-metal">{item.index}</div>
                  <div>
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-hl-muted" />
                      <h3 className="font-serif text-2xl tracking-[-0.02em] text-[var(--hl-ink)] sm:text-3xl">{item.title}</h3>
                    </div>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-hl-muted">{item.text}</p>
                  </div>
                  <div className="flex items-center justify-between gap-4 lg:block lg:text-right">
                    <div className="font-mono text-[9px] uppercase tracking-[0.11em] text-hl-muted">{item.meta}</div>
                    <ArrowRight className="mt-3 ml-auto h-4 w-4 text-hl-metal transition group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#0b0d10] text-[#f2eee6]">
        <div className="hl-container py-20 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c2a36d]">Sélection éditoriale</div>
              <h2 className="mt-5 font-serif text-5xl font-normal tracking-[-0.025em] sm:text-6xl">À ouvrir sur l’établi.</h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-[#aaa49a]">
                Trois dossiers pour entrer immédiatement dans la précision mécanique et la lecture technique.
              </p>
            </div>

            <div className="border-t border-[#2a2f36]">
              {selected.map((item) => (
                <Link key={item.href} href={item.href} className="group grid gap-5 border-b border-[#2a2f36] py-8 sm:grid-cols-[45px_1fr_140px] sm:items-center">
                  <div className="font-serif text-xl text-[#c2a36d]">{item.number}</div>
                  <div>
                    <h3 className="font-serif text-2xl tracking-[-0.02em] sm:text-3xl">{item.title}</h3>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[#aaa49a]">{item.text}</p>
                  </div>
                  <div className="flex items-center justify-between sm:block sm:text-right">
                    <span className="font-mono text-[9px] uppercase tracking-[0.11em] text-[#8f8a81]">{item.note}</span>
                    <ArrowRight className="mt-3 ml-auto h-4 w-4 text-[#c2a36d] transition group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="hl-container py-20 sm:py-28">
        <div className="grid gap-10 border-y border-hl py-12 lg:grid-cols-3 lg:items-center">
          <div className="lg:col-span-2">
            <div className="hl-kicker">Horlogerie suisse</div>
            <h2 className="hl-editorial-title mt-4 text-4xl sm:text-5xl">Une culture de précision, ouverte à tous.</h2>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-hl-muted">
              HorloLearn rassemble des ressources pour comprendre, observer et partager l’horlogerie. Le site n’est pas un centre de formation : c’est une bibliothèque collaborative et indépendante consacrée au savoir horloger.
            </p>
          </div>
          <div className="flex gap-4 lg:justify-end">
            <Link href="/suisse" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-[var(--hl-ink)] hover:text-hl-metal">
              Découvrir le patrimoine <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {[
            [Gem, 'Matériaux', 'Aciers, alliages, rubis, silicium et matières employées dans le mouvement.'],
            [Layers3, 'Plans & architecture', 'Lire une construction, une coupe et les relations entre les organes.'],
            [Watch, 'Mécanismes', 'Observer comment l’énergie devient une mesure régulière du temps.'],
          ].map(([Icon, title, text]) => {
            const C = Icon as typeof Gem;
            return (
              <div key={title as string} className="border-t border-hl pt-5">
                <C className="h-5 w-5 text-hl-metal" />
                <h3 className="mt-5 font-serif text-2xl">{title as string}</h3>
                <p className="mt-3 text-sm leading-7 text-hl-muted">{text as string}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
