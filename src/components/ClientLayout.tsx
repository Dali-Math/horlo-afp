"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TranslationNoticeBanner from "@/components/TranslationNoticeBanner";

const FloatingSearchButton = dynamic(() => import("./FloatingSearchButton"), { ssr: false });
const SearchModal = dynamic(() => import("./SearchModal"), { ssr: false });
const PwaRegistrar = dynamic(() => import("./PwaRegistrar"), { ssr: false });
const VoiceWorkbenchAssistant = dynamic(() => import("./VoiceWorkbenchAssistant"), { ssr: false });

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
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
      <TranslationNoticeBanner />
      <div className="hl-site-content">{children}</div>
      <Footer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <FloatingSearchButton onClick={() => setIsSearchOpen(true)} />
      <VoiceWorkbenchAssistant />
      <PwaRegistrar />
    </>
  );
}
