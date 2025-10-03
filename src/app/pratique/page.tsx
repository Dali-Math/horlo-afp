import React from "react";

export default function PratiqueHorlogere() {
  const categories = [
    {
      title: "Tutoriels Vidéo Pratiques",
      icon: "🎬",
      links: [
        { name: "Wristwatch Revival - Restaurations complètes", url: "#" },
        { name: "Nekidd Watchmaker - Techniques détaillées", url: "#" },
        { name: "Marshall Watch Co. - Réparations", url: "#" },
        { name: "Arthur's Craft Lab - Modifications", url: "#" },
        { name: "Hayes Horology - Cours pratiques", url: "#" },
      ],
    },
    {
      title: "Guides Pratiques PDF",
      icon: "📄",
      links: [
        { name: "Cousins UK - Guides techniques", url: "#" },
        { name: "Esslinger Watch School", url: "#" },
        { name: "Watchmaking Weebly - Ressources", url: "#" },
        { name: "Ofrei - Manuels de réparation", url: "#" },
      ],
    },
    {
      title: "Guides des Outils",
      icon: "🛠",
      links: [
        { name: "Esslinger - Catalogue d'outils", url: "#" },
        { name: "Cousins UK - Outils horlogers", url: "#" },
        { name: "Bergeon - Outils professionnels", url: "#" },
        { name: "Horotec - Équipement technique", url: "#" },
      ],
    },
    {
      title: "Projets et Exercices",
      icon: "📘",
      links: [
        { name: "r/Watchmaking Wiki - Guide débutant", url: "#" },
        { name: "Watch Repair Talk - Forum technique", url: "#" },
        { name: "NAWCC School of Horology", url: "#" },
      ],
    },
    {
      title: "Fournisseurs de Pièces",
      icon: "🏪",
      links: [
        { name: "Cousins UK - Pièces détachées", url: "#" },
        { name: "Esslinger - Fournitures horlogères", url: "#" },
        { name: "Ofrei - Pièces de montres", url: "#" },
        { name: "Jules Borel - Matériel horloger", url: "#" },
      ],
    },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center py-10 px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80')",
      }}
    >
      <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-5xl">
        <h1 className="text-4xl font-bold text-center text-gray-900">
          Pratique Horlogère
        </h1>
        <p className="text-center text-gray-700 mb-10">
          Ressources pour l'apprentissage pratique et les compétences techniques
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-white shadow hover:shadow-xl transition"
            >
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                <span className="text-2xl">{cat.icon}</span> {cat.title}
              </h2>
              <ul className="space-y-2">
                {cat.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
