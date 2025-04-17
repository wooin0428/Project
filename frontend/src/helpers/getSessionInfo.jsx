export async function getSessionInfo() {
    const res = await fetch("/api/sessionInfo");
    if (!res.ok) throw new Error("Failed to get session info");
    return await res.json(); // { username, usergroup }
  }
  