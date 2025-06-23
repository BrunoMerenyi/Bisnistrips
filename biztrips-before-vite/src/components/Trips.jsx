import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
export default function Trips() {
  const [trips, setTrips] = useState([]);

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
    const current = JSON.parse(localStorage.getItem("tripList") || "[]");

    if (current.some((t) => t.id === trip.id)) return;

    localStorage.setItem("tripList", JSON.stringify([...current, trip]));
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
            </div>
            <p className="text-sm text-gray-700">{t.description}</p>
            <div>
              <button
                  type="button"
                  onClick={() => addToTripList(t)}   // ⬅️  Trip ins localStorage legen
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add to TripList
              </button>
              <button
                  type="button"
                  disabled
                  className="px-4 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed"
                  style={{marginLeft: "50px"}}
              >
                <a
                    href={`/Checkout`}
                >
                  Checkout
                </a>
              </button>
            </div>
          </figcaption>
        </figure>
      </div>
    );
  }

  return (
      <>          <Header/>

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
      <Footer />
    </>
  );
}
