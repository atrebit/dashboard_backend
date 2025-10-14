import { prisma } from "@/utils/db";
import { ServerOutage } from "@prisma/client";

export class OutageService {
  async getOutagesSince(timestamp: Date): Promise<ServerOutage[]> {
    return await prisma.serverOutage.findMany({
      where: {
        createdAt: {
          gte: timestamp,
        },
      },
    });
  }
}

export const outageService = new OutageService();
