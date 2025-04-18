export async function getCleanerServicesById(cleanerId) {
    const res = await fetch(`/api/cleaners/${cleanerId}/services`);
    if (!res.ok) throw new Error("Failed to fetch services");
  
    const data = await res.json();
    return data.services;
  }
  