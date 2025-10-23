// src/lib/useSocket.ts
"use client";
import { useEffect, useRef } from "react";

export function useSocket(onMessage: (data: any) => void) {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");
    socketRef.current = ws;

    ws.onopen = () => console.log("🟢 Connecté au serveur WebSocket");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };
    ws.onclose = () => console.log("🔴 Déconnecté du serveur WebSocket");

    return () => ws.close();
  }, [onMessage]);

  function send(data: any) {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(data));
    }
  }

  return { send };
}
