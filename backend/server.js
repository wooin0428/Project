import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { neon } from "@neondatabase/serverless";
import session from "express-session";
import crypto from "crypto";

// Global in-memory store
const activeSessions = new Map();

// session class
class UserSession {
  constructor(sessionID, username, usergroup) {
    this.sessionID = sessionID;
    this.username = username;
    this.usergroup = usergroup;
  }

  getData() {
    return {
      username: this.username,
      usergroup: this.usergroup,
    };
  }

  destroy() {
    this.username = null;
    this.usergroup = null;
    this.sessionID = null;
  }
}




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
    secret: 'ultra-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true }, // Use `secure: true` for HTTPS
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
    
    // Create a new UserSession object for the user and store it in activeSessions
    const userSession = new UserSession(req.session.id, username, result[0].usergroup);
    activeSessions.set(req.session.id, userSession);

    res.json({ message: "Logged in!" });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});



// check sessions
app.get("/api/session", (req, res) => {
  if (!req.session || !req.session.user || !req.session.id) {
    return res.status(401).json({ error: "Not logged in" });
  }

  // Retrieve the correct UserSession object for the logged-in user
  const sessionObj = activeSessions.get(req.session.id);
  
  if (!sessionObj) {
    return res.status(404).json({ error: "Session not found" });
  }

  res.json(sessionObj.getData());  // Send username and usergroup info
});




// 🧼 Logout Route
app.post("/api/logout", (req, res) => {
  if (!req.session || !req.session.id) {
    return res.status(400).json({ error: "No active session" });
  }

  // Remove the session from activeSessions map
  activeSessions.delete(req.session.id);

  req.session.destroy(() => {
    res.json({ message: "Logged out!" });
  });
});





// 👤  get user group from logged in user
app.get("/api/getUserGroup", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const username = req.session.user.username;

  try {
    const result = await sql`
      SELECT usergroup FROM useraccounts WHERE username = ${username}
    `;
    if (result.length > 0) {
      res.json({ usergroup: result[0].usergroup });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});




// 👥 Get all user group names (requires login)
app.get("/api/getAllUserGroups", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  try {
    const result = await sql`
      SELECT group_name FROM usergroups
    `;

    const groupNames = result.map(row => row.group_name);

    res.json(groupNames); // Example: ["admin", "manager", "cleaner"]
  } catch (err) {
    console.error("Failed to fetch user groups:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});


// 👤 Get username from session
app.get("/api/getUsername", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  // Just return the username from the session
  res.json({ username: req.session.user.username });
});


// get cleaner info
app.get("/api/cleaners", async (req, res) => {
  // ✅ Check if user is logged in
  if (!req.session || !req.session.user || !req.session.id) {
    return res.status(401).json({ error: "Not logged in" });
  }

  try {
    const result = await sql`
      SELECT cleaner_id, cleanername FROM cleaner ORDER BY cleanername
    `;

    res.json(result);
  } catch (err) {
    console.error("Error fetching cleaners:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a single cleaner's full details by cleaner_id and increment profile view count
app.get("/api/cleaners/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // First, increment the profileviewcount
    await sql`
      UPDATE cleaner
      SET profileviewcount = profileviewcount + 1
      WHERE cleaner_id = ${id}
    `;

    // Then, fetch the updated cleaner data
    const result = await sql`
      SELECT cleaner_id, cleanername, shortlistcount, experience, nationality, profileviewcount
      FROM cleaner
      WHERE cleaner_id = ${id}
    `;

    if (result.length === 0) {
      return res.status(404).json({ error: "Cleaner not found" });
    }

    res.json(result[0]);
  } catch (err) {
    console.error("Error fetching cleaner details:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});








// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend", "dist")));
app.get("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
