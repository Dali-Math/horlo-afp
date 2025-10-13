"use client";
import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Envoi en cours...");
    const form = e.currentTarget;
    const data = new FormData(form);
    const res = await fetch("https://formspree.io/f/mvgwbgry", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      setStatus("✅ Message envoyé avec succès !");
      form.reset();
    } else {
      setStatus("❌ Erreur lors de l'envoi. Réessaie plus tard.");
    }
  };

  return (
    <section className="py-20 px-6 bg-[#0a0a0a] text-gray-200">
      <div className="max-w-xl mx-auto">
        <h2 className="text-4xl font-bold text-[#E2B44F] mb-6">Contact</h2>

        <p className="text-gray-400 mb-8 leading-relaxed">
          Tu veux proposer une idée ou demander d'ajouter une ressource sur le site&nbsp;?{" "}
          <br />
          <span className="text-[#E2B44F] font-semibold animate-glow hover:text-[#f9d56e] transition-colors duration-500">
            Écris-moi ici 👇
          </span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Votre nom"
            required
            className="w-full p-3 rounded bg-[#1a1a1a] border border-gray-700"
          />
          <input
            type="email"
            name="email"
            placeholder="Votre email"
            required
            className="w-full p-3 rounded bg-[#1a1a1a] border border-gray-700"
          />
          <textarea
            name="message"
            placeholder="Votre message"
            required
            className="w-full p-3 h-40 rounded bg-[#1a1a1a] border border-gray-700"
          />
          <button
            type="submit"
            className="bg-[#E2B44F] text-black px-6 py-3 rounded font-bold hover:bg-[#f0ca67] transition"
          >
            Envoyer
          </button>
          {status && <p className="mt-3 text-green-400">{status}</p>}
        </form>
      </div>

      {/* Animation dorée personnalisée */}
      <style jsx>{`
        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 5px #e2b44f, 0 0 10px #e2b44f, 0 0 20px #e2b44f;
          }
          50% {
            text-shadow: 0 0 10px #f9d56e, 0 0 20px #f9d56e, 0 0 30px #f9d56e;
          }
        }
        .animate-glow {
          animation: glow 2.5s ease-in-out infinite alternate;
        }
      `}</style>
    </section>
  );
}
