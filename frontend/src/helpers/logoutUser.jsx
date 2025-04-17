export async function logoutUser(navigate) {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
  
      if (res.ok) {
        localStorage.removeItem("userSession");
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Error during logout:", err);
    }
  }
  