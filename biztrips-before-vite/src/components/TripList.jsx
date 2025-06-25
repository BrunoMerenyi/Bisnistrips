import React, { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchMyTrips, removeMyTrip } from "../api";
import Header from "./Header";

import { AuthContext } from "../contexts/AuthContext";

export default function TripList() {
  const { user } = useContext(AuthContext);
  const [tripList, setTripList] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetchMyTrips()
        .then((trips) => {
          console.log("Fetched trips:", trips);
          setTripList(trips);
        })
        .catch((error) => {
          console.error("Error fetching trips:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user]);

  const removeTrip = (tripId) => {
    setTripList(tripList.filter((t) => t.id !== tripId));
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);

    removeMyTrip(tripId)
      .then(() => {
        console.log(`Trip ${tripId} removed successfully`);
      })
      .catch((error) => {
        console.error(`Error removing trip ${tripId}:`, error);
      });
  };

  const totalPrice = tripList.reduce(
    (sum, t) => sum + (Number(t.price) || 0),
    0
  );

  // Not logged in component
  const NotLoggedInView = () => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-[70vh] px-4"
    >
      {/* Animated Travel Icons */}
      <div className="relative mb-8">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-8xl mb-4"
        >
          📋
        </motion.div>

        <motion.div
          animate={{
            x: [0, 15, 0],
            y: [0, -10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 0.5,
          }}
          className="absolute -top-4 -right-8 text-3xl"
        >
          ✈️
        </motion.div>

        <motion.div
          animate={{
            x: [0, -15, 0],
            y: [0, 10, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: 1,
          }}
          className="absolute -bottom-2 -left-8 text-2xl"
        >
          🎒
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center max-w-md"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Your Trip List 📝
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Sign in to view and manage your saved business trips and adventures!
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (window.location.href = "/login")}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg"
          >
            Sign In
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (window.location.href = "/signup")}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Create Account
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );

  // Loading component
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
            📋
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex justify-center">
          {!user ? (
            <NotLoggedInView />
          ) : (
            <motion.main
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-[1440px] p-5"
            >
              {/* Header Section */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center mb-8"
              >
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  Your Trip Selection 📋
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Manage your saved business trips and plan your adventures
                </p>
              </motion.div>

              {tripList.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-12"
                >
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No trips in your list yet
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Start exploring our amazing business trips and add them to
                    your list!
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => (window.location.href = "/trips")}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg"
                  >
                    Browse Trips
                  </motion.button>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {/* Trip Cards */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="space-y-4"
                  >
                    {tripList.map((trip, index) => (
                      <motion.div
                        key={trip.id}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1,
                        }}
                        whileHover={{
                          scale: 1.02,
                          transition: { duration: 0.2 },
                        }}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                      >
                        <div className="flex flex-col md:flex-row">
                          {/* Image Section */}
                          <div className="md:w-1/3 relative overflow-hidden">
                            <motion.img
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.4 }}
                              className="w-full h-48 md:h-full object-cover"
                              src={`/images/items/${trip.id}.jpg`}
                              alt={trip.title}
                              onError={(e) => {
                                e.target.src = "/images/placeholder.jpg";
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                          </div>

                          {/* Content Section */}
                          <div className="md:w-2/3 p-6 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start mb-3">
                                <motion.h2
                                  whileHover={{ color: "#3B82F6" }}
                                  className="text-xl font-bold text-gray-800 cursor-pointer transition-colors"
                                >
                                  <a href={`/trips/${trip.id}`}>{trip.title}</a>
                                </motion.h2>
                                <motion.span
                                  whileHover={{ scale: 1.1 }}
                                  className="text-2xl font-bold text-blue-600"
                                >
                                  {(Number(trip.price) || 0).toFixed(2)} CHF
                                </motion.span>
                              </div>

                              <div className="flex flex-wrap gap-2 mb-4">
                                {trip.destination && (
                                  <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                                    📍 {trip.destination}
                                  </span>
                                )}
                                {trip.date && (
                                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                                    📅 {trip.date}
                                  </span>
                                )}
                              </div>

                              {trip.description && (
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                  {trip.description}
                                </p>
                              )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() =>
                                  (window.location.href = `/trips/${trip.id}`)
                                }
                                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                              >
                                👁️ View Details
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => removeTrip(trip.id)}
                                className="bg-red-500 hover:bg-red-600 text-white py-2.5 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                              >
                                🗑️ Remove
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Total Price Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-2xl p-6 text-white"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">
                          Total Cost
                        </h3>
                        <p className="text-blue-100">
                          {tripList.length} trip
                          {tripList.length !== 1 ? "s" : ""} selected
                        </p>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="text-right"
                      >
                        <div className="text-3xl font-bold">
                          {totalPrice.toFixed(2)} CHF
                        </div>
                      </motion.div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => (window.location.href = "/checkout")}
                      className="w-full mt-4 bg-white text-blue-600 py-3 px-6 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      🛒 Proceed to Checkout
                    </motion.button>
                  </motion.div>
                </div>
              )}
            </motion.main>
          )}
        </div>

        {/* Notification */}
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
              className="fixed bottom-8 right-8 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3"
            >
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 0.5 }}
                className="text-xl"
              >
                🗑️
              </motion.span>
              <span className="font-medium">Trip removed from your list!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
