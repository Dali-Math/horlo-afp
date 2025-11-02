import {
  BookOpen,
  Activity,
  Watch,
  Battery,
  Stethoscope,
  BadgeCheck,
  Scale,
  Zap,
  Timer,
  Share2,
  Sigma,
  Percent,
  Waves,
  PieChart,
  Database
} from 'lucide-react'

const menu = [
  { icon: BookOpen, label: "Bibliothèque de Ressources" },
  { icon: Activity, label: "Calculateur Précision COSC" },
  { icon: Watch, label: "Simulateur de Complications" },
  { icon: Battery, label: "Réserve de Marche" },
  { icon: Stethoscope, label: "Diagnostiqueur de Problèmes" },
  { icon: BadgeCheck, label: "Finitions Swiss Made" },
  { icon: Scale, label: "Convertisseur d'Unités" },
  { icon: Zap, label: "Fréquences & Oscillations" },
  { icon: Timer, label: "Chronographe Avancé" },
  { icon: Share2, label: "Rapport d'Engrenages" },
  { icon: Sigma, label: "Longueur de Spiral" },
  { icon: Percent, label: "Tableau des Couples" },
  { icon: Waves, label: "Guide d'Amplitude" },
  { icon: PieChart, label: "Simulateur d'Échappement" },
  { icon: Database, label: "Base de Données des Pièces" },
]

export function HorloLearnSidebar() {
  return (
    <aside className="h-screen fixed top-0 left-0 w-[260px] bg-[#16203a] flex flex-col shadow-xl z-30 select-none">
      <div className="flex items-center gap-3 px-5 py-6 mb-6 border-b border-slate-700">
        <span className="bg-blue-700 p-2 rounded-lg">
          <Watch className="h-7 w-7 text-blue-300" />
        </span>
        <div>
          <div className="font-bold text-lg tracking-wide text-white">HorloLearn Tools</div>
          <div className="text-xs text-slate-400">Outils Professionnels d&apos;Horlogerie</div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="flex flex-col gap-1 px-3">
          {menu.map((item, idx) => (
            <li 
              key={item.label} 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-700/20 hover:text-white cursor-pointer text-slate-200 transition ${idx === 1 ? "bg-blue-700/70 text-white font-semibold" : ""}`}
            >
              <item.icon className="h-5 w-5 opacity-80" />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
