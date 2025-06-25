import React, { useEffect, useState } from "react";
import "./App.css";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

import Header from "./components/Header";

export default function App() {
  const { user, loading, logout } = useContext(AuthContext);
  const [trips, setTrips] = useState([]);
  const [userT, setUser] = useState(null);

  async function fetchCurrentUser() {
    const res = await fetch("/api/auth/me", {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Could not fetch current user");
    return res.json(); // { id: 123, username: 'bruno' }
  }
  if (!user) {
    window.location.href = "/trips";
  } else {
    window.location.href = "/trips";
  }

  if (loading) {
    return null;
  }

  const Fetch = async () => {
    try {
      const { id: userId, username } = await fetchCurrentUser();
      // store userId in context or state
      console.log("Current user:", userId, username);
      setUser({ id: userId, username });
    } catch {
      // not logged in
    }
  };
  return (
    <>
      <div className="">
        <Header />
        <button onClick={Fetch}> cLICK ME</button>
        <main className="w-full max-w-[1440px] p-5">test</main>
      </div>
    </>
  );
}
