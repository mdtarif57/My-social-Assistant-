// === [video_generator.js] ===
// 🎬 AI-Powered Video Generator Module | Super Futuristic v3.0
// 🧠 Generates video from text, images, or custom scripts
// 🔊 Auto voiceover, emotion-matched tone, subtitles, platform resolution, export-ready

const fs = require("fs");
const path = require("path");
const { generateScriptFromGoal } = require("./utils/script_ai_helper");
const { synthesizeVoice } = require("./utils/voiceover_engine");
const { renderVideoFromScript } = require("./utils/video_render_engine");
const { convertImageToScene } = require("./utils/image_to_scene_ai");
const { autoCaption } = require("./utils/caption_generator");
const { notifyUser } = require("./utils/mobile_comm_api");

// 🎯 Main Video Generator
async function generateAIEnhancedVideo({ 
  goal = "", 
  sourceType = "text", 
  input = "", 
  userId = "default_user", 
  platform = "facebook"
}) {
  try {
    console.log(`🎥 Generating video for goal: ${goal} | Platform: ${platform}`);

    let script = "";

    // Step 1: Script generation
    if (sourceType === "text") {
      script = await generateScriptFromGoal(goal, platform);
    } else if (sourceType === "image") {
      script = await convertImageToScene(input);
    } else if (sourceType === "script") {
      script = input;
    } else {
      throw new Error("Unsupported source type.");
    }

    // Step 2: Voice synthesis (emotion-matched)
    const voiceTrack = await synthesizeVoice(script);

    // Step 3: Render video
    const videoPath = await renderVideoFromScript(script, voiceTrack, platform);

    // Step 4: Generate subtitles
    await autoCaption(videoPath);

    // Step 5: Notify user
    await notifyUser(userId, `✅ Video generated successfully for platform: ${platform}`);

    return `📽️ Video ready at: ${videoPath}`;
  } catch (err) {
    console.error("❌ [VideoGen Error]:", err.message || err);
    return "⚠️ Failed to generate video.";
  }
}

module.exports = { generateAIEnhancedVideo };
