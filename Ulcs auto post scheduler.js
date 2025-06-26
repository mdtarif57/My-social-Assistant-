// === [ulcs_auto_post_scheduler.js] ===
// 📆 AI-Based Auto Scheduler + Timing Optimizer
// 🧠 Module 14 | Version: v2.1 Ultra Precision Scheduler
// 🔗 Seamlessly connects with all ULCS marketing, content & analytics modules

const { getOptimalPostTime, learnFromEngagementData } = require("./ulcs_time_ai_engine");
const { contextStore } = require("./utils/context_manager");
const { notifyUser } = require("./utils/mobile_comm_api");
const { logActivity } = require("./logger/activity_logger");

// Core: Schedule a post dynamically
async function schedulePost(content, platform, userId, tone = "neutral") {
  try {
    // Step 1: Retrieve user and platform context
    const userProfile = contextStore.getUserProfile(userId);
    const platformContext = contextStore.getPlatformProfile(platform);

    // Step 2: Predict best time using AI + historical learning
    const bestTime = await getOptimalPostTime(userId, platform, tone);

    // Step 3: Store the schedule info
    contextStore.saveSchedule({
      userId,
      platform,
      content,
      tone,
      scheduledTime: bestTime,
      status: "scheduled",
      timestamp: new Date().toISOString(),
    });

    // Step 4: Notify user
    await notifyUser(userId, `📅 Post scheduled for ${platform} at ${bestTime} based on optimal AI prediction.`);

    // Step 5: Log
    logActivity({
      userId,
      platform,
      tone,
      action: "schedule_post",
      scheduledTime: bestTime,
      contentSnippet: content.slice(0, 80),
      timestamp: new Date().toISOString(),
    });

    return `✅ Post has been smartly scheduled for ${platform} at ${bestTime}.`;

  } catch (err) {
    console.error("❌ [Auto Scheduler Error]:", err.message);
    return "⚠️ Failed to schedule post due to internal error.";
  }
}

// Auto-learning: update engagement pattern based on analytics
async function learnFromAnalytics(userId, analyticsData) {
  try {
    await learnFromEngagementData(userId, analyticsData);
    return "📈 Scheduler AI updated with latest engagement patterns.";
  } catch (err) {
    console.error("❌ [AI Learning Error]:", err.message);
    return "⚠️ Failed to update scheduler AI.";
  }
}

module.exports = { schedulePost, learnFromAnalytics };
