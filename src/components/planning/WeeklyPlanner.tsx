"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import {
  Plus,
  Trash2,
  Save,
  X,
  GraduationCap,
  Wrench,
  LayoutGrid,
  BookOpen,
  Briefcase,
  Rocket,
  Download,
} from "lucide-react";

export type PlanningEvent = {
  id?: string;
  userId: string;
  day: string; // e.g. "Lundi"
  time: string; // e.g. "08:00"
  subject: string;
  description: string;
  color: string; // hex
};

function useToast() {
  const [toasts, setToasts] = useState<{ id: number; message: string; type?: "success" | "error" | "info" }[]>([]);
  const idRef = useRef(0);
  const show = (message: string, type: "success" | "error" | "info" = "info") => {
    const id = ++idRef.current;
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  };
  const ToastViewport = () => (
    <div style={{ position: "fixed", top: 16, right: 16, display: "flex", flexDirection: "column", gap: 8, zIndex: 50 }}>
      {toasts.map((t) => (
        <div
          key={t.id}
          style={{ padding: "10px 12px", borderRadius: 8, color: "white", background: t.type === "success" ? "#16a34a" : t.type === "error" ? "#dc2626" : "#334155", boxShadow: "0 2px 8px rgba(0,0,0,0.2)", minWidth: 220 }}
          role="status"
          aria-live="polite"
        >
          {t.message}
        </div>
      ))}
    </div>
  );
  return { show, ToastViewport };
}

const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"] as const;
const TIMES = Array.from({ length: 14 }, (_, i) => `${String(i + 7).padStart(2, "0")}:00`); // 07:00 - 20:00

const COLORS: { key: string; value: string; icon: React.ReactNode }[] = [
  { key: "study", value: "#0ea5e9", icon: <BookOpen size={14} /> },
  { key: "work", value: "#f59e0b", icon: <Briefcase size={14} /> },
  { key: "project", value: "#10b981", icon: <Rocket size={14} /> },
  { key: "tools", value: "#a855f7", icon: <Wrench size={14} /> },
  { key: "class", value: "#ef4444", icon: <GraduationCap size={14} /> },
];

function getDefaultColor() {
  return COLORS[0].value;
}

export default function WeeklyPlanner({ userId }: { userId: string }) {
  const { show, ToastViewport } = useToast();
  const [events, setEvents] = useState<PlanningEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [dragItem, setDragItem] = useState<PlanningEvent | null>(null);
  const [filterDay, setFilterDay] = useState<string | "all">("all");
  const [creating, setCreating] = useState<{ day: string; time: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setLoading(true);
        const qy = query(collection(db, "planningEvents"), where("userId", "==", userId), orderBy("day" as any));
        const snap = await getDocs(qy);
        if (cancelled) return;
        const data: PlanningEvent[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
        setEvents(data);
      } catch (e) {
        console.error(e);
        show("Erreur de chargement du planning", "error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const eventsByKey = useMemo(() => {
    const map = new Map<string, PlanningEvent[]>();
    for (const ev of events) {
      const key = `${ev.day}-${ev.time}`;
      const list = map.get(key) ?? [];
      list.push(ev);
      map.set(key, list);
    }
    return map;
  }, [events]);

  async function createEvent(partial: Omit<PlanningEvent, "id">) {
    const ref = await addDoc(collection(db, "planningEvents"), partial);
    const newEv: PlanningEvent = { ...partial, id: ref.id };
    setEvents((e) => [...e, newEv]);
    show("Événement créé", "success");
    return newEv;
  }

  async function updateEvent(id: string, patch: Partial<PlanningEvent>) {
    await updateDoc(doc(db, "planningEvents", id), patch as any);
    setEvents((e) => e.map((x) => (x.id === id ? { ...x, ...patch } : x)));
    show("Événement mis à jour", "success");
  }

  async function removeEvent(id: string) {
    await deleteDoc(doc(db, "planningEvents", id));
    setEvents((e) => e.filter((x) => x.id !== id));
    show("Événement supprimé", "success");
  }

  function onDragStart(ev: React.DragEvent, item: PlanningEvent) {
    setDragItem(item);
    ev.dataTransfer.setData("text/plain", JSON.stringify(item));
    ev.dataTransfer.effectAllowed = "move";
  }
  function onDragOver(ev: React.DragEvent) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  }
  async function onDrop(ev: React.DragEvent, day: string, time: string) {
    ev.preventDefault();
    try {
      const data = dragItem ?? JSON.parse(ev.dataTransfer.getData("text/plain"));
      if (!data?.id) return;
      await updateEvent(data.id, { day, time });
    } catch (e) {
      console.error(e);
      show("Déplacement impossible", "error");
    } finally {
      setDragItem(null);
    }
  }

  function openQuickCreate(day: string, time: string) {
    setCreating({ day, time });
  }
  async function confirmQuickCreate(form: { subject: string; description: string; color: string }) {
    if (!creating) return;
    const payload: Omit<PlanningEvent, "id"> = {
      userId,
      day: creating.day,
      time: creating.time,
      subject: form.subject || "Sans titre",
      description: form.description || "",
      color: form.color || getDefaultColor(),
    };
    await createEvent(payload);
    setCreating(null);
  }

  function CellEvents({ day, time }: { day: string; time: string }) {
    const list = eventsByKey.get(`${day}-${time}`) ?? [];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {list.map((ev) => (
          <div
            key={ev.id}
            draggable
            onDragStart={(e) => onDragStart(e, ev)}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "6px 8px", borderRadius: 8, background: ev.color, color: "#111827", fontSize: 12 }}
            title={`${ev.subject} – ${ev.description}`}
          >
            <span style={{ fontWeight: 600 }}>{ev.subject}</span>
            <button onClick={() => ev.id && removeEvent(ev.id)} title="Supprimer" aria-label="Supprimer" style={{ background: "transparent", border: 0, cursor: "pointer", color: "#111827" }}>
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        <button onClick={() => openQuickCreate(day, time)} title="Ajouter" aria-label="Ajouter" style={{ background: "#0ea5e9", color: "white", border: 0, borderRadius: 6, padding: "4px 6px", display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 12 }}>
          <Plus size={14} /> Ajouter
        </button>
      </div>
    );
  }

  function QuickCreateModal() {
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState(getDefaultColor());
    if (!creating) return null;
    return (
      <div role="dialog" aria-modal="true" style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "grid", placeItems: "center", zIndex: 40 }} onClick={() => setCreating(null)}>
        <div style={{ background: "white", borderRadius: 12, width: 420, padding: 16 }} onClick={(e) => e.stopPropagation()}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h3 style={{ fontWeight: 700 }}>Nouvel événement – {creating.day} {creating.time}</h3>
            <button onClick={() => setCreating(null)} aria-label="Fermer" style={{ background: "transparent", border: 0 }}>
              <X />
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <label style={{ display: "grid", gap: 6 }}>
              <span>Sujet</span>
              <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Titre" style={{ padding: 8, borderRadius: 8, border: "1px solid #e5e7eb" }} />
            </label>
            <label style={{ display: "grid", gap: 6 }}>
              <span>Description</span>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Détails" style={{ padding: 8, borderRadius: 8, border: "1px solid #e5e7eb" }} />
            </label>
            <label style={{ display: "grid", gap: 6 }}>
              <span>Couleur</span>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {COLORS.map((c) => (
                  <button key={c.key} onClick={() => setColor(c.value)} aria-label={c.key} style={{ width: 28, height: 28, borderRadius: 6, border: color === c.value ? "2px solid #111827" : "1px solid #e5e7eb", background: c.value, display: "grid", placeItems: "center", cursor: "pointer" }}>
                    {c.icon}
                  </button>
                ))}
              </div>
            </label>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 14 }}>
            <button onClick={() => setCreating(null)} style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #e5e7eb", background: "white" }}>Annuler</button>
            <button onClick={() => confirmQuickCreate({ subject, description, color })} style={{ padding: "8px 10px", borderRadius: 8, background: "#16a34a", color: "white", border: 0, display: "inline-flex", alignItems: "center", gap: 8 }}>
              <Save size={16} /> Créer
            </button>
          </div>
        </div>
      </div>
    );
  }

  const filteredDays = filterDay === "all" ? DAYS : (DAYS.filter((d) => d === filterDay) as typeof DAYS[number][]);

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <ToastViewport />

      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <h2 style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 800 }}>
          <LayoutGrid /> Planning hebdomadaire
        </h2>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <select value={filterDay} onChange={(e) => setFilterDay(e.target.value)} aria-label="Filtrer par jour" style={{ padding: 8, borderRadius: 8, border: "1px solid #e5e7eb" }}>
            <option value="all">Tous les jours</option>
            {DAYS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <button title="Exporter" aria-label="Exporter" style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #e5e7eb", background: "white", display: "inline-flex", alignItems: "center", gap: 6 }} onClick={() => show("Export à implémenter", "info")}>
            <Download size={16} /> Exporter
          </button>
        </div>
      </header>

      <div style={{ overflow: "auto", border: "1px solid #e5e7eb", borderRadius: 12 }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", position: "sticky", left: 0, background: "#f8fafc", padding: 8, borderBottom: "1px solid #e5e7eb", zIndex: 1 }}>Heure</th>
              {filteredDays.map((d) => (
                <th key={d} style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #e5e7eb", background: "#f8fafc" }}>{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TIMES.map((time) => (
              <tr key={time}>
                <td style={{ position: "sticky", left: 0, background: "white", padding: 8, borderRight: "1px solid #f1f5f9", fontWeight: 600 }}>{time}</td>
                {filteredDays.map((day) => (
                  <td key={`${day}-${time}`} onDragOver={onDragOver} onDrop={(e) => onDrop(e, day, time)} style={{ verticalAlign: "top", padding: 8, minWidth: 220, borderLeft: "1px solid #f1f5f9", borderTop: "1px solid #f1f5f9" }}>
                    <CellEvents day={day} time={time} />
                  </
