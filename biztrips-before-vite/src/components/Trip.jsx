import { useState, useEffect } from "react";
import React from "react";
import { useParams } from "react-router";
import Footer from "../Footer";
import Header from "../Header";

function Trip() {
  let { id } = useParams();
  const [trips, setTrips] = useState([]);

  const getTrips = async () => {
    const response = await fetch(`http://localhost:8080/v1/trips/${id}`);
    const data = await response.json();
    console.log(data);
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
              >
                Add to Triplist
              </button>
            </div>
          </figcaption>
        </figure>
      </div>
    );
  }
  return (
    <>
      <Header />
      <section id="products">{renderTrip(trips)}</section>
      <Footer />
    </>
  );
}

export default Trip;
