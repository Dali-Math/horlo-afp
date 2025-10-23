export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const preferredRegion = "auto";
export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server";

// ❗️Protection : on charge Pusher et roomStore uniquement à l'exécution (jamais au build)
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
    // ✅ vérifie si on est dans un vrai runtime
    if (process.env.NEXT_PHASE === "build") {
      return new Response("Build mode: skipping execution", { status: 200 });
    }

    const { roomStore, pusher } = await loadRuntimeModules();
    const { roomCode, player } = await request.json();

    if (!roomCode || !player)
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

    const room = await roomStore.get(roomCode);
    if (!room)
      return NextResponse.json({ error: "Room not found" }, { status: 404 });

    if (room.players.length >= 2)
      return NextResponse.json({ error: "Room is full" }, { status: 403 });

    room.players.push({
      ...player,
      score: 0,
      streak: 0,
      ready: false,
      currentAnswer: null,
      hasAnswered: false,
    });

    await roomStore.update(roomCode, room);
    await pusher.trigger(`room-${roomCode}`, "player-joined", { player });

    return NextResponse.json({ success: true, room });
  } catch (error: any) {
    console.error("Error in /api/rooms/join:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message || error },
      { status: 500 }
    );
  }
}

export async function GET() {
  return new Response("join endpoint ready", { status: 200 });
}
