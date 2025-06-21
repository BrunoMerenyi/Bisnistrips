import React, { useState } from "react";
import { motion } from "framer-motion";

export default function CheckoutPage() {
    const [cart] = useState([
        { id: 1, name: "Business Trip BT01", qty: 1, price: 1299 },
        { id: 2, name: "Business Trip BT02", qty: 2, price: 899 }
    ]);
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        cardNumber: "",
        expiry: "",
        cvc: ""
    });

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container mx-auto p-4 grid gap-6 lg:grid-cols-2"
        >
            {/* Cart Summary */}
            <div className="bg-white shadow-xl rounded-lg p-6 space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    Ihre Reiseübersicht
                </h2>
                <ul className="divide-y divide-gray-200">
                    {cart.map((item) => (
                        <li key={item.id} className="py-2 flex justify-between text-sm">
              <span>
                {item.qty}× {item.name}
              </span>
                            <span>{(item.price * item.qty).toFixed(2)} CHF</span>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-between font-bold text-base pt-2 border-t">
                    <span>Zwischensumme</span>
                    <span>{subtotal.toFixed(2)} CHF</span>
                </div>
            </div>

            {/* Shipping & Payment */}
            <div className="bg-white shadow-xl rounded-lg p-6 space-y-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    Zahlungsdetails
                </h2>

                <div className="space-y-4">
                    <input
                        className="w-full border rounded px-4 py-2"
                        name="fullName"
                        placeholder="Vollständiger Name"
                        value={form.fullName}
                        onChange={handleChange}
                    />
                    <input
                        className="w-full border rounded px-4 py-2"
                        name="email"
                        type="email"
                        placeholder="E-Mail"
                        value={form.email}
                        onChange={handleChange}
                    />
                    <input
                        className="w-full border rounded px-4 py-2"
                        name="cardNumber"
                        placeholder="Kartennummer"
                        value={form.cardNumber}
                        onChange={handleChange}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            className="w-full border rounded px-4 py-2"
                            name="expiry"
                            placeholder="MM/YY"
                            value={form.expiry}
                            onChange={handleChange}
                        />
                        <input
                            className="w-full border rounded px-4 py-2"
                            name="cvc"
                            placeholder="CVC"
                            value={form.cvc}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded text-base font-medium">
                    Jetzt bezahlen ({subtotal.toFixed(2)} CHF)
                </button>
            </div>
        </motion.div>
    );
}