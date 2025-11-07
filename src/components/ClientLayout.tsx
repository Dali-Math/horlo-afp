"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

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

  return (
    <>
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />
      {children}
      <Footer />
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
      <FloatingSearchButton onClick={() => setIsSearchOpen(true)} />
    </>
  );
}
