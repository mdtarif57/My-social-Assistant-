// === [influencer_collab_recommender.js] === // 🤝 ULCS Influencer Collaboration Recommender Tool // 🔍 Finds ideal influencers for campaign goals based on niche, audience match, and engagement

const { fetchInfluencerData, matchInfluencerProfile } = require("./utils/influencer_db_api"); const { notifyUser } = require("./utils/mobile_comm_api"); const { logActivity } = require("./logger/activity_logger");

/**

Recommend influencers for a specific campaign goal */ async function recommendInfluencers(campaignGoal, targetAudience, platform, userId) {   try {     const influencers = await fetchInfluencerData(platform);     const matches = influencers.filter((influencer) =>       matchInfluencerProfile(influencer, campaignGoal, targetAudience)     );


    const topMatches = matches.slice(0, 5);     const formatted = topMatches.map((inf, idx) => ${idx + 1}. ${inf.name} (@${inf.handle}) - Engagement: ${inf.engagementRate}%).join("\n");

    await notifyUser(userId, 📢 Top Influencer Matches for '${campaignGoal}':\n\n${formatted});

    logActivity({       userId,       campaignGoal,       platform,       recommended: topMatches.length,       timestamp: new Date().toISOString(),     });

    return formatted || "No suitable influencer found.";   } catch (err) {     console.error("❌ Influencer Recommender Error:", err);     return "Error finding influencer recommendations.";   } }

module.exports = { recommendInfluencers };
