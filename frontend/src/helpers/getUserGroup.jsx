export const getUserGroup = async () => {
  try {
    const res = await fetch("/api/getUserGroup");
    const data = await res.json();

    // ✅ If the server returns { groups: [...] }
    return data.groups;

    // ❌ Don't return the whole object unless you're handling it in useCreateAccForm
  } catch (err) {
    console.error("Failed to fetch user groups", err);
    return []; // fallback to empty array
  }
};
