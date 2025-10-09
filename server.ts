import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import { initScheduler } from '@/lib/scheduler'
 
const port = parseInt(process.env.PORT || '3000', 10)
const isDev = process.env.NODE_ENV !== 'production'
const app = next({ dev: isDev })
const handle = app.getRequestHandler()

app.prepare().then(() => {  // startet next.js app
  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    handle(req, res, parsedUrl)
  }).listen(port)
 
  console.log(
    `> Server listening at http://localhost:${port} as ${
      isDev ? 'development' : process.env.NODE_ENV
    }`
  )

  initScheduler();  // Scheduler initialisieren
  console.log("Scheduler initialized");
})
