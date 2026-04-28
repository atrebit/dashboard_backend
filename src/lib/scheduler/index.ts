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
      axios.get(`${baseUrl}/outages`)   // Abfrage des UpStream-Services nach Ausfall-Daten
      .then(async function (response) { 
        await prisma.serverOutage.createMany({    // Speichern der erhaltenen Daten in der Datenbank
          data: response.data,
        });
      })
      .catch(function (error) { 
        console.log(error);     // Loggen von potenziellen Fehlern
      });

      axios.get(`${baseUrl}/updates`)   // Abfrage des UpStream-Services nach Update-Daten
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
