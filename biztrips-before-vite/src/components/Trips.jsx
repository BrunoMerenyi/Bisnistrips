import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { motion, AnimatePresence } from "framer-motion";
import { addMyTrip } from "../api";
export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [user, setUser] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  async function fetchCurrentUser() {
    const res = await fetch("/api/auth/me", {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Could not fetch current user");
    return res.json(); // { id: 123, username: 'bruno' }
  }

  async function searchTrips(query) {
    const res = await fetch(
      `http://localhost:8080/api/trips/search?query=${query}`,
      {
        // <-- via Vite proxy `/api` → Spring
        method: "GET",
        credentials: "include",
      }
    );

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error("Unauthorized – please log in first");
      }
      const errText = await res.text();
      throw new Error(`Failed to fetch trips (${res.status}): ${errText}`);
    }

    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      setTrips(await res.json());
    } else {
      const text = await res.text();
      throw new Error(`Expected JSON but got:\n${text}`);
    }
  }

  async function getTrips(id) {
    const res = await fetch(`/api/trips`, {
      // <-- via Vite proxy `/api` → Spring
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error("Unauthorized – please log in first");
      }
      const errText = await res.text();
      throw new Error(`Failed to fetch trips (${res.status}): ${errText}`);
    }

    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      setTrips(await res.json());
    } else {
      const text = await res.text();
      throw new Error(`Expected JSON but got:\n${text}`);
    }
  }

  function addToTripList(trip) {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
    addMyTrip(trip.id)
      .then(() => {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
        // Show notification
      })
      .catch((err) => {
        console.error("Failed to add trip to list:", err);
        alert("Failed to add trip to list. Please try again.");
      });
  }

  useEffect(() => {
    console.log("useEffect");
    getTrips();
  }, []);
  useEffect(() => {
    getTrips();
  }, []);
  function renderTrip(t) {
    return (
      <div
        className="flex flex-col justify-center items-center p-4 border rounded-lg shadow-md max-w-[1440px] w-full"
        key={t.id}
      >
        <figure className="text-center w-full max-w-sm">
          <div className="mb-4">
            <img
              className="w-full h-48 object-cover rounded"
              src={"/images/items/" + t.id + ".jpg"}
              alt="name "
            />
          </div>
          <figcaption className="space-y-2">
            <a
              href={`/trips/${t.id}`}
              className="text-lg font-semibold hover:underline"
            >
              {t.title}
            </a>
            <div>
              <span>
                {t.startTrip && t.startTrip.length >= 3
                  ? t.startTrip[2] + "-" + t.startTrip[1] + "-" + t.startTrip[0]
                  : ""}
              </span>
              <p> {t.price} CHF</p>
            </div>
            <p className="text-sm text-gray-700">{t.description}</p>
            <div>
              <button
                type="button"
                onClick={() => addToTripList(t)} // ⬅️  Trip ins localStorage legen
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add to TripList
              </button>
              <button
                type="button"
                disabled
                className="px-4 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed"
                style={{ marginLeft: "50px" }}
              >
                <a href={`/Checkout`}>Checkout</a>
              </button>
            </div>
          </figcaption>
        </figure>
      </div>
    );
  }

  return (
    <>
      {" "}
      <Header />
      <div className="flex justify-center">
        <main className="w-full max-w-[1440px] flex flex-col justify-center p-5">
          <input
            id="SearchBar"
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
            onChange={(e) => searchTrips(e.target.value)}
          />
          <section
            id="products"
            className="grid lg:grid-cols-3 grid-cols-1 w-full gap-5"
          >
            {trips.map(renderTrip)}
          </section>
        </main>
      </div>
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.3 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-5 right-5 left-5 max-w-[200px] bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            ✅ Trip added to your list!
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </>
  );
}
