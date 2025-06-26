import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import LoginPage from '../pages/LoginPage';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import RoleManagement from '../pages/RoleManagement';
import UserManagement from '../pages/UserManagement';
import EnterpriseManagement from '../pages/EnterpriseManagement';
import EmployeeManagement from '../pages/EmployeeManagement';
import ProductManagement from '../pages/ProductManagement';
import DashboardManagement from '../pages/DashboardManagement';
import DashboardView from '../components/dashboards/DashboardView';

const AppRoutes = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/roles"
          element={
            <ProtectedRoute>
              <RoleManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/enterprises"
          element={
            <ProtectedRoute>
              <EnterpriseManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <EmployeeManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboards"
          element={
            <ProtectedRoute>
              <DashboardManagement />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/dashboards/view/:id" element={<DashboardView />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;