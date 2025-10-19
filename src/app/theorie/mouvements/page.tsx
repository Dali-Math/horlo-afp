import Image from "next/image";
import { useState } from "react";

// Bloc 1 : Intro Architecture
function MouvementIntro() {
  return (
    <section className="bg-neutral-900 text-white px-6 py-10 rounded-xl shadow mb-10">
      <h1 className="text-3xl font-bold mb-6">Architecture du mouvement</h1>
      <p className="text-lg mb-2">
        L’architecture d’un mouvement horloger conditionne la précision, la durabilité et la beauté de l’ensemble. Points clés : platine, ponts, fixation et décoration.
      </p>
    </section>
  );
}

// Bloc 2 : Platine & Ponts
function PlatineEtPonts() {
  return (
    <section className="bg-gradient-to-br from-zinc-700 via-gray-800 to-neutral-900 text-gray-100 p-7 rounded-xl mb-10 shadow">
      <h2 className="text-2xl font-semibold mb-3">La Platine et les Ponts</h2>
      <p>
        La <b>platine</b> établit la base du mouvement ; les <b>ponts</b> maintiennent les organes mobiles. Exemple régional : le "coq" pour pont de balancier dans le Jura.
      </p>
      <div className="flex flex-wrap gap-5 mt-5">
        <Image src="/images/platine-decoree.webp" alt="Platine décorée" width={240} height={150} className="rounded shadow" />
        <Image src="/images/pont-anglage.webp" alt="Pont anglé" width={180} height={110} className="rounded shadow" />
      </div>
    </section>
  );
}

// Bloc 3 : Fixations
function FixationSysteme() {
  return (
    <section className="bg-neutral-800 text-neutral-200 p-6 rounded-xl mb-8">
      <h3 className="text-xl font-bold mb-4">Système de fixation</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Montage des ponts sur la platine : vissage, ajustements de précision.</li>
        <li>Stabilité et précision dimensionnelle : matériaux étudiés, ajustages de haute qualité.</li>
        <li>Fixations : vis, rubis, logement conique ou poli.</li>
      </ul>
    </section>
  );
}

// Bloc 4 : Stabilité dimensionnelle
function StabiliteBloc() {
  return (
    <section className="bg-gradient-to-br from-gray-800 via-neutral-800 to-gray-900 text-gray-200 p-6 rounded-xl mb-10 shadow">
      <h3 className="text-xl font-bold mb-4">Stabilité dimensionnelle</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Matériaux : laiton, maillechort…</li>
        <li>Impact sur régularité, fiabilité, résistance aux chocs et à la déformation.</li>
        <li>Traitement anti-déformation : finitions, polissage, traitements thermiques.</li>
      </ul>
    </section>
  );
}

// Bloc 5 : Finitions décoratives
function FinitionBloc() {
  return (
    <section className="bg-neutral-900 text-gray-100 p-8 rounded-xl mb-10">
      <h3 className="text-2xl font-semibold mb-3">Finitions décoratives</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>Perlage</li>
        <li>Côtes de Genève</li>
        <li>Anglage (chanfrein manuel)</li>
        <li>Guillochage</li>
        <li>Satinage</li>
      </ul>
      <p className="mt-3">Outils et savoir-faire : lime, cabrons, bois, polisseuse. Exemples : Audemars Piguet, Breguet, Voutilainen.</p>
      <div className="flex gap-5 mt-5">
        <Image src="/images/cotes-de-geneve.webp" alt="Côtes de Genève" width={120} height={100} className="rounded" />
        <Image src="/images/perlage.webp" alt="Perlage" width={120} height={100} className="rounded" />
      </div>
    </section>
  );
}

// Bloc 6 : Animation/Quiz (simplifié, exemple de quiz)
function FinitionQuiz() {
  const questions = [
    {
      image: "/images/finition-1.webp",
      options: ["Perlage", "Anglage", "Satinage", "Guillochage"],
      answer: "Perlage"
    },
    {
      image: "/images/finition-2.webp",
      options: ["Côtes de Genève", "Anglage", "Perlage", "Satinage"],
      answer: "Côtes de Genève"
    }
  ];
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");

  function submit(opt: string) {
    setSelected(opt);
    setTimeout(() => {
      if (opt === questions[current].answer) setScore(score + 1);
      setCurrent(cur => cur + 1);
      setSelected("");
    }, 800);
  }

  if (current >= questions.length) {
    return (
      <div className="p-6 bg-neutral-900 rounded-xl text-white">
        <h4 className="font-bold mb-3">Quiz terminé !</h4>
        <p>Score : {score} / {questions.length}</p>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div className="p-6 bg-zinc-800 rounded-xl text-white shadow-lg">
      <Image src={q.image} alt="Exemple de finition" width={220} height={150} className="mb-4 rounded shadow-xl" />
      <div className="space-y-2">
        {q.options.map(opt => (
          <button
            key={opt}
            disabled={!!selected}
            className={`px-4 py-2 rounded border 
              ${selected === opt 
                ? opt === q.answer ? "bg-green-700 border-green-400" : "bg-red-700 border-red-400"
                : "bg-gray-700 border-gray-500 hover:bg-gray-600"}
            `}
            onClick={() => submit(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

// --- PAGE PRINCIPALE ---
export default function Mouvements() {
  return (
    <main className="w-full min-h-screen bg-neutral-950 p-2 md:p-8">
      <MouvementIntro />
      <PlatineEtPonts />
      <FixationSysteme />
      <StabiliteBloc />
      <FinitionBloc />
      <FinitionQuiz />
      {/* Tu peux ajouter des galeries, boutons switch dark/calcaire, schémas SVG stylisés etc. */}
    </main>
  );
}
