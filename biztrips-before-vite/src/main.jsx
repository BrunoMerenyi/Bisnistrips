import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext.jsx";
import App from "./App.jsx";
import Trips from "./components/Trips.jsx";
import Trip from "./components/Trip.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import Checkout from "./components/Checkout.jsx";
import TripList from "./components/TripList.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/trips/:id" element={<Trip />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/triplist" element={<TripList />} />"
        <Route
          path="*"
          element={
            <div className="flex h-screen items-center justify-center">
              <p className="text-6xl bg-red-300 p-4 rounded-full">
                404 - Page Not Found
              </p>
            </div>
          }
        />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
