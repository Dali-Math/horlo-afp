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
  MoreHorizontal,
  Download,
} from "lucide-react";

export type PlanningEvent = {
  id?: string;
  userId: string;
  day: string; // "Lundi" ...
  time: string; // "08:00" ...
  subject: string;
  description: string;
  color: string; // hex
};

type WeeklyPlannerProps = {
  userId: string;
  onDataChange: (data: PlanningEvent[]) => void;
};

const DAYS = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
] as const;

const TIME_SLOTS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
] as const;

const SUBJECTS: { name: string; color: string; Icon: React.ComponentType<any> }[] = [
  { name: "Théorie", color: "#1E3A8A", Icon: BookOpen },
  { name: "Pratique", color: "#0EA5E9", Icon: Wrench },
  { name: "CAO/DAO", color: "#7C3AED", Icon: LayoutGrid },
  { name: "Histoire", color: "#475569", Icon: GraduationCap },
  { name: "Stage", color: "#0F766E", Icon: Briefcase },
  { name: "Projet", color: "#F59E0B", Icon: Rocket },
  { name: "Autre", color: "#334155", Icon: MoreHorizontal },
];

const findSubject = (name?: string) => SUBJECTS.find((s) => s.name === name) ?? SUBJECTS[0];

type PlanningEventState = PlanningEvent[];

type PartialPlanning = Partial<PlanningEvent>;

export default function WeeklyPlanner({ userId, onDataChange }: WeeklyPlannerProps) {
  const [events, setEvents] = useState<PlanningEventState>([]);
  const [editingEvent, setEditingEvent] = useState<PlanningEvent | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [formData, setFormData] = useState<PartialPlanning>({
    day: "",
    time: "",
    subject: "",
    description: "",
    color: findSubject("Théorie").color,
  });

  // DnD helper
  const dragRef = useRef<PlanningEvent | null>(null);

  useEffect(() => {
    void loadEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    onDataChange(events);
  }, [events, onDataChange]);

  const loadEvents = async () => {
    try {
      const q = query(collection(db, "planning"), where("userId", "==", userId));
      const snap = await getDocs(q);
      const loaded: PlanningEvent[] = [];
      snap.forEach((d) => loaded.push({ id: d.id, ...(d.data() as Omit<PlanningEvent, "id">) }));
      setEvents(loaded);
    } catch (e) {
      console.error(e);
      setToast({ type: "error", message: "Erreur de chargement" });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () =>
    setFormData({ day: "", time: "", subject: "", description: "", color: findSubject("Théorie").color });

  const openAdd = (prefill?: PartialPlanning) => {
    setEditingEvent(null);
    setFormData({ ...{ day: "", time: "", subject: "", description: "", color: findSubject("Théorie").color }, ...prefill });
    setShowModal(true);
  };

  const openEdit = (ev: PlanningEvent) => {
    setEditingEvent(ev);
    setFormData(ev);
    setShowModal(true);
  };

  const handleAddEvent = async () => {
    if (!formData.day || !formData.time || !formData.subject) return;
    try {
      const s = findSubject(formData.subject);
      const payload: PlanningEvent = {
        userId,
        day: String(formData.day),
        time: String(formData.time),
        subject: String(formData.subject),
        description: String(formData.description ?? ""),
        color: String(formData.color ?? s.color),
      };
      const ref = await addDoc(collection(db, "planning"), payload);
      setEvents((prev) => [...prev, { ...payload, id: ref.id }]);
      setShowModal(false);
      resetForm();
      setToast({ type: "success", message: "Cours ajouté" });
    } catch (e) {
      console.error(e);
      setToast({ type: "error", message: "Échec de l'ajout" });
    }
  };

  const handleUpdateEvent = async () => {
    if (!editingEvent?.id) return;
    try {
      const payload: PartialPlanning = {
        day: formData.day,
        time: formData.time,
        subject: formData.subject,
        description: formData.description,
        color: formData.color,
      };
      await updateDoc(doc(db, "planning", editingEvent.id), payload as any);
      setEvents((prev) => prev.map((e) => (e.id === editingEvent.id ? { ...e, ...(payload as any) } : e)));
      setShowModal(false);
      setEditingEvent(null);
      resetForm();
      setToast({ type: "success", message: "Cours mis à jour" });
    } catch (e) {
      console.error(e);
      setToast({ type: "error", message: "Échec de la mise à jour" });
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      await deleteDoc(doc(db, "planning", id));
      setEvents((prev) => prev.filter((e) => e.id !== id));
      setToast({ type: "success", message: "Cours supprimé" });
    } catch (e) {
      console.error(e);
      setToast({ type: "error", message: "Échec de la suppression" });
    }
  };

  const getEventForSlot = (day: string, time: string) => events.find((e) => e.day === day && e.time === time);

  // Drag & drop
  const onDragStart = (e: React.DragEvent, item: PlanningEvent) => {
    dragRef.current = item;
    e.dataTransfer.effectAllowed = "move";
  };
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };
  const onDrop = async (e: React.DragEvent, day: string, time: string) => {
    e.preventDefault();
    const item = dragRef.current;
    dragRef.current = null;
    if (!item || (item.day === day && item.time === time)) return;
    const prev = events;
    setEvents((p) => p.map((x) => (x.id === item.id ? { ...x, day, time } : x)));
    try {
      if (item.id) await updateDoc(doc(db, "planning", item.id), { day, time });
      setToast({ type: "success", message: "Cours déplacé" });
    } catch (err) {
      console.error(err);
      setEvents(prev);
      setToast({ type: "error", message: "Déplacement échoué" });
    }
  };

  // Export PDF using html2canvas + jsPDF (must be installed in app)
  const exportRef = useRef<HTMLDivElement>(null);
  const handleExportPDF = async () => {
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf" as any),
      ]);
      const el = exportRef.current;
      if (!el) return;
      const canvas = await html2canvas(el, { scale: 2, backgroundColor: "#ffffff" });
      const img = canvas.toDataURL("image/png");
      const pdf = new (jsPDF as any)({ orientation: "landscape", unit: "pt", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const imgW = pageW - 80;
      const imgH = (canvas.height * imgW) / canvas.width;
      const y = (pageH - imgH) / 2;
      pdf.addImage(img, "PNG", 40, y, imgW, imgH, undefined, "FAST");
      pdf.save("planning.pdf");
      setToast({ type: "success", message: "PDF exporté" });
    } catch (e) {
      console.error(e);
      setToast({ type: "error", message: "Échec de l'export PDF" });
    }
  };

  const SubjectSelect = useMemo(
    () =>
      function SubjectSelectInner({ value, onChange }: { value?: string; onChange: (v: string) => void }) {
        return (
          <div className="relative">
            <select
              value={value ?? ""}
              onChange={(e) => onChange(e.target.value)}
              className="w-full appearance-none rounded-lg border border-slate-200 bg-white/80 px-3 py-2 pr-9 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Sélectionner</option>
              {SUBJECTS.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">
              <MoreHorizontal className="h-4 w-4" />
            </span>
          </div>
        );
      },
    []
  );

  const SubjectBadge = ({ subject }: { subject: string }) => {
    const { Icon, color } = findSubject(subject);
    return (
      <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium" style={{ backgroundColor: `${color}10`, color }}>
        <Icon className="h-3.5 w-3.5" />
        {subject}
      </span>
    );
  };

  const CloseToast = () => (
    <button
      onClick={() => setToast(null)}
      className="rounded-full p-1 text-white/80 transition hover:bg-white/20 hover:text-white"
      aria-label="Fermer"
    >
      <X className="h-3.5 w-3.5" />
    </button>
  );

  if (loading) return <div className="p-6 text-center text-slate-600">Chargement…</div>;

  return (
    <div className="font-inter">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed right-4 top-4 z-50 flex items-center gap-2 rounded-full px-3 py-2 text-sm shadow-lg transition ${
            toast.type === "success" ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
          }`}
        >
          <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-white/90" />
          <span>{toast.message}</span>
          <CloseToast />
        </div>
      )}

      {/* Header */}
      <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">Planning de la semaine</h2>
          <p className="text-sm text-slate-500">Glissez-déposez pour réorganiser. Cliquez pour éditer.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => openAdd()}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm ring-1 ring-blue-700/10 transition hover:bg-blue-700 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-300 active:scale-[.99]"
          >
            <Plus className="h-4 w-4" /> Ajouter un cours
          </button>
          <button
            onClick={handleExportPDF}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-amber-400 to-amber-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-amber-600/20 transition hover:from-amber-500 hover:to-amber-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-300 active:scale-[.99]"
            title="Exporter en PDF"
          >
            <Download className="h-4 w-4" /> Export PDF
          </button>
        </div>
      </div>

      {/* Planner Card */}
      <div
        ref={exportRef}
        className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/5 ring-1 ring-black/0"
      >
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="w-20 select-none rounded-lg bg-slate-50 p-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                Heure
              </th>
              {DAYS.map((day) => (
                <th
                  key={day}
                  className="select-none rounded-lg bg-slate-50 p-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TIME_SLOTS.map((time) => (
              <tr key={time}>
                <td className="whitespace-nowrap bg-slate-50/60 p-2 text-center text-xs font-medium text-slate-500">
                  {time}
                </td>
                {DAYS.map((day) => {
                  const ev = getEventForSlot(day, time);
                  const color = ev ? findSubject(ev.subject).color : undefined;
                  return (
                    <td
                      key={`${day}-${time}`}
                      onDragOver={onDragOver}
                      onDrop={(e) => onDrop(e, day, time)}
                      className="h-16 min-w-28 rounded-lg border border-slate
