export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const preferredRegion = "auto";
export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server";

// 🧱 Empêche l'exécution au build
async function loadRuntimeModules() {
  const Pusher = (await import("pusher")).default;
  const { roomStore } = await import("@/lib/room-store");

  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID ?? "",
    key: process.env.NEXT_PUBLIC_PUSHER_KEY ?? "",
    secret: process.env.PUSHER_SECRET ?? "",
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER ?? "eu",
    useTLS: true,
  });

  return { roomStore, pusher };
}

export async function POST(request: NextRequest) {
  try {
    // ⛔ Ne rien exécuter pendant le build
    if (process.env.NEXT_PHASE === "build") {
      return new Response("Build phase — skipping", { status: 200 });
    }

    const { roomStore, pusher } = await loadRuntimeModules();
    const { roomCode, playerId, answer } = await request.json();

    if (!roomCode || !playerId)
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

    const room = await roomStore.get(roomCode);
    if (!room)
      return NextResponse.json({ error: "Room not found" }, { status: 404 });

    const player = room.players.find((p) => p.id === playerId);
    if (!player)
      return NextResponse.json({ error: "Player not found" }, { status: 404 });

    player.currentAnswer = answer ?? null;
    player.hasAnswered = true;

    await roomStore.update(roomCode, room);
    await pusher.trigger(`room-${roomCode}`, "player-answered", { playerId, answer });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error in /api/rooms/answer:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message || error },
      { status: 500 }
    );
  }
}

// Route GET simple = empêche collecte de données au build
export async function GET() {
  return new Response("answer endpoint active", { status: 200 });
}
