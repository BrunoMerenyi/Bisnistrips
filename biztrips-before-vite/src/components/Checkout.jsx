import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function CheckoutPage() {
    /* --------------------------------- Hooks -------------------------------- */
    const { state }  = useLocation();
    const navigate   = useNavigate();
    const cart       = state?.cart ?? [];

    /* leere Liste? -> zurück */
    useEffect(() => {
        if (cart.length === 0) navigate("/triplist");
    }, [cart, navigate]);

    /* --------------------------------- State -------------------------------- */
    const [form, setForm] = useState({
        fullName:   "",
        email:      "",
        cardNumber: "",
        expiry:     "",
        cvc:        ""
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    /* ---------------------------------- $ ----------------------------------- */
    const subtotal = cart.reduce(
        (sum, item) => sum + (Number(item.price) || 0),
        0
    );

    /* ---------------------------- Validierung & Aktionen --------------------- */
    const formValid = () => {
        // simple Pflicht-Feld- & Zahlen-Checks
        const filled = Object.values(form).every(v => v.trim().length);
        const onlyDigits = (...vals) => vals.every(v => /^\d+$/.test(v));
        return (
            filled &&
            /^\S+@\S+\.\S+$/.test(form.email) &&
            onlyDigits(form.cardNumber, form.cvc) &&
            /^\d{2}\/\d{2}$/.test(form.expiry)
        );
    };

    const cancel = () => navigate("/triplist");

    const payNow = () => {
        if (!formValid()) {
            alert("Bitte alle Felder korrekt ausfüllen!");
            return;
        }

        /* Demo-Bezahlung: Cart einfach aus LocalStorage löschen
           (oder aus Context / Redux etc., je nachdem wie ihr die Liste speichert) */
        localStorage.removeItem("tripList");

        /* Erfolgs-Feedback → zurück zur TripList */
        alert("Bezahlung erfolgreich – viel Spaß auf der Reise!");
        navigate("/triplist", { replace: true });
    };

    /* ------------------------------- JSX ------------------------------------ */
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container mx-auto p-4 grid gap-6 lg:grid-cols-2"
        >
            {/* -------------------- Warenkorb -------------------- */}
            <div className="bg-white shadow-xl rounded-lg p-6 space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    Ihre Reiseübersicht
                </h2>
                <ul className="divide-y divide-gray-200">
                    {cart.map((t) => (
                        <li key={t.id} className="py-2 flex justify-between text-sm">
                            <span>{t.title}</span>
                            <span>{Number(t.price).toFixed(2)} CHF</span>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-between font-bold text-base pt-2 border-t">
                    <span>Zwischensumme</span>
                    <span>{subtotal.toFixed(2)} CHF</span>
                </div>
            </div>

            {/* ---------------- Zahlung & Adresse ---------------- */}
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

                {/* ---------- Buttons ---------- */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                    <button
                        onClick={cancel}
                        className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded text-base font-medium"
                    >
                        Abbrechen
                    </button>
                    <button
                        onClick={payNow}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded text-base font-medium"
                    >
                        Jetzt bezahlen ({subtotal.toFixed(2)} CHF)
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
