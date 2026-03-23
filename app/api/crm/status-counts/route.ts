import { prisma } from "@/lib/db";
import type { CRMStatus } from "@/types";

export async function GET() {
  try {
    const rows = await prisma.leadCRM.groupBy({
      by: ["status"],
      _count: { status: true },
    });

    const counts: Record<CRMStatus, number> = {
      not_started: 0,
      researched: 0,
      message_sent: 0,
      in_conversation: 0,
      demo_scheduled: 0,
      proposal_sent: 0,
      won: 0,
      lost: 0,
      nurturing: 0,
    };

    for (const row of rows) {
      const status = row.status as CRMStatus;
      counts[status] = row._count.status;
    }

    return Response.json(counts);
  } catch (error) {
    console.error("[GET /api/crm/status-counts]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
