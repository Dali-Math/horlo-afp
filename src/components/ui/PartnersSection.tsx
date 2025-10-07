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
    <section className="relative py-32 bg-[#0A0A0A] overflow-hidden flex flex-col items-center justify-center">
      {/* Halo central */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[700px] h-[700px] bg-[#E2B44F]/10 rounded-full blur-[120px]" />
      </div>

      {/* Titre au centre */}
      <h2 className="text-center text-4xl md:text-6xl font-bebas tracking-wide text-[#E2B44F] mb-20 drop-shadow-[0_0_25px_rgba(226,180,79,0.4)] z-10">
        Avec le soutien des grandes maisons horlogères
      </h2>

      {/* Cercle d'orbite */}
      <div className="relative w-[500px] h-[500px] flex items-center justify-center">
        <div className="absolute w-full h-full animate-rotate">
          {partners.map((partner, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2"
              style={{
                transform: `rotate(${(360 / partners.length) * i}deg) translate(200px) rotate(-${
                  (360 / partners.length) * i
                }deg)`,
              }}
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={90}
                height={90}
                unoptimized
                className="object-contain opacity-90 hover:opacity-100 transition duration-500 drop-shadow-[0_0_15px_rgba(226,180,79,0.3)]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Légende */}
      <p className="mt-12 text-center text-sm text-slate-400">
        Ressources gratuites et open-source pour la formation en horlogerie.
      </p>

      {/* Animation */}
      <style jsx global>{`
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-rotate {
          animation: rotate 40s linear infinite;
          transform-origin: center center;
        }
      `}</style>
    </section>
  );
}
