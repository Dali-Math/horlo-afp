// ✅ Blocage total du pré-rendu et exécution pendant le build
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const preferredRegion = "auto";
export const revalidate = 0;

// ❗ Aucun import dynamique ici — juste du texte statique
// Cela empêche complètement Next de "collecter" la page data

export async function GET() {
  return new Response("answer endpoint ready", {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}

export async function POST() {
  return new Response("answer API active (runtime only)", {
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
