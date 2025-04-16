// helpers/getUserGroup.js
export const getAllUserGroups = async () => {
    try {
      const response = await fetch("/api/getAllUserGroups", {
        method: "GET",
        credentials: "include", // if using sessions
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch user groups");
      }
  
      const data = await response.json();
  
      // Expecting data like: ["admin", "cleaner", "manager"]
      if (Array.isArray(data)) {
        return data;
      } else {
        console.error("Expected an array of strings, got:", data);
        return [];
      }
    } catch (error) {
      console.error("Error fetching user groups:", error);
      return [];
    }
  };
  