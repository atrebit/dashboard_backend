import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";

export async function GET() {
  const updates = await prisma.updateSet.findMany();
  return NextResponse.json(updates);  // und geben die Daten als JSON-Antwort zurück
}