import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/db";

export async function GET(request: NextRequest) {
  const since = request.nextUrl.searchParams.get("since");
  if (!since) {
    return NextResponse.json(
      { error: "Missing required query parameter: 'since'" },
      { status: 400 }
    );
  }

  const outages = await prisma.serverOutage.findMany({
    where: {
      createdAt: {
        gte: new Date(since),
      },
    },
  });
  return NextResponse.json(outages);  // und geben die Daten als JSON-Antwort zurück
}
