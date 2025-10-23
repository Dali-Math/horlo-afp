export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

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
    const { host } = await request.json();
    if (!host) return NextResponse.json({ error: "Missing host data" }, { status: 400 });

    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const room = await roomStore.create(code, host);

    await pusher.trigger(`room-${code}`, "room-created", { host });

    return NextResponse.json({ success: true, roomCode: code, room });
  } catch (error: any) {
    console.error("Error in /api/rooms/create:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
