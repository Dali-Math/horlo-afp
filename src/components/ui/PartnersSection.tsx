"use client";
import Image from "next/image";

export default function PartnersSection() {
  const partners = [
    { name: "Rolex", logo: "/images/partners/rolex.png" },
    { name: "Patek Philippe", logo: "/images/partners/patek.png" },
    { name: "Audemars Piguet", logo: "/images/partners/audemars.png" },
    { name: "Vacheron Constantin", logo: "/images/partners/vacheron.png" },
    { name: "Piaget", logo: "/images/partners/piaget.png" },
    { name: "Chopard", logo: "/images/partners/chopard.png" },
    { name: "Franck Muller", logo: "/images/partners/muller.png" },
  ];

  return (
    <section className="relative flex flex-col items-center justify-center py-32 bg-[#0A0A0A] overflow-hidden">
      {/* Halo doré */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[700px] h-[700px] bg-[#E2B44F]/10 rounded-full blur-[120px]" />
      </div>

      {/* Titre central */}
      <h2 className="text-center text-4xl md:text-6xl font-bebas tracking-wide text-[#E2B44F] mb-20 drop-shadow-[0_0_25px_rgba(226,180,79,0.4)] z-10">
        Avec le soutien des grandes maisons horlogères
      </h2>

      {/* Conteneur du cercle */}
      <div className="relative w-[500px] h-[500px]">
        {/* Cercle rotatif */}
        <div className="absolute inset-0 animate-rotation-smooth">
          {partners.map((partner, i) => {
            const angle = (i / partners.length) * 2 * Math.PI;
            const radius = 200;
            const x = Math.cos(angle) * radius + 200;
            const y = Math.sin(angle) * radius + 200;

            return (
              <div
                key={i}
                className="absolute"
                style={{ top: `${y}px`, left: `${x}px` }}
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={100}
                  height={100}
                  unoptimized
                  className="object-contain opacity-90 hover:opacity-100 transition duration-500 drop-shadow-[0_0_12px_rgba(226,180,79,0.25)]"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Légende */}
      <p className="mt-12 text-center text-sm text-slate-400 z-10">
        Ressources gratuites et open-source pour la formation en horlogerie.
      </p>

      {/* Animation CSS */}
      <style jsx global>{`
        @keyframes rotation-smooth {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-rotation-smooth {
          animation: rotation-smooth 40s linear infinite;
          transform-origin: center center;
        }
      `}</style>
    </section>
  );
}
