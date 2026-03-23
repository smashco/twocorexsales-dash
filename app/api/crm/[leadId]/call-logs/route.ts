import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

function serializeLog(log: {
  id: string;
  leadId: string;
  timestamp: Date;
  channel: string;
  outcome: string;
  notes: string;
  createdBy: string;
}) {
  return {
    id: log.id,
    leadId: log.leadId,
    timestamp: log.timestamp.toISOString(),
    channel: log.channel,
    outcome: log.outcome,
    notes: log.notes,
    createdBy: log.createdBy,
  };
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ leadId: string }> }
) {
  try {
    const { leadId } = await params;

    const logs = await prisma.callLog.findMany({
      where: { leadId },
      orderBy: { timestamp: "desc" },
    });

    return Response.json(logs.map(serializeLog));
  } catch (error) {
    console.error("[GET /api/crm/[leadId]/call-logs]", error);
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

    const { timestamp, channel, outcome, notes, createdBy } = body as {
      timestamp?: string;
      channel: string;
      outcome: string;
      notes?: string;
      createdBy?: string;
    };

    if (!channel || !outcome) {
      return Response.json(
        { error: "channel and outcome are required" },
        { status: 400 }
      );
    }

    // Ensure the LeadCRM parent record exists before creating a call log
    await prisma.leadCRM.upsert({
      where: { leadId },
      update: {
        lastContactedAt: new Date(),
      },
      create: {
        leadId,
        status: "not_started",
        generalNotes: "",
        lastContactedAt: new Date(),
      },
    });

    const newLog = await prisma.callLog.create({
      data: {
        leadId,
        timestamp: timestamp ? new Date(timestamp) : new Date(),
        channel,
        outcome,
        notes: notes ?? "",
        createdBy: createdBy ?? "",
      },
    });

    return Response.json(serializeLog(newLog), { status: 201 });
  } catch (error) {
    console.error("[POST /api/crm/[leadId]/call-logs]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
