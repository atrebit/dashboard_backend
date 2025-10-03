import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import { Prisma, OutageStatus } from "@prisma/client";

export async function GET() {
//  const outages = await prisma.serverOutage.findMany();
  const data: Prisma.ServerOutageCreateInput[] = [
    {
      serverName: "DB-Server-01",
      description: "Connection timeout detected",
      status: "ACTIVE",
      startedAt: "2025-10-01T08:15:00Z",
      resolvedAt: null,
      createdAt: "2025-10-01T08:15:00Z",
      updatedAt: "2025-10-03T12:00:00Z"
    },
    {
      serverName: "API-Gateway",
      description: "High latency observed",
      status: "RESOLVED",
      startedAt: "2025-09-28T14:00:00Z",
      resolvedAt: "2025-09-28T15:45:00Z",
      createdAt: "2025-09-28T14:00:00Z",
      updatedAt: "2025-09-28T15:45:00Z"
    },
    ];

  await prisma.serverOutage.createMany({
    data: data,
    });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const data = await req.json();
  const outage = await prisma.serverOutage.create({ data });
  return NextResponse.json(outage, { status: 201 });
}
