export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const preferredRegion = "auto";
export const revalidate = 0; // empêche Next d'essayer de pré-rendre quoi que ce soit

import { NextRequest, NextResponse } from "next/server";
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { roomCode, playerId, answer } = body || {};

    if (!roomCode || !playerId) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const room = await roomStore.get(roomCode);
    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    const player = room.players.find((p: any) => p.id === playerId);
    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    // ✅ Mise à jour du joueur
    player.currentAnswer = answer ?? null;
    player.hasAnswered = true;

    await roomStore.update(roomCode, room);

    // ✅ Notification via Pusher
    try {
      await pusher.trigger(`room-${roomCode}`, "player-answered", {
        playerId,
        answer,
      });
    } catch (pushError) {
      console.error("Pusher trigger failed:", pushError);
    }

    // ✅ Réponse ultra-simple (pas de JSON lourd au build)
    return new Response("ok", { status: 200 });
  } catch (error: any) {
    console.error("Error in /api/rooms/answer:", error);
    return new Response("error", { status: 500 });
  }
}

// --- GET & HEAD : anti-prerender, réponse texte pour éviter la collecte JSON ---
export async function GET() {
  return new Response("answer endpoint active", {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}

export async function HEAD() {
  return new Response("ok", { status: 200 });
}
