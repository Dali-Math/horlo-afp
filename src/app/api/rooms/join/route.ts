export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import Pusher from "pusher";
import { roomStore } from "@/lib/room-store";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID ?? "",
  key: process.env.NEXT_PUBLIC_PUSHER_KEY ?? "",
  secret: process.env.PUSHER_SECRET ?? "",
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER ?? "eu",
  useTLS: true,
});

export async function POST(request: NextRequest) {
  try {
    const { roomCode, player } = await request.json();

    if (!roomCode || !player) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // 🔹 Vérifie d'abord si la room existe
    const room = await roomStore.get(roomCode);
    if (!room) {
      return NextResponse.json(
        { error: "Room not found. Ask the host to create it first." },
        { status: 404 }
      );
    }

    // 🔹 Empêche de rejoindre une room déjà complète
    if (room.players.length >= 2) {
      return NextResponse.json(
        { error: "Room is full" },
        { status: 403 }
      );
    }

    // 🔹 Ajoute le joueur dans la room
    room.players.push({
      id: player.id,
      name: player.name,
      avatar: player.avatar,
      score: 0,
      streak: 0,
      ready: false,
      currentAnswer: null,
      hasAnswered: false,
    });

    await roomStore.update(roomCode, room);

    // 🔹 Notifie le host via Pusher
    await pusher.trigger(`room-${roomCode}`, "player-joined", {
      player,
    });

    return NextResponse.json({ success: true, room });
  } catch (error: any) {
    console.error("Error in /api/rooms/join:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
