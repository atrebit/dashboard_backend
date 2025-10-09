import cron from "node-cron";


export function initScheduler() {
  cron.schedule("*/30 * * * * *", () => {
    console.log("Task runs every hour");
  });
}
