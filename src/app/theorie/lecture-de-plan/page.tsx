"use client";
import Link from "next/link";
import { Layers, Ruler, Square, FileText, Wrench, Shapes } from "lucide-react";

export default function LectureDePlanPage() {
  const modules = [
    {
      href: "/theorie/lecture-de-plan/vues-techniques",
      title: "Vues Techniques",
      description:
        "Comprendre les projections et coupes selon la norme ISO 128-3. Base de toute lecture de plan horloger.",
      icon: <Layers className="w-6 h-6 text-[#E2B44F]" />,
    },
    {
      href: "/theorie/lecture-de-plan/types-lignes",
      title: "Types de Lignes",
      description:
        "Identifier les lignes de contour, d’axe, de coupe ou de cote (ISO 128-2).",
      icon: <Square className="w-6 h-6 text-[#E2B44F]" />,
    },
    {
      href: "/theorie/lecture-de-plan/cotes-tolerances",
      title: "Cotes et Tolérances",
      description:
        "Lecture et interprétation des cotes selon ISO 129-1 et des tolérances géométriques ISO 1101.",
      icon: <Ruler className="w-6 h-6 text-[#E2B44F]" />,
    },
    {
      href: "/theorie/lecture-de-plan/symboles-normalises",
      title: "Symboles Normalisés",
      description:
        "Découverte des symboles ISO (états de surface, chanfreins, filetage, etc.) – ISO 1302 et ISO 13715.",
      icon: <Shapes className="w-6 h-6 text-[#E2B44F]" />,
    },
    {
      href: "/theorie/lecture-de-plan/cartouche-horloger",
      title: "Cartouche Horloger",
      description:
        "Analyse du cartouche technique (titre, échelle, matière, auteur, révision) – ISO 7200 / NIHS.",
      icon: <FileText className="w-6 h-6 text-[#E2B44F]" />,
    },
    {
      href: "/theorie/lecture-de-plan/elements-horlogerie",
      title: "Éléments d’Horlogerie",
      description:
        "Lecture et identification des composants horlogers sur un plan (ponts, axes, roues, vis, etc.).",
      icon: <Wrench className="w-6 h-6 text-[#E2B44F]" />,
    },
  ];

  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white py-16 px-6 md:px-16">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#E2B44F]">
          Lecture de Plan Horloger
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Découvrez les principes fondamentaux de la lecture de plan horloger selon les normes ISO et NIHS.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {modules.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="bg-[#111] border border-[#E2B44F]/20 rounded-2xl p-6 hover:border-[#E2B44F]/60 hover:shadow-[0_0_15px_rgba(226,180,79,0.3)] transition-all duration-300 group"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="p-3 bg-[#E2B44F]/10 rounded-full group-hover:bg-[#E2B44F]/20 transition">
                {item.icon}
              </div>
              <h2 className="text-xl font-semibold text-[#E2B44F]">{item.title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
