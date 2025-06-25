import { useState, useEffect } from "react";
import React from "react";
import { useParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "./Footer";
import Header from "./Header";
import { addMyTrip } from "../api";

function Trip() {
  let { id } = useParams();
  const [trips, setTrips] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  const getTrips = async () => {
    const response = await fetch(`http://localhost:8080/api/trips/${id}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      console.error(`Error fetching trips (${response.status})`);
      return;
    }

    const data = await response.json();
    console.log("Trips:", data);
    setTrips(data);
  };

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
            <p className="text-lg font-semibold hover:underline">{t.title}</p>
            <div>
              <span>
                {t.startTrip && t.startTrip.length >= 3
                  ? t.startTrip[2] + "-" + t.startTrip[1] + "-" + t.startTrip[0]
                  : ""}
              </span>
              <p>{t.price} CHF</p>
            </div>
             <p className="text-sm text-gray-700">
               {t.longDescription || t.description}
             </p>
            <div>
              <button
                type="button"
                onClick={() => addToTripList(t)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add to TripList
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
      <div className="w-full flex justify-center ">
        <div className="w-full max-w-[1440px] flex justify-center items-center">
          <section id="products">{renderTrip(trips)}</section>
        </div>
      </div>

      {/* Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.3 }}
            transition={{ duration: 0.3 }}
            className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            ✅ Trip added to your list!
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}

export default Trip;
