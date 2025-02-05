import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import InventoryManagement from './pages/inventory/InventoryManagement';
import MaintenanceTracking from './pages/maintenance/MaintenanceTracking';
import Reports from './pages/reports/Reports';
import Settings from './pages/settings/Settings';
import NotFound from './pages/NotFound';

// Components
import Layout from './components/layout/Layout';
import PrivateRoute from './components/auth/PrivateRoute';

const queryClient = new QueryClient();

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRouteWrapper: React.FC<PrivateRouteProps> = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return currentUser ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <PrivateRouteWrapper>
                  <Layout />
                </PrivateRouteWrapper>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="inventory" element={<InventoryManagement />} />
              <Route path="maintenance" element={<MaintenanceTracking />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App; 