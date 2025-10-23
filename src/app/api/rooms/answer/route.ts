// ✅ Empêche toute exécution au moment du build
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const preferredRegion = "auto";
export const revalidate = 0;

// 🧱 Réponses simples, pas de JSON ni d'import externe
export async function GET() {
  return new Response("endpoint active", {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}

export async function POST() {
  return new Response("ok", {
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
