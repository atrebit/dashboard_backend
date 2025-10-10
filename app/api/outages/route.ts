import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";

export async function GET() {
  const outages = await prisma.serverOutage.findMany();
  return NextResponse.json(outages);  // und geben die Daten als JSON-Antwort zurück
}
