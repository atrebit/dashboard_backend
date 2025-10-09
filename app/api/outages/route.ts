import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";

export async function GET() {
  const outages = await prisma.serverOutage.findMany();
  console.log("Outages fetched:", outages);
  return new NextResponse(null, { status: 200 }); // und geben die Daten als JSON-Antwort zurück
}

export async function POST(req: Request) {
  const data = await req.json();
  const outage = await prisma.serverOutage.create({ data });
  return NextResponse.json(outage, { status: 201 });
}
