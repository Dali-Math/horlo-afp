export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

// ✅ Simple route pour tester l’état du backend
export async function GET() {
  return new Response("debug endpoint active", {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}
