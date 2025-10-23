// --- Blocage complet du pré-rendu ---
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const preferredRegion = "auto";

import { NextRequest } from "next/server";
import Pusher from "pusher";
import { roomStore } from "@/lib/room-store";

const {
  PUSHER_APP_ID,
  NEXT_PUBLIC_PUSHER_KEY,
  PUSHER_SECRET,
  NEXT_PUBLIC_PUSHER_CLUSTER,
} = process.env;

const pusher = new Pusher({
  appId: PUSHER_APP_ID ?? "",
  key: NEXT_PUBLIC_PUSHER_KEY ?? "",
  secret: PUSHER_SECRET ?? "",
  cluster: NEXT_PUBLIC_PUSHER_CLUSTER ?? "eu",
  useTLS: true,
});

// ✅ Route POST protégée contre les erreurs de build
export async function POST(request: NextRequest) {
  try {
    // On parse sans crasher si le body est vide pendant le build
    const body = await request.json().catch(() => ({}));
    const { roomCode, playerId, answer } = body || {};

    // Vérifications minimales
    if (!roomCode || !playerId) {
      return new Response("invalid payload", { status: 400 });
    }

    const room = await roomStore.get(roomCode);
    if (!room) {
      return new Response("room not found", { status: 404 });
    }

    const player = room.players.find((p: any) => p.id === playerId);
    if (!player) {
      return new Response("player not found", { status: 404 });
    }

    // ✅ Sauvegarde minimale
    player.currentAnswer = answer ?? null;
    player.hasAnswered = true;
    await roomStore.update(roomCode, room);

    // ✅ Notif Pusher (protégée)
    try {
      await pusher.trigger(`room-${roomCode}`, "player-answered", {
        playerId,
        answer,
      });
    } catch (pushError) {
      console.warn("Pusher trigger skipped:", pushError);
    }

    // ✅ Réponse ultra-simple pour bloquer la collecte JSON
    return new Response("ok", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (err: any) {
    console.error("Error in /api/rooms/answer:", err);
    return new Response("error", { status: 500 });
  }
}

// ✅ GET & HEAD ultra-légers — aucun JSON, pas de data à collecter
export async function GET() {
  return new Response("answer endpoint active", {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}

export async function HEAD() {
  return new Response("ok", { status: 200 });
}
