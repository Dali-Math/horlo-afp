'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Fuse from 'fuse.js';

interface Horloger {
  nom: string;
  anneeFondation?: string;
  periode?: string; // XVIIIe siècle, XIXe siècle, XXe siècle
  ville?: string;
  bio: string;
  imageUrl: string;
}

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.04, ease: 'easeOut' },
  }),
};

const gold = '#E2B44F';

export default function HorlogersHistorique() {
  const [all, setAll] = useState<Horloger[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [ville, setVille] = useState<string>('');
  const [periode, setPeriode] = useState<string>('');

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch('/data/horlogers.json', { cache: 'no-store' });
        const data: Horloger[] = await res.json();
        if (!alive) return;
        setAll(data);
      } catch (e) {
        console.error('Error loading horlogers.json', e);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Build filters lists (unique villes and periodes)
  const villes = useMemo(() => {
    const s = new Set<string>();
    all.forEach((h) => h.ville && h.ville.split(',').forEach(v => s.add(v.trim())));
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [all]);

  const periodes = useMemo(() => {
    const s = new Set<string>();
    all.forEach((h) => h.periode && s.add(h.periode));
    return Array.from(s).sort();
  }, [all]);

  // Fuse search over name, bio, ville, periode
  const fuse = useMemo(() => {
    return new Fuse(all, {
      includeScore: true,
      threshold: 0.34, // precise but forgiving
      ignoreLocation: true,
      keys: [
        { name: 'nom', weight: 0.6 },
        { name: 'bio', weight: 0.25 },
        { name: 'ville', weight: 0.1 },
        { name: 'periode', weight: 0.05 },
      ],
    });
  }, [all]);

  const filtered = useMemo(() => {
    const base: Horloger[] = q.trim() ? fuse.search(q).map(r => r.item) : all;
    return base.filter((h) => {
      const okVille = ville ? (h.ville || '').toLowerCase().includes(ville.toLowerCase()) : true;
      const okPeriode = periode ? (h.periode || '') === periode : true;
      return okVille && okPeriode;
    });
  }, [all, fuse, q, ville, periode]);

  const countText = loading ? 'Chargement…' : `${filtered.length} résultat${filtered.length > 1 ? 's' : ''}`;

  return (
    <section className="relative py-16 md:py-20 px-6 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-10 md:mb-14"
        >
          <h2
            className="text-4xl md:text-6xl font-bebas tracking-wide mb-3 text-[${gold}]"
            style={{ color: gold, textShadow: `0 0 24px ${gold}66, 0 0 48px ${gold}33` }}
          >
            ⌚ Maîtres horlogers suisses
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto font-inter">
            Explorez les figures marquantes de l'horlogerie et filtrez par ville, période ou mots-clés.
          </p>
        </motion.div>

        {/* Controls */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative group">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Rechercher un horloger, une innovation…"
              className="w-full rounded-lg bg-black/60 border border-[#E2B44F]/25 text-gray-100 placeholder-gray-400 px-4 py-3 outline-none focus:border-[#E2B44F]/60 focus:ring-0 transition-colors"
            />
            <div className="pointer-events-none absolute inset-0 rounded-lg group-focus-within:shadow-[0_0_0_2px_rgba(226,180,79,0.25)]" />
          </div>
          <select
            value={ville}
            onChange={(e) => setVille(e.target.value)}
            className="w-full rounded-lg bg-black/60 border border-[#E2B44F]/25 text-gray-100 px-4 py-3 outline-none focus:border-[#E2B44F]/60"
          >
            <option value="">Toutes les villes</option>
            {villes.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
          <select
            value={periode}
            onChange={(e) => setPeriode(e.target.value)}
            className="w-full rounded-lg bg_black/60 border border-[#E2B44F]/25 text-gray-100 px-4 py-3 outline-none focus:border-[#E2B44F]/60"
          >
            <option value="">Toutes les périodes</option>
            {periodes.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Results count and reset */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-400">{countText}</span>
          <button
            onClick={() => { setQ(''); setVille(''); setPeriode(''); }}
            className="text-xs md:text-sm text-gray-300 hover:text-white border border-[#E2B44F]/30 hover:border-[#E2B44F]/60 rounded-md px-3 py-1 transition-colors"
          >
            Réinitialiser
          </button>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="py-12 text-center text-gray-400">Chargement des horlogers…</div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 text-center"
              >
                <p className="text-gray-400">Aucun résultat. Essayez d'autres filtres.</p>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((h, i) => (
                  <motion.article
                    key={h.nom + i}
                    custom={i}
                    variants={cardVariants}
                    className="group relative bg-black/60 rounded-xl overflow-hidden border border-[#E2B44F]/20 hover:border-[#E2B44F]/50 transition-all duration-300"
                    style={{ boxShadow: '0 6px 24px rgba(0,0,0,0.5)' }}
                    whileHover={{ y: -6 }}
                  >
                    {/* Glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ background: 'radial-gradient(circle at 50% 30%, rgba(226,180,79,0.14), transparent 60%)' }}
                    />

                    {/* Image */}
                    <div className="relative w-full h-48 bg-neutral-900">
                      <Image
                        src={h.imageUrl}
                        alt={h.nom}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        priority={i < 3}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                      {/* Badges */}
                      <div className="absolute bottom-2 left-2 flex flex-wrap gap-2">
                        {h.periode && (
                          <span className="text-[10px] uppercase tracking-wide bg-black/60 border border-[#E2B44F]/40 text-gray-200 px-2 py-1 rounded">
                            {h.periode}
                          </span>
                        )}
                        {h.ville && (
                          <span className="text-[10px] uppercase tracking-wide bg-black/60 border border-[#E2B44F]/40 text-gray-200 px-2 py-1 rounded">
                            {h.ville}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3
                        className="text-2xl font-bebas mb-1"
                        style={{ color: gold }}
                      >
                        <span className="group-hover:drop-shadow-[0_0_18px_rgba(226,180,79,0.6)] transition-all">{h.nom}</span>
                      </h3>
                      {h.anneeFondation && (
                        <div className="text-sm text-gray-400 mb-2">Fondation: {h.anneeFondation}</div>
                      )}
                      <p className="text-gray-300 leading-relaxed text-sm line-clamp-3">
                        {h.bio}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
