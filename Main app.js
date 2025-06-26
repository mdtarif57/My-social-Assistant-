// === [main_app.js] === // 🚀 ULCS Hybrid AI Master Controller (Advanced Fusion Version) // 🔮 ChatGPT-Free | Offline/Online | Dynamic Core with Full Feature Set // 📦 Version: V3.0 | Developer: AI Architect

const path = require("path"); const fs = require("fs"); const skillRegistry = require("./skill_builder/skill_registry"); const { detectLanguage, translateText } = require("./ai_extensions/multi_lang_parser"); const { extractIntent, extractSubTasks } = require("./ai_extensions/intent_extractor"); const { logActivity } = require("./logger/activity_logger"); const webTool = require("./tools/web_agent"); const memory = require("./ai_extensions/memory"); const dashboard = require("./ui/cli_web_dashboard"); const localModel = require("./ai_extensions/local_model"); const emotionDetector = require("./ai_extensions/emotion_analyzer"); const scheduler = require("./tools/scheduler_reminder");

// 🔐 Optional: Secure Account/Session Handler const { authenticateUser } = require("./auth/session_handler");

// 🔍 Load skill module safely function loadSkillModule(skillKey) {   const skillPath = skillRegistry[skillKey];   if (!skillPath) throw new Error(Skill "${skillKey}" not found.);   return require(path.resolve(skillPath)); }

function findMatchingSkill(intent) {   const normalized = intent.toLowerCase().replace(/\s+/g, "_");   for (const key of Object.keys(skillRegistry)) {     if (key.toLowerCase().includes(normalized)) return key;   }   return null; }

// 🌐 ChatGPT-Free Local Code Generator + Summarizer + Processor async function handleLocally(text) {   if (text.length > 800) return await localModel.summarize(text);   return await localModel.process(text); }

// 🌍 Web + Local Hybrid Research System async function webResearch(query) {   const results = await webTool.search(query);   const summary = await localModel.summarize(results.map(r => r.snippet).join("\n"));   return summary || "❌ No data found."; }

// 🔔 Notification + Suggestion Based on Usage Data async function autoSuggestAndNotify(userId, input) {   const intent = await extractIntent(input);   const stats = await dashboard.analyzeSkillUsage(userId, intent);   if (stats?.notify) {     return 🔔 Suggestion: You've used "${intent}" often. Want to automate it?;   }   return ""; }

// 🧠 Main Command Handler async function handleUserCommand(rawInput, userId = "default_user") {   try {     const userLang = await detectLanguage(rawInput);     const translated = await translateText(rawInput, "en");     const emotion = await emotionDetector.analyze(rawInput);     const memoryTip = await memory.recallContext(userId, translated);

    // 🔁 Task Split     const subTasks = await extractSubTasks(translated);     if (!subTasks || subTasks.length === 0) {       const intent = await extractIntent(translated);       if (intent.includes("web research")) return await webResearch(translated);       if (intent.includes("summarize")) return await localModel.summarize(translated);       if (intent.includes("schedule")) return await scheduler.schedule(rawInput, userId);

      const skillKey = findMatchingSkill(intent);       if (!skillKey) return await handleLocally(translated);

      const skillModule = loadSkillModule(skillKey);       const result = await skillModule.executeSkill(translated, userId);

      await logActivity({ userId, intent, skillKey, userLang, emotion, timestamp: new Date().toISOString() });       const autoTip = await autoSuggestAndNotify(userId, translated);       return ${result}\n\n🧠 Context: ${memoryTip}\n${autoTip};     }

    // ⛓️ Multi-Task Handler     const results = [];     for (const taskText of subTasks) {       const intent = await extractIntent(taskText);       const skillKey = findMatchingSkill(intent);       if (!skillKey) {         results.push(await handleLocally(taskText));         continue;       }       const skillModule = loadSkillModule(skillKey);       const res = await skillModule.executeSkill(taskText, userId);       results.push(✅ [${intent}]: ${res});     }

    await logActivity({ userId, rawInput, subTasks, hybrid: true, tool: "main_app", timestamp: new Date().toISOString() });     return results.join("\n\n");   } catch (err) {     return ❌ Error: ${err.message};   } }

module.exports = { handleUserCommand };

