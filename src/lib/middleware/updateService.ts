import { prisma } from "@/utils/db";
import { UpdateSet } from "@prisma/client";

export class UpdateService {
  async getUpdatesSince(timestamp: Date): Promise<UpdateSet[]> {
    return await prisma.updateSet.findMany({
      where: {
        createdAt: {
          gte: timestamp,
        },
      },
    });
  }
}

export const updateService = new UpdateService();
