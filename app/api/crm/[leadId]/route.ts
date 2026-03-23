import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import type { CRMStatus } from "@/types";

const DEFAULT_STATUS: CRMStatus = "not_started";

function buildDefaultState(leadId: string) {
  return {
    leadId,
    status: DEFAULT_STATUS,
    callLogs: [],
    generalNotes: "",
    customOutreachMessage: null,
    lastContactedAt: null,
    nextFollowUpAt: null,
    isStarred: false,
  };
}

function serializeCRM(crm: {
  leadId: string;
  status: string;
  generalNotes: string;
  customOutreachMessage: string | null;
  lastContactedAt: Date | null;
  nextFollowUpAt: Date | null;
  isStarred: boolean;
  callLogs?: {
    id: string;
    timestamp: Date;
    channel: string;
    outcome: string;
    notes: string;
    createdBy: string;
  }[];
}) {
  return {
    leadId: crm.leadId,
    status: crm.status as CRMStatus,
    generalNotes: crm.generalNotes,
    customOutreachMessage: crm.customOutreachMessage,
    lastContactedAt: crm.lastContactedAt ? crm.lastContactedAt.toISOString() : null,
    nextFollowUpAt: crm.nextFollowUpAt ? crm.nextFollowUpAt.toISOString() : null,
    isStarred: crm.isStarred,
    callLogs: (crm.callLogs ?? []).map((log) => ({
      id: log.id,
      timestamp: log.timestamp.toISOString(),
      channel: log.channel,
      outcome: log.outcome,
      notes: log.notes,
      createdBy: log.createdBy,
    })),
  };
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ leadId: string }> }
) {
  try {
    const { leadId } = await params;

    const crm = await prisma.leadCRM.findUnique({
      where: { leadId },
      include: {
        callLogs: {
          orderBy: { timestamp: "desc" },
        },
      },
    });

    if (!crm) {
      return Response.json(buildDefaultState(leadId));
    }

    return Response.json(serializeCRM(crm));
  } catch (error) {
    console.error("[GET /api/crm/[leadId]]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ leadId: string }> }
) {
  try {
    const { leadId } = await params;
    const body = await request.json();

    const {
      status,
      generalNotes,
      customOutreachMessage,
      lastContactedAt,
      nextFollowUpAt,
      isStarred,
    } = body as {
      status?: CRMStatus;
      generalNotes?: string;
      customOutreachMessage?: string | null;
      lastContactedAt?: string | null;
      nextFollowUpAt?: string | null;
      isStarred?: boolean;
    };

    const updateData: Record<string, unknown> = {};
    if (status !== undefined) updateData.status = status;
    if (generalNotes !== undefined) updateData.generalNotes = generalNotes;
    if (customOutreachMessage !== undefined) updateData.customOutreachMessage = customOutreachMessage;
    if (lastContactedAt !== undefined) {
      updateData.lastContactedAt = lastContactedAt ? new Date(lastContactedAt) : null;
    }
    if (nextFollowUpAt !== undefined) {
      updateData.nextFollowUpAt = nextFollowUpAt ? new Date(nextFollowUpAt) : null;
    }
    if (isStarred !== undefined) updateData.isStarred = isStarred;

    const crm = await prisma.leadCRM.upsert({
      where: { leadId },
      update: updateData,
      create: {
        leadId,
        status: (status as string) ?? DEFAULT_STATUS,
        generalNotes: generalNotes ?? "",
        customOutreachMessage: customOutreachMessage ?? null,
        lastContactedAt: lastContactedAt ? new Date(lastContactedAt) : null,
        nextFollowUpAt: nextFollowUpAt ? new Date(nextFollowUpAt) : null,
        isStarred: isStarred ?? false,
      },
      include: {
        callLogs: {
          orderBy: { timestamp: "desc" },
        },
      },
    });

    return Response.json(serializeCRM(crm));
  } catch (error) {
    console.error("[PATCH /api/crm/[leadId]]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
