import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import App from "./App.jsx";
import Trips from "./components/Trips.jsx";
import Trip from "./components/Trip.jsx";


ReactDOM.createRoot('root').render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/trips" element={<Trips />} />
      <Route path="/trips/:id" element={<Trip />} />

    </Routes>
  </BrowserRouter>
);
