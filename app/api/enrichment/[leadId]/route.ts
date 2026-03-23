import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

function serializeEnrichment(e: {
  leadId: string;
  websiteValid: boolean | null;
  scrapedAddress: string | null;
  scrapedPhone: string | null;
  scrapedEmail: string | null;
  contactName: string | null;
  linkedinUrl: string | null;
  instagramUrl: string | null;
  facebookUrl: string | null;
  websiteTitle: string | null;
  websiteAbout: string | null;
  enrichedAt: Date;
  rawData: unknown;
}) {
  return {
    leadId: e.leadId,
    websiteValid: e.websiteValid,
    scrapedAddress: e.scrapedAddress,
    scrapedPhone: e.scrapedPhone,
    scrapedEmail: e.scrapedEmail,
    contactName: e.contactName,
    linkedinUrl: e.linkedinUrl,
    instagramUrl: e.instagramUrl,
    facebookUrl: e.facebookUrl,
    websiteTitle: e.websiteTitle,
    websiteAbout: e.websiteAbout,
    enrichedAt: e.enrichedAt.toISOString(),
    rawData: e.rawData ?? null,
  };
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ leadId: string }> }
) {
  try {
    const { leadId } = await params;

    const enrichment = await prisma.leadEnrichment.findUnique({
      where: { leadId },
    });

    if (!enrichment) {
      return Response.json(null);
    }

    return Response.json(serializeEnrichment(enrichment));
  } catch (error) {
    console.error("[GET /api/enrichment/[leadId]]", error);
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

    const {
      websiteValid,
      scrapedAddress,
      scrapedPhone,
      scrapedEmail,
      contactName,
      linkedinUrl,
      instagramUrl,
      facebookUrl,
      websiteTitle,
      websiteAbout,
      rawData,
    } = body as {
      websiteValid?: boolean | null;
      scrapedAddress?: string | null;
      scrapedPhone?: string | null;
      scrapedEmail?: string | null;
      contactName?: string | null;
      linkedinUrl?: string | null;
      instagramUrl?: string | null;
      facebookUrl?: string | null;
      websiteTitle?: string | null;
      websiteAbout?: string | null;
      rawData?: unknown;
    };

    const data = {
      websiteValid: websiteValid ?? null,
      scrapedAddress: scrapedAddress ?? null,
      scrapedPhone: scrapedPhone ?? null,
      scrapedEmail: scrapedEmail ?? null,
      contactName: contactName ?? null,
      linkedinUrl: linkedinUrl ?? null,
      instagramUrl: instagramUrl ?? null,
      facebookUrl: facebookUrl ?? null,
      websiteTitle: websiteTitle ?? null,
      websiteAbout: websiteAbout ?? null,
      enrichedAt: new Date(),
      rawData: rawData ?? undefined,
    };

    const enrichment = await prisma.leadEnrichment.upsert({
      where: { leadId },
      update: data,
      create: { leadId, ...data },
    });

    return Response.json(serializeEnrichment(enrichment), { status: 201 });
  } catch (error) {
    console.error("[POST /api/enrichment/[leadId]]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
