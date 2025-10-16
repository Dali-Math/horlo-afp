export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import Link from "next/link";
import SchemaInteractif from "./components/SchemaInteractif";
import MemoSection from "./components/MemoSection";
import QuizTolerances from "./components/QuizTolerances";

export default function PageCotesTolerances() {
  return (
    <main className="min-h-screen bg-[#0a0e1a] text-gray-200 px-6 py-16">
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="mb-8">
          <Link
            href="/theorie/lecture-de-plan"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#151a28] text-gray-300 hover:text-white hover:bg-[#1f2637] transition-all"
          >
            ← Retour
          </Link>
        </div>

        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#E2B44F] mb-4">
            Cotes et Tolérances (ISO 129-1 & 1101)
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Maîtrise les règles de cotation et les tolérances indispensables à
            la qualité en horlogerie : assemblage, usinage et contrôle dimensionnel.
          </p>
        </header>

        <SchemaInteractif />
        <MemoSection />
        <QuizTolerances />

        <footer className="text-center text-gray-500 text-sm pt-8 border-t border-gray-800">
          © HorloLearn 2025 — Cotes & Tolérances en Horlogerie
        </footer>
      </div>
    </main>
  );
}
