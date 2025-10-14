import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import { outageService } from "@/lib/middleware/outageService";

export async function GET(request: NextRequest) {
  const since = request.nextUrl.searchParams.get("since");
  if (!since) {
    return NextResponse.json(
      { error: "Missing required query parameter: 'since'" },
      { status: 400 }
    );
  }

  const sinceDate = new Date(since);
  if (isNaN(sinceDate.getTime())) {
    return NextResponse.json(
      { error: "Given value for since is not a valid date" },
      { status: 400 }
    );
  }

  try {
    const outages = await outageService.getOutagesSince(sinceDate);
    return NextResponse.json(outages);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch updates" },
      { status: 500 }
    );
  }
}
