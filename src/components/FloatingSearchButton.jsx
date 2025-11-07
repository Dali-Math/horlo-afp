'use client';
import React, { useState } from "react";

type FloatingSearchButtonProps = {
  onSearch: (query: string) => void;
};

export default function FloatingSearchButton({ onSearch }: FloatingSearchButtonProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <>
      {/* Bouton flottant */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            top: 24,
            right: 24,
            zIndex: 100,
            width: 48,
            height: 48,
            background: "#e5c88c",
            borderRadius: "50%",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
            cursor: "pointer"
          }}
          aria-label="Ouvrir recherche"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="#222" strokeWidth="2" />
            <line x1="17" y1="17" x2="22" y2="22" stroke="#222" strokeWidth="2" />
          </svg>
        </button>
      )}

      {/* Popover de recherche */}
      {open && (
        <div
          style={{
            position: "fixed",
            top: 24,
            right: 24,
            zIndex: 110,
            background: "#444",
            padding: 16,
            borderRadius: 12,
            boxShadow: "0 4px 32px rgba(0,0,0,0.18)",
            display: "flex",
            flexDirection: "column",
            width: 280,
          }}
        >
          <button
            onClick={() => setOpen(false)}
            style={{
              background: "#e5c88c",
              border: "none",
              borderRadius: "50%",
              width: 28,
              height: 28,
              position: "absolute",
              top: -14,
              right: -14,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            aria-label="Fermer recherche"
          >×</button>
          <form
            onSubmit={e => {
              e.preventDefault();
              onSearch(query);
              setOpen(false);
            }}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <input
              type="text"
              autoFocus
              placeholder="Recherchez sur HorloLearn…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{
                flex: 1,
                padding: "8px 12px",
                borderRadius: "8px",
                border: "none",
                fontSize: 16
              }}
            />
            <button
              type="submit"
              style={{
                background: "#e5c88c",
                borderRadius: "50%",
                border: "none",
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
              }}
              aria-label="Rechercher"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="#222" strokeWidth="2" />
                <line x1="17" y1="17" x2="22" y2="22" stroke="#222" strokeWidth="2" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
