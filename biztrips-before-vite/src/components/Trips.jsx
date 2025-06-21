import React, { useEffect, useState } from "react";

import Footer from "./Footer";
import Header from "./Header";
export default function Trips() {
  const creds = btoa("demoUser:secret123");

  const [trips, setTrips] = useState([]);

  const searchTrips = async (query) => {
    const response = await fetch(
      `http://localhost:8080/v1/trips/search?query=${query}`,
      {
        headers: {
          Authorization: `Basic ${creds}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      console.error("Failed to fetch trips:", response.statusText);
      return;
    }
    const data = await response.json();
    console.log(data);
    setTrips(data);
  };
  const getTrips = async () => {
    // 1) Base64-encode your username:password

    // 2) Call the protected endpoint with the Authorization header
    const response = await fetch(`http://localhost:8080/v1/trips`, {
      headers: {
        Authorization: `Basic ${creds}`,
        "Content-Type": "application/json",
      },
    });

    // 3) Handle errors (401, network, etc)
    if (!response.ok) {
      console.error(`Error fetching trips (${response.status})`);
      // optionally show a user-friendly message or redirect to login
      return;
    }

    // 4) Parse JSON and update state
    const data = await response.json();
    console.log("Trips:", data);
    setTrips(data);
  };

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
        className="flex flex-col justify-center items-center p-4 border rounded-lg shadow-md"
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
                  disabled
                  className="px-4 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed"
              >
                Add to Triplist
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
      <>
        <div className="">
          <Header/>
          <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
              onChange={(e) => searchTrips(e.target.value)}
        />
        <main className="w-full max-w-[1440px] p-5">
          <section id="filters">
            <label htmlFor="month">Filter by Month:</label>
            <select id="size">
              <option value="">All months</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
            </select>
          </section>
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
