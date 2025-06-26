import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { RoleProvider } from './context/RoleContext';
import AppRoutes from './routes/AppRoutes';
import './assets/styles/global.css';

function App() {
  return (
    <AuthProvider>
      <RoleProvider>
        <AppRoutes />
      </RoleProvider>
    </AuthProvider>
  );
}

export default App;