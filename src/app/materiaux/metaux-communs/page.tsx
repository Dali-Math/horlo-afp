export default function MetauxCommunsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-900 transition">
      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* En-tête livre */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Chapitre 2 – Métaux communs
          </h1>

          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Visionneuse en mode livre, adaptée automatiquement au thème clair ou sombre du site.
          </p>
        </div>

        {/* Cadre style livre */}
        <div className="
          rounded-xl border 
          border-zinc-300 bg-zinc-50 shadow-md 
          dark:border-zinc-700 dark:bg-zinc-800/40
          transition 
          p-5
        ">
          <div className="relative w-full overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-inner">
            <iframe
              src="/pdfs/metaux-communs.pdf#toolbar=0&navpanes=0&scrollbar=0"
              className="w-full"
              style={{ height: "85vh" }}
            />
          </div>
        </div>

      </div>
    </main>
  );
}
