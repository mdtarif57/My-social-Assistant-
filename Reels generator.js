// === [ai_facebook_reel_generator.js] ===
// 🌀 Multilingual + Emotion-Aware Facebook Post & Reel Creator (V5.1)
// 🧠 Powered by: ULCS AI + Tone Engine + Auto Video Composer

const { detectLanguage, translateText } = require("./ai_extensions/multi_lang_parser");
const { analyzeEmotion } = require("./utils/emotion_engine");
const { generateVoice } = require("./ai_extensions/voice_generator");
const { generateSceneFrames } = require("./ai_extensions/scene_imager");
const { createVideoFromScenes } = require("./utils/video_compiler");
const { postToFacebook } = require("./ulcs_social_api_connector");
const { notifyUser } = require("./utils/mobile_comm_api");

// 📌 Main Entry Point
async function createFacebookPostOrReel(userInput, userId = "default_user", mode = "reel") {
  try {
    console.log("🌀 Starting AI Facebook Content Creation...");

    // Step 1: Language Detection + Translate to English
    const lang = await detectLanguage(userInput);
    const inputEn = await translateText(userInput, "en");

    // Step 2: Analyze Emotion
    const emotion = await analyzeEmotion(inputEn);

    // Step 3: Caption Creation
    const caption = generateSmartCaption(inputEn, emotion);

    // Step 4: Reel Mode → Generate AI Video
    let videoPath = null;
    if (mode === "reel") {
      const scenes = splitIntoScenes(inputEn);
      const frames = [];

      for (let scene of scenes) {
        const img = await generateSceneFrames(scene, "facebook-style", emotion);
        frames.push(img);
      }

      const voice = await generateVoice(inputEn, emotion.voiceStyle || "confident");
      videoPath = await createVideoFromScenes(frames, voice, userId);
    }

    // Step 5: Post to Facebook
    const result = await postToFacebook({
      caption,
      video: videoPath,
      userId
    });

    await notifyUser(userId, `📢 Facebook content posted successfully.`);

    return `✅ Posted to Facebook with caption:\n${caption}`;
  } catch (err) {
    console.error("❌ Facebook Post/Reel Error:", err.message);
    return "❌ Failed to create or post content.";
  }
}

// 🧠 Smart Caption Generator (tone-based)
function generateSmartCaption(text, emotion) {
  const emojis = {
    happy: "😄🌟",
    sad: "😢🕊️",
    excited: "🔥🚀",
    confident: "💪✨",
    romantic: "❤️🌹",
    motivational: "💡🏆"
  };

  const base = text.length > 150 ? text.slice(0, 147) + "..." : text;
  return `${base} ${emojis[emotion.tone] || "✨"}`;
}

// 🧩 Scene splitter
function splitIntoScenes(script) {
  return script
    .split(/[.?!]/)
    .map(s => s.trim())
    .filter(Boolean);
}

module.exports = { createFacebookPostOrReel };
