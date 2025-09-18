// src/services/spacexApi.js
export async function fetchCapsules() {
  const res = await fetch("https://api.spacexdata.com/v4/capsules");
  if (!res.ok) throw new Error(`Capsules fetch failed: ${res.status}`);
  return res.json();
}

export async function fetchRockets() {
  const res = await fetch("https://api.spacexdata.com/v4/rockets");
  if (!res.ok) throw new Error(`Rockets fetch failed: ${res.status}`);
  return res.json();
}
