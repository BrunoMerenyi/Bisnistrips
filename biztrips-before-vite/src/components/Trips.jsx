import React, { useEffect, useState, useContext } from "react";

import Header from "./Header";
import { motion, AnimatePresence } from "framer-motion";
import { addMyTrip } from "../api";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Trips() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [trips, setTrips] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  async function searchTrips(query) {
    const res = await fetch(
      `http://localhost:8080/api/trips/search?query=${query}`,
      {
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

  async function getTrips() {
    const res = await fetch(`/api/trips`, {
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
      })
      .catch((err) => {
        console.error("Failed to add trip to list:", err);
        alert("Failed to add trip to list. Please try again.");
      });
  }

  function addTripAndCheckout(trip) {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
    addMyTrip(trip.id)
      .then(() => {
        navigate("/checkout");
      })
      .catch((err) => {
        console.error("Failed to add trip to list:", err);
        alert("Failed to add trip to list. Please try again.");
      });
  }

  useEffect(() => {
    if (user) {
      getTrips();
    }
  }, [user]);

  function renderTrip(t, index) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: index * 0.1,
          ease: "easeOut",
        }}
        whileHover={{
          y: -8,
          scale: 1.02,
          transition: { duration: 0.2 },
        }}
        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
        key={t.id}
      >
        <div className="relative overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
            className="w-full h-56 object-cover"
            src={"/images/items/" + t.id + ".jpg"}
            alt={t.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <motion.div
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg"
          >
            <span className="text-xl">📍</span>
          </motion.div>
        </div>

        <div className="p-6">
          <motion.h3
            whileHover={{ color: "#3B82F6" }}
            className="text-xl font-bold text-gray-800 mb-2 cursor-pointer transition-colors"
          >
            <a href={`/trips/${t.id}`}>{t.title}</a>
          </motion.h3>

          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {t.startTrip && t.startTrip.length >= 3
                ? `${t.startTrip[2]}-${t.startTrip[1]}-${t.startTrip[0]}`
                : "Date TBD"}
            </span>
            <motion.span
              whileHover={{ scale: 1.1 }}
              className="text-lg font-bold text-blue-600"
            >
              {t.price} CHF
            </motion.span>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {t.description}
          </p>

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addToTripList(t)}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Add to List
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 px-4 rounded-lg font-medium transition-colors duration-200"
              onClick={() => addTripAndCheckout(t)}
            >
              Checkout
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Not logged in component (unchanged)
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
        </motion.div>

        {/* Floating elements around the plane */}
        <motion.div
          animate={{
            x: [0, 30, 0],
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
          ☁️
        </motion.div>

        <motion.div
          animate={{
            x: [0, -25, 0],
            y: [0, 15, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: 1,
          }}
          className="absolute -bottom-2 -left-8 text-2xl"
        >
        </motion.div>

        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 1.5,
          }}
          className="absolute top-2 left-12 text-xl"
        >
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center max-w-md"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to BizTrips!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover amazing business trips and adventures around the world. Sign
          in to start exploring our exclusive offers!
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
            Log in to Get Started
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (window.location.href = "/signup")}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Create New Account
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1000),
              y:
                Math.random() *
                (typeof window !== "undefined" ? window.innerHeight : 800),
              opacity: 0.1,
            }}
            animate={{
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1000),
              y:
                Math.random() *
                (typeof window !== "undefined" ? window.innerHeight : 800),
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              delay: i * 2,
            }}
            className="absolute text-4xl text-blue-200"
          >
            {["🏔️", "🏖️", "🏙️", "🌴", "🗽", "🎪"][i]}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

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
                  Discover Your Next Adventure!
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Explore our curated collection of business trips and unique
                  experiences
                </p>
              </motion.div>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="relative max-w-md mx-auto mb-12"
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400 text-xl">🔍</span>
                </div>
                <input
                  type="text"
                  placeholder="Search destinations, activities..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    searchTrips(e.target.value);
                  }}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm shadow-lg"
                />
              </motion.div>

              {/* Trips Grid */}
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8"
              >
                {trips.map((trip, index) => renderTrip(trip, index))}
              </motion.section>

              {/* Empty State */}
              {trips.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-12"
                >
                  <div className="text-6xl mb-4">🏖️</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No trips found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search or check back later for new
                    adventures!
                  </p>
                </motion.div>
              )}
            </motion.main>
          )}
        </div>

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
      </div>
    </>
  );
}
