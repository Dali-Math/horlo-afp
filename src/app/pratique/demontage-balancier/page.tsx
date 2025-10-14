import { Metadata } from "next";
import HowToSchema from "@/components/HowToSchema";
import BreadcrumbsSchema from "@/components/BreadcrumbsSchema";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Démontage du balancier – ${SITE.name}`,
  description:
    "Procédure complète pour démonter le balancier sur un mouvement ETA 6497 en toute sécurité.",
};

export default function DemontageBalancier() {
  const steps = [
    { name: "Préparer l'établi", text: "Équipe-toi d'une brucelle antimagnétique et d'un porte-mouvement." },
    { name: "Bloquer le balancier", text: "Stabilise le mouvement et repère le piton fixe." },
    { name: "Déposer la raquette", text: "Dévisse avec précision en évitant toute torsion." },
    { name: "Retirer le balancier", text: "Saisis délicatement l'axe et lève à 90° sans forcer." },
  ];

  return (
    <section className="max-w-3xl mx-auto p-6">
      <BreadcrumbsSchema
        items={[
          { name: "Accueil", slug: "" },
          { name: "Pratique", slug: "pratique" },
        ]}
        currentTitle="Démontage du balancier"
        currentPath="/pratique/demontage-balancier"
      />
      <h1 className="text-3xl font-bold text-[#E2B44F] mb-4">Démontage du balancier</h1>
      <p className="text-gray-300 mb-6">
        Guide pas-à-pas pour retirer le balancier sur un mouvement ETA 6497 dans le cadre de la formation AFP.
      </p>
      <ol className="list-decimal pl-5 text-gray-300 space-y-2">
        {steps.map((s) => (
          <li key={s.name}><strong>{s.name} :</strong> {s.text}</li>
        ))}
      </ol>
      <HowToSchema
        name="Démontage du balancier (ETA 6497)"
        description="Procédure complète pour démonter le balancier sur un mouvement d'entraînement suisse ETA 6497."
        steps={steps}
      />
    </section>
  );
}
