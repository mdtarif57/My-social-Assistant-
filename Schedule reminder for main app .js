// === [scheduler_reminder.js] ===
// ⏰ AI Scheduler with Smart Reminders

const scheduledTasks = [];

function scheduleTask(time, taskText) {
  const taskTime = new Date(time).getTime();
  const now = Date.now();

  if (taskTime <= now) return "⚠️ Cannot schedule for past time.";

  const delay = taskTime - now;
  setTimeout(() => {
    console.log(`🔔 Reminder: ${taskText}`);
    // Future: Can trigger AI skill here
  }, delay);

  scheduledTasks.push({ taskText, time });
  return `✅ Task scheduled for ${new Date(time).toLocaleString()}`;
}

function listScheduled() {
  return scheduledTasks;
}

module.exports = {
  scheduleTask,
  listScheduled
};
