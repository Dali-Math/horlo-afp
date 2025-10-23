import { NextResponse } from "next/server";
import Pusher from "pusher";

const { PUSHER_APP_ID, NEXT_PUBLIC_PUSHER_KEY, PUSHER_SECRET, NEXT_PUBLIC_PUSHER_CLUSTER } = process.env;

if (!PUSHER_APP_ID || !NEXT_PUBLIC_PUSHER_KEY || !PUSHER_SECRET || !NEXT_PUBLIC_PUSHER_CLUSTER) {
  console.error("❌ Variables Pusher manquantes !");
}

const pusher = new Pusher({
  appId: PUSHER_APP_ID!,
  key: NEXT_PUBLIC_PUSHER_KEY!,
  secret: PUSHER_SECRET!,
  cluster: NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
});

export async function GET() {
  try {
    // Test simple d'envoi
    await pusher.trigger("debug-channel", "test-event", {
      message: "✅ Pusher fonctionne parfaitement !",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "✅ Test envoyé à Pusher avec succès",
    });
  } catch (error: any) {
    console.error("🔥 Erreur Pusher :", error);
    return NextResponse.json(
      { success: false, error: error.message || String(error) },
      { status: 500 }
    );
  }
}
