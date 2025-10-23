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
    const { roomCode, player } = await request.json();

    // ✅ Nettoyage du code pour éviter erreurs (majuscules / espaces)
    const normalizedCode = roomCode.trim().toUpperCase();

    console.log("🔍 Tentative de rejoindre la room :", normalizedCode);

    const room = await roomStore.get(normalizedCode);

    if (!room) {
      console.warn("❌ Room introuvable dans Redis :", normalizedCode);
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    if (room.players.length >= 2) {
      console.warn("🚫 Room pleine :", normalizedCode);
      return NextResponse.json({ error: "Room is full" }, { status: 400 });
    }

    // ✅ Ajouter le joueur et sauvegarder
    room.players.push(player);
    await roomStore.update(normalizedCode, room);

    console.log(`✅ Joueur ${player.name} ajouté à ${normalizedCode}`);

    // 🔔 Notifier les autres joueurs via Pusher
    await pusher.trigger(`room-${normalizedCode}`, "player-joined", { player });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("🔥 Erreur join room :", error);
    return NextResponse.json({ error: "Failed to join room" }, { status: 500 });
  }
}
