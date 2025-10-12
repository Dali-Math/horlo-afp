"use client";
import { useEffect } from "react";

export default function JsonLd({ data }: { data: Record<string, any> }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(data);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, [data]);

  return null;
}
