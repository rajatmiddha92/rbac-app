import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Unauthorized from "./pages/Unauthorized";
import CreateRole from "./pages/admin/CreateRole";
import AssignRole from "./pages/admin/AssignRole";
import "./App.css";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuth();
  console.log("AdminRoute - isAuthenticated:", isAuthenticated);
  console.log("AdminRoute - user:", user);
  if (isAuthenticated && !user?.isAdmin) {
    console.log("AdminRoute - Redirecting to /unauthorized");
    return <Navigate to="/unauthorized" />;
  }
  if (!isAuthenticated) {
    console.log("AdminRoute: Redirecting to /login");
    return <Navigate to="/login" />;
  }
  console.log("AdminRoute - Rendering children");
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Routes>
            <Route
              path="/register"
              element={
                <div className="page register-page">
                  <Register />
                </div>
              }
            />
            <Route
              path="/login"
              element={
                <div className="page login-page">
                  <Login />
                </div>
              }
            />
            <Route
              path="/unauthorized"
              element={
                <div className="page unauthorized-page">
                  <Unauthorized />
                </div>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <div className="page dashboard-page">
                    <Dashboard />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <div className="page admin-dashboard-page">
                    <AdminDashboard />
                  </div>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/create-role"
              element={
                <AdminRoute>
                  <div className="page create-role-page">
                    <CreateRole />
                  </div>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/assign-role"
              element={
                <AdminRoute>
                  <div className="page assign-role-page">
                    <AssignRole />
                  </div>
                </AdminRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
