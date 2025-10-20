import cron from "node-cron";
import { prisma } from "@/utils/db";
import axios from 'axios';

const baseUrl = process.env.UPSTREAM_SERVER_URL;

if (!baseUrl) {
  throw new Error("Error: Environment variable in 'UPSTREAM_SERVER_URL' is not defined.");
}

export function initScheduler() {
  cron.schedule("5 * * * * *", () => {
      console.log("Requesting and storing data from UpStream-Service...");
      axios.get(`${baseUrl}/outages`) // get request auf localhost/outages (JSON-Server antwortet)
      .then(async function (response) { // im Falle einer positiven Antwort
        await prisma.serverOutage.createMany({ // schreiben wir die Daten in auf die DB
          data: response.data,
        });// handle success
      })
      .catch(function (error) { // im Falle eines Fehlers beim Anfragen der Daten des JSON-Servers (z.B. Server nicht erreichbar), dann
        // handle error
        console.log(error); // Fehler in der Konsole ausgeben
      });

      axios.get(`${baseUrl}/updates`) // get request auf localhost/outages (JSON-Server antwortet)
      .then(async function (response) { // im Falle einer positiven Antwort
        await prisma.updateSet.createMany({ // schreiben wir die Daten in auf die DB
          data: response.data,
        });// handle success
      })
      .catch(function (error) { // im Falle eines Fehlers beim Anfragen der Daten des JSON-Servers (z.B. Server nicht erreichbar), dann
        // handle error
        console.log(error); // Fehler in der Konsole ausgeben
      });
    
  });
}
