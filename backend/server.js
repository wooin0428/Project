import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Setup Express server
const app = express();
const PORT = process.env.PORT || 8080;

// ES Modules syntax for __filename and __dirname in Node
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static assets from the frontend build folder
// This assumes the React app has been built (npm run build)
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// Handle API routes or any other server-side logic
app.get("/api/*name", (req, res) => {
  res.json({ message: "this route works" });
});

// Serve the React app for any route that doesn't match an API route
app.get("*something", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
