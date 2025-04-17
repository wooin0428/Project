// Get all cleaners
export const getCleaners = async (search = "") => {
  try {
    const url = search
      ? `/api/cleaners?search=${encodeURIComponent(search)}`
      : "/api/cleaners";

    const res = await fetch(url, {
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch cleaners");
    }

    return await res.json();
  } catch (err) {
    console.error("Error fetching cleaners:", err);
    throw err;
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