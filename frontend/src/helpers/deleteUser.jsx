export const deleteUserById = async (userId) => {
    try {
      const res = await fetch(`/api/deleteUser/${userId}`, {
        method: "DELETE",
      });
  
      if (!res.ok) {
        throw new Error("Failed to delete user");
      }
  
      return true; // success
    } catch (err) {
      console.error("Error deleting user:", err);
      return false;
    }
  };
  