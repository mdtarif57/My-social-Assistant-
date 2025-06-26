// === [audience_insight_analyzer.js] ===
// 🧠 ULCS Audience Insight Analyzer with Dual Mode (User + Social)
// ✨ Detects tone, emotion, interest and logs source-type smartly
// 🛠 Version: V3.0 | Author: AI Fusion Dev

const { detectTone, detectEmotion } = require("./ai_extensions/tone_emotion_parser");
const { extractInterestTags } = require("./ai_extensions/interest_tag_extractor");
const { logActivity } = require("./logger/activity_logger");

/**
* Analyze audience message from either direct user or social communication
* @param {string} message - The input text to analyze
* @param {string} userId - Unique identifier for the user
* @param {string} mode - 'user' | 'social'
* @returns {object} Insight summary
*/
async function analyzeAudienceMessage(message, userId = "default_user", mode = "user") {
  try {
    const tone = await detectTone(message);
    const emotion = await detectEmotion(message);
    const interestTags = await extractInterestTags(message);

    const source = mode === "social" ? "🌐 Social Media Text" : "👤 Direct User Input";

    const summary = {
      userId,
      message,
      source,
      tone,
      emotion,
      interestTags,
      timestamp: new Date().toISOString()
    };

    // Optional log
    logActivity({
      ...summary,
      tool: "audience_insight_analyzer"
    });

    return summary;
  } catch (err) {
    console.error("❌ [Audience Analyzer Error]:", err.message || err);
    return { error: "Failed to analyze message." };
  }
}

module.exports = { analyzeAudienceMessage };
