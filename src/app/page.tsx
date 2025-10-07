"use client";
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Wrench, Brain, Clock, FileText, Headphones, Award, Calendar, Users, Play } from 'lucide-react';
import { motion } from 'framer-motion';

// Swiss cross logo component
function SwissLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-8 h-8 md:w-10 md:h-10">
        <div className="absolute inset-0 bg-red-600 rounded"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-2 md:w-2.5 h-6 md:h-7 bg-white absolute -translate-x-1/2 left-1/2 -translate-y-1/2 top-1/2"></div>
          <div className="h-2 md:h-2.5 w-6 md:w-7 bg-white absolute -translate-x-1/2 left-1/2 -translate-y-1/2 top-1/2"></div>
        </div>
      </div>
      <span className="font-semibold tracking-wide text-gray-900">Horlo AFP</span>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
        <SwissLogo />
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <Link href="/theorie" className="hover:text-red-700">Théorie</Link>
          <Link href="/pratique" className="hover:text-red-700">Pratique</Link>
          <Link href="/outils" className="hover:text-red-700">Outils</Link>
          <Link href="/ressources" className="hover:text-red-700">Ressources</Link>
          <Link href="/communaute" className="hover:text-red-700">Communauté</Link>
        </nav>
        <Link href="/quiz" className="px-3 py-2 rounded-md bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition">Quiz</Link>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-100 via-slate-100 to-slate-200" />
      <div className="absolute inset-0 -z-10 opacity-60" style={{backgroundImage:
        'radial-gradient(600px 200px at 10% 20%, rgba(2,132,199,0.15), transparent 60%), radial-gradient(600px 200px at 90% 10%, rgba(30,64,175,0.15), transparent 60%), radial-gradient(800px 300px at 50% 90%, rgba(148,163,184,0.18), transparent 60%)'}} />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            <span className="text-red-700">Horlogerie suisse</span>
            <span className="block text-slate-800 mt-2">Apprentissage moderne et immersif</span>
          </h1>
          <p className="mt-5 text-lg md:text-xl text-slate-600">
            Un parcours pédagogique gratuit, structuré et pratique pour débuter ou se perfectionner.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/theorie" className="px-5 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition">Commencer</Link>
            <Link href="/communaute" className="px-5 py-3 rounded-lg bg-white border border-slate-300 text-slate-800 font-semibold hover:bg-slate-50 transition">Rejoindre la communauté</Link>
          </div>
          <div className="mt-6 text-sm text-slate-500">Accès libre, sans inscription — Ressources validées par des institutions</div>
        </div>

        <div className="relative group rounded-2xl overflow-hidden bg-slate-900 shadow-2xl">
          <div className="aspect-video">
            <video className="w-full h-full object-cover opacity-90" autoPlay muted loop playsInline>
              <source src="/hero-watch.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
          <button className="absolute left-4 bottom-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/90 text-slate-900 font-semibold hover:bg-white transition">
            <Play className="w-4 h-4" /> Aperçu immersif
          </button>
        </div>
      </div>
    </section>
  );
}

function Carousel() {
  const items = [
    { name: 'Théorie', href: '/theorie' },
    { name: 'Pratique', href: '/pratique' },
    { name: 'Quiz', href: '/quiz' },
    { name: 'Outils', href: '/outils' },
    { name: 'Ressources', href: '/ressources' },
    { name: 'Culture', href: '/culture' },
    { name: 'Événements', href: '/evenements' },
    { name: 'Communauté', href: '/communaute' },
  ];
  return (
    <section className="py-8 md:py-10 bg-white/70 border-y border-slate-200">
      <div className="overflow-hidden">
        <div className="flex gap-6 animate-[scroll_25s_linear_infinite]" style={{maskImage:'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)'}}>
          {items.concat(items).map((it, i) => (
            <Link key={i} href={it.href} className="shrink-0 px-5 py-2 rounded-full border border-slate-300 bg-white text-slate-700 hover:border-red-600 hover:text-red-700 transition">
              {it.name}
            </Link>
          ))}
        </div>
      </div>
      <style>{`@keyframes scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </section>
  );
}

function ExploreGrid() {
  const cards = [
    { name: 'Théorie', href: '/theorie', icon: BookOpen, desc: "Cours structurés, bases aux complications" },
    { name: 'Pratique', href: '/pratique', icon: Wrench, desc: "Gestes métiers, réglages et outillage" },
    { name: 'Quiz', href: '/quiz', icon: Brain, desc: "Évaluez vos acquis en continu" },
    { name: 'Outils', href: '/outils', icon: Clock, desc: "Calculs, tolérances et conversions" },
    { name: 'Ressources', href: '/ressources', icon: FileText, desc: "Normes, fiches et documents" },
    { name: 'Podcasts', href: '/podcasts', icon: Headphones, desc: "Écouter des experts du métier" },
    { name: 'Culture', href: '/culture', icon: Award, desc: "Histoire et musées suisses" },
    { name: 'Événements', href: '/evenements', icon: Calendar, desc: "Ateliers, salons et rencontres" },
    { name: 'Communauté', href: '/communaute', icon: Users, desc: "Échanger, s'entraider, progresser" },
  ];
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">Explore</h2>
        <p className="mt-3 text-slate-600">Choisissez une rubrique pour commencer</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c, idx) => (
          <Link key={c.href} href={c.href} className="group relative rounded-2xl bg-white border border-slate-200 shadow hover:shadow-xl hover:border-red-600 transition overflow-hidden" style={{animation:`fadeInUp .6s ease ${idx*0.06}s both`}}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-red-600 to-red-700 text-white shadow">
                  {c.icon ? <c.icon className="w-6 h-6" /> : null}
                </div>
                <svg className="w-6 h-6 text-red-600 opacity-0 group-hover:opacity-100 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-red-700">{c.name}</h3>
              <p className="mt-1 text-slate-600">{c.desc}</p>
            </div>
            <div className="h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </Link>
        ))}
      </div>
      <style>{`@keyframes fadeInUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </section>
  );
}

// ✅ Nouvelle section premium (remplace InstitutionsBand)
function PartnersSection() {
  const partners = [
    { src: "/images/partners/rolex.png", alt: "Rolex" },
    { src: "/images/partners/patek.png", alt: "Patek Philippe" },
    { src: "/images/partners/audemars.png", alt: "Audemars Piguet" },
    { src: "/images/partners/vacheron.png", alt: "Vacheron Constantin" },
    { src: "/images/partners/chopard.png", alt: "Chopard" },
    { src: "/images/partners/piaget.png", alt: "Piaget" },
    { src: "/images/partners/muller.png", alt: "Franck Muller" },
  ];

  return (
    <section className="relative bg-[#0A0A0A] py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#0A0A0A] to-[#141414] animate-[shine_8s_linear_infinite]" />
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#E2B44F]" style={{ textShadow: "0 0 15px rgba(226,180,79,0.7)" }}>
          Avec le soutien des grandes maisons horlogères
        </h2>
      </div>

      <motion.div
        className="flex items-center justify-around gap-20 px-8 relative z-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      >
        {[...partners, ...partners].map((p, i) => (
          <motion.div key={i} className="grayscale hover:grayscale-0 transition-all duration-700" whileHover={{ scale: 1.05 }}>
            <Image src={p.src} alt={p.alt} width={180} height={100} className="object-contain opacity-85 hover:opacity-100 transition-all" />
          </motion.div>
        ))}
      </motion.div>

      <p className="text-center text-gray-400 mt-10 text-sm relative z-10">
        Ressources gratuites et open-source pour la formation en horlogerie.
      </p>

      <style>{`
        @keyframes shine {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
      `}</style>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Carousel />
      <ExploreGrid />
      <PartnersSection /> {/* ✅ section premium */}
    </div>
  );
}
