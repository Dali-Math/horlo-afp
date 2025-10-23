export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const preferredRegion = "auto";
export const revalidate = 0;

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
    const body = await request.json();
    const { roomCode, player } = body || {};

    // Validation
    if (!roomCode || !player || !player.id) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Récupérer la room
    const room = await roomStore.get(roomCode);
    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    // Vérifier si le joueur existe déjà
    const alreadyJoined = room.players.some((p: any) => p.id === player.id);
    if (alreadyJoined) {
      return NextResponse.json(
        { error: "Player already in room" },
        { status: 400 }
      );
    }

    // Ajouter le joueur
    const success = await roomStore.addPlayer(roomCode, player);
    if (!success) {
      return NextResponse.json(
        { error: "Room is full or unavailable" },
        { status: 403 }
      );
    }

    // Notifier via Pusher
    try {
      await pusher.trigger(`room-${roomCode}`, "player-joined", { player });
    } catch (pushError) {
      console.error("Pusher trigger failed:", pushError);
    }

    return NextResponse.json({
      success: true,
      message: `Player ${player.name} joined room ${roomCode}`,
    });
  } catch (error: any) {
    console.error("Error in /api/rooms/join:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error?.message || error,
      },
      { status: 500 }
    );
  }
}

// --- GET & HEAD : bloquent la collecte pendant le build ---
export async function GET() {
  return new Response("join endpoint active", {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}

export async function HEAD() {
  return new Response("ok", { status: 200 });
}
