// === [index_v4.js] === // 🚀 ULCS Intelligent Entry Point with Multi-Language Command, Emotion-Aware CLI, Voice Output, and Typewriter Animation // 🧠 Version: v4.0 | Designed for: Super Futuristic AI Launcher (CLI or Web)

const readline = require("readline"); const { detectLanguage, translateText } = require("./ai_extensions/multi_lang_parser"); const { analyzeEmotion } = require("./ai_extensions/emotion_analyzer"); const { speakText } = require("./utils/voice_output"); const { typeWriter } = require("./utils/typing_animator"); const notifier = require("node-notifier"); const { handleUserCommand } = require("./main_app");

console.clear(); console.log("🌐 Welcome to ULCS AI Assistant v4.0\nType your command in any language (Bangla, English, Mixed)...\n");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, });

async function handleInput(inputText) { try { const lang = await detectLanguage(inputText); const translatedInput = await translateText(inputText, "en"); const emotion = await analyzeEmotion(translatedInput);

// Notify system
notifier.notify({
  title: "ULCS AI Running",
  message: `Detected Emotion: ${emotion} | Language: ${lang}`,
});

// AI Response
const result = await handleUserCommand(inputText);

// Typewriter Output
await typeWriter(result);

// Optional: Voice Output
await speakText(result);

} catch (err) { console.error("❌ Error:", err.message || err); } }

function askInput() { rl.question("🧠 Your Command ➤ ", async (input) => { if (input.toLowerCase() === "exit") { console.log("👋 Exiting ULCS Assistant. See you soon!"); rl.close(); return; } await handleInput(input); askInput(); }); }

askInput();

