import { useState, useEffect } from "react";
import React from "react";
import { useParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

import Header from "./Header";
import { addMyTrip } from "../api";

function Trip() {
  let { id } = useParams();
  const [trips, setTrips] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [loading, setLoading] = useState(true);

  const getTrips = async () => {
    setLoading(true);
    try {
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
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  function addToTripList(trip) {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
    addMyTrip(trip.id)
      .then(() => {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      })
      .catch((err) => {
        console.error("Failed to add trip to list:", err);
        alert("Failed to add trip to list. Please try again.");
      });
  }

  useEffect(() => {
    console.log("useEffect");
    getTrips();
  }, [id]);

  function renderTrip(t) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full mx-auto"
        key={t.id}
      >
        {/* Hero Image Section */}
        <div className="relative overflow-hidden">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-96 object-cover"
            src={"/images/items/" + t.id + ".jpg"}
            alt={t.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Floating Price Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg"
          >
            <span className="text-2xl font-bold text-blue-600">
              {t.price} CHF
            </span>
          </motion.div>

          {/* Location Pin */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
            className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg"
          >
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="p-8">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl font-bold text-gray-800 mb-4"
          >
            {t.title}
          </motion.h1>

          {/* Date Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2 rounded-full mb-6"
          >
            <span className="font-medium text-gray-700">
              {t.startTrip && t.startTrip.length >= 3
                ? `${t.startTrip[2]}-${t.startTrip[1]}-${t.startTrip[0]}`
                : "Date TBD"}
            </span>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mb-8"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              About This Trip
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {t.longDescription || t.description}
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addToTripList(t)}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              Add to My Trip List
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <a
                href={`/Checkout`}
                className="flex items-center justify-center gap-3"
              >
                Book Now
              </a>
            </motion.button>
          </motion.div>

          {/* Additional Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
          >
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl">
              <h4 className="font-semibold text-gray-800">
                Premium Experience
              </h4>
              <p className="text-sm text-gray-600">
                Carefully curated for business travelers
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl">
              <h4 className="font-semibold text-gray-800">Fully Insured</h4>
              <p className="text-sm text-gray-600">
                Complete travel protection included
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl">
              <h4 className="font-semibold text-gray-800">24/7 Support</h4>
              <p className="text-sm text-gray-600">
                Round-the-clock assistance available
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
            }}
            className="text-6xl"
          >
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="w-full flex justify-center px-4">
          <div className="w-full max-w-6xl">
            {/* Back Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => window.history.back()}
              className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <span className="text-xl">←</span>
              <span className="font-medium">Back to Trips</span>
            </motion.button>

            <section id="trip-detail">
              {trips && Object.keys(trips).length > 0 ? (
                renderTrip(trips)
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Trip not found
                  </h3>
                  <p className="text-gray-500">
                    The trip you're looking for doesn't exist or has been
                    removed.
                  </p>
                </motion.div>
              )}
            </section>
          </div>
        </div>
      </div>

      {/* Enhanced Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.3 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="fixed bottom-8 right-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3"
          >
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 0.5 }}
              className="text-xl"
            >
              ✅
            </motion.span>
            <span className="font-medium">Trip added to your list!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Trip;
