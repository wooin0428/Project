export async function loginUser({ username, password }) {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
  
      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
  