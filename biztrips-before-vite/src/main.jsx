import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import App from "./App.jsx";
import Trips from "./components/Trips.jsx";
import Trip from "./components/Trip.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import Checkout from "./components/Checkout.jsx";
import TripList from "./components/TripList.jsx";


ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/trips" element={<Trips />} />
      <Route path="/trips/:id" element={<Trip />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<App />} />
      <Route path="/trips" element={<Trips />} />
      <Route path="/trips/:id" element={<Trip />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/triplist" element={<TripList />} />
    </Routes>
  </BrowserRouter>
);
