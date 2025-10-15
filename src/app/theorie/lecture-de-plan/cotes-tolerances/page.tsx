{/* --- Historique des normes --- */}
<section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10">
  <h2 className="text-2xl font-semibold text-blue-800 mb-6">Contexte & Origines des Normes</h2>
  <p className="text-gray-700 leading-relaxed">
    Les normes <strong>ISO 129-1</strong> et <strong>ISO 1101</strong> ont été introduites pour
    harmoniser la manière de représenter les dimensions, tolérances et spécifications
    géométriques sur les plans techniques. En horlogerie, leur application permet de garantir
    l'interchangeabilité des pièces, la fiabilité des assemblages et la précision des
    mouvements.
  </p>
</section>

{/* --- Tableau des tolérances types --- */}
<section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10">
  <h2 className="text-2xl font-semibold text-blue-800 mb-6">Exemples de Tolérances en Horlogerie</h2>
  <div className="overflow-x-auto">
    <table className="min-w-full border-collapse text-sm text-left text-gray-700">
      <thead className="bg-gray-100 text-gray-600 uppercase tracking-wide text-xs">
        <tr>
          <th className="px-4 py-3 border">Type de pièce</th>
          <th className="px-4 py-3 border">Cote nominale</th>
          <th className="px-4 py-3 border">Tolérance</th>
          <th className="px-4 py-3 border">Fonction</th>
        </tr>
      </thead>
      <tbody>
        <tr className="hover:bg-blue-50 transition">
          <td className="px-4 py-3 border">Axe de balancier</td>
          <td className="px-4 py-3 border">Ø 0.80 mm</td>
          <td className="px-4 py-3 border">±0.005 mm</td>
          <td className="px-4 py-3 border">Pivotement fluide</td>
        </tr>
        <tr className="hover:bg-blue-50 transition">
          <td className="px-4 py-3 border">Trou de rubis</td>
          <td className="px-4 py-3 border">Ø 0.20 mm</td>
          <td className="px-4 py-3 border">+0.002 / -0 mm</td>
          <td className="px-4 py-3 border">Guidage précis</td>
        </tr>
        <tr className="hover:bg-blue-50 transition">
          <td className="px-4 py-3 border">Barillet</td>
          <td className="px-4 py-3 border">Ø 10.00 mm</td>
          <td className="px-4 py-3 border">±0.02 mm</td>
          <td className="px-4 py-3 border">Stockage d’énergie</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

{/* --- Bloc citation motivationnelle --- */}
<section className="bg-blue-50 border border-blue-100 shadow-sm rounded-2xl p-8 text-center">
  <blockquote className="text-xl italic text-blue-900">
    “La précision n’est pas une option, c’est une exigence en horlogerie.”
  </blockquote>
  <p className="mt-4 text-blue-700 font-medium">— Principe fondamental de la cotation ISO</p>
</section>

{/* --- FAQ --- */}
<section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10">
  <h2 className="text-2xl font-semibold text-blue-800 mb-6">Questions fréquentes (FAQ)</h2>
  <div className="space-y-5 text-gray-700">
    <details className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <summary className="cursor-pointer font-medium text-blue-700">Quelle est la différence entre tolérance dimensionnelle et géométrique ?</summary>
      <p className="mt-2">
        La tolérance dimensionnelle concerne les tailles (longueur, diamètre) tandis que la géométrique garantit la forme (planéité, perpendicularité, etc.).
      </p>
    </details>
    <details className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <summary className="cursor-pointer font-medium text-blue-700">Puis-je utiliser plusieurs unités sur un même plan ?</summary>
      <p className="mt-2">
        Oui, mais il faut clairement indiquer le changement d’unité pour éviter toute ambiguïté lors de la fabrication.
      </p>
    </details>
  </div>
</section>

{/* --- Appel à l'action --- */}
<section className="text-center py-10">
  <p className="text-gray-600 text-lg mb-4">📘 Tu veux aller plus loin ?</p>
  <a
    href="https://www.iso.org/fr/standard/70382.html"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-800 transition"
  >
    Consulter la norme ISO 129-1 complète
  </a>
</section>
