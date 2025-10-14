"use client";
import FlipBookViewer from "@/components/FlipBookViewer";

export default function CartoucheHorloger() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 lg:px-16 py-16 text-white bg-[#0B0B0B]">
      <div>
        <h1 className="text-4xl font-bold text-gold-400 mb-6">Cartouche Horloger</h1>
        <p className="text-lg text-gray-300 mb-4">
          Le cartouche technique (norme <strong>ISO 7200</strong> et <strong>NIHS</strong>)
          regroupe les informations essentielles du plan : identification, échelle, matière et auteur.
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-2">
          <li>Nom de la pièce et du dessinateur.</li>
          <li>Indice de révision et tolérances globales.</li>
          <li>Norme utilisée et unités employées.</li>
        </ul>
      </div>
      <div>
        <FlipBookViewer pdfUrl="/pdfs/lecture-de-plan/cartouche-horloger.pdf" />
      </div>
    </section>
  );
}
