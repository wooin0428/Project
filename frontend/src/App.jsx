import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import CreateAcc from "./pages/CreateAcc";
import HoDashboard from "./pages/HoDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CleanerDetailPage from "./pages/CleanerDetailPage";

import Header from "./components/Header";
import Footer from "./components/Footer";

import ProtectedRoute from "./helpers/checkSession";
import RedirectToDashboard from "./helpers/RedirectToDashboard";

function App() {
  const isApiRoute = window.location.pathname.startsWith("/api");

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/createAcc" element={<CreateAcc />} />

          {/* Redirects user based on their usergroup */}
          <Route path="/dashboard" element={<RedirectToDashboard />} />

          {/* Actual dashboard views by role */}
          <Route
            path="/dashboard/homeowner"
            element={
              <ProtectedRoute allowedGroups={["HOMEOWNER"]}>
                <HoDashboard />
              </ProtectedRoute>
            }
          >
            {/* Cleaner detail page under /dashboard/homeowner */}
            <Route
              path="cleaners/:cleanerId"
              element={
                <ProtectedRoute allowedGroups={["HOMEOWNER"]}>
                  <CleanerDetailPage />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute allowedGroups={["USER ADMIN"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {!isApiRoute && (
            <Route path="*name" element={<Navigate to="/dashboard" replace />} />
          )}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
