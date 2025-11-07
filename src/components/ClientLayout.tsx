"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";

const FloatingSearchButton = dynamic(() => import("./FloatingSearchButton"), { ssr: false });
const SearchModal = dynamic(() => import("./SearchModal"), { ssr: false });

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearch = (query: string) => {
    setIsSearchOpen(false);
    window.location.href = `/recherche?q=${encodeURIComponent(query)}`;
  };

  return (
    <>
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />
      {children}
      <Footer />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={handleSearch}
      />
      <FloatingSearchButton onClick={() => setIsSearchOpen(true)} />
    </>
  );
}
