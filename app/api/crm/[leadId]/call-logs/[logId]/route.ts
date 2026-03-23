import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ leadId: string; logId: string }> }
) {
  try {
    const { leadId, logId } = await params;

    // Verify the log belongs to this lead before deleting
    const log = await prisma.callLog.findFirst({
      where: { id: logId, leadId },
    });

    if (!log) {
      return Response.json({ error: "Call log not found" }, { status: 404 });
    }

    await prisma.callLog.delete({
      where: { id: logId },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/crm/[leadId]/call-logs/[logId]]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
