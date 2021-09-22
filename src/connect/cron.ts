import { CronJob } from "cron";
// import { processActions } from "../graphql/calendar/resolveFuns";
import { autoBackupDB } from "./backup";

export const handleSendNotifications = new CronJob("*/5 * * * *", async () => {
  const d = new Date();
  console.log("At every 5th minute.:", d);
  // processActions()
});

export const backupJob = new CronJob("0 * * * *", () => {
  const d = new Date();
  autoBackupDB();
  console.log("Every day at 01:00:00 Backup :", d);
});

export const startCronJobs = () => {
  console.log("Cron jobs started");
  // closedAccountsJob.start();
  backupJob.start();
};
