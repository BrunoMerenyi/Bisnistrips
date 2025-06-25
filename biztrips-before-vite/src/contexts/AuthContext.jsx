import React, { createContext, useState, useEffect } from "react";
// Context with default values
export const AuthContext = createContext({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchCurrentUser() {
    const res = await fetch("/api/auth/me", {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Could not fetch current user");
    return res.json(); // { id: 123, username: 'bruno' }
  }

  async function apiLogout() {
    const res = await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });

    if (res.ok) {
      window.location.href = "/trips";
    }
    return res;
  }

  useEffect(() => {
    // On mount, fetch current user
    fetchCurrentUser()
      .then((u) => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = (userDto) => {
    setUser(userDto);
  };

  const logout = async () => {
    try {
      await apiLogout();
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
