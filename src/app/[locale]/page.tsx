import Link from "next/link";

export default function HomePage({ params }) {
  const locale = params.locale;
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center bg-[#0a0a0a] text-gray-200 px-6">
      <h1 className="text-5xl font-bold text-[#E2B44F] mb-6">
        {locale === "fr" ? "Bienvenue sur HorloLearn" : "Welcome to HorloLearn"}
      </h1>
      <p className="text-lg text-gray-300 max-w-2xl mb-8">
        {locale === "fr"
          ? "Découvrez l'apprentissage horloger suisse à travers des cours, des vidéos et des quiz interactifs."
          : "Discover Swiss watchmaking through lessons, videos, and interactive quizzes."}
      </p>

      <Link
        href={`/${locale}/pratique/remontage`}
        className="bg-[#E2B44F] text-black px-6 py-3 rounded-lg hover:bg-yellow-300 transition"
      >
        {locale === "fr" ? "Commencer l'apprentissage" : "Start Learning"}
      </Link>
    </main>
  );
}
