import Link from "next/link";

export const metadata = {
  title: "Réveil Mécanique | Complications Horlogères Suisses",
  description: "Découvrez le fonctionnement du réveil mécanique, une complication sonore emblématique de l’horlogerie suisse, ancêtre du réveil moderne.",
};

export default function ReveilMecaniquePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-6">Réveil Mécanique</h1>
        <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
          Le <strong>réveil mécanique</strong> est une complication sonore permettant d’émettre un son vibrant à
          l’heure programmée. Véritable ancêtre du réveil moderne, il incarne la fusion entre utilité quotidienne et
          ingéniosité horlogère suisse.
        </p>
      </div>

      <section className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-12 shadow-xl">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
          ⏰ Fonctionnement
        </h2>
        <p className="text-gray-300 leading-relaxed">
          Le réveil mécanique repose sur un <strong>barillet indépendant</strong> alimentant un marteau miniature
          frappant une cloche interne. À l’heure réglée, un déclencheur libère le mécanisme, produisant une vibration
          ou un son distinctif.  
          <br />
          Certaines montres utilisent des timbres pour un son plus harmonieux, tandis que d’autres misent sur la
          vibration pure, héritage des premières “Cricket” de Vulcain.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 text-center shadow-md">
          <p className="text-gray-400 mb-2">Invention</p>
          <p className="text-2xl font-bold text-white">1947</p>
          <p className="text-gray-400">Vulcain</p>
        </div>

        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 text-center shadow-md">
          <p className="text-gray-400 mb-2">Prix estimé</p>
          <p className="text-2xl font-bold text-white">8’000 – 50’000 CHF</p>
          <p className="text-gray-400">≈ 350 composants</p>
        </div>
      </div>

      <div className="text-center mb-12">
        <h3 className="text-xl font-semibold mb-4">🏛️ Manufactures suisses associées</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {["Vulcain", "Jaeger-LeCoultre", "Breguet"].map((brand) => (
            <span
              key={brand}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-full text-gray-300 hover:bg-slate-700 transition"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Link href="/theorie/complications">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition">
            ← Retour aux complications
          </button>
        </Link>
      </div>
    </main>
  );
}
