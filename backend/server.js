import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { neon } from "@neondatabase/serverless";
import session from "express-session";
import crypto from "crypto";

const app = express();
const PORT = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sql = neon(process.env.DATABASE_URL);

// Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use express-session
app.use(
  session({
    secret: "a_very_secret_key", // Change this for production
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // http only ?
  })
);

// Utility function for SHA256 hash
function hashPassword(password) {
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  return hash.slice(0, 40); // truncate to 40 chars
}

// 🚪 Register
app.post("/api/register", async (req, res) => {
  const { username, emailadd, password, phone_number, homeadd, usergroup } = req.body;
  const hashed = hashPassword(password);
  try {
    await sql`
      INSERT INTO useraccounts 
        (username, emailadd, password, phone_number, homeadd, usergroup)
      VALUES 
        (${username}, ${emailadd}, ${hashed}, ${phone_number}, ${homeadd}, ${usergroup})
    `;
    res.json({ message: "Registered!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to register" });
  }
});


// 🔑 Login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const hashed = hashPassword(password);
  const result = await sql`SELECT * FROM useraccounts WHERE username = ${username} AND password = ${hashed}`;
  if (result.length > 0) {
    req.session.user = { username };
    res.json({ message: "Logged in!" });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});


// check sessions
app.get("/api/session", (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});



// 🧼 Logout
app.post("/api/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out!" });
  });
});






// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend", "dist")));
app.get("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
