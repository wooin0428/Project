import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


import Login from "./pages/Login";
import CreateAcc from "./pages/CreateAcc";

import Header from "./components/Header";
import Footer from "./components/Footer";


function App() {
  const isApiRoute = window.location.pathname.startsWith("/api");

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/createAcc" element={<CreateAcc />} />
          {/* Only add the catch-all route if not an API request */}
          {!isApiRoute && (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}


export default App;
