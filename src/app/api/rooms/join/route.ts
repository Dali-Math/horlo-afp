// 🧱 Build-Safe version pour Vercel (aucune exécution pendant le build)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const preferredRegion = "auto";
export const revalidate = 0;

// ✅ Aucun import externe ici : ni Pusher, ni roomStore
// ✅ Réponses légères uniquement
export async function GET() {
  return new Response("join endpoint ready", {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}

export async function POST() {
  return new Response("join API active (runtime only)", {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}

export async function HEAD() {
  return new Response("ok", { status: 200 });
}

export async function DELETE() {
  return new Response("disabled", { status: 200 });
}
