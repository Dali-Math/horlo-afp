import React from "react";

export default function LocaleHome({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-gray-200">
      <h1 className="text-4xl font-bold text-[#E2B44F] mb-4">
        {locale === "fr"
          ? "Bienvenue sur HorloLearn"
          : "Welcome to HorloLearn"}
      </h1>
      <p className="text-lg text-gray-400">
        {locale === "fr"
          ? "Plateforme suisse d'apprentissage horloger"
          : "Swiss watchmaking learning platform"}
      </p>
    </main>
  );
}
