import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import type { BizIntelData } from "@/types";

const TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ leadId: string }> }
) {
  try {
    const { leadId } = await params;
    const cached = await prisma.bizIntelCache.findUnique({ where: { leadId } });

    if (!cached) return Response.json({ success: true, data: null });

    const age = Date.now() - cached.generatedAt.getTime();
    if (age > TTL_MS) return Response.json({ success: true, data: null });

    const result: BizIntelData = {
      leadId,
      generatedAt: cached.generatedAt.toISOString(),
      ...(cached.data as Omit<BizIntelData, "leadId" | "generatedAt">),
    };

    return Response.json({ success: true, data: result });
  } catch (error) {
    console.error("[GET /api/biz-intel/[leadId]]", error);
    return Response.json({ success: false, error: String(error) }, { status: 500 });
  }
}
