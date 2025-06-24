export async function fetchMyTrips() {
  const res = await fetch("/api/user/trips", { credentials: "include" });
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

export async function addMyTrip(tripId) {
  const res = await fetch(`/api/user/trips/${tripId}`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

export async function removeMyTrip(tripId) {
  const res = await fetch(`/api/user/trips/${tripId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}
