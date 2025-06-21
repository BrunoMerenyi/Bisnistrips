import { useState, useEffect } from "react";
import React from "react";
import { useParams } from "react-router";
import Footer from "./Footer";
import Header from "./Header";

function Trip() {
  let { id } = useParams();
  const [trips, setTrips] = useState([]);

  const getTrips = async () => {
    // 1) Base64-encode your username:password
    const creds = btoa("demoUser:secret123");

    // 2) Call the protected endpoint with the Authorization header
    const response = await fetch(`http://localhost:8080/v1/trips/${id}`, {
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
            <p className="text-lg font-semibold hover:underline">{t.title}</p>
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
                  style={{ marginRight: "50px" }}
              >
                Add to Triplist
              </button>
              <button
                  type="button"
                  disabled
                  className="px-4 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed"
                  style={{ marginLeft: "50px" }}
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
        <Header/>
        <section id="products">{renderTrip(trips)}</section>
        <Footer/>
      </>
  );
}

export default Trip;
