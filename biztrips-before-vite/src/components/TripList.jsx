import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";


export default function TripList() {
    const [tripList, setTripList] = useState(() => {
        return JSON.parse(localStorage.getItem("tripList")) || [];
    });
    useEffect(() => {
        localStorage.setItem("tripList", JSON.stringify(tripList));
    }, [tripList]);

    const removeTrip = (id) => setTripList(tripList.filter((t) => t.id !== id));

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
                    <div className="space-y-4">
                        {tripList.map((trip) => (
                            <div
                                key={trip.id}
                                className="border rounded p-4 flex justify-between items-center bg-white shadow-sm"
                            >
                                <div>
                                    <h2 className="font-semibold text-lg">{trip.name}</h2>
                                    <p className="text-sm text-gray-600">
                                        Ziel: {trip.destination} | Datum: {trip.date}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">CHF&nbsp;{(Number(trip.price) || 0).toFixed(2)}</p>
                                    <button
                                        onClick={() => removeTrip(trip.id)}
                                        className="mt-2 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Entfernen
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="text-right font-bold text-xl mt-6">
                            Total:&nbsp;CHF&nbsp;{totalPrice.toFixed(2)}
                        </div>
                    </div>
                )}
            </motion.div>
            <Footer />
        </>
    );
}
