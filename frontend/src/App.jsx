import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


import Login from "./pages/Login";

import Header from "./components/Header";
import Footer from "./components/Footer";


function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Catch-all for undefined paths — but exclude "/api" */}
          <Route
            path="*"
            element={
              window.location.pathname.startsWith("/api") ? null : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
