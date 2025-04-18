export async function shortlistCleaner(cleaner_id) {
    try {
      const res = await fetch("/api/shortlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ cleaner_id }),
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Shortlist failed");
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
  