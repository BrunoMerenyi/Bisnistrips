import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchMyTrips, removeMyTrip } from "../api"; // Adjust the import path as necessary
import Header from "./Header";
import Footer from "./Footer";

export default function TripList() {
  const [tripList, setTripList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchMyTrips().then((trips) => {
      console.log("Fetched trips:", trips);
      setTripList(trips);
    });
  }, []);

    const gotoCheckout = () => {
        navigate("/checkout", { state: { cart: tripList } });
    };

  const removeTrip = (tripId) => {
    setTripList(tripList.filter((t) => t.id !== tripId));
    removeMyTrip(tripId)
      .then(() => {
        console.log(`Trip ${tripId} removed successfully`);
      })
      .catch((error) => {
        console.error(`Error removing trip ${tripId}:`, error);
      });
  };

  const totalPrice = tripList.reduce((sum, t) => sum + t.price, 0);

  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto p-4"
      >
        <h1 className="text-2xl font-bold mb-6">Ihre Reiseauswahl</h1>

        {tripList.length === 0 ? (
          <p className="text-gray-500">Keine Reisen hinzugefügt.</p>
        ) : (
            <>
                <div className="space-y-4">
                    {tripList.map((trip) => {
                        /* Datum umwandeln, da startTrip als Array kommt */
                        const start = trip.startTrip?.length >= 3
                            ? `${trip.startTrip[2]}-${trip.startTrip[1]}-${trip.startTrip[0]}`
                            : "-";
                        const end   = trip.endTrip?.length   >= 3
                            ? `${trip.endTrip[2]}-${trip.endTrip[1]}-${trip.endTrip[0]}`
                            : "-";

                        return (
                            <div
                                key={trip.id}
                                className="flex border rounded p-4 bg-white shadow-sm"
                            >
                                <img
                                    src={`/images/items/${trip.id}.jpg`}
                                    alt={trip.title}
                                    className="w-40 h-32 object-cover rounded"
                                />
                                <div className="flex flex-col flex-1 justify-between pl-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h2 className="font-semibold text-lg">{trip.title}</h2>
                                            <p className="text-sm text-gray-600">
                                                {start} – {end}
                                            </p>
                                        </div>
                                        <span className="px-2 py-0.5 text-xs rounded bg-yellow-100 text-yellow-800">
                                            geplant
                                        </span>
                                    </div>
                                    <div className="flex justify-end items-center gap-4">
                                        <p className="font-medium">
                                            CHF {(Number(trip.price) || 0).toFixed(2)}
                                        </p>

                                        <button
                                            onClick={() => removeTrip(trip.id)}
                                            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Entfernen
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="mt-6 flex justify-between items-center">
                <span className="font-bold text-xl">
                    Total: CHF {totalPrice.toFixed(2)}
                </span>

                <button
                    onClick={gotoCheckout}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Alles bezahlen
                </button>
            </div>
            </>
            )}
        </motion.div>
      <Footer />
    </>
  );
}
