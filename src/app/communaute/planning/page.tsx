"use client";
import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Calendar,
  FileText,
  Download,
  ExternalLink,
} from "lucide-react";

type PlanningEntry = {
  id: string;
  title: string;
  description?: string;
  day: number; // 0=Mon ... 6=Sun
  start: string; // HH:MM
  end: string; // HH:MM
  color?: string;
};

function startOfWeek(date = new Date()) {
  const d = new Date(date);
  const day = (d.getDay() + 6) % 7; // Monday=0
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatDate(d: Date) {
  return d.toLocaleDateString("fr-CH", { day: "2-digit", month: "2-digit" });
}

const HOURS = Array.from({ length: 15 }, (_, i) => 7 + i); // 07 -> 21
const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export default function PlanningPage() {
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => startOfWeek());
  const [view, setView] = useState<"week" | "day">("week");
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [entries, setEntries] = useState<PlanningEntry[]>([]);
  const [editing, setEditing] = useState<PlanningEntry | null>(null);
  const [showForm, setShowForm] = useState(false);

  const storageKey = "horlo-afp-planning-v1";

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setEntries(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(entries));
    } catch {}
  }, [entries]);

  const weekDays = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const d = new Date(currentWeekStart);
        d.setDate(currentWeekStart.getDate() + i);
        return d;
      }),
    [currentWeekStart]
  );

  function nextWeek() {
    const d = new Date(currentWeekStart);
    d.setDate(d.getDate() + 7);
    setCurrentWeekStart(d);
  }
  function prevWeek() {
    const d = new Date(currentWeekStart);
    d.setDate(d.getDate() - 7);
    setCurrentWeekStart(d);
  }
  function thisWeek() {
    setCurrentWeekStart(startOfWeek(new Date()));
  }

  function openCreate(dayIdx?: number) {
    setEditing({
      id: crypto.randomUUID(),
      title: "",
      day: typeof dayIdx === "number" ? dayIdx : selectedDay,
      start: "08:00",
      end: "09:00",
      color: "#1e3a8a",
      description: "",
    });
    setShowForm(true);
  }

  function openEdit(item: PlanningEntry) {
    setEditing({ ...item });
    setShowForm(true);
  }

  function remove(id: string) {
    setEntries((e) => e.filter((x) => x.id !== id));
  }

  function save() {
    if (!editing) return;
    if (!editing.title.trim()) return alert("Titre requis");
    if (editing.end <= editing.start)
      return alert("L'heure de fin doit être après le début");
    setEntries((prev) =>
      prev.some((x) => x.id === editing.id)
        ? prev.map((x) => (x.id === editing.id ? editing : x))
        : [...prev, editing]
    );
    setShowForm(false);
    setEditing(null);
  }

  const dayEntries = useMemo(
    () =>
      entries
        .filter((e) => e.day === selectedDay)
        .sort((a, b) => a.start.localeCompare(b.start)),
    [entries, selectedDay]
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-white text-slate-900">
      {/* Section Planning officiel - lien vers le PDF */}
      <div className="mb-6 border rounded-lg p-4 bg-amber-50">
        <div className="flex items-start gap-3">
          <FileText className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              Planning Officiel Formation HORL1S925
            </h2>
            <p className="text-sm text-slate-600 mb-3">
              Planning provisoire susceptible de modifications. Formation modulaire
              en Horlogerie - Module de Base.
              <br />
              451 périodes réparties sur 8 matières de septembre 2025 à mai 2026.
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 text-sm font-medium transition"
                href="/pdfs/250919_HORL1_S925.pdf"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Download className="w-4 h-4" /> Télécharger le planning (PDF)
              </a>
              <a
                className="inline-flex items-center gap-2 px-4 py-2 border border-amber-600 text-amber-700 rounded-md hover:bg-amber-50 text-sm font-medium transition"
                href="/pdfs/250919_HORL1_S925.pdf"
                rel="noopener noreferrer"
                target="_blank"
              >
                <ExternalLink className="w-4 h-4" /> Consulter en ligne
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Barre d'outils du planning interactif */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-amber-600" />
          <h1 className="text-xl sm:text-2xl font-bold">Mon Planning</h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-md shadow-sm border border-slate-200 overflow-hidden bg-white">
            <button
              aria-label="Semaine précédente"
              className="px-3 py-2 hover:bg-slate-50"
              onClick={prevWeek}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              className="px-3 py-2 border-l border-r border-slate-200 hover:bg-slate-50"
              onClick={thisWeek}
            >
              Cette semaine
            </button>
            <button
              aria-label="Semaine suivante"
              className="px-3 py-2 hover:bg-slate-50"
              onClick={nextWeek}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="inline-flex rounded-md overflow-hidden border border-slate-200 bg-white">
            <button
              onClick={() => setView("week")}
              className={`px-3 py-2 text-sm ${
                view === "week"
                  ? "bg-amber-600 text-white"
                  : "bg-white hover:bg-slate-50 text-slate-700"
              }`}
            >
              Semaine
            </button>
            <button
              onClick={() => setView("day")}
              className={`px-3 py-2 text-sm ${
                view === "day"
                  ? "bg-amber-600 text-white"
                  : "bg-white hover:bg-slate-50 text-slate-700"
              }`}
            >
              Journée
            </button>
          </div>

          <button
            onClick={() => openCreate()}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-amber-600 text-white hover:bg-amber-700 active:scale-[.99]"
          >
            <Plus className="w-4 h-4" /> Nouvelle tâche
          </button>
        </div>
      </div>

      {/* Sélecteur de jours */}
      <div className="mt-4 grid grid-cols-7 gap-2 text-center text-sm">
        {weekDays.map((d, i) => (
          <button
            key={i}
            onClick={() => {
              setSelectedDay(i);
              if (view === "week") setView("day");
            }}
            className={`rounded-md border py-2 ${
              selectedDay === i
                ? "bg-amber-50 border-amber-300 text-amber-900"
                : "bg-white hover:bg-slate-50 text-slate-700"
            }`}
          >
            <div className="font-medium">{DAYS[i]}</div>
            <div className="text-xs text-slate-500">{formatDate(d)}</div>
          </button>
        ))}
      </div>

      {/* Vue semaine */}
      {view === "week" ? (
        <div className="mt-4 overflow-x-auto">
          <div className="min-w-[720px] grid grid-cols-8 border rounded-md bg-white">
            <div className="bg-slate-50 p-2 text-xs text-slate-600">Heures</div>
            {DAYS.map((d) => (
              <div className="bg-slate-50 p-2 text-xs text-slate-600 text-center" key={d}>
                {d}
              </div>
            ))}
            {HOURS.map((h) => (
              <>
                <div className="border-t p-2 text-xs text-slate-500 bg-white" key={`h-${h}`}>
                  {String(h).padStart(2, "0")}:00
                </div>
                {DAYS.map((_, dayIdx) => (
                  <div
                    className="border-t border-l relative h-16 bg-white hover:bg-amber-50/60 cursor-pointer"
                    key={`c-${h}-${dayIdx}`}
                    onDoubleClick={() => openCreate(dayIdx)}
                    title="Double-clic pour ajouter"
                  >
                    {entries
                      .filter(
                        (e) =>
                          e.day === dayIdx &&
                          e.start <= `${String(h).padStart(2, "0")}:59` &&
                          e.end >= `${String(h).padStart(2, "0")}:00`
                      )
                      .map((e) => (
                        <div
                          key={e.id}
                          onClick={(ev) => {
                            ev.stopPropagation();
                            openEdit(e);
                          }}
                          className="absolute left-1 right-1 top-1 rounded-md text-xs text-slate-900 shadow border border-slate-200"
                          style={{ backgroundColor: e.color || "#f1f5f9" }}
                        >
                          <div className="px-2 py-1 truncate">
                            {e.title} <span className="opacity-70">({e.start}–{e.end})</span>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </>
            ))}
          </div>
        </div>
      ) : (
        /* Vue journée */
        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          <div className="lg:col-span-2 border rounded-md bg-white">
            {HOURS.map((h) => (
              <div className="grid grid-cols-[80px,1fr] border-t first:border-t-0" key={h}>
                <div className="p-2 text-xs text-slate-500 bg-slate-50">
                  {String(h).padStart(2, "0")}:00
                </div>
                <div className="p-2 min-h-[3rem] bg-white">
                  {dayEntries
                    .filter(
                      (e) =>
                        e.start <= `${String(h).padStart(2, "0")}:59` &&
                        e.end >= `${String(h).padStart(2, "0")}:00`
                    )
                    .map((e) => (
                      <div
                        className="mb-2 rounded-md text-xs text-slate-900 shadow border border-slate-200 bg-white flex items-center justify-between"
                        key={e.id}
                        style={{ backgroundColor: e.color }}
                      >
                        <div className="px-2 py-1 truncate">
                          {e.title} <span className="opacity-70">({e.start}–{e.end})</span>
                        </div>
                        <div className="flex items-center gap-1 pr-1">
                          <button
                            className="p-1 hover:bg-slate-50 rounded"
                            onClick={() => openEdit(e)}
                            aria-label="Modifier"
                          >
                            <Pencil className="w-4 h-4 text-slate-700" />
                          </button>
                          <button
                            className="p-1 hover:bg-slate-50 rounded"
                            onClick={() => remove(e.id)}
                            aria-label="Supprimer"
                          >
                            <Trash2 className="w-4 h-4 text-slate-700" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          <div className="border rounded-md p-3 h-fit bg-white">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold">Tâches du jour</h2>
              <button
                onClick={() => openCreate(selectedDay)}
                className="inline-flex items-center gap-2 px-2 py-1 rounded bg-amber-600 text-white hover:bg-amber-700"
              >
                <Plus className="w-4 h-4" /> Ajouter
              </button>
            </div>
            <ul className="space-y-2 text-sm">
              {dayEntries.length === 0 && (
                <li className="text-slate-500">Aucune tâche pour ce jour.</li>
              )}
              {dayEntries.map((e) => (
                <li
                  className="border rounded p-2 flex items-center justify-between bg-white"
                  key={e.id}
                >
                  <div className="min-w-0">
                    <div className="font-medium truncate">{e.title}</div>
                    <div className="text-xs text-slate-500">
                      {e.start}–{e.end}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="p-1 hover:bg-slate-50 rounded"
                      onClick={() => openEdit(e)}
                    >
                      <Pencil className="w-4 h-4 text-slate-700" />
                    </button>
                    <button
                      className="p-1 hover:bg-slate-50 rounded"
                      onClick={() => remove(e.id)}
                    >
                      <Trash2 className="w-4 h-4 text-slate-700" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Modale de création/édition */}
      {showForm && editing &&
