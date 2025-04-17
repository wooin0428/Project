export const getUsername = async () => {
    try {
      const response = await fetch("/api/getUsername", {
        credentials: "include",
      });
  
      if (!response.ok) throw new Error("Not authorised");
  
      const data = await response.json();
      return data.username;
    } catch (error) {
      console.error("Failed to get username:", error);
      return "Unknown";
    }
  };
  