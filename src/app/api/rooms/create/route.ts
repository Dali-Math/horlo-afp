// app/api/rooms/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import Pusher from "pusher";
import { roomStore } from "@/lib/room-store";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || "",
  key: process.env.NEXT_PUBLIC_PUSHER_KEY || "",
  secret: process.env.PUSHER_SECRET || "",
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "eu",
  useTLS: true,
});

export async function POST(request: NextRequest) {
  try {
    const { roomCode, host } = await request.json();

    // 🔒 Vérifier si la room existe déjà
    const existing = await roomStore.get(roomCode);
    if (existing) {
      return NextResponse.json(
        { error: "Room already exists" },
        { status: 400 }
      );
    }

    // ✅ Créer la nouvelle room
    const room = await roomStore.create(roomCode, host);

    await pusher.trigger(`room-${roomCode}`, "room-created", {
      roomCode,
      host,
    });

    return NextResponse.json({ success: true, room });
  } catch (error) {
    console.error("Error creating room:", error);
    return NextResponse.json(
      { error: "Failed to create room" },
      { status: 500 }
    );
  }
}
