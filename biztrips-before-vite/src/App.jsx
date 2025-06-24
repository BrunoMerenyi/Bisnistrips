import React, { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function App() {
  const [trips, setTrips] = useState([]);
  const [user, setUser] = useState(null);

  async function fetchCurrentUser() {
    const res = await fetch("/api/auth/me", {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Could not fetch current user");
    return res.json(); // { id: 123, username: 'bruno' }
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
      <Footer />
    </>
  );
}
