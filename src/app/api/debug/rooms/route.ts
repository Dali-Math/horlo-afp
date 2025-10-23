export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const preferredRegion = "auto";
export const revalidate = 0; // empêche tout cache et toute pré-rendu

import { NextRequest, NextResponse } from "next/server";
import { roomStore } from "@/lib/room-store";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const roomCode = searchParams.get("code");

    // ✅ Réponse ultra-légère pour éviter toute collecte de données
    if (!roomCode) {
      return new Response("debug endpoint active", {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });
    }

    const room = await roomStore.get(roomCode);
    if (!room) {
      return new Response("room not found", {
        status: 404,
        headers: { "Content-Type": "text/plain" },
      });
    }

    // ✅ Réponse texte simple — pas de JSON complexe à collecter
    const text = `Room: ${room.code}
Players: ${room.players.length}
Host: ${room.host}
Created: ${new Date(room.createdAt).toISOString()}
Has GameState: ${!!room.gameState}`;
    return new Response(text, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error: any) {
    console.error("Error in /api/debug/rooms:", error);
    return new Response("internal error", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}

// ✅ DELETE : suppression simple d’une room (debug)
export async function DELETE(request: NextRequest) {
  try {
    const { roomCode } = await request.json().catch(() => ({}));
    if (!roomCode) {
      return new Response("missing roomCode", {
        status: 400,
        headers: { "Content-Type": "text/plain" },
      });
    }

    await roomStore.delete(roomCode);
    return new Response(`room ${roomCode} deleted`, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error: any) {
    console.error("Error deleting room:", error);
    return new Response("delete failed", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}

// ✅ HEAD : réponse minimale pour bloquer toute tentative de "page data collect"
export async function HEAD() {
  return new Response("ok", { status: 200 });
}
