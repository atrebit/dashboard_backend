import cron from "node-cron";
import { prisma } from "@/utils/db";
import axios from 'axios';

export function initScheduler() {
  cron.schedule("5 * * * * *", () => {
      console.log("Requesting and storing data from UpStream-Service...");
      axios.get('http://localhost/outages') // get request auf localhost/outages (JSON-Server antwortet)
      .then(async function (response) { // im Falle einer positiven Antwort
        await prisma.serverOutage.createMany({ // schreiben wir die Daten in auf die DB
          data: response.data,
        });// handle success
      })
      .catch(function (error) { // im Falle eines Fehlers beim Anfragen der Daten des JSON-Servers (z.B. Server nicht erreichbar), dann
        // handle error
        console.log(error); // Fehler in der Konsole ausgeben
      });
    
      axios.get('http://localhost/updates') // get request auf localhost/outages (JSON-Server antwortet)
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
