// === [script.js] ===
// 🚀 ULCS Web AI Assistant | Version: v5.0 Super Futuristic
// 💡 Multi-Language Command + Emotion Detection + AI Voice Support + Typewriter Animation

const inputField = document.getElementById("userInput");
const outputBox = document.getElementById("output");
const runBtn = document.querySelector("button[onclick='sendCommand()']");
const clearBtn = document.querySelector("button[onclick='clearOutput()']");
const voiceBtn = document.querySelector("button[onclick='startVoice()']");

// 🎤 Voice Recognition Setup (Web Speech API)
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;
if (recognition) {
  recognition.lang = "bn-BD";
  recognition.continuous = false;
  recognition.interimResults = false;
}

// 🖋️ Typing Animation
function typeWriter(text, speed = 35) {
  outputBox.innerHTML = "";
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      outputBox.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(interval);
    }
  }, speed);
}

// 🧠 Simulated AI Processor
async function processCommand(inputText) {
  const detectedLang = /[অ-ঔ]/.test(inputText) ? "Bangla" : "English";
  const emotion = inputText.includes("🥲") ? "Sad" : "Neutral";
  
  await new Promise((res) => setTimeout(res, 1000));

  return `🌐 Language: ${detectedLang}\n💓 Emotion: ${emotion}\n🤖 Response: "${inputText}" বিশ্লেষণ করা হয়েছে। AI এখন কাজ শুরু করবে!`;
}

// 🚀 Main Submit Handler
async function sendCommand() {
  const userText = inputField.value.trim();
  if (!userText) return;

  runBtn.disabled = true;
  typeWriter("⏳ Processing...");

  const aiResponse = await processCommand(userText);
  typeWriter(aiResponse);

  runBtn.disabled = false;
  inputField.value = "";
}

// 🎤 Start Voice Command
function startVoice() {
  if (!recognition) {
    alert("🎙️ Voice recognition not supported.");
    return;
  }
  recognition.start();
  outputBox.innerHTML = "🎧 Listening...";
}

// 🎤 Handle Voice Result
if (recognition) {
  recognition.onresult = async (event) => {
    const voiceText = event.results[0][0].transcript;
    inputField.value = voiceText;
    await sendCommand();
  };
}

// 🧹 Clear Output
function clearOutput() {
  outputBox.innerHTML = "";
}
