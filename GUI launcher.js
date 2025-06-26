// === [gui_launcher.js] === // 🎨 ULCS Hybrid GUI Launcher | Real-time AI Interface // 🧠 Version: GUI Fusion V1.0 | Author: AI Architect

const path = require("path"); const express = require("express"); const open = require("open"); const app = express();

const PORT = process.env.PORT || 4321;

app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {   res.sendFile(path.join(__dirname, "gui_renderer.html")); });

app.listen(PORT, () => {   console.log(🚀 [GUI] Interface running at http://localhost:${PORT});   open(http://localhost:${PORT}); });
