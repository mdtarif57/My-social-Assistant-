// === [ulcs_cross_platform_reposter.js] ===
// 🔁 Cross-Platform AI Reposter + Smart Format Adapter (V5.3)
// 🧠 ULCS Core + Context-Aware Post Adjuster

const { detectLanguage, translateText } = require("./ai_extensions/multi_lang_parser");
const { analyzeEmotion } = require("./utils/emotion_engine");
const { getPlatformTemplate } = require("./ai_extensions/platform_formatter");
const { postToFacebook, postToInstagram, postToLinkedIn, postToX } = require("./ulcs_social_api_connector");
const { notifyUser } = require("./utils/mobile_comm_api");

// 🚀 Main Republisher
async function repostEverywhere(originalText, userId = "default_user") {
  try {
    console.log("🔁 Starting AI Cross-Repost");

    // Step 1: Detect language and translate to English
    const lang = await detectLanguage(originalText);
    const textEn = await translateText(originalText, "en");

    // Step 2: Detect emotion/tone
    const emotion = await analyzeEmotion(textEn);

    // Step 3: Generate Platform-Specific Format
    const formattedPosts = {
      facebook: getPlatformTemplate("facebook", textEn, emotion),
      instagram: getPlatformTemplate("instagram", textEn, emotion),
      linkedin: getPlatformTemplate("linkedin", textEn, emotion),
      twitter: getPlatformTemplate("twitter", textEn, emotion),
    };

    // Step 4: Auto Post Everywhere
    await postToFacebook({ caption: formattedPosts.facebook, userId });
    await postToInstagram({ caption: formattedPosts.instagram, userId });
    await postToLinkedIn({ caption: formattedPosts.linkedin, userId });
    await postToX({ caption: formattedPosts.twitter, userId });

    await notifyUser(userId, `📡 Post reposted successfully across platforms.`);

    return `✅ Reposted successfully to Facebook, Instagram, LinkedIn & X with platform-optimized formatting.`;
  } catch (err) {
    console.error("❌ Repost Error:", err.message);
    return "❌ Failed to repost content across platforms.";
  }
}

module.exports = { repostEverywhere };
