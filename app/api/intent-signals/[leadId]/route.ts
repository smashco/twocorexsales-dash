import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import type { IntentSignalData } from "@/types";

const TTL_MS = 3 * 24 * 60 * 60 * 1000; // 3 days (tech stacks change faster)

async function ensureTable() {
  await prisma.$executeRawUnsafe(
    `CREATE TABLE IF NOT EXISTS intent_signal_cache (lead_id TEXT PRIMARY KEY, data JSONB NOT NULL, generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`
  );
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ leadId: string }> }
) {
  try {
    const { leadId } = await params;
    let cached;
    try {
      cached = await prisma.intentSignalCache.findUnique({ where: { leadId } });
    } catch {
      await ensureTable();
      return Response.json({ success: true, data: null });
    }

    if (!cached) return Response.json({ success: true, data: null });

    const age = Date.now() - cached.generatedAt.getTime();
    if (age > TTL_MS) return Response.json({ success: true, data: null });

    const result: IntentSignalData = {
      leadId,
      generatedAt: cached.generatedAt.toISOString(),
      ...(cached.data as unknown as Omit<IntentSignalData, "leadId" | "generatedAt">),
    };

    return Response.json({ success: true, data: result });
  } catch (error) {
    console.error("[GET /api/intent-signals/[leadId]]", error);
    return Response.json({ success: true, data: null });
  }
}
