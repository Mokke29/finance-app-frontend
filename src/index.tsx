import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { AuthProvider } from './components/auth/AuthContext';
import { UserContextProvider } from './components/auth/UserContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </UserContextProvider>
  </React.StrictMode>
);
