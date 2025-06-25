import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fetchMyTrips } from "../api";
import { AuthContext } from "../contexts/AuthContext";
import Header from "./Header";

export default function CheckoutPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tripList, setTripList] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  // Fetch trips from server
  useEffect(() => {
    if (user) {
      setLoading(true);
      fetchMyTrips()
        .then((trips) => {
          console.log("Fetched trips for checkout:", trips);
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

  // Redirect if no trips or not logged in

  const subtotal = tripList.reduce(
    (sum, item) => sum + (Number(item.price) || 0),
    0
  );
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setShowNotification(true);
      setTimeout(() => {
        navigate("/trips");
      }, 2000);
    }, 2000);
  };

  // Not logged in view
  const NotLoggedInView = () => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-[70vh] px-4"
    >
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
          🛒
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center max-w-md"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Checkout 💳</h1>
        <p className="text-lg text-gray-600 mb-8">
          Please sign in to proceed with your booking
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
            onClick={() => navigate("/login")}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg"
          >
            Sign In
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
            🛒
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-6xl p-5"
            >
              {/* Header Section */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center mb-8"
              >
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  Secure Checkout
                </h1>
                <p className="text-lg text-gray-600">
                  Complete your booking and start your adventure
                </p>
              </motion.div>

              <div className="grid gap-8 lg:grid-cols-2">
                {/* Trip Summary Card */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Trip Summary
                    </h2>
                  </div>

                  <div className="space-y-4 mb-6">
                    {tripList.map((trip, index) => (
                      <motion.div
                        key={trip.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                      >
                        <img
                          className="w-16 h-16 object-cover rounded-lg"
                          src={`/images/items/${trip.id}.jpg`}
                          alt={trip.title}
                          onError={(e) => {
                            e.target.src = "/images/placeholder.jpg";
                          }}
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">
                            {trip.title}
                          </h3>
                          <p className="text-sm text-gray-600">Business Trip</p>
                        </div>
                        <span className="font-bold text-blue-600">
                          {(Number(trip.price) || 0).toFixed(2)} CHF
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Price Breakdown */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="space-y-3 pt-6 border-t border-gray-200"
                  >
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>{subtotal.toFixed(2)} CHF</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax (8%)</span>
                      <span>{tax.toFixed(2)} CHF</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-gray-800 pt-3 border-t">
                      <span>Total</span>
                      <span className="text-blue-600">
                        {total.toFixed(2)} CHF
                      </span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Payment Form Card */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Payment Details
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name
                        </label>
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                          name="fullName"
                          placeholder="Enter your full name"
                          value={form.fullName}
                          onChange={handleChange}
                          required
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email
                        </label>
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={form.email}
                          onChange={handleChange}
                          required
                        />
                      </motion.div>
                    </div>

                    {/* Payment Information */}
                    <div className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                      >
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Card Number
                        </label>
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={form.cardNumber}
                          onChange={handleChange}
                          required
                        />
                      </motion.div>

                      <div className="grid grid-cols-2 gap-4">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.8 }}
                        >
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Expiry
                          </label>
                          <motion.input
                            whileFocus={{ scale: 1.02 }}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                            name="expiry"
                            placeholder="MM/YY"
                            value={form.expiry}
                            onChange={handleChange}
                            required
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.9 }}
                        >
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            CVC
                          </label>
                          <motion.input
                            whileFocus={{ scale: 1.02 }}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                            name="cvc"
                            placeholder="123"
                            value={form.cvc}
                            onChange={handleChange}
                            required
                          />
                        </motion.div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.0 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={processing}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {processing ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          Complete Payment ({total.toFixed(2)} CHF)
                        </>
                      )}
                    </motion.button>
                  </form>

                  {/* Security Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    className="mt-6 p-4 bg-green-50 rounded-xl flex items-center gap-3"
                  >
                    <div>
                      <p className="font-semibold text-green-800">
                        Secure Payment
                      </p>
                      <p className="text-sm text-green-600">
                        Your payment information is encrypted and secure
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Success Notification */}
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
              <span className="font-medium">
                Payment successful! Redirecting...
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
