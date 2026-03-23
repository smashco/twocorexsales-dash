import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

// Two minutes in milliseconds
const PRESENCE_TTL_MS = 2 * 60 * 1000;

function serializeViewer(viewer: {
  id: string;
  leadId: string;
  repName: string;
  lastSeen: Date;
}) {
  return {
    id: viewer.id,
    leadId: viewer.leadId,
    repName: viewer.repName,
    lastSeen: viewer.lastSeen.toISOString(),
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ leadId: string }> }
) {
  try {
    const { leadId } = await params;
    const currentRep = request.nextUrl.searchParams.get("repName");

    const cutoff = new Date(Date.now() - PRESENCE_TTL_MS);

    const viewers = await prisma.leadViewer.findMany({
      where: {
        leadId,
        lastSeen: { gt: cutoff },
        ...(currentRep ? { repName: { not: currentRep } } : {}),
      },
    });

    return Response.json(viewers.map(serializeViewer));
  } catch (error) {
    console.error("[GET /api/presence/[leadId]]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ leadId: string }> }
) {
  try {
    const { leadId } = await params;
    const body = await request.json();
    const { repName } = body as { repName: string };

    if (!repName) {
      return Response.json({ error: "repName is required" }, { status: 400 });
    }

    const viewer = await prisma.leadViewer.upsert({
      where: {
        leadId_repName: { leadId, repName },
      },
      update: {
        lastSeen: new Date(),
      },
      create: {
        leadId,
        repName,
        lastSeen: new Date(),
      },
    });

    return Response.json(serializeViewer(viewer));
  } catch (error) {
    console.error("[POST /api/presence/[leadId]]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ leadId: string }> }
) {
  try {
    const { leadId } = await params;
    const body = await request.json();
    const { repName } = body as { repName: string };

    if (!repName) {
      return Response.json({ error: "repName is required" }, { status: 400 });
    }

    await prisma.leadViewer.deleteMany({
      where: { leadId, repName },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/presence/[leadId]]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
