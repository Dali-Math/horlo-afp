"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type Material = {
  icon: string;
  title: string;
  colorClass: string;
  illustration: string;
  description: string;
  useCases: string[];
  category: "Classiques" | "Innovation" | "Décoratif";
};

const MATERIALS: Material[] = [
  // ... (Même data que précédemment pour les matériaux, voir message précédent)
  // Pour chaque illustration, indique un chemin valide vers tes images /images/materiaux/*.jpg
  // par exemple : illustration: "/images/materiaux/or.jpg"
  // (si tu veux, je peux te donner une liste de belles images CC0 pour chaque matériau)
];

const CATEGORIES = ["Tous", "Classiques", "Innovation", "Décoratif"] as const;
type Category = typeof CATEGORIES[number];

function MaterialCard({
  icon,
  title,
  colorClass,
  description,
  useCases,
  illustration,
  onImageClick
}: Material & { onImageClick: () => void }) {
  return (
    <div className="group bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-gray-800 shadow-xl overflow-hidden transition-transform hover:shadow-2xl hover:scale-105 flex flex-col">
      <button
        type="button"
        className="w-full h-48 overflow-hidden focus:outline-none border-0 p-0 bg-transparent"
        onClick={onImageClick}
        tabIndex={0}
        aria-label={`Voir une grande image de ${title}`}
      >
        <img src={illustration} alt={title}
          className="w-full h-48 object-cover object-center rounded-t-xl group-hover:brightness-95 transition"
          style={{ minHeight: 180, background: "#eee" }}
          loading="lazy"
        />
      </button>
      <div className="relative z-10 p-6 flex-1 flex flex-col">
        <div className="flex items-center mb-4">
          <div className={`${colorClass} text-white rounded-full p-3 text-xl shadow-lg mr-4`}>
            {icon}
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
        </div>
        <p className="text-slate-700 dark:text-slate-300 mb-3 text-sm leading-relaxed flex-1">{description}</p>
        <div>
          <span className="block uppercase text-[11px] text-slate-500 dark:text-slate-400 font-semibold mb-1">Applications</span>
          <ul className="list-disc pl-6 text-slate-700 dark:text-slate-200 text-sm space-y-1">
            {useCases.map((u, i) => <li key={i}>{u}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ZoomModal({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  // Empêche le scroll back sur le body
  useState(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  });
  return (
    <div
      tabIndex={-1}
      onClick={onClose}
      onKeyDown={e => { if (e.key === "Escape") onClose(); }}
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center animate-fadein cursor-zoom-out"
      aria-modal="true"
      role="dialog"
    >
      <img
        src={src}
        alt={alt}
        className="max-h-[90vh] max-w-[95vw] rounded-2xl shadow-2xl border-4 border-yellow-300/50 animate-zoomin"
        onClick={e => e.stopPropagation()}
      />
    </div>
  );
}

export default function MateriauxPage() {
  const [filter, setFilter] = useState<Category>("Tous");
  const [zoom, setZoom] = useState<null | { src: string; alt: string }>(null);

  const filtered = filter === "Tous"
    ? MATERIALS
    : MATERIALS.filter(m => m.category === filter);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <header className="max-w-3xl mx-auto text-center mb-14">
          <h1 className="text-5xl font-extrabold text-gold dark:text-yellow-400 mb-4 tracking-tight animate-fadein">
            Matériaux en Horlogerie Suisse
          </h1>
          <p className="text-xl text-slate-700 dark:text-slate-200 font-medium animate-fadein">
            Du savoir-faire traditionnel aux technologies de pointe, découvrez les matériaux qui façonnent les chefs-d’œuvre suisses.
          </p>
        </header>

        <nav className="flex justify-center gap-3 mb-10 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all border border-transparent shadow ${filter === cat ? "bg-yellow-400 text-white" : "dark:bg-slate-800 bg-white hover:bg-yellow-200 hover:text-yellow-900 dark:hover:bg-yellow-600 dark:hover:text-white text-gray-800 dark:text-white"}`}
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* Carousel mobile */}
        <div className="block md:hidden animate-fadein">
          <Swiper
            spaceBetween={20}
            slidesPerView={1.15}
            centeredSlides
            style={{ paddingBottom: 24 }}
          >
            {filtered.map((material, i) => (
              <SwiperSlide key={i}>
                <MaterialCard {...material} onImageClick={() => setZoom({ src: material.illustration, alt: material.title })} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* Grille desktop */}
        <section className="hidden md:grid grid-cols-2 xl:grid-cols-3 gap-8 animate-fadein">
          {filtered.map((material, i) => (
            <MaterialCard key={i} {...material} onImageClick={() => setZoom({ src: material.illustration, alt: material.title })} />
          ))}
        </section>

        <section className="max-w-2xl mx-auto mt-16 bg-white/90 dark:bg-slate-900/80 rounded-xl px-7 py-8 shadow text-slate-900 dark:text-slate-100 animate-fadein">
          <h2 className="text-2xl font-bold text-[#E2B44F] mb-2">À retenir</h2>
          <ul className="text-lg leading-relaxed list-disc pl-6 space-y-2 font-medium">
            <li>Tradition (or, acier, laiton) + Innovation (titane, céramique, silicium) = histoire vivante de l’horlogerie suisse.</li>
            <li>Choix du matériau = identité de la montre (luxueuse, sportive, technique, artistique...).</li>
            <li>Les finitions, traitements de surface et associations offrent des possibilités infinies !</li>
          </ul>
        </section>
      </div>
      {zoom && (
        <ZoomModal
          src={zoom.src}
          alt={zoom.alt}
          onClose={() => setZoom(null)}
        />
      )}

      {/* Animations utilitaires */}
      <style>{`
        .animate-fadein {
          animation: fadein 0.8s ease;
        }
        .animate-zoomin {
          animation: zoomin 0.35s cubic-bezier(.23,1.25,.32,1);
        }
        @keyframes fadein {
          from { opacity: 0; transform: translateY(24px);}
          to { opacity: 1; transform: none;}
        }
        @keyframes zoomin {
          from { opacity:0; transform: scale(.7);}
          to { opacity:1; transform: scale(1);}
        }
      `}
      </style>
    </main>
  );
}
