"use client";
import { useEffect } from "react";

export default function JsonLd({ data }: { data: Record<string, any> }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    // Échappement strict de <, > et & pour prévenir toute injection de balise </script>
    script.textContent = JSON.stringify(data)
      .replace(/</g, "\\u003c")
      .replace(/>/g, "\\u003e")
      .replace(/&/g, "\\u0026");
    document.head.appendChild(script);
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [data]);

  return null;
}
