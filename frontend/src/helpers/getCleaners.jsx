// Get all cleaners
export const getCleaners = async () => {
  try {
    const res = await fetch("/api/cleaners", {
      credentials: "include",  // Include cookies (session info)
    });

    if (!res.ok) {
      throw new Error("Unauthorized or Server Error");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching cleaners:", err);
    throw err;  // Rethrow to be caught in the calling component
  }
};

  
// Get a single cleaner's details by cleaner_id
export const getCleanerById = async (cleanerId) => {
const res = await fetch(`/api/cleaners/${cleanerId}`, {
    credentials: "include",
});
const data = await res.json();
return data;
};

// search for cleaner by name
export async function getCleaners(search = "") {
  const res = await fetch(`/api/cleaners?search=${encodeURIComponent(search)}`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch cleaners");

  return await res.json();
}

  