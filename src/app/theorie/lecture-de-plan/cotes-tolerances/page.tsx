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
        <div className="mb-6">
          <Link
            href="/theorie/lecture-de-plan"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#151a28] text-gray-300 hover:text-white hover:bg-[#1f2637]"
          >
            ← Retour
          </Link>
        </div>

        <SchemaInteractif />
        <MemoSection />
        <QuizTolerances />
      </div>
    </main>
  );
}
