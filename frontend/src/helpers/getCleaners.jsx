// Get all cleaners
export const getCleaners = async () => {
    const res = await fetch("/api/cleaners", {
      credentials: "include",
    });
    const data = await res.json();
    return data;
  };
  
  // Get a single cleaner's details by cleaner_id
  export const getCleanerById = async (cleanerId) => {
    const res = await fetch(`/api/cleaners/${cleanerId}`, {
      credentials: "include",
    });
    const data = await res.json();
    return data;
  };
  