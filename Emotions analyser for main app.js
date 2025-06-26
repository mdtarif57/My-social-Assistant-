// === [emotion_analyzer.js] ===
// 🧠 Emotion Detection for Prompt Sensitivity

function analyzeEmotion(text) {
  const lowered = text.toLowerCase();

  if (lowered.includes("angry") || lowered.includes("hate") || lowered.includes("annoy")) {
    return "anger";
  } else if (lowered.includes("sad") || lowered.includes("depressed") || lowered.includes("cry")) {
    return "sadness";
  } else if (lowered.includes("happy") || lowered.includes("excited") || lowered.includes("yay")) {
    return "joy";
  } else if (lowered.includes("scared") || lowered.includes("fear") || lowered.includes("anxious")) {
    return "fear";
  }

  return "neutral";
}

module.exports = { analyzeEmotion };
