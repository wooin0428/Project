export async function registerUser(form) {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return { success: true, message: "Account created successfully!" };
      } else {
        return { success: false, message: data.error || "Failed to create account." };
      }
    } catch (err) {
      console.error(err);
      return { success: false, message: "Error creating account." };
    }
  }
  