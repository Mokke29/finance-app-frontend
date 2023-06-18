import React from 'react';
import './App.scss';
import LoginForm from './components/auth/LoginForm';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import NotFound from './components/NotFound';
import { useAuth } from './components/auth/AuthContext';
import Dashboard from './components/Dashboard';
import Home from './components/Home';

const App: React.FC = () => {
  const auth = useAuth();

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginForm />} />
        {auth.isAuthenticated ? (
          <></>
        ) : (
          <Route path='*' element={<LoginForm />} />
        )}
        <Route path='/' element={<Dashboard />} />
        <Route path='/statistics' element={<Home />} />
        <Route path='*' element={<LoginForm />} />
      </Routes>
    </Router>
  );
};
export default App;
