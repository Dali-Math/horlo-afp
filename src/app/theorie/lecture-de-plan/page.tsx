"use client";
import Link from "next/link";
import { ClipboardList, Ruler, Shapes, FileText } from "lucide-react";

export default function LectureDePlanPage() {
  const modules = [
    {
      href: "/theorie/lecture-de-plan/competences",
      title: "Compétences à développer",
      description: "Bases à maîtriser pour comprendre les représentations horlogères.",
      icon: <ClipboardList className="w-6 h-6 text-[#E2B44F]" />,
    },
    {
      href: "/theorie/lecture-de-plan/symboles-iso",
      title: "Symboles ISO",
      description: "Apprenez à reconnaître les symboles normalisés utilisés en horlogerie.",
      icon: <Shapes className="w-6 h-6 text-[#E2B44F]" />,
    },
    {
      href: "/theorie/lecture-de-plan/tolerances",
      title: "Cotes et Tolérances",
      description: "Lecture et interprétation des tolérances selon les normes techniques.",
      icon: <Ruler className="w-6 h-6 text-[#E2B44F]" />,
    },
    {
      href: "/theorie/lecture-de-plan/cartouche",
      title: "Cartouche Horloger",
      description: "Analyse d’un dessin technique complet d’un mouvement horloger.",
      icon: <FileText className="w-6 h-6 text-[#E2B44F]" />,
    },
  ];

  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white py-16 px-6 md:px-16">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#E2B44F]">
          Lecture de Plan Horloger
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Explorez les fondements de la lecture de plans techniques, indispensables à toute formation horlogère suisse.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
