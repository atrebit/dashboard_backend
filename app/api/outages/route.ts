import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import { Prisma, OutageStatus } from "@prisma/client";
import axios, { AxiosResponse } from 'axios';

export async function GET() {
//  const outages = await prisma.serverOutage.findMany();
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

  return new NextResponse(null, { status: 200 }); // und geben die Daten als JSON-Antwort zurück
}

export async function POST(req: Request) {
  const data = await req.json();
  const outage = await prisma.serverOutage.create({ data });
  return NextResponse.json(outage, { status: 201 });
}
