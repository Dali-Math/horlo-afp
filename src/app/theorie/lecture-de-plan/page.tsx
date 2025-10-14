"use client";
import Link from "next/link";
import { Layers, LineChart, Ruler, Grid, FileText, Cog } from "lucide-react";

export default function LectureDePlan() {
  const sections = [
    {
      icon: <Layers className="w-6 h-6 text-[#E2B44F]" />,
      title: "Vues Techniques",
      desc: "Comprendre les projections et coupes selon la norme ISO 128-3. Base de toute lecture de plan horloger.",
      href: "/theorie/lecture-de-plan/vues-techniques",
    },
    {
      icon: <LineChart className="w-6 h-6 text-[#E2B44F]" />,
      title: "Types de Lignes",
      desc: "Identifier les lignes de contour, d’axe, de coupe ou de cote selon la norme ISO 128-2.",
      href: "/theorie/lecture-de-plan/types-lignes",
    },
    {
      icon: <Ruler className="w-6 h-6 text-[#E2B44F]" />,
      title: "Cotes et Tolérances",
      desc: "Lecture et interprétation des cotes selon ISO 129-1 et des tolérances géométriques ISO 1101.",
      href: "/theorie/lecture-de-plan/cotes-tolerances",
    },
    {
      icon: <Grid className="w-6 h-6 text-[#E2B44F]" />,
      title: "Symboles Normalisés",
      desc: "Découvrir les symboles ISO 1302 et ISO 13715 utilisés pour indiquer la rugosité, les chanfreins et filetages.",
      href: "/theorie/lecture-de-plan/symboles-normalises",
    },
    {
      icon: <FileText className="w-6 h-6 text-[#E2B44F]" />,
      title: "Cartouche Horloger",
      desc: "Analyse du cartouche technique selon NIHS 7200/7201 : titre, échelle, matière et révision du dessin.",
      href: "/theorie/lecture-de-plan/cartouche-horloger",
    },
    {
      icon: <Cog className="w-6 h-6 text-[#E2B44F]" />,
      title: "Éléments d’Horlogerie",
      desc: "Étude des composants horlogers (roues, vis, axes) conformes aux standards NIHS.",
      href: "/theorie/lecture-de-plan/elements-horlogerie",
    },
  ];

  return (
    <section className="min-h-screen bg-[#0b1220] text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[#E2B44F] mb-4 text-center">
          Lecture de Plan Horloger
        </h1>
        <p className="text-center text-gray-400 mb-12">
          Découvrez les principes fondamentaux de la lecture de plans techniques selon les normes ISO et NIHS.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group bg-[#111827] border border-[#E2B44F33] rounded-2xl p-6 hover:border-[#E2B44F] hover:shadow-lg hover:shadow-[#E2B44F33] transition-all duration-300 flex flex-col items-start"
            >
              <div className="mb-4">{item.icon}</div>
              <h2 className="text-xl font-semibold text-[#E2B44F] mb-2 group-hover:text-[#FFD96A]">
                {item.title}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </Link>
          ))}
        </div>

        <p className="text-sm text-gray-500 mt-16 border-t border-gray-700 pt-6 text-center">
          © HorloLearn 2025 — Liens vers les normes ISO & NIHS. Ces fiches sont des résumés pédagogiques
          pour la formation et la culture horlogère suisse.
        </p>
      </div>
    </section>
  );
}
