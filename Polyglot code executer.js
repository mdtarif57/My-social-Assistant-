// === [polyglot_code_executor.js] ===
// 🔁 Dynamic Polyglot Code Generator & Executor for ULCS AI Main System
// 🧠 Version: AI Fusion Core V5.0 | Author: GPT System Architect

const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { detectLanguage, translateText } = require("./ai_extensions/multi_lang_parser");
const { extractIntent } = require("./ai_extensions/intent_extractor");
const { callLocalModel } = require("./localModel");
const { notifyUser } = require("./utils/mobile_comm_api");

const extensions = {
  python: ".py",
  javascript: ".js",
  java: ".java",
  shell: ".sh",
  cpp: ".cpp",
  go: ".go",
};

const commands = {
  python: (file) => `python3 ${file}`,
  javascript: (file) => `node ${file}`,
  java: (file) => `javac ${file} && java ${file.replace(".java", "")}`,
  shell: (file) => `bash ${file}`,
  cpp: (file) => `g++ ${file} -o temp && ./temp`,
  go: (file) => `go run ${file}`,
};

async function generateAndExecutePolyglotCode(userCommand, userId = "default_user") {
  try {
    const lang = await detectLanguage(userCommand);
    const translated = await translateText(userCommand, "en");
    const intent = await extractIntent(translated);

    const language = intent.includes("python") ? "python" :
                     intent.includes("javascript") ? "javascript" :
                     intent.includes("java") ? "java" :
                     intent.includes("bash") || intent.includes("shell") ? "shell" :
                     intent.includes("cpp") ? "cpp" :
                     intent.includes("go") ? "go" : "javascript";

    const extension = extensions[language];
    const fileName = `poly_${intent.replace(/\s+/g, "_")}${extension}`;
    const filePath = path.join("skills", fileName);

    const aiPrompt = `Write a working ${language} code for: "${intent}". Must be executable.`;
    const code = await callLocalModel(aiPrompt); // OpenAI not needed

    fs.writeFileSync(filePath, code, "utf8");

    const execCmd = commands[language](filePath);

    notifyUser(userId, `🚀 Code generated in ${language}. Running now...`);

    exec(execCmd, (err, stdout, stderr) => {
      if (err) {
        console.error(`❌ Error: ${err.message}`);
        return;
      }
      console.log(`📤 Output:\n${stdout}`);
    });

  } catch (err) {
    console.error("❌ [PolyglotExecutor Error]:", err.message);
  }
}

module.exports = { generateAndExecutePolyglotCode };
