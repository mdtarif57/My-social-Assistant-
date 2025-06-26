// === [ulcs_campaign_analytics_recommender.js] ===
// 🚀 AI Campaign Analytics & Auto Recommender System
// 🧠 Version: Futuristic Core v1.0 | Author: AI Architect

const { getAllCampaignData, logCampaignPerformance } = require("./db/campaign_tracker");
const { analyzeEngagement } = require("./utils/ai_engagement_analyzer");
const { recommendStrategy } = require("./ai_extensions/strategy_recommender");
const { schedulePost } = require("./ulcs_auto_post_scheduler");
const { notifyUser } = require("./utils/mobile_comm_api");

// 📊 Step 1: Analyze past campaigns and return performance insights
async function analyzeCampaignHistory(userId) {
  const allCampaigns = await getAllCampaignData(userId);
  if (!allCampaigns || allCampaigns.length === 0) return "❌ No campaign history found.";

  const analysis = await analyzeEngagement(allCampaigns);

  return {
    insights: analysis.insights,
    bestPerforming: analysis.bestPerforming,
    weakSpots: analysis.weakSpots,
    timeBasedTrends: analysis.timeBasedTrends,
  };
}

// 💡 Step 2: Recommend future strategy
async function generateNextCampaignStrategy(userId, goal = "maximize engagement") {
  const campaignHistory = await getAllCampaignData(userId);
  const recommendation = await recommendStrategy(campaignHistory, goal);

  // Optional: Notify user
  await notifyUser(userId, `📊 New Campaign Strategy Ready: "${recommendation.summary}"`);
  return recommendation;
}

// 🔁 Step 3: Full auto-suggestion + optional auto-scheduler
async function campaignOptimizer(userId, platform = "facebook", autoSchedule = false) {
  const insights = await analyzeCampaignHistory(userId);
  const strategy = await generateNextCampaignStrategy(userId);

  if (autoSchedule && strategy.nextBestTime && strategy.message) {
    await schedulePost(strategy.message, userId, platform, strategy.nextBestTime);
    await notifyUser(userId, `📆 Post scheduled for ${strategy.nextBestTime} on ${platform}`);
  }

  return {
    insights,
    strategy,
    autoScheduled: autoSchedule ? "✅ Done" : "⏸️ Not requested",
  };
}

module.exports = {
  analyzeCampaignHistory,
  generateNextCampaignStrategy,
  campaignOptimizer,
};
