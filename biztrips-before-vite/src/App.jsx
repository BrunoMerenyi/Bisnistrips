import React, { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function App() {
  const [trips, setTrips] = useState([]);

  return (
    <>
      <div className="">
        <Header />
        <main className="w-full max-w-[1440px] p-5">test</main>
      </div>
      <Footer />
    </>
  );
}
