// --- Blocage total du pré-rendu ---
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const preferredRegion = "auto";

// --- Import minimal ---
import { NextResponse } from "next/server";

// ✅ Route ultra-légère — aucune dépendance au roomStore pendant le build
export async function GET() {
  return new Response("debug endpoint active (no data collected)", {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}

export async function HEAD() {
  return new Response("ok", { status: 200 });
}

export async function POST() {
  return NextResponse.json({ message: "debug disabled in production" });
}

export async function DELETE() {
  return new Response("disabled", { status: 200 });
}
