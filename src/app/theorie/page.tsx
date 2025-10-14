"use client";
import HeroSection from "./components/HeroSection";

export default function Theorie() {
  console.log("✅ Page Théorie rendue avec succès");

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-slate-100 text-slate-800">
      <HeroSection />
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl shadow-lg border border-blue-200 p-8">
          <h3 className="text-2xl font-bold text-blue-700 mb-4">Cours Académiques</h3>
          <ul className="space-y-3 text-gray-600">
            <li><a className="hover:text-blue-500" href="https://www.hautehorlogerie.org/fr/encyclopedie/" target="_blank">Encyclopédie FHH</a></li>
            <li><a className="hover:text-blue-500" href="https://www.federation-horlogerie.ch/fr/formation" target="_blank">Manuels FH</a></li>
            <li><a className="hover:text-blue-500" href="/theorie/lecture-de-plan">Lecture de plan</a></li>
          </ul>
        </div>
      </section>
    </main>
  );
}
