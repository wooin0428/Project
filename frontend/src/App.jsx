import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


import Login from "./pages/Login";
import CreateAcc from "./pages/CreateAcc";
import Dashboard from "./pages/Dashboard";
import HomeownerSearchPage from "./pages/hosearch";

import Header from "./components/Header";
import Footer from "./components/Footer";

import ProtectedRoute from "./helpers/checkSession";


function App() {
  const isApiRoute = window.location.pathname.startsWith("/api");

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/createAcc" element={<CreateAcc />} />
          <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
          <Route path="/homeownersDashboard" element={<HomeownerSearchPage />} />

          {/* Only add the catch-all route if not an API request */}
          {!isApiRoute && (
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          )}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}


export default App;
