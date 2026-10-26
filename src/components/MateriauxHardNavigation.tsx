"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function MateriauxHardNavigation() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/materiaux") return;

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href="/materiaux/metaux-communs"]');
      if (!anchor) return;

      event.preventDefault();
      event.stopPropagation();

      const freshUrl = `/materiaux/metaux-communs?fresh=${Date.now()}`;
      window.location.assign(freshUrl);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [pathname]);

  return null;
}
