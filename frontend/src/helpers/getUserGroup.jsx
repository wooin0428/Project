export const getUserGroup = async () => {
    try {
      const response = await fetch("/api/getUserGroup", {
        credentials: "include",
      });
  
      if (!response.ok) throw new Error("Not authorised");
  
      const data = await response.json();
      return data.usergroup;
    } catch (error) {
      console.error("Failed to get user group:", error);
      return "Unknown";
    }
  };
  