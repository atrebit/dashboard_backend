import { prisma } from "@/utils/db";
import { UpdateSet } from "@prisma/client";

/** 
 * This class implements the business logic for retrieving update sets from the database.
 */

export class UpdateService {

  /** 
 * The database is queried for update sets that have occurred since a specified point in time.
 * 
 * @param timestamp - the timestamp from which to retrieve update sets
 * @returns the list of update sets since the given timestamp
 */

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
