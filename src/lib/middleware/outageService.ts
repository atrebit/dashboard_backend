import { prisma } from "@/utils/db";
import { ServerOutage } from "@prisma/client";

/** 
 * This class implements the business logic for retrieving server outages from the database.
 */

export class OutageService {

  /** 
 * The database is queried for outages that have occurred since a specified point in time.
 * 
 * @param timestamp - the timestamp from which to retrieve server       outages
 * @returns the list of server outages since the given timestamp
 */

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