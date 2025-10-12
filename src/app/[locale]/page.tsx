import Link from "next/link";

type PageProps = {
  params: {
    locale: string;
  };
};

export default function HomePage({ params }: PageProps) {
  const locale = params.locale;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center bg-[#0a0a0a] text-gray-200 px-6">
      <h1 className="text-4xl md:text-5xl font-bold text-[#E2B44F] mb-6">
        Bienvenue sur HorloLearn ({locale.toUpperCase()})
      </h1>
      <p className="text-gray-400 max-w-2xl mb-8">
        Explorez le monde fascinant de l'horlogerie suisse — théorie, pratique et culture, maintenant disponible en deux langues.
      </p>
      <Link
        href={`/${locale}/pratique`}
        className="bg-[#E2B44F] text-black px-6 py-3 rounded-md font-semibold hover:bg-yellow-300 transition"
      >
        Accéder à la section Pratique
      </Link>
    </main>
  );
}
