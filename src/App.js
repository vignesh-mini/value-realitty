// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import QuoteScreen from "./components/QuoteScreen";
import BookingReceiptScreen from "./components/BookingReceiptScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/quote" element={<QuoteScreen />} />
        <Route path="/booking-receipt" element={<BookingReceiptScreen />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
