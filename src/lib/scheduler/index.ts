import cron from "node-cron";
import { prisma } from "@/utils/db";
import axios from 'axios';

const baseUrl = process.env.UPSTREAM_SERVER_URL;

if (!baseUrl) {
  throw new Error("Error: Environment variable in 'UPSTREAM_SERVER_URL' is not defined.");
}

/**
 * Übergeben einer anonymen Funktion an den Scheduler, die in regelmäßigen Abständen Daten von einem UpStream-Service anfragt und in der lokalen Datenbank speichert.
 */

export function initScheduler() {
  cron.schedule("5 * * * * *", () => {
      console.log("Requesting and storing data from UpStream-Service...");
      axios.get(`${baseUrl}/outages`) 
      .then(async function (response) { 
        await prisma.serverOutage.createMany({ 
          data: response.data,
        });
      })
      .catch(function (error) { 
        console.log(error); 
      });

      axios.get(`${baseUrl}/updates`) 
      .then(async function (response) { 
        await prisma.updateSet.createMany({ 
          data: response.data,
        });
      })
      .catch(function (error) { 
        console.log(error); 
      });
    
  });
}
