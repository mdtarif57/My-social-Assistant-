// === [ulcs_ai_story_slide_maker.js] ===
// 📖 AI Social Storyteller + Visual Slide Generator
// 🧠 Emotion-Aware, Platform-Tuned & Fully Modular

const { analyzeEmotion } = require("./utils/emotion_engine");
const { detectLanguage, translateText } = require("./ai_extensions/multi_lang_parser");
const { generateSlideDesigns } = require("./ai_extensions/visual_slide_generator");
const { notifyUser } = require("./utils/mobile_comm_api");
const fs = require("fs");
const path = require("path");

// 📖 Story + Slide Generator Core
async function createStorySlides(topicText, userId = "default_user") {
  try {
    console.log("📖 Generating story and slides...");

    // Step 1: Detect & translate
    const lang = await detectLanguage(topicText);
    const textEn = await translateText(topicText, "en");

    // Step 2: Emotion detection to personalize storytelling
    const tone = await analyzeEmotion(textEn);

    // Step 3: Generate structured story outline
    const story = generateStructuredStory(textEn, tone);

    // Step 4: Generate visual slides layout
    const slides = generateSlideDesigns(story, tone);

    // Step 5: Save story & slides as JSON or exportable structure
    const exportPath = path.join("exports", `story_slides_${Date.now()}.json`);
    fs.writeFileSync(exportPath, JSON.stringify({ story, slides }, null, 2));

    // Step 6: Notify user
    await notifyUser(userId, `🎬 Story + Slides generated. File: ${exportPath}`);

    return `✅ Story & slides ready! Path: ${exportPath}`;
  } catch (err) {
    console.error("❌ Slide generation error:", err.message);
    return "❌ Failed to generate story slides.";
  }
}

// 🧠 Sample story structure generator (mock)
function generateStructuredStory(topic, tone) {
  return {
    title: `The Journey of ${topic}`,
    tone,
    slides: [
      { heading: "Intro", content: `Meet the world of ${topic}...` },
      { heading: "Challenge", content: `Why ${topic} matters today?` },
      { heading: "Solution", content: `How we tackle ${topic} with purpose.` },
      { heading: "Inspire", content: `Let’s shape the future of ${topic}!` },
    ],
  };
}

module.exports = { createStorySlides };
