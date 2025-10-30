'use client'

export default function RapportHorlogerieSuisse() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200">
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-amber-400 mb-6">
          L’Horlogerie Suisse : Excellence et Tradition
        </h1>
        <iframe
          src="/horlogerie/rapport-horlogerie-suisse.html"
          className="w-full h-[150vh] rounded-xl border border-amber-500/20"
        />
      </section>
    </main>
  )
}
