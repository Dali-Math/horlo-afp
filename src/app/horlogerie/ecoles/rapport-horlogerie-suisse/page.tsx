'use client'

export default function RapportHorlogerieSuisse() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-neutral-200">
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-amber-400 mb-10">
          L’Horlogerie Suisse : Excellence et Tradition
        </h1>

        <div className="relative rounded-2xl overflow-hidden border border-amber-500/40 shadow-[0_0_30px_rgba(226,180,79,0.2)]">
          <iframe
            src="/horlogerie/rapport_horlogerie_suisse_complet.html"
            className="w-full h-[100dvh] border-0"
            style={{
              backgroundColor: '#0a0a0a',
              colorScheme: 'dark',
            }}
          ></iframe>

          <div className="absolute inset-0 pointer-events-none rounded-2xl border border-amber-400/10 backdrop-blur-sm"></div>
        </div>

        <div className="text-center mt-8">
          <a
            href="/horlogerie/ecoles"
            className="text-amber-400 hover:text-amber-300 transition-colors"
          >
            ← Retour aux Écoles d’Horlogerie
          </a>
        </div>
      </section>
    </main>
  )
}
