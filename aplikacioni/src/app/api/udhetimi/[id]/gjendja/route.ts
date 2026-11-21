import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { lexoGjendjen } from "@/lib/kerkesat";

export const dynamic = "force-dynamic";

// Përgjigje personale: private dhe pa cache, që të mos ripërdoret për një sesion tjetër.
const koka = { "Cache-Control": "private, no-store" };

export async function GET(_req: Request, ctx: RouteContext<"/api/udhetimi/[id]/gjendja">) {
  const { id } = await ctx.params;
  try {
    const session = await getServerSession(authOptions);
    const gjendja = await lexoGjendjen(id, session?.user?.id ?? null);
    if (!gjendja) return Response.json({ error: "Udhëtimi nuk u gjet." }, { status: 404, headers: koka });
    return Response.json(gjendja, { headers: koka });
  } catch {
    return Response.json({ error: "Gjendja nuk mund të lexohet tani." }, { status: 503, headers: koka });
  }
}
