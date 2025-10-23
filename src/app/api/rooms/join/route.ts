export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const preferredRegion = "auto";
export const revalidate = 0; // empêche tout pré-rendu

import { NextRequest, NextResponse } from "next/server";
import { roomStore } from "@/lib/room-store";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const roomCode = searchParams.get("code");

    if (!roomCode) {
      // Retour léger = pas de data collect
      return new Response("Debug endpoint active", {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });
    }

    const room = await roomStore.get(roomCode);
    if (!room) {
      return NextResponse.json(
        { error: "Room not found", code: roomCode },
        { status: 404 }
      );
    }

    return NextResponse.json({
      code: room.code,
      players: room.players.length,
      host: room.host,
      createdAt: room.createdAt,
      hasGameState: !!room.gameState,
    });
  } catch (error: any) {
    console.error("Error in /api/debug/rooms:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error?.message || error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { roomCode } = await request.json();
    if (!roomCode) {
      return NextResponse.json(
        { error: "Missing roomCode" },
        { status: 400 }
      );
    }

    await roomStore.delete(roomCode);
    return NextResponse.json({
      success: true,
      message: `Room ${roomCode} deleted.`,
    });
  } catch (error: any) {
    console.error("Error deleting room:", error);
    return NextResponse.json(
      { error: "Failed to delete room", details: error?.message || error },
      { status: 500 }
    );
  }
}

// --- pour empêcher Next de collecter des données pendant le build ---
export async function HEAD() {
  return new Response("ok", { status: 200 });
}
